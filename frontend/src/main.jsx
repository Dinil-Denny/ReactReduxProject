import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import store from './store.js';
import {Provider} from 'react-redux';
import App from './App.jsx';
//integrating bootstrap library to use predefined bootstrap classes in our entire project
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomeScreen from './screens/homeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* every child routes of route '/' comes here */}
      {/* home screen or index screen, that's why we give index={true} */}
      <Route index={true} path='/' element={<HomeScreen />}/> 
      <Route path='/login' element={<LoginScreen />}/>
      <Route path='/register' element={<RegisterScreen />}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </Provider>
)
