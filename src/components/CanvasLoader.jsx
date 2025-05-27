import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { Scene } from './Scene'
import Loader from './Loader'

export const CanvasLoader = () => {
  return (
    <Canvas
    camera={{fov: 45, position: [10, 50, 50]}}
    gl={{alpha: true}}
    style={{
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        zIndex: 10,
        top: 0,
        left: 0
    }}
    >
        <directionalLight
        intensity={2}
        position={[10, 10, 10]}
        />
        <ambientLight intensity={1}/>
        <Suspense fallback={<Loader/>}>
          <Scene/>
        </Suspense>
    </Canvas>
  )
}
