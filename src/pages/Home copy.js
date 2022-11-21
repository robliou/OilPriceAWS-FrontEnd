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

import cities from "../data.json";
import Card from "../components/Card";

import Plot from "react-plotly.js";
import axios from "axios";

export default function Home() {
  const [err, setErr] = useState("");
  const [plot, setPlot] = useState(0);
  const [newSupply, setNewSupply] = useState("");

  const [currentPrice, setCurrentPrice] = useState("empty");
  const [mergedPrices, setMergedPrices] = useState("");
  const [oilPricesObserved, setOilPricesObserved] = useState("");

  const [consumption, setConsumption] = useState("empty");
  //Next time getting 'undefined' issue because of uninitialized variable, add in a default variable first! https://dmitripavlutin.com/7-tips-to-handle-undefined-in-javascript/
  const [testMe, setTestMe] = useState("");

  useEffect(() => {
    (function () {
      axios
        .get("http://127.0.0.1:5000/api/currentPrice")
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
        .get("http://127.0.0.1:5000/api/four")
        .then((res) => JSON.stringify(res))
        .then(function (res) {
          const obj = JSON.parse(res);

          setPlot(obj.data);
          console.log("this is plot:", plot.data);
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
        .get("http://127.0.0.1:5000/api/newSupply")
        .then((res) => JSON.stringify(res))
        .then(function (res) {
          const obj = JSON.parse(res);

          setPlot(obj.data);
        })

        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);

  useEffect(() => {
    (function () {
      axios
        .get("http://127.0.0.1:5000/api/consumption")
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
        .get("http://127.0.0.1:5000/api/merged")
        .then((res) => JSON.stringify(res))
        .then(function (res) {
          const obj = JSON.parse(res);

          setMergedPrices(obj);
        })

        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);

  var sliced1 = consumption[0].slice(0, consumption[0].length - 1); //will contain ['a', 'b', 'c']
  var sliced2 = consumption[1].slice(0, consumption[1].length - 1); //will contain ['a', 'b', 'c']
  var sliced3 = consumption[2].slice(0, consumption[2].length - 1); //will contain ['a', 'b', 'c']
  var sliced4 = consumption[3].slice(0, consumption[3].length - 1); //will contain ['a', 'b', 'c']
  var sliced5 = consumption[4].slice(0, consumption[4].length - 1); //will contain ['a', 'b', 'c']
  //slice gets range of items in an array

  console.log("sliced1", sliced1);
  console.log("sliced2", sliced2);
  console.log("sliced3", sliced3);
  console.log("sliced4", sliced4);
  console.log("sliced5", sliced5);

  var trace1 = {
    x: sliced5,
    y: sliced1,
    mode: "lines+markers",
    type: "scatter",
  };

  var trace2 = {
    x: sliced5,
    y: sliced2,
    mode: "lines+markers",
    type: "scatter",
  };

  var trace3 = {
    x: sliced5,
    y: sliced3,
    mode: "lines+markers",
    type: "scatter",
  };

  var trace4 = {
    x: sliced5,
    y: sliced4,
    mode: "lines+markers",
    type: "scatter",
  };

  var data = [trace1, trace2, trace3, trace4];

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
      <Grid container spacing={3} marginLeft={2} marginRight={2}>
        <>
          <Grid
            item
            spacing={2}
            justifyContent={"space-evenly"}
            md={5}
            margin={3}
          >
            {currentPrice !== "empty" ? (
              <Paper elevation={4}>
                <Card currentPrice={currentPrice} />
              </Paper>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={10} md={5} margin={0}>
            <Paper elevation={4}>
              {plot ? (
                <Plot
                  data={plot.data} /* layout={plot.layout} */
                  layout={{
                    width: 680,
                    height: 400,
                    showlegend: true,
                    legend: { orientation: "h" },
                    title: "Chart Four",
                  }}
                />
              ) : (
                ""
              )}
            </Paper>
          </Grid>

          <Grid item xs={10} md={5} margin={0}>
            <Paper elevation={4}>
              {consumption ? (
                <Plot
                  data={data} /* layout={plot.layout} */
                  layout={{
                    width: 680,
                    height: 400,
                    x: 1.5,
                    xanchor: "right",
                    y: 1,
                    title: "Consumption",
                    showlegend: true,
                    legend: { orientation: "h" },
                    updatemenus: [
                      {
                        y: 0.8,
                        yanchor: "top",
                        buttons: [
                          {
                            method: "restyle",
                            args: ["line.color", "red"],
                            label: "red",
                          },
                          {
                            method: "restyle",
                            args: ["line.color", "blue"],
                            label: "blue",
                          },
                          {
                            method: "restyle",
                            args: ["line.color", "green"],
                            label: "green",
                          },
                          {
                            method: "restyle",
                            args: ["line.color", "purple"],
                            label: "purple",
                          },
                        ],
                      },
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
                            label: "Data set 0",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [false, true, false, false]],
                            label: "Data set 1",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [false, false, true, false]],
                            label: "Data set 2",
                          },
                          {
                            method: "restyle",
                            args: ["visible", [false, false, false, true]],
                            label: "Data set 3",
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

          <Grid item xs={10} md={5} margin={0}>
            <Paper elevation={4}>
              {newSupply ? (
                <Line data={newSupply.data} /* layout={plot.layout} */ />
              ) : (
                ""
              )}
            </Paper>
          </Grid>
        </>
      </Grid>
    </>
  );
}
