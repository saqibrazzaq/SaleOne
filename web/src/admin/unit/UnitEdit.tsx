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
import { UnitReqEdit } from "../../dtos/Unit";
import { UnitApi } from "../../api/unitApi";

const UnitEdit = () => {
  const params = useParams();
  const unitId = params.unitId;
  const updateText = unitId ? "Update Unit" : "Add Unit";
  const [unitDto, setUnitDto] = useState<UnitReqEdit>(new UnitReqEdit());
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadUnit();
  }, [unitId]);

  const loadUnit = () => {
    if (unitId) {
      UnitApi.get(unitId).then(res => {
        setUnitDto(res);
        // console.log(res);
      })
    }
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(50),
  });

  const submitForm = (values: UnitReqEdit) => {
    // console.log(values);
    if (unitId) {
      updateUnit(values);
    } else {
      createUnit(values);
    }
  };

  const updateUnit = (values: UnitReqEdit) => {
    UnitApi.update(unitId, values).then(res => {
      toast({
        title: "Success",
        description: "Unit updated successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/units")
    });
  };

  const createUnit = (values: UnitReqEdit) => {
    UnitApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Unit created successfully.",
        status: "success",
        position: "top-right",
      });
      // navigate("/countries/edit/" + res.countryId)
      navigate("/admin/units")
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={unitDto}
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
          to={"/admin/units"}
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

export default UnitEdit