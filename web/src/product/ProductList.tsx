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
import { ProductReqSearch, ProductRes } from "../dtos/Product";
import PagedRes from "../dtos/PagedRes";
import { ProductApi } from "../api/productApi";

const ProductList = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<ProductRes>>();
  const [searchText, setSearchText] = useState<string>("");
  const params = useParams();
  const categoryCode = params.categoryCode;

  useEffect(() => {
    searchProducts(new ProductReqSearch({}, {categoryCode: categoryCode}));
  }, [categoryCode]);

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
      }, {});

      searchProducts(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new ProductReqSearch({
        pageNumber: nextPageNumber,
        searchText: searchText,
      }, {});

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
        
      </Box>
    </Flex>
  );

  const showProducts = () => (
    // <TableContainer>
    //   <Table variant="simple">
    //     <Thead>
    //       <Tr>
    //         <Th>Code</Th>
    //         <Th>Name</Th>
    //         <Th>States</Th>
    //         <Th></Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       {pagedRes?.pagedList?.map((item) => (
    //         <Tr key={item.countryId}>
    //           <Td>{item.code}</Td>
    //           <Td>{item.name}</Td>
    //           <Td>
    //             <Link color={"blue"} mr={2} as={RouteLink} to={"/admin/states/" + item.countryId}>
    //               {item.statesCount}
    //             </Link>
    //           </Td>
    //           <Td>
    //             <Link
    //               mr={2}
    //               as={RouteLink}
    //               to={"/admin/countries/edit/" + item.countryId}
    //             >
    //               <UpdateIconButton />
    //             </Link>
    //             <Link as={RouteLink} to={"/admin/countries/delete/" + item.countryId}>
    //               <DeleteIconButton />
    //             </Link>
    //           </Td>
    //         </Tr>
    //       ))}
    //     </Tbody>
    //     <Tfoot>
    //       <Tr>
    //         <Th colSpan={2} textAlign="center">
    //           <Button
    //             isDisabled={!pagedRes?.metaData?.hasPrevious}
    //             variant="link"
    //             mr={5}
    //             onClick={previousPage}
    //           >
    //             Previous
    //           </Button>
    //           Page {pagedRes?.metaData?.currentPage} of{" "}
    //           {pagedRes?.metaData?.totalPages}
    //           <Button
    //             isDisabled={!pagedRes?.metaData?.hasNext}
    //             variant="link"
    //             ml={5}
    //             onClick={nextPage}
    //           >
    //             Next
    //           </Button>
    //         </Th>
    //       </Tr>
    //     </Tfoot>
    //   </Table>
    // </TableContainer>
    <Wrap spacing={2} align={"center"} mb={2}>
      {pagedRes?.pagedList?.map((product) => (
        <WrapItem key={product.productId}>
          <Center py={2} px={2}>
            <Box boxShadow={"md"}>
              <Stack spacing={2} align={"center"} mb={2}>
                {/* <Image
                  borderRadius="lg"
                  width={"200px"}
                  src={product.productImages[0]?.imageUrl}
                /> */}
                <Text>{product.name}</Text>
              </Stack>
            </Box>
          </Center>
        </WrapItem>
      ))}
    </Wrap>
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
              searchProducts(new ProductReqSearch({ searchText: searchText }, {}));
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            searchProducts(new ProductReqSearch({ searchText: searchText }, {}));
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

export default ProductList