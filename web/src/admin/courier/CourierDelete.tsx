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
import { CourierApi } from "../../api/courierApi";
import { CourierRes } from "../../dtos/Courier";
import ErrorDetails from "../../dtos/ErrorDetails";

const CourierDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const [error, setError] = useState<ErrorDetails>();

  const [courier, setCourier] = useState<CourierRes>();
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const courierId = params.courierId;
  
  const deleteCourier = () => {
    onClose();
    CourierApi.delete(courierId).then(res => {
      toast({
        title: "Success",
        description: courier?.name + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/admin/couriers");
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const showCourierInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{courier?.name}</Td>
            </Tr>
            <Tr>
              <Th>Description</Th>
              <Td>{courier?.description}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS COURIER</Button>
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
            Delete Courier
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteCourier} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Courier</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadCourier();
  }, []);

  const loadCourier = () => {
    if (courierId) {
      CourierApi.get(courierId).then(res => {
        setCourier(res);
        // console.log(res);
      })
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Courier</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/couriers"}>
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
          Are you sure you want to delete the following Courier?
        </Text>
        {error && <ErrorAlert description={error.Message} />}
        {showCourierInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default CourierDelete