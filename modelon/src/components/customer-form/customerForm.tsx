import {
  Form, FormInstance, Input, InputNumber, Select,
} from 'antd';
import countryList from '../../utils/countryList';

type CustomerFormProps = {
  onFinish: (values: any) => void,
  form: FormInstance,
};

function CustomerForm({ onFinish, form }: CustomerFormProps) {
  return (
    <div className="customer-modal">
      <Form
        layout="vertical"
        onFinish={onFinish}
        validateTrigger="onBlur"
        form={form}
        autoComplete="off"
      >
        <Form.Item
          name="customerName"
          label="Customer Name"
          required
          rules={[
            { required: true, message: 'Customer Name is required!' },
          ]}
        >
          <Input placeholder="Customer Name" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="customerEmail"
          label="Customer Email"
          required
          rules={[
            { required: true, message: 'Email is required!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input placeholder="Customer Email" type="email" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          required
          rules={[
            { required: true, message: 'Country is required!' },
          ]}
        >
          <Select
            placeholder="Country"
            options={countryList.map((country) => ({ value: country, label: country }))}
            showSearch
          />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          required
          rules={[
            { required: true, message: 'Age is required!' },
            {
              type: 'number', min: 1, max: 150, message: 'Age can\'t be less than 1 and more than 150!',
            },
          ]}
        >
          <InputNumber placeholder="Age (In Years)" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          required
          rules={[
            { required: true, message: 'Gender is required!' },
          ]}
        >
          <Select
            placeholder="Gender"
            options={[
              { value: '0', label: 'Male' },
              { value: '1', label: 'Female' },
              { value: '2', label: 'Other' },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="annualSalary"
          label="Annual Salary"
          required
          rules={[
            { required: true, message: 'Annual Salary is required!' },
            {
              type: 'number', message: 'Annual Salary should be a number',
            },
          ]}
        >
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            addonAfter="$"
            placeholder="Annual Salary"
          />
        </Form.Item>
        <Form.Item
          name="carPurchaseAmount"
          label="Car Purchase Amount"
          required
          rules={[
            { required: true, message: 'Car Purchase Amount is required!' },
            {
              type: 'number', message: 'Car Purchase Amount should be a number',
            },
          ]}
        >
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            addonAfter="$"
            placeholder="Car Purchase Amount"
          />
        </Form.Item>
        <Form.Item name="creditCardDebt" label="Credit Card Debt" required>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            addonAfter="$"
            placeholder="Credit Card Debt"
          />
        </Form.Item>
        <Form.Item
          name="netWorth"
          label="Net Worth"
          required
          rules={[
            { required: true, message: 'Net Worth is required!' },
            {
              type: 'number', message: 'Net Worth should be a number',
            },
          ]}
        >
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            addonAfter="$"
            placeholder="Net Worth"
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default CustomerForm;
