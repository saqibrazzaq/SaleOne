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
import { Field, Formik, getIn, yupToFormErrors } from "formik";
import { UserAddressApi } from "../../api/userAddressApi";
import { UserAddressReqEdit } from "../../dtos/UserAddress";
import CitySearchBox from "../../searchboxes/CitySearchBox";
import { CityRes } from "../../dtos/City";

const UserAddressEdit = () => {
  const params = useParams();
  const userAddressId = params.userAddressId;
  const updateText = userAddressId ? "Update Address" : "Add Address";
  const [userAddressDto, setUserAddressDto] = useState<UserAddressReqEdit>(new UserAddressReqEdit());
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadUserAddress();
  }, [userAddressId]);

  const loadUserAddress = () => {
    // console.log(userAddressDto);
    if (userAddressId) {
      UserAddressApi.get(userAddressId).then(res => {
        setUserAddressDto(res);
        // console.log(res);
      })
    }
  }

  const submitForm = (values: UserAddressReqEdit) => {
    // console.log(values);
    if (userAddressId) {
      updateUserAddress(values);
    } else {
      createUserAddress(values);
    }
  };

  const updateUserAddress = (values: UserAddressReqEdit) => {
    UserAddressApi.update(userAddressId, values).then(res => {
      toast({
        title: "Success",
        description: "Address updated successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/account/addresses")
    });
  };

  const createUserAddress = (values: UserAddressReqEdit) => {
    console.log(values)
    UserAddressApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Address created successfully.",
        status: "success",
        position: "top-right",
      });
      // navigate("/countries/edit/" + res.countryId)
      navigate("/account/addresses")
    });
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    isPrimary: Yup.boolean().required("Is Primary is required"),
    address: Yup.object({
      firstName: Yup.string().required('First Name is required').max(255),
      lastName: Yup.string().required('Last Name is required').max(255),
      phoneNumber: Yup.string().required('Phone Number is required').max(25),
      line1: Yup.string().required('Line 1 is required'),
      line2: Yup.string(),
      cityId: Yup.number().required().min(1)
      }),
  });

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={userAddressDto}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.isPrimary && touched.isPrimary}>
                <FormLabel htmlFor="isPrimary">Is Primary</FormLabel>
                <Field as={Input} id="isPrimary" name="isPrimary" type="text" />
                <FormErrorMessage>{errors.isPrimary}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!getIn(errors.address, "firstName") && getIn(touched.address, "firstName")}>
                <FormLabel htmlFor="address.firstName">First Name</FormLabel>
                <Field as={Input} id="address.firstName" name="address.firstName" type="text" />
                <FormErrorMessage>{getIn(errors.address, "firstName")}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!getIn(errors.address, "lastName") && getIn(touched.address, "lastName")}>
                <FormLabel htmlFor="address.lastName">Last Name</FormLabel>
                <Field as={Input} id="address.lastName" name="address.lastName" type="text" />
                <FormErrorMessage>{getIn(errors.address, "lastName")}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!getIn(errors.address, "phoneNumber") && getIn(touched.address, "phoneNumber")}>
                <FormLabel htmlFor="address.phoneNumber">Phone Number</FormLabel>
                <Field as={Input} id="address.phoneNumber" name="address.phoneNumber" type="text" />
                <FormErrorMessage>{getIn(errors.address, "phoneNumber")}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!getIn(errors.address, "line1") && getIn(touched.address, "line1")}>
                <FormLabel htmlFor="address.line1">Line 1</FormLabel>
                <Field as={Input} id="address.line1" name="address.line1" type="text" />
                <FormErrorMessage>{getIn(errors.address, "line1")}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!getIn(errors.address, "line2") && getIn(touched.address, "line2")}>
                <FormLabel htmlFor="address.line2">Line 2</FormLabel>
                <Field as={Input} id="address.line2" name="address.line2" type="text" />
                <FormErrorMessage>{getIn(errors.address, "line2")}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!getIn(errors.address, "cityId") && getIn(touched.address, "cityId")}>
                <FormLabel htmlFor="address.cityId">City Id</FormLabel>
                <Field as={Input} id="address.cityId" name="address.cityId" type="hidden" />
                <CitySearchBox
                  selectedCity={userAddressDto.address?.city}
                  handleChange={(newValue?: CityRes) => {
                    //setSelectedCity(newValue);
                    setFieldValue("address.cityId", newValue?.cityId)
                    // console.log(newValue)
                  }}
                />
                <FormErrorMessage>{getIn(errors.address, "cityId")}</FormErrorMessage>
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
          to={"/account/addresses"}
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

export default UserAddressEdit