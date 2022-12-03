import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
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
  useDisclosure,
  useToast,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { OrderApi } from "../../api/orderApi";
import DeleteIconButton from "../../components/DeleteIconButton";
import UpdateIconButton from "../../components/UpdateIconButton";
import { AddressRes } from "../../dtos/Address";
import { OrderAddressRes, OrderRes, OrderStatus } from "../../dtos/Order";
import {
  OrderItemReqEdit,
  OrderItemReqSearch,
  OrderItemRes,
} from "../../dtos/OrderItem";
import PagedRes from "../../dtos/PagedRes";
import { UserAddressRes } from "../../dtos/UserAddress";

const OrderEdit = () => {
  const [order, setOrder] = useState<OrderRes>();
  const [pagedRes, setPagedRes] = useState<PagedRes<OrderItemRes>>();
  const [searchText, setSearchText] = useState<string>("");
  let params = useParams();
  const orderId = parseInt(params.orderId || "0");
  const [searchParams, setSearchParams] = useState<OrderItemReqSearch>(
    new OrderItemReqSearch({}, { orderId: orderId })
  );

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItemRes>(
    new OrderItemReqEdit()
  );

  const toast = useToast();

  // Formik validation schema
  const validationSchema = Yup.object({
    rate: Yup.number().required("Rate is required"),
    quantity: Yup.number().required("Quantity is required"),
  });

  const submitForm = (values: OrderItemReqEdit) => {
    onCloseEdit();
    OrderApi.updateOrderItem(selectedOrderItem.orderItemId, values).then(res => {
      searchOrderItems();
      loadOrder();
      toast({
        title: "Success",
        description: "Item updated successfully.",
        status: "success",
        position: "bottom-right",
      });
    })
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  useEffect(() => {
    searchOrderItems();
  }, [searchParams]);

  const deleteOrderItem = () => {
    onCloseDelete();
    OrderApi.deleteOrderItem(selectedOrderItem?.orderItemId)
      .then((res) => {
        toast({
          title: "Success",
          description: "Item deleted successfully.",
          status: "success",
          position: "bottom-right",
        });
        searchOrderItems();
        loadOrder();
      })
      .catch((error) => {
        //setError(error.response.data);
      });
  };

  const searchOrderItems = () => {
    OrderApi.orderItems(searchParams).then((res) => {
      setPagedRes(res);
      //  console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      setSearchParams({
        ...searchParams,
        ...{ pageNumber: previousPageNumber },
      });
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      setSearchParams({ ...searchParams, ...{ pageNumber: nextPageNumber } });
    }
  };

  const showOrderItems = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Product</Th>
            <Th>Rate</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.orderItemId}>
              <Td>
                <Image
                  borderRadius="lg"
                  boxSize={"50px"}
                  src={item.product?.productImages?.at(0)?.imageUrl}
                />
              </Td>
              <Td>{item.product?.name}</Td>
              <Td>{item.rate}</Td>
              <Td>{item.quantity}</Td>
              <Td>
                <NumericFormat
                  value={item.basePrice}
                  prefix="Rs. "
                  thousandSeparator=","
                  displayType="text"
                />
              </Td>
              <Td>
                <Link
                  onClick={() => {
                    console.log("Update " + item.product?.name);
                    setSelectedOrderItem(item);
                    onOpenEdit();
                  }}
                >
                  <UpdateIconButton />
                </Link>
                <Link
                  ml={2}
                  onClick={() => {
                    console.log("Delete " + item.product?.name);
                    setSelectedOrderItem(item);
                    onOpenDelete();
                  }}
                >
                  <DeleteIconButton />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={2} textAlign="center">
              <Button
                isDisabled={!pagedRes?.metaData?.hasPrevious}
                variant="link"
                mr={5}
                onClick={previousPage}
              >
                Previous
              </Button>
              Page {pagedRes?.metaData?.currentPage} of{" "}
              {pagedRes?.metaData?.totalPages}
              <Button
                isDisabled={!pagedRes?.metaData?.hasNext}
                variant="link"
                ml={5}
                onClick={nextPage}
              >
                Next
              </Button>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );

  const showAlertDialog_Delete = () => (
    <AlertDialog
      isOpen={isOpenDelete}
      leastDestructiveRef={cancelRef}
      onClose={onCloseDelete}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Item
          </AlertDialogHeader>

          <AlertDialogBody>
            <Image
              borderRadius="lg"
              boxSize={"150px"}
              src={selectedOrderItem?.product?.productImages?.at(0)?.imageUrl}
            />
          </AlertDialogBody>

          <AlertDialogBody>
            <Text fontSize={"xl"}>{selectedOrderItem?.product?.name}</Text>
            <Text>
              Rate:{" "}
              <NumericFormat
                value={selectedOrderItem?.rate}
                prefix="Rs. "
                thousandSeparator=","
                displayType="text"
              />
            </Text>
            <Text>Quantity: {selectedOrderItem?.quantity}</Text>
            <Text>
              Price:{" "}
              <NumericFormat
                value={selectedOrderItem?.basePrice}
                prefix="Rs. "
                thousandSeparator=","
                displayType="text"
              />
            </Text>
          </AlertDialogBody>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onCloseDelete}>
              <Button type="button" colorScheme={"gray"}>
                Cancel
              </Button>
            </Link>
            <Link onClick={deleteOrderItem} ml={3}>
              <Button type="submit" colorScheme={"red"}>
                Delete Item
              </Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  const loadOrder = () => {
    OrderApi.get(orderId).then((res) => {
      setOrder(res);
      // console.log(res);
    });
  };

  const recalculateOrderTotals = () => {
    OrderApi.recalculateOrderTotals(orderId).then(res => {
      toast({
        title: "Success",
        description: "Order totals recalculated successfully.",
        status: "success",
        position: "bottom-right",
      });
      searchOrderItems();
      loadOrder();
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Order Details</Heading>
      </Box>
      <Spacer />
      <Box>
      <Button onClick={recalculateOrderTotals} type="button" colorScheme={"blue"}>
            Recalculate Order Totals
          </Button>
        <Link ml={2} as={RouteLink} to={"/admin/orders/"}>
          <Button type="button" colorScheme={"gray"}>
            Back
          </Button>
        </Link>
      </Box>
    </Flex>
  );

  const displayOrderSummary = () => (
    <Flex>
      <Box>
        <Text fontSize={"xl"}>
          Order # {order?.orderId} - {OrderStatus[order?.status || 0]}
        </Text>
      </Box>
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

  const showAlertDialog_Edit = () => (
    <AlertDialog
      isOpen={isOpenEdit}
      leastDestructiveRef={cancelRef}
      onClose={onCloseEdit}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Edit Item
          </AlertDialogHeader>

          <AlertDialogBody>
            <Image
              borderRadius="lg"
              boxSize={"150px"}
              src={selectedOrderItem?.product?.productImages?.at(0)?.imageUrl}
            />
          </AlertDialogBody>

          <AlertDialogBody>
            <Box p={0}>
              <Formik
                initialValues={selectedOrderItem}
                onSubmit={(values) => {
                  submitForm(values);
                }}
                validationSchema={validationSchema}
                enableReinitialize={true}
              >
                {({ handleSubmit, errors, touched, setFieldValue, values }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={4} as={Container} maxW={"3xl"}>
                      <FormControl isInvalid={!!errors.rate && touched.rate}>
                        <FormLabel htmlFor="rate">Rate</FormLabel>
                        <Field as={Input} id="rate" name="rate" type="text" />
                        <FormErrorMessage>{errors.rate}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.quantity && touched.quantity}
                      >
                        <FormLabel htmlFor="quantity">Quantity</FormLabel>
                        <Field
                          as={Input}
                          id="quantity"
                          name="quantity"
                          type="text"
                        />
                        <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Price</FormLabel>
                        <Text>
                          <NumericFormat
                            value={
                              (values?.rate || 1) * (values?.quantity || 1)
                            }
                            prefix="Rs. "
                            thousandSeparator=","
                            displayType="text"
                          />
                        </Text>
                      </FormControl>
                      <Stack direction={"row"} spacing={6}>
                        <Link ref={cancelRef} onClick={onCloseEdit}>
                          <Button type="button" colorScheme={"gray"}>
                            Cancel
                          </Button>
                        </Link>
                        <Button type="submit" colorScheme={"blue"}>
                          Save Changes
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                )}
              </Formik>
            </Box>
          </AlertDialogBody>

          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"6xl"}>
        {displayHeading()}
        {displayOrderSummary()}
        {showOrderItems()}
        {showAddressesInfo()}
      </Stack>
      {showAlertDialog_Delete()}
      {showAlertDialog_Edit()}
    </Box>
  );
};

export default OrderEdit;
