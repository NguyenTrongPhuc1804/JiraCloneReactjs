import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./components/Home/Header/Header";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import pageNotFound from "./pages/pageNotFound/pageNotFound";
import Profile from "./pages/Profile/Profile";
import TodoList from "./pages/TodoList/TodoList";
import TodoListRFC from "./pages/TodoListRFC/TodoListRFC";
import TodoListRedux from "./pages/TodoList/TodoListRedux";
import BaiTapToDoSaga from "./pages/BaiTapToDoSaga/BaiTapToDoSaga";
import Loading from "./components/GlobalSetting/Loading";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Modal from "./HOC/ModalComponent/Modal";
import LoginTemplate from "./templates/HomeTemplate/LoginTemplate";
import Hometemplate from "./templates/HomeTemplate/Hometemplate";
import LoginCyberBug from "./pages/Cyperbugs/LoginCyberBug/LoginCyberBug";
import LoginFormik from "./pages/Cyperbugs/LoginCyberBug/LoginCyberBug";
import JiraTemplate from "./templates/JiraTemplate/JiraTemplate";
import HomeJiraTemplate from "./templates/HomeTemplate/HomeJiraTemplate";
import CreateProject from "./pages/Cyperbugs/CreateProject/CreateProject";
import ManagerProject from "./pages/Cyperbugs/ManagerProject/ManagerProject";
import ModalJira from "./HOC/ModalComponent/JiraModal/ModalJira";
import IndexJira from "./pages/Cyperbugs/HomeJira/indexJira";
import SignUpJira from "./pages/Cyperbugs/SignUpJira/SignUpJira";
import DemoDragDrop from "./pages/Cyperbugs/demoDragDrop/DemoDragDrop";
import UserManagenet from "./pages/Cyperbugs/UserManagement/UserManagenet";

function App() {
  return (
    <div>
      <Loading />
      <Modal />
      <ModalJira />
      <Switch>
        {/* <Hometemplate exact path="/" Component={Home} /> */}
        <Hometemplate exact path="/contact" Component={Contact} />
        <Hometemplate exact path="/about" Component={About} />
        <LoginTemplate exact path="/" Component={LoginCyberBug} />
        <Hometemplate exact path="/login" Component={Login} />
        <Hometemplate exact path="/detail/:id" Component={Detail} />
        <Hometemplate exact path="/profile" Component={Profile} />
        <Hometemplate exact path="/todoList" Component={TodoList} />
        <Hometemplate exact path="/todoListRFC" Component={TodoListRFC} />
        <Hometemplate exact path="/todoListRedux" Component={TodoListRedux} />
        <Hometemplate exact path="/todoSaga" Component={BaiTapToDoSaga} />
        <Hometemplate exact path="/demoModalHOC" Component={DemoHOCModal} />
        <HomeJiraTemplate
          exact
          path="/jiraTemplate/:projectId"
          Component={IndexJira}
        />

        <HomeJiraTemplate
          exact
          path="/createProject"
          Component={CreateProject}
        />
        <HomeJiraTemplate
          exact
          path="/managerProject"
          Component={ManagerProject}
        />
        <LoginTemplate exact path="/signUp" Component={SignUpJira} />
        <Hometemplate exact path="/demoDrag" Component={DemoDragDrop} />
        <HomeJiraTemplate
          exact
          path="/userManagement"
          Component={UserManagenet}
        />

        {/* <HomeJiraTemplate exact path="/" Component={ManagerProject} /> */}

        {/* <Hometemplate exact path="*" Component={Home} /> */}
      </Switch>
    </div>
  );
}

export default App;
