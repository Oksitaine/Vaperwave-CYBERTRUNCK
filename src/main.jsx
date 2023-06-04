import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.scss'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Canvas
      
    >
        <fog attach="fog" color="black" near={1} far={60} />
        <color attach="background" args={[ '#000000' ]} />
        <Suspense>
          <App />
        </Suspense>
    </Canvas>
    <Loader/>
  </>
)
