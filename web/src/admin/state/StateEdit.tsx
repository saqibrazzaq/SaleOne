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
import { StateReqEdit } from "../../dtos/State";
import { StateApi } from "../../api/stateApi";
import CountrySearchBox from "../../searchboxes/CountrySearchBox";
import { CountryRes } from "../../dtos/Country";
import { CountryApi } from "../../api/countryApi";

const StateEdit = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryRes>();
  const params = useParams();
  const countryId = Number.parseInt(params.countryId || "0");
  const stateId = Number.parseInt(params.stateId || "0");
  const updateText = stateId ? "Update State" : "Add State";
  const [stateDto, setStateDto] = useState<StateReqEdit>(new StateReqEdit(countryId));
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadState();
  }, [stateId]);

  useEffect(() => {
    loadCountry(stateDto.countryId);
  }, [stateDto.countryId]);

  useEffect(() => {
    loadCountry(countryId);
  }, [countryId]);

  const loadCountry = (cid?:number) => {
    // console.log("load country " + cid)
    CountryApi.get(cid).then((res) => {
      setSelectedCountry(res);
    });
  };

  const loadState = () => {
    if (stateId) {
      StateApi.get(stateId).then((res) => {
        setStateDto(res);
        // console.log(res);
      });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(255),
    code: Yup.string().required("Code is required").max(50),
    countryId: Yup.number().required().min(1, "Please select country"),
  });

  const submitForm = (values: StateReqEdit) => {
    // console.log(values);
    if (stateId) {
      updateState(values);
    } else {
      createState(values);
    }
  };

  const updateState = (values: StateReqEdit) => {
    StateApi.update(stateId, values).then((res) => {
      toast({
        title: "Success",
        description: "State updated successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/states/" + countryId);
    });
  };

  const createState = (values: StateReqEdit) => {
    StateApi.create(values).then((res) => {
      toast({
        title: "Success",
        description: "State created successfully.",
        status: "success",
        position: "top-right",
      });
      // navigate("/states/edit/" + res.stateId)
      navigate("/admin/states/" + countryId);
    });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={stateDto}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.countryId && touched.countryId}>
                <FormLabel htmlFor="countryId">Country Id</FormLabel>
                <Field as={Input} id="countryId" name="countryId" type="hidden" />
                <CountrySearchBox
                  selectedCountry={selectedCountry}
                  handleChange={(newValue?: CountryRes) => {
                    setSelectedCountry(newValue);
                    setFieldValue("countryId", newValue?.countryId);
                  }}
                />
                <FormErrorMessage>{errors.countryId}</FormErrorMessage>
              </FormControl>

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
                <Button type="submit" colorScheme={"blue"}>
                  {updateText}
                </Button>
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
        <Link ml={2} as={RouteLink} to={"/admin/states/" + countryId}>
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
};

export default StateEdit;
