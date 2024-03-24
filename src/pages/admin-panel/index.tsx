import { SetStateAction, useState } from "react";
import Sidebar from "./Sidebar";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../shared/theme";
import AdminTable from "./AdminTable";
import { addNewUrl } from "../../firebase/firebaseApi";
//@ts-ignore
import shortid from "shortid";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

const AddUrlModal = ({
  setIsPopupOpen,
  setData,
}: {
  setIsPopupOpen: any;
  setData: any;
}) => {
  const [url, setUrl] = useState("");
  return (
    <div className="popup-overlay">
      <div className="overlay" onClick={() => setIsPopupOpen(false)}></div>
      <div className="popup" onClick={(e) => e.preventDefault()}>
        <div className="popup-content">
          <h2>Додати URL</h2>
          <input
            type="text"
            className="authorization-input"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className="authorization-buttons">
            <Button
              color="warning"
              onClick={() => {
                const id = shortid.generate();

                addNewUrl({ id, url })
                  .then((newUrl: any) => {
                    toast.success("Успішно додано URL");
                    setData((prevState: any) => [...prevState, newUrl]);
                    setIsPopupOpen(false);
                  })
                  .catch(() => {
                    toast.error("Помилка додавання URL");
                    setIsPopupOpen(false);
                  });
              }}
            >
              Додати
            </Button>
            <Button onClick={() => setIsPopupOpen(false)}>Закрити</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = ({
  user,
  setUser,
}: {
  user: any;
  setUser?: React.Dispatch<SetStateAction<any>>;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: colors.grey[900],
      }}
    >
      <Sidebar user={user} setUser={setUser} />
      <div style={{ width: "100%" }}>
        <div>
          <h1 style={{ color: colors.greenAccent[400], marginLeft: 14 }}>
            Admin Panel
          </h1>
          <Button
            color="secondary"
            onClick={() => {
              setIsPopupOpen((prevState) => !prevState);
            }}
          >
            Add new URL
          </Button>
          <AdminTable data={data} />
        </div>
      </div>
      {isPopupOpen && (
        <AddUrlModal setData={setData} setIsPopupOpen={setIsPopupOpen} />
      )}
    </div>
  );
};

export default AdminPanel;
