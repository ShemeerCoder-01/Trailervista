import './App.css';
import Navbar from './components/NavBar/Navbar';
import Banner from './components/Banner/Banner';
import RawList from './components/RawList/RawList';
import { originals } from './components/constants/constants';
import { action } from './components/constants/constants';
import { horror } from './components/constants/constants';
import { comedy } from './components/constants/constants';
import { trending } from './components/constants/constants';
import { romantic } from './components/constants/constants';
import { documentaries } from './components/constants/constants';




function App() {

  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <RawList type={originals} title ="Netflix Originals"/>
      <RawList type={trending} title="Trending" isSmall/>
      <RawList type={action} title ="Action Movies" isSmall/>
      <RawList type={horror} title ="Horror Movies" isSmall/>
      <RawList type={comedy} title ="Comedy Movies" isSmall/>
      <RawList type={romantic} title="Romantic Movies" isSmall/>
      <RawList type={documentaries} title="Documentaries" isSmall/>
    </div>
  );
}

export default App;
