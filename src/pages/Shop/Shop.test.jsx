import { render, screen } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import Shop from "./Shop";
import testProducts from "./Shop.test-data";

describe("Shop", () => {
	it("renders the shop heading", () => {
		render(<Shop products={testProducts} />);

		expect(
			screen.getByRole("heading", {
				name: "Shop",
			}),
		).toBeInTheDocument();
	});

	it("renders a product card for each product", () => {
		render(<Shop products={testProducts} />);

		expect(screen.getAllByRole("article")).toHaveLength(3);
	});

	it("displays product information", () => {
		render(<Shop products={testProducts} />);

		expect(
			screen.getByRole("heading", {
				name: "Backpack",
			}),
		).toBeInTheDocument();

		expect(
			screen.getByRole("heading", {
				name: "T-Shirt",
			}),
		).toBeInTheDocument();

		expect(
			screen.getByRole("heading", {
				name: "Jacket",
			}),
		).toBeInTheDocument();
	});
});
