import React, { useEffect, useState } from "react";
import {
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
} from "@chakra-ui/react";
import { Link as RouteLink, useParams } from "react-router-dom";
import { CartRes } from "../dtos/Cart";
import { CartApi } from "../api/cartApi";
import UpdateIconButton from "../components/UpdateIconButton";
import DeleteIconButton from "../components/DeleteIconButton";

const Cart = () => {
  const [cart, setCart] = useState<CartRes>();
  
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    CartApi.get().then((res) => {
      setCart(res);
      console.log(res);
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
              <Td>{item.rate}</Td>
              <Td>{item.basePrice}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/roles/edit/" + item.cartItemId}
                >
                  <UpdateIconButton />
                </Link>
                <Link as={RouteLink} to={"/admin/roles/delete/" + item.cartItemId}>
                  <DeleteIconButton />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );

  
  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {showHeading()}
        {showRoles()}
      </Stack>
    </Box>
  );
}

export default Cart