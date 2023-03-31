import { Descriptions } from '@arco-design/web-react';

const wantedKeyFields = ["boid", "clientCode", "demat", "dematExpiryDate", "passwordExpiryDateStr", "renewedDateStr", "meroShareEmail", "name" ];

const ApplyUserProfile = ({userProfileData}) => {
    var data = [...Object.keys(userProfileData)].filter(item => {
        return wantedKeyFields.includes(item)
    }).map(item => {
        return {label: `${(item.charAt(0).toUpperCase() + item.slice(1)).replace(/([A-Z])/g, ' $1').trim()}`, value: userProfileData[item]}
    })

    return(
        <>
        <label htmlFor="$" className="internal-content-header">User Info</label>
        <Descriptions data={data} layout='inline-vertical' style={{ minWidth: '700px' }}/>    
        </>
    )
}

export default ApplyUserProfile;