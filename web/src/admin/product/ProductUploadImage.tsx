import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  Heading,
  Link,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductApi } from "../../api/productApi";
import { ProductImageReqEdit } from "../../dtos/ProductImage";
import { number } from "yup/lib/locale";
//import { useDropzone } from "react-dropzone";

const ProductUploadImage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const productId = parseInt(params.productId || "0");
  const toast = useToast();

  useEffect(() => {
    
  }, [productId]);

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Add Product Image</Heading>
      </Box>
      <Spacer />
      <Box>
        
      </Box>
    </Flex>
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    ProductApi.createImage(new ProductImageReqEdit(productId))
      .then((res) => {
        // console.log(res.data);
        successToast();
        navigate("/admin/products/product-images/" + productId);
        //acceptedFiles.splice(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successToast = () => {
    toast({
      title: "Image updated successfully",
      description: "",
      status: "success",
      position: "top-right",
    });
  };

  const config = { headers: { "Content-Type": "multipart/form-data" } };
  let fd = new FormData();

  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.name}>
  //     {file.name} - {file.size} bytes
  //   </li>
  // ));

  // acceptedFiles.map((file) => {
  //   fd.append("File[]", file);
  // });

  const showUploadForm = () => (
    <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
      {/* <FormControl>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Center width={500} height={200} backgroundColor={"gray.200"}>
            Click to select or Drag files here...
          </Center>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </FormControl>
      <Stack spacing={6}>
        <Button colorScheme={"blue"}>Upload Product Image</Button>
      </Stack> */}
    </form>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {/* {productId && <ProductsNavbar productId={productId} />} */}
        {displayHeading()}
        {showUploadForm()}
      </Stack>
    </Box>
  );
};

export default ProductUploadImage;
