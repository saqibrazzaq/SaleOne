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
import { OrderApi } from "../../api/orderApi";
import { PaymentMethodApi } from "../../api/paymentMethodApi";
import { CountryResWithStatesCount } from "../../dtos/Country";
import ErrorDetails from "../../dtos/ErrorDetails";
import { PaymentMethodRes } from "../../dtos/PaymentMethod";

const PaymentMethodDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const [error, setError] = useState<ErrorDetails>();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodRes>();
  const [ordersCount, setOrdersCount] = useState(0);
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const paymentMethodId = params.paymentMethodId;
  
  const deletePaymentMethod = () => {
    onClose();
    PaymentMethodApi.delete(paymentMethodId).then(res => {
      toast({
        title: "Success",
        description: paymentMethod?.name + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/admin/payment-methods");
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const showPaymentMethodInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{paymentMethod?.name}</Td>
            </Tr>
            <Tr>
              <Th>Description</Th>
              <Td>{paymentMethod?.description}</Td>
            </Tr>
            <Tr>
              <Th>Order Count</Th>
              <Td>{ordersCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS PAYMENT METHOD</Button>
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
            Delete Payment Method
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deletePaymentMethod} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Payment Method</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadPaymentMethod();
    loadOrdersCount();
  }, [paymentMethodId]);

  const loadOrdersCount = () => {
    OrderApi.countByPaymentMethod(paymentMethodId).then(res => {
      setOrdersCount(res);
    })
  }

  const loadPaymentMethod = () => {
    if (paymentMethodId) {
      PaymentMethodApi.get(paymentMethodId).then(res => {
        setPaymentMethod(res);
        // console.log(res);
      })
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Payment Method</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/payment-methods"}>
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
          Are you sure you want to delete the following Payment Method?
        </Text>
        {error && <ErrorAlert description={error.Message} />}
        {showPaymentMethodInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default PaymentMethodDelete