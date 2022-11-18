import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { ErrorAlert, SuccessAlert } from "../alertboxes/Alerts";
import { AuthApi } from "../api/authApi";
import { AuthenticationResponseDto, RegisterUserDto, UserLoginDto } from "../dtos/Auth";
import ErrorDetails from "../dtos/ErrorDetails";

YupPassword(Yup); // extend yup

const Register = () => {
  const [error, setError] = useState<ErrorDetails>();
  const [success, setSuccess] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const data = new RegisterUserDto(
    "saqibrazzaq",
    "saqibrazzaq@gmail.com",
    "Saqib123!",
    "Saqib123!"
  );
  // const data = new RegisterUserDto();

  const submitForm = (values: RegisterUserDto) => {
    setError(undefined);
    setSuccess("");
    AuthApi.register(values)
      .then((res) => {
        setSuccess("Please check email and verify your account.");
        loginUser(new UserLoginDto(values?.email, values?.password));
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

  const loginUser = (values: UserLoginDto) => {
    AuthApi.login(values)
      .then((res) => {
        let authRes: AuthenticationResponseDto = res.data;
        // console.log(authRes);
        //navigate("/");
        window.location.href = "/";
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    username: Yup.string()
      .required("Username is required.")
      .max(50, "Maximum 50 characters."),
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
            <FormControl isInvalid={!!errors.username && touched.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Field as={Input} id="username" name="username" type="text" />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
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
            <Button type="submit" colorScheme={"blue"}>Create Account</Button>
          </Stack>
        </form>
      )}
    </Formik>
  );

  return (
    <Stack minH={"50vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align="center" justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Create New Account</Heading>
          {error && <ErrorAlert description={error.Message} />}
          {success && <SuccessAlert description={success} />}
          {showForm()}
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Register Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}

export default Register