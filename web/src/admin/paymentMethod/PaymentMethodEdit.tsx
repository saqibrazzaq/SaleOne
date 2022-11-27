import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import { CountryReqEdit } from "../../dtos/Country";
import { CountryApi } from "../../api/countryApi";
import { PaymentMethodReqEdit } from "../../dtos/PaymentMethod";
import { PaymentMethodApi } from "../../api/paymentMethodApi";
import { ErrorAlert } from "../../alertboxes/Alerts";
import ErrorDetails from "../../dtos/ErrorDetails";

const PaymentMethodEdit = () => {
  const params = useParams();
  const paymentMethodId = params.paymentMethodId;
  const updateText = paymentMethodId ? "Update Payment Method" : "Add Payment Method";
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodReqEdit>(new PaymentMethodReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorDetails>();

  useEffect(() => {
    loadPaymentMethod();
  }, [paymentMethodId]);

  const loadPaymentMethod = () => {
    if (paymentMethodId) {
      PaymentMethodApi.get(paymentMethodId).then(res => {
        setPaymentMethod(res);
        // console.log(res);
      }).catch(error => {
        setError(error.response.data);
      });
    }
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(50),
    description: Yup.string(),
  });

  const submitForm = (values: PaymentMethodReqEdit) => {
    // console.log(values);
    if (paymentMethodId) {
      updatePaymentMethod(values);
    } else {
      createPaymentMethod(values);
    }
  };

  const updatePaymentMethod = (values: PaymentMethodReqEdit) => {
    PaymentMethodApi.update(paymentMethodId, values).then(res => {
      toast({
        title: "Success",
        description: "Payment Method updated successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/admin/payment-methods")
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const createPaymentMethod = (values: PaymentMethodReqEdit) => {
    PaymentMethodApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Payment Method created successfully.",
        status: "success",
        position: "bottom-right",
      });
      // navigate("/countries/edit/" + res.countryId)
      navigate("/admin/payment-methods")
    }).catch(error => {
      setError(error.response.data);
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={paymentMethod}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description && touched.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Field as={Input} id="description" name="description" type="text" />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>
              <Stack direction={"row"} spacing={6}>
                <Button type="submit" colorScheme={"blue"}>{updateText}</Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>{updateText}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          ml={2}
          as={RouteLink}
          to={"/admin/payment-methods"}
        >
          <Button colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {error && <ErrorAlert description={error.Message} />}
        {showUpdateForm()}
      </Stack>
    </Box>
  );
}

export default PaymentMethodEdit