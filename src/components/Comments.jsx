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
   <button type='submit' disabled={isPosting}>Post</button>
    </form>
    {hasCommented && <p className='commentTracker'> You have commented on this review</p>}
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
