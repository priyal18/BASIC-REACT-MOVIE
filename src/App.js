import React,{useEffect,useState} from 'react'
import { toast } from 'react-toastify';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
const API_URL = 'http://omdbapi.com/?i=tt3896198&apiKey=4a7de2d2'


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        console.log(response);
        if(response.status === 200)
        {
            const data = await response.json();
            setMovies(data.Search);
            //console.log(data.Search);
            toast.success("data displayed");
        }else{
            console.log("dvgfnf");
            toast.error("Something went wrong");
        }
    }
     
    const movieData = {
        Poster: "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg",
Title: "Italian Spiderman",
Type: "movie",
Year: "2007",
imdbID: "tt2705436",
    }

    useEffect(() => {
        searchMovies('Spiderman');
    },[])
    console.log(movies[0]);
  return (
    <div className='app'>
        <h1>MovieLand</h1>
        <div className='search'>
            <input 
                placeholder = "Enter the movie name"
                value={searchTerm}
                onChange ={(e) => setSearchTerm(e.target.value)}
            />
            <img src = {SearchIcon} alt= "search" onClick={() => searchMovies(searchTerm)}/>
        </div>

        {
            movies?.length > 0 
               ? 
            <div className='container'>
                {
                    movies.map((movie,index) => (
                        <MovieCard key = {index} movieData = {movie}/>
                    ))
                }
               
           </div>
                :
            <div className='empty'>
                <h2>No movies found</h2>
            </div>
        }

        
    </div>
  )
}

export default App