import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ProductReqSearch, ProductRes, StockStatus } from "../dtos/Product";
import PagedRes from "../dtos/PagedRes";
import { ProductApi } from "../api/productApi";
import { NumericFormat } from "react-number-format";
import { FaShoppingBag } from "react-icons/fa";
import { CartApi } from "../api/cartApi";
import { CartItemReqAddToCart } from "../dtos/CartItem";

const ProductList = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<ProductRes>>();
  const [searchText, setSearchText] = useState<string>("");
  const params = useParams();
  const categoryCode = params.categoryCode;
  const toast = useToast();

  useEffect(() => {
    searchProducts(new ProductReqSearch({}, {}));
  }, [categoryCode]);

  const searchProducts = (searchParams: ProductReqSearch) => {
    // Modify params, which will be used everywhere
    searchParams.stockStatus = StockStatus.InStock;
    searchParams.categoryCode = categoryCode;
    searchParams.pageSize = 10;
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

  const addToCart = (product?: ProductRes) => {
    // console.log("Add to cart. product: " + productId + ". Quantity: " + quantity);
    CartApi.addToCart(new CartItemReqAddToCart(product?.productId, 1)).then(res => {
      toast({
        title: "Success",
        description: product?.name + " added to cart successfully.",
        status: "success",
        position: "bottom-right",
      });
    }).catch(error => {
      toast({
        title: "Product was not added to cart",
        description: error.response.data.Message,
        status: "error",
        position: "bottom-right",
      });
    });
  }

  const showProducts = () => (
    <Stack>
      <Center>
        <Wrap spacing={2} align={"center"} mb={2}>
          {pagedRes?.pagedList?.map((product) => (
            <WrapItem key={product.productId}>
              <Center py={2} px={2}>
                <Box boxShadow={"md"}>
                  <Stack align={"center"} spacing={1} mb={2} ml={2}>
                    <Image
                      borderRadius="lg"
                      boxSize={"150px"}
                      src={product.productImages?.at(0)?.imageUrl}
                    />
                    <Text>{product.name}</Text>
                    <Center border={"0px"} width="100%">
                    <HStack >
                      <Text fontSize={"lg"}>
                        <NumericFormat
                          value={product.rate}
                          prefix="Rs. "
                          thousandSeparator=","
                          displayType="text"
                        />
                      </Text>
                      <Tooltip label="Add to Cart">
                      <IconButton
                        variant="outline"
                        size="sm"
                        colorScheme={"blue"}
                        fontSize="18px"
                        icon={<FaShoppingBag />}
                        aria-label="Add to Cart"
                        onClick={() => addToCart(product)}
                      />
                      </Tooltip>
                    </HStack>
                    </Center>
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
      <Stack spacing={4} as={Container} maxW={"6xl"}>
        {showHeading()}
        {displaySearchBar()}
        {showProducts()}
      </Stack>
    </Box>
  );
};

export default ProductList;
