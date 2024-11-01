import React, { useState } from "react";
import { Button, Modal, Input, DatePicker, Form, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slices/taskSlice";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  dueDate: yup.date().required("Due date is required").nullable(),
  description: yup.string().required("Description is required"),
});

interface TaskFormInputs {
  title: string;
  dueDate: Date | null;
  description: string;
}
const CretaTaskModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormInputs>({
    resolver: yupResolver(schema),
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data: TaskFormInputs) => {
    const payload = {
      title: data?.title,
      dueDate:
        data.dueDate instanceof Date
          ? data.dueDate.toISOString().split("T")[0]
          : data.dueDate,
      createdDate: new Date().toISOString(), // Today
      description: data?.description,
      completed: false,
    };
    dispatch(addTask(payload));
    setIsModalOpen(false); // Close the modal after submission
  };
  return (
    <Modal
      footer={null}
      title="Create New Task"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Title" required>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.title && (
            <span style={{ color: "red" }}>{errors.title.message}</span>
          )}
        </Form.Item>
        <Form.Item label="Due Date" required>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => <DatePicker {...field} />}
          />
          {errors.dueDate && (
            <span style={{ color: "red" }}>{errors.dueDate.message}</span>
          )}
        </Form.Item>
        <Form.Item label="Description" required>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea {...field} />}
          />
          {errors.description && (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </Modal>
  );
};

export default CretaTaskModal;
