import { Link } from "react-router";

function Navbar({ cartCount }) {
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/shop">Shop</Link>
			<Link to="/cart">Cart ({cartCount})</Link>
		</nav>
	);
}

export default Navbar;
