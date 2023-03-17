import './App.css';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import SingleCard from './components/SingleCard';

 
function App() {
  return (
    <>
      <div className="App">
        <h1>NC Games</h1>
        
        <br/>
          


        <br/>
        <form>
          <button>User Profile</button>
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
