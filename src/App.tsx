import React, { useEffect, useRef, useState, Suspense } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { 
  Phone, ArrowRight, Star, Check, Clock, Zap, TrendingUp, 
  Send, MapPin, Mail, Globe, Bot, Cpu, Monitor, Box, 
  ChevronRight, Menu, X, Sparkles, Shield, Headphones, 
  Layers, Diamond, Hexagon, Circle, Triangle, Play, ExternalLink
} from 'lucide-react'
import { cn } from './lib/utils'

// ============================================
// THREE.JS 3D COMPONENTS
// ============================================

function FloatingCube({ position, color, size = 1, speed = 1 }: { position: [number, number, number], color: string, size?: number, speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        transmission={0.2}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function FloatingCrystal({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          transmission={0.6}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 300

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 25
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15

    const color = new THREE.Color()
    color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function HolographicRing({ position, color, radius = 2 }: { position: [number, number, number], color: string, radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

function EnergyBeam({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.01, 0.05, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#00d5ff" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, -3, 5]} intensity={0.3} color="#22d3ee" />

      <ParticleField />

      <FloatingCube position={[-4, 2, -3]} color="#00d5ff" size={0.8} speed={0.8} />
      <FloatingCube position={[4, -1, -2]} color="#a855f7" size={0.6} speed={1.2} />
      <FloatingCube position={[-3, -2, -4]} color="#22d3ee" size={0.5} speed={1} />
      <FloatingCube position={[3, 3, -3]} color="#ec4899" size={0.7} speed={0.6} />
      <FloatingCube position={[0, 4, -2]} color="#00d5ff" size={0.4} speed={1.5} />

      <FloatingCrystal position={[5, 1, -3]} color="#00d5ff" />
      <FloatingCrystal position={[-5, -1, -2]} color="#a855f7" />
      <FloatingCrystal position={[0, 5, -4]} color="#22d3ee" />
      <FloatingCrystal position={[2, -3, -1]} color="#ec4899" />

      <HolographicRing position={[0, 0, -2]} color="#00d5ff" radius={2.5} />
      <HolographicRing position={[0, 0, -2]} color="#a855f7" radius={2} />
      <HolographicRing position={[0, 0, -2]} color="#22d3ee" radius={1.5} />

      <EnergyBeam position={[-2, 0, -1]} color="#00d5ff" />
      <EnergyBeam position={[2, 0, -1]} color="#a855f7" />

      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0.5} fade speed={1} />

      <Environment preset="city" />
    </>
  )
}

// ============================================
// ANIMATED BACKGROUND
// ============================================

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00d5ff]/10 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#a855f7]/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#22d3ee]/5 rounded-full blur-[200px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-[#ec4899]/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 scanline opacity-20" />
      <div className="absolute inset-0 noise-overlay" />
    </div>
  )
}

// ============================================
// NAVIGATION
// ============================================

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="section-padding max-w-[1400px] mx-auto flex items-center justify-between">
        <motion.a 
          href="#home" 
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d5ff] to-[#a855f7] rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg font-space">M</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-[#00d5ff] to-[#a855f7] rounded-lg opacity-0 group-hover:opacity-40 blur-md transition-opacity" />
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-semibold text-sm tracking-wider font-space">M. MEHAAL</p>
            <p className="text-white/50 text-xs tracking-widest font-space">KHATTAK</p>
          </div>
        </motion.a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors relative group font-medium"
              whileHover={{ y: -2 }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00d5ff] to-[#a855f7] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <motion.a
            href="https://wa.me/923302930930"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-5 py-2.5 rounded-full text-sm flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4" />
            <span>03302930930</span>
          </motion.a>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://wa.me/923302930930"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-5 py-3 rounded-full text-sm flex items-center justify-center gap-2 mt-2"
              >
                <Phone className="w-4 h-4" />
                <span>03302930930</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <AnimatedBackground />

      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Scene3D />
        </Canvas>
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 section-padding max-w-[1400px] mx-auto w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            style={{ y: y1 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel"
            >
              <Sparkles className="w-4 h-4 text-[#00d5ff]" />
              <span className="text-sm text-[#00d5ff] font-medium tracking-wider uppercase">AI Automation Expert</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-space"
            >
              <span className="text-white">TRANSFORM</span>
              <br />
              <span className="text-white">YOUR BUSINESS</span>
              <br />
              <span className="text-white">WITH </span>
              <span className="neon-text-glow">AI</span>
              <br />
              <span className="neon-text-glow">AUTOMATION</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-white/60 max-w-lg"
            >
              AI Call Agents, AI Automation, Websites & Premium 3D Experiences
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="https://wa.me/923302930930"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 rounded-full text-base flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                <span>03302930930</span>
              </motion.a>

              <motion.a
                href="#portfolio"
                className="btn-secondary px-8 py-4 rounded-full text-base flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Our Work</span>
                <Play className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] rounded-full border border-[#00d5ff]/20 animate-spin-slow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] rounded-full border border-[#a855f7]/20 animate-spin-slower" style={{ animationDirection: 'reverse' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[200px] h-[200px] rounded-full border border-[#22d3ee]/15 animate-spin-slow" style={{ animationDuration: '15s' }} />
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00d5ff]/20 to-[#a855f7]/20 rounded-full blur-2xl animate-pulse-glow" />
                  <div className="relative w-full h-full glass-panel rounded-3xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00d5ff]/10 to-[#a855f7]/10" />
                    <div className="absolute inset-0 opacity-30">
                      <div className="h-full w-full" style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,213,255,0.05) 2px, rgba(0,213,255,0.05) 4px)'
                      }} />
                    </div>
                    <div className="relative z-10 text-center space-y-4">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#00d5ff] to-[#a855f7] flex items-center justify-center glow-blue">
                        <Bot className="w-10 h-10 text-white" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[#00d5ff] text-sm font-medium tracking-wider uppercase">AI Powered Solutions</p>
                        <div className="space-y-1">
                          <p className="text-white/80 text-xs flex items-center justify-center gap-2">
                            <Check className="w-3 h-3 text-[#00d5ff]" /> Smart Automation
                          </p>
                          <p className="text-white/80 text-xs flex items-center justify-center gap-2">
                            <Check className="w-3 h-3 text-[#a855f7]" /> 24/7 AI Support
                          </p>
                          <p className="text-white/80 text-xs flex items-center justify-center gap-2">
                            <Check className="w-3 h-3 text-[#22d3ee]" /> Business Growth
                          </p>
                          <p className="text-white/80 text-xs flex items-center justify-center gap-2">
                            <Check className="w-3 h-3 text-[#ec4899]" /> Maximum Efficiency
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 right-10"
              >
                <div className="glass-panel p-3 rounded-xl glow-blue">
                  <Cpu className="w-6 h-6 text-[#00d5ff]" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-20 left-0"
              >
                <div className="glass-panel p-3 rounded-xl glow-purple">
                  <Diamond className="w-6 h-6 text-[#a855f7]" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-1/2 -right-4"
              >
                <div className="glass-panel p-2 rounded-lg">
                  <Hexagon className="w-5 h-5 text-[#22d3ee]" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 glass-panel rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Box, value: '50+', label: 'Projects Completed', color: '#00d5ff' },
            { icon: Star, value: '30+', label: 'Happy Clients', color: '#a855f7' },
            { icon: TrendingUp, value: '99%', label: 'Client Satisfaction', color: '#22d3ee' },
            { icon: Headphones, value: '24/7', label: 'Support Available', color: '#ec4899' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: `${stat.color}15` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="text-2xl md:text-3xl font-bold font-space" style={{ color: stat.color }}>
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================
// SERVICES SECTION
// ============================================

function ServicesSection() {
  const services = [
    {
      icon: Bot,
      title: 'AI CALL AGENT',
      price: '50,000 PKR',
      features: ['AI Voice Agents', 'Call Handling', 'Lead Qualification', '24/7 Availability'],
      color: '#00d5ff',
      gradient: 'from-[#00d5ff]/20 to-[#00d5ff]/5',
    },
    {
      icon: Cpu,
      title: 'AI AUTOMATION',
      price: '30,000 PKR',
      features: ['Workflow Automation', 'Task Automation', 'Process Optimization', 'Time & Cost Saving'],
      color: '#a855f7',
      gradient: 'from-[#a855f7]/20 to-[#a855f7]/5',
    },
    {
      icon: Monitor,
      title: 'WEBSITE DEVELOPMENT',
      price: '15,000 PKR',
      features: ['Modern & Responsive', 'SEO Optimized', 'Fast & Secure', 'Premium Design'],
      color: '#22d3ee',
      gradient: 'from-[#22d3ee]/20 to-[#22d3ee]/5',
    },
    {
      icon: Box,
      title: 'PREMIUM 3D WEBSITE',
      price: '30,000 PKR',
      features: ['3D Interactions', 'Cinematic Design', 'Advanced Animations', 'Luxury Experience'],
      color: '#ec4899',
      gradient: 'from-[#ec4899]/20 to-[#ec4899]/5',
    },
  ]

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="section-padding max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d5ff] text-sm font-medium tracking-widest uppercase mb-4">Our Services</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space">
            Premium AI Solutions
            <span className="block text-white/50 text-lg mt-2 font-normal">For Your Business</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card neon-border rounded-2xl p-6 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </div>

              <h3 className="text-lg font-bold font-space mb-2 group-hover:text-white transition-colors">
                {service.title}
              </h3>

              <p className="text-2xl font-bold mb-4" style={{ color: service.color }}>
                {service.price}
              </p>

              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: service.color }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium" style={{ color: service.color }}>
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// WHY CHOOSE ME SECTION
// ============================================

function WhyChooseSection() {
  const reasons = [
    { icon: Headphones, title: '24/7 AI Support', desc: 'Always here for you', color: '#00d5ff' },
    { icon: Zap, title: 'Automated Lead Gen', desc: 'More leads, more sales', color: '#a855f7' },
    { icon: Layers, title: 'Workflow Automation', desc: 'Save time & reduce cost', color: '#22d3ee' },
    { icon: TrendingUp, title: 'Business Growth', desc: 'Scale your business fast', color: '#ec4899' },
    { icon: Shield, title: 'Fast Delivery', desc: 'On-time project delivery', color: '#00d5ff' },
    { icon: Sparkles, title: 'Premium Quality', desc: 'Award-winning designs', color: '#a855f7' },
  ]

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 holographic-bg" />

      <div className="relative section-padding max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#a855f7] text-sm font-medium tracking-widest uppercase mb-4">Why Choose Me</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space">
            The Competitive Edge
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card rounded-2xl p-6 flex items-start gap-4 group"
            >
              <div 
                className="p-3 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:shadow-lg"
                style={{ background: `${reason.color}15` }}
              >
                <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-white transition-colors">
                  {reason.title}
                </h3>
                <p className="text-sm text-white/50">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// PORTFOLIO SECTION
// ============================================

function PortfolioSection() {
  const projects = [
    { title: 'AI Call Agent Dashboard', category: 'AI / Dashboard', color: '#00d5ff' },
    { title: 'E-Commerce Website', category: 'Web Development', color: '#a855f7' },
    { title: 'AI Automation System', category: 'Automation', color: '#22d3ee' },
    { title: '3D Real Estate Website', category: '3D / Web', color: '#ec4899' },
  ]

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden">
      <div className="section-padding max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#22d3ee] text-sm font-medium tracking-widest uppercase mb-4">Our Recent Work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card neon-border rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <div 
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                    <Monitor className="w-10 h-10" style={{ color: project.color }} />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-[#0a0a0f]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: project.color }}>
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold font-space mb-1 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-white/50">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary px-8 py-3 rounded-full inline-flex items-center gap-2"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// TESTIMONIALS SECTION
// ============================================

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ali Raza',
      role: 'Business Owner',
      text: 'Mehaal delivered an amazing AI call agent for my business. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Sana Khan',
      role: 'CEO, TechSolutions',
      text: 'His automation solutions saved us so much time and increased our productivity.',
      rating: 5,
    },
    {
      name: 'Junaid Ahmed',
      role: 'Marketing Manager',
      text: 'The 3D website he built for us is absolutely stunning!',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 holographic-bg" />

      <div className="relative section-padding max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#ec4899] text-sm font-medium tracking-widest uppercase mb-4">What Clients Say</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space">
            Client Testimonials
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card neon-border rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d5ff] to-[#a855f7] flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// CONTACT SECTION
// ============================================

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="section-padding max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#00d5ff] text-sm font-medium tracking-widest uppercase mb-4">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space mb-6">
              Let's Build Something
              <span className="block neon-text">Amazing Together</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-md">
              Ready to automate your business and take it to the next level? Let's discuss your project.
            </p>

            <motion.a
              href="https://wa.me/923302930930"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 rounded-full text-base inline-flex items-center gap-3 mb-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              <span>03302930930</span>
            </motion.a>

            <div className="space-y-4">
              {[
                { icon: Phone, text: '03302930930', href: 'https://wa.me/923302930930' },
                { icon: Mail, text: 'mehaal@example.com', href: 'mailto:mehaal@example.com' },
                { icon: MapPin, text: 'Pakistan', href: '#' },
              ].map((item) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#00d5ff]/10 transition-colors">
                    <item.icon className="w-5 h-5 text-[#00d5ff]" />
                  </div>
                  <span>{item.text}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              {['facebook', 'instagram', 'linkedin', 'github'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:border-[#00d5ff]/30 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Globe className="w-4 h-4 text-white/60" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#00d5ff]/50 focus:ring-1 focus:ring-[#00d5ff]/30 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#00d5ff]/50 focus:ring-1 focus:ring-[#00d5ff]/30 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#00d5ff]/50 focus:ring-1 focus:ring-[#00d5ff]/30 transition-all resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 rounded-xl text-base flex items-center justify-center gap-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================

function Footer() {
  return (
    <footer className="relative py-8 border-t border-white/5">
      <div className="section-padding max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00d5ff] to-[#a855f7] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-space">M</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm font-space">M. MEHAAL KHATTAK</p>
            </div>
          </div>

          <p className="text-white/40 text-sm">
            © 2024 M. Mehaal Khattak. All Rights Reserved.
          </p>

          <p className="text-white/40 text-sm flex items-center gap-1">
            Designed & Developed with <span className="text-[#ec4899]">♥</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN APP
// ============================================

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyChooseSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
