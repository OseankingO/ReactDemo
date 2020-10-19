import React, { Component } from 'react';
import './App.css';

import PostInfo from './PostInfo/PostInfo'

class App extends Component{

  newUserId = 0;
  newTitle = "";
  newBody = "";

  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {id: 1, userId: 1, title: "Title1", body: "Body1"}, 
        {id: 2, userId: 2, title: "Title2", body: "Body2"},
        {id: 3, userId: 2, title: "Title3", body: "Body3"},
        {id: 4, userId: 3, title: "Title4", body: "Body4"},
        {id: 5, userId: 4, title: "Title5", body: "Body5"},
        {id: 6, userId: 4, title: "Title6", body: "Body6"},
        {id: 7, userId: 1, title: "Title7", body: "Body7"},
        {id: 8, userId: 1, title: "Title8", body: "Body8"},
      ],
      headers: ["Post Id", "User Id", "Title", "Body"]
    };
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
    this.newUserId = event.target.value;
  }

  updateNewTitle = (event, id) => {
    this.newTitle = event.target.value;
  }

  updateNewBody = (event, id) => {
    this.newBody = event.target.value;
  }

  addPost = () => {
    if(this.newUserId && this.newTitle && this.newBody) {
      let newPost = {userId: this.newUserId, title: this.newTitle, body: this.newBody};
      // post method and receive new unique Id
      newPost['id'] = this.state.posts[this.state.posts.length - 1].id + 1;
      const posts = [...this.state.posts];
      posts.push(newPost);
      console.log(newPost);
      this.setState({
        posts: posts
      });
      this.newUserId = 0;
      this.newTitle = "";
      this.newBody = "";
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
    //delete http request
  }

  updatePost = (postId) => {
    const postIndex = this.state.posts.findIndex(post => {
      return post.id === postId;
    });
    const post = this.state.posts[postIndex];
    console.log("Upudate");
    console.log(post);
    //update http request
  }

  render() {
    return (
      <div className="App">
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
                <input type="number" defaultValue={this.newUserId} onChange={this.updateNewUserId}></input>
              </td>
              <td>
                <input type="text" defaultValue={this.newTitle} onChange={this.updateNewTitle}></input>
              </td>
              <td>
                <input type="text" defaultValue={this.newBody} onChange={this.updateNewBody}></input>
              </td>
              <td>
                <button onClick={this.addPost}>add</button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
