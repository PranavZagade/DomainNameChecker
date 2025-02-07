import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [domain, setDomain] = useState(''); 
  const [isValid, setIsValid] = useState(null); 
  const [error, setError] = useState(null);   


  const checkDomain = async () => {
    setError(null); 
    setIsValid(null); 
    const options = {
      method: 'GET',
      url: 'https://mailcheck.p.rapidapi.com/',
      params: { domain: domain },
      headers: {
        'x-rapidapi-key': '496836dac1msh86abcf22ec16857p1cad97jsndc6df3501498',
        'x-rapidapi-host': 'mailcheck.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);


      if (response.data && response.data.valid) {
        setIsValid(true); 
      } else {
        setIsValid(false);
      }
    } catch (err) {
      setError('Failed to check the domain. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Domain Legitimacy Checker</h1>
        <input
          type="text"
          placeholder="Enter domain name (e.g., example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="input-field"
        />
        <button onClick={checkDomain} className="check-button">Check Domain</button>

        {isValid !== null && (
          <div className="result">
            <h2>Result:</h2>
            <p>{isValid ? "The domain is legitimate." : "The domain is not legitimate."}</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default App;
