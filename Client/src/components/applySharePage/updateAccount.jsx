import { Modal, Spin, Button, Form, Input, Select, Message, Notification } from '@arco-design/web-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../pages/css/home.css";

const FormItem = Form.Item;

const UpdateAccountForm = ({currentInfo, set_ACCOUNTS_ARRAY}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [bankList, setBankList] = useState({})
    const [form] = Form.useForm();

    console.log(currentInfo)

    function validateForm() {
        form.validate()
        .then(async (res) => {
            let {
                name, 
                boid, 
                clientId,
                username, 
                password, 
                crnNumber
            } = form.getFieldsValue(["name", "boid", "clientId", "username", "password", "crnNumber"]);

            clientId = clientId.split(' ')[0].trim();
            crnNumber = crnNumber.toString();

            if (!name || !boid || !clientId || !username || !password || !crnNumber) {
                setVisible(true)
                setConfirmLoading(false);
                Message.error("Please enter all the fields")
            }
            
            if (!Number.isInteger(parseInt(crnNumber))){
                setVisible(true)
                Message.error("CRN must be 8 digit number")
            }

            const addAccount = {
                data: {name, boid, clientId, username, password, crnNumber},
                accountId: currentInfo._id
            };
            
            console.log(addAccount)

            const addAccountRes = await axios.request({
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:9000/action/editAccount',
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token")
                 },
                data: addAccount
            })

            if (addAccountRes.status === 201 ){
                Notification.success({
                    title: 'Success',
                    content: 'Account added Successfully!',
                  })
                  
                // update the main accounts list
                set_ACCOUNTS_ARRAY(addAccount)
                
                form.resetFields()
                setVisible(false);
                setConfirmLoading(false);
            }
        })
        .catch(() => { 
            setConfirmLoading(false);
            Message.error("All the fields are required")
        })
    }

    form.setFieldsValue({
        name: currentInfo.name,
        boid: currentInfo.boid,
        clientId: currentInfo.clientId,
        username: currentInfo.username,
        password: currentInfo.password,
        crnNumber: currentInfo.crnNumber
      });

    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };

    useEffect(() => {
        (async () => {
            try{
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://webbackend.cdsc.com.np/api/meroShare/capital/',
                    headers: {},
                };
                
                const res = await axios.request(config);
                setBankList((res.data))
            } catch (error){
                console.log(error)
            }
        })()
    },[setBankList]);

    return(
        <>
        <Button
        onClick={() => setVisible(true)}
        type='secondary'>
            <i className="bi bi-pencil-square me-2"></i>
                Edit
        </Button>
        <Modal
        title='Add User'
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={() => {
            setConfirmLoading(false);
            setVisible(false);
            form.resetFields()
        }}
        footer={
            <>
                <Button
                onClick={() => {
                    form.resetFields()
                }}> Reset </Button>

                <Button
                type='primary'
                onClick={() => {
                    setConfirmLoading(true);
                    validateForm()
                    }}> Update </Button>
            </>
        }>
            <Spin delay={500} size={30} tip='This may take a while...' loading={confirmLoading}>
            <Form
            {...formItemLayout}
            form={form}
            labelCol={{
                style: { flexBasis: 95 },
            }}
            wrapperCol={{
                style: { flexBasis: 'calc(100% - 95px)' },
            }}>
                <FormItem label='Name' field='name' rules={[{ type: 'string', required: true }]}>
                    <Input placeholder='Enter name' />
                </FormItem>
                <FormItem label='BOID' field='boid' 
                rules={[
                    { 
                        type: 'string',
                        required: true,
                    }
                    ]}>
                    <Input placeholder='Enter 16 digit BOID/Demat' />
                </FormItem>
                <FormItem label='Client ID' required field='clientId' rules={[{ type: 'string', required: true }]}>
                    <Select options={
                        bankList.length > 0 ?
                        (bankList.map(item => `${item.id}  ${item.name}`))
                        : (['No bank list founds'])
                        } />
                </FormItem>
                <FormItem label='Username' field='username' rules={[{ type: 'string', required: true }]}>
                    <Input placeholder='Enter Mero Share username' />
                </FormItem>
                <FormItem label='Password' field='password' rules={[{ type: 'string', required: true }]}>
                    <Input placeholder='Enter Mero Share password' />
                </FormItem>
                <FormItem label='CRN' field='crnNumber' 
                rules={[
                    { 
                        type: 'number',
                        required: true,
                    }
                    ]}>
                    <Input placeholder='Enter 8 digit Mero Share CRN number' />
                </FormItem>
                
            </Form>
            </Spin>
        </Modal>
        </>
    )
}

export default UpdateAccountForm;