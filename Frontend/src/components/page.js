import React from 'react';

// Component that gives short description about current page

export default function Page ({ title }) {
    return(
      <div className="App">
        <div className="App-header">
          <h2>{title}</h2>
        </div>
        <p className="App-intro">
          {title} page.
        </p>
      </div>
    )
};