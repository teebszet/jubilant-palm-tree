import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="detail/:id" element={<Detail />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);

function Layout() {
  return (
    <div>
      <nav></nav>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>lookup here</h2>
    </div>
  );
}

function Detail() {
  const { id } = useParams();
  return (
    <div>
      <h2>details here: {id}</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
