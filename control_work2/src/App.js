import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "./apiMethods";
import UserList from "./UserList";
import FilterBox from "./FilterBox";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredUsers(users); // Initialize filtered users
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
    setFilteredUsers(
      users.filter((user) =>
        user.first_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  return (
    <div className="App">
      <h2>Users from API:</h2>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Fetch Users"}
      </button>
      <FilterBox onFilter={handleFilter} />
      <UserList users={filteredUsers} onDelete={handleDelete} />
    </div>
  );
}

export default App;
