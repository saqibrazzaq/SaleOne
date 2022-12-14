import { Box, Center, Flex, Square, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { FiUsers, FiHome, FiTrendingUp } from "react-icons/fi";
import {CgOrganisation} from 'react-icons/cg';
//import {BsBagCheck} from 'react-icons/bs';
import LeftSideMenu, { LinkItemProps } from "./LeftSideMenu";

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/admin" },
  { name: "Orders", icon: CgOrganisation, href: "/admin/orders" },
  { name: "Shipments", icon: CgOrganisation, href: "/admin/shipments" },
  { name: "Categories", icon: CgOrganisation, href: "/admin/categories" },
  { name: "Products", icon: CgOrganisation, href: "/admin/products" },
  { name: "Units", icon: CgOrganisation, href: "/admin/units" },
  { name: "Couriers", icon: CgOrganisation, href: "/admin/couriers" },
  { name: "Payment Methods", icon: CgOrganisation, href: "/admin/payment-methods" },
  { name: "Countries", icon: CgOrganisation, href: "/admin/countries" },
  { name: "Users", icon: CgOrganisation, href: "/admin/users" },
  { name: "Roles", icon: CgOrganisation, href: "/admin/roles" },
];

const AdminLayout = () => {
  return (
    <Flex width={"100%"} mt="2">
      <Box w="250px">
        <LeftSideMenu menuHeading="Admin" menuItems={LinkItems} />
      </Box>
      <Center bg="gray.300" w="1px"></Center>
      <Box width={"100%"} flex="1">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default AdminLayout