import './App.css';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import SingleCard from './components/SingleCard';
import { Link } from 'react-router-dom';

 
function App() {
  return (
    <>
      <div className="App">
      <h1>
          <Link to="/" className="header-link">
            NC Games
          </Link>
        </h1>
        
        <br/>
          


        <br/>
        <form >
          <button className="userProfile" disabled> Signed in as: jessjelly</button>
        </form>
      </div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/reviews/:review_id' element={<SingleCard/>}/>
        </Routes>
    </>
  );
}



export default App;
