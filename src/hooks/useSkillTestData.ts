import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataItem } from '../types/dataItem';
import parseCsvData from '../utils/parsCSV';

const fetchCSVData = () => axios.get('/data/Modelon_SkillTest_Data.csv').then(({ data }) => {
  const parsedData = parseCsvData(data);
  return parsedData.map((item, index) => ({
    age: item.age,
    annualSalary: item['annual Salary'],
    carPurchaseAmount: item['car purchase amount\r'],
    country: item.country,
    creditCardDebt: item['credit card debt'],
    customerEmail: item['customer e-mail'],
    customerName: item['customer name'],
    gender: item.gender,
    netWorth: item['net worth'],
    index, // we add unique index to use as keys
  }));
});

const useSkillTestData = () => {
  const [csvData, setCsvData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetchCSVData().then(setCsvData);
  }, []);

  return [csvData];
};

export default useSkillTestData;
