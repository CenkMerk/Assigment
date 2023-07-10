import { createSlice } from "@reduxjs/toolkit";
import Data from "../../data/data";
//başlangıc durumları
const initialState = {
  companyItems: Data, //şirketleri tutan dizi
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    //Şirketi siler
    removeCompany: (state, action) => {
      const companyId = action.payload.id;
      // console.log(companyId.id);
      state.companyItems = state.companyItems.filter(
        (company) => company.key !== companyId
      );
    },
    addCompany: (state, action) => {
      //burada eklenen şirket listede var mı diye kontrol ediyorum
      //varsa ekrana uyarı veriyorum
      //yoksa şirketi listeye ekliyorum
      const cenk = state.companyItems.find(
        (item) => item.key === action.payload.key
      );
      cenk === undefined
        ? (state.companyItems = [
            {
              key: action.payload.key,
              companyName: action.payload.companyName,
              headquarters: action.payload.headquarters,
              website: action.payload.website,
            },
            ...state.companyItems,
          ])
        : alert("Bu sicil numarasıyla kayıtlı şirket bulunmaktadır.");
    },
    editCompany: (state, action) => {
      //ID güncellenen company nin eski key i
      //action.payload.values.key : yeni key
      const ID = action.payload.id;
      console.log(ID);
      console.log(action.payload.values.key);
      if (ID !== action.payload.values.key) {
        const cenk = state.companyItems.find(
          (item) => item.key === action.payload.values.key
        );
        if (cenk === undefined) {
          const updatedCompanyItems = state.companyItems.map((company) => {
            if (company.key === ID) {
              return {
                ...company,
                companyName: action.payload.values.companyName,
                headquarters: action.payload.values.headquarters,
                key: action.payload.values.key,
                website: action.payload.values.website,
              };
            }
            return company;
          });
          return {
            ...state,
            companyItems: updatedCompanyItems,
          };
        }else{
          alert("Bu sicil numarasıyla kayıtlı şirket bulunmaktadır.")
        }
      }

      if (ID === action.payload.values.key) {
        const updatedCompanyItems = state.companyItems.map((company) => {
          if (company.key === ID) {
            return {
              ...company,
              companyName: action.payload.values.companyName,
              headquarters: action.payload.values.headquarters,
              key: action.payload.values.key,
              website: action.payload.values.website,
            };
          }
          return company;
        });
        return {
          ...state,
          companyItems: updatedCompanyItems,
        };
      }
    },
  },
});

export const { removeCompany, addCompany, editCompany } = companySlice.actions;
export default companySlice.reducer;
