import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import styles from "./Parallax.module.scss"

const ParallaxItem = ({ 
  item, 
  index, 
  mouseX, 
  mouseY, 
  movementParams,
  layerRefs 
}) => {
  const { directionX, directionY, speed } = movementParams[index];
  
  const offsetX = useTransform(
    mouseX,
    [0, 1],
    [-10 * speed * directionX, 15 * speed * directionX]
  );
  
  const offsetY = useTransform(
    mouseY,
    [0, 1],
    [-10 * speed * directionY, 15 * speed * directionY]
  );

  return (
    <motion.div 
      key={`parallax-${item.item_id}`}
      ref={el => layerRefs.current[index] = el}
      className={styles.parallaxLayer}
      style={{
        position: "absolute",
        x: offsetX,
        y: offsetY,
        transition: { type: "spring", stiffness: 150, damping: 20 }
      }}
    >
      <div style={{
        filter: `blur(${index * 0.3}px)`
      }}>
        <tgs-player
          mode="normal"
          src={item.image}
          style={{
            width: '100%',
            height: '100%',
            transform: `rotate(${index * 3}deg)`
          }}
        />
      </div>
    </motion.div>
  );
};

export const Parallax = ({ parallaxItems, isDisabled }) => {
  const containerRef = useRef(null);
  const layerRefs = useRef([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const getMovementParams = () => {
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    const speed = 0.5 + Math.random() * 2;
    return { directionX, directionY, speed };
  };

  const movementParams = useRef(parallaxItems.map(getMovementParams)).current;

  return (
    <div 
      ref={containerRef}
      className={styles.parallaxBackground}
      onMouseMove={handleMouseMove}
      style={isDisabled ? {opacity: 0} : {}}
    >
      {parallaxItems.map((item, index) => (
        <ParallaxItem
          key={`parallax-${item.item_id}`}
          item={item}
          index={index}
          mouseX={mouseX}
          mouseY={mouseY}
          movementParams={movementParams}
          layerRefs={layerRefs}
        />
      ))}
    </div>
  )
}