import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { VerifyEmailDto } from '../../dtos/User';
import * as Yup from "yup";
import { UserApi } from '../../api/userApi';
import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, PinInput, PinInputField, Spacer, Stack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { ErrorAlert, SuccessAlert } from '../../alertboxes/Alerts';
import ErrorDetails from '../../dtos/ErrorDetails';

const EmailPin = () => {
  const [verifyEmailError, setVerifyEmailError] = useState<ErrorDetails>();
  const [verifyEmailSuccess, setVerifyEmailSuccess] = useState("");
  const [pinCodeValue, setPinCodeValue] = useState("");

  let data = new VerifyEmailDto("");

  const navigate = useNavigate();

  // Formik validation schema
  const validationSchema = Yup.object({
    // pinCode: Yup.number()
    //   .required("Pin code is required")
    //   .min(1000, "4 digit pin code required")
    //   .max(9999, "4 digit pin code required"),
  });

  const submitForm = (values: VerifyEmailDto) => {
    verifyEmail(values);
  };

  const verifyEmail = (values: VerifyEmailDto) => {
    setVerifyEmailError(undefined);
    setVerifyEmailSuccess("");
    data.pinCode = pinCodeValue;
    console.log(data);
    UserApi.verifyEmail(data)
      .then((res) => {
        // console.log("Email verified successfully.");
        setVerifyEmailSuccess("Email verfied successfully.");
        navigate("/account/status/email");
      })
      .catch((error) => {
        setVerifyEmailError(error.response.data);
      });
  };

  const showPinCodeForm = () => (
    <Box p={0}>
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={9} as={Container} maxW={"3xl"}>
              {verifyEmailError && <ErrorAlert description={verifyEmailError.Message} />}
              {verifyEmailSuccess && <SuccessAlert description={verifyEmailSuccess} />}
              <FormControl isInvalid={!!errors.pinCode && touched.pinCode}>
                <FormLabel htmlFor="pinCode">
                  Email sent, Enter Pin Code
                </FormLabel>
                <HStack>
                  <PinInput onChange={(e) => setPinCodeValue(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <FormErrorMessage>{errors.pinCode}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Button type="submit" colorScheme="blue">
                  Verify Pin Code
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Pin Code for Email Verification</Heading>
      </Box>
      <Spacer />
      <Box></Box>
    </Flex>
  );

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {verifyEmailError && <ErrorAlert description={verifyEmailError.Message} />}
        {verifyEmailSuccess && <SuccessAlert description={verifyEmailSuccess} />}
        {showHeading()}
        {showPinCodeForm()}
      </Stack>
    </Box>
  )
}

export default EmailPin