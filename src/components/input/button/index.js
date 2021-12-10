import React from "react";

const Button = ({
	children, theme, className, disabled, ...otherProps
}) => (
	<button type="button" className={`gtr-button gtr-fill-${theme || "primary"} ${className || ""} ${disabled ? "gtr-button-disabled" : ""}`} disabled={disabled} {...otherProps}>{children}</button>
);

export default Button;
