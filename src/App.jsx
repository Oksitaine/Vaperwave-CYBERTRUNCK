import { Clone, Environment, OrbitControls, PerspectiveCamera, Sky, useGLTF, useHelper } from '@react-three/drei'
import { Bloom, BrightnessContrast, ChromaticAberration, DotScreen, EffectComposer, Noise, SSAO, Scanline, Vignette } from '@react-three/postprocessing'
import { useControls } from 'leva';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { BoxHelper, DirectionalLightHelper, SpotLightHelper } from 'three';
import { BlendFunction } from 'postprocessing';



export default function App()
{

    const [ name, setname ] = useState(false)
    const [ obstacle ] = useState(() => 
    {
        return () => 
        {
            console.log("test");
        }
    })

    const [Speed] = useState(() => 5)

    const vaporwave = useGLTF('./Vapor.glb')
    const vaporcircle = useGLTF('./lol.glb')
    const cyberpunk = useGLTF('./cybertruck.glb')
    const Vapor1 = useRef()
    const Vapor2 = useRef()
    const Vapor3 = useRef()
    const Vapor4 = useRef()
    const Vapor5 = useRef()
    const camera = useRef()

    useFrame((state, delta) =>
    {
        Vapor1.current.position.z = (Speed*state.clock.elapsedTime%16) - 16
        Vapor2.current.position.z = (Speed*state.clock.elapsedTime%16) 
        Vapor3.current.position.z = (Speed*state.clock.elapsedTime%16) + 16 
        Vapor4.current.position.z = (Speed*state.clock.elapsedTime%16) - 32
        Vapor5.current.position.z = (Speed*state.clock.elapsedTime%16) - 48
    })

    useLayoutEffect(() => 
    {
        
    })


    return <>
    
        <OrbitControls target={[ 0,0.25,13 ]} 
            maxAzimuthAngle={0.7}
            minAzimuthAngle={-0.7}
            maxPolarAngle={1.5}
            minPolarAngle={1}
            enablePan={false}
        />

        <PerspectiveCamera makeDefault position={[ 0,2.25,20 ]} 
            
        />
        <primitive object={vaporcircle.scene.children[0].children[0].children[0].children[4]} scale={7} position-z={-22} />
        <primitive object={vaporcircle.scene.children[0].children[0].children[0].children[0]} scale={200}/>
        <primitive object={cyberpunk.scene} scale={0.1} position={[ 0,0.25,16 ]} rotation-y={-Math.PI/2} />

        <EffectComposer>
            <Bloom 
                luminanceSmoothing={0.4}
                luminanceThreshold={0.01}
            />
            <Noise premultiply blendFunction={BlendFunction.ADD} />
        </EffectComposer>

        <spotLight  color="white" position={[ 0.2,0.25,15.3 ]} angle={0.3} penumbra={1} />
        <spotLight  color="white" position={[ -0.2,0.25,15.3 ]} angle={0.3} penumbra={1} />
        <ambientLight intensity={0.5}  />


        <Clone ref={Vapor1} object={vaporwave.scene} rotation-y={Math.PI/2} position-z={-16}  />
        <Clone ref={Vapor2} object={vaporwave.scene} rotation-y={Math.PI/2}  />
        <Clone ref={Vapor3} object={vaporwave.scene} rotation-y={Math.PI/2} position-z={16}/>
        <Clone ref={Vapor4} object={vaporwave.scene} rotation-y={Math.PI/2} position-z={-32}/>
        <Clone ref={Vapor5} object={vaporwave.scene} rotation-y={Math.PI/2} position-z={-48}/>

    </>
}