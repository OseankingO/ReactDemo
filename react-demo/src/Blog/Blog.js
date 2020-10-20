import Posts from "../Posts/Posts";

import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";

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
                                    color: '#fa923f'
                            }}>Posts</NavLink>
                        </div>
                        <div>
                            New Post
                        </div>
                    </nav>
                </header>
                <Switch>
                    <Route path="/posts" component={Posts} />
                    {/* <Route path="/new-post" component={Posts} /> */}
                    <Route render={() => <h1>Home Page</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;