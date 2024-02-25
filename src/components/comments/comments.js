import "./comments.css";
import { useState } from "react";

const Comments = ({ comments, handleAddComments,handleCommentDelete }) => {
  const [showInput, setShowInput] = useState(false);
  const [commentBody, setCommentBody] = useState("");

  const handleAdd =()=>{
    let newComment = {
      id: Date.now(),
      text:commentBody,
      replies:[],
    }
    handleAddComments(comments.id,newComment);
    setShowInput(false);
  }

  return (
    <div>
      <div className={`${comments.text && "comment-container"}`}>
        <h3>{comments.text}</h3>
        {showInput && <input type="text" autoFocus onChange = {(e)=>setCommentBody(e.target.value)}/>}
        {showInput? (
          <div>
          <button onClick={handleAdd}>Add</button>
          <button onClick ={()=> setShowInput(false)}>Cancel</button>
        </div>
        ) : comments.text ? (
        <div>
          <button onClick={() => setShowInput(true)}>Reply</button>
          <button onClick ={()=> handleCommentDelete(comments.id)}>Delete</button>
        </div>):null
      }
  
      </div>
      <div style={{ paddingLeft:25 }}>
        {comments?.replies?.map((ele) =>(
          <Comments key = {ele.id} comments ={ele} handleAddComments={handleAddComments} handleCommentDelete ={handleCommentDelete}/>
        ))}
      </div>
    </div>
  );
};

export default Comments;
