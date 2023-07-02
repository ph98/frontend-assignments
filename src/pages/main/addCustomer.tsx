import { Form, Modal } from 'antd';

import CustomerForm from '../../components/custommer-form/custommerForm';
import useSkillTestData from '../../hooks/useSkillTestData';

type AddCustomerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function AddCustomer({ isOpen, setIsOpen }: AddCustomerProps) {
  const [form] = Form.useForm();
  const { addCsv } = useSkillTestData();
  const addNewCustomer = () => {
    form.validateFields().then((values) => {
      console.log('values', values);
      addCsv(values);
      setIsOpen(false);
    }).catch((err) => {
      console.log('err', err);
    });
    // form.submit();
    // setIsOpen(false);
  };
  return (
    <Modal
      title="Add Customer"
      open={isOpen}
      onOk={() => addNewCustomer()}
      onCancel={() => setIsOpen(false)}
    >
      <CustomerForm onFinish={addNewCustomer} form={form} />
    </Modal>
  );
}

export default AddCustomer;
