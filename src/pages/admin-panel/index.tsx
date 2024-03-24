import Sidebar from "./Sidebar";

const AdminPanel = ({ user }: { user: any }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar user={user} />
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
