import React, { useEffect, useState } from "react";
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
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Select,
  SimpleGrid,
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
  WrapItem,
} from "@chakra-ui/react";
import { Link as RouteLink, useParams } from "react-router-dom";
import { CartRes } from "../dtos/Cart";
import { CartApi } from "../api/cartApi";
import UpdateIconButton from "../components/UpdateIconButton";
import RemoveIconButton from "../components/RemoveIconButton";
import ErrorDetails from "../dtos/ErrorDetails";
import { ProductRes } from "../dtos/Product";
import { CartItemReqAddToCart, CartItemRes } from "../dtos/CartItem";
import { NumericFormat } from "react-number-format";
import { UserAddressRes } from "../dtos/UserAddress";
import { UserAddressApi } from "../api/userAddressApi";
import { AddressRes } from "../dtos/Address";

const Checkout = () => {
  const [cart, setCart] = useState<CartRes>();
  const [userAddresses, setUserAddresses] = useState<UserAddressRes[]>();
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<AddressRes>();
  const [selecttedBillingAddress, setSelectedBillingAddress] =
    useState<AddressRes>();
  const toast = useToast();

  useEffect(() => {
    getAllUserAddresses();
  }, []);

  useEffect(() => {
    setSelectedBillingAddress(
      userAddresses?.find((item) => item.isPrimary == true)?.address
    );
    setSelectedShippingAddress(
      userAddresses?.find((item) => item.isPrimary == true)?.address
    );
  }, [userAddresses]);

  useEffect(() => {
    loadCart();
  }, []);

  const getAllUserAddresses = () => {
    UserAddressApi.getAll().then((res) => {
      setUserAddresses(res);
      //  console.log(res);
    });
  };

  const loadCart = () => {
    CartApi.get().then((res) => {
      setCart(res);
      // console.log(res);
    });
  };

  const showCartItems = () => (
    <VStack>
      {/* <Heading fontSize={"3xl"}>Shopping Cart</Heading> */}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Unit Price</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart?.cartItems?.map((item) => (
              <Tr key={item.cartItemId}>
                <Td>
                  <Image
                    borderRadius="lg"
                    boxSize={"50px"}
                    src={item.product?.productImages?.at(0)?.imageUrl}
                  />
                </Td>
                <Td>{item.product?.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>
                  <NumericFormat
                    value={item?.rate}
                    prefix="Rs. "
                    thousandSeparator=","
                    displayType="text"
                  />
                </Td>
                <Td>
                  <NumericFormat
                    value={item?.basePrice}
                    prefix="Rs. "
                    thousandSeparator=","
                    displayType="text"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );

  const showCartSummary = () => (
    <Box boxShadow={"md"} mt={"4"} p={"4"}>
      <VStack>
        <Heading fontSize={"xl"}>Order Summary</Heading>
        <TableContainer>
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Th>Subtotal</Th>
                <td>
                  <NumericFormat
                    value={cart?.baseSubTotal}
                    prefix="Rs. "
                    thousandSeparator=","
                    displayType="text"
                  />
                </td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Link as={RouteLink} to={"/payment"} ml={3}>
          <Button colorScheme={"blue"}>Proceed to Payment</Button>
        </Link>
      </VStack>
    </Box>
  );

  const showAddressBox = (address?: AddressRes) => (
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
  );

  const showShippingAddresses = () => (
    <Box mt={6} >
      <VStack align={"start"}>
        <Heading fontSize={"md"}>Delivery Address</Heading>
        {showAddressBox(selectedShippingAddress)}
        <HStack>
          {/* <Text>Change: </Text> */}
          <Select
            value={selectedShippingAddress?.addressId}
            onChange={(e) => {
              // console.log(e.target.value)
              // console.log(userAddresses?.find(value => value.addressId == parseInt(e.target.value)))
              setSelectedShippingAddress(
                userAddresses?.find(
                  (value) => value.addressId == parseInt(e.target.value)
                )?.address
              );
            }}
          >
            {userAddresses?.map((userAddress) => (
              <option key={userAddress.addressId} value={userAddress.addressId}>
                {userAddress.address?.firstName + " "}
                {/* {userAddress.address?.lastName + " - "}
                {userAddress.address?.phoneNumber + " - "} */}
                {userAddress.address?.line1 + ". "}
                {/* {userAddress.address?.city?.name} */}
              </option>
            ))}
          </Select>
        </HStack>
      </VStack>
    </Box>
  );

  const showBillingAddresses = () => (
    <Box mt={6} >
      <VStack align={"start"}>
        <Heading fontSize={"md"}>Billing Address</Heading>
        {showAddressBox(selecttedBillingAddress)}
        <HStack>
          {/* <Text>Change: </Text> */}
          <Select
            value={selecttedBillingAddress?.addressId}
            onChange={(e) => {
              setSelectedBillingAddress(
                userAddresses?.find(
                  (value) => value.addressId == parseInt(e.target.value)
                )?.address
              );
            }}
          >
            {userAddresses?.map((userAddress) => (
              <option key={userAddress.addressId} value={userAddress.addressId}>
                {userAddress.address?.firstName + " "}
                {/* {userAddress.address?.lastName + " - "}
                {userAddress.address?.phoneNumber + " - "} */}
                {userAddress.address?.line1 + ". "}
                {/* {userAddress.address?.city?.name} */}
              </option>
            ))}
          </Select>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}></Stack>
      <Center>
        <Wrap spacing={10} maxW={"3xl"}>
          {showShippingAddresses()}
          {showBillingAddresses()}
        </Wrap>
      </Center>
      <Center>
        <Wrap mt={6} spacing={4} maxW={"6xl"}>
          <WrapItem>{showCartItems()}</WrapItem>
          <WrapItem>{showCartSummary()}</WrapItem>
        </Wrap>
      </Center>
    </Box>
  );
};

export default Checkout;
