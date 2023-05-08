import ErrorComponent from "components/errors/ErrorComponent";
import React from "react";
import { routes } from "routes";

const NotFound = () => {
  return (
    <div>
      <ErrorComponent
        img={"/assets/404.jpg"}
        message="Oops! Page not found."
        link={{ text: "Go Home", url: routes.index }}
      />
    </div>
  );
};

export default NotFound;
