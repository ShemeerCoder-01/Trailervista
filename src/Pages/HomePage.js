import React, { useEffect, useState } from 'react';
import Navbar from '../components/Common/NavBar/Navbar';
import Banner from '../components/Banner/Banner';
import RawList from '../components/RawList/RawList';
import { originals } from '../components/constants/constants';
import { action } from '../components/constants/constants';
import { horror } from '../components/constants/constants';
import { comedy } from '../components/constants/constants';
import { trending } from '../components/constants/constants';
import { romantic } from '../components/constants/constants';
import { documentaries } from '../components/constants/constants';
import { useNavigate } from 'react-router-dom';
import { MovieFetching } from '../actions/MovieFetching';



function HomePage() {

    const [videoType, setVideoType] = useState("");
    const [OriginalMovies,setOriginalMovies] = useState();
    const [trendingMovies,setTrendingMovies] = useState();
    const [ActionMovies,setActionMovies] = useState();
    const [ComedyMovies,setComedyMovies] = useState();
    const [HorrorMovies,setHorrorMovies] = useState();
    const [RomanticMovies,setRomanticMovies] = useState();
    const [DocumentaryMovies,setDocumentaryMovies] = useState();
    const navigate = useNavigate();

    
    useEffect(()=>{
      let genre = [originals,trending,action,horror,comedy,romantic,documentaries];
      let states = [setOriginalMovies,setTrendingMovies,setActionMovies,setHorrorMovies,setComedyMovies,setRomanticMovies,setDocumentaryMovies];
      MovieFetching(genre,states);
    },[])

    useEffect(() => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/');
      } 
    }, [navigate]);

  return (
    <div>
            <Navbar />
            <Banner />
            <RawList movie={OriginalMovies} title="Netflix Originals" videoType={videoType} setVideoType={setVideoType} />
            <RawList movie={trendingMovies}  title="Trending" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList movie={ActionMovies} title="Action Movies" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList movie={HorrorMovies} title="Horror Movies" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList movie={ComedyMovies} title="Comedy Movies" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList movie={RomanticMovies} title="Romantic Movies" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList movie={DocumentaryMovies} title="Documentaries" isSmall videoType={videoType} setVideoType={setVideoType} />
    </div>
  )
}

export default HomePage;