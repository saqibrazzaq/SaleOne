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
import { PaymentMethodRes } from "../../dtos/PaymentMethod";
import { PaymentMethodApi } from "../../api/paymentMethodApi";
import UpdateIconButton from "../../components/UpdateIconButton";
import DeleteIconButton from "../../components/DeleteIconButton";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodRes[]>();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = () => {
    PaymentMethodApi.getAll().then((res) => {
      setPaymentMethods(res);
      // console.log(res);
    });
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Payment Methods</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/payment-methods/edit"}>
          <Button colorScheme={"blue"}>Add Payment Method</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showRoles = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {paymentMethods?.map((item) => (
            <Tr key={item.paymentMethodId}>
              <Td>{item.name}</Td>
              <Td>{item.description}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/payment-methods/edit/" + item.paymentMethodId}
                >
                  <UpdateIconButton />
                </Link>
                <Link as={RouteLink} to={"/admin/payment-methods/delete/" + item.paymentMethodId}>
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

export default PaymentMethods