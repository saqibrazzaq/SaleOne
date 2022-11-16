import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import * as Yup from "yup";
import ErrorDetails from "../../dtos/ErrorDetails";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import { ProductRes } from "../../dtos/Product";
import { ProductApi } from "../../api/productApi";
import ProductsNavbar from "../../layout/products-navbar";
import { number } from "yup/lib/locale";

const ProductImages = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const productId = parseInt(params.productId || "0");
  const [product, setProduct] = useState<ProductRes>();
  const toast = useToast();

  // Taxon delete image dialog
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const [deleteImageId, setDeleteImageId] = useState(0);
  const [deleteImageUrl, setDeleteImageUrl] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    if (productId) {
      setError("");
      setSuccess("");
      ProductApi.get(productId)
        .then((res) => {
          // console.log(res.data)
          setProduct(res);
        })
        .catch(error => {
          setError(error.response.data);
        });
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Product Images</Heading>
      </Box>
      <Spacer />
      <Box>
      <Link ml={2} as={RouteLink} to={"/admin/products/edit/images/upload/" + productId}>
          <Button colorScheme={"blue"}>Add Image</Button>
        </Link>
        {/* <Link ml={2} as={RouteLink} to={"/admin/products/edit/" + product?.categoryId + "/" + productId}>
          <Button colorScheme={"gray"}>Back</Button>
        </Link> */}
      </Box>
    </Flex>
  );

  const showImages = () => (
    <Wrap>
      {product?.productImages?.map((productImage) => (
        <WrapItem key={productImage.productImageId}>
          <Center py={2}>
            <Box boxShadow={"md"}>
              <Stack spacing={2} align={"center"} mb={2}>
                <Image
                  key={productImage.productImageId}
                  borderRadius="lg"
                  width={"200px"}
                  src={productImage.imageUrl}
                />
                <Link
                  onClick={() => {
                    onDeleteOpen();
                    setDeleteImageId(productImage.productImageId || 0);
                    setDeleteImageUrl(productImage.imageUrl || "");
                  }}
                >
                  <Button colorScheme={"red"}>Delete</Button>
                </Link>
              </Stack>
            </Box>
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );

  const showDeleteAlertDialog = () => (
    <AlertDialog
      isOpen={isDeleteOpen}
      leastDestructiveRef={cancelRef}
      onClose={onDeleteClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Product Image
          </AlertDialogHeader>

          <AlertDialogBody>
            <Stack spacing={2} align={"center"} mb={2}>
              <Text>Are you sure? You can't undo this action afterwards.</Text>
              <Image borderRadius="lg" width={"400px"} src={deleteImageUrl} />
            </Stack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onDeleteClose}>
              <Button colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteProductImage} ml={3}>
              <Button colorScheme={"red"}>Delete Product Image</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  const deleteProductImage = () => {
    onDeleteClose();
    // console.log("Deleting " + deleteImageId);
    ProductApi.deleteImage(productId)
      .then((res) => {
        toast({
          title: "Product image deleted",
          description: "Image deleted successfully.",
          status: "error",
          position: "top-right",
        });
        loadProduct();
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {productId && <ProductsNavbar productId={productId} />}
        {displayHeading()}
        {showImages()}
      </Stack>
      {showDeleteAlertDialog()}
    </Box>
  )
}

export default ProductImages