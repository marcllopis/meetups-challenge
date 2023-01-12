import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation({ setPage, visible }) {
  return (
    <header
      className={`${classes.header} ${
        visible ? classes["header-visible"] : classes["header-hidden"]
      }`}
      data-test="navigation-header"
    >
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link
              style={{
                textDecoration: "none",
                fontSize: "1.5rem",
                color: "#fcb8d2",
              }}
              to="/"
            >
              All Meetups
            </Link>
          </li>
          <li>
            <Link
              style={{
                textDecoration: "none",
                fontSize: "1.5rem",
                color: "#fcb8d2",
              }}
              to="/new-meetup"
            >
              Add New Meetup
            </Link>
          </li>
          <li>
            <Link
              style={{
                textDecoration: "none",
                fontSize: "1.5rem",
                color: "#fcb8d2",
              }}
              to="/favorites"
            >
              My Favorites
              <span className={classes.badge}>{0}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
