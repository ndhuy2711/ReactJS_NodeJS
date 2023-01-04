
import React, { useState } from 'react';
import '../style.css'
import { Form, Input, Checkbox, Upload, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import IAccountInfomation, { keyUCFirst } from "./IAccountInfomation"

const { Option } = Select;
const ChangeInfomation: React.FC<IAccountInfomation> = (props) => {

    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [itemDisabled, setItemDisabled] = useState<boolean>(false);
    const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
        setComponentDisabled(disabled);
    }
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <h1 className='title'>{props.getItemActive[0]}</h1>
            <hr />
            <Checkbox
                checked={itemDisabled}
                onChange={
                    (e) => {
                        setItemDisabled(e.target.checked)
                        setComponentDisabled(itemDisabled)
                    }}
                className="checkbox"
            >
                Do you want change infomation ?
            </Checkbox>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                onValuesChange={onFormLayoutChange}
                disabled={componentDisabled}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    initialValue={keyUCFirst(props?.name || "")}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    initialValue={keyUCFirst(props?.email || "")}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    initialValue={keyUCFirst(props?.phone_number || "")}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    initialValue={keyUCFirst(props?.gender || "")}
                >
                    <Select placeholder="Select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Change Avatar"
                >
                    <Upload name="avatar" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>


    );
};

export default ChangeInfomation;