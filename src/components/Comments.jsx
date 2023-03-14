import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments } from "../utils/api";

function Comments() {
  const { review_id } = useParams();
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    getComments(review_id).then((comments) => {
      setCommentsData(comments);
      console.log(comments);
    });
  }, [review_id]);

  return (
   <div> 
   <ul className="commentsOnCard">
      {commentsData.length === 0 ? (
        <>
        <p>Be the first to comment!</p>
        <input type='text' placeholder='Add a comment...' />
        <button>Post</button>
        </>
        
      
      ) : (
        commentsData.map((comment) => {
          return (
            <div className="comments" key={comment.comment_id}>
              <p>User: {comment.author}</p>
              <p>Body: {comment.body}</p>
              <p>Votes: {comment.votes}</p>
              <p>Posted: {comment.created_at}</p>
              <button>Upvote</button>
              <button>Downvote</button>
              
              <br />
              <br />
            </div>
          );
        })
      )}
    </ul>
    </div>
  );
}

export default Comments;

