import React from "react";
import "./dashboard.scss";

const SideNavone = ({ children }) => {
  return (
    <div className="bod_overflow ">
      <div className="col-md-12 pt-1 pb-2 background_nav1_header">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-3 ">
                <img
                  className="img-fluid "
                  src="images/logoheader.png"
                  alt="not-found"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 text-right col6section m-auto">Welcome</div>
        </div>
      </div>
      <div className="col-md-12 px-0 overflow_main_dashboard">
        <div className="d-flex">
          <div className=" side_nav_main_1">
            <div className="col-md-12 pr-0 pl-1">
              <div className="col-md-12 height_fiz_menu_active">
                <div className="py-1">
                  <i class="fas fa-book-open d-flex justify-content-center"></i>
                </div>
              </div>
              <div className="col-md-12 height_fiz_menu">
                <div className="py-1">
                  <i class="far fa-user-circle d-flex justify-content-center"></i>
                </div>
              </div>
              <div className="col-md-12 height_fiz_menu">
                <div className="py-1">
                  <i class="fas fa-tools d-flex justify-content-center"></i>
                </div>
              </div>
              <div className="col-md-12 height_fiz_menu">
                <div className="py-1">
                  <i class="fas fa-chart-line d-flex justify-content-center"></i>
                </div>
              </div>
              <div className="col-md-12 height_fiz_menu">
                <div className="py-1">
                  <i class="far fa-clipboard d-flex justify-content-center"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="side_nav_1_right">
            <div className="col-md-12 background_sidenav_one ">
              {/* <div className="col-md-12 background_sidenav_two_t"> */}
              {children}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavone;
