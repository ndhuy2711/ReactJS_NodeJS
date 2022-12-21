import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Button, Checkbox, Form, Input } from 'antd';
import "./Common.css"
import { login } from '../../Api/Auth';
import { useNavigate } from 'react-router-dom';
import { Alert, Space } from 'antd';
import { removeCookies, setCookies } from '../../Api/Cookies/handleCookies';
import { getUser } from './userSlice';

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const [alert, setAlert] = useState<React.SetStateAction<boolean>>(false)
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (values: any) => {
        const result = await login(values)
        console.log("result :", result);
        form.resetFields();
        if (result?.data?.statusLogin) {
            const token = result.data.token
            dispatch(getUser(result.data.user))
            setCookies(token)
            window.location.href = '/'

        }
        else {
            removeCookies()
            setAlert(true)
            window.location.href = '/login'
        }

    };

    return (
        <div>
            {alert ?
                <Space direction="vertical" className='alert_register'>
                    <Alert message="Login failed !" type="warning" showIcon closable />
                </Space>
                :
                <></>
            }
            <div className='container'>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter your email' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder='Enter password' />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
};

export default Login;