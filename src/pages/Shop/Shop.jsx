import styles from "./Shop.module.css";

import ProductCard from "../../components/ProductCard/ProductCard";

function Shop({ products }) {
	return (
		<section>
			<h1>Shop</h1>

			<div className={styles.products}>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}

export default Shop;
