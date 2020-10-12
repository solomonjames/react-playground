// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const urlParams = new URLSearchParams(window.location.search.slice(1));

  const [count, setCount] = useState(Number(urlParams.get('count') || 0).valueOf());
  const [checked, setChecked] = useState(Boolean(urlParams.get('checked') || true).valueOf());
  const [selected, setSelected] = useState(urlParams.get('selected') || 'google');

  const updateChecked = () => {
    setChecked(! checked);
  };

  const updateCount = () => {
    setCount(count + 1);
  };

  const updateSelected = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    const updateQueryString = (count, checked, selected) => {
      const newUrlParams = new URLSearchParams(window.location.search.slice(1));
      const location = document.createElement('a');
      location.href = window.location.toString();
  
      if (count !== newUrlParams.get('count')) {
        newUrlParams.set('count', count);
      }
  
      if (checked !== newUrlParams.get('checked')) {
        newUrlParams.set('checked', checked);
      }
  
      if (selected !== newUrlParams.get('selected')) {
        newUrlParams.set('selected', selected);
      }
  
      if (urlParams.toString() !== newUrlParams.toString()) {
        location.search = newUrlParams.toString();
  
        window.history.pushState({}, '', location.href);
      }
    };

    updateQueryString(count, checked, selected);
  }, [count, checked, selected, urlParams]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>Counter: {count}</p>
        <p>Checked: {checked ? 'checked' : 'not-checked'}</p>
        <p>Selected: {selected}</p>

        <form>
          <input type="checkbox" name="checkField" checked={checked} onChange={updateChecked} />
          <select value={selected} onChange={updateSelected}>
            <option value="google">Google</option>
            <option value="amazon">Amazon</option>
            <option value="spotify">Spotify</option>
          </select>
        </form>

        <button onClick={updateCount}>Click me</button>
      </header>
    </div>
  );
}

export default App;
