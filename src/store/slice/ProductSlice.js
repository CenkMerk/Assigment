import { createSlice } from "@reduxjs/toolkit";
import Data from "../../data/productData";

//başlangıc durumları
const initialState = {
  productItems: Data, //ürünleri tutan dizi
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //Ürünü siler
    removeProduct: (state, action) => {
      const productId = action.payload.id;
      // console.log(companyId.id);
      state.productItems = state.productItems.filter(
        (product) => product.key !== productId
      );
    },
    addProduct: (state, action) => {
      console.log(action.payload);
      // burada eklenen ürün listede var mı diye kontrol ediyorum
      // varsa ekrana uyarı veriyorum
      // yoksa ürünü listeye ekliyorum
      const cenk = state.productItems.find(
        (item) => item.productName === action.payload.productName
      );
      cenk === undefined
        ? (state.productItems = [
            {
              key: Math.round(Math.random() * 999999),
              productName: action.payload.productName,
              productCategory: action.payload.productCategory,
              productAmount: action.payload.productAmount,
              amountUnit: action.payload.amountUnit,
              company: action.payload.company,
            },
            ...state.productItems,
          ])
        : alert("Bu üründen zaten var");
    },
    editProduct: (state, action) => {
      //ID güncellenen company nin eski key i
      //action.payload.values.key : yeni key
      const ID = action.payload.id;
      if (ID !== action.payload.values.key) {
        const cenk = state.productItems.find(
          (item) => item.key === action.payload.values.key
        );
        if (cenk === undefined) {
          const updatedProductItems = state.productItems.map((product) => {
            if (product.key === ID) {
              return {
                ...product,
                productName: action.payload.values.productName,
                amountUnit: action.payload.values.amountUnit,
                company: action.payload.values.company,
                key: action.payload.values.key,
                productAmount: action.payload.values.productAmount,
                productCategory: action.payload.values.productCategory,
              };
            }
            return product;
          });
          return {
            ...state,
            productItems: updatedProductItems,
          };
        } else {
          alert("Bu ürün zaten kayıtlı!");
        }
      }

      if (ID === action.payload.values.key) {
        const updatedProductItems = state.productItems.map((product) => {
          if (product.key === ID) {
            return {
              ...product,
              productName: action.payload.values.productName,
              amountUnit: action.payload.values.amountUnit,
              company: action.payload.values.company,
              key: action.payload.values.key,
              productAmount: action.payload.values.productAmount,
              productCategory: action.payload.values.productCategory,
            };
          }
          return product;
        });
        return {
          ...state,
          productItems: updatedProductItems,
        };
      }
    },
  },
});
export const { removeProduct, addProduct, editProduct } = productSlice.actions;
export default productSlice.reducer;
