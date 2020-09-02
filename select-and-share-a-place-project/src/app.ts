import axios from 'axios';

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyCs8aHXgLRSVHLtHetPAdI1EJwMb4IeYmU';


type GoogleGeocodingResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: 'OK' | 'ZERO_RESULTS';
};

const searchAddressHandler = (event: Event) => {
  event.preventDefault();

  const enteredAddress = addressInput.value;
  const requestLink = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    enteredAddress
  )}&key=${GOOGLE_API_KEY}`;

  axios
    .get<GoogleGeocodingResponse>(requestLink)
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error('There is no such address found');
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: coordinates,
        zoom: 8,
      });
      new google.maps.Marker({ position: coordinates, map });
    })
    .catch((error) => console.log(error));
};

form.addEventListener('submit', searchAddressHandler);
