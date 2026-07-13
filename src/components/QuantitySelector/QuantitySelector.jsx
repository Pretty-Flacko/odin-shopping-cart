import styles from "./QuantitySelector.module.css";

function QuantitySelector({ quantity, onIncrease, onDecrease, onChange }) {
	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				type="button"
				aria-label="decrease quantity"
				onClick={onDecrease}
			>
				-
			</button>

			<input
				className={styles.input}
				type="number"
				value={quantity}
				onChange={(event) => onChange(Number(event.target.value))}
			/>

			<button
				className={styles.button}
				type="button"
				aria-label="increase quantity"
				onClick={onIncrease}
			>
				+
			</button>
		</div>
	);
}

export default QuantitySelector;
