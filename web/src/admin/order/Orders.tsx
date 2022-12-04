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
import {
  OrderReqSearch,
  OrderReqUpdateStatus,
  OrderRes,
  OrderStatus,
} from "../../dtos/Order";
import { OrderApi } from "../../api/orderApi";
import dateFormat, { masks } from "dateformat";
import Common from "../../utility/Common";
import { NumericFormat } from "react-number-format";

const Orders = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<OrderRes>>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchParams, setSearchParams] = useState<OrderReqSearch>(
    new OrderReqSearch({}, {})
  );

  useEffect(() => {
    searchOrders();
  }, [searchParams]);

  const searchOrders = () => {
    OrderApi.search(searchParams).then((res) => {
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
        <Heading fontSize={"xl"}>Orders</Heading>
      </Box>
      <Spacer />
      <Box>
        {/* <Link ml={2} as={RouteLink} to={"/account/my-orders"}>
          <Button colorScheme={"blue"}>Add Country</Button>
        </Link> */}
      </Box>
    </Flex>
  );

  const updateStatus = (orderId?: number, status?: number) => {
    // console.log(orderId + " - " + status);
    OrderApi.updateStatus(orderId, new OrderReqUpdateStatus(status)).then(
      (res) => {
        searchOrders();
      }
    );
  };

  const showOrders = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Username</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Pay</Th>
            <Th>SubTotal</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.orderId}>
              <Td>{item.orderId}</Td>
              <Td>{item.user?.email}</Td>
              <Td>{dateFormat(item.orderDate, "isoDate")}</Td>
              <Td>
                <Select
                  value={item.status}
                  onChange={(e) => {
                    updateStatus(item.orderId, parseInt(e.target.value));
                  }}
                >
                  {Common.ORDER_STATUS.map((value) => (
                    <option key={value} value={value}>
                      {OrderStatus[value]}
                    </option>
                  ))}
                </Select>
              </Td>
              <Td>
                {item.paymentMethod?.name}
              </Td>
              <Td>
                <Link
                  color={"blue"}
                  mr={2}
                  as={RouteLink}
                  to={"/admin/orders/" + item.orderId}
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
                  to={"/admin/orders/" + item.orderId}
                >
                  <UpdateIconButton />
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
        <Text>Select status:</Text>
      </Center>
      <Box flex={1} ml={4}>
        <Select
          onChange={(e) => {
            //setOrderStatus(parseInt(e.target.value))
            setSearchParams({
              ...searchParams,
              ...{ status: parseInt(e.target.value), pageNumber: 1 },
            });
          }}
        >
          <option key={0} value={0}>
            Any status
          </option>
          {Common.ORDER_STATUS.map((value) => (
            <option key={value} value={value}>
              {OrderStatus[value]}
            </option>
          ))}
        </Select>
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
        {showOrders()}
      </Stack>
    </Box>
  );
};

export default Orders;
