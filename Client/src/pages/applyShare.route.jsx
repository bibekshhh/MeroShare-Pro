import { 
    Card, 
    Avatar, 
    Typography, 
    Space, 
    Tabs,
    Divider
} from '@arco-design/web-react';

import { IconArrowRight } from '@arco-design/web-react/icon';
import { useState } from 'react';

import "./css/applyShare.css"

import ApplyUserProfile from '../components/applySharePage/userProfile';
import ApplySharesForIndividualAccount from "../components/applySharePage/apply_individual/applyIndividualShare"
import PortfolioCards from '../components/applySharePage/portfolioCards';
import ApplyShareForAll from '../components/applySharePage/apply_global/applyShareForAll';

const ACCOUNTS_ARRAY = [
    {
        "name": "Bibek",
        "BOID": "1301720000552121",
        "clientId": "130",
        "username": "552121",
        "password": "Bibek123",
        "crn": "123456"
    },
    {
        "name": "Rimita",
        "BOID": "1301720000552121",
        "clientId": "130",
        "username": "552121",
        "password": "Bibek123",
        "crn": "123456"
    },
    {
        "name": "Shyam",
        "BOID": "1301720000552121",
        "clientId": "130",
        "username": "552121",
        "password": "Bibek123",
        "crn": "123456"
    },
    {
        "name": "Rambha",
        "BOID": "1301720000552121",
        "clientId": "130",
        "username": "552121",
        "password": "Bibek123",
        "crn": "123456"
    },
    {
        "name": "Jageshwar",
        "BOID": "1301720000552121",
        "clientId": "130",
        "username": "552121",
        "password": "Bibek123",
        "crn": "123456"
    },
    {
        "name": "Kirti",
        "BOID": "1301720000552121",
        "clientId": "130",
        "username": "552121",
        "password": "Bibek123",
        "crn": "123456"
    },
    {
        "name": "Surendra",
        "BOID": "1301720000552121",
        "clientId": "130",
        "username": "552121",
        "password": "Bibek123",
        "crn": "123456"
    },
    {
        "name": "Faugni Shah",
        "BOID": "1301720000552121",
        "clientId": "130",
        "username": "552121",
        "password": "Bibek123",
        "crn": "123456"
    }
];

