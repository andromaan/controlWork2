import React, { useState } from "react";
import { getUsers, deleteUser } from "./hooks/apiMethods";
import UserList from "./components/UserList";
import FilterBox from "./components/FilterBox";

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFilter = (text) => {
    setSearchText(text.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchText) ||
      user.last_name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText)
  );

  return (
    <div className="App">
      <h2>Users from API:</h2>
      <div className="d-flex align-items-center gap-3 mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={fetchUsers}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Users"}
        </button>
        <FilterBox onFilter={handleFilter} />
      </div>
      <UserList users={filteredUsers} onDelete={handleDelete} />
    </div>
  );
}

export default App;
