import { 
    Card, 
    Avatar, 
    Typography, 
    Space, 
    Tabs,
} from '@arco-design/web-react';
import { IconArrowRight } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';

import { useQuery } from 'react-query'

import "../css/applyShare.css"

import FetchData from './FetchData';
import getAllAccounts from '../../components/getAllAccounts';
import EmptyData from '../../components/emptyData';

const Content = ({ user }) => {
    return (
      <Space
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Space>
          <Avatar
            style={{
              backgroundColor: 'rgb(22, 93, 255)',
            }}
            size={28}
          >
            {user.name.substring(0, 1)}
          </Avatar>
          <Typography.Text>{user.name}</Typography.Text>
          <br />
          <Typography.Text className="text-muted">{user.boid}</Typography.Text>
        </Space>
        <span className='icon-hover'>
            <IconArrowRight
            style={{
                cursor: 'pointer',
            }} />
        </span>
      </Space>
    );
};

const TabPane = Tabs.TabPane;
const paneStyle = {
    position: 'relative',
    width: '100%',
    height: 'max-content',
    maxHeight: 'max-content',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 0',
    margin: '0',
    color: 'black',
};
  
const ApplyShare = () => {
    const [ACCOUNTS_ARRAY, set_ACCOUNTS_ARRAY] = useState([]);

    const {isLoading, data: allAccounts, isSuccess, refetch, isError} = useQuery(
        "allAccounts",
        () => getAllAccounts(),
        {
            staleTime: 10 * 60 * 1000, // block background fetches for 10 minutes
            cacheTime: Infinity, // cache the result indefinitely
            retry: 4, // Will retry failed requests 4 times before displaying an error
            retryDelay: 1000, // Will always wait 4000ms to retry, regardless of how many retries
    
        }
    )

    if (isLoading) console.log("Loading..")
    if (isError) refetch()
    if (isSuccess) {}

    useEffect(() => {
        if (isSuccess && allAccounts) {
            set_ACCOUNTS_ARRAY(allAccounts)
          }
    }, [isSuccess, allAccounts])
    
    return (
        <div className='sidebar'>
        <label htmlFor="#" className="content-header">Apply Share</label>
        <Tabs defaultActiveTab='key1' direction={"vertical"} style={{ height: '100%', width: '100%', }}>
            {
                ACCOUNTS_ARRAY.length > 0 ? (
                    ACCOUNTS_ARRAY
                    .map((data, index) => ({
                        title: 
                            <Card
                            className='card-with-icon-hover'
                            hoverable
                            style={{ width: 320, padding: 0 }} >
                                <Content user={data} />
                            </Card>,
                        key: `key${index + 1}`,
                        content: data,
                    }))
                    .map((x, i) => (
                        <TabPane
                        destroyOnHide
                        key={x.key}
                        title={x.title}
                        style={
                            {
                                padding: '0 10px',
                                height: 'max-content',
                                width: '100%',
                                maxWidth: 'max-content',
                                maxHeight: 'max-content !important',
                                overflow: 'auto'
                            }
                        }>
                        <div style={paneStyle}>
                            <FetchData 
                            accountData={x.content} 
                            ACCOUNTS_ARRAY={ACCOUNTS_ARRAY} />
                        </div>
                        </TabPane>
                    ))
                ) : (<EmptyData />)
            }
        </Tabs>
        </div>
    );
};
  
export default ApplyShare;