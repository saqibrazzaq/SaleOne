import React, { useEffect, useState } from "react";
import { CountryReqSearch, CountryResWithStatesCount } from "../../dtos/Country";
import { CountryApi } from "../../api/countryApi";
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

const Countries = () => {
  const [pagedRes, setPagedRes] =
    useState<PagedRes<CountryResWithStatesCount>>();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    // console.log("URL: " + process.env.REACT_APP_API_BASE_URL)
    searchCountries(new CountryReqSearch({}));
  }, []);

  const searchCountries = (searchParams: CountryReqSearch) => {
    CountryApi.searchWithStatesCount(searchParams).then((res) => {
      setPagedRes(res);
      // console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new CountryReqSearch({
        pageNumber: previousPageNumber,
        searchText: searchText,
      });

      searchCountries(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new CountryReqSearch({
        pageNumber: nextPageNumber,
        searchText: searchText,
      });

      searchCountries(searchParams);
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Countries</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/countries/edit"}>
          <Button colorScheme={"blue"}>Add Country</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showCountries = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th>States</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.countryId}>
              <Td>{item.code}</Td>
              <Td>{item.name}</Td>
              <Td>
                <Link color={"blue"} mr={2} as={RouteLink} to={"/admin/states/" + item.countryId}>
                  {item.statesCount}
                </Link>
              </Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/countries/edit/" + item.countryId}
                >
                  <UpdateIconButton />
                </Link>
                <Link as={RouteLink} to={"/admin/countries/delete/" + item.countryId}>
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
              searchCountries(new CountryReqSearch({ searchText: searchText }));
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            searchCountries(new CountryReqSearch({ searchText: searchText }));
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
        {showCountries()}
      </Stack>
    </Box>
  );
};

export default Countries;
