import Header from "./components/Header/Header";
import './App.css'
import SimpleBottonNavigation from "./components/MainNav";
import {Routes, Route} from 'react-router-dom'
import { Container } from "@mui/system";
import Trending from "./components/Pages/Trending/Trending";
import Series from "./components/Pages/Series/Series";
import Search from "./components/Pages/Search/Search";
import Movies from "./components/Pages/Movies/Movies";

function App() {
  return (
    <>
    <Header/>
    <div className="app"></div>
    <Container>
      <Routes>
      <Route path='/' element = {<Trending/>} exact/>
      <Route path='movies' element = {<Movies/>}/>
      <Route path='series' element = {<Series/>}/>
      <Route path='search' element = {<Search/>}/>
      </Routes>
    </Container>
    <SimpleBottonNavigation/>

    </>
    
  );
}

export default App;
