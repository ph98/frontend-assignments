import { useRef } from "react";
import { useWatchList } from "../../context/WatchListContext";
import "./styles.scss";

const AddIsinForm = () => {
  const { addToWatchList } = useWatchList();
  const isinValue = useRef()

  return (
    <div className="add-isin-form">
      <form
        role="form"
        onSubmit={(e) => {
          e.preventDefault();
          addToWatchList(isinValue.current);
          e.target.reset();
        }}
      >
        <input name="isin" placeholder="Please enter ISIN" onChange={(e) => isinValue.current = e.target.value}/>
        <button type="submit" className="button add-isin-button">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default AddIsinForm;
