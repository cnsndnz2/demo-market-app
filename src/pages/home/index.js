import React, { useEffect, useRef, useState } from "react";
import CheckList from "../../components/input/check-list";
import Pagination from "../../components/pagination";
import ItemTypeFilter from "../../components/item-type-filter";
import ProductList from "../../components/product-list";
import RadioGroup from "../../components/input/radio-group";
import Basket from "../../components/basket";
import { getFilterOptions, getItems } from "../../services/items";
import { SortType } from "../../common/constans";
import BottomMenu from "../../components/bottom-menu";

/**
 * TODO: The pagination structure can be replaced by endless scroll
 * using IntersectionObserverApi which is more preferable for user experience.
 * But the given task doesn't require this.
 */

const HomePage = () => {
	const [page, setPage] = useState(1);

	const [pageItems, setPageItems] = useState({});

	const [sort, setSort] = useState();
	const [filterTree, setFilterTree] = useState({});
	const [selectedFilters, setSelectedFilters] = useState({});
	const [itemTypeFilter, setItemTypeFilter] = useState();
	const filterPrecedence = useRef([]);

	const [filtersVisible, setFiltersVisible] = useState(false);
	const [basketVisible, setBasketVisible] = useState(false);

	// Filters list value can be setted dynamiccaly via props or state
	const [filterFields] = useState([{
		title: "Brands",
		field: "manufacturer",
		placeholder: "Search brand",
	}, {
		title: "Tags",
		field: "tags",
		placeholder: "Search tags",
	}]);

	const loadData = (pageNum, sortType, appliedFilters) => {
		const response = getItems(pageNum, sortType, appliedFilters, itemTypeFilter);
		setPageItems(response);
	};

	const handlePageChanged = (selectedPage) => {
		setPage(selectedPage);
		loadData(selectedPage, sort, selectedFilters);
	};

	const handleSortChanged = (item) => {
		setSort(item.value);
		loadData(page, item.value, selectedFilters);
	};

	const handleFilterChanged = (field, checkedValues) => {
		const fieldInd = filterPrecedence.current.indexOf(field);
		if (fieldInd === -1 && checkedValues.length === 1) {
			filterPrecedence.current.push(field);
		} else if (checkedValues.length === 0) {
			filterPrecedence.current.splice(fieldInd, 1);
		}

		setSelectedFilters((filters) => {
			let newValue;
			if (checkedValues.length === 0) {
				const copy = { ...filters };
				delete copy[field];
				newValue = copy;
			} else {
				newValue = { ...filters, [field]: checkedValues };
			}
			return newValue;
		});
	};

	const handleOpenBasket = () => {
		setFiltersVisible(false);
		setBasketVisible(true);
	};

	const handleOpenFilters = () => {
		setBasketVisible(false);
		setFiltersVisible(true);
	};

	const handleMobileMenusClose = () => {
		setBasketVisible(false);
		setFiltersVisible(false);
	};

	const handleItemTypeFilterChange = (item) => {
		setItemTypeFilter(item);
	};

	useEffect(() => {
		loadData(page, sort, selectedFilters);
		const treeData = getFilterOptions(filterPrecedence.current, filterFields.map((x) => x.field), selectedFilters, itemTypeFilter);
		setFilterTree(treeData);
	}, [selectedFilters, itemTypeFilter]);

	return (
		<>
			<div className="gtr-container gtr-h-100 gtr-flex gtr-justify-between gtr-pos-relative">
				<div className={`gtr-flex gtr-flex-col gtr-filters ${filtersVisible ? "gtr-filters-open" : ""}`}>
					<RadioGroup
						title="Sorting"
						data={[
							{ value: SortType.LowToHigh, text: "Price low to high" },
							{ value: SortType.HighToLow, text: "Price high to low" },
							{ value: SortType.NewToOld, text: "New to old" },
							{ value: SortType.OldToNew, text: "Old to new" },
						]}
						onChange={handleSortChanged}
					/>
					{
						filterFields.map((ftf, i) => <CheckList key={i} {...ftf} data={filterTree[ftf.field]} onChange={handleFilterChanged} />)
					}
				</div>
				<div className={`gtr-products-list gtr-flex gtr-flex-col gtr-space-between gtr-flex-grow-1 gtr-flow-hidden ${basketVisible || filtersVisible ? "gtr-filters-open" : ""}`}>
					<h2 className="gtr-heading-2 gtr-ml-2 gtr-mt-2 gtr-mr-2">Products</h2>
					<div className="gtr-flow-x-auto gtr-ml-2 gtr-mr-2">
						<ItemTypeFilter allowDeselect onChange={handleItemTypeFilterChange} />
					</div>
					<ProductList products={pageItems.products} />
					{pageItems.products &&
						pageItems.products.length > 0 &&
						<Pagination totalCount={pageItems.totalCount} onPageChanged={handlePageChanged} />}
				</div>
				<Basket className={`${basketVisible ? "gtr-filters-open" : ""}`} />
			</div>
			<BottomMenu
				closeVisible={basketVisible || filtersVisible}
				onBasketToggle={handleOpenBasket}
				onFiltersToggle={handleOpenFilters}
				onClose={handleMobileMenusClose}
			/>
		</>
	);
};

export default HomePage;
