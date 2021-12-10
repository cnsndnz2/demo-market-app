import React, { useEffect, useRef, useState } from "react";
import Button from "../input/button";

const Pagination = ({
	totalCount, onPageChanged, maxButtons = 4, perPage = 16,
}) => {
	const pageCount = useRef();

	const getOptions = () => {
		const totalPages = Math.ceil(totalCount / perPage);
		pageCount.current = totalPages;
		const result = [];
		for (let i = 0; i < totalPages; i++) {
			result.push((i + 1));
		}
		return result;
	};

	const [visiblePages, setVisiblePages] = useState([]);
	const [selected, setSelected] = useState(1);

	useEffect(() => {
		const newPages = calcVisiblePages();
		setVisiblePages(newPages);
	}, [perPage, totalCount, selected]);

	useEffect(() => {
		onPageChanged && onPageChanged(selected);
	}, [selected]);

	const handleSelected = (p) => {
		setSelected(p);
	};

	const handleNextPage = () => {
		setSelected((p) => ++p);
	};

	const handlePrevPage = () => {
		setSelected((p) => --p);
	};

	const calcVisiblePages = () => {
		const pages = getOptions();
		let pageData;
		if (selected > maxButtons - 1 && selected <= pages.length - maxButtons + 1) {
			const middle = [];
			for (let ind = selected - maxButtons / 2; ind < selected + maxButtons / 2 + 1; ind++) {
				middle.push(ind);
			}

			pageData = [1, "dots", ...middle, "dots", pages[pages.length - 1]];
		} else if (pages.length > maxButtons * 2) {
			pageData = [];
			for (let ind = 1; ind <= pages.length; ind++) {
				if (ind === maxButtons + 1) {
					pageData.push("dots");
				} else if (ind <= maxButtons || ind > pages.length - maxButtons) {
					pageData.push(ind);
				}
			}
		} else {
			pageData = pages;
		}
		return pageData;
	};

	return (
		<div
			className="gtr-pagination gtr-flex gtr-justify-between gtr-align-center gtr-ml-2 gtr-mr-2"
		>
			<Button
				theme="ghost"
				className="gtr-pg-nav gtr-pg-prev gtr-color-primary"
				onClick={handlePrevPage}
				disabled={selected === 1}
			>
				<span>
					<i
						className="fas fa-arrow-left gtr-mr-2"
						style={{
							fontWeight: 400,
						}}
					/>
Prev
				</span>
			</Button>
			<div className="gtr-pages gtr-flex gtr-flex-grow-1 gtr-justify-center gtr-align-center gtr-no-select">
				{
					visiblePages.map((p, i) => {
						if (typeof p === "number") {
							return (
								<div
									key={i}
									className={`gtr-fill-pagination gtr-button gtr-mr-1 ${selected && selected === p ? "" : "gtr-passive"}`}
									onClick={() => { handleSelected(p); }}
								>
									{p}
								</div>
							);
						}
						return (
							<div key={i} className="gtr-ml-2 gtr-mr-2" style={{ height: 40, lineHeight: "32px" }}>
									...
							</div>
						);
					})
				}
			</div>
			<Button
				theme="ghost"
				className="gtr-pg-nav gtr-pg-next gtr-color-primary"
				onClick={handleNextPage}
				disabled={selected === pageCount.current}
			>
				<span>
Next
					<i
						className="fas fa-arrow-right gtr-ml-2"
						style={{
							fontWeight: 400,
						}}
					/>
				</span>
			</Button>
		</div>
	);
};

export default Pagination;
