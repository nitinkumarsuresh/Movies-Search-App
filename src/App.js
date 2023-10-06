import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import React,{useState} from 'react'
import axios from 'axios';
import MovieInfoComponent from './components/MovieInfoComponent';


export const API_KEY='4526baca'
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
background: linear-gradient(130deg, rgb(3321, 93, 201),rgb(24, 38, 111),rgb(136, 276, 226),rgb(231, 93, 201),rgb(126, 276, 2126),rgb(243, 378, 113));
  color: rgb(252, 252, 243);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
  display: flex;
  color: ;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
width: 48px;
height: 48px;
margin: 15px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  align-items: center;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`

  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
function App() {
  const [searchQuery, updateSearchQuery]= useState();
  const [timeoutId, updateTimeoutId]=useState();
  const[movieList,updateMovieList]=useState([]);
  const [selectedMovie, onMovieSelect]=useState()
  const fetchData =async(serachString)=>{
    const response= await axios.get(
      `https://www.omdbapi.com/?s=${serachString}&apikey=${API_KEY}`)
      updateMovieList(response.data.Search)
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout= setTimeout(()=>fetchData(event.target.value),500);
    updateTimeoutId(timeout)
  } 
  return <Container>
    <Header>
      <AppName>
        <MovieImage src="/icon.png"/><b>NK Movies Search</b>
        </AppName>
        <SearchBox>
          <SearchIcon src="/search.png"/>
          <SearchInput placeholder='Search Movie '
          value={searchQuery}
          onChange={onTextChange}/>
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          < Placeholder src="/icon.png" />
          
        )}
      </MovieListContainer>
    </Container>
  
}

export default App;