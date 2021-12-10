import React, { useCallback, useEffect, useState } from "react";
import FilterPanelItem from "../../filter-panel-item";
import Checkbox from "../checkbox";

const CheckList = ({
	data, title, placeholder, field, onChange,
}) => {
	const [checkedItems, setCheckedItems] = useState([]);
	const [init, setInit] = useState(false);
	const [search, setSearch] = useState();
	const handleChange = useCallback((item) => (e) => {
		if (e.target.checked) {
			setCheckedItems((checkeds) => [...checkeds, item]);
		} else {
			setCheckedItems((checkeds) => {
				const copy = [...checkeds];
				copy.splice(checkeds.indexOf(item), 1);
				return copy;
			});
		}
	}, []);

	useEffect(() => {
		if (init) {
			onChange &&	onChange(field, checkedItems);
		} else {
			setInit(true);
		}
	}, [checkedItems]);

	const handleSearch = (searchValue) => {
		setSearch(searchValue.target.value.toLowerCase());
	};

	// I know uwsing index as key not the best options but since this is a demo app and the data doens't
	// provide an id I used the index values.
	const renderItems = () => data && data.filter((x) => !search || search.length < 3 || x.toLowerCase().search(search) > -1).map((item, i) => (
		<Checkbox key={i} title={item} checked={checkedItems.indexOf(item) > -1} onChange={handleChange(item)} />
	));

	return (
		<FilterPanelItem title={title} mode="search-list" placeholder={placeholder} onSearchChanged={handleSearch}>
			<div
				className="gtr-flex gtr-flex-col gtr-flow-auto"
				style={{
					padding: 2,
				}}
			>
				{renderItems()}
			</div>
		</FilterPanelItem>
	);
};

export default CheckList;
