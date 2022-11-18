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
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordDto } from "../dtos/Auth";
import ErrorDetails from "../dtos/ErrorDetails";
import { AuthApi } from "../api/authApi";
import { ErrorAlert, SuccessAlert } from "../alertboxes/Alerts";

const ForgotPassword = () => {
  let data = new ForgotPasswordDto("saqibrazzaq@gmail.com");
  const [error, setError] = useState<ErrorDetails>();
  const [success, setSuccess] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  const submitForm = (values: ForgotPasswordDto) => {
    setError(undefined);
    setSuccess("");
    AuthApi.sendForgotPasswordEmail(values)
      .then((res) => {
        setSuccess("Please check email for password reset token.");
        toast({
          title: "Email sent",
          description: "Please check email to reset your password.",
          status: "success",
          position: "top-right",
        });
        navigate("/auth/reset-password");
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

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
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Field as={Input} id="email" name="email" type="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme={"blue"}>Request Password Reset</Button>
          </Stack>
        </form>
      )}
    </Formik>
  );

  return (
    <Box p={4} justifySelf="center">
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        <Heading fontSize={"2xl"}>Forgot Password</Heading>
        <Text fontSize={"lg"}>You will get an email with pin code.</Text>
        {error && <ErrorAlert description={error.Message} />}
        {success && <SuccessAlert description={success} />}
        {showForm()}
      </Stack>
    </Box>
  );
}

export default ForgotPassword