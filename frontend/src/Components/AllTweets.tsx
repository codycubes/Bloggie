import React, { useEffect } from 'react';
import { useTweetStore } from '../store/tweet';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

interface CardProps {
    _id: String;
    description: String;
    likes: String;
    name: String; // Add name to the props
  }
  
  const Card: React.FC<CardProps> = ({ _id, description, likes, name }) => {
    return (
      <div className="rounded-lg shadow-md text-start overflow-hidden h-auto p-4 hover:bg-zinc-900">
        <div className="py-4">
          <h2>@{name}</h2> {/* Display the name */}
          <h2 className="font-bold text-lg">{description}</h2>
          <p>{likes}</p>
        </div>
      </div>
    );
  };
  
   const AllTweets: React.FC = () => {
    const { fetchTweets, tweets } = useTweetStore();
  
    useEffect(() => {
      fetchTweets();
    }, [fetchTweets]);
  
    return (
      <div className="w-full h-full">
        {tweets.map((tweet) => (
          <Card 
            key={tweet._id} 
            _id={tweet._id} 
            description={tweet.description} 
            likes={tweet.likes} 
            name={tweet.userId.name} // Pass the name to the Card component
          />
        ))}
      </div>
    );
  };


  export default AllTweets;
  