import { IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { MdLocalShipping } from "react-icons/md";

const ShipIconButton = () => {
  return (
    <Tooltip label="Ship">
    <IconButton
      variant="outline"
      size="sm"
      fontSize="18px"
      colorScheme="blue"
      icon={<MdLocalShipping />}
      aria-label="Ship"
    />
    </Tooltip>
  )
}

export default ShipIconButton