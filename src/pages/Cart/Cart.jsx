import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";

function Cart() {
	const { cart, cartTotal } = useCart();

	return (
		<section>
			<h1>Cart</h1>

			{cart.length === 0 ? (
				<p>Your cart is empty</p>
			) : (
				<>
					<div>
						{cart.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>

					<p>Total: ${cartTotal.toFixed(2)}</p>
				</>
			)}
		</section>
	);
}

export default Cart;
