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
  Heading,
  HStack,
  Image,
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
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { OrderApi } from "../../api/orderApi";
import DeleteIconButton from "../../components/DeleteIconButton";
import UpdateIconButton from "../../components/UpdateIconButton";
import { AddressRes } from "../../dtos/Address";
import { OrderAddressRes, OrderRes, OrderStatus } from "../../dtos/Order";
import { OrderItemReqSearch, OrderItemRes } from "../../dtos/OrderItem";
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItemRes>();

  const toast = useToast();

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  useEffect(() => {
    searchOrderItems();
  }, [searchParams]);

  const deleteOrderItem = () => {
    onClose();
    OrderApi.deleteOrderItem(selectedOrderItem?.orderItemId).then(res => {
      toast({
        title: "Success",
        description: "Item deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      searchOrderItems();
      loadOrder();
    }).catch(error => {
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
                <Link>
                  <UpdateIconButton />
                </Link>
                <Link
                  ml={2}
                  onClick={() => {
                    console.log("Delete " + item.product?.name);
                    setSelectedOrderItem(item);
                    onOpen();
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
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
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
            <Link ref={cancelRef} onClick={onClose}>
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

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Order Details</Heading>
      </Box>
      <Spacer />
      <Box>
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

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"6xl"}>
        {displayHeading()}
        {displayOrderSummary()}
        {showOrderItems()}
        {showAddressesInfo()}
      </Stack>
      {showAlertDialog_Delete()}
    </Box>
  );
};

export default OrderEdit;
