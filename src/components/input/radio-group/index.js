import React, { useState } from "react";
import FilterPanelItem from "../../filter-panel-item";
import Radio from "../radio";

const RadioGroup = ({ data, title, onChange }) => {
	const [checked, setChecked] = useState();

	const handleChange = (isChecked, item) => {
		if (isChecked) {
			setChecked(item);
			onChange && onChange(item);
		}
	};

	return (
		<FilterPanelItem title={title}>
			<div
				className="gtr-flex gtr-flex-col gtr-flow-auto"
				style={{
					padding: 2,
				}}
			>
				{
					data.map((item) => (
						<Radio
							key={item.value}
							item={item}
							checked={checked && checked.value === item.value}
							onChange={(isChecked) => handleChange(isChecked, item)}
						/>
					))
				}
			</div>
		</FilterPanelItem>
	);
};

export default RadioGroup;
