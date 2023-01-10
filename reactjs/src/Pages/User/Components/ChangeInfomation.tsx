
import React, { useState } from 'react';
import '../style.css'
import { Form, Input, Checkbox, Upload, Button, Select, Space, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import IAccountInfomation, { keyUCFirst } from "./IAccountInfomation"
import { updateUser } from '../../../Api/Users';

const { Option } = Select;
const ChangeInfomation: React.FC<IAccountInfomation> = (props) => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [itemDisabled, setItemDisabled] = useState<boolean>(false);
    const [alert, setAlert] = useState<React.SetStateAction<boolean>>(false)
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
    const onFinish = async (values: any) => {
        const value = { ...values }
        const result = await updateUser(value)
        console.log("result abc :", result);
        const resultFalse = result?.response?.data?.status || false
        const resultTrue = result?.data?.status || false
        if (resultFalse || resultTrue) {
            console.log('Success:', result)
            window.location.href = '/user'
        }
        else {
            setAlert(true)
        }

    };
    return (
        <>
            {alert ?
                <Space direction="vertical" className='alert_register'>
                    <Alert message="User Infomation Cannot Be Changed !" type="warning" showIcon closable />
                </Space>
                :
                <></>
            }
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
                autoComplete="off"
                onValuesChange={onFormLayoutChange}
                disabled={componentDisabled}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    tooltip="Email don't change in here !"
                    initialValue={keyUCFirst(props?.email || "")}
                >
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    initialValue={keyUCFirst(props?.name || "")}
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