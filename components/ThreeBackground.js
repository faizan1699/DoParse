'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.fog = new THREE.FogExp2(0x000000, 0.0008)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement)
    }

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x4ade80
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create geometric shapes
    const geometries = []
    const materials = []
    const meshes = []

    // Create rings
    for (let i = 0; i < 4; i++) {
      const ringGeometry = new THREE.RingGeometry(0.5, 1, 32)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6, 0.8, 0.5),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      })
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      )
      
      ring.userData = {
        rotationSpeed: 0.01 + Math.random() * 0.02,
        pulseSpeed: 0.002 + Math.random() * 0.003
      }
      
      geometries.push(ringGeometry)
      materials.push(ringMaterial)
      meshes.push(ring)
      scene.add(ring)
    }

    // Create floating cubes
    for (let i = 0; i < 8; i++) {
      const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.3, 0.9, 0.7),
        transparent: true,
        opacity: 0.8,
        wireframe: Math.random() > 0.5
      })
      
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12
      )
      
      // Add random rotation for initial variety
      cube.rotation.x = Math.random() * Math.PI
      cube.rotation.y = Math.random() * Math.PI
      cube.rotation.z = Math.random() * Math.PI
      
      cube.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04
        ),
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.1,
          Math.random() * 0.1,
          Math.random() * 0.1
        ),
        originalScale: Math.random() * 0.8 + 0.6,
        pulsePhase: Math.random() * Math.PI * 2,
        height: Math.random() * 2 + 1
      }
      
      geometries.push(cubeGeometry)
      materials.push(cubeMaterial)
      meshes.push(cube)
      scene.add(cube)
    }

    // Create floating spheres
    for (let i = 0; i < 10; i++) {
      const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 24)
      const sphereMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.8, 0.8, 0.6),
        transparent: true,
        opacity: 0.7,
        emissive: new THREE.Color().setHSL(0.8, 0.8, 0.4),
        emissiveIntensity: 0.3,
        wireframe: Math.random() > 0.7
      })
      
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10
      )
      
      // Add random rotation for initial variety
      sphere.rotation.x = Math.random() * Math.PI * 2
      sphere.rotation.y = Math.random() * Math.PI * 2
      
      sphere.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        ),
        rotationSpeed: Math.random() * 0.08,
        floatPhase: Math.random() * Math.PI * 2,
        glowIntensity: Math.random() * 0.5 + 0.5,
        height: Math.random() * 3 + 1
      }
      
      geometries.push(sphereGeometry)
      materials.push(sphereMaterial)
      meshes.push(sphere)
      scene.add(sphere)
    }

    // Create moving tetrahedrons
    for (let i = 0; i < 6; i++) {
      const tetraGeometry = new THREE.TetrahedronGeometry(0.4, 0)
      const tetraMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.15, 1.0, 0.5),
        transparent: true,
        opacity: 0.6,
        wireframe: true
      })
      
      const tetra = new THREE.Mesh(tetraGeometry, tetraMaterial)
      tetra.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 12
      )
      
      // Add random rotation for initial variety
      tetra.rotation.x = Math.random() * Math.PI
      tetra.rotation.y = Math.random() * Math.PI
      tetra.rotation.z = Math.random() * Math.PI
      
      tetra.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
        rotationSpeed: Math.random() * 0.12,
        wobblePhase: Math.random() * Math.PI * 2,
        height: Math.random() * 2.5 + 1
      }
      
      geometries.push(tetraGeometry)
      materials.push(tetraMaterial)
      meshes.push(tetra)
      scene.add(tetra)
    }

    // Create moving cylinders
    for (let i = 0; i < 8; i++) {
      const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.6, 24)
      const cylinderMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.55, 0.7, 0.6),
        transparent: true,
        opacity: 0.8,
        emissive: new THREE.Color().setHSL(0.55, 0.7, 0.2),
        emissiveIntensity: 0.4
      })
      
      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
      cylinder.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12
      )
      cylinder.rotation.z = Math.PI / 2
      
      // Add random rotation for initial variety
      cylinder.rotation.x = Math.random() * Math.PI * 2
      cylinder.rotation.y = Math.random() * Math.PI * 2
      
      cylinder.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        ),
        rotationSpeed: Math.random() * 0.05,
        bouncePhase: Math.random() * Math.PI * 2,
        height: Math.random() * 4 + 1
      }
      
      geometries.push(cylinderGeometry)
      materials.push(cylinderMaterial)
      meshes.push(cylinder)
      scene.add(cylinder)
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x4ade80, 1, 100)
    pointLight.position.set(2, 3, 4)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0x3b82f6, 1, 100)
    pointLight2.position.set(-2, -3, -4)
    scene.add(pointLight2)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Mouse movement
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05
      particlesMesh.rotation.x = elapsedTime * 0.02

      // Animate geometric shapes
      meshes.forEach((mesh, index) => {
        const userData = mesh.userData
        
        // Custom rotation
        if (userData.rotationSpeed) {
          if (userData.rotationSpeed.x) mesh.rotation.x += userData.rotationSpeed.x
          if (userData.rotationSpeed.y) mesh.rotation.y += userData.rotationSpeed.y
          if (userData.rotationSpeed.z) mesh.rotation.z += userData.rotationSpeed.z
        }
        
        // Floating motion
        if (userData.floatPhase) {
          mesh.position.y += Math.sin(elapsedTime * 2 + userData.floatPhase) * 0.01
        }
        
        // Orbital motion
        if (userData.orbitSpeed && userData.orbitRadius) {
          const orbitAngle = elapsedTime * userData.orbitSpeed
          mesh.position.x += Math.cos(orbitAngle) * userData.orbitRadius * 0.01
          mesh.position.z += Math.sin(orbitAngle) * userData.orbitRadius * 0.01
        }
        
        // Pulse effect
        if (userData.pulseSpeed) {
          const scale = 1 + Math.sin(elapsedTime * userData.pulseSpeed) * 0.2
          mesh.scale.setScalar(scale)
        }
        
        // Velocity-based movement
        if (userData.velocity) {
          mesh.position.add(userData.velocity)
          
          // Bounce off boundaries
          if (Math.abs(mesh.position.x) > 10) userData.velocity.x *= -1
          if (Math.abs(mesh.position.y) > 10) userData.velocity.y *= -1
          if (Math.abs(mesh.position.z) > 6) userData.velocity.z *= -1
        }
        
        // Wobble effect
        if (userData.wobblePhase) {
          mesh.rotation.x += Math.sin(elapsedTime * 3 + userData.wobblePhase) * 0.02
          mesh.rotation.y += Math.cos(elapsedTime * 2 + userData.wobblePhase) * 0.02
        }
        
        // Bounce effect
        if (userData.bouncePhase) {
          mesh.position.y += Math.sin(elapsedTime * 4 + userData.bouncePhase) * 0.01
          mesh.scale.y = 1 + Math.sin(elapsedTime * 6 + userData.bouncePhase) * 0.1
          mesh.scale.x = 1 + Math.cos(elapsedTime * 3 + userData.bouncePhase) * 0.05
        }
      })

      // Camera movement based on mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      
      geometries.forEach(geometry => geometry.dispose())
      materials.forEach(material => material.dispose())
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
      
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}
