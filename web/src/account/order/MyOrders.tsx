import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { OrderReqSearch, OrderRes, OrderStatus } from "../../dtos/Order";
import { OrderApi } from "../../api/orderApi";
import dateFormat, { masks } from "dateformat";
import Common from "../../utility/Common";
import { NumericFormat } from "react-number-format";
import ViewIconButton from "../../components/ViewIconButton";

const MyOrders = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<OrderRes>>();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    searchMyOrders(new OrderReqSearch({}, {}));
  }, []);

  const searchMyOrders = (searchParams: OrderReqSearch) => {
    OrderApi.myOrders(searchParams).then((res) => {
      setPagedRes(res);
      // console.log(res);
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new OrderReqSearch(
        {
          pageNumber: previousPageNumber,
          searchText: searchText,
        },
        {}
      );

      searchMyOrders(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new OrderReqSearch(
        {
          pageNumber: nextPageNumber,
          searchText: searchText,
        },
        {}
      );

      searchMyOrders(searchParams);
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>My Orders</Heading>
      </Box>
      <Spacer />
      <Box>
        {/* <Link ml={2} as={RouteLink} to={"/account/my-orders"}>
          <Button colorScheme={"blue"}>Add Country</Button>
        </Link> */}
      </Box>
    </Flex>
  );

  const showOrders = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Payment Method</Th>
            <Th>SubTotal</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.orderId}>
              <Td>{item.orderId}</Td>
              <Td>{dateFormat(item.orderDate, "fullDate")}</Td>
              <Td>{OrderStatus[item.status || 0]}</Td>
              <Td>{item.paymentMethod?.name}</Td>
              <Td>
                <Link
                  color={"blue"}
                  mr={2}
                  as={RouteLink}
                  to={"/account/orders/" + item.orderId}
                >
                  <NumericFormat
                    value={item.baseSubTotal}
                    prefix="Rs. "
                    thousandSeparator=","
                    displayType="text"
                  />
                </Link>
              </Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/account/orders/" + item.orderId}
                >
                  <ViewIconButton />
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
              searchMyOrders(
                new OrderReqSearch({ searchText: searchText }, {})
              );
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            searchMyOrders(new OrderReqSearch({ searchText: searchText }, {}));
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
        {showOrders()}
      </Stack>
    </Box>
  );
};

export default MyOrders;
