
import AddIsinForm from "./components/add-isin";
import { WatchListProvider } from "./context/WatchListContext";
import WatchList from "./components/watchlist";
import { ToastProvider } from "./context/ToastContext";
import "./App.scss";

function App() {
  return (
    <div className="main-layout">
      <ToastProvider>
        <WatchListProvider>
          <img className="logo" src='/public/tr.svg' />
          <AddIsinForm />
          <WatchList />
        </WatchListProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
