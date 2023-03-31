import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express();

const PORT = 8080 || process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/upcomingIPO', async(req, resOut) => {
    const raw = JSON.stringify({
        "offset": 1,
        "limit": "10",
        "categoryID": 2,
        "portalID": "1",
        "cultureCode": "en-US",
        "StockSymbol": ""
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://www.nepalipaisa.com/Modules/Investment/webservices/InvestmentService.asmx/GetAllInvestmentInfobyCategoryID',
        headers: { 
            'Content-Type': 'application/json',
        },
        data : raw
    };
    
    const res = await axios.request(config);
    const filteredData = await res.data.d.filter(
        item => 
        item.IsActive === true 
        && item.IsDeleted === false 
        && item.CategoryName === "IPO"
        && new Date(item.StartDateString) > new Date() )
        .map(item => ({
            StartDateNP: item.StartDateNP,
            EndDateNP: item.EndDateNP,
            ShareType: item.ShareType,
            IssueManager: item.IssueManager,
            CompanyName: item.CompanyName,
            StockSymbol: item.StockSymbol,
            StartDateString: item.StartDateString,
            EndDateString: item.EndDateString
            })
        )
    
    resOut.send(filteredData)
    console.log("Sent successfully")
    console.log(filteredData)

})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
