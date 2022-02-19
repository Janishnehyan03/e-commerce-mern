import { createContext, useContext, useState } from "react";
import Axios from "../Axios";
import { UserAuthContext } from "./UserAuth";

export const SearchContext = createContext({});

export const SearchProvider = (props) => {
  const [searchData, setSearchData] = useState([]);
  const { authData } = useContext(UserAuthContext);
  const user =authData
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState("");
  const getSearchData = async () => {
    try {
      let res = await Axios.post(`/products/search?search=${search}`, { user });
      if (res.status === 200) {
        setSearchData(res.data.products);
        setSearchHistory(res.data.search);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    setSearchData,
    getSearchData,
    searchData,
    search,
    setSearch,
    searchHistory,
  };
  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
};
