import React, { useState } from 'react';
import { useField, useCountry } from './hooks';

const Country = ({ country }) => {
  console.log('Country component received country:', country);

  if (!country) {
    return null;
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    );
  }

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>capital {country.data.capital}</div>
      <div>population {country.data.population}</div>
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    console.log(`Setting country name to ${nameInput.value}`);
    setName(nameInput.value);
  };

  console.log('App component rendered with country:', country);

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;