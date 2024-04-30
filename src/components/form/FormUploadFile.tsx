"use client";
import { generateErrorMessage } from "@/utils/Form/schemaValidator";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isLt2M;
};

type ImageUploadProps = {
  name: string;
  type?: "pdf" | "image";
  label?: string;
  multiple?: boolean;
};

const FormUploadFile = ({ name, type = "image", label, multiple = false }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const errorMessage = generateErrorMessage(errors, name);

  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      if (!multiple) {
        // For a single image
        setValue(name, info.file.originFileObj);
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setLoading(false);
        });
      } else {
        // For multiple images
        const currentImages = getValues(name) || []; // Get current array of images
        const newImages = [...currentImages, info.file.originFileObj]; // Add the new image
        setValue(name, newImages);
        setLoading(false);
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      {label ? label : null}
      <Upload
        name={name}
        key={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        multiple={multiple}
        action="/api/file"
        onChange={handleChange}
        beforeUpload={beforeUpload}
        accept={type === "pdf" ? "application/pdf" : "image/*"}
        maxCount={multiple ? undefined : 1}
      >
        {uploadButton}
      </Upload>
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormUploadFile;
