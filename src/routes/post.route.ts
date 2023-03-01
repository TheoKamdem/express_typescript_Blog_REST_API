import { Router } from 'express';
import { createdPost, getAllPost, getOnePost } from '../controllers/post.controller';
import {createdComment, updateComment } from '../controllers/comment.controllers';
import multer from 'multer';
import { multerConfig } from '../config/multer';
// import { multer } from '../config/multer';

const postRoute = () => {
  const router = Router();


  /**
   * route to create a post : text and images then publish it
   */
  router.post('/post', multer(multerConfig).single('image'), createdPost)

   /**
   * route to display for all publications 
   */
  router.get('/showPost', getAllPost);


     /**
   * route to  Retrieve one publication
   */
  router.get('/showPost/:id', getOnePost);


    /**
   * route to create a comment : text 
   */
    router.post('/comment/:id',  createdComment)

  router.patch('/post/:postId/comment/:commentId', updateComment);

  // router.delete('/post/:id', ('Failed to update comment');

  return router;
};
export { postRoute };