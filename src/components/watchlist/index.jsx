import { useWatchList } from "../../context/WatchListContext"

import './styles.scss'

const WatchListComponent = () => {
    const {watchList, removeFromWatchList} = useWatchList();

  return (
    <div className="watch-list">
        {
            watchList.map(watchListItem => (
                <div className="watch-list-item" key={watchListItem.isin}>
                    <span className="isin-name">
                    {watchListItem.isin}
                    </span>
                    <span className="price">
                    {watchListItem.price}
                    </span>
                    <button className="button" onClick={()=>removeFromWatchList(watchListItem.isin)}>remove</button>
                </div>
            ))
        }
    </div>
  )
}

export default WatchListComponent