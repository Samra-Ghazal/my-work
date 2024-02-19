import React, { Suspense, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import routes from "./Routes/AllRoutes";
import { PublicRoute } from "./Routes/PublicRoute";
import LoadingScreen from "./Shared/HelperMethods/LoadingScreen";
import Layout from "./Pages/Layout";
// import CustomizedSnackbars from "./Calendar/scheduler/components/AlertToast";
// import { EntityContext, SelectedDateContext } from "./context";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ErrorBoundary from "./ErrorBoundry";

function withLayout(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <>
          <Layout>
            <WrappedComponent></WrappedComponent>
          </Layout>
        </>
      );
    }
  };
}

function RouteProgress(props) {
  return <Route {...props} />;
}

function App() {
  const [value, setValue] = useState([]);
  const [entity, setEntity] = useState([]);
  return (
    <ErrorBoundary>
      <React.Fragment>
        {/* <SelectedDateContext.Provider value={[value, setValue]}> */}
        {/* <EntityContext.Provider value={[entity, setEntity]}> */}
        <GoogleReCaptchaProvider
          className="grecaptcha-badge"
          reCaptchaKey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
        >
          <div className="">
            <Suspense fallback={<LoadingScreen />}>
              <Switch>
                {routes.map((route, i) => {
                  const Component = route.component;
                  return (
                    <RouteProgress
                      key={i}
                      path={route.path}
                      exact={route.exact}
                      render={(props) => (
                        <PublicRoute props={props} Component={Component} />
                      )}
                    />
                  );
                })}
              </Switch>
            </Suspense>
          </div>
        </GoogleReCaptchaProvider>
        {/* </EntityContext.Provider>
        </SelectedDateContext.Provider> */}
        {/* <CustomizedSnackbars /> */}
      </React.Fragment>
    </ErrorBoundary>
  );
}

export default App;
