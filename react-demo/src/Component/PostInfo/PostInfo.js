import React from 'react';

import './PostInfo.css';

function PostInfo(props) {
    return(
        <tr className="row">
            <td>
                {props.id}
            </td>
            <td>
                <input type="number" value={props.userId} onChange={props.updateUserId}></input>
            </td>
            <td>
                <input type="text" value={props.title} onChange={props.updateTitle}></input>
            </td>
            <td>
                <input type="text" value={props.body} onChange={props.updateBody}></input>
            </td>
            <td>
                <button onClick={props.update}>update</button>
            </td>
            <td>
                <button onClick={props.delete}>delete</button>
            </td>
        </tr>
    );
}

export default PostInfo;

// id={post.id} 
// userid={post.userid} 
// title={post.title} 
// body={post.body}
// delete={() => this.deletePost(post.id)}
// update={(event) => this.updatePost(event, post.id)}
// updateId={(event) => this.updateId(event, post.id)}
// updateUserId={(event) => this.updateUserId(event, post.id)}
// updateTitle={(event) => this.updateTitle(event, post.id)}
// updateBody={(event) => this.updateBody(event, post.id)}
                