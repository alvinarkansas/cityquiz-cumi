import React, { useState } from 'react';
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import citiesData from './data.json';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CLICKED_POS, SET_CITY_IDX, SET_PLACED_CITIES, SET_CURRENT_KM } from './store/actions';
import getDistance from './getDistance';

function Map() {
  const dispatch = useDispatch();

  function handleClickedMap(e) {
    let latitude = e.latLng.lat()
    let longtitude = e.latLng.lng()
    console.log(latitude, longtitude)
    dispatch(SET_CLICKED_POS({ lat: latitude, lng: longtitude }))
  }

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 52.370216, lng: 4.895168 }}
      onClick={handleClickedMap}
    />
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  const cityIdx = useSelector(state => state.cityIdx);
  const currentKm = useSelector(state => state.currentKm);
  const clickedPos = useSelector(state => state.clickedPos);
  const [cities, setCities] = useState(citiesData.cities);
  const placedCities = useSelector(state => state.placedCities);
  const dispatch = useDispatch();

  function handleSubmit() {
    const dist = getDistance(cities[cityIdx].position.lat, cities[cityIdx].position.lng, clickedPos.lat, clickedPos.lng, 'K')
    if (dist < 50) {
      dispatch(SET_CITY_IDX());
      dispatch(SET_PLACED_CITIES());
      console.log(true);
    } else {
      dispatch(SET_CURRENT_KM(dist));
      console.log(false);
    }
  }

  if (cities[cityIdx]) {
    return (
      <div className="app">
        {currentKm > 0
          ?
          <>
            <div className="desc">
              <div className="status-container">
                <p>{placedCities} cities placed</p>
              </div>
              <div className="status-container">
                <p>{currentKm} km left</p>
              </div>
              <div className="order">
                <p>Select the location of</p>
                {cities[cityIdx] ? <p>"{cities[cityIdx].name}"</p> : null}
              </div>
            </div>
            <div className="map">
              <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA_Z3R0UnOqnce6JvzMiqUZWoc8xOsmu_U`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
              />
            </div>
            <div className="footer">
              <button onClick={handleSubmit} className="submit-btn">Submit</button>
            </div>
          </>
          :
          <div className="end-page">
            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_c4TObF.json"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay>
            </lottie-player>
            <p>You lose</p>
          </div>
        }
      </div>
    );
  } else {
    return (
      <div className="app">
        <div className="end-page">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_htEgHu.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay>
          </lottie-player>
          <p>Congrats! You win!</p>
        </div>
      </div>
    )
  }

}

export default App;
