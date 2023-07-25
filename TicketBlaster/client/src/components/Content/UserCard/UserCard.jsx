import React, { useState } from "react";
import styles from "./UserCard.module.css";
import { GenericButton } from "../../Buttons/GenericButton";
import { ModalWrapper } from "../../Modal/ModalWrapper";
import axios from "axios";

export const UserCard = ({
  user,
  handleMakeAdmin,
  handleDeleteUser,
  handleMakeUser,
}) => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <img className={styles.image} src={user.image} alt={user.username} />
          <div className={styles.userInfo}>
            <p className={styles.username}>{user.fullName}</p>
            <p className={styles.email}>{user.email}</p>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.buttons}>
            {user?.isAdmin === false ? (
              <GenericButton
                onClick={openAdminModal}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #FF48AB",
                  width: "128px",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "13px",
                  height: "32px",
                }}
              >
                Make Admin
              </GenericButton>
            ) : (
              <GenericButton
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #FF48AB",
                  width: "128px",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "13px",
                  height: "32px",
                }}
                onClick={openUserModal}
              >
                Make User
              </GenericButton>
            )}
            <GenericButton
              onClick={openDeleteModal}
              style={{
                background: "black",
                width: "128px",
                fontWeight: "bold",
                color: "white",
                fontSize: "13px",
                height: "32px",
              }}
            >
              Delete User
            </GenericButton>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <ModalWrapper isOpen={isAdminModalOpen} onClose={closeAdminModal}>
        <div className={styles.flex}>
          <h2>Are you sure?</h2>
          <p>
            You are about to make a user administrator of the system. Please
            proceed with caution.
          </p>
          <div className={styles.modalButtons}>
            <GenericButton
              onClick={closeAdminModal}
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
                fontSize: "13px",
                height: "32px",
                marginRight: "8px",
              }}
            >
              Cancel
            </GenericButton>
            <GenericButton
              onClick={() => {
                handleMakeAdmin();
                closeAdminModal();
              }}
              style={{
                background: "black",
                color: "white",
                fontSize: "13px",
                height: "32px",
              }}
            >
              Make Admin
            </GenericButton>
          </div>
        </div>
      </ModalWrapper>

      <ModalWrapper isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <div className={styles.flex}>
          <h2>Are you sure?</h2>
          <p>You are about to delete a user. Please proceed with caution.</p>
          <div className={styles.modalButtons}>
            <GenericButton
              onClick={closeDeleteModal}
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
                fontSize: "13px",
                height: "32px",
                marginRight: "8px",
              }}
            >
              Cancel
            </GenericButton>
            <GenericButton
              onClick={() => {
                handleDeleteUser();
                closeDeleteModal();
              }}
              style={{
                background: "black",
                color: "white",
                fontSize: "13px",
                height: "32px",
              }}
            >
              Delete User
            </GenericButton>
          </div>
        </div>
      </ModalWrapper>

      <ModalWrapper isOpen={isUserModalOpen} onClose={closeUserModal}>
        <div className={styles.flex}>
          <h2>Are you sure?</h2>
          <p>
            You are about to make a admin to normal user of the system. Please
            proceed with caution.
          </p>
          <div className={styles.modalButtons}>
            <GenericButton
              onClick={closeAdminModal}
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
                fontSize: "13px",
                height: "32px",
                marginRight: "8px",
              }}
            >
              Cancel
            </GenericButton>
            <GenericButton
              onClick={() => {
                handleMakeUser();
                closeUserModal();
              }}
              style={{
                background: "black",
                color: "white",
                fontSize: "13px",
                height: "32px",
              }}
            >
              Make User
            </GenericButton>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};
