import React, { useState, useEffect } from "react";
import { Box, Button, Typography, InputBase } from "@mui/material";
import { getStoredTaskCompletionCount } from "../../utils/storage";

const Footer: React.FC<{ taskCount: number; resetCount: () => void }> = ({
  taskCount,
  resetCount,
}) => {
  return (
    <Box>
      <Typography>{taskCount}</Typography>
      <Button onClick={resetCount}>reset</Button>
    </Box>
  );
};

export default Footer;
