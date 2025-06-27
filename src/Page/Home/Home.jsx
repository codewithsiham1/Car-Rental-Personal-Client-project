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
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Home | Smart StudyHub</title>
        <meta name="description" content="Study smarter with our collaborative platform." />
      </Helmet>

     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Banner />
        <Card />
        <Studyseassion />
        <Middlecard />
        <Tutorsection />
        <ReviewSection />
      </div>
    </div>
  );
};

export default Home;
