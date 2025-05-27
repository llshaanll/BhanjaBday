import React from 'react'

const Button = ({setClicked}) => {

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-red-500'>
    <button onClick={()=>setClicked(true)} className='border-1 p-5 font-mono font-bold bg-white text-black hover:bg-black hover:text-white transition-all duration-300'>
        Let's Celebrate
    </button>
    </div>
  )
}

export default Button