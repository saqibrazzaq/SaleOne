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
import { CategoryApi } from "../../api/categoryApi";
import { CategoryResWithProductsCount } from "../../dtos/Category";

const CategoryDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [category, setCategory] = useState<CategoryResWithProductsCount>();
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const categoryId = params.categoryId;
  
  const deleteCategory = () => {
    onClose();
    CategoryApi.delete(categoryId).then(res => {
      toast({
        title: "Success",
        description: category?.name + " deleted successfully.",
        status: "success",
        position: "top-right",
      });
      window.location.href = ("/admin/categories");
    });
  };

  const showCategoryInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{category?.name}</Td>
            </Tr>
            <Tr>
              <Th>Code</Th>
              <Td>{category?.code}</Td>
            </Tr>
            <Tr>
              <Th>Description</Th>
              <Td>{category?.description}</Td>
            </Tr>
            <Tr>
              <Th>Products</Th>
              <Td>{category?.productsCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS CATEGORY</Button>
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
            Delete Category
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteCategory} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Category</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    if (categoryId) {
      CategoryApi.getCategoryDetail(categoryId).then(res => {
        setCategory(res);
        // console.log(res);
      })
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Category</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/categories"}>
          <Button type="button" colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        <Text fontSize="xl">
          Are you sure you want to delete the following Category?
        </Text>
        {showCategoryInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default CategoryDelete