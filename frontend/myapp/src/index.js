import React,{createContext,useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context=createContext()
 
const Globaldata=({children})=>{
  const [data,setdata]=useState([])
  return(
    <>
    <Context.Provider value={{data}}>
      {children}
    </Context.Provider>

    </>
  )
}




root.render(
  <React.StrictMode>
    <Globaldata>
    <App />
    </Globaldata>
  </React.StrictMode>
);

reportWebVitals();
