import { describe, expect, it, vi } from "vitest";
import { getProducts } from "./api";

describe("getProducts", () => {
	it("fetches products", async () => {
		const products = [
			{
				id: 1,
				title: "Backpack",
			},
		];

		vi.stubGlobal(
			"fetch",
			vi.fn(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve(products),
				}),
			),
		);

		const result = await getProducts();

		await expect(result).toEqual(products);
	});

	it("throws an error when fetching fails", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(() =>
				Promise.resolve({
					ok: false,
				}),
			),
		);

		await expect(getProducts()).rejects.toThrow("Failed to fetch products");
	});
});
