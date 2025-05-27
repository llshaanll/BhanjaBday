import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'


const Scroll = () => {
  const scrollRef = useRef(null)
  const {scrollYProgress} = useScroll({target: scrollRef, offset: ['start end', 'end start']})
  const y = useTransform(scrollYProgress, [0.6, 0.7], [0, -50])
  
  return (
    <section ref={scrollRef} className='h-screen w-screen flex items-center justify-center bg-black'>
        <h1 className='font-mono font-bold text-5xl text-white overflow-hidden'>
            <motion.span
            style={{y}}
            className='block inset-0'>
                Scroll
            </motion.span>
        </h1>
    </section>
  )
}

export default Scroll