import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Select,
  Spacer,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useParams, Link as RouteLink, useNavigate } from "react-router-dom";
import { OrderApi } from "../../api/orderApi";
import { PaymentMethodApi } from "../../api/paymentMethodApi";
import { OrderReqUpdatePaymentMethod, OrderRes, OrderStatus } from "../../dtos/Order";
import { PaymentMethodRes } from "../../dtos/PaymentMethod";

const PaymentMethod = () => {
  let params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState<OrderRes>();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodRes[]>([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();
  // console.log("Order id: " + orderId);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = () => {
    OrderApi.get(orderId).then((res) => {
      setOrder(res);
      loadPaymentMethods();
    });
  };

  const loadPaymentMethods = () => {
    PaymentMethodApi.getAll().then((res) => {
      setPaymentMethods(res);
      setSelectedPaymentMethodId(
        order?.paymentMethodId || res[0].paymentMethodId
      );
    });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Payment Method</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/account/orders/"}>
          <Button type="button" colorScheme={"gray"}>
            My Orders
          </Button>
        </Link>
      </Box>
    </Flex>
  );

  const displayOrderSummary = () => (
    <VStack align={"left"}>
      <Text>Order # {order?.orderId}</Text>
      <Text>Status: {OrderStatus[order?.status || 0]}</Text>
      <Text fontSize={"lg"}>
        Subtotal:{" "}
        <NumericFormat
          value={order?.baseSubTotal}
          prefix="Rs. "
          thousandSeparator=","
          displayType="text"
        />
      </Text>
    </VStack>
  );

  const displayPaymentMethods = () => (
    <Stack spacing={4} as={Container} maxW={"sm"}>
      <FormControl>
        <FormLabel>Pay by</FormLabel>
        <Select
          value={selectedPaymentMethodId}
          onChange={(e) => {
            setSelectedPaymentMethodId(parseInt(e.target.value));
          }}
        >
          {paymentMethods.map((value) => (
            <option key={value.paymentMethodId} value={value.paymentMethodId}>
              {value.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Stack direction={"row"} spacing={6}>
        <Button onClick={updatePaymentMethod} colorScheme={"blue"}>Save Changes</Button>
      </Stack>
    </Stack>
  );

  const updatePaymentMethod = () => {
    OrderApi.updatePaymentMethod(orderId, new OrderReqUpdatePaymentMethod(selectedPaymentMethodId)).then(res => {
      navigate("/account/orders/" + orderId);
      toast({
        title: "Success",
        description: "Order updated successfully.",
        status: "success",
        position: "bottom-right",
      });
    })
  }

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"6xl"}>
        {displayHeading()}
        {displayOrderSummary()}
        {displayPaymentMethods()}
      </Stack>
    </Box>
  );
};

export default PaymentMethod;
