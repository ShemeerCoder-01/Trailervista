import React, { useState } from 'react';
import Navbar from '../NavBar/Navbar';
import Banner from '../Banner/Banner';
import RawList from '../RawList/RawList';
import { originals } from '../constants/constants';
import { action } from '../constants/constants';
import { horror } from '../constants/constants';
import { comedy } from '../constants/constants';
import { trending } from '../constants/constants';
import { romantic } from '../constants/constants';
import { documentaries } from '../constants/constants';

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