import { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message } from '@arco-design/web-react';

//import styles
import "../css/home.css"

const FormItem = Form.Item;

const Home = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    function validateForm() {
        form.validate().then((res) => {
            setConfirmLoading(true);
            setTimeout(() => {
                Message.success('Success !');
                setVisible(false);
                setConfirmLoading(false);
            }, 1500);
        });

        return false
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
        <div className="home">
        <label htmlFor="#" className="content-header">Manage User</label>
        <div className="content">
            <div className="add-accounts">
            <div>
                <Button className="add-accounts-btn" 
                onClick={() => setVisible(true)} type='primary'>
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
                        style: { flexBasis: 90 },
                    }}
                    wrapperCol={{
                        style: { flexBasis: 'calc(100% - 90px)' },
                    }}>
                        <FormItem label='Name' field='name' rules={[{ required: true }]}>
                            <Input placeholder='' />
                        </FormItem>
                        <FormItem label='Gender' required field='sex' rules={[{ required: true }]}>
                            <Select options={['A', 'B']} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
            </div>
            <div className="accounts-list">

            </div>
        </div>
        </div>
    )
}

export default Home;