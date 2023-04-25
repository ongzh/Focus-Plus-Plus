import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./options.css";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Switch,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  useAutocomplete,
  FormControlLabel,
  Paper,
} from "@mui/material";
import {
  BlockOptions,
  SyncStorageOptions,
  getStoredBlockOptions,
  setStoredBlockOptions,
} from "../utils/storage";
import { getStorageOptions, setStorageOptions } from "../utils/storage";
import { SiteBlockOptions } from "./SiteBlockOptions";
import {
  SiteName,
  defaultBlockOptions,
  updateBlockOptions,
} from "../utils/block";
type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
  //const [options, setOptions] = useState<SyncStorageOptions | null>(null);
  const [restTime, setRestTime] = useState<number | null>(0);
  const [focusTime, setFocusTime] = useState<number | null>(0);
  const [notifications, setNotifications] = useState<boolean>(true);
  const [formState, setFormState] = useState<FormState>("ready");
  const [initialBlockOptions, setInitialBlockOptions] =
    useState<BlockOptions>(defaultBlockOptions);
  const [blockOptions, setBlockOptions] =
    useState<BlockOptions>(defaultBlockOptions);

  useEffect(() => {
    getStorageOptions().then((options) => {
      setRestTime(options.restTime);
      setFocusTime(options.focusTime);
    });
    getStoredBlockOptions().then((blockOptions) => {
      setInitialBlockOptions(blockOptions);
      setBlockOptions(blockOptions);
      console.log(blockOptions);
    });
  }, []);

  const handleFocusTimeChange = (focusTime: number) => {
    if (focusTime > 60 || focusTime < 0) {
      focusTime = 25;
    }
    setFocusTime(focusTime);
  };

  const handleRestTimerChange = (restTime: number) => {
    if (restTime > 60 || restTime < 0) {
      restTime = 5;
    }
    setRestTime(restTime);
  };

  const handleSaveButtonClick = () => {
    setFormState("saving");
    const options = {
      restTime,
      focusTime,
      notifications,
    };
    updateBlockOptions(initialBlockOptions, blockOptions);
    setStoredBlockOptions(blockOptions).then(() => {
      setStorageOptions(options).then(() => {
        setTimeout(() => {
          setFormState("ready");
        }, 1000);
      });
    });
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleBlockOptionChange = (siteName: SiteName) => {
    const newBlockOptions = { ...blockOptions };
    newBlockOptions[siteName] = !newBlockOptions[siteName];
    setBlockOptions(newBlockOptions);
  };

  const isFieldDisabled = formState === "saving";

  return (
    <Box mx="10%" my="2%">
      <Card>
        <Typography variant="h4" m={3}>
          focus++ Options
        </Typography>
      </Card>
      <Card style={{ marginTop: "16px" }}>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="body1" ml={3}>
                Focus Time
              </Typography>
              <FormControl
                sx={{ m: 1, ml: 2, width: "25ch" }}
                variant="outlined"
              >
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
            </Grid>
            <Grid item>
              <Typography variant="body1" ml={3}>
                Rest Time
              </Typography>
              <FormControl
                sx={{ m: 1, ml: 2, width: "25ch" }}
                variant="outlined"
              >
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
            <Grid item>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={notifications}
                      onChange={handleNotificationsChange}
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
            <Grid item>
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <SiteBlockOptions
        handleBlockOptionChange={handleBlockOptionChange}
        blockOptions={blockOptions}
      ></SiteBlockOptions>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
