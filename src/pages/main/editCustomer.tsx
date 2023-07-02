import { Form, Modal } from 'antd';

import { useEffect } from 'react';
import CustomerForm from '../../components/customer-form/customerForm';
import useSkillTestData from '../../hooks/useSkillTestData';

// type AddCustomerProps = {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// };

function EditCustomer() {
  const [form] = Form.useForm();
  const {
    editCustomer, selectedCustomer, customers, setSelectedCustomer,
  } = useSkillTestData();
  const isOpen = selectedCustomer !== null;
  useEffect(() => {
    if (customers && customers.length) {
      const customerData = customers
        .find((customer) => customer.customerEmail === selectedCustomer);

      if (customerData && form) {
        form.setFieldsValue({
          age: Number(customerData.age),
          annualSalary: Number(customerData.annualSalary),
          carPurchaseAmount: Number(customerData.carPurchaseAmount),
          country: customerData.country,
          creditCardDebt: Number(customerData.creditCardDebt),
          customerEmail: customerData.customerEmail,
          customerName: customerData.customerName,
          gender: customerData.gender,
          netWorth: Number(customerData.netWorth),
        });
      }
    }
  }, [selectedCustomer, customers, form]);

  const editCustomerData = () => {
    form.validateFields().then((values) => {
      editCustomer(values);
      setSelectedCustomer(null);
    }).catch((err) => {
      console.error('err', err);
      // TODO: handle Error
    });
  };

  return (
    <Modal
      title="Edit Customer"
      open={isOpen}
      onOk={() => editCustomerData()}
      onCancel={() => setSelectedCustomer(null)}
    >
      <CustomerForm onFinish={editCustomerData} form={form} />
    </Modal>
  );
}

export default EditCustomer;
