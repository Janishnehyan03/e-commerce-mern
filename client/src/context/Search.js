import { createContext, useContext, useState } from "react";
import Axios from "../Axios";

export const SearchContext = createContext({});

export const SearchProvider = (props) => {
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const getSearchData = async () => {
    try {
      let res = await Axios.post(`/products/search?search=${search}`);
      if (res.status === 200) {
        setSearchData(res.data.products);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const value = {
    setSearchData,
    getSearchData,
    searchData,
    search,
    setSearch,
  };
  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
};
