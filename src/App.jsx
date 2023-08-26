// import { useState } from 'react'
import AddIsinForm from './components/add-isin'
import { WatchListProvider } from './context/WatchListContext'
import './App.scss'

function App() {

  return (
    <div className="main-layout">
      <WatchListProvider>
        <AddIsinForm />
      </WatchListProvider>
    </div>
  )
}

export default App
