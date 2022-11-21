import React, { useEffect, useState } from "react";
import { CountryReqSearch, CountryResWithStatesCount } from "../../dtos/Country";
import { CountryApi } from "../../api/countryApi";
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
import { UserReqSearch, UserRes } from "../../dtos/User";
import { UserApi } from "../../api/userApi";
import { RoleRes } from "../../dtos/Role";
import { RoleApi } from "../../api/roleApi";

const RolesList = () => {
  const [roles, setRoles] = useState<RoleRes[]>();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = () => {
    RoleApi.getAll().then((res) => {
      setRoles(res);
      // console.log(res);
    });
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Roles</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/roles/edit"}>
          <Button colorScheme={"blue"}>Add Role</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showRoles = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {roles?.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/roles/edit/" + item.id}
                >
                  <UpdateIconButton />
                </Link>
                <Link as={RouteLink} to={"/admin/roles/delete/" + item.id}>
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

export default RolesList