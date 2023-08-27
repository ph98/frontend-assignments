import { useEffect, useState } from "react";
import { useWatchList } from "../../context/WatchListContext";
import { formatNumbers } from "../../utilities/formats";

import "./styles.scss";

const ONE_SECOND = 1000;

// better to use dayjs or moment or ...
const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);

const WatchListItemComponent = ({ data, onRemove }) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const checkExpiration = () => {
      // will expire after 10 seconds:
      const expirationTime = new Date(data.date).getTime() + (10 * ONE_SECOND);
      setIsExpired(Date.now() > expirationTime);
    };

    checkExpiration();
    const interval = setInterval(checkExpiration, ONE_SECOND); 

    return () => {
      clearInterval(interval);
    };
    
  }, [data]);

  return (
    <div className="watch-list-item">
      <span className="isin-name">{data.isin}</span>
      <span className="price">
        {formatNumbers(data.price)}
        {isExpired && (
          <span className="is-expired">
            (Last update: {formatDate(data.date)})
          </span>
        )}
      </span>
      <button className="button remove" onClick={() => onRemove(data.isin)}>
        Unsubscribe
      </button>
    </div>
  );
};
const WatchListComponent = () => {
  const { watchList, removeFromWatchList } = useWatchList();

  return (
    <div className="watch-list">
      {watchList.map((watchListItem) => (
        <WatchListItemComponent
          data={watchListItem}
          key={watchListItem.isin}
          onRemove={() => removeFromWatchList(watchListItem.isin)}
        />
      ))}
    </div>
  );
};

export default WatchListComponent;
