import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigate } from 'react-router-dom';



export default function SimpleBottonNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
   useEffect(() =>{
    if(value === 0)
     navigate("/") 
     else if(value === 1){
        navigate("/movies") 
     }
     else if(value === 2){
        navigate("/series") 
     } 
     else if(value === 3){
        navigate("/search") 
     }
   }, [value,navigate])
  return (
    <Box sx={{ width:"100%", position:"fixed", bottom:0, backgroundColor:'black', zIndex:100}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" style = {{color:"black", fontWeight:"800"}}icon={<WhatshotIcon />} />
        <BottomNavigationAction label="Movies" style = {{color:"black", fontWeight:"800"}}icon={<MovieIcon />} />
        <BottomNavigationAction label="TV series" style = {{color:"black", fontWeight:"800"}}icon={<TvIcon />} />
        <BottomNavigationAction label="Search" style = {{color:"black", fontWeight:"800"}}icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}
