import './App.css';
import Navbar from './components/NavBar/Navbar';
import Banner from './components/Banner/Banner';
import RawList from './components/RawList/RawList';
import { originals } from './components/constants/constants';
import { action } from './components/constants/constants';
import { horror } from './components/constants/constants';





function App() {

  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <RawList type={originals} title ="Netflix Originals"/>
      <RawList type={action} title ="Action Movies" isSmall/>
      <RawList type={horror} title ="Horror Movies" isSmall/>
    </div>
  );
}

export default App;
