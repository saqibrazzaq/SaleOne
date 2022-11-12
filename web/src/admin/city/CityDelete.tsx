import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { CityApi } from "../../api/cityApi";
import { CityResDetails } from "../../dtos/City";

const CityDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [city, setCity] = useState<CityResDetails>();
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const stateId = params.stateId;
  const cityId = params.cityId;
  
  const deleteCity = () => {
    onClose();
    CityApi.delete(cityId).then(res => {
      toast({
        title: "Success",
        description: city?.name + " deleted successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/cities/" + stateId);
    });
  };

  const showCityInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{city?.name}</Td>
            </Tr>
            <Tr>
              <Th>State</Th>
              <Td>{city?.stateName + ", " + city?.countryName}</Td>
            </Tr>
            <Tr>
              <Th>Areas</Th>
              <Td>{city?.addressesCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS CITY</Button>
        </Link>
      </HStack>
    </div>
  );

  const showAlertDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete City
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteCity} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete City</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadCity();
  }, []);

  const loadCity = () => {
    CityApi.getCityDetails(cityId).then(res => {
      setCity(res);
    })
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete City</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/cities/" + stateId}>
          <Button type="button" colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        <Text fontSize="xl">
          Are you sure you want to delete the following City?
        </Text>
        {showCityInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default CityDelete