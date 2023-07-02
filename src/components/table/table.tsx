import { Table, Tooltip } from 'antd';
import Fuse from 'fuse.js';
import { ColumnProps } from 'antd/es/table';
import { useAppSelector } from '../../store/hooks';
import humanize from '../../utils/humanize';
import { DataItem } from '../../types/dataItem';
import useSkillTestData from '../../hooks/useSkillTestData';
import EditButton from './editButton';

const columns:ColumnProps<DataItem>[] = [
  {
    title: 'Customer name',
    dataIndex: 'customerName',
    key: 'customerName',
    sorter: (a: DataItem, b: DataItem) => a.customerName.localeCompare(b.customerName),
  },
  {
    title: 'Customer e-mail',
    dataIndex: 'customerEmail',
    key: 'customerEmail',
    sorter: (a: DataItem, b: DataItem) => a.customerEmail.localeCompare(b.customerEmail),
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    sorter: (a: DataItem, b: DataItem) => a.country.localeCompare(b.country),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (value: string) => (value === '0' ? 'Male' : 'Female'),
    sorter: (a: DataItem, b: DataItem) => a.gender.localeCompare(b.gender),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: DataItem, b: DataItem) => Number(a.age) - Number(b.age),
    render(value) {
      const years = Math.floor(value);
      const months = Math.floor((value - years) * 12);
      return (
        <Tooltip title={`${years} year${years !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`}>
          {parseInt(value, 10)}
        </Tooltip>
      );
    },
  },
  {
    title: 'Annual Salary',
    dataIndex: 'annualSalary',
    key: 'annualSalary',
    sorter: (a: DataItem, b: DataItem) => Number(a.annualSalary) - Number(b.annualSalary),
    render(value) {
      return (
        <Tooltip title={`$${value}`}>
          $
          {humanize({ number: value, fn: (n: number) => Number(n.toFixed(2)) })}
        </Tooltip>
      );
    },
  },
  {
    title: 'Credit card debt',
    dataIndex: 'creditCardDebt',
    key: 'creditCardDebt',
    sorter: (a: DataItem, b: DataItem) => Number(a.creditCardDebt) - Number(b.creditCardDebt),
    render(value) {
      return (
        <Tooltip title={`$${value}`}>
          $
          {humanize({ number: value, fn: (n: number) => Number(n.toFixed(2)) })}
        </Tooltip>
      );
    },
  },
  {
    title: 'Net worth',
    dataIndex: 'netWorth',
    key: 'netWorth',
    sorter: (a: DataItem, b: DataItem) => Number(a.netWorth) - Number(b.netWorth),
    render(value) {
      return (
        <Tooltip title={`$${value}`}>
          $
          {humanize({ number: value, fn: (n: number) => Number(n.toFixed(2)) })}
        </Tooltip>
      );
    },
  },
  {
    title: 'Car purchase amount',
    dataIndex: 'carPurchaseAmount',
    key: 'carPurchaseAmount',
    sorter: (a: DataItem, b: DataItem) => Number(a.carPurchaseAmount) - Number(b.carPurchaseAmount),
    render(value) {
      return (
        <Tooltip title={value ? `$${value}` : '-'}>
          { value ? `$${humanize({ number: value, fn: (n: number) => Number(n.toFixed(2)) })}` : '-'}
        </Tooltip>
      );
    },
  },
  {
    title: 'Actions',
    dataIndex: 'customerEmail',
    key: 'customerEmail',
    render(value: string) {
      return (
        <EditButton email={value} />
      );
    },
  },
];

function TableComponent() {
  const { customers } = useSkillTestData();
  const searchText = useAppSelector((state: any) => state.search);

  const fuze = new Fuse(customers, {
    keys: [
      {
        name: 'customerName',
        weight: 0.7,
      },
      {
        name: 'customerEmail',
        weight: 0.3,
      },
      {
        name: 'country',
        weight: 0.5,
      },
    ],
    threshold: 0.3,
  });

  const result = searchText.length > 0
    ? fuze.search(searchText).map((item: any) => item.item)
    : customers;

  return (
    <Table
      dataSource={result}
      columns={columns}
      rowKey="customerEmail"
      scroll={{ x: 1300 }}
    />
  );
}

export default TableComponent;
