import { useAuth } from "@/contexts/auth";
import { useState } from "react";

const AuthComponent = () => {
  const { apiUrl, setApiUrl, login, logged, logout } = useAuth();
  const [user, setUser] = useState(
    process.env.NEXT_PUBLIC_USER ? process.env.NEXT_PUBLIC_USER : ""
  );
  const [pwd, setPwd] = useState(
    process.env.NEXT_PUBLIC_PWD ? process.env.NEXT_PUBLIC_PWD : ""
  );
  const [selectedMap, setSelectedMap] = useState("-1");

  // Handler for API URL input changes
  const handleApiUrlChange = (event) => {
    setApiUrl(event.target.value);
  };

  return (
    <div>
      {logged && (
        <div className="bg-gray-200 p-2  text-left">
          <div className="text-xs">
            Logged as <b>{user}</b>
          </div>
          <div className="text-xs">
            API: <b>{apiUrl}</b>
          </div>
          <button
            onClick={(e) => {
              logout();
            }}
            className="border border-gray-300 bg-black text-white rounded-md p-2 mt-1 text-xs"
          >
            Logout
          </button>
        </div>
      )}
      {!logged && (
        <div>
          <div className="mb-4 flex gap-1">
            <label className="w-32">API URL</label>
            <input
              type="text"
              value={apiUrl}
              onChange={handleApiUrlChange}
              placeholder="Enter API URL..."
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4 flex gap-1">
            <label className="w-32">User</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="User"
              disabled={logged}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4 flex gap-1">
            <label className="w-32">Password</label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              disabled={logged}
              placeholder="User"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <button
            onClick={(e) => {
              login(user, pwd);
            }}
            className="border border-gray-300 bg-black text-white rounded-md p-2"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
