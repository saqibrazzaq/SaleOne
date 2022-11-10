import React, { useEffect, useState } from "react";
import { CategoryApi } from "../../api/categoryApi";
import {
  Box,
  Button,
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
import { Link as RouteLink, useParams } from "react-router-dom";
import UpdateIconButton from "../../components/UpdateIconButton";
import DeleteIconButton from "../../components/DeleteIconButton";
import PagedRes from "../../dtos/PagedRes";
import { CategoryReqSearch, CategoryResWithProductsCount } from "../../dtos/Category";

const Categories = () => {
  const [pagedRes, setPagedRes] =
    useState<PagedRes<CategoryResWithProductsCount>>();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    // console.log("URL: " + process.env.REACT_APP_API_BASE_URL)
    searchCategories(new CategoryReqSearch({}));
  }, []);

  const searchCategories = (searchParams: CategoryReqSearch) => {
    CategoryApi.searchWithProductsCount(searchParams).then((res) => {
      setPagedRes(res);
      // console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new CategoryReqSearch({
        pageNumber: previousPageNumber,
        searchText: searchText,
      });

      searchCategories(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new CategoryReqSearch({
        pageNumber: nextPageNumber,
        searchText: searchText,
      });

      searchCategories(searchParams);
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Categories</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/categories/edit"}>
          <Button colorScheme={"blue"}>Add Category</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showCategories = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Products</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.categoryId}>
              <Td>{item.name}</Td>
              <Td>
                <Link color={"blue"} mr={2} as={RouteLink} to={"/admin/products/" + item.categoryId}>
                  {item.productsCount}
                </Link>
              </Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/categories/edit/" + item.categoryId}
                >
                  <UpdateIconButton />
                </Link>
                <Link as={RouteLink} to={"/admin/categories/delete/" + item.categoryId}>
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
      <Box flex={1}></Box>

      <Box ml={4}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchCategories(new CategoryReqSearch({ searchText: searchText }));
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            searchCategories(new CategoryReqSearch({ searchText: searchText }));
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
        {showCategories()}
      </Stack>
    </Box>
  );
}

export default Categories