import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherButton from './Component/WeatherButton';
import WeatherBox from './Component/WeatherBox';
import ClipLoader from "react-spinners/ClipLoader";
// 
// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다. 
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨상태
// 3. 5개의 버튼이 있다(1개는 현재 위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다. 
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다.

function App() {

  const cities = ['seoul', 'havana','positano','kyoto', 'tbilisi','seychelles','sydney','santorini']
  
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("cur lo", lat, lon);
      getWeatherByCurrentLocation(lat, lon)
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aa5c7557dd301844a890c13fa6b00d3b&units=metric`;
    setLoading(true);
    let response = await fetch(url); // url을 호출해서 데이터를 갖고 올 때까지 기다리고(비동기), response에 넣기
    let data = await response.json(); // json 추출을 기다리고 data에 넣기
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa5c7557dd301844a890c13fa6b00d3b&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  useEffect(() => {
    if(city==""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  },[city]);
  
  return (
    <div>

      {loading? (
      <div className='container'>
        <ClipLoader color="#49668f" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
      </div>) 
      : (<div className='container'>
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} />
      </div>)}
    </div>
  );
}

export default App;
