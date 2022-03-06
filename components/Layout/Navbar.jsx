import styles from '@styles/Navbar.module.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
        <div className={styles.navBrand}>
        <Link href='/'>
            <a>Jiva</a>
        </Link>
        </div>

        <div className={styles.navLinks}>
          <Link href='/register'>
            <a>Daftar</a>
          </Link>
          <Link href='/login'>
            <a>Masuk</a>
          </Link>
        </div>
    </nav>
  )
}

export default Navbar