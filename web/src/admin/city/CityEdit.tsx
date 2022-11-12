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
import { StateReqEdit, StateRes } from "../../dtos/State";
import { StateApi } from "../../api/stateApi";
import CountrySearchBox from "../../searchboxes/CountrySearchBox";
import { CityApi } from "../../api/cityApi";
import { CityReqEdit } from "../../dtos/City";
import StateSearchBox from "../../searchboxes/StateSearchBox";

const CityEdit = () => {
  const [selectedState, setSelectedState] = useState<StateRes>();
  const params = useParams();
  const stateId = Number.parseInt(params.stateId || "0");
  const cityId = Number.parseInt(params.cityId || "0");
  const updateText = cityId ? "Update City" : "Add City";
  const [cityDto, setCityDto] = useState<CityReqEdit>(new CityReqEdit(stateId));
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadCityForEdit();
  }, [cityId]);

  useEffect(() => {
    loadStateForDropdown(cityDto.stateId);
  }, [cityDto.stateId]);

  useEffect(() => {
    loadStateForDropdown(stateId);
  }, [stateId]);

  const loadStateForDropdown = (id?:number) => {
    StateApi.get(id).then((res) => {
      setSelectedState(res);
    });
  };

  const loadCityForEdit = () => {
    if (cityId) {
      CityApi.get(cityId).then((res) => {
        setCityDto(res);
        // console.log(res);
      });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(255),
    stateId: Yup.number().required("State Id is required").min(1, "Please select a state"),
  });

  const submitForm = (values: CityReqEdit) => {
    // console.log(values);
    if (cityId) {
      updateCity(values);
    } else {
      createCity(values);
    }
  };

  const updateCity = (values: CityReqEdit) => {
    CityApi.update(cityId, values).then((res) => {
      toast({
        title: "Success",
        description: "City updated successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/cities/" + stateId);
    });
  };

  const createCity = (values: CityReqEdit) => {
    CityApi.create(values).then((res) => {
      toast({
        title: "Success",
        description: "City created successfully.",
        status: "success",
        position: "top-right",
      });
      // navigate("/states/edit/" + res.stateId)
      navigate("/admin/cities/" + stateId);
    });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={cityDto}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.stateId && touched.stateId}>
                <FormLabel htmlFor="stateId">State Id</FormLabel>
                <Field as={Input} id="stateId" name="stateId" type="hidden" />
                <StateSearchBox
                  selectedState={selectedState}
                  handleChange={(newValue?: StateRes) => {
                    setSelectedState(newValue);
                    setFieldValue("stateId", newValue?.stateId)
                    // console.log(newValue)
                  }}
                />
                <FormErrorMessage>{errors.stateId}</FormErrorMessage>
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
        <Link ml={2} as={RouteLink} to={"/admin/cities/" + stateId}>
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

export default CityEdit