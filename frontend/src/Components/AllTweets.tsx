import React, { useState, useEffect } from 'react';
import { useTweetStore } from '../store/tweet';

interface CardProps {
  _id: string;
  description: string;
  likes: string;
  name: string;
}

interface AllTweetsProps {
  LoggedUser: {
    _id: string;
    name: string;
    email: string;
  };
}

const Card: React.FC<CardProps> = ({ _id, description, likes, name }) => {
  const [hover, setHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const [newLikes, setNewLikes] = useState(likes);
  const { updateTweet, deleteTweet } = useTweetStore();

  const handleUpdate = async () => {
    const result = await updateTweet(_id, { description: newDescription, likes: newLikes });
    if (result.success) {
      setIsEditing(false);
      alert("Tweet updated successfully");
    } else {
      alert("Failed to update tweet");
    }
  };

  const handleDelete = async () => {
    const result = await deleteTweet(_id);
    if (result.success) {
      alert("Tweet deleted successfully");
    } else {
      alert("Failed to delete tweet");
    }
  };

  return (
    <div 
      className="rounded-lg shadow-md text-start overflow-hidden h-auto p-4 hover:bg-zinc-900 relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="py-4">
        {isEditing ? (
          <>
            <input 
              type="text" 
              value={newDescription} 
              onChange={(e) => setNewDescription(e.target.value)} 
              className="w-full bg-transparent p-2 rounded"
            />
            <input 
              type="text" 
              value={newLikes} 
              onChange={(e) => setNewLikes(e.target.value)} 
              className="w-full bg-transparent border-black p-2 rounded mt-2"
            />
            <button 
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2" 
              onClick={handleUpdate}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h2>@{name}</h2>
            <h2 className="font-bold text-lg">{description}</h2>
            <p>{likes}</p>
          </>
        )}
      </div>
      {hover && !isEditing && (
        <div className="absolute top-0 right-0 p-2">
          <button 
            className="bg-blue-500 text-black px-2 py-1 mr-2 rounded" 
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button 
            className="bg-red-500 text-white px-2 py-1 rounded" 
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const AllTweets: React.FC<AllTweetsProps> = ({ LoggedUser }) => {
  console.log("🚀 ~ LoggedUser:", LoggedUser)
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
          name={tweet.userId.name} 
        />
      ))}
    </div>
  );
};

export default AllTweets;