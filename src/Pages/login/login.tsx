import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

interface LoginProps {

}

export const Login: React.FC<LoginProps> = (props) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    return (
        <div>
            <Layout style={{ height: '100vh' }}>
                <Content>
                    <Row align="middle" justify={"center"} style={{ height: '100%' }}>
                        <Col span={5}>
                            <Typography.Title>Login</Typography.Title>
                            <Form onFinish={() => {
                                setAuth({
                                    expDate: '',
                                    token: ''
                                });
                                navigate('/')
                            }}>
                                <Form.Item>
                                    <Input prefix={<UserOutlined />} />
                                </Form.Item>
                                <Form.Item>
                                    <Input.Password prefix={<KeyOutlined />} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit'>Login</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}
