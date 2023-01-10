
import React from 'react';
import '../style.css'
import { Form, Input } from 'antd';
import { Avatar } from 'antd';
import { Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import IAccountInfomation, { keyUCFirst } from "./IAccountInfomation"

const AccountInfomation: React.FC<IAccountInfomation> = (props) => {
    return (
        <>
            <h1 className='title'>{props.getItemActive[0]}</h1>
            <hr />
            <Row className='row'>
                <Col className='col' xs={24} sm={24} md={24} lg={6} xl={6}>
                    <Avatar
                        shape="square"
                        size={180}
                        className='avatar'
                        src=""
                        alt='avatar'
                        icon={<UserOutlined />}
                    />
                </Col>
                <Col className='col' xs={24} sm={24} md={24} lg={9} xl={9}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        autoComplete="off"
                        disabled={true}
                    >
                        <Form.Item
                            label="Name"
                        >
                            <Input className='input' value={keyUCFirst(props?.name || "")} />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                        >
                            <Input className='input' value={keyUCFirst(props?.email || "")} />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                        >
                            <Input className='input' value={keyUCFirst(props?.phone_number || "")} />
                        </Form.Item>
                    </Form>
                </Col>
                <Col className='col' xs={24} sm={24} md={24} lg={9} xl={9}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        autoComplete="off"
                        disabled={true}
                    >
                        <Form.Item
                            label="Role"
                        >
                            <Input className='input' value={keyUCFirst(props?.role || "")} />
                        </Form.Item>
                        <Form.Item
                            label="Gender"
                        >
                            <Input className='input' value={keyUCFirst(props?.gender || "")} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default AccountInfomation;