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
import { ErrorAlert } from "../../alertboxes/Alerts";
import { CountryApi } from "../../api/countryApi";
import { UnitApi } from "../../api/unitApi";
import { CountryResWithStatesCount } from "../../dtos/Country";
import ErrorDetails from "../../dtos/ErrorDetails";
import { UnitRes } from "../../dtos/Unit";

const UnitDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);
  const [error, setError] = useState<ErrorDetails>();

  const [unit, setUnit] = useState<UnitRes>();
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const unitId = params.unitId;
  
  const deleteUnit = () => {
    onClose();
    UnitApi.delete(unitId).then(res => {
      toast({
        title: "Success",
        description: unit?.name + " deleted successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/admin/units");
    }).catch(error => {
      setError(error.response.data);
    });
  };

  const showUnitInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{unit?.name}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS UNIT</Button>
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
            Delete Unit
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteUnit} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Unit</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadUnit();
  }, []);

  const loadUnit = () => {
    if (unitId) {
      UnitApi.get(unitId).then(res => {
        setUnit(res);
        // console.log(res);
      })
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Unit</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/units"}>
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
          Are you sure you want to delete the following Unit?
        </Text>
        {error && <ErrorAlert description={error.Message} />}
        {showUnitInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default UnitDelete