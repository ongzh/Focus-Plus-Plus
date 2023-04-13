import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  InputBase,
  IconButton,
  Paper,
} from "@mui/material";
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
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: "auto",
        bottom: 0,
      }}
    >
      <Typography variant="body2" component="h3" marginLeft={"10px"}>
        Time: {currentTime.toLocaleTimeString()}
      </Typography>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" component="h3">
          Tasks Completed: {taskCount}
        </Typography>
        <IconButton onClick={resetCount}>
          <RefreshRoundedIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
