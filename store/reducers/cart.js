import * as types from "../constants/ActionTypes";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

// const cartSlice = createSlice({
//   name: "cart-event-trigger",
//   initialState,
//   reducers: {
//     addProduct(state, action) {
//       state.quantity += 1;
//       state.products.push({
//         product: action.payload.newProduct,
//         quantity: action.payload.quantity,
//       });
//       state.total += action.payload.price;
//     },
//   },
// });

const totalQuantityHandler = (products, id) => {
  let count;
  const existingProduct = products?.find(({ product }, i) => {
    return product.id === id;
  });
  if (existingProduct) count = 1;
  count = products?.length;
  return count;
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_CART:
      if (state.quantity === 0) {
        state?.products?.push({
          product: payload.newProduct,
          quantity: payload.quantity,
        });
      } else {
        let check = false;
        state.products?.map(({ product, quantity }, i) => {
          if (product.id === payload.id) {
            state.products[i].quantity = payload.quantity;
            check = true;
          }
        });
        if (!check) {
          state.products?.push({
            product: payload.newProduct,
            quantity: payload.quantity,
          });
        }
      }

      const newTotal = state.products?.reduce(
        (total, { product, quantity }) => total + product.price * quantity,
        0
      );

      const newQuantity = totalQuantityHandler(state?.products, payload.id);
      console.log(state?.products);
      return {
        ...state,
        quantity: newQuantity,
        total: newTotal,
      };

    case types.ADD_QUANTITY:
      let exisitingProductIndex = state.products.findIndex(
        ({ product }) => product.id === payload.id
      );
      state.products[exisitingProductIndex].quantity++;
      return { ...state };

    case types.REMOVE_ITEM_CART:
      let newProducts = [];
      let newTotalQuantity = 0;
      const findProductIndex = state.products.findIndex(
        ({ product }) => product.id === payload.id
      );
      let quantityInd = state.products[findProductIndex].quantity;

      if (quantityInd > 1) {
        newProducts = state.products;
        state.products[findProductIndex].quantity--;
      } else {
        newProducts = state.products.filter(
          ({ product }) => product.id !== payload.id
        );
        newTotalQuantity = state.quantity - 1;
      }

      return {
        ...state,
        quantity: newTotalQuantity,
        products: newProducts,
      };

    default:
      return state;
  }
};

export const products = (state) => state.cart.products;
export const quantity = (state) => state.cart.quantity;
export const total = (state) => state.cart.total;

export default cartReducer;
