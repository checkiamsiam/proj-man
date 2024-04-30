"use client";
import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";
import { UserRole } from "@/constants/Enums";
import { useRouter } from "@/lib/router-events";
import loginValidation from "@/schema/login.schema";
import { signIn } from "@/service/auth/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  console.log(session);
  const submitHandler = async (data: any) => {
    message.loading("Login.....");
    try {
      const res = await signIn({
        email: data.email,
        password: data.password,
      });
      if (res?.ok && !res?.error) {
        message.destroy();
        message.success("Your request to login has been successful");
        setError(false);
      } else {
        setError(true);
        message.destroy();
        message.warning("Failed to Login! try again");
      }
    } catch (err: any) {
      setError(true);
      message.destroy();
      message.warning("Failed to Login! try again");
    }
  };

  useEffect(() => {
    if (session?.user?.role === UserRole.manager) {
      router.push("/dashboard");
    }
    if (session?.user?.role === UserRole.user) {
      router.push("/user/dashboard");
    }
  }, [session, router]);

  return (
    <div className="container mx-auto px-5 ">
      <div className="py-10">
        <div className="max-w-lg mx-auto">
          <Card>
            <h1 className="text-[2rem] mb-5 text-primary text-center">Login</h1>
            <hr />

            <Form submitHandler={submitHandler} resolver={zodResolver(loginValidation)} defaultValues={{
              email: "manager@email.com",
              password: "manager",
            }}>
              <div className="flex flex-col gap-4">
                <div>
                  <FormInput name="email" required label="Email" size="large"  />
                </div>
                <div>
                  <FormInput name="password" required type="password" label="Password" size="large"  />
                </div>

               

                {error && (
                  <p className="text-center">
                    <span className="text-red-500 underline ">Email or Password is wrong, please try again</span>
                  </p>
                )}

                <div className="flex justify-end">
                  <Button htmlType="submit" size="large" type="primary" className="w-full mt-5">
                  Login
                  </Button>

                </div>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
