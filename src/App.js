import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import Quiz from "./components/Pages/Quiz/Quiz";
import Result from "./components/Pages/Result/Result";
import Signup from "./components/Pages/Signup/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (

    <Router>
      <Switch>
        <AuthProvider>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/quiz/:videoId" >
              <Quiz></Quiz>
            </PrivateRoute>
            <PrivateRoute exact path="/result/:videoId">
              <Result></Result>
            </PrivateRoute>
          </Layout>
        </AuthProvider>

      </Switch>
    </Router>
  );
}

export default App;
