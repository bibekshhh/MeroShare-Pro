import { 
    Space, 
    Divider
} from '@arco-design/web-react';
import { useEffect, useState } from 'react';

import { useQuery } from 'react-query'

import "../css/applyShare.css"

import ApplyUserProfile from '../../components/applySharePage/userProfile';
import ApplySharesForIndividualAccount from "../../components/applySharePage/apply_individual/applyIndividualShare"
import PortfolioCards from '../../components/applySharePage/portfolioCards';
import ApplyShareForAll from '../../components/applySharePage/apply_global/applyShareForAll';
import UpdateAccountForm from '../../components/updateAccount/updateAccount';
import handleFetch from '../../components/updateAccount/updateAccHandle.js';
import DeleteAccount from '../../components/deleteAccount/deleteAccount';
import RecentApplications from '../../components/recentApplications/recentApplications';

const FetchData = ({accountData, ACCOUNTS_ARRAY}) => {
    const [userProfile, setUserProfile] = useState({
        "address": "",
        "boid": "",
        "clientCode": "",
        "contact": "",
        "createdApproveDate": "",
        "createdApproveDateStr": "",
        "customerTypeCode": "",
        "demat": "",
        "dematExpiryDate": "",
        "email": "",
        "expiredDate": "",
        "expiredDateStr": "",
        "gender": "",
        "id": 0,
        "imagePath": "",
        "meroShareEmail": "",
        "name": "",
        "passwordChangeDate": "",
        "passwordChangedDateStr": "",
        "passwordExpiryDate": "",
        "passwordExpiryDateStr": "",
        "profileName": "",
        "renderDashboard": "",
        "renewedDate": "",
        "renewedDateStr": "",
        "username": ""
    });
    const [portfolioData, setPortfolioData] = useState({
            "meroShareMyPortfolio": [
                {
                    "currentBalance": 0,
                    "lastTransactionPrice": "",
                    "previousClosingPrice": "",
                    "script": "",
                    "scriptDesc": "",
                    "valueAsOfLastTransactionPrice": "0",
                    "valueAsOfPreviousClosingPrice": "0",
                    "valueOfLastTransPrice": 0,
                    "valueOfPrevClosingPrice": 0
                },
                {
                    "currentBalance": 0,
                    "lastTransactionPrice": "",
                    "previousClosingPrice": "",
                    "script": "",
                    "scriptDesc": "",
                    "valueAsOfLastTransactionPrice": "0",
                    "valueAsOfPreviousClosingPrice": "0",
                    "valueOfLastTransPrice": 0,
                    "valueOfPrevClosingPrice": 0
                }
            ],
            "totalItems": 0,
            "totalValueAsOfLastTransactionPrice": "0",
            "totalValueAsOfPreviousClosingPrice": "0",
            "totalValueOfLastTransPrice": 0,
            "totalValueOfPrevClosingPrice": 0
    });
    const [availableShares, setAvailableShares] = useState({
        "object": [
            {
                "companyShareId": 201,
                "subGroup": "",
                "scrip": "SCRIP",
                "companyName": "",
                "shareTypeName": "",
                "shareGroupName": "",
                "statusName": "",
                "issueOpenDate": "",
                "issueCloseDate": ""
            }
        ],
        "totalCount": 0
    });

    const { 
        isLoading, 
        isError, 
        isSuccess,
        refetch: refetchProfile,
        error, 
        data: profileData 
    } = useQuery(['profile', accountData], 
    () => handleFetch(accountData),
    {
        staleTime: 10 * 60 * 1000, // block background fetches for 10 minutes
        cacheTime: Infinity, // cache the result indefinitely
        retry: 4, // Will retry failed requests 4 times before displaying an error
        retryDelay: 1000, // Will always wait 4000ms to retry, regardless of how many retries

    })

    if (isLoading) {}
    if (isError) console.log(error.message)

    useEffect(() => {
        if (isSuccess && profileData.success === false){
            refetchProfile()
        } else if (isSuccess || profileData) {
            const { applicableIssues, myPortfoilio, ownDetails } = profileData;
            if (applicableIssues && myPortfoilio && ownDetails) {
              setAvailableShares(applicableIssues);
              setPortfolioData(myPortfoilio);
              setUserProfile(ownDetails);
            }
        }
    }, [isSuccess, profileData, refetchProfile])

    return(
        <>
        <div className="actions-section">
            <div className="info">{accountData.name}</div>
            <div className="actions">
                <Space size='medium'>
                    <UpdateAccountForm currentInfo={accountData} />
                    <DeleteAccount currentInfo={accountData} />
                </Space>
            </div>
        </div>
        {
            (availableShares && portfolioData && userProfile) && (
            <>
            <ApplyShareForAll applicableIssue={availableShares} accounts={ACCOUNTS_ARRAY}/>
            <Divider />
            <ApplySharesForIndividualAccount currentInfo={accountData} applicableIssue={availableShares}/>
            <Divider />
            <PortfolioCards loading={false} data={portfolioData} />
            <Divider />
            <RecentApplications currentInfo={accountData}/>
            <Divider />
            <ApplyUserProfile userProfileData={userProfile} />
            <Divider />
            </>
            )
        }
        </>
    )
}

export default FetchData;