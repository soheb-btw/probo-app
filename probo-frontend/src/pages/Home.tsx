// import React from 'react';
import { TrendingUp, Users, Trophy } from 'lucide-react';
// import { CategoryList } from '../components/Markets/CategoryList';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Trade Your Predictions, Shape the Future
            </h1>
            <p className="text-xl text-indigo-200 mb-8">
              Join India's largest prediction marketplace and trade on future events
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-md font-medium hover:bg-indigo-50">
              Start Trading Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why OpinionTrade?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 p-4 rounded-full inline-block mb-4">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Trading</h3>
            <p className="text-gray-600">
              Trade predictions on various topics with dynamic pricing
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-indigo-100 p-4 rounded-full inline-block mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Wisdom</h3>
            <p className="text-gray-600">
              Leverage collective intelligence for better predictions
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-indigo-100 p-4 rounded-full inline-block mb-4">
              <Trophy className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Probo Team 11</h3>
            <p className="text-gray-600">
              Create your fantasy cricket team and compete for rewards
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
        {/* <CategoryList /> */}
      </div>
    </div>
  );
};