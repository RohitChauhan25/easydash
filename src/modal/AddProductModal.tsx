import React, { useState } from "react";
import { Button, Modal, Input, Form, Upload, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slices/prodcutsSlice";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .nullable() // Allow null or empty value
    .typeError("Price is required") // Custom error message for type issues
    .positive("Price must be a positive number") // Ensure price is positive if provided
    .required("Price is required"),
  imageUrl: yup.string().required("Image URL is required"),
});

interface ProductFormInputs {
  name: string;
  price: number;
  imageUrl: string; // This will store the base64 string
}

const AddProductModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm<ProductFormInputs>({
    resolver: yupResolver(schema),
  });

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data: ProductFormInputs) => {
    const payload = {
      name: data?.name,
      price: data?.price,
      imageUrl: data?.imageUrl,
      unitsSold: 0,
    };

    dispatch(addProduct(payload));
    reset();
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string; // Convert to base64
      setValue("imageUrl", base64String);
      trigger("imageUrl");
    };

    reader.readAsDataURL(file); // Read the file as a data URL
    return false; // Prevent default upload behavior
  };

  return (
    <Modal
      footer={null}
      title="Add New Product"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Name" required>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </Form.Item>
        <Form.Item label="Price" required>
          <Controller
            name="price"
            control={control}
            render={({ field }) => <Input type="number" {...field} min={0} />}
          />
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </Form.Item>
        <Form.Item label="Image Upload" required>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={handleImageUpload}
              >
                <Button>Upload Image</Button>
              </Upload>
            )}
          />
          {errors.imageUrl && (
            <span style={{ color: "red" }}>{errors.imageUrl.message}</span>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
