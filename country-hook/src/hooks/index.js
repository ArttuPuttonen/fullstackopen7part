import { useState, useEffect } from 'react';
import axios from 'axios';


export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};


export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      console.log(`Fetching data for ${name}`);
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            console.log('Response data:', response.data[0]);
            setCountry({ data: response.data[0], found: true });
          } else {
            console.log('No data found for country:', name);
            setCountry({ data: null, found: false });
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setCountry({ data: null, found: false });
        });
    }
  }, [name]);

  return country;
};

