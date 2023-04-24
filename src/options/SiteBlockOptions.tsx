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
import { BlockIcons } from "../utils/blockIcons";
import { BlockOptions } from "../utils/storage";

const SiteToggle: React.FC<{
  siteName: SiteName;
  isSiteBlocked: boolean;
  handleBlockOptionChange: (siteName: SiteName) => void;
}> = ({ siteName, isSiteBlocked, handleBlockOptionChange }) => {
  const BlockIcon = BlockIcons[siteName] as React.FC;
  return (
    <Grid item>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={isSiteBlocked}
              onChange={() => {
                handleBlockOptionChange(siteName);
              }}
              inputProps={{ "aria-label": "toggle block " + siteName }}
            />
          }
          label={<BlockIcon />}
          labelPlacement="start"
          style={{ width: "25ch" }}
        />
      </FormControl>
    </Grid>
  );
};

export const SiteBlockOptions: React.FC<{
  handleBlockOptionChange: (siteName: SiteName) => void;
  blockOptions: BlockOptions;
}> = ({ handleBlockOptionChange, blockOptions }) => {
  return (
    <Box>
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
    </Box>
  );
};
