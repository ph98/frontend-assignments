import SearchBox from '../../components/search-box/searchBox';
import TableComponent from '../../components/table/table';
import './main.scss';

const MainPage = () => {
  return (
    <div className="mage-page">
        <SearchBox />
        <TableComponent />
    </div>
  )
}

export default MainPage