import React from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import { Box, Paper, Card, Typography, CardContent } from "@mui/material";
import FocusTimer from "../components/timer";
import TimerContainer from "../components/timer";
import TaskContainer from "../components/tasks";
const App: React.FC<{}> = () => {
  return (
    <Box>
      <TimerContainer />

      <TaskContainer />
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
