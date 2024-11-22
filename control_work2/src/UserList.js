import React from "react";

function UserList({ users, onDelete }) {
  return (
    <div>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>
                {user.first_name} {user.last_name}
              </span>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
