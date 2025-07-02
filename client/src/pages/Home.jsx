import React from 'react';
import SubmitReview from "../components/SubmitReview";
import DisplayReviews from '../components/DisplayReviews';

const Home = () => {
  
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Welcome to MindSpace 💙</h1>
      <p className="mt-4 text-lg">You’ve successfully logged in.</p>
     <div className='flex  gap-3 p-4 rounded bg-white dark:bg-zinc-800 shadow max-w-md mx-auto'> 
      <DisplayReviews />
      <SubmitReview />
      
      </div>
    </div>
  );
};

export default Home;
