import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slice/CompanySlice";
import productReducer from "./slice/ProductSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    product: productReducer,
  },
});
