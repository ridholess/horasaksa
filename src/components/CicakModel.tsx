import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    geometry_0: THREE.Mesh
  }
  materials: {}
}

interface CicakModelProps {
  isVisible?: boolean
  isPaused?: boolean
  rotation?: [number, number, number]
}

export function CicakModel({ isVisible = true, isPaused = false, rotation = [0, 0, 0], ...props }: CicakModelProps & React.ComponentProps<'group'>) {
  const { nodes, materials } = useGLTF('/cicak-transformed.glb') as unknown as GLTFResult
  const meshRef = useRef<THREE.Group>(null!)

  // Remove the Intersection Observer - let the parent component handle visibility
  // The isVisible prop will be controlled by the parent component (Hero.tsx)

  // Optimized animation frame - only runs when visible and not paused
  useFrame((state, delta) => {
    if (!meshRef.current || !isVisible || isPaused) return

    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.z = Math.sin(time * 0.3) * Math.PI * 0.25
  })

  // Dispose of materials and geometries when component unmounts
  useEffect(() => {
    return () => {
      if (nodes?.geometry_0?.geometry) {
        nodes.geometry_0.geometry.dispose()
      }
      if (nodes?.geometry_0?.material) {
        if (Array.isArray(nodes.geometry_0.material)) {
          nodes.geometry_0.material.forEach(material => material.dispose())
        } else {
          nodes.geometry_0.material.dispose()
        }
      }
    }
  }, [nodes])

  return (
    <group {...props} dispose={null} ref={meshRef} rotation={rotation}>
      <mesh 
        geometry={nodes.geometry_0.geometry} 
        material={nodes.geometry_0.material}
        frustumCulled={true}
      />
    </group>
  )
}

useGLTF.preload('/cicak-transformed.glb')
