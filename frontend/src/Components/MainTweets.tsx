import React, { useState } from 'react';
import AllTweets from './AllTweets';
import { useTweetStore } from '../store/tweet';
import { toast } from 'react-toastify';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

interface Tweet {
  userId: string;
  description: string;
  likes: string;
  name: string; 
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const MainTweets: React.FC = () => {
  const [newTweet, setNewTweet] = useState<Tweet>({
    userId: '',
    description: '',
    likes: '2',
    name: '',
  });

  const { userInfo } = useTypedSelector((state) => state.auth); // Retrieve the currently logged-in user
  const { createTweet } = useTweetStore();

  const handleAddTweet = async (event: React.FormEvent) => {
    event.preventDefault();
    const tweetToCreate = { ...newTweet, userId: userInfo._id }; // Set userId from userInfo

    const { success } = await createTweet(tweetToCreate);

    if (success) {
      toast.success("Tweet Created Successfully");
    } else {
      toast.error("An Error Occurred on Creation");
    }

    setNewTweet({
      userId: '',
      description: '',
      likes: '',
      name: '',
    });
  };

  return (
    <div className='min-h-auto mt-5'>
      <p className="font-bold px-4 mb-10 text-4xl">Home</p>
      <form className="border-b-2 pb-8 px-4" onSubmit={handleAddTweet}>
        <textarea
          className="text-black bg-white w-full h-24 p-2 border-2 rounded-lg"
          placeholder="What’s happening?"
          maxLength={280}
          onChange={(e) => setNewTweet({ ...newTweet, description: e.target.value })}
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded-full ml-auto mt-2">
          Post
        </button>
      </form>
      <AllTweets />
    </div>
  );
};
