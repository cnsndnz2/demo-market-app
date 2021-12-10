import React from "react";

const Input = (props) => (
	<input {...props} className={`gtr-text-input ${props.className || ""}`} />
);

export default Input;
