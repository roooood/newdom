import React, { useEffect, useState, useReducer } from 'react';
import { StoreContextProvider } from './context';
import { AnimateContextProvider } from './animate';
import Plate from './plate';
import Simi from './simi';
import './App.css';

function App() {
  return (
    <StoreContextProvider >
      <AnimateContextProvider >
        <div className="box">
          <div className="stack">
            <Plate type="opponet" />
          </div>
          <div className="board">

          </div>
          <div className="stack">
            <Plate type="me" />
          </div>
          <Simi />
        </div>
      </AnimateContextProvider>
    </StoreContextProvider>

  );
}


export default App;
