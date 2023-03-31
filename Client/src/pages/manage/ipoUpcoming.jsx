import { Card, Space, Typography, Tag } from '@arco-design/web-react';
import { IconClockCircle } from '@arco-design/web-react/icon';

const ListUpcomingIPOs = ({item}) => {
    return(
        <Card
            style={{ width: 250 }}
            className="upcoming-ipo-list-card"
            title={item.StockSymbol}
            hoverable
            extra={
                <>
                <Tag color='arcoblue'>
                <IconClockCircle style={{ verticalAlign: 'middle', color: 'rgb(var(--warning-6))', marginRight: "5px" }} /> 
                    <Typography.Text type='primary'>
                        {Math.ceil(Math.abs((new Date(item.StartDateString)).getTime() - (new Date()).getTime()) / (1000 * 3600 * 24))}
                        <span style={{marginLeft: '4px'}}>days to go</span>
                    </Typography.Text>
                </Tag>
                </>
            }
        >
            <Space direction='vertical'>
                <div className='item'><span>Share:</span> <span>{item.CompanyName}</span></div>
                <div className='item '><span>Share Type:</span> <span>{item.ShareType}</span></div>
                <div className='item'>
                    <span>Date:</span>  <span style={{color: "rgb(var(--warning-6))"}}>{item.StartDateNP}</span> - <span style={{color: "rgb(var(--warning-6))"}}>{item.EndDateNP}</span>
                </div>
                <div className='item'><span>Issue Manager:</span> {item.IssueManager}</div>
            </Space>
        </Card>
    )
}

export default ListUpcomingIPOs;