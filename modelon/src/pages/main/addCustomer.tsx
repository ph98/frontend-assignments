import { Form, Modal } from 'antd';

import CustomerForm from '../../components/customer-form/customerForm';
import useSkillTestData from '../../hooks/useSkillTestData';

type AddCustomerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function AddCustomer({ isOpen, setIsOpen }: AddCustomerProps) {
  const [form] = Form.useForm();
  const { addCustomer } = useSkillTestData();
  const addNewCustomer = () => {
    form.validateFields().then((values) => {
      addCustomer(values);
      setIsOpen(false);
    });
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
