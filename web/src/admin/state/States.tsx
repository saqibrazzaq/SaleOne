import React, { useEffect, useState } from "react";
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
import {
  Link as RouteLink,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import UpdateIconButton from "../../components/UpdateIconButton";
import DeleteIconButton from "../../components/DeleteIconButton";
import PagedRes from "../../dtos/PagedRes";
import CountrySearchBox from "../../searchboxes/CountrySearchBox";
import {
  StateReqSearch,
  StateRes,
  StateResWithCitiesCount,
} from "../../dtos/State";
import { CountryRes } from "../../dtos/Country";
import { StateApi } from "../../api/stateApi";
import { CountryApi } from "../../api/countryApi";

const States = () => {
  const params = useParams();
  const countryId = Number.parseInt(params.countryId || "0");
  const [pagedRes, setPagedRes] = useState<PagedRes<StateResWithCitiesCount>>();
  const [selectedCountry, setSelectedCountry] = useState<CountryRes>({});
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  // console.log("selected country: " + (selectedCountry?.countryId || "0"));
  useEffect(() => {
    // console.log("URL: " + process.env.REACT_APP_API_BASE_URL)
    searchStates(new StateReqSearch({}, countryId));
  }, [countryId]);

  useEffect(() => {
    loadCountry();
  }, [countryId]);

  const loadCountry = () => {
    CountryApi.get(countryId).then((res) => {
      setSelectedCountry(res);
    });
  };

  const searchStates = (searchParams: StateReqSearch) => {
    StateApi.searchStatesWithCitiesCount(searchParams).then((res) => {
      setPagedRes(res);
      // console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new StateReqSearch(
        {
          pageNumber: previousPageNumber,
          searchText: searchText,
        },
        selectedCountry?.countryId
      );

      searchStates(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new StateReqSearch(
        { pageNumber: nextPageNumber, searchText: searchText },
        selectedCountry?.countryId
      );

      searchStates(searchParams);
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>States</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          ml={2}
          as={RouteLink}
          to={"/admin/states/edit/" + (selectedCountry?.countryId || "")}
        >
          <Button colorScheme={"blue"}>Add State</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showStates = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th>Cities</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.stateId}>
              <Td>{item.code}</Td>
              <Td>{item.name}</Td>
              <Td>
                <Link
                  color={"blue"}
                  mr={2}
                  as={RouteLink}
                  to={"/admin/cities/" + item.stateId}
                >
                  {item.citiesCount}
                </Link>
              </Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/states/edit/" + item.countryId + "/" + item.stateId}
                >
                  <UpdateIconButton />
                </Link>
                <Link
                  as={RouteLink}
                  to={"/admin/states/delete/" + item.countryId + "/" + item.stateId}
                >
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
        <Text>Select country:</Text>
      </Center>
      <Box flex={1} ml={4}>
        <CountrySearchBox
          selectedCountry={selectedCountry}
          handleChange={(newValue?: CountryRes) => {
            navigate("/admin/states/" + newValue?.countryId);
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
              searchStates(
                new StateReqSearch(
                  { searchText: searchText },
                  selectedCountry?.countryId
                )
              );
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            searchStates(
              new StateReqSearch(
                { searchText: searchText },
                selectedCountry?.countryId
              )
            );
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
        {showStates()}
      </Stack>
    </Box>
  );
};

export default States;
