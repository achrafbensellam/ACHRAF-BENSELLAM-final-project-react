/** ============================ start besmillah ================================*/
import './App.css';
import { Route,Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import PageHeader from './layouts/Header';
import PageFooter from './layouts/Footer';
import AboutPage from './pages/About/About';
import ErrorPage from './pages/Error/Error';
import SignInPage from './pages/SignUpLogIn/signIn';
function App() {
  return (
    <>
    <PageHeader/>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/About' element={<AboutPage/>}/>
    <Route path='*' element={<ErrorPage/>}/>
    </Routes>
    <SignInPage/>
    <PageFooter/>
    </>
  );
}

export default App;
