import React, { useEffect, useRef, useState } from 'react'
import { CanvasLoader } from './CanvasLoader'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollStore } from './store'

const Wish = () => {
  const wishRef = useRef(null);
  const audioRef = useRef(null); // audio ref
  const [audio, setAudio] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wishRef,
    offset: ['start end', 'end start']
  });

  const setProgress = useScrollStore((state) => state.setScrollProgress);

  const x1 = useTransform(scrollYProgress, [0, 0.3], [-800, 0]);
  const x2 = useTransform(scrollYProgress, [0, 0.3], [800, 0]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  // Track scroll progress for triggering audio
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setProgress(value);
      if (value >= 0.47) {
        setAudio(true);
      } else {
        setAudio(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, setProgress]);

  // Play or pause audio when `audio` state changes
  useEffect(() => {
    if (audioRef.current) {
      if (audio) {
        audioRef.current.play().catch(() => {}); // prevent autoplay block
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // reset
      }
    }
  }, [audio]);

  return (
    <section
      ref={wishRef}
      className='relative h-screen w-screen pt-20 flex items-start justify-center bg-black'
    >
      <h1 className='flex flex-row text-4xl font-bold text-white text-shadow-lg font-mono overflow-hidden'>
        <motion.span style={{ x: x1 }} className='px-4 py-1 block inset-0'>Happy</motion.span>
        <motion.span style={{ x: x2 }} className='px-4 py-1 block inset-0'>Birthday</motion.span>
      </h1>

      <motion.img
        style={{ opacity, scale }}
        className='absolute top-30'
        src="./chotu.png"
        alt="BauaKaPhoto"
      />

      {/* Audio Player */}
      <audio ref={audioRef} src="./audio.mp3" preload="auto" />

      <CanvasLoader />
    </section>
  );
};

export default Wish;
