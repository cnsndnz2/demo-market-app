import { createSlice } from "@reduxjs/toolkit";
import { roundDecimal } from "../../common/helper";

const initialState = {
	value: [],
	totalPrice: 0,
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		/**
		 * @typedef {Object} BasketType
		 * @property {ItemInfo} itemInfo - The data type presented in the items.json
		 * @property {number} quantity
		 */

		/**
		 *
		 * @param {{value: BasketType[], totalPrice: number}} state
		 * @param {import("@reduxjs/toolkit").PayloadAction<BasketType>} action
		 *
		 */
		addProduct: (state, action) => {
			if (typeof action.payload.quantity !== "number" || action.payload.quantity <= 0) {
				return;
			}
			const existingProduct = state.value.find((prd) => prd.itemInfo.name === action.payload.itemInfo.name);

			if (existingProduct) {
				state.value = state.value.map((prd) => (prd.itemInfo.name !== existingProduct.itemInfo.name ?
					prd :
					{
						...existingProduct,
						quantity: existingProduct.quantity + action.payload.quantity,
					}));
			} else {
				state.value = [...state.value, { ...action.payload }];
			}
			state.totalPrice += action.payload.quantity * action.payload.itemInfo.price;
			state.totalPrice = roundDecimal(state.totalPrice);
		},

		/**
		 *
		 * @param {{value: BasketType[], totalPrice: number}} state
		 * @param {import("@reduxjs/toolkit").PayloadAction<BasketType>} action
		 *
		 */
		deleteProduct: (state, action) => {
			const existingItem = state.value.find((prd) => prd.itemInfo.name === action.payload.itemInfo.name);
			if (typeof action.payload.quantity !== "number" || action.payload.quantity <= 0 || !existingItem) {
				return;
			}

			if (existingItem.quantity === 1 || action.payload.quantity >= existingItem.quantity) {
				state.value = state.value.filter((itm) => itm.itemInfo.name !== action.payload.itemInfo.name);
				state.totalPrice -= existingItem.quantity * action.payload.itemInfo.price;
				state.totalPrice = roundDecimal(state.totalPrice);
				return;
			}
			state.value = state.value.map((prd) => (prd.itemInfo.name !== existingItem.itemInfo.name ?
				prd :
				{
					...existingItem,
					quantity: existingItem.quantity - action.payload.quantity,
				}));
			state.totalPrice -= action.payload.quantity * action.payload.itemInfo.price;
			state.totalPrice = roundDecimal(state.totalPrice);
		},
	},
});

export const { addProduct, deleteProduct } = basketSlice.actions;

export default basketSlice.reducer;
