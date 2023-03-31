import axios from 'axios'

async function getIPOList(token) {
    let data = JSON.stringify({
        "filterFieldParams": [
          {
            "key": "companyIssue.companyISIN.script",
            "alias": "Scrip"
          },
          {
            "key": "companyIssue.companyISIN.company.name",
            "alias": "Company Name"
          },
          {
            "key": "companyIssue.assignedToClient.name",
            "value": "",
            "alias": "Issue Manager"
          }
        ],
        "page": 1,
        "size": 10,
        "searchRoleViewConstants": "VIEW_APPLICABLE_SHARE",
        "filterDateParams": [
          {
            "key": "minIssueOpenDate",
            "condition": "",
            "alias": "",
            "value": ""
          },
          {
            "key": "maxIssueCloseDate",
            "condition": "",
            "alias": "",
            "value": ""
          }
        ]
    });

    const res = await axios({
        method: 'post',
        url: 'https://webbackend.cdsc.com.np/api/meroShare/companyShare/applicableIssue/',
        headers: { 
            'Authorization': `${token}`, 
            'Content-Type': 'application/json'
        },
        data : data
    });

    return res.data.object
}

export default getIPOList;