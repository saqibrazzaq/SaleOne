import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { ProductApi } from "../../api/productApi";
import { ProductRes } from "../../dtos/Product";

const ProductDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [product, setProduct] = useState<ProductRes>();

  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const categoryId = params.categoryId;
  const productId = params.productId;

  const deleteProduct = () => {
    onClose();

    ProductApi.delete(productId).then((res) => {
      toast({
        title: "Success",
        description: product?.name + " deleted successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/products/" + categoryId);
    });
  };

  const showProductInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{product?.name}</Td>
            </Tr>
            <Tr>
              <Th>Code</Th>
              <Td>{product?.code}</Td>
            </Tr>
            <Tr>
              <Th>Category</Th>
              <Td>{product?.category?.name}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>
            YES, I WANT TO DELETE THIS PRODUCT
          </Button>
        </Link>
      </HStack>
    </div>
  );

  const showAlertDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Product
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>
                Cancel
              </Button>
            </Link>
            <Link onClick={deleteProduct} ml={3}>
              <Button type="submit" colorScheme={"red"}>
                Delete Product
              </Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    ProductApi.get(productId).then((res) => {
      setProduct(res);
    });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Product</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/products/" + categoryId}>
          <Button type="button" colorScheme={"gray"}>
            Back
          </Button>
        </Link>
      </Box>
    </Flex>
  );
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        <Text fontSize="xl">
          Are you sure you want to delete the following Product?
        </Text>
        {showProductInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  );
};

export default ProductDelete;
