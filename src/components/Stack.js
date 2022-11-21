import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicStack() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <Item>
          <Paper elevation={4}>
            <Card />
          </Paper>
        </Item>
        <Item>
          <Paper elevation={4}>
            <Card />
          </Paper>
        </Item>
      </Stack>
    </Box>
  );
}
