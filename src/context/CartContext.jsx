import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

	const cartTotal = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	function addToCart(product, quantity) {
		setCart((prevCart) => {
			const existingProduct = prevCart.find((item) => item.id === product.id);

			if (existingProduct) {
				return prevCart.map((item) =>
					item.id === product.id
						? {
								...item,
								quantity: item.quantity + quantity,
							}
						: item,
				);
			}

			return [
				...prevCart,
				{
					...product,
					quantity,
				},
			];
		});
	}

	function updateQuantity(productId, quantity) {
		setCart((prevCart) => {
			if (quantity <= 0) {
				return prevCart.filter((item) => item.id !== productId);
			}

			return prevCart.map((item) =>
				item.id === productId
					? {
							...item,
							quantity,
						}
					: item,
			);
		});
	}

	function removeFromCart(productId) {
		setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				cartCount,
				cartTotal,
				addToCart,
				updateQuantity,
				removeFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error("useCart must be used withing a CartProvider");
	}

	return context;
}
