import { Button, Layout, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Error404Props {
}

export const Error404: React.FC<Error404Props> = props => {
    const navigate = useNavigate();

    return (
        <Layout style={{height:'100vh'}}>
            <Result
                status={"404"}
                title="Not Found"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button onClick={() => navigate('/')}>Home</Button>
                }
            />
        </Layout>
    )
}