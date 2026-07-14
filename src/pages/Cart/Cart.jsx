import { useCart } from "../../context/CartContext";

function Cart() {
	const { cart } = useCart();

	return (
		<section>
			<h1>Cart</h1>

			{cart.length === 0 ? (
				<p>Your cart is empty</p>
			) : (
				<div>
					{cart.map((item) => (
						<div key={item.id}>
							<p>{item.title}</p>
							<p>Quantity: {item.quantity}</p>
						</div>
					))}
				</div>
			)}
		</section>
	);
}

export default Cart;
