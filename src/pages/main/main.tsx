import { Col, Row } from 'antd';
import SearchBox from '../../components/search-box/searchBox';
import TableComponent from '../../components/table/table';
import './main.scss';

function MainPage() {
  return (
    <div className="mage-page">
      <Row justify="center">
        <Col xs={12}>
          <SearchBox placeholder="Search everything here!" />
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={23}>
          <TableComponent />
        </Col>
      </Row>
    </div>
  );
}

export default MainPage;
