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
import { ProductReqEdit } from "../../dtos/Product";
import { ProductApi } from "../../api/productApi";
import CategorySearchBox from "../../searchboxes/CategorySearchBox";
import { CategoryRes } from "../../dtos/Category";
import { CategoryApi } from "../../api/categoryApi";
import ErrorDetails from "../../dtos/ErrorDetails";
import { ErrorAlert } from "../../alertboxes/Alerts";
import ProductsNavbar from "../../layout/products-navbar";

const ProductEdit = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryRes>();
  const params = useParams();
  const categoryId = Number.parseInt(params.categoryId || "0");
  const productId = Number.parseInt(params.productId || "0");
  const updateText = productId ? "Update Product" : "Add Product";
  const [error, setError] = useState<ErrorDetails>();
  const [productDto, setProductDto] = useState<ProductReqEdit>(new ProductReqEdit(categoryId));
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  useEffect(() => {
    loadCategory(productDto.categoryId);
  }, [productDto.categoryId]);

  useEffect(() => {
    loadCategory(categoryId);
  }, [categoryId]);

  const loadCategory = (id?:number) => {
    // console.log("load country " + cid)
    CategoryApi.get(id).then((res) => {
      setSelectedCategory(res);
    });
  };

  const loadProduct = () => {
    if (productId) {
      ProductApi.get(productId).then((res) => {
        setProductDto(res);
        // console.log(res);
      });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(255),
    code: Yup.string().required("Code is required").max(20),
    description: Yup.string(),
    position: Yup.number(),
    quantity: Yup.number().min(0),
    price: Yup.number().min(0),
    categoryId: Yup.number().required().min(1, "Please select category"),
  });

  const submitForm = (values: ProductReqEdit) => {
    // console.log(values);
    if (productId) {
      updateProduct(values);
    } else {
      createProduct(values);
    }
  };

  const updateProduct = (values: ProductReqEdit) => {
    ProductApi.update(productId, values).then((res) => {
      toast({
        title: "Success",
        description: "Product updated successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/products/" + categoryId);
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const createProduct = (values: ProductReqEdit) => {
    ProductApi.create(values).then((res) => {
      toast({
        title: "Success",
        description: "Product created successfully.",
        status: "success",
        position: "top-right",
      });
      // navigate("/states/edit/" + res.stateId)
      navigate("/admin/products/" + categoryId);
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={productDto}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.categoryId && touched.categoryId}>
                <FormLabel htmlFor="categoryId">Category Id</FormLabel>
                <Field as={Input} id="categoryId" name="categoryId" type="hidden" />
                <CategorySearchBox
                  selectedCategory={selectedCategory}
                  handleChange={(newValue?: CategoryRes) => {
                    setSelectedCategory(newValue);
                    setFieldValue("categoryId", newValue?.categoryId);
                  }}
                />
                <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
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
              <FormControl isInvalid={!!errors.quantity && touched.quantity}>
                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <Field as={Input} id="quantity" name="quantity" type="text" />
                <FormErrorMessage>{errors.quantity}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.price && touched.price}>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Field as={Input} id="price" name="price" type="text" />
                <FormErrorMessage>{errors.price}</FormErrorMessage>
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
        <Link ml={2} as={RouteLink} to={"/admin/products/" + categoryId}>
          <Button colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {productId && <ProductsNavbar productId={productId} />}
        {displayHeading()}
        {error && <ErrorAlert description={error.Message} />}
        {showUpdateForm()}
      </Stack>
    </Box>
  );
}

export default ProductEdit