import SearchBox from '../../components/search-box/searchBox';
import TableComponent from '../../components/table/table';
import './main.scss';

function MainPage() {
  return (
    <div className="mage-page">
      <SearchBox placeholder="Please Search Here!" />
      <TableComponent />
    </div>
  );
}

export default MainPage;
