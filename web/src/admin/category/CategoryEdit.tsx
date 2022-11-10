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
import { CategoryReqEdit } from "../../dtos/Category";
import { CategoryApi } from "../../api/categoryApi";

const CategoryEdit = () => {
  const params = useParams();
  const categoryId = params.categoryId;
  const updateText = categoryId ? "Update Category" : "Add Category";
  const [categoryDto, setCategoryDto] =
    useState<CategoryReqEdit>(new CategoryReqEdit());
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategory();
  }, [categoryId]);

  const loadCategory = () => {
    if (categoryId) {
      CategoryApi.get(categoryId).then(res => {
        setCategoryDto(res);
        console.log(res);
      })
    }
    
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(255),
    code: Yup.string().required("Code is required").max(20),
    description: Yup.string(),
    position: Yup.number(),
  });

  const submitForm = (values: CategoryReqEdit) => {
    // console.log(values);
    if (categoryId) {
      updateCategory(values);
    } else {
      createCategory(values);
    }
  };

  const updateCategory = (values: CategoryReqEdit) => {
    CategoryApi.update(categoryId, values).then(res => {
      toast({
        title: "Success",
        description: "Category updated successfully.",
        status: "success",
        position: "top-right",
      });
      //navigate("/admin/categories")
      window.location.href = "/admin/categories";
    });
  };

  const createCategory = (values: CategoryReqEdit) => {
    CategoryApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Category created successfully.",
        status: "success",
        position: "top-right",
      });
      
      //navigate("/admin/categories")
      window.location.href = "/admin/categories";
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={categoryDto}
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
              <FormControl isInvalid={!!errors.code && touched.code}>
                <FormLabel htmlFor="code">Code</FormLabel>
                <Field as={Input} id="code" name="code" type="text" />
                <FormErrorMessage>{errors.code}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.position && touched.position}>
                <FormLabel htmlFor="position">Position</FormLabel>
                <Field as={Input} id="position" name="position" type="text" />
                <FormErrorMessage>{errors.position}</FormErrorMessage>
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
          to={"/admin/categories"}
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

export default CategoryEdit