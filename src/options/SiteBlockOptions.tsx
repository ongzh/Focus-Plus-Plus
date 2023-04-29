import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { SiteName } from "../utils/block";
import { BlockIcons } from "../utils/blockIcons";
import { BlockOptions } from "../utils/storage";
import "./options.css";

const SiteToggle: React.FC<{
  siteName: SiteName;
  isSiteBlocked: boolean;
  handleBlockOptionChange: (siteName: SiteName) => void;
}> = ({ siteName, isSiteBlocked, handleBlockOptionChange }) => {
  const BlockIcon = BlockIcons[siteName] as React.FC;
  return (
    <ListItem>
      <ListItemIcon style={{ color: "#2196f3" }}>
        <BlockIcon />
      </ListItemIcon>
      <ListItemText id="block-list-header" primary={siteName} />
      <Switch
        edge="end"
        checked={isSiteBlocked}
        onChange={() => {
          handleBlockOptionChange(siteName);
        }}
        inputProps={{ "aria-label": "toggle-block-" + siteName }}
      />
    </ListItem>
  );
};

export const SiteBlockOptions: React.FC<{
  handleBlockOptionChange: (siteName: SiteName) => void;
  blockOptions: BlockOptions;
}> = ({ handleBlockOptionChange, blockOptions }) => {
  return (
    <Paper style={{ height: "100%" }} variant="elevation" elevation={0}>
      <List
        sx={{
          maxHeight: 400,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        subheader={
          <ListSubheader>Block Distractions (only in focus mode)</ListSubheader>
        }
      >
        {Object.keys(blockOptions).map((siteName) => {
          return (
            <SiteToggle
              key={siteName}
              siteName={siteName as SiteName}
              isSiteBlocked={blockOptions[siteName as SiteName]}
              handleBlockOptionChange={handleBlockOptionChange}
            ></SiteToggle>
          );
        })}
      </List>
    </Paper>
  );
};
