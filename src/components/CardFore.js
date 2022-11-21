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
import upstream from "./../images/upstream.jpg";

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
          <Image src={upstream} alt="upstream" height={140} />
        </CardMedia>
        <Paper style={cardStyle} elevation={3} className="paper">
          <Box
            sx={{
              paddingX: 1,
              mx: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" component="p" marginLeft={0.5}>
                <b>Price Forecasts</b> (based on weighted blended-average of
                EIA/IEA/OECD/OPEC predictions)
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: "auto",
              }}
            >
              <AccessTime style={{ width: 12.5 }} />
              <Typography variant="body2" component="p" marginLeft={0.5}>
                <b>2023</b>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: "auto",
              }}
            >
              <Typography variant="h5" component="h2" mx="auto">
                $98
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: "auto",
              }}
            >
              <AccessTime style={{ width: 12.5 }} />
              <Typography variant="body2" component="p" marginLeft={0.5}>
                <b>2024</b>{" "}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h2" mx="auto">
                $88
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AccessTime style={{ width: 12.5 }} />
              <Typography variant="body2" component="p" marginLeft={0.5}>
                <b>2025</b>{" "}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: "auto",
              }}
            >
              <Typography variant="h5" component="h2" mx="auto">
                $115
              </Typography>
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
}
