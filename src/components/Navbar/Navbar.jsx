import { Link } from "react-router";

import { useCart } from "../../context/CartContext";

function Navbar() {
	const { cartCount } = useCart();

	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/shop">Shop</Link>
			<Link to="/cart">Cart ({cartCount})</Link>
		</nav>
	);
}

export default Navbar;
