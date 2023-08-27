// import { useState } from 'react'
import AddIsinForm from './components/add-isin'
import { WatchListProvider } from './context/WatchListContext'
import WatchList from './components/watchlist'
import './App.scss'

function App() {

  return (
    <div className="main-layout">
      <WatchListProvider>
        <AddIsinForm />
        <WatchList />
      </WatchListProvider>
    </div>
  )
}

export default App
