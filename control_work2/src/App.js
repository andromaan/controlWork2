import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "./hooks/apiMethods";
import UserList from "./components/UserList";
import FilterBox from "./components/FilterBox";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

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

  const handleFilter = (searchText) => {
    const lowerSearchText = searchText.toLowerCase();
    setFilteredUsers(
      users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(lowerSearchText) ||
          user.last_name.toLowerCase().includes(lowerSearchText) ||
          user.email.toLowerCase().includes(lowerSearchText)
      )
    );
  };

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
