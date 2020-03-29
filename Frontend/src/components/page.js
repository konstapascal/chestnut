import React from 'react';

// Component that gives short description about current page

export default function Page ({ title }) {
    return(
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <p>
          {title} page.
        </p>
        <br/>
      </div>
    )
};