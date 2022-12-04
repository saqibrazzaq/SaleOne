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
  Select,
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
import dateFormat, { masks } from "dateformat";
import Common from "../../utility/Common";
import { NumericFormat } from "react-number-format";
import { CourierReqSearch, CourierRes, CourierResWithDeliveryPlansCount } from "../../dtos/Courier";
import { CourierApi } from "../../api/courierApi";

const Couriers = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<CourierResWithDeliveryPlansCount>>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchParams, setSearchParams] = useState<CourierReqSearch>(
    new CourierReqSearch({})
  );

  useEffect(() => {
    searchCouriers();
  }, [searchParams]);

  const searchCouriers = () => {
    CourierApi.searchWithDeliveryPlansCount(searchParams).then((res) => {
      setPagedRes(res);
      // console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      setSearchParams({
        ...searchParams,
        ...{ pageNumber: previousPageNumber },
      });
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      setSearchParams({ ...searchParams, ...{ pageNumber: nextPageNumber } });
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Couriers</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/couriers/edit"}>
          <Button colorScheme={"blue"}>Create Courier</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showCouriers = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Delivery Plans</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.courierId}>
              <Td>{item.name}</Td>
              <Td>{item.deliveryPlansCount}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/couriers/edit/" + item.courierId}
                >
                  <UpdateIconButton />
                </Link>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/admin/couriers/delete/" + item.courierId}
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
        
      </Center>
      <Box flex={1} ml={4}>
        
      </Box>

      <Box ml={4}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchParams({
                ...searchParams,
                ...{ searchText: searchText },
              });
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            setSearchParams({ ...searchParams, ...{ searchText: searchText } });
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
        {showCouriers()}
      </Stack>
    </Box>
  );
}

export default Couriers