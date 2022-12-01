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
import UpdateIconButton from "../../components/UpdateIconButton";
import { AddressRes } from "../../dtos/Address";
import { OrderAddressRes, OrderRes } from "../../dtos/Order";
import { OrderItemReqSearch, OrderItemRes } from "../../dtos/OrderItem";
import PagedRes from "../../dtos/PagedRes";

const OrderView = () => {
  const [order, setOrder] = useState<OrderRes>();
  const [pagedRes, setPagedRes] = useState<PagedRes<OrderItemRes>>();
  const [searchText, setSearchText] = useState<string>("");
  let params = useParams();
  const orderId = parseInt(params.orderId || "0");
  const [searchParams, setSearchParams] = useState<OrderItemReqSearch>(
    new OrderItemReqSearch({}, {orderId: orderId}));

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  useEffect(() => {
    searchOrderItems();
  }, [searchParams]);

  const searchOrderItems = () => {
    OrderApi.myOrderItems(searchParams).then((res) => {
      setPagedRes(res);
       console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      setSearchParams({...searchParams, ...{pageNumber: previousPageNumber}});
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      setSearchParams({...searchParams, ...{pageNumber: nextPageNumber}});
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
              <Td>
                {item.quantity}
              </Td>
              <Td>
              <NumericFormat
                    value={item.basePrice}
                    prefix="Rs. "
                    thousandSeparator=","
                    displayType="text"
                  />
              </Td>
              <Td>
                
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

  const loadOrder = () => {
    OrderApi.getMyOrder(orderId).then((res) => {
      setOrder(res);
      console.log(res);
    });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Order Details</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/account/orders/"}>
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
        <Heading fontSize={"xl"}>Order # {order?.orderId}</Heading>
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
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {displayOrderSummary()}
        {showOrderItems()}
        {showAddressesInfo()}
      </Stack>
    </Box>
  );
};

export default OrderView;
