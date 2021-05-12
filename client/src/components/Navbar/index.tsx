import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Ecommerce
      </Link>
      <ul className={styles.links}>
        <li>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
