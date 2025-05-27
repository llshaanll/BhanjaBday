// Loader.js
import React from 'react'
import { Html } from '@react-three/drei'

export const Loader = () => {
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-white"/>
        <p className="mt-2">Loading cake...</p>
      </div>
    </Html>
  )
}

export default Loader