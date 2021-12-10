import React from "react";

const Checkbox = ({ title, checked, onChange }) => (
	<span className="gtr-cbx-container">
		{title}
		<input type="checkbox" checked={checked} onChange={onChange} />
		<span className="gtr-checkmark" />
	</span>
);

export default Checkbox;
