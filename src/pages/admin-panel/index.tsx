import { SetStateAction } from "react";
import Sidebar from "./Sidebar";

const AdminPanel = ({
  user,
  setUser,
}: {
  user: any;
  setUser?: React.Dispatch<SetStateAction<any>>;
}) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar user={user} setUser={setUser} />
      <div>
        {user?.email ||
          user?.displayName ||
          user?.providerData[0].email ||
          "Guest"}
        <h1>Admin Panel</h1>
      </div>
    </div>
  );
};

export default AdminPanel;
