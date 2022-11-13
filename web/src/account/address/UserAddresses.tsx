import React, { useEffect, useState } from "react";
import { UserAddressApi } from "../../api/userAddressApi";
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
import UpdateIconButton from "../../components/UpdateIconButton";
import DeleteIconButton from "../../components/DeleteIconButton";
import PagedRes from "../../dtos/PagedRes";
import { UserAddressRes } from "../../dtos/UserAddress";

const UserAddresses = () => {
  const [addresses, setAddresses] = useState<UserAddressRes[]>();
  
  useEffect(() => {
    getAllUserAddresses();
  }, []);

  const getAllUserAddresses = () => {
    UserAddressApi.getAll().then((res) => {
      setAddresses(res);
      //  console.log(res);
    });
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>User Addresses</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/account/addresses/edit"}>
          <Button colorScheme={"blue"}>Add Address</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showAddresses = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>City</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {addresses?.map((item) => (
            <Tr key={item.userAddressId}>
              <Td>
                {item.address?.firstName + " " + item.address?.lastName} <br />
                {item.address?.phoneNumber}
              </Td>
              <Td>
                {item.address?.line1}<br />
                {item.address?.line2}
                {item.address?.line2 ? <br /> : ''}
                {item.address?.city?.name + ", " + item.address?.city?.state?.name + ", " +
                item.address?.city?.state?.country?.name}
              </Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/account/addresses/edit/" + item.userAddressId}
                >
                  <UpdateIconButton />
                </Link>
                <Link as={RouteLink} to={"/account/addresses/delete/" + item.userAddressId}>
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
        {showAddresses()}
      </Stack>
    </Box>
  );
}

export default UserAddresses