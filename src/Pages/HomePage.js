import React, { useState } from 'react';
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

function HomePage() {

    const [videoType, setVideoType] = useState("");
  return (
    <div>
            <Navbar />
            <Banner />
            <RawList type={originals} title="Netflix Originals" videoType={videoType} setVideoType={setVideoType} />
            <RawList type={trending} title="Trending" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList type={action} title="Action Movies" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList type={horror} title="Horror Movies" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList type={comedy} title="Comedy Movies" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList type={romantic} title="Romantic Movies" isSmall videoType={videoType} setVideoType={setVideoType} />
            <RawList type={documentaries} title="Documentaries" isSmall videoType={videoType} setVideoType={setVideoType} />
    </div>
  )
}

export default HomePage;