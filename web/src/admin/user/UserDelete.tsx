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
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { ErrorAlert } from "../../alertboxes/Alerts";
import { CountryApi } from "../../api/countryApi";
import { UserApi } from "../../api/userApi";
import { CountryResWithStatesCount } from "../../dtos/Country";
import ErrorDetails from "../../dtos/ErrorDetails";
import { UserRes } from "../../dtos/User";

const UserDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const [error, setError] = useState<ErrorDetails>();

  const [user, setUser] = useState<UserRes>();
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const email = params.email;
  
  const deleteUser = () => {
    onClose();
    UserApi.delete(email).then(res => {
      toast({
        title: "Success",
        description: user?.email + " deleted successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/users");
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const showUserInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Username</Th>
              <Td>{user?.userName}</Td>
            </Tr>
            <Tr>
              <Th>Email</Th>
              <Td>{user?.email}</Td>
            </Tr>
            <Tr>
              <Th>Roles</Th>
              <Td>{user?.roles?.map(role => (
                role + ", "
              ))}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS USER</Button>
        </Link>
      </HStack>
    </div>
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
            Delete User
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteUser} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete User</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    if (email) {
      UserApi.get(email).then(res => {
        setUser(res);
        // console.log(res);
      })
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete User</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/users"}>
          <Button type="button" colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        <Text fontSize="xl">
          Are you sure you want to delete the following User?
        </Text>
        {error && <ErrorAlert description={error.Message} />}
        {showUserInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default UserDelete