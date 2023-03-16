import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments } from "../utils/api";
import { postComment } from "../utils/api";

function Comments() {
  const { review_id } = useParams();
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState('')
  
  useEffect(() => {
    getComments(review_id).then((comments) => {
      setCommentsData(comments);
    });
  }, [review_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('review_id:', review_id);
    console.log('newComment:', newComment);
    console.log('username')
    postComment(newComment, review_id).then((newCommentFromApi) => {
      console.log(newCommentFromApi);
      setCommentsData((currentComments) => {
        return [...currentComments, newCommentFromApi]
      });
      setNewComment('');
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
<div> 
  <form className="commentAdder" onSubmit={handleSubmit}> 
   <label htmlFor='newComment'>Add a comment!</label>
   <br/>
    <br/>
   <textarea
   id="newComment"
   value={newComment}
   onChange={(event) => setNewComment(event.target.value)}
   />
    <br/>
    <br/>
   <button type='submit'>Post</button>
    </form>

    <br/>
    <br/>
   
    <ul className="commentsOnCard">
  {commentsData.map((comment) => {
    return (
      <div className="comments" key={comment.comment_id}>
        <p>User: {comment.author}</p>
        <p>Body: {comment.body}</p>
        <p>Votes: {comment.votes}</p>
        <p>Posted: {new Date(comment.created_at).toLocaleString({ dateStyle: 'full', timeStyle: 'short' })}</p>
        <button>Upvote</button>
        <button>Downvote</button>

        <br />
        <br />
      </div>
    );
  })}
</ul>

    </div>
  );
}

export default Comments;
