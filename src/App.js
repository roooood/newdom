import React, { useEffect, useState } from 'react';
import { StoreContextProvider } from './context';
import { AnimateContextProvider } from './animate';
import Similate from './similate';
import './App.css';


function App() {

  return (
    <StoreContextProvider >
      <AnimateContextProvider >
        <Similate />

      </AnimateContextProvider>
    </StoreContextProvider>

  );
}


export default App;
