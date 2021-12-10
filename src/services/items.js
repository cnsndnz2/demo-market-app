import {
	hasSharedValues, isEmptyObject, sortItems, getFilterTree,
} from "../common/helper";
import items from "../store/data/items.json";

export function getItems(page, sort, filters, itemTypeFilter, pageCount = 16) {
	const start = (page - 1) * pageCount;
	const end = start + pageCount;

	let result = [];
	const filtersempty = !filters || isEmptyObject(filters);
	if (sort || !filtersempty || itemTypeFilter) {
		if (!filtersempty) {
			items.forEach((itm) => {
				let itemMeets = true;
				const filterKeys = Object.keys(filters);
				for (let fi = 0; fi < filterKeys.length; fi++) {
					const field = filterKeys[fi];
					const isArray = Array.isArray(itm[field]);
					if (isArray && !hasSharedValues(itm[field], filters[field])) {
						itemMeets = false;
						break;
					} else if (!isArray && !filters[field].includes(itm[field])) {
						itemMeets = false;
						break;
					}
				}

				if (itemMeets) {
					result.push(itm);
				}
			});
		} else {
			result = [...items];
		}

		if (itemTypeFilter) {
			result = result.filter((x) => x.itemType === itemTypeFilter);
		}

		if (sort) {
			result = sortItems(!filtersempty ? result : items, sort);
		}
	} else {
		result = [...items];
	}

	return {
		products: result.slice(start, end),
		totalCount: result.length,
	};
}

export function getItemTypes(data = items) {
	return Array.from(new Set(data.map((item) => item.itemType)));
}

export function getFilterOptions(precedence, filterFields, selectedFilters, itemTypeFilter) {
	let dt;
	if (itemTypeFilter) {
		dt = items.filter((x) => x.itemType === itemTypeFilter);
	} else {
		dt = items;
	}
	return getFilterTree(dt, precedence, filterFields, selectedFilters);
}
