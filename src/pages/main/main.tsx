import { useState } from 'react';
import {
  Button, Col, Row, Typography,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import SearchBox from '../../components/search-box/searchBox';
import TableComponent from '../../components/table/table';
import AddCustomer from './addCustomer';
import './main.scss';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="mage-page">
      <Row justify="center">
        <Typography.Title level={2}>
          Modelon Skill test
        </Typography.Title>
      </Row>
      <Row justify="space-between">
        <Col xs={20} md={12} className="search-container">
          <SearchBox placeholder="Search everything here! (Name, Email, Country)" />
        </Col>
        <Col className="button-container">
          <Button size="large" type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Add
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} className="table-container">
          <TableComponent />
        </Col>
      </Row>

      <AddCustomer isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}

export default MainPage;
