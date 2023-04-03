import React from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import { Box, Paper, Card, Typography, CardContent } from "@mui/material";
import FocusTimer from "../components/timer";
const App: React.FC<{}> = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <FocusTimer focusTime={5}></FocusTimer>
          <Typography display="inline" className="rest-timer">
            00:00
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
