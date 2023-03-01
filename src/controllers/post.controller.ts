import { Request, Response } from 'express';
const Post = require('../models/post.model')
import multer from 'multer';




/**
 * function  to create a post : content, title   and images then publish it
 */
const createdPost = async (req: Request, res: Response) => {
	const data = req.body

	try {

		let newPost = new Post(data)
		await newPost.save()

		// if (data.title === 0) {
		// 	return res.status(422).json({
		// 		message: 'At least the title of the publication is required',
		// 	});
		// }
		return res.status(201).json({ message: "Post added successfully. ", data: newPost });
	}
	catch (error) {
		res.status(500).send(error);
	}

}


/**
 * function to display for all publications 
 */
const getAllPost = async (req: Request, res: Response) => {
	const posts = await Post.find().populate('comments').sort('-createdAt').exec();

	return res.status(200).json({ data: posts });
};

/**
 * function to  Retrieve one publication and commets
 */
const getOnePost = async (req: Request, res: Response) => {
	const { id } = req.params;

	const post = await Post.findOne({ _id: id }).populate('comments');

	if (!post) {
		return res.status(404).json({ message: `Post with id "${id}" not found.` });
	}

	return res.status(200).json({ data: post });
};

const updatePost = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, image, comment } = req.body;

	const post = await Post.findOne({ _id: id });

	if (!post) {
		return res.status(404).json({ message: `Post with id "${id}" not found.` });
	}

	if (!title) {
		return res.status(422).json({ message: 'The field and title are required' });
	}

	await Post.updateOne({ _id: id }, { title, image, comment });

	const postUpdated = await Post.findById(id, { title, image, comment });

	return res.status(200).json({ data: postUpdated });
};







export { createdPost, getAllPost, getOnePost };
