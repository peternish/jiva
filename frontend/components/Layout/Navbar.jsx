import { isLoggedIn } from "@redux/modules/auth/selectors";
import styles from "@styles/Navbar.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/modules/auth/thunks";

const Navbar = () => {
  const loggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  return (
    <nav className={styles.nav}>
      <div className={styles.navBrand}>
        <Link href="/">
          <a>Jiva</a>
        </Link>
      </div>

      <div className={styles.navLinks}>
          <Link href="/guide">
            <a>Petunjuk</a>
          </Link>
        {loggedIn ? (
          <Link href="/">
            <a onClick={dispatch(logout)}>Logout</a>
          </Link>
        ) : (
          <>
            <Link href="/register">
              <a>Daftar</a>
            </Link>
            <Link href="/login">
              <a>Masuk</a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
