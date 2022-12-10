import { useEffect, useState } from "react";
import { CityApi } from "../api/cityApi";
import { CityReqSearch } from "../dtos/City";
import {Select} from "chakra-react-select";
import { DeliveryPlanReqSearch } from "../dtos/DeliveryPlan";
import { CourierApi } from "../api/courierApi";

const DeliveryPlanSearchBox = ({handleChange, selectedDeliveryPlan}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadDeliveryPlans = () => {
    setIsLoading(true);
    CourierApi.searchDeliveryPlans(new DeliveryPlanReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
        // console.log(res.pagedList)
      })
      .finally(() => setIsLoading(false));
      
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDeliveryPlans();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c?.name ? (c?.name + ", " + c?.courier?.name) : ""}
        getOptionValue={(c) => c.deliveryPlanId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select Courier and delivery plan..."
        isLoading={isLoading}
        value={selectedDeliveryPlan}
      ></Select>
  );
}

export default DeliveryPlanSearchBox