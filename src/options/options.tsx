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
} from "@mui/material";
import { SyncStorageOptions } from "../utils/storage";
import { getStorageOptions, setStorageOptions } from "../utils/storage";
type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<SyncStorageOptions | "">("");
  const [formState, setFormState] = useState<FormState>("ready");

  useEffect(() => {
    getStorageOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleFocusTimeChange = (input: string) => {
    const focusTime = parseInt(input);
    if (focusTime > 60 || focusTime < 0 || isNaN(focusTime)) {
      return;
    }
    setOptions({ ...options, focusTime });
  };

  const handleRestTimerChange = (restTime: number) => {};

  const handleSaveButtonClick = () => {
    setFormState("saving");
    setStorageOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 1000);
    });
  };

  const isFieldDisabled = formState === "saving";

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">timerXtenstion Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Focus Time</Typography>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">minutes</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  onChange={(e) => handleFocusTimeChange(e.target.value)}
                  value={options?.focusTime}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  0 - 60 mins
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography variant="body1">Rest Time</Typography>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">minutes</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  0 - 60 mins
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFieldDisabled}
              >
                {formState === "ready" ? "Save" : "Saving...."}
              </Button>
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
