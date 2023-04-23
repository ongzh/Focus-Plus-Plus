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
import { BlockIcons } from "../utils/blockIcons";
import { BlockOptions } from "../utils/storage";

const SiteToggle: React.FC<{
  siteName: SiteName;
  isSiteBlocked: boolean;
  handleBlockOption: (siteName: SiteName) => void;
}> = ({ siteName, isSiteBlocked, handleBlockOption }) => {
  return (
    <Grid item>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={isSiteBlocked}
              onChange={() => {
                handleBlockOption(siteName);
              }}
              inputProps={{ "aria-label": "toggle block " + siteName }}
            />
          }
          label={BlockIcons[siteName]}
          labelPlacement="start"
          style={{ width: "25ch" }}
        />
      </FormControl>
    </Grid>
  );
};

const SiteBlockOptions: React.FC<{
  handleBlockOption: (siteName: SiteName) => void;
  blockOptions: BlockOptions;
}> = ({ handleBlockOption, blockOptions }) => {
  return (
    <Box>
      {Object.keys(blockOptions).map((siteName) => {
        return (
          <SiteToggle
            siteName={siteName as SiteName}
            isSiteBlocked={blockOptions[siteName as SiteName]}
            handleBlockOption={handleBlockOption}
          />
        );
      })}
    </Box>
  );
};
