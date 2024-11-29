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
    <div>
      <p className="font-bold pl-2 my-2">Username</p>
      <form className="border-b-2 pb-6" onSubmit={handleAddTweet}>
        <textarea
          className="text-black w-full p-2 border border-slate-300 rounded-lg"
          placeholder="What’s happening?"
          maxLength={280}
          onChange={(e) => setNewTweet({ ...newTweet, description: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-full ml-auto mt-2">
          Post
        </button>
      </form>
      <AllTweets />
    </div>
  );
};
