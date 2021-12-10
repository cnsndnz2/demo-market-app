import React, { useEffect, useState } from "react";

const Radio = ({ item, checked, onChange }) => {
	const [isChecked, setIsChecked] = useState(checked);

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	const handleCheckedChange = (e) => {
		const newVal = e.target.checked;
		setIsChecked(newVal);
		onChange && onChange(newVal);
	};

	return (
		<span className="gtr-radio-container">
			{item.text}
			<input type="radio" checked={isChecked} onChange={handleCheckedChange} />
			<span className="gtr-radiomark" />
		</span>
	);
};

export default Radio;
