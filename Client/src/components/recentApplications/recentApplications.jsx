import { Card, Tag, Typography, Space } from '@arco-design/web-react';
import { IconCheckCircleFill, IconCloseCircle, IconClockCircle } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import handleRecentApplication from './handleRecentApplication';
import EmptyData from '../emptyData';

const RecentApplications = ({ currentInfo }) => {
    const [recentApplications, setRecentApplications] = useState([])

    const {isLoading, data, isSuccess, isError, refetch} = useQuery(
        ["recentApplications", currentInfo],
        () => handleRecentApplication(currentInfo),
        {
            staleTime: 10 * 60 * 1000, // block background fetches for 10 minutes
            cacheTime: Infinity, // cache the result indefinitely
            retry: 4, // Will retry failed requests 4 times before displaying an error
            retryDelay: 1000, // Will always wait 4000ms to retry, regardless of how many retries
        }
    )

    if (isLoading) {}
    if (isError) refetch()
    if (isSuccess) {}

    useEffect(() => {
        if (isSuccess && data.success === true) {
            const newApplications = data.data.object || [];
            const newData = newApplications.slice(0, 3);
            setRecentApplications(newData);
        } else if (isSuccess && data.status === false){
            refetch()
        }
    }, [isSuccess, data, refetch])

    const CardTitle = ({item}) => {
        if (item.statusName === "TRANSACTION_SUCCESS") {
            return <Tag color="green" bordered icon={<IconCheckCircleFill />}>Success</Tag>
        } else if (item.statusName === "BLOCKED_APPROVE") {
            return <Tag color="arcoblue" bordered icon={<IconClockCircle />}>Pending</Tag>
        } else if (item.statusName === "BLOCK_FAILED") {
            return <Tag color="red" bordered icon={<IconCloseCircle />}>Failed</Tag>
        } else if (item.statusName === "APPROVED") {
            return <Tag color="green" bordered icon={<IconCheckCircleFill />}>Approved</Tag>
        } else if (item.statusName === "TRANSACTION_PENDING"){
            return <Tag color="arcoblue" bordered icon={<IconClockCircle />}>Pending</Tag>
        }
    }

    return(
        <div>
        <label htmlFor="$" className="internal-content-header">Recent Applications</label>
        <div 
        className="recent-applications"
        style={{display: 'flex', flexDirection: 'row', gap: '10px 15px', flexWrap: 'wrap'}}
        >
        {
            recentApplications.length > 0 ? (
                recentApplications.map((item) => {
                    return (
                    <Card
                        className="recent-application-card"
                        key={`${item.scrip} - ${item.shareTypeName}`}
                        title={`${item.scrip} · ${item.shareTypeName}`}
                        extra={<CardTitle item={item}/>}
                        bordered={true}
                        style={{
                            backgroundColor: "rgba(245, 245, 245, 0.90)",
                            width: '250px',
                        }}
                    >
                        <Space
                        style={{
                            all: 'unset',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start'
                        }}>
                            <Typography.Text bold>{item.companyName}</Typography.Text>
                            <Typography.Text type='secondary'>
                                {`Status: ${(item.statusName === "BLOCKED_APPROVE") ? "Amount Blocked" 
                                : (item.statusName === "TRANSACTION_SUCCESS") ? item.allottedStatus
                                : (item.statusName === 'APPROVED') ? "Amount Blocked"
                                : (item.statusName === "TRANSACTION_PENDING") ? "Transaction Pending"
                                : "Amount Block Failed"
                                }`}</Typography.Text>
                            <Typography.Text type='secondary'>{`Type: ${item.shareGroupName}`}</Typography.Text>
                            <Typography.Text type='secondary'>{`Class: ${item.subGroup}`}</Typography.Text>
                        </Space>
                    </Card>
                    )
                })
            ): (<EmptyData />)
        }
        </div>
    </div>
    )
}

export default RecentApplications;