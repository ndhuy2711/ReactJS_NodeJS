
import React, { useState } from 'react';
import '../style.css'
import { Form, Input, Checkbox, Button } from 'antd';
import IAccountInfomation from "./IAccountInfomation"
const ChangePassword: React.FC<IAccountInfomation> = (props) => {

    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [itemDisabled, setItemDisabled] = useState<boolean>(false);
    const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
        setComponentDisabled(disabled);
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your new password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
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