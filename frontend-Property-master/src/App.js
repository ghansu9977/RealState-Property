
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Register from './componet/login';
import AddProperty from './componet/AddProperty';
import Pages from './componet/Page';
import Header from './componet/Header';
import Home from './componet/Home';
import SignUp from './componet/sign-up';
import SignIn from './componet/sign-in';
import Contact from './componet/Contact';
import UserProperty from './user-property';
import Favorite from './componet/Faviourite';
import ViewFavourites from './componet/ViewFavorite';

function App() {
  return <>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/header' element={<Header/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
  {/* <Route path="/register" element={<Sign />} /> */}
  <Route path="/AddProperty" element={<AddProperty />} />
  <Route path='/contact' element={<Contact/>}/>
  <Route path='/user-property' element={<UserProperty/>}/>
  <Route path='/favorite' element={<Favorite/>}/>
  <Route path='/viewfavorite' element={<ViewFavourites/>}/>
  </Routes>
  <Pages/>

  </>
}

export default App;
