import { useWatchList } from "../../context/WatchListContext"


import './styles.scss';

const AddIsinForm = () => {
    const {
        addToWatchList,
    } = useWatchList()

  return (
    <div className='add-isin-form'>
        <form onSubmit={e=>{
            e.preventDefault()
            try{
                addToWatchList(e.target.isin.value)
                e.target.reset();
            }catch(err){
                console.log(err.message);
            }
        }}>
            <input name='isin' placeholder="ISIN number" />
            <button type="submit" className=" button add-isin-button">Subscribe</button>
        </form>
    </div>
  )
}

export default AddIsinForm