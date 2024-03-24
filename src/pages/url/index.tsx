import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getUrlFromId } from "../../firebase/firebaseApi";
import error from "../error/error.svg";

const loadFullUrl = async (id: string) => {
  console.log(121);
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
            window.location.href = "/";
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

    const id = url.split("/").pop() || window.location.href.split("/").pop();
    console.log(id);
    if (!id || id === "url") {
      //   window.location.href = "/";
      return;
    }

    loadFullUrl(id).then((fullUrl: string) => {
      console.log(123);
      setIsUrlExist(!!fullUrl);
      setIsLoading(false);
      if (fullUrl) {
        window.location.href = fullUrl;
      }
    });
  }, [url]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
