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
  Container,
  Flex,
  Heading,
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
} from "@chakra-ui/react";
import { Link as RouteLink, useParams } from "react-router-dom";
import { CartRes } from "../dtos/Cart";
import { CartApi } from "../api/cartApi";
import UpdateIconButton from "../components/UpdateIconButton";
import RemoveIconButton from "../components/RemoveIconButton";
import ErrorDetails from "../dtos/ErrorDetails";
import { ProductRes } from "../dtos/Product";
import { CartItemRes } from "../dtos/CartItem";
import { NumericFormat } from "react-number-format";

const Cart = () => {
  const [cart, setCart] = useState<CartRes>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const toast = useToast();
  const [error, setError] = useState<ErrorDetails>();
  const [cartItemToRemove, setCartItemToRemove] = useState<CartItemRes>();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    CartApi.get().then((res) => {
      setCart(res);
      console.log(res);
    });
  };

  const removeFromCart = () => {
    onClose();
    CartApi.removeFromCart(cartItemToRemove?.productId)
      .then((res) => {
        toast({
          title: "Success",
          description: cartItemToRemove?.product?.name + " removed from cart.",
          status: "success",
          position: "top-right",
        });
        //navigate("/admin/countries");
        loadCart();
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Cart</Heading>
      </Box>
      <Spacer />
    </Flex>
  );

  const showRoles = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Unit Price</Th>
            <Th>Price</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart?.cartItems?.map((item) => (
            <Tr key={item.cartItemId}>
              <Td>{item.product?.name}</Td>
              <Td>{item.quantity}</Td>
              <Td><NumericFormat
                          value={item?.rate}
                          prefix="Rs. "
                          thousandSeparator=","
                          displayType="text"
                        /></Td>
              <Td><NumericFormat
                          value={item?.basePrice}
                          prefix="Rs. "
                          thousandSeparator=","
                          displayType="text"
                        /></Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/roles/edit/" + item.cartItemId}
                >
                  <UpdateIconButton />
                </Link>
                <Link
                  onClick={() => {
                    onOpen();
                    setCartItemToRemove(item);
                  }}
                >
                  <RemoveIconButton />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const showAlertDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Remove item from cart
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Th>Product</Th>
                    <Td>{cartItemToRemove?.product?.name}</Td>
                  </Tr>
                  <Tr>
                    <Th>Unit Price</Th>
                    <Td>
                      {
                        <NumericFormat
                          value={cartItemToRemove?.rate}
                          prefix="Rs. "
                          thousandSeparator=","
                          displayType="text"
                        />
                      }
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Quantity</Th>
                    <Td>{cartItemToRemove?.quantity}</Td>
                  </Tr>
                  <Tr>
                    <Th>Total Price</Th>
                    <Td>
                      <NumericFormat
                        value={cartItemToRemove?.basePrice}
                        prefix="Rs. "
                        thousandSeparator=","
                        displayType="text"
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>
                Cancel
              </Button>
            </Link>
            <Link onClick={removeFromCart} ml={3}>
              <Button type="submit" colorScheme={"red"}>
                Remove item from cart
              </Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {showHeading()}
        {showRoles()}
      </Stack>
      {showAlertDialog()}
    </Box>
  );
};

export default Cart;
