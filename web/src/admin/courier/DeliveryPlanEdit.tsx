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
import { CourierReqEdit, CourierRes } from "../../dtos/Courier";
import { CourierApi } from "../../api/courierApi";
import { DeliveryPlanReqEdit } from "../../dtos/DeliveryPlan";

const DeliveryPlanEdit = () => {
  const params = useParams();
  const courierId = parseInt(params.courierId || "0");
  const deliveryPlanId = params.deliveryPlanId;
  const updateText = deliveryPlanId ? "Update Delivery Plan" : "Add Delivery Plan";
  const [courier, setCourier] = useState<CourierRes>();
  const [deliveryPlan, setDeliveryPlan] = useState<DeliveryPlanReqEdit>(
    new DeliveryPlanReqEdit(courierId));
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadDeliveryPlan();
  }, [deliveryPlanId]);

  useEffect(() => {
    loadCourier();
  }, [courierId]);

  const loadCourier = () => {
    if (courierId) {
      CourierApi.get(courierId).then(res => setCourier(res));
    }
  }

  const loadDeliveryPlan = () => {
    if (deliveryPlanId) {
      CourierApi.getDeliveryPlan(deliveryPlanId).then(res => {
        setDeliveryPlan(res);
        // console.log(res);
      })
    }
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    courierId: Yup.number().required("Courier Id is required").min(1),
    name: Yup.string().required("Name is required").max(50),
    description: Yup.string(),
    fee: Yup.number(),
  });

  const submitForm = (values: DeliveryPlanReqEdit) => {
    // console.log(values);
    if (deliveryPlanId) {
      updateDeliveryPlan(values);
    } else {
      createDeliveryPlan(values);
    }
  };

  const updateDeliveryPlan = (values: DeliveryPlanReqEdit) => {
    CourierApi.updateDeliveryPlan(deliveryPlanId, values).then(res => {
      toast({
        title: "Success",
        description: "Delivery Plan updated successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/admin/couriers/deliveryplans/" + courierId)
    });
  };

  const createDeliveryPlan = (values: DeliveryPlanReqEdit) => {
    CourierApi.createDeliveryPlan(values).then(res => {
      toast({
        title: "Success",
        description: "Delivery Plan created successfully.",
        status: "success",
        position: "bottom-right",
      });
      // navigate("/countries/edit/" + res.countryId)
      navigate("/admin/couriers/deliveryplans/" + courierId)
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={deliveryPlan}
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
                <Field as={Input} id="courierId" name="courierId" type="hidden" />
                <FormErrorMessage>{errors.courierId}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description && touched.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Field as={Input} id="description" name="description" type="text" />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.fee && touched.fee}>
                <FormLabel htmlFor="fee">Fee</FormLabel>
                <Field as={Input} id="fee" name="fee" type="number" />
                <FormErrorMessage>{errors.fee}</FormErrorMessage>
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
        <Heading fontSize={"xl"}>{courier?.name} - {updateText}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          ml={2}
          as={RouteLink}
          to={"/admin/couriers/deliveryplans/" + courierId}
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

export default DeliveryPlanEdit