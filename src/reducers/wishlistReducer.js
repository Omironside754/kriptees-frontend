// reducers/wishlistReducer.js

import { ADD_TO_WISHLIST, REMOVE_WISHLIST_ITEM } from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;
      const existItem = state.wishlistItems.find((x) => x.productId === item.productId);

      if (existItem) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }
    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter((x) => x.productId !== action.payload),
      };
    default:
      return state;
  }
};
