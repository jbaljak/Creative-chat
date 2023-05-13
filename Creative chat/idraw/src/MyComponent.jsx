import React from 'react';

const MyComponent = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default MyComponent;

