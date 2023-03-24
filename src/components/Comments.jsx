import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments } from "../utils/api";
import { postComment } from "../utils/api";

function Comments() {
  const { review_id } = useParams();
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState('')
  const [hasCommented, setHasCommented] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
 


  useEffect(() => {
    getComments(review_id).then((comments) => {
      setCommentsData(comments);
    });
  }, [review_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasCommented) {
      alert('You have already commented on this review!');
      return;
    }
    setIsPosting(true);
    postComment(newComment, review_id)
      .then((newCommentFromApi) => {
        console.log(newCommentFromApi);
        setCommentsData((currentComments) => {
          return [...currentComments, newCommentFromApi];
        });
        setNewComment('');
        setHasCommented(true);
        setIsPosting(false);

        alert('Comment posted thanks for your contribution!!');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
 
  return (
    <div> 
      <form className="commentAdder" onSubmit={handleSubmit}> 
        <label htmlFor='newComment'>Commenting as jessjelly</label>
        <br/>
        <textarea
        
        placeholder="Click here to add a comment!"
          id="newComment"
          value={newComment}
          className="commentBox"
          onChange={(event) => setNewComment(event.target.value)}
        />
        <br/>
        <br/>
        <button type='submit' className="upvoteButton" disabled={isPosting}>Post</button>
      </form>
      {hasCommented && <p className='commentTracker'> You have commented on this review</p>}
      <br/>
      <br/>

      <ul className="commentsOnCard">
        {commentsData.map((comment) => {
          return (
            <div className="comments" key={comment.comment_id}>
              <p><span className="CommentsHeaders">User:</span> {comment.author}</p>
              <p><span className="CommentsHeaders">Comment:</span>  {comment.body}</p>
              <p><span className="CommentsHeaders">Votes:</span>  {comment.votes}</p>
              <p><span className="CommentsHeaders">Date Posted:</span> {new Date(comment.created_at).toLocaleString({ dateStyle: 'full', timeStyle: 'short' })}</p>
             
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