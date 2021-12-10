import React from "react";

const QuantityButton = ({ onAdd, onRemove, value = 0 }) => (
	<div className="gtr-qty-btn gtr-flex">
		<div className="gtr-qty-ctrl gtr-qty-left gtr-color-primary" onClick={onRemove}>-</div>
		<div className="gtr-qty-ctrl gtr-qty-amount gtr-fill-primary">{value}</div>
		<div className="gtr-qty-ctrl gtr-qty-right gtr-color-primary" onClick={onAdd}>+</div>
	</div>
);

export default QuantityButton;
