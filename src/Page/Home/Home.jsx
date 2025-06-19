import React from 'react';
import Banner from '../../Shared/Banner/Banner';
import Studyseassion from '../Studyseassion/Studyseassion';
import Tutorsection from '../TutorSection/Tutorsection';
import { Helmet } from 'react-helmet-async';
import Card from '../Card/Card';
import Middlecard from '../MiddleCard/Middlecard';
import ReviewSection from '../ReviewSection/ReviewSection';

const Home = () => {
    return (
        <div>
              <Helmet>
        <title>Home |Smart StudyHub </title>
        <meta name="description" content="Study smarter with our collaborative platform." />
        
      </Helmet>
            <Banner></Banner>
            <Card></Card>
            <Studyseassion></Studyseassion>
            <Middlecard></Middlecard>
            <Tutorsection></Tutorsection>
            <ReviewSection></ReviewSection>
        </div>
    );
};

export default Home;