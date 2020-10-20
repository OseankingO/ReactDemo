import Axios from 'axios';
import React, { Component } from 'react';
import PostInfo from '../PostInfo/PostInfo';
import './Posts.css';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            headers: ["Post Id", "User Id", "Title", "Body"],
            newPost: {id: 0, userId: undefined, title: "", body: ""}
        };
    }

    componentDidMount() {
        Axios.get('/posts').then(response => {
            const posts = response.data;
            this.setState({
                posts:posts
            });
        });
    }

    updateUserId = (event, id) => {
        const postIndex = this.state.posts.findIndex(post => {
            return post.id === id;
        });
        const post = {...this.state.posts[postIndex]};
        post.userId = event.target.value;
        const posts = [...this.state.posts];
        posts[postIndex] = post;
        this.setState({
            posts:posts
        });
    }

    updateTitle = (event, id) => {
        const postIndex = this.state.posts.findIndex(post => {
            return post.id === id;
        });
        const post = {...this.state.posts[postIndex]};
        post.title = event.target.value;
        const posts = [...this.state.posts];
        posts[postIndex] = post;
        this.setState({
            posts:posts
        });
    }

    updateBody = (event, id) => {
        const postIndex = this.state.posts.findIndex(post => {
            return post.id === id;
        });
        const post = {...this.state.posts[postIndex]};
        post.body = event.target.value;
        const posts = [...this.state.posts];
        posts[postIndex] = post;
        this.setState({
            posts:posts
        });
    }

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
                const posts = [...this.state.posts];
                posts.push(newPost);
                console.log(newPost);
                this.setState({
                    posts: posts,
                    newPost: {id: 0, userId: 0, title: "", body: ""}
                });
            });
        } else {
            alert("Please have input!")
        }
    }

    deletePost = (postId) => {
        const postIndex = this.state.posts.findIndex(post => {
            return post.id === postId;
        });
        const posts = [...this.state.posts];
        posts.splice(postIndex, 1);
        this.setState({
            posts:posts
        });
        console.log("Delete");
        console.log(postId);
        Axios.delete('/posts/' + postId).then(response => {
            console.log(response);
        });
    }

    updatePost = (postId) => {
        const postIndex = this.state.posts.findIndex(post => {
            return post.id === postId;
        });
        const post = this.state.posts[postIndex];
        Axios.put('/posts/' + postId, post).then(response => {
            console.log(response);
        });
    }

    render() {
        return (
            <div className="posts-display">
                <table id="posts">
                    <thead>
                        <tr>
                            {this.state.headers.map((colName) => {
                            return (
                                <th>{colName}</th>
                            )
                            })}
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((post, index) => {
                        return (
                            <PostInfo
                                id={post.id} 
                                userId={post.userId} 
                                title={post.title} 
                                body={post.body}
                                updateUserId={(event) => this.updateUserId(event, post.id)}
                                updateTitle={(event) => this.updateTitle(event, post.id)}
                                updateBody={(event) => this.updateBody(event, post.id)}
                                delete={() => this.deletePost(post.id)}
                                update={(event) => this.updatePost(post.id)}
                            />
                        )
                        })}
                        <tr className="row">
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
            </div>
        );
    }
}

export default Posts;