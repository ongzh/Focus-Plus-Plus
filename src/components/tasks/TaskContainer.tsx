import React, { useState, useEffect } from "react";
import { Box, Button, Typography, InputBase, IconButton } from "@mui/material";
import {
  getStoredTaskCompletionCount,
  getStoredTasks,
  setStoredCompletedTaskCount,
  setStoredTasks,
} from "../../utils/storage";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { pink } from "@mui/material/colors";
import Footer from "./Footer";

const Task: React.FC<{
  task: string;
  handleCompleteTask: (number: any) => void;
  handleDeleteTask: (number: any) => void;
}> = ({ task, handleCompleteTask, handleDeleteTask }) => {
  return (
    <Box>
      <Typography>{task}</Typography>
      <IconButton onClick={handleDeleteTask}>
        <ClearRoundedIcon sx={{ color: pink[500] }} />
      </IconButton>
      <IconButton onClick={handleCompleteTask}>
        <CheckRoundedIcon color="success" />
      </IconButton>
    </Box>
  );
};
export const TaskContainer: React.FC<{}> = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [taskCount, setTaskCount] = useState<number>(0);

  useEffect(() => {
    getStoredTasks().then((tasks) => {
      setTasks(tasks);
    });
    getStoredTaskCompletionCount().then((count) => {
      setTaskCount(count);
    });
  }, []);

  const handleAddTask = () => {
    if (newTask === "") {
      return;
    }
    const updatedTasks = [...tasks, newTask];
    setStoredTasks(updatedTasks).then(() => {
      setTasks(updatedTasks);
      setNewTask("");
    });
  };

  const handleCompleteTask = (index: number) => {
    handleDeleteTask(index);
    getStoredTaskCompletionCount().then((count) => {
      setStoredCompletedTaskCount(count + 1);
      setTaskCount(taskCount + 1);
    });
  };

  const handleDeleteTask = (index: number) => {
    tasks.splice(index, 1);
    const updatedTasks = [...tasks];
    setStoredTasks(updatedTasks).then(() => {
      setTasks(updatedTasks);
    });
  };

  const handleResetTaskCount = () => {
    setStoredCompletedTaskCount(0).then(() => {
      setTaskCount(0);
    });
  };

  return (
    <Box>
      <InputBase
        placeholder="Add a task to complete"
        value={newTask}
        onChange={(event) => {
          setNewTask(event.target.value);
        }}
      />
      <IconButton onClick={handleAddTask}>
        <AddRoundedIcon color="primary" />
      </IconButton>
      <Box>
        {tasks.map((task, index) => (
          <Task
            task={task}
            key={index}
            handleCompleteTask={() => handleCompleteTask(index)}
            handleDeleteTask={() => handleDeleteTask(index)}
          />
        ))}
      </Box>
      <Footer taskCount={taskCount} resetCount={handleResetTaskCount} />
    </Box>
  );
};

export default TaskContainer;
