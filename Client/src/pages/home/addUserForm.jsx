import { Modal, Button, Form, Input, Select, Message } from '@arco-design/web-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/home.css";

const FormItem = Form.Item;

const AddUserForm = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [bankList, setBankList] = useState({})
    const [form] = Form.useForm();

    function validateForm() {
        form.validate().then((res) => {
            let {
                name, 
                boid, 
                clientID,
                username, 
                password, 
                crnNumber
            } = form.getFieldsValue(["name", "boid", "clientID", "username", "password", "crnNumber"]);

            clientID = clientID.split(' ')[0].trim()
            console.log({name, boid, clientID, username, password, crnNumber})

            setConfirmLoading(true);
            setTimeout(() => {
                Message.success('Success !');
                form.resetFields()
                setVisible(false);
                setConfirmLoading(false);
            }, 1500);
        });
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
                    headers: {},
                };
                
                const res = await axios.request(config);
                setBankList((res.data))
            } catch (error){
                console.log(error)
            }
        })()
    },[]);

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
            setVisible(false);
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
                <FormItem label='BOID' field='boid' rules={[{ type: 'string', required: true }]}>
                    <Input placeholder='Enter 16 digit BOID/Demat' />
                </FormItem>
                <FormItem label='Client ID' required field='clientID' rules={[{ type: 'string', required: true }]}>
                    <Select options={bankList.map(item => `${item.id}  ${item.name}`)} />
                </FormItem>
                <FormItem label='Username' field='username' rules={[{ type: 'string', required: true }]}>
                    <Input placeholder='Enter Mero Share username' />
                </FormItem>
                <FormItem label='Password' field='password' rules={[{ type: 'string', required: true }]}>
                    <Input placeholder='Enter Mero Share password' />
                </FormItem>
                
            </Form>
        </Modal>
        </>
    )
}

export default AddUserForm;