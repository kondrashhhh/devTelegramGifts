import React from 'react'
import { Link } from 'react-router'
import styles from './Logo.module.scss'

export default function Logo({ type = 'small' }) {
  return (
    <>
      { type == "small" ? (
        <div className={styles.smallLogo}>
          <Link to="/">
              <img
                className={styles.smallImage}
                src="/header/logo.png"
                alt=""
              />
          </Link>
        </div>
      )                : (
        <div>
          <Link to="/">
              <img
                src="/header/logo.png"
                alt=""
                width={200}
              />
          </Link>
        </div>
      )}
    </>
  )
}
