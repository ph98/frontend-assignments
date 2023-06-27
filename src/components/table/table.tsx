/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, TableColumnProps, Tooltip } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ColumnProps, ColumnsType } from 'antd/es/table';
import parseCsvData from '../../utils/parsCSV';

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

const columns:ColumnsType<DataItem>[] = [
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
    render(value, record, index) {
      // TODO: maybe move to utils:
      const years = Math.floor(value);
      const months = Math.floor((value - years) * 12);
      return (
        <Tooltip title={`${years} year${years > 1 ? 's' : ''} and ${months} month${months > 1 ? 's' : ''}`}>
          {parseInt(value, 10)}
        </Tooltip>
      );
    },
  },
  { title: 'Annual Salary', dataIndex: 'annual Salary', key: 'annual Salary' },
  { title: 'Car purchase amount', dataIndex: 'car purchase amount ', key: 'car purchase amount ' },
  { title: 'Country', dataIndex: 'country', key: 'country' },
  { title: 'Credit card debt', dataIndex: 'credit card debt', key: 'credit card debt' },
  { title: 'Customer e-mail', dataIndex: 'customer e-mail', key: 'customer e-mail' },
  { title: 'Customer name', dataIndex: 'customer name', key: 'customer name' },
  { title: 'Gender', dataIndex: 'gender', key: 'gender' },
  { title: 'Net worth', dataIndex: 'net worth', key: 'net worth' },
];

function TableComponent() {
  const [csvData, setCsvData] = useState<any>([]);
  useEffect(() => {
    axios.get('/data/Modelon_SkillTest_Data.csv').then(({ data }) => {
      const parsedData = parseCsvData(data);
      const formattedData = parseCsvData.map(item=>({
        age: 'age',
        'annual Salary',
        'car purchase amount '
        'country',
        'credit card debt',
        'customer e-mail',
        'customer name',
        'gender',
        'net worth',
      }))
      setCsvData();
    });
  }, []);

  return (
    <div>
      <Table dataSource={csvData} columns={columns} />
    </div>
  );
}

export default TableComponent;
