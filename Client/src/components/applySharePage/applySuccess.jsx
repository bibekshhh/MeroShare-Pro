import { Alert, Grid } from '@arco-design/web-react';
const { Col } = Grid;

const ApplySuccess = ({ applyData, currentInfo }) => {
    console.log("applyData: ", applyData);
  
    if (!applyData || Object.keys(applyData).length === 0) {
      console.log("Rendering null");
      return null;
    }
  
    console.log("Rendering applyData");
  
    return (
      <>
        <Col span={12} style={{width: '100%'}}>
          {Object.entries(applyData).map(([key, item], index) => {
            const alertType = item.success ? "success" : "error";
            const alertContent = item.success
              ? `Applied ${item.data?.appliedKitta} kitta`
              : item.error;
  
            return (
              <Alert
                key={index}
                style={{ marginBottom: 10, width: '100%' }}
                type={alertType}
                title={`${key.substring(key.indexOf(" ") + 1)} · ${item.success ? "Success" : "Failed"}`}
                content={alertContent}
              />
            );
          })}
        </Col>
      </>
    );
  };
  

export default ApplySuccess;

