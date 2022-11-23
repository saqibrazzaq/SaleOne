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
import { UnitReqSearch, UnitRes } from "../../dtos/Unit";
import { UnitApi } from "../../api/unitApi";

const Units = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<UnitRes>>();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    searchUnits(new UnitReqSearch({}));
  }, []);

  const searchUnits = (searchParams: UnitReqSearch) => {
    UnitApi.search(searchParams).then((res) => {
      setPagedRes(res);
      // console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new UnitReqSearch({
        pageNumber: previousPageNumber,
        searchText: searchText,
      });

      searchUnits(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new UnitReqSearch({
        pageNumber: nextPageNumber,
        searchText: searchText,
      });

      searchUnits(searchParams);
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Units</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/units/edit"}>
          <Button colorScheme={"blue"}>Add Unit</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showCountries = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.unitId}>
              <Td>{item.name}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/units/edit/" + item.unitId}
                >
                  <UpdateIconButton />
                </Link>
                <Link as={RouteLink} to={"/admin/units/delete/" + item.unitId}>
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
              searchUnits(new UnitReqSearch({ searchText: searchText }));
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            searchUnits(new UnitReqSearch({ searchText: searchText }));
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
}

export default Units