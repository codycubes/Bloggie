import mongoose from "mongoose";
import Tweet from "../models/tweetModel.js";

export const getTweet = async (req, res) => {
	try {
		const tweets = await Tweet.find({});
		res.status(200).json({ success: true, data: tweets });
	} catch (error) {
		console.log("error in fetching tweets:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createTweet = async (req, res) => {
	const tweet = req.body; 

	if (!tweet.description || 
        !tweet.likes) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newTweet = new Tweet(tweet);

	try {
		await newTweet.save();
		res.status(201).json({ success: true, data: newTweet });
	} catch (error) {
		console.error("Error in Create tweet:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateTweet = async (req, res) => {
	const { id } = req.params;

	const tweet = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid tweet Id" });
	}

	try {
		const updatedTweet = await Tweet.findByIdAndUpdate(id, tweet, { new: true });
		res.status(200).json({ success: true, data: updatedTweet });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteTweet = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Tweet Id" });
	}

	try {
		await Tweet.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Tweet deleted" });
	} catch (error) {
		console.log("error in deleting tweet:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};