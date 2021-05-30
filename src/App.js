import logo from "./logo.svg";
import React, { useState } from "react";
import { getAirDataByCity } from "./api";

function App() {
  const [city, setCity] = useState(null);
  const [view, setView] = useState(null);
  const [info, setInfo] = useState({
    city:null,
    data:{}
  })
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await getAirDataByCity(city);
    console.log(data);
    setInfo({
      city: city,
      data: data
    });
    setCity("")
  }
  const formatDate = (dates)=>{
    const date = new Date(dates) 
    let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    return formatted_date;
  }
  const getTime = (date) =>{
    return new Date(date).toLocaleTimeString()
  }

  const airQuality=(quantity)=>{
    if (quantity<50) return "Таза"
    if (quantity>=50 && quantity<100) return "Орто зыян"
    if (quantity>=100 && quantity<150) return "Кээбир учурда зыян"
    if (quantity>=150 && quantity<200) return "Зыян"
    if (quantity<=200) return "Аябай зыян"
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-links">
          <ul>
            <li className="header-link-item">
              <a href="/">Биз жөнүндө</a>
            </li>
          </ul>
        </div>
        <img src={logo} className="App-logo" width="120" alt="logo" />
        <div className="header-links">
          <ul>
            <li className="header-link-item">
              <a href="/">Жардам</a>
            </li>
          </ul>
        </div>
      </header>
      <section>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <label className="search-label">
              <h4 className="search-label-text">
                Шаардын атын жазыңыз жана{" "}
                <code>
                  <strong>Enter</strong>
                </code>{" "}
                басыңыз
              </h4>
            </label>
            <input
              type="text"
              name="search-form"
              id="search"
              className="search-input"
              placeholder="Мисалы: Ош..."
              onChange={handleChange}
              value={city}
            />
          </form>
        </div>
      </section>
      <section>
        {info.data.data? (
          <div className="body">
            <div className="widget-container">
              <div className="top-left">
                <h2 className="city" id="city">
                  {info.city}
                </h2>
                {/* <h3 id="day">Day</h3> */}
                <h4 id="date">{formatDate( info.data.data.current.pollution.ts)}</h4>
                <h4 id="time">{getTime(info.data.data.current.pollution.ts)}</h4>
                <p className="geo" />
              </div>
              <div className="top-right">
                <h4 id="date" style={{marginTop:"-7px"}}>Абаанын сапаты:</h4>
                <h2 id="temperature" >{info.data.data.current.pollution.aqius}</h2>
                <h4 id="celsius" className="airq" >( {airQuality(+info.data.data.current.pollution.aqius)} )</h4>
                {/* <h2 style={{marginTop:"-10px"}}>{info.data.data.current.pollution.aqius}</h2>
                <p>{airQuality(+info.data.data.current.pollution.aqius)}</p> */}
                <div className="other-details-key" style={{marginTop:"10px"}}>
                  <a href="https://habr.com/ru/company/tion/blog/396111/">Башкы булгоочу зат: </a>
                </div>
                <div className="other-details-values" style={{marginTop:"10px"}}>
                  <a href="https://habr.com/ru/company/tion/blog/396111/" className="windspeed">{String(info.data.data.current.pollution.mainus).toUpperCase()}</a>
                </div>
              </div>
              <div className="horizontal-half-divider" />
              <div className="bottom-left">
                <h2 id="temperature">{info.data.data.current.weather.tp}</h2>
                <h3 id="celsius">°C</h3>
              </div>
              <div className="vertical-half-divider" />
              <div className="bottom-right">
                <div className="other-details-key">
                  <p>Абаа ылдамы</p>
                  <p>Нымдуулук</p>
                  <p>Абаа басымы</p>
                </div>
                <div className="other-details-values">
                  <p className="windspeed">{info.data.data.current.weather.ws} Km/h</p>
                  <p className="humidity">{info.data.data.current.weather.hu} %</p>
                  <p className="pressure">{info.data.data.current.weather.pr} hPa</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default App;
