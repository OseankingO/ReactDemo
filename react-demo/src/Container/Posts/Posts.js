import Axios from 'axios';
import React, { Component } from 'react';
import PostInfo from '../../Component/PostInfo/PostInfo';
import './Posts.css';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            headers: ["Post Id", "User Id", "Title", "Body"]
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
                        {this.state.posts.map((post) => {
                        return (
                            <PostInfo
                                key={post.id} 
                                id={post.id} 
                                userId={post.userId} 
                                title={post.title} 
                                body={post.body}
                                updateUserId={(event) => this.updateUserId(event, post.id)}
                                updateTitle={(event) => this.updateTitle(event, post.id)}
                                updateBody={(event) => this.updateBody(event, post.id)}
                                delete={() => this.deletePost(post.id)}
                                update={() => this.updatePost(post.id)}
                            />
                        )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Posts;