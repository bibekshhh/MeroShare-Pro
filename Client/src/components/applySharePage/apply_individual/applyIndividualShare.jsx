import { Modal, Button, Form, Notification, Message, Empty } from '@arco-design/web-react';
import { Checkbox, Space, Typography } from '@arco-design/web-react';

import { useState } from 'react';
import { Steps, Divider } from '@arco-design/web-react';

import { IconLeft } from '@arco-design/web-react/icon';

import { useQueryClient } from 'react-query';

import "./applyIndividualShare.css"
import ApplyIndividualForm from './applyForm';
import ApplySuccess from '../applySuccess';
import applyIndividualHandle from './apply_IPO_handle';

const Step = Steps.Step;

const ApplySharesForIndividualAccount = ({currentInfo, applicableIssue}) => {
  const queryClient = useQueryClient();

  const [current, setCurrent] = useState(1);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [applyData, setApplyData] = useState({})

  const list = (applicableIssue.object).filter((issue) => {
    const hasActionKey = (Object.keys(issue)).includes("action");
    return !hasActionKey
  })

  const applyShare = () => {
    form.validate()
    .then(async (formRes) => {

      setCurrent(current + 1)
      setConfirmLoading(true);

      const applyIPO_Res = await applyIndividualHandle(formRes, currentInfo);

      Notification.success({
        title: 'Success',
        content: 'Applied Successfully!',
      })

      queryClient.invalidateQueries('profile', { force: true });
      queryClient.invalidateQueries('recentApplications', { force: true });

      setApplyData(applyIPO_Res)
      form.resetFields();
      setConfirmLoading(false);
    })
    .catch(() => Message.error("All the fields are required"))
  }

  function renderContent(step) {
    return (
      <div
        style={{
          width: '450px',
          paddingRight: '10px',
          height: 272,
          background: 'var(--color-bg-2)',
          color: '#C2C7CC',
        }}>
        
        {
          step === 1? 
          <ApplyIndividualForm form={form} currentInfo={currentInfo} list={list}/>
          : <ApplySuccess applyData={applyData} currentInfo={currentInfo}/>
        }
      </div>
    );
  }

  return (
    <div>
      <div className="available-shares">
      <label htmlFor="$" className="internal-content-header">
        <span className='me-4'>Available Issues</span> 
        <Button 
        onClick={() => setVisible(true)} 
        id='apply-individual-share-btn'
        type='secondary'>
          Apply Share
        </Button>
      </label>
      <Checkbox.Group
        style={{
            display: 'flex',
            flexDirection: "row",
            flexWrap: "wrap",
            gap: '1em 0'
        }}>
        {
          list.length === 0 ? (<Empty description="No available issues"/>)
          : (
            list.map((item) => {
              return (
                  <Checkbox key={item.companyShareId} value={item.scrip} checked disabled>
                  {() => {
                      return (
                      <Space
                          align='start'
                          color='gray'
                          className="custom-checkbox-card custom-checkbox-card-checked">
                
                          <div>
                          <div className='custom-checkbox-card-title'>{item.scrip + " - " + item.shareGroupName}</div>
                              <Space
                              style={{
                                  all: 'unset',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'flex-start'
                              }}>
                                  <Typography.Text bold>{item.companyName}</Typography.Text>
                                  <Typography.Text type='secondary'>{"Open: " + item.issueOpenDate}</Typography.Text>
                                  <Typography.Text type='secondary'>{"Close: " + item.issueCloseDate}</Typography.Text>
                              </Space>
                          </div>
                      </Space>
                      );
                  }}
                  </Checkbox>
              );
            })
          )
        }
      </Checkbox.Group>
      </div>
      <Modal
        title={`Apply Share for ${currentInfo.name}`}
        visible={visible}
        style={{width: '700px'}}
        footer={
          <>
            <Button
              type='secondary'
              disabled={current <= 2}
              onClick={() => setCurrent(current - 1)}
              style={{ paddingLeft: 8 }}>
              <IconLeft />
              Back
            </Button>
            <Button
              disabled={current === 2}
              onClick={() => applyShare()}
              loading={confirmLoading}
              type='primary'>
                {
                  confirmLoading === true ? "Applying" : "Apply"
                }
            </Button>
          </>
      }
      confirmLoading={confirmLoading}
      onCancel={() => {
        if (confirmLoading === false){
          setCurrent(1)
          setVisible(false)
        }
      }}>
        <div
        style={{
            display: 'flex',
            maxWidth: 780,
            padding: 0,
            background: 'var(--color-bg-2)'
          }} >
          <div
            style={{
              background: 'var(--color-bg-2)',
              padding: '10px 15px',
              height: 272,
              boxSizing: 'border-box',
            }}>
            <Steps direction='vertical' current={current} style={{ width: 150 }}>
              <Step title='Details' description='Fill in the details' />
              <Step title='Processing' description='Status window' />
            </Steps>
          </div>
          <Divider type='vertical' style={{ display: 'block', height: 'auto', margin: '0 20px 0 15px', background: 'white' }}/>
          {renderContent(current)}
        </div>
      </Modal>
    </div>
  );
};

export default ApplySharesForIndividualAccount;