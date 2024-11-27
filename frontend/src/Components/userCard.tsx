import React from 'react'
import { useSelector, TypedUseSelectorHook } from 'react-redux';

interface CardProps {
    _id: string;
    name: string;
    host: string;
    description: string;
    genre: string;
    image: string;
  }



const userCard = () => {

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const { userInfo } = useTypedSelector((state) => state.auth);
    
  return (
    <div>
        <h1>{userInfo.name}</h1>
      
    </div>
  )
}

export default userCard
