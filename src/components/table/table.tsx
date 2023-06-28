import { useEffect, useState } from 'react';
import { Table, Tooltip } from 'antd';
import axios from 'axios';
import { ColumnProps } from 'antd/es/table';
import { useSelector } from 'react-redux';
import parseCsvData from '../../utils/parsCSV';
import humanize from '../../utils/humanize';

type DataItem = {
  age: string;
  annualSalary: string;
  carPurchaseAmount: string;
  country: string;
  creditCardDebt: string;
  customerEmail: string;
  customerName: string;
  gender: string;
  netWorth: string;
};

const columns:ColumnProps<DataItem>[] = [
  {
    title: 'Customer name',
    dataIndex: 'customerName',
    key: 'customerName',
    // TODO: fix this sorting
    sorter: (a: DataItem, b: DataItem) => Number(a.customerName) - Number(b.customerName),
  },
  {
    title: 'Customer e-mail',
    dataIndex: 'customerEmail',
    key: 'customerEmail', // TODO: fix this sorting
    sorter: (a: DataItem, b: DataItem) => Number(a.customerEmail) - Number(b.customerEmail),
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    // TODO: fix this sorting
    sorter: (a: DataItem, b: DataItem) => Number(a.country) - Number(b.country),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (value: string) => (value === '0' ? 'Male' : 'Female'),
    // TODO: fix this sorting
    sorter: (a: DataItem, b: DataItem) => Number(a.gender) - Number(b.gender),

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
];

function TableComponent() {
  const [csvData, setCsvData] = useState<DataItem[]>([]);
  const searchText = useSelector((state: any) => state.search);

  const searchedData = csvData
    .filter(({ customerName }) => customerName.toLowerCase().includes(searchText.toLowerCase()));

  useEffect(() => {
    axios.get('/data/Modelon_SkillTest_Data.csv').then(({ data }) => {
      const parsedData = parseCsvData(data);
      const formattedData = parsedData.map((item, index) => ({
        age: item.age,
        annualSalary: item['annual Salary'],
        carPurchaseAmount: item['car purchase amount\r'],
        country: item.country,
        creditCardDebt: item['credit card debt'],
        customerEmail: item['customer e-mail'],
        customerName: item['customer name'],
        gender: item.gender,
        netWorth: item['net worth'],
        index,
      }));
      setCsvData(formattedData);
    });
  }, []);

  return (
    <div>
      <Table dataSource={searchedData} columns={columns} rowKey="index" />
    </div>
  );
}

export default TableComponent;
