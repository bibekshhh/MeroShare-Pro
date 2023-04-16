import { useState } from 'react';
import { Steps, Button, Divider, Typography, Notification } from '@arco-design/web-react';
import { IconLeft } from '@arco-design/web-react/icon';

import { Modal, Form, Message } from '@arco-design/web-react';


import "../apply_individual/applyIndividualShare.css"
import "./applyShareForAll.css"
import ApplyForm from './applyForm';
import GlobalShareApply from './GlobalShareApply';

const Step = Steps.Step;

const ApplyShareForAll = ({applicableIssue, accounts}) => {
  const [current, setCurrent] = useState(1);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [applyData, setApplyData] = useState([]);

  const [form] = Form.useForm();

  const list = (applicableIssue.object).filter((issue) => {
    const hasActionKey = (Object.keys(issue)).includes("action");
    return !hasActionKey
  });
  
  const accountsList = accounts;

  const applyShare = () => {
    form.validate()
        .then((res) => {
          
          Notification.success({
            title: 'Success',
            content: 'Applied Successfully!',
          })
          setApplyData(res)
          // after apply button clicked
          form.resetFields();
    
          setCurrent(current + 1)
          setConfirmLoading(true);
        })
        .catch(() => {
          Message.error("All the fields are required!")
        });
  }

  function renderContent(step) {
    return (
      <div
        style={{
          width: '450px',
          paddingRight: '10px',
          height: 320,
          maxHeight: 320,
          overflow: 'auto',
          scrollBehavior: 'smooth',
          background: 'var(--color-bg-2)',
          color: '#C2C7CC',
        }}>
        
        {
          step === 1? 
          <ApplyForm form={form} list={list} accountsList={accountsList} />
          : <GlobalShareApply form={applyData} setConfirmLoading={setConfirmLoading}/>
        }
      </div>
    );
  }

  return (
    <>
    <div className="applyShareForAll-css">
      <Typography.Text type='secondary'>Want to apply share for all your account?</Typography.Text>
      <Button onClick={() => setVisible(true)} type='outline' status='secondary'>
        Apply Share
      </Button>
    </div>
    <Modal
      title='Apply Share for multiple Accounts'
      visible={visible}
      style={{width: 'max-content'}}
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
              onClick={() => {
                applyShare()
              }}
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
              height: '320px',
              maxHeight: '320px',
              overflow: 'auto',
              boxSizing: 'border-box',
            }}>
            <Steps direction='vertical' current={current} style={{ width: 170 }}>
              <Step title='Details' description='Fill in the details' />
              <Step title='Processing' description='Status window' />
            </Steps>
          </div>
          <Divider type='vertical' style={{ display: 'block', height: 'auto', margin: '0 20px 0 15px', background: 'white' }}/>
          {renderContent(current)}
        </div>
    </Modal>
    </>
  );
}

export default ApplyShareForAll;