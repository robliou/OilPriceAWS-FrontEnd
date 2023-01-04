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
</Box>;
