import { useWatchList } from "../../context/WatchListContext"
import MessageComponent from "../message";

import './styles.scss';

const AddIsinForm = () => {
    const {
        watchList,
        addToWatchList,
        errorMessage
    } = useWatchList()

        console.log('watchList', watchList)
  return (
    <div className='add-isin-form'>
        <MessageComponent message={errorMessage} type='error' />
        <form onSubmit={e=>{
            e.preventDefault()
            try{
                addToWatchList(e.target.isin.value)
            }catch(err){
                console.log(err.message);
            }
        }}>
            <input name='isin' placeholder="ISIN number" />
            <button type="submit" className="add-isin-button">Add</button>
        </form>
    </div>
  )
}

export default AddIsinForm