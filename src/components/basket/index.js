import React from "react";
import { useBasket } from "../../hooks";
import Divider from "../divider";
import QuantityButton from "../input/quantity-input";
import styles from "./style.module.scss";

const Basket = ({ className }) => {
	const { basket, addProduct, deleteProduct } = useBasket();
	return (
		<div className={`gtr-basket gtr-flex gtr-fill-primary gtr-m-2 ${className || ""}`}>
			<div className="gtr-basket-inner gtr-flow-hidden gtr-w-100 gtr-flex gtr-flex-col">
				<div className="gtr-flow-auto gtr-p-2 gtr-h-100">
					{
						basket.value.length > 0 ? basket.value.map((item, i) => (
							<>
								<div key={i} className="gtr-flex gtr-justify-between gtr-align-center">
									<div className="gtr-flex gtr-flex-col gtr-flex-grow-1">
										<div className="gtr-mb-1">{item.itemInfo.name}</div>
										<div className="gtr-basket-price gtr-color-primary">
₺
											{(item.itemInfo.price * item.quantity).toFixed(2)}
										</div>
									</div>
									<QuantityButton
										value={item.quantity}
										onAdd={() => addProduct({
											...item,
											quantity: 1,
										})}
										onRemove={() => deleteProduct({
											...item,
											quantity: 1,
										})}
									/>
								</div>
								<Divider key={`${i}divider`} />
							</>
						)) : <div className="gtr-flex gtr-justify-center gtr-align-center gtr-color-primary gtr-h-100">Your cart is empty.</div>
					}
				</div>
				{basket.value.length > 0 && (
					<div className={`${styles.totalprice} gtr-color-primary gtr-p-2`}>
						<div className={styles.pricebox}>
₺
							{basket.totalPrice.toFixed(2)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Basket;
