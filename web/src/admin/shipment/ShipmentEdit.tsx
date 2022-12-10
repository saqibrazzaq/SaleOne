import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { ShipmentReqCreate, ShipmentReqEdit } from "../../dtos/Shipment";
import { ShipmentItemReqEdit } from "../../dtos/ShipmentItem";
import { ShipmentApi } from "../../api/shipmentApi";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import DeliveryPlanSearchBox from "../../searchboxes/DeliveryPlanSearchBox";
import { DeliveryPlanRes } from "../../dtos/DeliveryPlan";
import { CourierApi } from "../../api/courierApi";

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
  const [shipment, setShipment] = useState<ShipmentReqEdit>(
    new ShipmentReqEdit()
  );
  const [selectedDeliveryPlan, setSelectedDeliveryPlan] =
    useState<DeliveryPlanRes>();

  useEffect(() => {
    loadOrder();
    importOrderItems();
  }, [importOrderId]);

  useEffect(() => {
    loadShipment();
  }, [shipmentId]);

  useEffect(() => {
    if (shipment.deliveryPlanId) {
      CourierApi.getDeliveryPlan(shipment.deliveryPlanId).then((res) =>
        setSelectedDeliveryPlan(res)
      );
    }
  }, [shipment.deliveryPlanId]);

  const loadShipment = () => {
    if (shipmentId) {
      ShipmentApi.get(shipmentId).then((res) => {
        setShipment(res);
        console.log(res);
      });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    trackingNumber: Yup.string().nullable(),
    deliveryPlanId: Yup.number().nullable(),
    deliveryDate: Yup.date().nullable(),
  });

  const submitForm = (values: ShipmentReqEdit) => {
    console.log(values);
    if (shipmentId) {
      updateShipment(values);
    }
  };

  const updateShipment = (values: ShipmentReqEdit) => {
    ShipmentApi.update(shipmentId, values).then((res) => {
      toast({
        title: "Success",
        description: "Shipment updated successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/shipments");
    });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={shipment}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl
                isInvalid={!!errors.deliveryPlanId && touched.deliveryPlanId}
              >
                <FormLabel htmlFor="deliveryPlanId">Courier and Delivery Plan</FormLabel>
                <Field
                  as={Input}
                  id="deliveryPlanId"
                  name="deliveryPlanId"
                  type="hidden"
                />
                <DeliveryPlanSearchBox
                  selectedDeliveryPlan={selectedDeliveryPlan}
                  handleChange={(newValue?: DeliveryPlanRes) => {
                    setSelectedDeliveryPlan(newValue);
                    setFieldValue("deliveryPlanId", newValue?.deliveryPlanId || 0);
                    // console.log(newValue)
                  }}
                />
                <FormErrorMessage>{errors.deliveryPlanId}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.trackingNumber && touched.trackingNumber}
              >
                <FormLabel htmlFor="trackingNumber">Tracking Number</FormLabel>
                <Field
                  as={Input}
                  id="trackingNumber"
                  name="trackingNumber"
                  type="text"
                />
                <FormErrorMessage>{errors.trackingNumber}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.deliveryDate && touched.deliveryDate}
              >
                <FormLabel htmlFor="deliveryDate">Delivery Date</FormLabel>
                <Field
                  as={Input}
                  id="deliveryDate"
                  name="deliveryDate"
                  type="datetime-local"
                />
                <FormErrorMessage>{errors.deliveryDate}</FormErrorMessage>
              </FormControl>
              <Stack direction={"row"} spacing={6}>
                <Button type="submit" colorScheme={"blue"}>
                  {updateText}
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );

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
    ShipmentApi.createFromOrder(importOrderId).then((res) => {
      navigate("/admin/shipments");
      toast({
        title: "Success",
        description: "Shipment created successfully.",
        status: "success",
        position: "bottom-right",
      });
    });
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
        {shipmentId && showUpdateForm()}
      </Stack>
    </Box>
  );
};

export default ShipmentEdit;
