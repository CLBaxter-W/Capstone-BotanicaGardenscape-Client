import { Routes, Route } from "react-router-dom";
import store from "./app/store.js";
import { Provider } from "react-redux";

import Nav_Bar from "./components/Nav_Bar";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Garden_model from "./components/Garden_model";
import User from "./components/User";
import Protected from "./components/Protected.jsx";
import Home from "./components/Home";

function App() {
  return (
    <Provider store={store}>
      <Nav_Bar />
      <Routes>
        <Route path="/user/" element={<Protected />}>
          <Route path="/user/" element={<User />}></Route>
        </Route>
        <Route path="/garden" element={<Protected />}>
          <Route path="/garden" element={<Garden_model />}></Route>
        </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
