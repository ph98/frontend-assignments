/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataItem } from '../types/dataItem';
import { setCustomers } from '../store/slices/customerSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import parseCsvData from '../utils/parsCSV';

const fetchCSVData = () => axios.get('/data/Modelon_SkillTest_Data.csv').then(({ data }) => {
  const parsedData = parseCsvData(data);
  return parsedData.map((item: any) => ({
    age: item.age,
    annualSalary: item['annual Salary'],
    carPurchaseAmount: item['car purchase amount\r'],
    country: item.country,
    creditCardDebt: item['credit card debt'],
    customerEmail: item['customer e-mail'],
    customerName: item['customer name'],
    gender: item.gender,
    netWorth: item['net worth'],
  }));
});

const useSkillTestData = () => {
  const dispatch = useAppDispatch();
  const customers: DataItem[] = useAppSelector((state: any) => state.customer);

  useEffect(() => {
    fetchCSVData()
      .then((data) => dispatch(setCustomers(data)));
  }, [dispatch]);

  const findByEmail = (customerEmail: string) => customers.find(
    (item) => item.customerEmail === customerEmail,
  );

  const addCsv = (data: DataItem) => {
    if (findByEmail(data.customerEmail)) {
      throw new Error('Email already exists!');
    }
    dispatch(
      setCustomers(
        [
          data,
          ...customers,
        ],
      ),
    );
  };

  const editItem = (data: DataItem) => {
    setCustomers(
      customers.map((item) => (item.customerEmail === data.customerEmail ? data : item)),
    );
  };

  return {
    customers, addCsv, editItem, findByEmail,
  };
};

export default useSkillTestData;
