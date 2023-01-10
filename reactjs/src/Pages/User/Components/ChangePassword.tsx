
import React, { useState } from 'react';
import '../style.css'
import { Form, Input, Checkbox, Button, Alert, Space } from 'antd';
import IAccountInfomation from "./IAccountInfomation"
import { changePassword } from '../../../Api/Users';
import { removeCookies, setCookies } from '../../../Api/Cookies/handleCookies';
import { removeUser } from '../../../Components/Form/userSlice';
import { useDispatch } from 'react-redux';

const ChangePassword: React.FC<IAccountInfomation> = (props) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [itemDisabled, setItemDisabled] = useState<boolean>(false);
    const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
        setComponentDisabled(disabled);
    }
    const [alert, setAlert] = useState<React.SetStateAction<boolean>>(false)
    const onFinish = async (value: any) => {
        const values = { ...value, email: props.email }
        const result = await changePassword(values)
        const resultFalse = result?.response?.data?.status || false
        const resultTrue = result?.data?.status || false
        if (resultFalse || resultTrue) {
            dispatch(removeUser())
            removeCookies()
            setCookies("")
            window.location.href = '/'
        }
        else {
            setAlert(true)
            form.resetFields();
        }
    };

    return (
        <>
            {alert ?
                <Space direction="vertical" className='alert_register'>
                    <Alert message="Incorrect Password !" type="warning" showIcon closable />
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
                Do you want change password ?
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
                    label="Old Password"
                    name="old_password"
                    rules={[{ required: true, message: 'Please input your old password!' }]}
                >
                    <Input.Password placeholder='Enter your old password' />
                </Form.Item>
                <Form.Item
                    name="new_password"
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Enter your new password' />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['new_password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your new password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='Enter new re-password' />
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

export default ChangePassword;