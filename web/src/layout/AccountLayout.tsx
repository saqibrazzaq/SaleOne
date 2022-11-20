import { Box, Center, Flex, Square, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { FiUsers, FiHome, FiTrendingUp } from "react-icons/fi";
import {CgOrganisation} from 'react-icons/cg';
//import {BsBagCheck} from 'react-icons/bs';
import LeftSideMenu, { LinkItemProps } from "./LeftSideMenu";

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/account" },
  { name: "Account Status", icon: CgOrganisation, href: "/account/status/email" },
  { name: "Addresses", icon: CgOrganisation, href: "/account/addresses" },
];

const AccountLayout = () => {
  return (
    <Flex width={"100%"} mt="2">
      <Box w="250px">
        <LeftSideMenu menuHeading="Account" menuItems={LinkItems} />
      </Box>
      <Center bg="gray.300" w="1px"></Center>
      <Box width={"100%"} flex="1">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default AccountLayout