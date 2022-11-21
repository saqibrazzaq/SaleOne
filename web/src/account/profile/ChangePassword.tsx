import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Stack } from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { UserApi } from '../../api/userApi';
import ErrorDetails from '../../dtos/ErrorDetails';
import { ChangePasswordRequestDto } from '../../dtos/User';
import * as Yup from "yup";
import YupPassword from "yup-password";
import { ErrorAlert, SuccessAlert } from '../../alertboxes/Alerts';
import { AuthenticationResponseDto } from '../../dtos/Auth';
import TokenService from '../../api/token.service';

YupPassword(Yup); // extend yup

const ChangePassword = () => {
  const [error, setError] = useState<ErrorDetails>();
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    let userData:AuthenticationResponseDto = TokenService.getUser();
    setEmail(userData.email || "");
    // console.log(TokenService.getUser())
  }

  let pwdData = new ChangePasswordRequestDto();
  pwdData.email = email;

  // Formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    currentPassword: Yup.string()
      .required("Current Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
    newPassword: Yup.string()
      .required("New Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
    confirmNewPassword: Yup.string()
      .required("Confirm New Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
  });

  const submitForm = (values: ChangePasswordRequestDto) => {
    setError(undefined);
    setSuccess("");
    UserApi.changePassword(values)
      .then((res) => {
        console.log("Password changed successfully.");
        setSuccess("Your password has been changed successfully");
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

  const showPasswordForm = () => (
    <Box
      p={4}
    >
      <Formik
        initialValues={pwdData}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Field disabled={true} as={Input} id="email" name="email" type="email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.currentPassword && touched.currentPassword}
              >
                <FormLabel htmlFor="currentPassword">
                  Current Password
                </FormLabel>
                <Field
                  as={Input}
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                />
                <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.newPassword && touched.newPassword}
              >
                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                <Field
                  as={Input}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                />
                <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!errors.confirmNewPassword && touched.confirmNewPassword
                }
              >
                <FormLabel htmlFor="confirmNewPassword">
                  Confirm New Password
                </FormLabel>
                <Field
                  as={Input}
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                />
                <FormErrorMessage>{errors.confirmNewPassword}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Button type='submit' colorScheme={"blue"}>Change Password</Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  )

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Change Password</Heading>
      </Box>
      <Spacer />
      <Box>
        
      </Box>
    </Flex>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {error && <ErrorAlert description={error.Message} />}
        {success && <SuccessAlert description={success} />}
        {showPasswordForm()}
      </Stack>
    </Box>
  );
}

export default ChangePassword