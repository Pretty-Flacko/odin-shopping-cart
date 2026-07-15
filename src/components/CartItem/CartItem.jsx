import { useCart } from "../../context/CartContext";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

import styles from "./CartItem.module.css";

function CartItem({ item }) {
	const { updateQuantity } = useCart();

	return (
		<article className={styles.item}>
			<img className={styles.image} src={item.image} alt={item.title} />
			<div className={styles.info}>
				<h2 className={styles.title}>{item.title}</h2>

				<p className={styles.price}>${item.price.toFixed(2)}</p>

				<p className={styles.quantity}>Quantity: {item.quantity}</p>
			</div>
			<QuantitySelector
				quantity={item.quantity}
				onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
				onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
				onChange={(quantity) => updateQuantity(item.id, quantity)}
			/>
		</article>
	);
}

export default CartItem;
