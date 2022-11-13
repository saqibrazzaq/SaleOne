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
import { StateApi } from "../../api/stateApi";
import ErrorDetails from "../../dtos/ErrorDetails";
import { StateResWithCountryAndCitiesCount } from "../../dtos/State";

const StateDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [state, setState] = useState<StateResWithCountryAndCitiesCount>();
  const [error, setError] = useState<ErrorDetails>();
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const countryId = params.countryId;
  const stateId = params.stateId;
  
  const deleteState = () => {
    onClose();
    StateApi.delete(stateId).then(res => {
      toast({
        title: "Success",
        description: state?.name + " deleted successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/states/" + countryId);
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const showStateInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{state?.code + " - " + state?.name}</Td>
            </Tr>
            <Tr>
              <Th>Country</Th>
              <Td>{state?.countryName}</Td>
            </Tr>
            <Tr>
              <Th>Cities</Th>
              <Td>{state?.citiesCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS STATE</Button>
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
            Delete State
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteState} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete State</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadState();
  }, []);

  const loadState = () => {
    StateApi.getStateWithCountryAndCitiesCount(stateId).then(res => {
      setState(res);
    })
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete State</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/states/" + countryId}>
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
          Are you sure you want to delete the following State?
        </Text>
        {error && <ErrorAlert description={error.Message} />}
        {showStateInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default StateDelete