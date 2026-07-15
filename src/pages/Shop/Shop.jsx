import ProductCard from "../../components/ProductCard/ProductCard";
import { useLoaderData } from "react-router";

import styles from "./Shop.module.css";

function Shop() {
	const products = useLoaderData();

	return (
		<section>
			<h1 className={styles.title}>Shop</h1>

			<div className={styles.products}>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}

export default Shop;
