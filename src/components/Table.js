import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Blended", 98, 88, 115),
  createData("EIA", 100, 98, 122),
  createData("OPEC", 117, 91, 115),
  createData("IEA", 73, 72, 105),
  createData("OCED", 80, 80, 110),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Oil Price Forecasts (WTI)</TableCell>
            <TableCell align="right">Blended</TableCell>
            <TableCell align="right">EIA</TableCell>
            <TableCell align="right">OPEC</TableCell>
            <TableCell align="right">IEA</TableCell>
            <TableCell align="right">OCED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.Blended}</TableCell>
              <TableCell align="right">{row.EIA}</TableCell>
              <TableCell align="right">{row.OPEC}</TableCell>
              <TableCell align="right">{row.IEA}</TableCell>
              <TableCell align="right">{row.OCED}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
