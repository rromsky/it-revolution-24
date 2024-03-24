import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getUrlFromId } from "../../firebase/firebaseApi";
import error from "../error/error.svg";

const loadFullUrl = async (id: string) => {
  const url = await getUrlFromId({ id });

  return url;
};

const DisplayText = () => {
  return (
    <div>
      <CircularProgress />
      <h3>You will be redirected right now.</h3>
    </div>
  );
};
const DisplayUrlNotFound = () => {
  return (
    <div>
      <img src={error} alt="error" style={{ width: 512 }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Url not found.</h3>
        <Button
          onClick={() => {
            window.location.href = window.location.href
              .split("/")
              .slice(0, -2)
              .join("/");
          }}
          color="warning"
        >
          Go to home
        </Button>
      </div>
    </div>
  );
};

const UrlPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [url] = useState(window.location.href);
  const [isUrlExist, setIsUrlExist] = useState(true);

  useEffect(() => {
    if (!url && !window.location.href) {
      return;
    }

    const id =
      url.split("/").pop() || window.location.href.split("/").pop() || "";

    if (!id) {
      setIsUrlExist(false);
      setIsLoading(false);
      return;
    }

    loadFullUrl(id)
      .then((fullUrl: string) => {
        console.log(123);
        setIsUrlExist(!!fullUrl);
        setIsLoading(false);
        if (fullUrl) {
          window.location.href = fullUrl;
        }
      })
      .catch(() => {
        setIsUrlExist(false);
        setIsLoading(false);
      });
  }, [url]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : isUrlExist ? (
        <DisplayText />
      ) : (
        <DisplayUrlNotFound />
      )}
    </div>
  );
};

export default UrlPage;
