import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useScrollStore } from './store'

export const Scene = () => {
  const { scene, animations } = useGLTF('./cake.glb')
  const mixerRef = useRef(null)
  const gltfCameraRef = useRef(null)
  const { camera: r3fCamera } = useThree()
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  // 🎇 Generate particles
  const particlesRef = useRef()
  const particlesData = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const radius = 40;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // Generate spherical coordinates
    const theta = Math.random() * 2 * Math.PI // azimuthal angle
    const phi = Math.acos(2 * Math.random() - 1) // polar angle

    // Convert spherical to Cartesian
    positions[i3 + 0] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)

    // Random colors
    colors[i3 + 0] = Math.random()
    colors[i3 + 1] = Math.random()
    colors[i3 + 2] = Math.random()
  }

  return { positions, colors, count }
}, [])

  useEffect(() => {
    const mixer = new THREE.AnimationMixer(scene)
    mixerRef.current = mixer

    if (animations.length > 0) {
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip)
        action.clampWhenFinished = true
        action.play()
      })
    }

    scene.traverse((child) => {
      if (child.isCamera) gltfCameraRef.current = child
    })

    return () => {
      if (mixerRef.current) {
        animations.forEach((clip) => {
          mixerRef.current.uncacheClip(clip)
        })
        mixerRef.current.uncacheRoot(scene)
        mixerRef.current.stopAllAction()
        mixerRef.current = null
      }
    }
  }, [scene, animations])

  useFrame(() => {
    if (mixerRef.current) {
      mixerRef.current.setTime((scrollProgress * 20) - 1)
    }

    if (gltfCameraRef.current) {
      gltfCameraRef.current.updateWorldMatrix(true, false)
      r3fCamera.position.copy(gltfCameraRef.current.getWorldPosition(new THREE.Vector3()))
      r3fCamera.quaternion.copy(gltfCameraRef.current.getWorldQuaternion(new THREE.Quaternion()))
    }

    // Animate particles (optional float effect)
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002
    }
  })

  return (
    <>
      <primitive object={scene} />

      {/* 🎆 Colorful Particle Effect */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesData.count}
            array={particlesData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particlesData.count}
            array={particlesData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          vertexColors
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>
    </>
  )
}

useGLTF.preload('/cake.glb')
