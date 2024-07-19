import React from 'react'

export const Loader = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white">
      <div className="w-[10vmax] h-[10vmax] border-b-4 border-black border-opacity-80 rounded-full animate-spin"></div>
    </div>
  )
}
