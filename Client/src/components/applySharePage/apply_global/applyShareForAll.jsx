import { useState } from 'react';
import { Steps, Button, Divider, Typography } from '@arco-design/web-react';
import { IconLeft } from '@arco-design/web-react/icon';

import { Modal, Form, Message } from '@arco-design/web-react';

import "../apply_individual/applyIndividualShare.css"
import "./applyShareForAll.css"
import ApplyForm from './applyForm';

const Step = Steps.Step;

const ApplyShareForAll = ({applicableIssue, accounts}) => {
  const [current, setCurrent] = useState(1);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [, setFormValidated] = useState(false);
  const [shareApplied, setShareApplied] = useState(false)
  const [form] = Form.useForm();

  const list = (applicableIssue.object).filter((issue) => {
    const hasActionKey = (Object.keys(issue)).includes("action");
    return !hasActionKey
  });
  
  const accountsList = accounts;

  const applyShare = () => {
    form.validate()
        .then((res) => {
          setFormValidated(true)
          setConfirmLoading(true)
        })
        .then(() => {
          setShareApplied(true)
          setConfirmLoading(false);
          setCurrent(current + 1)

          // console.log(form.getFieldsValue(["Accounts", "share", "quantity", "t_pin"]))

          const {Accounts, share, quantity, t_pin} = form.getFieldsValue(["Accounts", "share", "quantity", "t_pin"]);
          const parsedAccounts = Accounts.map(JSON.parse);
          console.log({parsedAccounts, share, quantity, t_pin})
          // hit the apply share endpoint here
          setTimeout(() => form.resetFields(), 1000)
          Message.success('Success !');
        })
        .catch(() => {
          setFormValidated(false)
          Message.error("All the fields are required!")
        });
  }

  const handleModalClose = () => {
    form.resetFields();
    setCurrent(1)
    setVisible(false)
    setFormValidated(false)
    setShareApplied(false)
    setConfirmLoading(false);
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
          <ApplyForm form={form} list={list} accountsList={accountsList} />
          : <h2>This is applying process</h2>
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
      title='Apply Share'
      visible={visible}
      style={{width: 'max-content'}}
      footer={
          <>
            <Button
            type='secondary'
            disabled={current <= 1}
            onClick={() => setCurrent(current - 1)}
            style={{ paddingLeft: 8 }}>
            <IconLeft />
            Back
            </Button>
            {
              !shareApplied?
              <Button
              disabled={current >= 2}
              onClick={() => {
                applyShare()
              }}
              type='primary'>
              Apply
            </Button>
            : <Button
              onClick={handleModalClose}
              type='primary'>
                Ok
              </Button>
            }
          </>
        }
      confirmLoading={confirmLoading}
      onCancel={() => setVisible(false)}>
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
            <Steps direction='vertical' current={current} style={{ width: 170 }}>
              <Step title='Succeeded' description='This is a description' />
              <Step title='Processing' description='This is a description' />
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