import { Popconfirm, Message, Button,  } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';

//importing remove account handle
import deleteAccount from './deleteAccHandle';
import { useQueryClient } from 'react-query';

async function deleteHandle(currentInfo, queryClient) {
  const { boid } = currentInfo;

  return new Promise(async (resolve, reject) => {
    const res = await deleteAccount(boid);
    
    if (res.status === false){
      reject()
      Message.error({
        content: 'Failed to delete',
      });
    }

    if (res.success === true){
      resolve()
      queryClient.invalidateQueries('allAccounts', { force: true });
      Message.success({
        content: 'Account removed Successfully',
      });
    }
  });
}

const DeleteAccount = ({currentInfo}) => {
  const queryClient = useQueryClient();

  return (
    <Popconfirm
      title='Are you sure you want to delete?'
      onOk={() => deleteHandle(currentInfo, queryClient)}
      onCancel={() => {
        Message.error({
          content: 'Delete cancelled.',
        });
      }}
      okText='Delete'
      cancelText='Cancel'
      focusLock
      position='bottom'
    >
      <Button type='primary' status='danger' style={{ marginRight: 20 }} icon={<IconDelete />}>
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteAccount;
