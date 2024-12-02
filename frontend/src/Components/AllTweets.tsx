import React, { useState, useEffect } from 'react';
import { useTweetStore } from '../store/tweet';
import { ThumbUp } from '@mui/icons-material';

interface CardProps {
  _id: string;
  description: string;
  likes: string;
  name?: string; // Make `name` optional in case it's undefined
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
      className="rounded-3xl shadow-md text-start border h-full p-4 hover:bg-zinc-900 relative"
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
              className="w-full bg-white text-black p-2 rounded"
            />
            <input 
              type="text" 
              value={newLikes} 
              onChange={(e) => setNewLikes(e.target.value)} 
              className="w-full bg-white text-black p-2 rounded mt-2"
            />
            <button 
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2" 
              onClick={handleUpdate}
            >
              Save
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold font-oswald text-2xl text-green-500">@{name}</h2>
            <h2 className="text-base">{description}</h2>
            <div className="flex gap-2 hover:cursor-pointer">
              <ThumbUp className="hover:scale-150 hover:text-green-500"/>
              <p>{likes}</p>
            </div>
          </div>
        )}
      </div>
      {hover && !isEditing && (
        <div className="absolute top-0 right-0 p-2">
          <button 
            className="bg-green-500 text-black px-2 py-1 mr-2 rounded" 
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

const AllTweets: React.FC = () => {
  const { fetchTweets, tweets } = useTweetStore();

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  return (
    <div className="w-full h-full mt-6 px-1 flex flex-col gap-5">
      {tweets?.map((tweet) => (
        <Card 
          key={tweet._id} 
          _id={tweet._id} 
          description={tweet.description} 
          likes={tweet.likes} 
          name={tweet.userId?.name} // Use optional chaining here
        />
      ))}
    </div>
  );
};

export default AllTweets;
