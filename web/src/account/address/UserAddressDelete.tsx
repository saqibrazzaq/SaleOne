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
import { UserAddressApi } from "../../api/userAddressApi";
import { UserAddressRes } from "../../dtos/UserAddress";
import ErrorDetails from "../../dtos/ErrorDetails";

const UserAddressDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const [error, setError] = useState<ErrorDetails>();

  const [userAddress, setUserAddress] = useState<UserAddressRes>();
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const userAddressId = params.userAddressId;
  
  const deleteUserAddress = () => {
    onClose();
    UserAddressApi.delete(userAddressId).then(res => {
      toast({
        title: "Success",
        description: "Address deleted successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/account/addresses/");
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const showAddressesInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>
                {userAddress?.address?.firstName + " " + userAddress?.address?.lastName} <br />
                {userAddress?.address?.phoneNumber}
              </Td>
            </Tr>
            <Tr>
              <Th>Address</Th>
              <Td>
                {userAddress?.address?.line1}<br />
                {userAddress?.address?.line2}
                {userAddress?.address?.line2 ? <br /> : ''}
                {userAddress?.address?.city?.name + ", " + userAddress?.address?.city?.state?.name + ", " +
                userAddress?.address?.city?.state?.country?.name}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS ADDRESS</Button>
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
            Delete Address
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteUserAddress} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Address</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = () => {
    UserAddressApi.get(userAddressId).then(res => {
      setUserAddress(res);
    })
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Address</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/account/addresses/"}>
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
          Are you sure you want to delete the following Address?
        </Text>
        {error && <ErrorAlert description={error.Message} />}
        {showAddressesInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default UserAddressDelete