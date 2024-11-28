import React, { useEffect } from 'react';
import { useTweetStore } from '../store/tweet';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

interface CardProps {
  _id: string;
  description: string;
  likes: string;
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Card: React.FC<CardProps> = ({ _id, description, likes }) => {
  const { userInfo } = useTypedSelector((state) => state.auth);

  return (
    // <Link to={`/tweets/${_id}`}>
    <div className="rounded-lg shadow-md text-start overflow-hidden h-auto p-4 hover:bg-zinc-900">
      <div className="py-4">
        <h2>@{userInfo.name}</h2>
        <h2 className="font-bold text-lg">{description}</h2>
        <p>{likes}</p>
      </div>
    </div>
    // </Link>
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
        <Card key={tweet._id} _id={tweet._id} description={tweet.description} likes={tweet.likes} />
      ))}
    </div>
  );
};

export default AllTweets;
