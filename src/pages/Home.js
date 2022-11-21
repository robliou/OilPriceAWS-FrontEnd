import {
  Box,
  Container,
  createTheme,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Stack from "@mui/material/Stack";

import cities from "../data.json";
import Card from "../components/Card";
import CardFore from "../components/CardFore";

import Table from "../components/Table";

import Plot from "react-plotly.js";
import axios from "axios";
import Image from "mui-image";

import aws from "./../images/aws.png";

export default function Home() {
  const [err, setErr] = useState("");
  const [plot, setPlot] = useState(0);
  const [four, setFour] = useState(0);

  const [newSupply, setNewSupply] = useState("");

  const [currentPrice, setCurrentPrice] = useState("empty");

  const [historicalPrices, setHistoricalPrices] = useState("empty");

  const [consumption, setConsumption] = useState("empty");
  const [production, setProduction] = useState("empty");
  //Next time getting 'undefined' issue because of uninitialized variable, add in a default variable first! https://dmitripavlutin.com/7-tips-to-handle-undefined-in-javascript/

  useEffect(() => {
    (function () {
      axios
        .get("https://regression-backend.onrender.com/api/currentPrice")
        .then((res) => JSON.stringify(res))
        .then(function (res) {
          const obj = JSON.parse(res);
          if (currentPrice !== "") {
            let thePrice = obj.data.ask;

            console.log("this is obj", obj);

            console.log("this is thePrice", thePrice);
            setCurrentPrice(thePrice);
          } else {
            console.log("object not loaded!");
          }
        })
        .then(function (res) {
          console.log("this is Current Price:", currentPrice);
        })
        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);

  useEffect(() => {
    //Four Forecasts
    (function () {
      axios
        .get("https://regression-backend.onrender.com/api/four")
        .then((res) => JSON.stringify(res))
        .then(function (res) {
          const obj = JSON.parse(res);

          setFour(obj.data);
          console.log("this is plot:", four.data);
        })

        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);
  useEffect(() => {
    //New Supply
    (function () {
      axios
        .get("https://regression-backend.onrender.com/api/newSupply")
        .then((res) => JSON.stringify(res))
        .then(function (res) {
          const obj = JSON.parse(res);

          setNewSupply(obj.data);
        })

        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);

  useEffect(() => {
    (function () {
      axios
        .get("https://regression-backend.onrender.com/api/consumption")
        .then((res) => JSON.stringify(res))
        .then(function (res) {
          //const obj = Object.keys(res).map((key) => [key, res[key]]);
          const obj = JSON.parse(res);
          const obj2 = Object.values(obj);
          //Turns object of objects into array of objects
          var result = obj2.map(function (e) {
            return Object.keys(e).map(function (k) {
              return e[k];
            });
          });
          //is this even necessary? https://stackoverflow.com/questions/42053773/how-to-convert-a-json-object-to-array-of-arrays
          console.log("this is result", res);
          var outputData = result[0].map(Object.values);
          //turns array of objects into array of arrays https://stackoverflow.com/questions/22477612/converting-array-of-objects-into-array-of-arrays
          console.log(outputData);

          setConsumption(outputData);
        })

        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);

  useEffect(() => {
    (function () {
      axios
        .get("https://regression-backend.onrender.com/api/production")
        .then((res) => JSON.stringify(res))
        .then(function (res) {
          //const obj = Object.keys(res).map((key) => [key, res[key]]);
          const obj = JSON.parse(res);
          const obj2 = Object.values(obj);
          //Turns object of objects into array of objects
          var result = obj2.map(function (e) {
            return Object.keys(e).map(function (k) {
              return e[k];
            });
          });
          //is this even necessary? https://stackoverflow.com/questions/42053773/how-to-convert-a-json-object-to-array-of-arrays
          var outputData = result[0].map(Object.values);
          //turns array of objects into array of arrays https://stackoverflow.com/questions/22477612/converting-array-of-objects-into-array-of-arrays
          console.log(outputData);

          setProduction(outputData);
        })

        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);

  //Below is the graphing for consumption
  var sliced1 = consumption[0].slice(0, consumption[0].length - 1); //will contain ['a', 'b', 'c']
  var sliced2 = consumption[1].slice(0, consumption[1].length - 1); //will contain ['a', 'b', 'c']
  var sliced3 = consumption[2].slice(0, consumption[2].length - 1); //will contain ['a', 'b', 'c']
  var sliced4 = consumption[3].slice(0, consumption[3].length - 1); //will contain ['a', 'b', 'c']
  var sliced5 = consumption[4].slice(0, consumption[4].length - 1); //will contain ['a', 'b', 'c']
  //slice gets range of items in an array

  var trace1 = {
    x: sliced5,
    y: sliced1,
    mode: "lines+markers",
    type: "scatter",
    name: "Consumption",
  };

  var trace2 = {
    x: sliced5,
    y: sliced2,
    mode: "lines+markers",
    type: "scatter",
    name: "Trend",
  };

  var trace3 = {
    x: sliced5,
    y: sliced3,
    mode: "lines+markers",
    type: "scatter",
    name: "Seasonality- 12 mos.",
  };

  var trace4 = {
    x: sliced5,
    y: sliced4,
    mode: "lines+markers",
    type: "scatter",
    name: "Residuals",
  };

  var data = [trace1, trace2, trace3, trace4];
  //Above is the graphing for consumption

  //Below is the graphing for production
  var sliced1_prod = production[0].slice(0, production[0].length - 1); //will contain ['a', 'b', 'c']
  var sliced2_prod = production[1].slice(0, production[1].length - 1); //will contain ['a', 'b', 'c']
  var sliced3_prod = production[2].slice(0, production[2].length - 1); //will contain ['a', 'b', 'c']
  var sliced4_prod = production[3].slice(0, production[3].length - 1); //will contain ['a', 'b', 'c']
  var sliced5_prod = production[4].slice(0, production[4].length - 1); //will contain ['a', 'b', 'c']
  //slice gets range of items in an array

  var trace1_prod = {
    x: sliced5_prod,
    y: sliced1_prod,
    mode: "lines+markers",
    type: "scatter",
    name: "Production",
  };

  var trace2_prod = {
    x: sliced5_prod,
    y: sliced2_prod,
    mode: "markers",
    type: "scatter",
    name: "Trend",
  };

  var trace3_prod = {
    x: sliced5_prod,
    y: sliced3_prod,
    mode: "lines+markers",
    type: "scatter",
    name: "Seasonality- 12 mos.",
  };

  var trace4_prod = {
    x: sliced5_prod,
    y: sliced4_prod,
    mode: "lines+markers",
    type: "scatter",
    name: "Residuals",
  };

  var data_prod = [trace1_prod, trace2_prod, trace3_prod, trace4_prod];
  //Above is the graphing for production

  var trace1_fore = {
    y: [80, 100, 98, 122],
    x: [2022, 2023, 2024, 2025],
    mode: "lines+markers",
    type: "scatter",
    name: "EIA",
  };

  var trace2_fore = {
    y: [80, 73, 72, 105],
    x: [2022, 2023, 2024, 2025],
    mode: "lines+markers",
    type: "scatter",
    name: "IEA",
  };

  var trace3_fore = {
    y: [80, 80, 80, 110],
    x: [2022, 2023, 2024, 2025],
    mode: "lines+markers",
    type: "scatter",
    name: "OECD",
  };

  var trace4_fore = {
    y: [80, 117, 91, 115],
    x: [2022, 2023, 2024, 2025],
    mode: "lines+markers",
    type: "scatter",
    name: "OPEC",
  };

  var data_fore = [trace1_fore, trace2_fore, trace3_fore, trace4_fore];
  //Above is the graphing for production

  return (
    <>
      <Typography
        variant="h3"
        component="h2"
        marginBottom={3}
        marginTop={5}
        align="center"
      >
        Oil Price Prediction Engine
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <>
          {/* <Stack spacing={2}> */}
          <Grid item justifyContent={"space-evenly"} xs={12} md={2}>
            {currentPrice !== "empty" ? (
              <Paper elevation={4}>
                <Card currentPrice={currentPrice} />
              </Paper>
            ) : (
              ""
            )}
          </Grid>
          <Grid item justifyContent={"space-evenly"} xs={12} md={2}>
            {currentPrice !== "empty" ? (
              <Paper elevation={4}>
                <CardFore />
              </Paper>
            ) : (
              ""
            )}
          </Grid>
          {/*           </Stack>
           */}
          <Grid item xs={12} md={5.75} margin={0}>
            <Paper elevation={4}>
              {currentPrice ? (
                <Plot
                  data={data_fore} /* layout={plot.layout} */
                  layout={{
                    width: 565,
                    height: 350,
                    showlegend: true,
                    legend: { orientation: "h" },
                    title: "Price Forecasts Based on Consumption Scenarios",

                    yaxis: {
                      // all "layout.xaxis" attributes: #layout-xaxis
                      title: "$/bbl", // more about "layout.xaxis.title": #layout-xaxis-title
                    },
                  }}
                />
              ) : (
                ""
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5.75} margin={0}>
            <Paper elevation={4}>
              {four ? (
                <Plot
                  data={four.data} /* layout={plot.layout} */
                  layout={{
                    width: 565,
                    height: 450,
                    showlegend: true,
                    legend: { orientation: "h" },
                    title: "Crude Oil + Liquids Consumption- Forecasts",

                    yaxis: {
                      // all "layout.xaxis" attributes: #layout-xaxis
                      title: "million bbl/day", // more about "layout.xaxis.title": #layout-xaxis-title
                    },
                  }}
                />
              ) : (
                ""
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5.75} margin={0}>
            <Paper elevation={4}>
              {newSupply ? (
                <Plot
                  data={newSupply.data} /* layout={plot.layout} */
                  stackgroup="one"
                  layout={{
                    width: 565,
                    height: 450,
                    showlegend: true,
                    legend: { orientation: "h" },
                    title: "New Supply Sources",
                    yaxis: {
                      // all "layout.xaxis" attributes: #layout-xaxis
                      title: "million bbl/day", // more about "layout.xaxis.title": #layout-xaxis-title
                    },
                  }}
                />
              ) : (
                ""
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5.75} margin={0}>
            <Paper elevation={4}>
              {production ? (
                <Plot
                  data={data_prod} /* layout={plot.layout} */
                  layout={{
                    width: 565,
                    height: 450,
                    x: 1.5,
                    xanchor: "right",
                    y: 1,
                    title: "Crude Oil + Liquids Production- Historical",
                    showlegend: true,
                    legend: { orientation: "h" },

                    yaxis: {
                      // all "layout.xaxis" attributes: #layout-xaxis
                      title: "million bbl/day", // more about "layout.xaxis.title": #layout-xaxis-title
                    },
                    updatemenus: [
                      {
                        y: 1,
                        yanchor: "top",
                        buttons: [
                          {
                            method: "restyle",
                            args: ["visible", [true, true, true, true]],
                            label: "All",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [true, false, false, false]],
                            label: "Product",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [false, true, false, false]],
                            label: "Trend",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [false, false, true, false]],
                            label: "Season",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [false, false, false, true]],
                            label: "Resid",
                          },
                        ],
                      },
                    ],
                  }}
                />
              ) : (
                ""
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5.75} margin={0}>
            <Paper elevation={4}>
              {consumption ? (
                <Plot
                  data={data} /* layout={plot.layout} */
                  layout={{
                    width: 565,
                    height: 450,
                    x: 1.5,
                    xanchor: "right",
                    y: 1,
                    title: "Crude Oil + Liquids Consumption- Historical",
                    showlegend: true,
                    legend: { orientation: "h" },

                    yaxis: {
                      // all "layout.xaxis" attributes: #layout-xaxis
                      title: "million bbl/day", // more about "layout.xaxis.title": #layout-xaxis-title
                    },
                    updatemenus: [
                      {
                        y: 1,
                        yanchor: "top",
                        buttons: [
                          {
                            method: "restyle",
                            args: ["visible", [true, true, true, true]],
                            label: "All",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [true, false, false, false]],
                            label: "Consump",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [false, true, false, false]],
                            label: "Trend",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [false, false, true, false]],
                            label: "Season",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [false, false, false, true]],
                            label: "Resid",
                          },
                        ],
                      },
                    ],
                  }}
                />
              ) : (
                ""
              )}
            </Paper>
          </Grid>

          <Grid item>
            <Box
              sx={{
                mt: 4,
                mx: "auto",
              }}
            >
              <Paper elevation={0} outlined="false">
                <Container>
                  <Image src={aws} width={80} />
                </Container>
              </Paper>
            </Box>
          </Grid>
        </>
      </Grid>
    </>
  );
}
