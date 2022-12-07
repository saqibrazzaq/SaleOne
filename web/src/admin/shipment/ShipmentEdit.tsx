import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  Link as RouteLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { OrderAddressRes, OrderRes } from "../../dtos/Order";
import { OrderApi } from "../../api/orderApi";
import { NumericFormat } from "react-number-format";

const ShipmentEdit = () => {
  const toast = useToast();
  const params = useParams();
  const shipmentId = params.shipmentId;
  const updateText = shipmentId ? "Update Shipment" : "Add Shipment";

  const [orderSearchText, setOrderSearchText] = useState("");
  const [orderId, setOrderId] = useState(0);
  const [order, setOrder] = useState<OrderRes>();

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  // console.log("Shipment id: " + shipmentId)

  const importOrderItems = () => {
    console.log("import order items from order id : " + orderId)
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>{updateText}</Heading>
      </Box>
      <Spacer />
      <Box>
        {orderId ? (
          <Button onClick={importOrderItems} colorScheme={"blue"}>Import Order Items</Button>
        ) : (
          <></>
        )}
        <Link ml={2} as={RouteLink} to={"/admin/shipments"}>
          <Button colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );

  const loadOrder = () => {
    OrderApi.get(orderId)
      .then((res) => setOrder(res))
      .catch((error) => {
        setOrderId(0);
        setOrder(undefined);
        toast({
          title: "Order not found",
          description: "No order found with id " + orderId,
          status: "error",
          position: "bottom-right",
        });
      });
  };

  const displayOrderSearch = () => (
    <Flex>
      <Center></Center>
      <Box flex={1} ml={4}></Box>

      <Box ml={4}>
        <Input
          placeholder="Enter order #..."
          value={orderSearchText}
          onChange={(e) => setOrderSearchText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setOrderId(parseInt(orderSearchText));
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            setOrderId(parseInt(orderSearchText));
          }}
        >
          Search
        </Button>
      </Box>
    </Flex>
  );

  const displayOrderSummary = () => (
    <Flex>
      <Box>
        <Text fontSize={"xl"}>Order # {order?.orderId}</Text>
      </Box>
      <Box ml={6}></Box>
      <Spacer />
      <Box>
        <Text fontSize={"xl"}>
          <NumericFormat
            value={order?.baseSubTotal}
            prefix="Rs. "
            thousandSeparator=","
            displayType="text"
          />
        </Text>
      </Box>
    </Flex>
  );

  const showAddressesInfo = () => (
    <Flex>
      <Box>
        {showAddressBox(
          order?.addresses?.find((value) => value.isShippingAddress)
        )}
      </Box>
      <Spacer />
      <Box>
        {showAddressBox(
          order?.addresses?.find((value) => value.isBillingAddress)
        )}
      </Box>
    </Flex>
  );

  const showAddressBox = (address?: OrderAddressRes) => (
    <VStack spacing={2} padding={1}>
      <Text fontSize={"xl"}>
        {address?.isShippingAddress ? "Shipping" : "Billing"} Address
      </Text>
      <Box boxShadow={"md"} padding={4}>
        {address?.firstName + " " + address?.lastName} <br />
        {address?.phoneNumber}
        <br />
        {address?.line1}
        <br />
        {address?.line2}
        {address?.line2 ? <br /> : ""}
        {address?.city?.name +
          ", " +
          address?.city?.state?.name +
          ", " +
          address?.city?.state?.country?.name}
      </Box>
    </VStack>
  );

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {displayOrderSearch()}
        {orderId && displayOrderSummary()}
        {orderId && showAddressesInfo()}
      </Stack>
    </Box>
  );
};

export default ShipmentEdit;
