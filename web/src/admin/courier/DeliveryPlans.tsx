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
import { CourierApi } from "../../api/courierApi";
import {
  DeliveryPlanReqSearch,
  DeliveryPlanRes,
} from "../../dtos/DeliveryPlan";
import { CourierRes } from "../../dtos/Courier";

const DeliveryPlans = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<DeliveryPlanRes>>();
  const [searchText, setSearchText] = useState<string>("");
  const [courier, setCourier] = useState<CourierRes>();
  let params = useParams();
  const courierId = parseInt(params.courierId || "0");

  const [searchParams, setSearchParams] = useState<DeliveryPlanReqSearch>(
    new DeliveryPlanReqSearch({}, { courierId })
  );

  useEffect(() => {
    searchCouriers();
  }, [searchParams]);

  useEffect(() => {
    CourierApi.get(courierId).then((res) => setCourier(res));
  }, [courierId]);

  const searchCouriers = () => {
    CourierApi.searchDeliveryPlans(searchParams).then((res) => {
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
        <Heading fontSize={"xl"}>{courier?.name} Delivery Plans</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          ml={2}
          as={RouteLink}
          to={"/admin/couriers/deliveryplans/edit/" + courierId}
        >
          <Button colorScheme={"blue"}>Create Delivery Plan</Button>
        </Link>
        <Link
          ml={2}
          as={RouteLink}
          to={"/admin/couriers/"}
        >
          <Button colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );

  const showDeliveryPlans = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Fee</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.deliveryPlanId}>
              <Td>{item.name}</Td>
              <Td>{item.fee}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={
                    "/admin/couriers/deliveryplans/edit/" +
                    item.courierId +
                    "/" +
                    item.deliveryPlanId
                  }
                >
                  <UpdateIconButton />
                </Link>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={
                    "/admin/couriers/deliveryplans/delete/" +
                    item.courierId +
                    "/" +
                    item.deliveryPlanId
                  }
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
      <Center></Center>
      <Box flex={1} ml={4}></Box>

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
        {showDeliveryPlans()}
      </Stack>
    </Box>
  );
};

export default DeliveryPlans;
