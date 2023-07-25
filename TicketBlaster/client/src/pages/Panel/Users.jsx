import React, { useEffect, useState } from "react";
import { PanelLayout } from "../../components/Layout/PanelLayout/PanelLayout";
import { UserCard } from "../../components/Content/UserCard/UserCard";
import axios from "axios";
import toast from "react-hot-toast";
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

  const handleMakeAdmin = async (userId) => {
    try {
      await axios.patch(`http://localhost:8085/api/users/role/${userId}`, {
        isAdmin: true,
      });

      toast.success("user role changed to admin");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };
  const handleMakeUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:8085/api/users/role/${userId}`, {
        isAdmin: false,
      });
      toast.success("admin role changed to user");
      fetchUsers();
    } catch (err) {
      console.error(err);
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
      toast.success("user deleted successfully");
      fetchUsers();
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
            handleMakeAdmin={() => handleMakeAdmin(user?._id)}
            handleDeleteUser={() => handleDeleteUser(user?._id)}
            handleMakeUser={() => handleMakeUser(user?._id)}
          />
        ))}
      </PanelLayout>
    </div>
  );
};
