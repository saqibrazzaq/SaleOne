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

const CountryEdit = () => {
  const params = useParams();
  const countryId = params.countryId;
  const updateText = countryId ? "Update Country" : "Add Country";
  const [countryDto, setCountryDto] = useState<CountryReqEdit>(new CountryReqEdit());
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadCountry();
  }, [countryId]);

  const loadCountry = () => {
    if (countryId) {
      CountryApi.get(countryId).then(res => {
        setCountryDto(res);
        // console.log(res);
      })
    }
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(255),
    code: Yup.string().required("Code is required").max(50),
  });

  const submitForm = (values: CountryReqEdit) => {
    // console.log(values);
    if (countryId) {
      updateCountry(values);
    } else {
      createCountry(values);
    }
  };

  const updateCountry = (values: CountryReqEdit) => {
    CountryApi.update(countryId, values).then(res => {
      toast({
        title: "Success",
        description: "Country updated successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/countries")
    });
  };

  const createCountry = (values: CountryReqEdit) => {
    CountryApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Country created successfully.",
        status: "success",
        position: "top-right",
      });
      // navigate("/countries/edit/" + res.countryId)
      navigate("/admin/countries")
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={countryDto}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.code && touched.code}>
                <FormLabel htmlFor="code">Code</FormLabel>
                <Field as={Input} id="code" name="code" type="text" />
                <FormErrorMessage>{errors.code}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
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
          to={"/admin/countries"}
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
        {showUpdateForm()}
      </Stack>
    </Box>
  );
}

export default CountryEdit