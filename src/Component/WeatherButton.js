import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity}) => {
  return(
    <div>
      <Button variant="light" >Current Location</Button>
      
      {cities.map((item)=>(
        <Button variant="light" onClick={() => setCity(item)} >{item}</Button>
      ))}

    </div>
  )
}

export default WeatherButton
