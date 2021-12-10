import React from "react";
import { useBasket } from "../../hooks";
import Button from "../input/button";

const ProductCard = ({ product = {} }) => {
	const { hasItem, addProduct } = useBasket();

	return (
		<div className="gtr-product-card gtr-flex gtr-flex-col gtr-p-2">
			<div className="gtr-product-card-img gtr-p-2 gtr-mb-1">
				<div className="gtr-product-img" />
			</div>
			<div className="gtr-product-card-price gtr-color-primary gtr-mb-1">
₺
				{product.price}
			</div>
			<div className="gtr-product-card-name gtr-mb-2">{product.name}</div>
			<Button
				className="gtr-mb-1"
				theme="primary"
				disabled={hasItem(product.name)}
				onClick={() => {
					addProduct({
						itemInfo: { ...product },
						quantity: 1,
					});
				}}
			>
Add
			</Button>
		</div>
	);
};

export default ProductCard;
