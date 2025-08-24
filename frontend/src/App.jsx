import React from 'react'
import Header from './components/Header'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div className='min-h-screen bg-emerald-50'>
      <Header />
      <HomePage />
    </div>
  )
}

export default App