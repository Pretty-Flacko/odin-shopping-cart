import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";

import { CartProvider } from "../../context/CartContext";
import App from "../../App";
import Shop from "./Shop";
import testProducts from "./Shop.test-data";

function renderShop() {
	const router = createMemoryRouter(
		[
			{
				path: "/",
				element: <App />,
				children: [
					{
						path: "shop",
						element: <Shop />,
						loader: () => testProducts,
					},
				],
			},
		],
		{
			initialEntries: ["/shop"],
		},
	);

	return render(
		<CartProvider>
			<RouterProvider router={router} />
		</CartProvider>,
	);
}

describe("Shop", () => {
	it("renders the shop heading", async () => {
		renderShop();

		expect(
			await screen.findByRole("heading", {
				name: "Shop",
			}),
		).toBeInTheDocument();
	});

	it("renders a product card for each product", async () => {
		renderShop();

		expect(await screen.findAllByRole("article")).toHaveLength(3);
	});

	it("displays product information", async () => {
		renderShop();

		expect(
			await screen.findByRole("heading", {
				name: "Backpack",
			}),
		).toBeInTheDocument();

		expect(
			await screen.findByRole("heading", {
				name: "T-Shirt",
			}),
		).toBeInTheDocument();

		expect(
			await screen.findByRole("heading", {
				name: "Jacket",
			}),
		).toBeInTheDocument();
	});
});
