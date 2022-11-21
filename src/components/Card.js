import { AccessTime } from "@mui/icons-material";
import {
  createTheme,
  Grid,
  Paper,
  Rating,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import { Box } from "@mui/system";
import React from "react";
import CardMedia from "@mui/material/CardMedia";
import Image from "mui-image";

import deeprig from "./../images/deeprig.png";

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body2",
          },
          style: {
            fontSize: 11,
          },
        },
        {
          props: {
            variant: "body3",
          },
          style: {
            fontSize: 9,
          },
        },
      ],
    },
  },
});

const cardStyle = {};
//Can set card height and width this way!
//Spacing etc. set by properties in Grid<md= etc.>

export default function Card({ tour, currentPrice }) {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  var month_long = date.toLocaleString("default", { month: "short" });

  let currentDate = `${month_long} ${day}, ${year}`;

  return (
    <Grid item xs={12} md={12}>
      <ThemeProvider theme={theme}>
        <CardMedia>
          <Image src={deeprig} alt="deeprig" height={140} />
        </CardMedia>
        <Paper style={cardStyle} elevation={3} className="paper">
          <Box
            sx={{
              paddingX: 1,
              mx: "auto",
            }}
          >
            <Typography variant="h5" component="h2">
              ${currentPrice}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AccessTime style={{ width: 12.5 }} />
              <Typography variant="body2" component="p" marginLeft={0.5}>
                Current Oil Price (WTI) as of
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
              }}
            >
              <Typography variant="h6" component="h2" marginTop={0}>
                {currentDate}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
}
