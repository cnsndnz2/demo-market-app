import React from "react";

const Footer = () => (
	<footer className="gtr-footer gtr-flex gtr-justify-center gtr-align-center gtr-pb-5">
		<div className="gtr-color-primary gtr-pl-3 gtr-pr-3">
&copy;
			{new Date().getFullYear()}
			{" "}
Market
		</div>
		<div className="gtr-color-primary gtr-ml-3 gtr-mr-3" style={{ fontSize: 30 }}>&#183;</div>
		<div className="gtr-color-primary gtr-button gtr-button-ghost">Privacy Policy</div>
	</footer>
);

export default Footer;
