import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const BottomMenu = ({
	closeVisible, onBasketToggle, onFiltersToggle, onClose,
}) => {
	const [domReady, setDomReady] = React.useState(false);

	useEffect(() => {
		setDomReady(true);
	}, []);
	return domReady ? createPortal(
		<div className="gtr-mobile-menu">
			<div className="gtr-mobile-menu-items">
				<div className="gtr-mobile-menu-item" onClick={onBasketToggle}>
					<i className="fas fa-shopping-cart" />
					<div className="gtr-label">Basket</div>
				</div>
				<div className="gtr-mobile-menu-divider" />
				<div className="gtr-mobile-menu-item" onClick={onFiltersToggle}>
					<i className="fas fa-filter" />
					<div className="gtr-label">Filters</div>
				</div>
			</div>
			{closeVisible && <div className="gtr-mobile-menu-close" onClick={onClose}><i className="fas fa-times-circle" /></div>}
		</div>,
		document.getElementById("gtr-bottom-menu"),
	) : null;
};

export default BottomMenu;
