import { Request, Response } from 'express';
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')

// app.post('/publications/:id/comments'
const createdComment = async (req: Request, res: Response) => {
	const data = req.body

	try {

		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ message: `Post with id  not found.` });
			return;
		}
		const comment = new Comment(data);
		await comment.save();
		post.comments.push(comment._id);
		await post.save();

		return res.status(201).json({ message: "Post added successfully. ", comment: comment });

	}
	catch (error) {
		res.status(500).send(error);
	}

}

// );


// const deleteComment = async (req: Request, res: Response) => {

//         if (post) {
//             const index = user.beneficiaries.findIndex( c => c.id == req.params.comment)

//             if (index > -1) {
//               user.beneficiaries.splice(index, 1)
//               await user.save()

//               return res.json({ message: "comment deleted successfully." })
//             } else {
//               return res.status(400).json({ message: "Unable to find the comment." })
//             }
//           }
//       } 
//   };

const updateComment = async (req: Request, res: Response) => {

	try {
		const { postId, commentId } = req.params;
		const updatedComment = req.body;
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ message: 'post not found' });
		}

		const commentIndex = post.comments.findIndex((c: { _id: { toString: () => string; }; }) => c._id.toString() === commentId);

		if (commentIndex === -1) {
			return res.status(404).json({ message: 'Comment not found' });
		}

		post.comments[commentIndex] = updatedComment;
		await post.save();

		return res.json(post);
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: 'Failed to update comment' });
	}
}
export { createdComment, updateComment }