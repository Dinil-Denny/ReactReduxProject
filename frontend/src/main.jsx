import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import App from './App.jsx';
//integrating bootstrap library to use predefined bootstrap classes in our entire project
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomeScreen from './screens/homeScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* every child routes of route '/' comes here */}
      {/* home screen or index screen, that's why we give index={true} */}
      <Route index={true} path='/' element={< HomeScreen/>}/> 
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
