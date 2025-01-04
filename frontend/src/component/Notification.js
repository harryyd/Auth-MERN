import React from 'react'

const Notification = ({message , type}) => {
  return (
    <div className='absolute top-0 right-50 bg-white h-10 w-10'> 
        <p className='text-white'> {message}</p> 
    </div>
  )
}

export default Notification
