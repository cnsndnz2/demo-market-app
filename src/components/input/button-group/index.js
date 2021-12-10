import React, { useState } from "react";
import Button from "../button";

const ButtonGroup = ({
	theme, options, value, onSelectedCange, className, allowDeselect,
}) => {
	const [selected, setSelected] = useState(value);

	const handleSelect = (opt) => {
		setSelected((oldValue) => {
			if (allowDeselect === true && oldValue === opt) {
				onSelectedCange && onSelectedCange(undefined);
				return undefined;
			}
			onSelectedCange && onSelectedCange(opt);
			return opt;
		});
	};

	return (
		<div className={`gtr-flex ${className || ""}`}>
			{
				options && options.map((opt, ind) => (
					<Button
						theme={theme}
						key={opt.value || ind}
						className={`gtr-mr-1 ${selected && selected === opt ? "" : "gtr-passive"}`}
						onClick={() => { handleSelect(opt); }}
					>
						{opt}
					</Button>
				))
			}
		</div>
	);
};

export default ButtonGroup;
