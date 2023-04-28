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
  Divider,
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
import { BasicOptions } from "./BasicOptions";

export type FormState = "ready" | "saving";
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
      setInitialBlockOptions(blockOptions);
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

  return (
    <Box mx="10%" my="2%">
      <Card style={{ marginTop: "16px", padding: "88px", paddingTop: "24px" }}>
        <Typography variant="h4" m={3} textAlign={"center"} pb={5}>
          focus++ Options
        </Typography>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <BasicOptions
                focusTime={focusTime}
                restTime={restTime}
                notifications={notifications}
                handleFocusTimeChange={handleFocusTimeChange}
                handleRestTimerChange={handleRestTimerChange}
                handleNotificationsChange={handleNotificationsChange}
                handleSaveButtonClick={handleSaveButtonClick}
                formState={formState}
              ></BasicOptions>
            </Grid>

            <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />

            <Grid item xs={12} sm={6}>
              <SiteBlockOptions
                handleBlockOptionChange={handleBlockOptionChange}
                blockOptions={blockOptions}
              ></SiteBlockOptions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
