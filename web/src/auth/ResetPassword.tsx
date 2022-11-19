import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { ErrorAlert, SuccessAlert } from "../alertboxes/Alerts";
import { AuthApi } from "../api/authApi";
import { ResetPasswordDto } from "../dtos/Auth";
import ErrorDetails from "../dtos/ErrorDetails";
YupPassword(Yup); // extend yup

const ResetPassword = () => {
  const [error, setError] = useState<ErrorDetails>();
  const [success, setSuccess] = useState("");
  const toast = useToast();

  const data = new ResetPasswordDto(
    "",
    "saqibrazzaq@gmail.com",
    "Saqib123!",
    "Saqib123!"
  );

  const submitForm = (values: ResetPasswordDto) => {
    setSuccess("");
    setError(undefined);

    AuthApi.resetPassword(values)
      .then((res) => {
        const successMessage = "Please use your new password to login.";
        setSuccess(successMessage);
        toast({
          title: "Password reset successfull",
          description: successMessage,
          status: "success",
          position: "top-right",
        });
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
    forgotPasswordToken: Yup.string().required("Token is required"),
  });

  const showForm = () => (
    <Formik
      initialValues={data}
      onSubmit={(values) => {
        submitForm(values);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl
              isInvalid={
                !!errors.forgotPasswordToken && touched.forgotPasswordToken
              }
            >
              <FormLabel htmlFor="forgotPasswordToken">
                Reset password token
              </FormLabel>
              <Field
                as={Textarea}
                id="forgotPasswordToken"
                name="forgotPasswordToken"
              />
              <FormErrorMessage>{errors.forgotPasswordToken}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Field as={Input} id="email" name="email" type="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field as={Input} id="password" name="password" type="password" />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.confirmPassword && touched.confirmPassword}
            >
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Field
                as={Input}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme={"blue"}>Reset Password</Button>
          </Stack>
        </form>
      )}
    </Formik>
  );

  return (
    <Box p={4} justifySelf="center">
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        <Heading fontSize={"2xl"}>Reset Password</Heading>
        <Text fontSize={"lg"}>
          Please check your email for the reset password token.
        </Text>
        {error && <ErrorAlert description={error.Message} />}
        {success && <SuccessAlert description={success} />}
        {showForm()}
      </Stack>
    </Box>
  );
}

export default ResetPassword