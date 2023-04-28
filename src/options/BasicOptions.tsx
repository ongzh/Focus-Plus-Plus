import {
  Box,
  Button,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { FormState } from "./options";

export const BasicOptions: React.FC<{
  handleFocusTimeChange: (focusTime: number) => void;
  handleRestTimerChange: (restTime: number) => void;
  handleNotificationsChange: () => void;
  handleSaveButtonClick: () => void;
  restTime: number | null;
  focusTime: number | null;
  notifications: boolean;
  formState: FormState;
}> = ({
  handleFocusTimeChange,
  handleRestTimerChange,
  handleNotificationsChange,
  handleSaveButtonClick,
  formState,
  restTime,
  focusTime,
  notifications,
}) => {
  const isFieldDisabled = formState === "saving";
  const theme = useTheme();
  return (
    <Paper
      variant="elevation"
      elevation={0}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignItems="center"
        textAlign="center"
      >
        <Grid item xs={12} md={6}>
          <Typography variant="body1" ml={3} mb={2}>
            Focus Time
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ m: 1, ml: 2, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={
                <InputAdornment position="end">minutes</InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              type="number"
              onChange={(e) =>
                handleFocusTimeChange(e.target.value as unknown as number)
              }
              value={focusTime}
            />
            <FormHelperText id="outlined-weight-helper-text">
              0 - 60 mins
            </FormHelperText>
          </FormControl>
          /
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" ml={3} mb={2}>
            Break Time
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ m: 1, ml: 2, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={
                <InputAdornment position="end">minutes</InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              type="number"
              inputProps={{
                "aria-label": "weight",
              }}
              onChange={(e) =>
                handleRestTimerChange(e.target.value as unknown as number)
              }
              value={restTime}
            />
            <FormHelperText id="outlined-weight-helper-text">
              0 - 60 mins
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" ml={3} mb={2}>
            Notifications
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} alignContent="center">
          <FormControl sx={{ m: 1, alignItems: "center" }} variant="outlined">
            <Switch
              edge="end"
              color="primary"
              checked={notifications}
              onChange={handleNotificationsChange}
            />
          </FormControl>
        </Grid>
        <FormHelperText id="outlined-weight-helper-text">
          Enable chrome browser notifications to allow notifications
        </FormHelperText>
      </Grid>
      <Box sx={{ alignSelf: "center", mt: 5 }}>
        <FormControl sx={{ ml: 3, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveButtonClick}
            disabled={isFieldDisabled}
          >
            {formState === "ready" ? "Save" : "Saving...."}
          </Button>
        </FormControl>
      </Box>
    </Paper>
  );
};
