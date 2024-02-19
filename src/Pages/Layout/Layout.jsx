import React from "react";
import SideBar from "../../Shared/SideBar";
import TopBar from "../../Shared/TopBar";
import styles from "./style.module.scss";

// render if Auth Layout
const AuthLayoutContent = (props) => {
  return (
    <React.Fragment>
      <div className="col-sm-12 p-0">
        {/* <TopBar /> */}
        {/* <SideBar /> */}
        <div className={styles.contentPage}>
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default function Layout(props) {
  return (
    <React.Fragment>
      <AuthLayoutContent {...props} />
    </React.Fragment>
  );
}
