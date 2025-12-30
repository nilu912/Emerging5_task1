import React, { useEffect } from "react";
import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { data } from "../utils/userData.js";

const DrawerComp = ({ open, onClose, isEdit ,editData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if(!open) return;
    if(isEdit){
      form.setFieldsValue(editData);
    } else{
      form.resetFields();
    }
  }, [editData])

  const onFinish = (values) => {
    console.log("editData", editData);
    console.log("Submitted Data:", values);
    if(isEdit){
      data[editData.key] = { ...values, key: editData.key };
    } else{
      data.push(values);  
    }
    onClose();
    form.resetFields();
  };

  return (
    <Drawer
      title="Create a new account"
      size={720}
      open={open}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="clientname"
              label="Client Name"
              rules={[{ required: true, message: "Please enter client name" }]}
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
              rules={[{ required: true, message: "Please select role" }]}
            >
              <Select
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
              <InputNumber style={{ width: "100%" }} min={1} max={120} placeholder="Enter age" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="active"
              label="User Status"
              rules={[{ required: true, message: "Please select user status" }]}
            >
              <Select
                options={[
                  { label: "True", value: true },
                  { label: "False", value: false },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerComp;
