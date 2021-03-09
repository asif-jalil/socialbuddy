import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import FriendDetail from "./components/FriendDetail/FriendDetail";
import FriendList from "./components/FriendList/FriendList";
import Header from "./components/Header/Header";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import PostDetail from "./components/PostDetail/PostDetail";

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <NewsFeed></NewsFeed>
        </Route>
        <Route path="/friends">
          <FriendList></FriendList>
        </Route>
        <Route path="/friend/:friendId">
          <FriendDetail></FriendDetail>
        </Route>
        <Route path="/post/:postId">
          <PostDetail></PostDetail>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
