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
import { CourierReqEdit } from "../../dtos/Courier";
import { CourierApi } from "../../api/courierApi";

const CourierEdit = () => {
  const params = useParams();
  const courierId = params.courierId;
  const updateText = courierId ? "Update Courier" : "Add Courier";
  const [courier, setCourier] = useState<CourierReqEdit>(new CourierReqEdit());
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadCourier();
  }, [courierId]);

  const loadCourier = () => {
    if (courierId) {
      CourierApi.get(courierId).then(res => {
        setCourier(res);
        // console.log(res);
      })
    }
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(50),
    description: Yup.string(),
  });

  const submitForm = (values: CourierReqEdit) => {
    // console.log(values);
    if (courierId) {
      updateCourier(values);
    } else {
      createCourier(values);
    }
  };

  const updateCourier = (values: CourierReqEdit) => {
    CourierApi.update(courierId, values).then(res => {
      toast({
        title: "Success",
        description: "Courier updated successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/admin/couriers")
    });
  };

  const createCourier = (values: CourierReqEdit) => {
    CourierApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Courier created successfully.",
        status: "success",
        position: "bottom-right",
      });
      // navigate("/countries/edit/" + res.countryId)
      navigate("/admin/couriers")
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={courier}
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
          to={"/admin/couriers"}
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

export default CourierEdit