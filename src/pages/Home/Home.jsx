import { Link } from "react-router";

import styles from "./Home.module.css";
import shoppingImage from "../../../src/assets/shopping.jpg";

function Home() {
	return (
		<section className={styles.hero}>
			<div className={styles.content}>
				<h1>
					Welcome to <span className={styles.highlight}>Shop</span>
				</h1>

				<p>Discover quality products and find something perfect for you.</p>

				<Link className={styles.button} to="/shop">
					Browse Shop
				</Link>
			</div>

			<img
				className={styles.image}
				src={shoppingImage}
				alt="Shopping bags and product"
			/>
		</section>
	);
}

export default Home;
