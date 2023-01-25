import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    fontWeight: "bold",
  },
});
const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: 70,
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handleChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
          style={{ color: "#fff" }}
          hideNextButton
          hidePrevButton
         
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
