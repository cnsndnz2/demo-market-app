import React from "react";
import Input from "../input/input";

/**
 * TODO:
 * This component can be improved by two additional features listed below.
 * I couldn't implement these features because of the time availibility.
 *
 * 1-) An IntersectionObserver can be used for rendering the list items.
 *
 * 2-) Search can be utilized using debouncing.
 * 		 It will be a huge gain in terms of performance
 * 		 when the data comes from the server due to the search term.
 */

const FilterPanelItem = ({
	title, mode, placeholder, onSearchChanged, children,
}) => (mode === "search-list" ? (
	<div className="gtr-filter-container">
		<span className="gtr-label">{title}</span>
		<div className="gtr-content gtr-flex-col">
			<Input className="gtr-mb-3" placeholder={placeholder} onChange={onSearchChanged} />
			{children}
		</div>
	</div>
) : (
	<div className="gtr-filter-container">
		<span className="gtr-label">{title}</span>
		<div className="gtr-content  gtr-flex-col">
			{children}
		</div>
	</div>
));

export default FilterPanelItem;
