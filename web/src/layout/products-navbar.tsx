import { Box, Center, Divider, Flex, HStack, Icon, Link, Spacer, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { ProductApi } from "../api/productApi";
import {ProductRes} from "../dtos//Product";

interface ProductNavbarProps {
  productId: number;
}

interface LinkItemProps {
  name: string;
  href: string;
}

const ProductsNavbar: React.FC<ProductNavbarProps> = ({ productId }) => {
  const [product, setProduct] = useState<ProductRes>();
  
  const LinkItems: Array<LinkItemProps> = [
    {
      name: "Edit Product",
      href: "/admin/products/edit/" + product?.categoryId + "/" + productId,
    },
    {
      name: "Images",
      href: "/admin/products/edit/images/" + productId,
    },
    
  ];

  

  const loadProduct = () => {
    ProductApi.get(productId).then(res => {
      // console.log(res.data);
      setProduct(res);
    }).catch(err => {
      ///let errDetails: ErrorDetails = err?.response?.data;
        console.log("Error: " + err);
        ///setError(errDetails?.Message || "Service failed.");
    });
  }

  useEffect(() => {
    loadProduct();
  }, [productId]);

  return (
    <Box>
      <Text fontSize={"xl"}>Update: {product?.code + " - " + product?.name}</Text>
      <HStack spacing={"10px"} mt="2">
        {LinkItems.map((menuItem) => (
          <Box borderRadius='md' bg='gray.200' px={8}
            key={menuItem.name}
            as={RouteLink} to={menuItem.href}
          >
            {menuItem.name}
          </Box>
        ))}
      </HStack>
      <Divider mt={2} />
    </Box>
  );
};

export default ProductsNavbar;
