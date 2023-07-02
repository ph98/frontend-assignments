/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataItem } from '../types/dataItem';
import { setCustomers, setSelected, setStatus } from '../store/slices/customersSlice';
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
  const customers: DataItem[] = useAppSelector((state: any) => state.customers.data);
  const selectedCustomer = useAppSelector((state: any) => state.customers.selectedCustomer);
  const status = useAppSelector((state: any) => state.customers.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(setStatus('loading'));
      fetchCSVData()
        .then((data) => {
          dispatch(setCustomers(data));
          dispatch(setStatus('done'));
        });
    }
  }, []);

  const findByEmail = (customerEmail: string) => customers.find(
    (item) => item.customerEmail === customerEmail,
  );

  const addCustomer = (data: DataItem) => {
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

  const editCustomer = (data: DataItem) => {
    dispatch(setCustomers(
      customers.map((item) => (item.customerEmail === data.customerEmail ? data : item)),
    ));
  };

  const setSelectedCustomer = (email: string | null) => dispatch(setSelected(email));

  return {
    customers, selectedCustomer, addCustomer, editCustomer, findByEmail, setSelectedCustomer,
  };
};

export default useSkillTestData;
