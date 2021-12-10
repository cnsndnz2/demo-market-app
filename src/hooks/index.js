import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../store/slices/basket-slice";

export function useBasket() {
	const basket = useSelector((state) => state.basket);
	const dispatch = useDispatch();

	const addPrd = useCallback((payload) => dispatch(addProduct(payload)), [dispatch]);
	const dltPrd = useCallback((payload) => dispatch(deleteProduct(payload)), [dispatch]);

	const hasItem = useCallback((itemName) => (basket && basket.value ?
		basket.value.findIndex((item) => item.itemInfo.name === itemName) > -1 :
		false), [basket]);

	return {
		basket, addProduct: addPrd, deleteProduct: dltPrd, hasItem,
	};
}
