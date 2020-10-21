import Posts from "../Posts/Posts";

import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import NewPost from "../NewPost/NewPost";

class Blog extends Component {
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <div>
                            <NavLink
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'none'
                                }}
                            >Posts</NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/new-post"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'none'
                                }}
                            >New Post</NavLink>
                        </div>
                    </nav>
                </header>
                <Switch>
                    <Route path="/posts" component={Posts} />
                    <Route path="/new-post" component={NewPost} />
                    <Route render={() => <h1>Home Page</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;