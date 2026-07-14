import { useCart } from "../../context/CartContext";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

function CartItem({ item }) {
	const { updateQuantity } = useCart();

	return (
		<article>
			<img src={item.image} alt={item.title} />

			<h2>{item.title}</h2>

			<p>${item.price.toFixed(2)}</p>

			<p>Quantity: {item.quantity}</p>

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
