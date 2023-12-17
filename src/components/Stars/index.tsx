import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import React from 'react'

import styles from './index.module.scss'

interface IStar {
  top: number
  left: number
  size: number
  delay: number
}

interface IProps {
  showLoading?: boolean
}
/**
 * 星空背景
 */
const Stars = ({ showLoading = false }: IProps) => {
  const [stars, setStars] = useState<IStar[]>([])

  useEffect(() => {
    const initStars = []
    for (let i = 0; i < 588; i++) {
      const top = Math.random() * 100
      const left = Math.random() * 100
      const size = Math.random() * 3 + 1
      const delay = Math.random() * 5
      initStars.push({ top, left, size, delay })
    }
    setStars(initStars)
  }, [])

  const Star = ({ top, left, size, delay }: IStar) => (
    <div
      className={styles.star}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `-${delay}s`, // Use a negative delay to make stars start at different times
      }}
    />
  )
  return (
    <div className={styles.stars}>
      {stars.map(({ top, left, size, delay }, i) => (
        <Star key={i} top={top} left={left} size={size} delay={delay} />
      ))}
      {showLoading && <Spin spinning fullscreen></Spin>}
    </div>
  )
}

export default React.memo(Stars)
