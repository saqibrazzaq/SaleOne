import { useEffect, useState } from "react";
import { CategoryApi } from "../api/categoryApi";
import {Select} from "chakra-react-select";
import { CategoryReqSearch } from "../dtos/Category";
import { UnitApi } from "../api/unitApi";
import { UnitReqSearch } from "../dtos/Unit";

const UnitSearchBox = ({handleChange, selectedUnit}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUnits = () => {
    setIsLoading(true);
    UnitApi.search(new UnitReqSearch({ searchText: inputValue }))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUnits();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.name}
        getOptionValue={(c) => c.unitId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select unit..."
        isLoading={isLoading}
        value={selectedUnit}
      ></Select>
  );
}

export default UnitSearchBox