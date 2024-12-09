import AboutComponent from "../Components/AboutComponent";
import ContactComponent from "../Components/ContactComponent";
import HomeComponent from "../Components/HomeComponent";
import LoginComponent from "../Components/LoginComponent";
import MoviesComponent from "../Components/MoviesComponent";
import NotfoundComponent from "../Components/NotfoundComponent";
import ProfileComponent from "../Components/ProfileComponent";
import RegisterComponent from "../Components/RegisterComponent";
import TodosComponent from "../Components/TodosComponent";

const RouterList = [{
    path: "/",
    name: "Home",
    element: HomeComponent,
    children: []
},
{
    path: "/about",
    name: "About",
    element: AboutComponent,
    children: []
},
{
    path: "",
    name: "More",
    element: "more",
    children: [{
        path: "/todos",
        name: "Todos",
        element: TodosComponent,
    },{
        path: "/movies",
        name: "Movies",
        element: MoviesComponent,
    }],
},
{
    path: "/contact",
    name: "Contact",
    element: ContactComponent,
    children: []
},{
    path: "",
    name: "Hi, ",
    element: "user",
    children: [{
        path: "/profile",
        name: "Profile",
        element: ProfileComponent,
    },{
        path: "",
        name: "Logout",
        element: '',
    }],
},
{
    path: "/login",
    name: "Login",
    element: LoginComponent,
    children: []
},
{
    path: "/register",
    name: "Register",
    element: RegisterComponent,
    children: []
},
{
    path: "*",
    name: "",
    element: NotfoundComponent,
    children: []
}]
export default RouterList;