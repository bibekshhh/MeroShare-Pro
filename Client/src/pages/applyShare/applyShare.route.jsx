import { 
    Card, 
    Avatar, 
    Typography, 
    Space, 
    Tabs,
    Button,
    Divider
} from '@arco-design/web-react';
import { IconArrowRight, IconDelete } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';

import axios from 'axios';

import "../css/applyShare.css"

import ApplyUserProfile from '../../components/applySharePage/userProfile';
import ApplySharesForIndividualAccount from "../../components/applySharePage/apply_individual/applyIndividualShare"
import PortfolioCards from '../../components/applySharePage/portfolioCards';
import ApplyShareForAll from '../../components/applySharePage/apply_global/applyShareForAll';
import UpdateAccountForm from '../../components/applySharePage/updateAccount';
import handleFetch from '../../components/applySharePage/handleFetch.js';


// const ACCOUNTS_ARRAY = [
//     {
//         "name": "Bibek",
//         "BOID": "1301720000552121",
//         "clientId": "130",
//         "username": "552121",
//         "password": "Shyam1104#",
//         "crn": "123456"
//     },
//     {
//         "name": "Rimita",
//         "BOID": "1301720000552121",
//         "clientId": "130",
//         "username": "552121",
//         "password": "Bibek123",
//         "crn": "123456"
//     },
//     {
//         "name": "Shyam",
//         "BOID": "1301720000552121",
//         "clientId": "130",
//         "username": "552121",
//         "password": "Bibek123",
//         "crn": "123456"
//     },
//     {
//         "name": "Rambha",
//         "BOID": "1301720000552121",
//         "clientId": "130",
//         "username": "552121",
//         "password": "Bibek123",
//         "crn": "123456"
//     },
//     {
//         "name": "Jageshwar",
//         "BOID": "1301720000552121",
//         "clientId": "130",
//         "username": "552121",
//         "password": "Bibek123",
//         "crn": "123456"
//     },
//     {
//         "name": "Kirti",
//         "BOID": "1301720000552121",
//         "clientId": "130",
//         "username": "552121",
//         "password": "Bibek123",
//         "crn": "123456"
//     },
//     {
//         "name": "Surendra",
//         "BOID": "1301720000552121",
//         "clientId": "130",
//         "username": "552121",
//         "password": "Bibek123",
//         "crn": "123456"
//     },
//     {
//         "name": "Faugni Shah",
//         "BOID": "1301720000552121",
//         "clientId": "130",
//         "username": "552121",
//         "password": "Bibek123",
//         "crn": "123456"
//     }
// ];

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

