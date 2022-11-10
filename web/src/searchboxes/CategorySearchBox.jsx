import { useEffect, useState } from "react";
import { CategoryApi } from "../api/categoryApi";
import {Select} from "chakra-react-select";
import { CategoryReqSearch } from "../dtos/Category";

const CategorySearchBox = ({handleChange, selectedCategory}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCategories = () => {
    setIsLoading(true);
    CategoryApi.search(new CategoryReqSearch({ searchText: inputValue }))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCategories();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.name}
        getOptionValue={(c) => c.categoryId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select category..."
        isLoading={isLoading}
        value={selectedCategory}
      ></Select>
  );
}

export default CategorySearchBox