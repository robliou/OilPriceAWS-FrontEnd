import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import cities from "../data.json";
import Card from "./CardFore";
import Plot from "react-plotly.js";
import axios from "axios";

export default function Chart() {
  const [chart, setChartjson] = useState("");
  const [err, setErr] = useState("");
  const [plot, setPlot] = useState(0);
  const [chartReceived, setChartReceived] = useState("");

  useEffect(() => {
    (function () {
      axios
        /*         .get("http://127.0.0.1:5000/api/four")
         */ .get("https://neodash-frontend.onrender.com/api/four")

        .then((res) => JSON.stringify(res))
        .then(function (res) {
          const obj = JSON.parse(res);

          setPlot(obj.data);
          poo();
          console.log("this is plot:", plot.data);
        })
        /* .then(function (response) {
          let chartRec = response.json();
          console.log("this is chartRec", chartRec);
          return chartRec;
        }) */
        .catch(function (error) {
          console.log(error);
        });

      /*       const chartRec = data.json();
      console.log("this is chartRec", chartRec); */
      /* const finalChart = JSON.stringify(data);
      console.log("this is finalChart", finalChart);

      setChart(finalChart);

      console.log("chart is", finalChart); */
    })();
  }, []);
  let poo = function () {
    setChartReceived("y");
  };

  return (
    <Box>
      {plot ? (
        <Plot
          data={plot.data} /* layout={plot.layout} */
          layout={{
            width: 920,
            height: 400,
            title: "Chart Four",
          }}
        />
      ) : (
        ""
      )}
    </Box>
  );
}
