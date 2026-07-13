import { useState } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import QuantitySelector from "./QuantitySelector";

describe("QuantitySelector", () => {
	it("displays the current quantity", () => {
		render(
			<QuantitySelector
				quantity={3}
				onIncrease={() => {}}
				onDecrease={() => {}}
				onChange={() => {}}
			/>,
		);

		expect(screen.getByRole("spinbutton")).toHaveValue(3);
	});

	it("calls onIncrease when plus button is clicked", async () => {
		const user = userEvent.setup();
		const handleIncrease = vi.fn();

		render(
			<QuantitySelector
				quantity={1}
				onIncrease={handleIncrease}
				onDecrease={() => {}}
				onChange={() => {}}
			/>,
		);

		await user.click(screen.getByRole("button", { name: "increase quantity" }));

		expect(handleIncrease).toHaveBeenCalled();
	});

	it("calls onDecrease when plus button is clicked", async () => {
		const user = userEvent.setup();
		const handleDecrease = vi.fn();

		render(
			<QuantitySelector
				quantity={1}
				onIncrease={() => {}}
				onDecrease={handleDecrease}
				onChange={() => {}}
			/>,
		);

		await user.click(screen.getByRole("button", { name: "decrease quantity" }));

		expect(handleDecrease).toHaveBeenCalled();
	});

	it("updates the quantity when the user changes the input", async () => {
		const user = userEvent.setup();

		function TestComponent() {
			const [quantity, setQuantity] = useState(1);

			return (
				<QuantitySelector
					quantity={quantity}
					onIncrease={() => {}}
					onDecrease={() => {}}
					onChange={setQuantity}
				/>
			);
		}

		render(<TestComponent />);

		const input = screen.getByRole("spinbutton");

		await user.clear(input);
		await user.type(input, "5");

		expect(input).toHaveValue(5);
	});
});
