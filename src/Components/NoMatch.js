import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <h3>No Match</h3>
      <Link to='./Home'>Go Home</Link>
    </div>
  );
};

export default NoMatch;