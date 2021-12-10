import { SortType } from "./constans";

export function sortItems(items, type) {
	switch (type) {
		case SortType.LowToHigh:
			return [...items].sort((a, b) => (a.price > b.price ? 1 : -1));
		case SortType.HighToLow:
			return [...items].sort((a, b) => (a.price > b.price ? -1 : 1));
		case SortType.OldToNew:
			return [...items].sort((a, b) => (a.added > b.added ? 1 : -1));
		case SortType.NewToOld:
			return [...items].sort((a, b) => (a.added > b.added ? -1 : 1));
		default:
			return null;
	}
}

export function isEmptyObject(obj) {
	return Object.keys(obj).length === 0 &&
		Object.getPrototypeOf(obj) === Object.prototype;
}

export function hasSharedValues(arr1, arr2) {
	for (let i = 0; i < arr1.length; i++) {
		if (arr2.indexOf(arr1[i]) > -1) {
			return true;
		}
	}
	return false;
}

export function getFilterFieldOptions(field, dt) {
	const result = [];
	dt.forEach((x) => {
		if (Array.isArray(x[field])) {
			result.push(...x[field]);
		} else {
			result.push(x[field]);
		}
	});
	return [...new Set(result)];
}

export function getFilterTree(data, precedence, filterFields, selectedFilters) {
	const result = {};
	let availableDt = [...data];

	for (let i = 0; i < precedence.length; i++) {
		const selectedOptions = selectedFilters[precedence[i]];
		result[precedence[i]] = getFilterFieldOptions(precedence[i], availableDt);
		availableDt = availableDt.filter((row) => (Array.isArray(row[precedence[i]]) ?
			hasSharedValues(row[precedence[i]], selectedOptions) :
			selectedOptions.includes(row[precedence[i]])));
	}

	for (let i = 0; i < filterFields.length; i++) {
		if (!precedence.includes(filterFields[i])) {
			result[filterFields[i]] = getFilterFieldOptions(filterFields[i], availableDt);
		}
	}

	return result;
}

export function roundDecimal(num, decimalPoints = 2) {
	if (typeof num !== "number") {
		return num;
	}
	return parseFloat(num.toFixed(decimalPoints));
}
