import { Modal, Spin, Button, Form, Select, Notification, Message, InputNumber, Tag } from '@arco-design/web-react';
import { Checkbox, Space, Typography } from '@arco-design/web-react';

import { useState } from 'react';
import "./applyIndividualShare.css"

const FormItem = Form.Item;
const Option = Select.Option;

const ApplySharesForIndividualAccount = ({applicableIssue}) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const list = (applicableIssue.object).filter((issue) => {
    const hasActionKey = (Object.keys(issue)).includes("action");
    return !hasActionKey
  })

  const applyShare = () => {
    form.validate()
    .then((res) => {
      setConfirmLoading(true)
      setTimeout(() => {
        form.resetFields();
        Notification.success({
          title: 'Success',
          content: 'Applied Successfully!',
        })
        console.log(res)
        setVisible(false);
        setConfirmLoading(false);
      }, 3500);
    })
    .catch(() => Message.error("All the fields are required"))
  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  return (
    <div>
      <div className="available-shares">
      <label htmlFor="$" className="internal-content-header">Available Issues</label>
      <Checkbox.Group
        style={{
            display: 'flex',
            flexDirection: "row",
            flexWrap: "wrap",
            gap: '1em 0'
        }}>
        {list.map((item) => {
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
        })}
      </Checkbox.Group>
      </div>
      <Button onClick={() => setVisible(true)} id='apply-individual-share-btn' type='secondary'>
        Apply Share
      </Button>
      <Modal
        title='Apply Share'
        visible={visible}
        style={{width: '500px'}}
        footer={
            <>
              <Button
                onClick={() => {
                  form.resetFields();
                  setVisible(false);
                }}>
                Cancel
              </Button>
              <Button
                loading={confirmLoading}
                onClick={applyShare}
                type='primary'>
                Apply
              </Button>
            </>
          }
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}>
        <Spin delay={500} size={30} tip='This may take a while...' loading={confirmLoading}>
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' },
          }}>

          <FormItem label='Share' field='share' rules={[{ required: true }]}>
            <Select
            mode='multiple'
            placeholder='Please select'
            style={{ width: '100%' }}
            defaultValue={[]}
            allowClear
            renderTag={({ label, value, closable, onClose }, index, valueList) => {
                const tagCount = valueList.length;

                if (tagCount > 2) {
                    return index === 0 ? (
                    <span style={{ marginLeft: 8 }}>{`${tagCount} shares selected`}</span>
                    ) : null;
                }

                return (
                    <Tag
                    color='arcoblue'
                    closable={closable}
                    onClose={onClose}
                    style={{ margin: '2px 6px 2px 0' }}
                    >
                    {label}
                    </Tag>
                );
                }}>

                {(list).map((option) => (
                <Option key={option.scrip + option.companyShareId} value={option.companyShareId}>
                    {option.scrip + " - " + option.shareGroupName}
                </Option>
                ))}
            </Select>
          </FormItem>
          <FormItem label='Quantity' field='quantity' rules={[{ required: true }]}>
            <InputNumber
                min={0}
                defaultValue={500}
                suffix='Kitta'
                step={10}
                precision={0}
                style={{ width: 200}}
            />
          </FormItem>
          <FormItem label='PIN' required field='t_pin' rules={[{ required: true }]}>
            <InputNumber
                max={999999}
                precision={0}
                style={{ width: 160, }}
                />
          </FormItem>
        </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default ApplySharesForIndividualAccount;