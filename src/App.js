import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import {
  BottomNavigationAction,
  Box,
  createTheme,
  Grid,
  ThemeProvider,
} from "@mui/material";

/* import GetChart from "./pages/GetChart";
 */
import SearchAppBar from "./components/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";

import Image from "mui-image";

import aws from "./images/aws.png";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#11cb5f",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SearchAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <BottomNavigation>
          <BottomNavigationAction>
            <Image src={aws} width={60} />
            Hi!
          </BottomNavigationAction>
        </BottomNavigation>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
