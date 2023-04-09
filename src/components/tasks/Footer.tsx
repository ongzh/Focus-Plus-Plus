import React, { useState, useEffect } from "react";
import { Box, Button, Typography, InputBase, IconButton } from "@mui/material";
import { getStoredTaskCompletionCount } from "../../utils/storage";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

const Footer: React.FC<{ taskCount: number; resetCount: () => void }> = ({
  taskCount,
  resetCount,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Typography>{taskCount}</Typography>
      <IconButton onClick={resetCount}>
        <RefreshRoundedIcon color="primary" />
      </IconButton>
      <Typography>
        Current time right now is: {currentTime.toLocaleTimeString()}
      </Typography>
    </Box>
  );
};

export default Footer;
