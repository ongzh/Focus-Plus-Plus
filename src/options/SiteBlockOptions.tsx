import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { SiteName } from "../utils/block";
import { FaFacebookSquare } from "react-icons/fa";
import { IconType } from "react-icons";
const SiteToggle: React.FC<{
  siteName: SiteName;
  siteBlocked: boolean;
  siteIcon: IconType;
  handleBlockOption: (siteName: SiteName) => void;
}> = ({ siteName, siteIcon, siteBlocked, handleBlockOption }) => {
  return (
    <Grid item>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={siteBlocked}
              onChange={() => {
                handleBlockOption(siteName);
              }}
            />
          }
          label="Notifications"
          labelPlacement="start"
          style={{ width: "25ch" }}
        />
        <FormHelperText sx={{ ml: 1 }}>
          Chrome notifications have to be enabled in order to receive
          notifications
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

const SiteBlockOptions: React.FC<{}> = ({}) => {
  return <Box></Box>;
};
