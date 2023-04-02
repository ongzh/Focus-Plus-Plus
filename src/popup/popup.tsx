import React from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import { Box, Paper, Card, Typography, CardContent } from "@mui/material";

const App: React.FC<{}> = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography display="inline" className="focus-timer" variant="h2">
            00:00
          </Typography>
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
