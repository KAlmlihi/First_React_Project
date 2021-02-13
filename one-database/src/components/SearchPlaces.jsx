import React from "react";
import '../styles/SearchPlaces.css';
import { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  useGoogleMap,
} from "@react-google-maps/api";

import Search from './Search'

const libraries = ["places"];
let service;
const google = window.google;

const SearchPlaces = () => {

  const [shopList, setShopListState] = useState([]);



  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

  const center = {
    lat: 24.710127802594131,
    lng: 46.682743400100584,
  }

  // let request = {
  //   location: center,
  //   radius: "1000",
  //   type: ["cafe"]
  // };
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);


  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
    let map = mapRef.current;

    let request = {
      location: { lat, lng },
      radius: "10000",
      type: ["cafe"]
    };

    service = new google.maps.places.PlacesService(mapRef.current);
    service.nearbySearch(request, callback);
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let list = [];
        for (let i = 0; i < results.length; i++) {
          let shop = results[i];
          console.log(shop);
          let a = {
            name: shop.name,
            icon: shop.icon,
            isChosen: false,
            distance: shop.rating,
            id: shop.place_id,
          }
          list.push(a);
          console.log(shopList);
          new google.maps.Marker({
            position: shop.geometry.location,
            map
          });
        }
        setShopListState(list);
      }
    }
  }, []);




  const mapContainerStyle = {
    width: "277pt",
    height: "227pt",
    margin: "auto",
    border: "solid 1pt black",
    // border-radius: "12pt",
  }
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  }

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  console.log(shopList.length);
  return (
    <div className="main">
      <div className="marginControl">
        <div className="ourServicesCardRow">
          <div >
            <Search panTo={panTo} />
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options} onLoad={onMapLoad}></GoogleMap>
          </div>
          <div>
            {shopList.map((shop) => (
              <div key={shop.id} className="shopCard">
                <img className="shopDetails icon" src={shop.icon}></img>
                <div className="shopDetails twoRows">
                  <div>{shop.name}</div>
                  <div>{shop.distance}</div>
                </div>
                <div className="shopDetails">{shop.isChosen ? "yes" : "no"}</div>
              </div>
            ))}
          </div>
          <div className="orderButton"><span>تقديم طلب</span></div>
        </div>
      </div>
    </div>
  );
}

export default SearchPlaces;

