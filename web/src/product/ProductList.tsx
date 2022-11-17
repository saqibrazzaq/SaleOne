import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ProductReqSearch, ProductRes, StockStatus } from "../dtos/Product";
import PagedRes from "../dtos/PagedRes";
import { ProductApi } from "../api/productApi";

const ProductList = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<ProductRes>>();
  const [searchText, setSearchText] = useState<string>("");
  const params = useParams();
  const categoryCode = params.categoryCode;

  useEffect(() => {
    searchProducts(new ProductReqSearch({}, {}));
  }, [categoryCode]);

  const searchProducts = (searchParams: ProductReqSearch) => {
    // Modify params, which will be used everywhere
    searchParams.stockStatus = StockStatus.InStock;
    searchParams.categoryCode = categoryCode;
    ProductApi.search(searchParams).then((res) => {
      setPagedRes(res);
      // console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new ProductReqSearch(
        {
          pageNumber: previousPageNumber,
        },
        {}
      );

      searchProducts(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new ProductReqSearch(
        {
          pageNumber: nextPageNumber,
        },
        {}
      );

      searchProducts(searchParams);
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Products</Heading>
      </Box>
      <Spacer />
      <Box></Box>
    </Flex>
  );

  const showProducts = () => (
    <Stack>
      <Center>
        <Wrap spacing={2} align={"center"} mb={2}>
          {pagedRes?.pagedList?.map((product) => (
            <WrapItem key={product.productId}>
              <Center py={2} px={2}>
                <Box boxShadow={"md"}>
                  <Stack spacing={2} align={"center"} mb={2}>
                    <Image
                    borderRadius="lg"
                    height={"150px"}
                    src={product.productImages?.at(0)?.imageUrl}
                  />
                    <Text>{product.name}</Text>
                  </Stack>
                </Box>
              </Center>
            </WrapItem>
          ))}
        </Wrap>
      </Center>

      <Center>
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
      </Center>
    </Stack>
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
              searchProducts(new ProductReqSearch({}, {}));
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            searchProducts(new ProductReqSearch({}, {}));
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
};

export default ProductList;
