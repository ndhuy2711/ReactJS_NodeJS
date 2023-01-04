import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Button, Checkbox, Form, Input } from 'antd';
import "./Common.css"
import { login } from '../../Api/Auth';
import { Alert, Space } from 'antd';
import { removeCookies, setCookies } from '../../Api/Cookies/handleCookies';
import { getUser } from './userSlice';

const Login: React.FC = () => {
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    }
    const [form] = Form.useForm();
    const [alert, setAlert] = useState<React.SetStateAction<boolean>>(false)
    const dispatch = useDispatch()
    const onFinish = async (values: any) => {
        const result = await login(values)
        form.resetFields();
        if (result?.data?.statusLogin) {
            const token = result.data.token
            dispatch(getUser(result.data.user))
            setCookies(token)
            window.location.href = '/'

        }
        else {
            setAlert(true)
            removeCookies()
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

                    <Form.Item name="remember" valuePropName="checked" {...tailFormItemLayout}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
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