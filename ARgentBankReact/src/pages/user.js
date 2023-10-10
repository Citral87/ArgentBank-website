import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../features/auth/authSlice';
import Button from '../components/buton';
import { setAuthToken, getUserProfile } from '../apiservice';

const User = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth.userInfo);

    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState("");
    const [editingUserName, setEditingUserName] = useState("");  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        console.log("Entering useEffect");
        const token = localStorage.getItem('token');
        if (!token) return; 
        setAuthToken(token);
        getUserProfile()
            .then((response) => {
                const updatedUserInfo = response.data.body; 
                setUserInfoState(updatedUserInfo);
            })
            .catch((error) => {
                console.error('Error fetching user profile', error);
            });
    
    }, [userInfo]);
    
    // Une fonction helper pour mettre à jour l'état local
    const setUserInfoState = (userInfo) => {
        setUserName(userInfo.userName || "");
        setFirstName(userInfo.firstName || "");
        setLastName(userInfo.lastName || "");
    };
    
    

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ userName: editingUserName }));
        setUserName(editingUserName);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
    
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back {userName}!</h1>
                {isEditing ? (
                    <>
                        <h2>Edit User Info</h2>
                        <form className="centered-form">
                            <label>
                                Username:
                                <input type="text" value={editingUserName} onChange={(e) => setEditingUserName(e.target.value)} />
                            </label>
                            <label>
                                First Name:
                                <input type="text" value={firstName} disabled />
                            </label>
                            <label>
                                Last Name:
                                <input type="text" value={lastName} disabled />
                            </label>
                            <Button className="buttonForm" onClick={handleUpdate} label="Save" />
                            <Button className="buttonForm" onClick={handleCancel} label="Cancel" />
                        </form>
                    </>
                ) : (
                    <Button className="edit-button" label="Edit Name" onClick={() => { setEditingUserName(userName); setIsEditing(true); }} />
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <div className="account">
    <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
        <p className="account-amount">$2,082.79</p>
        <p className="account-amount-description">Available Balance</p>
    </div>
    <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
    </div>
</div>

<div className="account">
    <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
        <p className="account-amount">$10,928.42</p>
        <p className="account-amount-description">Available Balance</p>
    </div>
    <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
    </div>
</div>

<div className="account">
    <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
        <p className="account-amount">$184.30</p>
        <p className="account-amount-description">Current Balance</p>
    </div>
    <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
    </div>
</div>

        </main>
    );
};

export default User;
