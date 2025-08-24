import React from 'react'

const Plants = ({plant}) => {

  return (
    <div 
      className="border border-green-300 rounded-md p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col gap-3"
    >
      <div>
        <h2 className="text-lg font-bold text-green-700">{plant.name}</h2>
      </div>
      <div className='cursor-pointer'>
        <p className="text-sm text-gray-600 w-14 bg-green-200 rounded-md flex justify-center items-center align-middle font-semibold">{plant.categories}</p>
      </div>
      <div>
          <p className="text-sm text-green-700">Price: <span className='font-semibold'>₹{plant.price}</span></p>
        <p className="text-sm text-green-700">Qty: <span className='font-semibold'>₹{plant.qty}</span></p>
      </div>     
    </div>
  )
}

export default Plants