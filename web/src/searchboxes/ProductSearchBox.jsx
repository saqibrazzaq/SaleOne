import { useEffect, useState } from "react";
import { CountryApi } from "../api/countryApi";
import { CountryReqSearch, CountryRes } from "../dtos/Country";
import {Select} from "chakra-react-select";
import { ProductApi } from "../api/productApi";
import { ProductReqSearch } from "../dtos/Product";

const ProductSearchBox = ({handleChange, selectedProduct}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadProducts = () => {
    setIsLoading(true);
    ProductApi.search(new ProductReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.name}
        getOptionValue={(c) => c.produtId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select product..."
        isLoading={isLoading}
        value={selectedProduct}
      ></Select>
  );
}

export default ProductSearchBox