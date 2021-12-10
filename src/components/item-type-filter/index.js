import React, { useEffect, useState } from "react";
import { getItemTypes } from "../../services/items";
import ButtonGroup from "../input/button-group";

const ItemTypeFilter = ({ onChange, allowDeselect }) => {
	const [itemTypes, setItemTypes] = useState();

	useEffect(() => {
		const response = getItemTypes();
		setItemTypes(response);
	}, []);
	return (
		<ButtonGroup
			className="gtr-flow-x-auto gtr-pb-2"
			theme="primary"
			options={itemTypes}
			onSelectedCange={onChange}
			allowDeselect={allowDeselect}
		/>
	);
};

export default ItemTypeFilter;
