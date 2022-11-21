import { AccessTime } from "@mui/icons-material";
import {
  createTheme,
  Grid,
  Paper,
  Rating,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

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

export default function OilPrices({ oilPrices }) {
  return (
    <Grid item xs={10} md={4}>
      <ThemeProvider theme={theme}>
        <Paper style={cardStyle} elevation={3} className="paper">
          <Box
            sx={{
              paddingX: 1,
            }}
          >
            <Typography variant="subtitle1" component="h2">
              Oil Price {oilPrices.data}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AccessTime style={{ width: 12.5 }} />
              <Typography
                variant="body2"
                component="p"
                marginLeft={0.5}
              ></Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              marginTop={3}
            >
              <Rating
                name="size-small"
                size="small"
                precision={0.25}
                readOnly
              />
              <Typography
                variant="body2"
                component="p"
                marginLeft={0.5}
              ></Typography>
              <Typography
                variant="body3"
                component="p"
                marginLeft={1.5}
              ></Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            ></Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
}
