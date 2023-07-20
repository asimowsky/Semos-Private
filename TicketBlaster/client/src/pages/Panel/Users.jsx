import React, { useEffect, useState } from "react";
import { PanelLayout } from "../../components/Layout/PanelLayout/PanelLayout";
import { UserCard } from "../../components/Content/UserCard/UserCard";
import axios from "axios";

export const Users = () => {
  const [userData, setUserData] = useState([]);
  const USER_ID = localStorage.getItem("userID");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8085/api/users");

      const users = response.data;
      const filteredUsers = users.filter((user) => user._id !== USER_ID);

      setUserData(filteredUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:8085/api/users/soft-delete/${userId}`,
        {
          isDeleted: true,
        }
      );

      // After successfully deleting the user, update the user data in the state.
      const updatedUsers = userData.filter((user) => user._id !== userId);
      setUserData(updatedUsers);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <PanelLayout header="Users">
        {userData?.map((user) => (
          <UserCard
            key={user?._id}
            user={user}
            handleDeleteUser={() => handleDeleteUser(user._id)}
          />
        ))}
      </PanelLayout>
    </div>
  );
};
