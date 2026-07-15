import { NavLink } from "react-router";

import { useCart } from "../../context/CartContext";

import styles from "./Navbar.module.css";

function Navbar() {
	const { cartCount } = useCart();

	const navButtonClass = ({ isActive }) =>
		isActive ? `${styles.navButton} ${styles.active}` : styles.navButton;

	return (
		<nav className={styles.navbar}>
			<NavLink className={navButtonClass} to="/" end>
				Home
			</NavLink>
			<NavLink className={navButtonClass} to="/shop">
				Shop
			</NavLink>
			<NavLink className={navButtonClass} to="/cart">
				Cart ({cartCount})
			</NavLink>
		</nav>
	);
}

export default Navbar;
