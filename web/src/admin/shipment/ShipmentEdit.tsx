import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
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
import { OrderItemReqSearch, OrderItemRes } from "../../dtos/OrderItem";
import PagedRes from "../../dtos/PagedRes";
import { ShipmentReqCreate } from "../../dtos/Shipment";
import { ShipmentItemReqEdit } from "../../dtos/ShipmentItem";
import { ShipmentApi } from "../../api/shipmentApi";

const ShipmentEdit = () => {
  const toast = useToast();
  const params = useParams();
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  // console.log(urlParams.get('orderId'))
  const shipmentId = params.shipmentId;
  const updateText = shipmentId ? "Update Shipment" : "Add Shipment";

  const [importOrderId, setImportOrderId] = useState<number>(
    parseInt(urlParams.get("orderId") || "0")
  );
  const [importedOrder, setImportedOrder] = useState<OrderRes>();
  const [pagedRes, setPagedRes] = useState<PagedRes<OrderItemRes>>();

  useEffect(() => {
    loadOrder();
    importOrderItems();
  }, [importOrderId]);

  // console.log("Shipment id: " + shipmentId)

  const importOrderItems = () => {
    OrderApi.orderItems(
      new OrderItemReqSearch(
        {},
        { orderId: importOrderId, unshippedItems: true }
      )
    ).then((res) => {
      // console.log(res);
      setPagedRes(res);
    });
  };

  const saveShipment = () => {
    ShipmentApi.createFromOrder(importOrderId).then(res => {
      navigate("/admin/shipments");
      toast({
        title: "Success",
        description: "Shipment created successfully.",
        status: "success",
        position: "bottom-right",
      });
    })
  };

  const showImportedOrderitems = () => (
    <VStack>
      <Text fontSize={"xl"}>Import from Order</Text>
      <Button onClick={saveShipment} colorScheme={"blue"}>
        Save Shipment
      </Button>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Shipped</Th>
              <Th>SubTotal</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {pagedRes?.pagedList?.map((item) => (
              <Tr key={item.orderItemId}>
                <Td>{item.orderItemId}</Td>
                <Td>{item.product?.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.shippedQuantity}</Td>
                <Td>
                  <NumericFormat
                    value={item.basePrice}
                    prefix="Rs. "
                    thousandSeparator=","
                    displayType="text"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr></Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </VStack>
  );

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>{updateText}</Heading>
      </Box>
      <Spacer />
      <Box>
        {/* <Link ml={2} as={RouteLink} to={"/admin/shipments"}> */}
        <Button ml={2} onClick={() => navigate(-1)} colorScheme={"gray"}>
          Back
        </Button>
        {/* </Link> */}
      </Box>
    </Flex>
  );

  const loadOrder = () => {
    OrderApi.get(importOrderId)
      .then((res) => setImportedOrder(res))
      .catch((error) => {
        setImportOrderId(0);
        setImportedOrder(undefined);
        toast({
          title: "Order not found",
          description: "No order found with id " + importOrderId,
          status: "error",
          position: "bottom-right",
        });
      });
  };

  const displayOrderSummary = () => (
    <Flex>
      <Box>
        <Text fontSize={"lg"}>Order # {importedOrder?.orderId}</Text>
        <Text>Total Qty: {importedOrder?.quantity}</Text>
      </Box>
      <Box ml={6}></Box>
      <Spacer />
      <Box>
        <Text fontSize={"lg"}>
          <NumericFormat
            value={importedOrder?.baseSubTotal}
            prefix="Rs. "
            thousandSeparator=","
            displayType="text"
          />
        </Text>
        <Text>Shipped Qty: {importedOrder?.shippedQuantity}</Text>
      </Box>
    </Flex>
  );

  const showAddressesInfo = () => (
    <VStack align={"start"}>
      {showAddressBox(
        importedOrder?.addresses?.find((value) => value.isShippingAddress)
      )}
      {showAddressBox(
        importedOrder?.addresses?.find((value) => value.isBillingAddress)
      )}
    </VStack>
  );

  const showAddressBox = (address?: OrderAddressRes) => (
    <HStack align={"start"} spacing={2} padding={0}>
      <Text fontWeight={"semibold"}>
        {address?.isShippingAddress ? "Shipping" : "Billing"} Address:
      </Text>
      <Text padding={0}>
        {address?.firstName + " " + address?.lastName},{address?.phoneNumber}, ,
        {address?.line1},{address?.line2},{address?.line2 ? "," : ""}
        {address?.city?.name +
          ", " +
          address?.city?.state?.name +
          ", " +
          address?.city?.state?.country?.name}
      </Text>
    </HStack>
  );

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {importOrderId && displayOrderSummary()}
        {importOrderId && showAddressesInfo()}
        {importOrderId && showImportedOrderitems()}
      </Stack>
    </Box>
  );
};

export default ShipmentEdit;
