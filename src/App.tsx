import React from 'react';
import Statement from "./Statement";
import invoices from './invoices.json';

function App() {
  return (
    <div className="App">
      <Statement customer={invoices.customer} performance={invoices.performance}/>
    </div>
  );
}

export default App;
