import Axios from 'axios';
import React, { Component } from 'react';
import './NewPost.css';

class NewPost extends Component {

    state = {
        newPost: {id: 0, userId: undefined, title: "", body: ""},
        headers: ["Post Id", "User Id", "Title", "Body"]
    };

    updateNewUserId = (event) => {
        const post = {...this.state.newPost};
        post.userId = event.target.value;
        this.setState({
            newPost:post
        });
    }

    updateNewTitle = (event, id) => {
        const post = {...this.state.newPost};
        post.title = event.target.value;
        this.setState({
            newPost:post
        });
    }

    updateNewBody = (event, id) => {
        const post = {...this.state.newPost};
        post.body = event.target.value;
        this.setState({
            newPost:post
        });
    }

    addPost = () => {
        if(this.state.newPost.userId && this.state.newPost.title && this.state.newPost.body) {
            const newPost = {...this.state.newPost};
            Axios.post('/posts', newPost).then(response => {
                newPost['id'] = response.data.id;
                console.log(newPost);
                this.setState({
                    newPost: {id: 0, userId: 0, title: "", body: ""}
                });
                console.log(this.props);
                this.props.history.replace('/posts');
            });
        } else {
            alert("Please have input!")
        }
    }
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        {this.state.headers.map((colName, index) => {
                        return (
                            <th key={index}>{colName}</th>
                        )
                        })}
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                        <   input type="number" value={this.state.newPost.userId} onChange={this.updateNewUserId}></input>
                        </td>
                        <td>
                            <input type="text" value={this.state.newPost.title} onChange={this.updateNewTitle}></input>
                        </td>
                        <td>
                            <input type="text" value={this.state.newPost.body} onChange={this.updateNewBody}></input>
                        </td>
                        <td>
                        <   button onClick={this.addPost}>add</button>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default NewPost;