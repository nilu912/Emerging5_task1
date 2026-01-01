import React, { useEffect } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import { data } from "../utils/userData.js";

const DrawerComp = ({ open, onClose, isEdit, editData }) => {
  const [form] = Form.useForm();
  const onSearch = (value) => {
    console.log("search:", value);
  };
  useEffect(() => {
    if (!open) return;
    if (isEdit) {
      form.setFieldsValue(editData);
    } else {
      form.resetFields();
    }
  }, [editData]);

  const onFinish = (values) => {
    console.log("editData", editData);
    console.log("Submitted Data:", values);
    if (isEdit) {
      data[editData.key] = { ...values, key: editData.key };
    } else {
      data.push(values);
    }
    onClose();
    form.resetFields();
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">
            {isEdit ? "Edit User" : "Add User"}
          </span>

          <Button
            type="text"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </Button>
        </div>
      }
      // title="Create a new account"
      size={512}
      open={open}
      onClose={onClose}
      closable={false}
      // extra={
      //   <Space>
      //     <Button onClick={onClose}>Cancel</Button>
      //     <Button type="primary" onClick={() => form.submit()}>
      //       Submit
      //     </Button>
      //   </Space>
      // }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                style={{ marginBottom: 12 }}
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="clientname"
                label="Client Name"
                style={{ marginBottom: 12 }}
                rules={[
                  { required: true, message: "Please enter client name" },
                ]}
              >
                <Input placeholder="Enter client name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                style={{ marginBottom: 12 }}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="rollname"
                label="Role"
                style={{ marginBottom: 12 }}
                rules={[{ required: true, message: "Please select role" }]}
              >
                <Select
                  showSearch={{ optionFilterProp: "label", onSearch }}
                  placeholder="Select role"
                  options={[
                    { label: "Admin", value: "Admin" },
                    { label: "User", value: "User" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contactno"
                label="Contact No"
                style={{ marginBottom: 12 }}
                rules={[
                  { required: true, message: "Contact number is required" },
                  {
                    pattern: /^[6-9]\d{9}$/,
                    message: "Enter valid 10-digit mobile number",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Enter contact number"
                  maxLength={10}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="usertype"
                label="User Type"
                style={{ marginBottom: 12 }}
                showSearch={{ optionFilterProp: "label", onSearch }}
                rules={[{ required: true, message: "Please select user type" }]}
              >
                <Select
                  placeholder="Select user type"
                  options={[
                    { label: "Internal", value: "Internal" },
                    { label: "External", value: "External" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                style={{ marginBottom: 12 }}
                rules={[
                  { required: true, message: "Age is required" },
                  {
                    type: "number",
                    min: 1,
                    max: 120,
                    message: "Age must be between 1 and 120",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  max={120}
                  placeholder="Enter age"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="active"
                label="User Status"
                style={{ marginBottom: 12 }}
                rules={[
                  { required: true, message: "Please select user status" },
                ]}
              >
                <Select
                  placeholder="Select user status"
                  showSearch={{ optionFilterProp: "label", onSearch }}
                  options={[
                    { label: "True", value: true },
                    { label: "False", value: false },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="address"
            label="Address"
            style={{ marginBottom: 12 }}
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} placeholder="Enter address" />
          </Form.Item>
        </div>

        <Form.Item
          style={{
            marginBottom: 0,
            borderTop: "1px solid #f0f0f0",
            // paddingTop: 12,
          }}
        >
          <div className="pt-2 flex flex-row justify-between gap-2">
            <div className="flex items-center gap-1 justify-center items-center">
              <input type="checkbox" /> Active
            </div>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={() => form.submit()}>
                Submit
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerComp;
