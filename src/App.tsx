import React from "react";
// import { useQuery, gql } from "@apollo/client";
import "./App.css";

/*
------------------Commented out code is an example from doc for easier start. feel free to delete!---------------------------------
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;


function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}
*/

function App() {
  return (
    <div className="App">
      <h1>Just Reduce</h1>
      <span>Just Reduce</span>
      {/* <DisplayLocations />  */}
    </div>
  );
}

export default App;
