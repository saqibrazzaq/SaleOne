import { IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { MdPageview } from "react-icons/md";

const ViewIconButton = () => {
  return (
    <Tooltip label="Details">
    <IconButton
      variant="outline"
      size="sm"
      fontSize="18px"
      colorScheme="blue"
      icon={<MdPageview />}
      aria-label="View"
    />
    </Tooltip>
  )
}

export default ViewIconButton