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
                src="/header/logo.svg"
                alt=""
              />
          </Link>
        </div>
      )                : (
        <div>
          <Link to="/">
              <img
                src="/header/logo.svg"
                alt=""
                width={200}
                height={60}
              />
          </Link>
        </div>
      )}
    </>
  )
}
