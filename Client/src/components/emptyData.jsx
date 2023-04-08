import { Button, Empty, Space } from "@arco-design/web-react";

const EmptyData = () => {
    return (
    <Space direction='vertical' style={{marginLeft: '45%', display: 'flex', alignItems: 'center'}}>
        <Empty description="No data found"/>
        <Button type='primary' onClick={() => window.location.reload()}>Refresh</Button>
    </Space>
    )
}

export default EmptyData;