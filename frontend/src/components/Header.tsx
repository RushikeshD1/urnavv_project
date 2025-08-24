import React from 'react'

const Header = () => {
  return (
    <div className='w-screen bg-white shadow-sm flex flex-col justify-center p-5 pl-10'>
        <div className='flex flex-col'>
            <h1 className='text-3xl font-bold text-green-700'>Urvann</h1>
            <span className='text-sm text-green-700'>Plant Store</span>
        </div>        
    </div>
  )
}

export default Header