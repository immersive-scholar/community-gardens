import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, Redirect } from "react-router";
import Helmet from "react-helmet";
import { TypographyStyle, GoogleFont } from "react-typography";

import typography from "util/typography";
import ScrollToTop from "util/scrollToTop";
import NotFound from "pages/NotFound";
import TopNav from "components/molecules/TopNav";

import LoadableHome from "./loadables/LoadableHome";
import LoadableGardens from "./loadables/LoadableGardens";
import LoadableAbout from "./loadables/LoadableAbout";
import LoadableContact from "./loadables/LoadableContact";
import LoadableThreeContainer from "./loadables/LoadableThreeContainer";
import LoadableData from "./loadables/LoadableData";
import LoadableSolutions from "./loadables/LoadableSolutions";
import LoadableGallery from "./loadables/LoadableGallery";
import LoadableCredits from "./loadables/LoadableCredits";
import LoadableTechnicalDetails from "./loadables/LoadableTechnicalDetails";
import LoadableNCSUPresentation from "./loadables/LoadableNCSUPresentation";
import LoadablePresentation from "./loadables/LoadablePresentation";

class App extends Component {
  componentWillUpdate({ location, history }) {
    const gtag = window.gtag;

    if (location.pathname === this.props.location.pathname) {
      return;
    }

    if (history.action === "PUSH" && typeof gtag === "function") {
      gtag("config", "UA-117743172-2", {
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }
  render() {
    return (
      <div className="App">
        <Helmet
          title="Generative Artist lucastswick"
          description="lucastswick is a generative artist writing algorithms that describe natural phenomena."
        />
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
        <Router basename={process.env.PUBLIC_URL}>
          <div id="outer-container">
            <TopNav />
            <div id="page-wrap">
              <ScrollToTop>
                <Switch>
                  <Route exact path="/" component={LoadableHome} />
                  <Route exact path="/gardens" component={LoadableGardens} />
                  <Route exact path="/contact" component={LoadableContact} />
                  <Route
                    exact
                    path="/ncsu-presentation"
                    component={LoadableNCSUPresentation}
                  />
                  <Route
                    exact
                    path="/presentation"
                    component={LoadablePresentation}
                  />
                  <Route exact path="/about" component={LoadableAbout} />
                  <Route exact path="/data" component={LoadableData} />
                  <Route
                    exact
                    path="/solutions"
                    component={LoadableSolutions}
                  />
                  <Route exact path="/credits" component={LoadableCredits} />
                  <Route exact path="/gallery" component={LoadableGallery} />
                  <Route
                    exact
                    path="/tech"
                    component={LoadableTechnicalDetails}
                  />
                  <Switch>
                    <Redirect
                      from="/gardens/xmas-card"
                      to="/gardens/holiday-card"
                    />
                    <Redirect
                      from="/garden/xmas-card"
                      to="/gardens/holiday-card"
                    />
                    <Redirect
                      from="/garden/:gardenID"
                      to="/gardens/:gardenID"
                    />

                    {navigator.userAgent !== "ReactSnap" && (
                      <Route
                        path="/gardens/:gardenID"
                        component={LoadableThreeContainer}
                      />
                    )}
                    <Route component={NotFound} />
                  </Switch>
                  <Route component={NotFound} />
                </Switch>
              </ScrollToTop>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