const Content = ({ children, user }) => {
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
          <Typography.Text className="text-muted">{user.BOID}</Typography.Text>
        </Space>
        {children}
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

const FetchData = ({data}) => {
    const [loading, ] = useState(false);
    // do the user mero share data fetch here
    const userProfile = {
        "address": "BIRATNAGAR-04-RAMJANAKI MARGA, BIRATNAGAR, MORANG, NEPAL",
        "boid": "00552121",
        "clientCode": "17200",
        "contact": "9814360065, ",
        "createdApproveDate": "2021-04-02T07:16:35Z",
        "createdApproveDateStr": "2021-04-02",
        "customerTypeCode": "21",
        "demat": "1301720000552121",
        "dematExpiryDate": "2080-03-31",
        "email": "bibekrock2019@gmail.com",
        "expiredDate": "2024-03-30T07:16:35Z",
        "expiredDateStr": "2024-03-30",
        "gender": "M",
        "id": 2457616,
        "imagePath": "",
        "meroShareEmail": "bibekrock2019@gmail.com",
        "name": "BIBEK SHAH",
        "passwordChangeDate": "2022-03-30T11:52:59Z",
        "passwordChangedDateStr": "2022-03-30",
        "passwordExpiryDate": "2023-03-25T11:52:59Z",
        "passwordExpiryDateStr": "2023-03-25",
        "profileName": "MERO SHARE PROFILE",
        "renderDashboard": true,
        "renewedDate": "2022-03-03T16:17:31Z",
        "renewedDateStr": "2022-03-03",
        "username": "00552121"
    }

    const portfolioData = {
        meroShareMyPortfolio: [
        {
            "currentBalance": 10.0,
            "lastTransactionPrice": "329.8",
            "previousClosingPrice": "318.0",
            "script": "MBJC",
            "scriptDesc": "MADHYA BHOTEKOSHI JALAVIDYUT COMPANY LIMITED- ORDINARY SHARE",
            "valueAsOfLastTransactionPrice": "3298.00",
            "valueAsOfPreviousClosingPrice": "3180.00",
            "valueOfLastTransPrice": 3298.0,
            "valueOfPrevClosingPrice": 3180.0
        },
        {
            "currentBalance": 10.0,
            "lastTransactionPrice": "379.0",
            "previousClosingPrice": "374.0",
            "script": "SGHC",
            "scriptDesc": "SWET GANGA HYDROPOWER & CONSTRUCTION LIMITED - ORDINARY SHARE",
            "valueAsOfLastTransactionPrice": "3790.00",
            "valueAsOfPreviousClosingPrice": "3740.00",
            "valueOfLastTransPrice": 3790.0,
            "valueOfPrevClosingPrice": 3740.0
        },
        {
            "currentBalance": 10.0,
            "lastTransactionPrice": "465.0",
            "previousClosingPrice": "452.8",
            "script": "SPC",
            "scriptDesc": "SAMLING POWER COMPANY LIMITED- ORDINARY SHARE",
            "valueAsOfLastTransactionPrice": "4650.00",
            "valueAsOfPreviousClosingPrice": "4528.00",
            "valueOfLastTransPrice": 4650.0,
            "valueOfPrevClosingPrice": 4528.0
        }
        ],
        "totalItems": 3,
        "totalValueAsOfLastTransactionPrice": "11738.00",
        "totalValueAsOfPreviousClosingPrice": "11448.00",
        "totalValueOfLastTransPrice": 11738.0,
        "totalValueOfPrevClosingPrice": 11448.0
    }

    const availableShares = {
        "object": [
            {
                "companyShareId": 503,
                "subGroup": "For General Public",
                "scrip": "SMHL",
                "companyName": "Super Madi Hydropower Ltd.",
                "shareTypeName": "IPO",
                "shareGroupName": "Ordinary Shares",
                "statusName": "CREATE_APPROVE",
                "issueOpenDate": "Jan 23, 2023 10:00:00 AM",
                "issueCloseDate": "Jan 26, 2023 5:00:00 PM"
            },
            {
                "companyShareId": 504,
                "subGroup": "Mutual Fund For General Public",
                "scrip": "SFEF",
                "companyName": "Sunrise Focused Equity Fund",
                "shareTypeName": "IPO",
                "shareGroupName": "Close Ended Mutual Fund",
                "statusName": "CREATE_APPROVE",
                "issueOpenDate": "Jan 24, 2023 10:00:00 AM",
                "issueCloseDate": "Jan 27, 2023 5:00:00 PM"
            },
            {
                // "action": "edit",
                "companyShareId": 524,
                "subGroup": "Mutual Fund For General Public",
                "scrip": "SFEF",
                "companyName": "Sunrise Focused Equity Fund",
                "shareTypeName": "IPO",
                "shareGroupName": "Close Ended Mutual Fund",
                "statusName": "CREATE_APPROVE",
                "issueOpenDate": "Jan 24, 2023 10:00:00 AM",
                "issueCloseDate": "Jan 27, 2023 5:00:00 PM"
            }
        ],
        "totalCount": 0
    };

    return(
        <>
        {/* <p>{data.name}</p> */}
        <ApplyShareForAll applicableIssue={availableShares} accounts={ACCOUNTS_ARRAY}/>
        <Divider />
        <ApplySharesForIndividualAccount applicableIssue={availableShares}/>
        <Divider />
        <PortfolioCards loading={loading} data={portfolioData} />
        <Divider />
        <ApplyUserProfile userProfileData={userProfile}/>
        <Divider />
        </>
    )
}

const tabs = ACCOUNTS_ARRAY.map((data, index) => ({
  title: 
  <Card
    className='card-with-icon-hover'
    hoverable
    style={{ width: 320, padding: 0 }} >
        <Content user={data}>
            <span className='icon-hover'>
                <IconArrowRight
                style={{
                    cursor: 'pointer',
                }} />
            </span>
        </Content>
    </Card>,
  key: `key${index + 1}`,
  content: data,
}));
  
const ApplyShare = () => {
    return (
        <div className='sidebar'>
        <label htmlFor="#" className="content-header">Apply Share</label>
        <Tabs defaultActiveTab='key1' direction={"vertical"} style={{ height: '100%', width: '100%', }}>
            {tabs.map((x, i) => (
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
            <div style={paneStyle}>{
                <FetchData
                data={x.content} />}
            </div>
            </TabPane>
            ))}
        </Tabs>
        </div>
    );
};
  
export default ApplyShare;