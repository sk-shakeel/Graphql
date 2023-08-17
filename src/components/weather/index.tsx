import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";

const GET_WEATHER = gql`
  query GetWeather {
    weather {
      city
      temperature
      description
    }
  }
`;
const Weather = () => {
  const { loading, error, data } = useQuery(GET_WEATHER);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.weather.map((item: any) => (
        <div key={item.city}>
          <h2>Weather in {item.city}</h2>
          <p>Temperature: {item.temperature}°C</p>
          <p>Description: {item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Weather;
