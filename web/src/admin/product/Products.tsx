import React, { useEffect, useState } from "react";
import { ProductApi } from "../../api/productApi";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import UpdateIconButton from "../../components/UpdateIconButton";
import DeleteIconButton from "../../components/DeleteIconButton";
import PagedRes from "../../dtos/PagedRes";
import { ProductReqSearch, ProductRes } from "../../dtos/Product";
import CategorySearchBox from "../../searchboxes/CategorySearchBox";
import { CategoryRes } from "../../dtos/Category";
import { CategoryApi } from "../../api/categoryApi";

const Products = () => {
  const params = useParams();
  const categoryId = Number.parseInt(params.categoryId || "0");
  const [selectedCategory, setSelectedCategory] = useState<CategoryRes>({});

  const [pagedRes, setPagedRes] = useState<PagedRes<ProductRes>>();
  const [searchText, setSearchText] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    searchProducts(new ProductReqSearch({}, categoryId));
  }, [categoryId]);

  useEffect(() => {
    loadCategory();
  }, [categoryId]);

  const loadCategory = () => {
    CategoryApi.get(categoryId).then((res) => {
      setSelectedCategory(res);
    });
  };

  const searchProducts = (searchParams: ProductReqSearch) => {
    ProductApi.search(searchParams).then((res) => {
      setPagedRes(res);
      // console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new ProductReqSearch({
        pageNumber: previousPageNumber,
        searchText: searchText,
      },
      selectedCategory?.categoryId);

      searchProducts(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new ProductReqSearch({
        pageNumber: nextPageNumber,
        searchText: searchText,
      },
      selectedCategory?.categoryId);

      searchProducts(searchParams);
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Products</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/products/edit/" + categoryId}>
          <Button colorScheme={"blue"}>Add Product</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showProducts = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Code</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.productId}>
              <Td>{item.name}</Td>
              <Td>{item.code}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/products/edit/" + item.categoryId + "/" + item.productId}
                >
                  <UpdateIconButton />
                </Link>
                <Link as={RouteLink} to={"/admin/products/delete/" + item.categoryId + "/" + item.productId}>
                  <DeleteIconButton />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={2} textAlign="center">
              <Button
                isDisabled={!pagedRes?.metaData?.hasPrevious}
                variant="link"
                mr={5}
                onClick={previousPage}
              >
                Previous
              </Button>
              Page {pagedRes?.metaData?.currentPage} of{" "}
              {pagedRes?.metaData?.totalPages}
              <Button
                isDisabled={!pagedRes?.metaData?.hasNext}
                variant="link"
                ml={5}
                onClick={nextPage}
              >
                Next
              </Button>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );

  const displaySearchBar = () => (
    <Flex>
      <Center>
        <Text>Select category:</Text>
      </Center>
      <Box flex={1} ml={4}>
        <CategorySearchBox
          selectedCategory={selectedCategory}
          handleChange={(newValue?: CategoryRes) => {
            navigate("/admin/products/" + (newValue?.categoryId || ""));
            // console.log("/states/" + newValue?.countryId);
          }}
        />
      </Box>

      <Box ml={4}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchProducts(new ProductReqSearch({ searchText: searchText },
                selectedCategory?.categoryId));
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            searchProducts(new ProductReqSearch({ searchText: searchText },
              selectedCategory?.categoryId));
          }}
        >
          Search
        </Button>
      </Box>
    </Flex>
  );

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {showHeading()}
        {displaySearchBar()}
        {showProducts()}
      </Stack>
    </Box>
  );
}

export default Products