const FetchData = ({data, ACCOUNTS_ARRAY, set_ACCOUNTS_ARRAY}) => {
    const [loading, ] = useState(false);
        
    const [userProfile, setUserProfile] = useState({
        "address": "BIRATNAGAR-04-RAMJANAKI MARGA, BIRATNAGAR, MORANG, NEPAL",
        "boid": "00552121",
        "clientCode": "17200",
        "contact": "9814360065, ",
        "createdApproveDate": "2021-04-02T07:16:35Z",
        "createdApproveDateStr": "2021-04-02",
        "customerTypeCode": "21",
        "demat": "1301720000552121",
        "dematExpiryDate": "2081-03-31",
        "email": "bibekrock2019@gmail.com",
        "expiredDate": "2024-03-30T07:16:35Z",
        "expiredDateStr": "2024-03-30",
        "gender": "M",
        "id": 2457616,
        "imagePath": "",
        "meroShareEmail": "bibekrock2019@gmail.com",
        "name": "BIBEK SHAH",
        "passwordChangeDate": "2023-03-28T15:03:09Z",
        "passwordChangedDateStr": "2023-03-28",
        "passwordExpiryDate": "2024-03-22T15:03:09Z",
        "passwordExpiryDateStr": "2024-03-22",
        "profileName": "MERO SHARE PROFILE",
        "renderDashboard": true,
        "renewedDate": "2023-03-23T04:10:58Z",
        "renewedDateStr": "2023-03-23",
        "username": "00552121"
    });
    const [portfolioData, setPortfolioData] = useState({
            "meroShareMyPortfolio": [
                {
                    "currentBalance": 10,
                    "lastTransactionPrice": "308.1",
                    "previousClosingPrice": "317.0",
                    "script": "MBJC",
                    "scriptDesc": "MADHYA BHOTEKOSHI JALAVIDYUT COMPANY LIMITED- ORDINARY SHARE",
                    "valueAsOfLastTransactionPrice": "3081.00",
                    "valueAsOfPreviousClosingPrice": "3170.00",
                    "valueOfLastTransPrice": 3081,
                    "valueOfPrevClosingPrice": 3170
                },
                {
                    "currentBalance": 10,
                    "lastTransactionPrice": "468.0",
                    "previousClosingPrice": "474.9",
                    "script": "SPC",
                    "scriptDesc": "SAMLING POWER COMPANY LIMITED- ORDINARY SHARE",
                    "valueAsOfLastTransactionPrice": "4680.00",
                    "valueAsOfPreviousClosingPrice": "4749.00",
                    "valueOfLastTransPrice": 4680,
                    "valueOfPrevClosingPrice": 4749
                }
            ],
            "totalItems": 0,
            "totalValueAsOfLastTransactionPrice": "0",
            "totalValueAsOfPreviousClosingPrice": "7919.00",
            "totalValueOfLastTransPrice": 7761,
            "totalValueOfPrevClosingPrice": 7919
        });
    const [availableShares, setAvailableShares] = useState({
        "object": [
            {
                "companyShareId": 528,
                "subGroup": "For General Public",
                "scrip": "KSLY",
                "companyName": "Kumari Sunaulo Lagani Yojana",
                "shareTypeName": "IPO",
                "shareGroupName": "Open Ended Mutual Fund",
                "statusName": "EDIT_APPROVE",
                "issueOpenDate": "Mar 23, 2023 9:30:00 AM",
                "issueCloseDate": "Apr 6, 2023 5:00:00 PM"
            },
            {
                "companyShareId": 531,
                "subGroup": "For General Public",
                "scrip": "MJMSH",
                "companyName": "Makar Jitumaya Suri Hydropower Ltd",
                "shareTypeName": "IPO",
                "shareGroupName": "Ordinary Shares",
                "statusName": "CREATE_APPROVE",
                "issueOpenDate": "Apr 2, 2023 10:00:00 AM",
                "issueCloseDate": "Apr 5, 2023 5:00:00 PM"
            }
        ],
        "totalCount": 0
    });


    // Memoize the fetch function using useMemo
    useEffect(() => {
        // Return the memoized fetch function
         (async() => {
            const availableIssues = await handleFetch(data, 'availableIssues');
            const portfolio = await handleFetch(data, 'portfolio');
            const user = await handleFetch(data, 'userinfo');

            if (!availableIssues || !portfolio || !user || 'errorCode' in portfolio) return
        
            setAvailableShares(availableIssues)
            setPortfolioData(portfolio)
            setUserProfile(user)
        })()
    }, [setUserProfile, setPortfolioData, setAvailableShares, data]);

    console.log({availableShares, userProfile, portfolioData})

    return(
        <>
        <div className="actions-section">
            <div className="info">{data.name}</div>
            <div className="actions">
                <Space size='medium'>
                    <UpdateAccountForm currentInfo={data} set_ACCOUNTS_ARRAY={set_ACCOUNTS_ARRAY} />
                    <Button type='primary' status='danger' icon={<IconDelete />}>
                        Delete
                    </Button>
                </Space>
            </div>
        </div>
        {
            availableShares && (
            <>
            <ApplyShareForAll applicableIssue={availableShares} accounts={ACCOUNTS_ARRAY}/>
            <Divider />
            <ApplySharesForIndividualAccount applicableIssue={availableShares}/>
            <Divider />
            </>
            )
        }
        {portfolioData && <PortfolioCards loading={loading} data={portfolioData} />}
        <Divider />
        {userProfile && <ApplyUserProfile userProfileData={userProfile}/>}
        <Divider />
        </>
    )
}
  
const ApplyShare = () => {
    const [ACCOUNTS_ARRAY, set_ACCOUNTS_ARRAY] = useState([]);

    useEffect(() => {
        (async() => {
            try{
                const res = await axios({
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:9000/action/all-accounts',
                    headers: { }
                  });
                  
                  const accounts = await res.data;
                  set_ACCOUNTS_ARRAY(accounts)
                  return accounts
            } catch (error){
                console.log(error.message)
                return []
            }
        })()
    },[set_ACCOUNTS_ARRAY]);

    console.log(ACCOUNTS_ARRAY)
    
    return (
        <div className='sidebar'>
        <label htmlFor="#" className="content-header">Apply Share</label>
        <Tabs defaultActiveTab='key1' direction={"vertical"} style={{ height: '100%', width: '100%', }}>
            {
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
                            data={x.content} 
                            ACCOUNTS_ARRAY={ACCOUNTS_ARRAY}
                            set_ACCOUNTS_ARRAY={set_ACCOUNTS_ARRAY} />
                        </div>
                        </TabPane>
                    ))
            }
        </Tabs>
        </div>
    );
};
  
export default ApplyShare;