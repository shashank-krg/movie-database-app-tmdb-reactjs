import Movie from './components/Movie' ;
import './App.css';
import React, { useState,useEffect } from 'react' ;
import 'bootstrap/dist/css/bootstrap.min.css';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&query="
const IMG_API = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

function App() {
  const [movies , setMovies] = useState([]);
  const [searchTerm ,setSearchTerm] = useState('');

  useEffect(() =>{
    getMovies(FEATURED_API)
  }, []);

  const getMovies =(API) =>
  {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setMovies(data.results);
    });

  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
if(searchTerm){
      getMovies(SEARCH_API+searchTerm);
     
      setSearchTerm('');
  }
  };

  
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <>
      <header>
      
      <form onSubmit={handleOnSubmit}>
        <h1 className="heading-tag">Imdb Clone</h1>
        <input 
          className="search" 
          type="search" 
          placeholder="Search movies..." 
          value={searchTerm}
          onChange={handleOnChange}
          />
          <button type="button" class="btn btn-dark">Watchlist</button>
          <button type="button" class="btn btn-dark ml-4">Sign In</button>
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 && 
          movies.map((movie) => (
            <Movie key={movie.id} {...movie}/>
        ))}
      </div>
   </> 
  );
}

export default App;
