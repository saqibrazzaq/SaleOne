import { Box, ChakraProvider, Grid, theme, VStack } from '@chakra-ui/react'
import { Outlet } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Grid minH="100vh" p={3}>
          <VStack spacing={1}>
            <Header />
            <Outlet />
            <Footer />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default Layout