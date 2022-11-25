
import { IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { BsCartX } from "react-icons/bs";

const RemoveIconButton = () => {
  return (
    <Tooltip label="Remove">
      <IconButton
        variant="outline"
        size="sm"
        fontSize="22px"
        
        icon={<BsCartX />}
        aria-label="Remove"
      />
    </Tooltip>
  );
};

export default RemoveIconButton;
