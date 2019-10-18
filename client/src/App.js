import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [editingMovie, setEditingMovie] = useState();

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const deleteMovie = id => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        console.log("DELETE", res);
        setSavedList(res.data);
    })
    .catch(error => console.log(error.response));
};

  const editMovie = movieObj => {
    setEditingMovie(movieObj);
  }

  return (
    <div>
      <MovieForm editingMovie={editingMovie} setEditingMovie={setEditingMovie} />
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        component={MovieForm} />;
      {savedList.map(movieObj => {
        return (
          <div key={movieObj.id}>
            {" "}
            <p>{movieObj.title}</p> {" "}
            <p>{movieObj.director}</p> {" "}
            <p>{movieObj.metascore}</p> {" "}
          <div>
            <button onClick={() => editMovie(movieObj)} >EDIT</button> {" "}
            <button onClick={() =>
                window.confirm("Are You Sure You Wanna Delete?") &&
                deleteMovie(movieObj.id)} >DELETE</button> {" "}  
          </div>          
          </div>
        )
      })}
    </div>
  );
};

export default App;
