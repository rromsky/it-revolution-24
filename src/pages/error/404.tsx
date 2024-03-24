import error from "./error.svg";
import "./style.css";

const Error404 = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-sm-6 col-12">
          <div className="text-warning gp-12">
            <h1 className="display-1 fw-bold">404</h1>
            <h6 className="lh-2">The page doesn't exist anymore.</h6>
            <img src={error} className="img-fluid" alt="Page not found image" />
            <div className="text-end">
              <a href="/" className="btn btn-light">
                Go to the Main Page.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
