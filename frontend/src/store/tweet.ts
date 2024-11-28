import { create } from "zustand";

interface Tweet {
  _id?: string;
  userId: string;
  description: string;
  likes: string;

}

interface TweetStore {
  tweets: Tweet[];
  settweets: (tweets: Tweet[]) => void;
  createTweet: (newTweet: Tweet) => Promise<{ success: boolean; message: string }>;
  fetchTweets: () => Promise<void>;
  deleteTweet: (pid: string) => Promise<{ success: boolean; message: string }>;
  updateTweet: (pid: string, updatedTweet: Partial<Tweet>) => Promise<{ success: boolean; message: string }>;
}

export const useTweetStore = create<TweetStore>((set) => ({
  tweets: [],
  settweets: (tweets) => set({ tweets }),

  createTweet: async (newTweet) => {
    if (
      !newTweet.description ||
      !newTweet.likes 

    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTweet),
    });
    const data = await res.json();
    set((state) => ({ tweets: [...state.tweets, data.data] }));
    return { success: true, message: "tweet created successfully" };
  },

  fetchTweets: async () => {
    const res = await fetch("/api/tweets");
    const data = await res.json();
    set({ tweets: data.data });
  },

  deleteTweet: async (pid) => {
    const res = await fetch(`/api/tweets/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

   
    set((state) => ({ tweets: state.tweets.filter((tweet) => tweet._id !== pid) }));
    return { success: true, message: data.message };
  },

  updateTweet: async (pid, updatedTweet) => {
    const res = await fetch(`/api/tweets/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTweet),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

   
    set((state) => ({
      tweets: state.tweets.map((tweet) => (tweet._id === pid ? data.data : tweet)),
    }));

    return { success: true, message: data.message };
  },
}));
