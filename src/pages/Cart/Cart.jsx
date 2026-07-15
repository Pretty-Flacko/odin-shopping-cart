import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";

import styles from "./Cart.module.css";

function Cart() {
	const { cart, cartTotal } = useCart();

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>Cart</h1>

			{cart.length === 0 ? (
				<p className={styles.empty}>Your cart is empty</p>
			) : (
				<>
					<div className={styles.items}>
						{cart.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>

					<p className={styles.total}>Total: ${cartTotal.toFixed(2)}</p>
				</>
			)}
		</section>
	);
}

export default Cart;
