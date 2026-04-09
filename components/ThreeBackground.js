'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

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
    mountRef.current.appendChild(renderer.domElement)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x4ade80,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    // Create particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create floating geometric shapes
    const geometries = []
    const materials = []
    const meshes = []

    // Add multiple geometric shapes
    const shapeTypes = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.ConeGeometry(0.3, 0.6, 32),
      new THREE.TorusGeometry(0.3, 0.1, 16, 100)
    ]

    for (let i = 0; i < 15; i++) {
      const geometry = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
        transparent: true,
        opacity: 0.7,
        wireframe: Math.random() > 0.5
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      )
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      mesh.scale.setScalar(Math.random() * 0.5 + 0.5)

      geometries.push(geometry)
      materials.push(material)
      meshes.push(mesh)
      scene.add(mesh)
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

    // Mouse movement
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05

      // Animate geometric shapes
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1)
        mesh.rotation.y += 0.01 * (index % 3 === 0 ? 1 : -1)
        
        // Floating motion
        mesh.position.y += Math.sin(elapsedTime + index) * 0.002
        mesh.position.x += Math.cos(elapsedTime + index) * 0.001
      })

      // Camera movement based on mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      
      geometries.forEach(geometry => geometry.dispose())
      materials.forEach(material => material.dispose())
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
