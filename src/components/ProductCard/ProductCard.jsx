import { useState } from "react";

import { useCart } from "../../context/CartContext";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1);

	function handleIncrease() {
		setQuantity((prev) => prev + 1);
	}

	function handleDecrease() {
		setQuantity((prev) => Math.max(1, prev - 1));
	}

	function handleAddToCart() {
		addToCart(product, quantity);
	}

	return (
		<article className={styles.card}>
			<img className={styles.image} src={product.image} alt={product.title} />

			<h2 className={styles.title}>{product.title}</h2>

			<p className={styles.price}>${product.price.toFixed(2)}</p>

			<QuantitySelector
				quantity={quantity}
				onIncrease={handleIncrease}
				onDecrease={handleDecrease}
				onChange={setQuantity}
			/>

			<button
				className={styles.button}
				type="button"
				disabled={quantity < 1}
				onClick={handleAddToCart}
			>
				Add To Cart
			</button>
		</article>
	);
}

export default ProductCard;
