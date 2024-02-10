import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  // notice that for react-router-dom v6, we should use different syntax
  // <Routes>
  //      <Route path="/" exact element={ <Home /> }/>
  //      <Route path="/auth" exact element={ <Auth /> } />
  //  </Routes>
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) {
      setUserInfo(user);
    }
  }, []);
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />

        <Switch>
          <Route
            path="/"
            exact
            component={() => <Home userInfo={userInfo} />}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
          <Route
            path="/posts"
            exact
            component={() => <Home userInfo={userInfo} />}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
          <Route
            path="/posts/search"
            exact
            component={() => <Home userInfo={userInfo} />}
          />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route
            path="/auth"
            exact
            component={() => (!userInfo ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
