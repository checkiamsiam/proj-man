"use client";
import { getSingleProject } from "@/service/project/getProjectDetails";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Flex, List, Row, Typography } from "antd";
import { useParams } from "next/navigation";

const { Title, Text, Paragraph } = Typography;

const ProjectDetails = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["project", params.projectSlug],
    queryFn: async () => {
      const res = await getSingleProject(params.projectSlug as string);
      return res;
    },
  });

  console.log(data);
  return (
    <div>
      <div className="flex flex-wrap gap-5">
        <Button type="primary">Add Task</Button>
        <Button type="primary">View Tasks</Button>
      </div>
      <div className="mt-5">
        <Row gutter={20}>
          <Col xs={24} md={16} xl={18}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Card title={<Title level={3}>{data?.name}</Title>} loading={isLoading}>
                  <Flex gap="small" vertical>
                    <Paragraph>{data?.description}</Paragraph>
                  </Flex>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Contributors" loading={isLoading}>
                  {data?.team && (
                    <List
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 4,
                      }}
                      pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 3,
                        align: "center",
                      }}
                      dataSource={data?.team}
                      loading={isLoading}
                      renderItem={(item: any) => (
                        <List.Item key={item.id}>
                          <Card hoverable>
                            <Title level={5}>{item.name}</Title>
                            <Text>{item.email}</Text>
                          </Card>
                        </List.Item>
                      )}
                    />
                  )}
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Task statistics" loading={isLoading}>
                  <Row gutter={[8, 8]}>
                    <Col lg={8}>
                      <Card hoverable={false} className="text-center">
                        <Title className="m-0">{data?.tasks?.filter((task: any) => task?.status === "to-do").length}</Title>
                        <Text>To Do</Text>
                      </Card>
                    </Col>
                    <Col lg={8}>
                      <Card hoverable={false} className="text-center">
                        <Title className="m-0">{data?.tasks?.filter((task: any) => task?.status === "in-progress").length}</Title>
                        <Text>In Progress</Text>
                      </Card>
                    </Col>
                    <Col lg={8}>
                      <Card hoverable={false} className="text-center" loading={isLoading}>
                        <Title className="m-0">{data?.tasks?.filter((task: any) => task?.status === "completed").length}</Title>
                        <Text>Completed</Text>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={8} xl={6}>
            <Row>
              <Col span={24}>
                <Card loading={isLoading} title="Recent Activities" actions={[<Button>Explore more</Button>]}>
                  <ul>
                    {
                      data?.tasks.map((task: any) => (
                        <li key={task.id}>{task.title}</li>
                      ))
                    }
                  </ul>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProjectDetails;
