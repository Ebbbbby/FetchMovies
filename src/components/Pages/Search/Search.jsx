import { ThemeProvider } from "@emotion/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Button, createTheme, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useState,useEffect,useCallback } from "react";
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState()

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });



 const fetchSearch = useCallback(async () => {
   const { data } = await axios.get(
     `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
       process.env.REACT_APP_API_KEY
     }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
   );

   setContent(data.results);
   setNumOfPages(data.total_pages);
 }, [type, searchText, page]);


   useEffect(() => {
     window.scroll(0, 0);
     fetchSearch();
   }, [type, page, fetchSearch]);


  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e)=> setSearchText(e.target.value)}
          />
          <Button variant="contained" style={{ marginLeft: 10 }} onClick = {fetchSearch}>
            <SearchIcon />
          </Button>
        </div>
        <Tabs value={type} indicatorColor="primary" textColor="primary" onChange={(event, newValue)  =>{
          setType(newValue);
          setPage(1)
        }}>
          <Tab style = {{width:"50%"}}label="Search Movies" />
          <Tab style = {{width:"50%"}}label="Tv Series"  />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id = {c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              mediaType={type ? "tv": 'movie'}
              voteAverage={c.vote_average}
            />
          ))}
          {searchText && !content && (type ? <h2>No Series Found </h2>: <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 &&(
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      )}

    </div>
  );
};

export default Search;
