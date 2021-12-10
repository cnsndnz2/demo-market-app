import React from "react";
import { useBasket } from "../../hooks";
import logo from "../../logo.png";

const Header = React.memo(() => {
	const { basket } = useBasket();
	return (
		<header className="gtr-header gtr-flex gtr-fill-primary">
			<img src={logo} alt="Logo" />
			<nav className="gtr-container">
				<div className="gtr-nav-right">
					<ul>
						<li>
							<i className="fas fa-shopping-bag" />
₺
							{" "}
							{basket.totalPrice.toFixed(2)}
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
});

export default Header;
