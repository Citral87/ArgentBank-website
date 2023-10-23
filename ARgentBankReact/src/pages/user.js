import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfile,
  setUserName,
  loginSuccess,
} from "../features/auth/authSlice";
import Button from "../components/buton";
import { setAuthToken, getUserProfile } from "../apiservice";
import { useNavigate } from "react-router-dom";
import Account from '../components/account';


const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [isEditing, setIsEditing] = useState(false);
  const [localUserName, setLocalUserName] = useState("");
  const [editingUserName, setEditingUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }
    setAuthToken(token);
    getUserProfile()
      .then((response) => {
        const updatedUserInfo = response.data.body;
        setUserInfoState(updatedUserInfo);
        dispatch(loginSuccess(updatedUserInfo));
      })
      .catch((error) => {});
  }, [dispatch, navigate]);

  const setUserInfoState = (userInfo) => {
    setLocalUserName(userInfo.userName || "");
    setFirstName(userInfo.firstName || "");
    setLastName(userInfo.lastName || "");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ userName: editingUserName }));
    setEditingUserName(editingUserName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back {localUserName}!</h1>
        {isEditing ? (
          <>
            <h2>Edit User Info</h2>
            <form className="centered-form">
              <label>
                Username:
                <input
                  type="text"
                  value={editingUserName}
                  onChange={(e) => setEditingUserName(e.target.value)}
                />
              </label>
              <label>
                First Name:
                <input type="text" value={firstName} disabled />
              </label>
              <label>
                Last Name:
                <input type="text" value={lastName} disabled />
              </label>
              <Button
                className="buttonForm"
                onClick={handleUpdate}
                label="Save"
              />
              <Button
                className="buttonForm"
                onClick={handleCancel}
                label="Cancel"
              />
            </form>
          </>
        ) : (
          <Button
            className="edit-button"
            label="Edit Name"
            onClick={() => {
              setEditingUserName(localUserName);
              setIsEditing(true);
            }}
          />
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>

        <Account
            title="Argent Bank Checking"
            accountNumber="x8349"
            amount="2,082.79"
            description="Available Balance"
        />

        <Account
            title="Argent Bank Savings"
            accountNumber="x6712"
            amount="10,928.42"
            description="Available Balance"
        />

        <Account
            title="Argent Bank Credit Card"
            accountNumber="x8349"
            amount="184.30"
            description="Current Balance"
        />
    </main>

  );
};

export default User;
