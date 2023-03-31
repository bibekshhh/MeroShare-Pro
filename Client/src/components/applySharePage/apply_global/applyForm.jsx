import {Form, Select, InputNumber, Tag } from '@arco-design/web-react';

const FormItem = Form.Item;
const Option = Select.Option;

const ApplyForm = ({list, form, accountsList}) => {
    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };

    return(
        <Form
        {...formItemLayout}
        form={form}
        labelCol={{
          style: { flexBasis: 90 },
        }}
        wrapperCol={{
          style: { flexBasis: 'calc(100% - 90px)' },
        }}
        style={{width: '100%'}}
        autoComplete='off'
        layout="horizontal"
        >

        <FormItem label='Accounts' field='Accounts' rules={[{ required: true }]}>
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
                  <span style={{ marginLeft: 8 }}>{`${tagCount} accounts selected`}</span>
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
            
            
              {(accountsList).map((option) => (
                    <Option key={option.name} value={JSON.stringify(option)}>
                        {option.name + " - " + option.clientId}
                    </Option>
              ))}
          </Select>
        </FormItem>

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
              min={10}
              defaultValue={10}
              suffix='Kitta'
              step={10}
              precision={0}
              style={{ width: '80%'}}
          />
        </FormItem>
        <FormItem label='PIN' required field='t_pin' tooltip={<div>PIN must be same for all accounts</div>} rules={[{ required: true }]}>
          <InputNumber
              max={999999}
              precision={0}
              style={{ width: 160 }}
              />
        </FormItem>
        </Form>
    )
}

export default ApplyForm;