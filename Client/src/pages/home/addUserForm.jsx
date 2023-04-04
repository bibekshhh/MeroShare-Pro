import { Modal, Spin, Button, Form, Input, Select, Message, Notification } from '@arco-design/web-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/home.css";
import { QueryClient } from 'react-query';

const FormItem = Form.Item;


const AddUserForm = () => {
    const queryClient = new QueryClient();

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [bankList, setBankList] = useState({})
    const [form] = Form.useForm();

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

            if (!Number.isInteger(parseInt(crnNumber))){
                setVisible(true)
                Message.error("CRN must be 8 digit number")
            }

            if (!name || !boid || !clientId || !username || !password || !crnNumber) {
                setVisible(true)
                setConfirmLoading(false);
                Message.error("Please enter all the fields")
            }

            const addAccount = {name, boid, clientId, username, password, crnNumber};
            console.log(addAccount)

            const addAccountRes = await axios.request({
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:9000/action/add-account',
                headers: { 
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                data: addAccount
            })

            if (addAccountRes.status === 201 ){
                queryClient.invalidateQueries('allAccounts');

                Notification.success({
                    title: 'Success',
                    content: 'Account added Successfully!',
                  })
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
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    },
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
        <Button className="add-accounts-btn" 
        onClick={() => setVisible(true)} 
        type='primary'>
            <i className="bi bi-plus-circle"></i> Add User
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
                    }}> Submit </Button>
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
                        // validator: (value, callback) => {
                        //     if (value.length !== 16) {
                        //       callback('Must be 16 digit number');
                        //     }
                        //   },
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
                        // validator: (value, callback) => {
                        //     if (value.length !== 8) {
                        //       callback('Must be 8 digit number');
                        //     }
                        // },
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

export default AddUserForm;