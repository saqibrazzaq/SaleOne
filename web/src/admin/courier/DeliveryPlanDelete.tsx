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
import { DeliveryPlanRes } from "../../dtos/DeliveryPlan";
import ErrorDetails from "../../dtos/ErrorDetails";

const DeliveryPlanDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const [error, setError] = useState<ErrorDetails>();

  const [deliveryPlan, setDeliveryPlan] = useState<DeliveryPlanRes>();
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const courierId = params.courierId;
  const deliveryPlanId = params.deliveryPlanId;
  
  const deleteDeliveryPlan = () => {
    onClose();
    CourierApi.deleteDeliveryPlan(deliveryPlanId).then(res => {
      toast({
        title: "Success",
        description: deliveryPlan?.name + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/admin/couriers/deliveryplans/" + courierId);
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const showDeliveryPlanInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{deliveryPlan?.name}, {deliveryPlan?.courier?.name}</Td>
            </Tr>
            <Tr>
              <Th>Description</Th>
              <Td>{deliveryPlan?.description}</Td>
            </Tr>
            <Tr>
              <Th>Fee</Th>
              <Td>{deliveryPlan?.fee}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS DELIVERY PLAN</Button>
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
            Delete Delivery Plan
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteDeliveryPlan} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Delivery Plan</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadDeliveryPlan();
  }, []);

  const loadDeliveryPlan = () => {
    if (deliveryPlanId) {
      CourierApi.getDeliveryPlan(deliveryPlanId).then(res => {
        setDeliveryPlan(res);
        // console.log(res);
      })
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Delivery Plan</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/couriers/deliveryplans/" + courierId}>
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
          Are you sure you want to delete the following Delivery Plan?
        </Text>
        {error && <ErrorAlert description={error.Message} />}
        {showDeliveryPlanInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default DeliveryPlanDelete