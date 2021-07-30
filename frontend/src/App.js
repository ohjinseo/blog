import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Write from "./pages/Write/Write";
import Posts from "./pages/Posts/Posts";
import Category from "./pages/Category/Category";
import PostContent from "./pages/PostContent/PostContent";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";

function App() {
  const { userInfo } = useSelector((state) => state.userLoginReducer);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          {userInfo ? <Home /> : <Login />}
        </Route>

        <Route exact path="/write">
          {!userInfo ? <Redirect to="/" /> : <Write />}
        </Route>

        <Route exact path="/login">
          {userInfo ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route exact path="/register">
          {userInfo ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route exact path="/posts">
          {!userInfo ? <Redirect to="/" /> : <Posts />}
        </Route>

        <Route exact path="/category">
          {!userInfo ? <Redirect to="/" /> : <Category />}
        </Route>

        <Route exact path="/post/:postId">
          {!userInfo ? <Redirect to="/" /> : <PostContent />}
        </Route>

        <Route exact path="/profile/:userId">
          {!userInfo ? <Redirect to="/" /> : <Profile />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
