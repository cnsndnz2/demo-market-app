import React from "react";
import ProductCard from "../product-card";
import styles from "./style.module.scss";

const ProductList = ({ products = [] }) => (
	<div className={`${styles["product-list"]} gtr-content gtr-flex gtr-flex-grow-1`}>
		{
			products.map((product, i) => <ProductCard key={i} product={product} />)
		}
		{
			products.length === 0 && <div className="gtr-flex gtr-w-100 gtr-justify-center gtr-color-primary gtr-pt-5">No Products Found</div>
		}
		<li className={`${styles["hidden-flex-item"]}`} />
		<li className={`${styles["hidden-flex-item"]}`} />
		<li className={`${styles["hidden-flex-item"]}`} />
		<li className={`${styles["hidden-flex-item"]}`} />
		<li className={`${styles["hidden-flex-item"]}`} />
	</div>
);

export default ProductList;
