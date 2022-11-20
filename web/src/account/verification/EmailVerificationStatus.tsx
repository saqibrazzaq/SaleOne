import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorAlert, SuccessAlert } from "../../alertboxes/Alerts";
import { UserApi } from "../../api/userApi";
import ErrorDetails from "../../dtos/ErrorDetails";
import { UserRes } from "../../dtos/User";

const EmailVerificationStatus = () => {
  const [user, setUser] = useState<UserRes>();
  const [error, setError] = useState<ErrorDetails>();
  const [sendEmailerror, setSendEmailError] = useState<ErrorDetails>();
  const [sendEmailSuccess, setSendEmailSuccess] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = () => {
    UserApi.info()
      .then((res) => {
        setUser(res);
        // console.log(res);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const sendVerificationEmail = () => {
    setSendEmailError(undefined);
    setError(undefined);
    setSendEmailSuccess("");
    UserApi.sendVerificationEmail()
      .then((res) => {
        // console.log(res);
        setSendEmailSuccess(res);
        toast({
          title: "Success",
          description: "Email sent successfully.",
          status: "success",
          position: "top-right",
        });
        navigate("/account/status/emailpin");
      })
      .catch((error) => {
        setSendEmailError(error.response.data);
      });
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Email Verification</Heading>
      </Box>
      <Spacer />
      <Box></Box>
    </Flex>
  );

  const showAccountNotVerified = () => (
    <Box>
      <ErrorAlert title="Account Verification Status:" description={"Not Verified"} />

      <Button onClick={sendVerificationEmail} colorScheme="blue" mt={4}>
        Send Verification Email
      </Button>
    </Box>
  );

  const showStatus = () => {
    return <>
    {user?.emailConfirmed
          ? <SuccessAlert description={"Account verified"} />
          : showAccountNotVerified()}
    </>
  };

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {error && <ErrorAlert description={error.Message} />}
        {sendEmailerror && <ErrorAlert description={sendEmailerror.Message} />}
        {sendEmailSuccess && <SuccessAlert description={sendEmailSuccess} />}
        {showHeading()}
        {showStatus()}
      </Stack>
    </Box>
  );
};

export default EmailVerificationStatus;
