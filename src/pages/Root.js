import { Outlet } from "react-router";
import classes from "./Root.module.css";
import Header from "../components/UI/Header/Header";

function Root() {
  return (
    <div className={classes.container}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
