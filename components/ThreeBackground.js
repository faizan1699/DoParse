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
      new THREE.TorusGeometry(0.3, 0.1, 16, 100),
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.TetrahedronGeometry(0.4, 0),
      new THREE.IcosahedronGeometry(0.3, 0)
    ]

    for (let i = 0; i < 25; i++) {
      const geometry = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
        transparent: true,
        opacity: 0.7,
        wireframe: Math.random() > 0.5,
        emissive: new THREE.Color().setHSL(Math.random(), 0.7, 0.2),
        emissiveIntensity: 0.5
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      )
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      mesh.scale.setScalar(Math.random() * 0.8 + 0.2)

      // Add custom animation properties
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.003 + 0.001,
        floatOffset: Math.random() * Math.PI * 2,
        orbitRadius: Math.random() * 0.5 + 0.1,
        orbitSpeed: Math.random() * 0.001 + 0.0005
      }

      geometries.push(geometry)
      materials.push(material)
      meshes.push(mesh)
      scene.add(mesh)
    }

    // Add special animated objects
    const specialObjects = []
    
    // Create rotating rings
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.RingGeometry(0.5, 0.7, 32)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6, 0.8, 0.6),
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      })
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      )
      ring.rotation.x = Math.PI / 2
      
      ring.userData = {
        rotationSpeed: 0.01 + Math.random() * 0.02,
        pulseSpeed: 0.002 + Math.random() * 0.003
      }
      
      specialObjects.push(ring)
      scene.add(ring)
    }

    // Create floating cubes with trails
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
      
      specialObjects.push(cube)
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
      
      specialObjects.push(sphere)
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
      
      specialObjects.push(tetra)
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
      
      specialObjects.push(cylinder)
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

    window.addEventListener('mousemove', handleMouseMove)

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
        mesh.rotation.x += userData.rotationSpeed.x
        mesh.rotation.y += userData.rotationSpeed.y
        mesh.rotation.z += userData.rotationSpeed.z
        
        // Floating motion
        mesh.position.y += Math.sin(elapsedTime * userData.floatSpeed + userData.floatOffset) * 0.01
        
        // Orbital motion
        const orbitAngle = elapsedTime * userData.orbitSpeed
        mesh.position.x += Math.cos(orbitAngle) * userData.orbitRadius * 0.01
        mesh.position.z += Math.sin(orbitAngle) * userData.orbitRadius * 0.01
      })

      // Animate special objects
      specialObjects.forEach((obj, index) => {
        if (obj.userData.rotationSpeed) {
          obj.rotation.x += obj.userData.rotationSpeed.x
          obj.rotation.y += obj.userData.rotationSpeed.y
          obj.rotation.z += obj.userData.rotationSpeed.z
          obj.scale.setScalar(
            1 + Math.sin(elapsedTime * obj.userData.pulseSpeed) * 0.2
          )
        }
        
        if (obj.userData.velocity) {
          obj.position.add(obj.userData.velocity)
          
          // Bounce off boundaries
          if (Math.abs(obj.position.x) > 15) obj.userData.velocity.x *= -1
          if (Math.abs(obj.position.y) > 12) obj.userData.velocity.y *= -1
          if (Math.abs(obj.position.z) > 10) obj.userData.velocity.z *= -1
          
          // Add some gravity effect
          obj.userData.velocity.y -= 0.0001
        }
        
        // Special animations for cubes
        if (obj.userData.originalScale) {
          const scaleMultiplier = 1 + Math.sin(elapsedTime * 2 + obj.userData.pulsePhase) * 0.1
          obj.scale.setScalar(obj.userData.originalScale * scaleMultiplier)
        }
        
        // Floating animation for spheres
        if (obj.userData.floatPhase) {
          obj.position.y += Math.sin(elapsedTime * 3 + obj.userData.floatPhase) * 0.005
          obj.position.x += Math.cos(elapsedTime * 2 + obj.userData.floatPhase) * 0.003
          
          // Glow effect
          if (obj.material.emissive) {
            const glowIntensity = obj.userData.glowIntensity * (0.8 + Math.sin(elapsedTime * 4) * 0.2)
            obj.material.emissiveIntensity = glowIntensity
          }
        }
        
        // Wobble animation for tetrahedrons
        if (obj.userData.wobblePhase) {
          obj.position.y += Math.sin(elapsedTime * 5 + obj.userData.wobblePhase) * 0.008
          obj.rotation.x += Math.sin(elapsedTime * 3 + obj.userData.wobblePhase) * 0.02
          obj.rotation.z += Math.cos(elapsedTime * 2 + obj.userData.wobblePhase) * 0.03
        }
        
        // Bounce animation for cylinders
        if (obj.userData.bouncePhase) {
          obj.position.y += Math.sin(elapsedTime * 4 + obj.userData.bouncePhase) * 0.01
          obj.scale.y = 1 + Math.sin(elapsedTime * 6 + obj.userData.bouncePhase) * 0.1
          obj.scale.x = 1 + Math.cos(elapsedTime * 3 + obj.userData.bouncePhase) * 0.05
        }
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
