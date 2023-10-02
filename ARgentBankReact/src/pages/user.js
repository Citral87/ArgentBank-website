import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  updateProfile } from '../features/auth/authSlice';
import Button from '../components/buton';
import { setAuthToken, getUserProfile } from '../apiservice'; 

const User = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth.userInfo); 
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if (userInfo) {
            setUserName(userInfo.userName || "");
            setFirstName(userInfo.firstName || "");
            setLastName(userInfo.lastName || "");
        } else { 
            const token = localStorage.getItem('token');
            console.log(token);
            if (token) {
                setAuthToken(token); 
                getUserProfile() 
                    .then((response) => {
                        console.log(response.data);
                        const userInfo = response.data; 
                        setUserName(userInfo.userName || "");
                        setFirstName(userInfo.firstName || "");
                        setLastName(userInfo.lastName || "");
                        
                    })
                    .catch((error) => {
                        console.error('Error fetching user profile', error);
                    });
            }
        }
    }, [userInfo]);
    

    const handleUpdate = (e) => {
        e.preventDefault(); 
        dispatch(updateProfile({ userName, firstName, lastName }));
        setIsEditing(false);
    };

   

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{userName || "Tony Jarvis"}!</h1>
                {isEditing ? (
                    <>
                        <h2>Edit User Info</h2>
                        <form className="centered-form">
                            <label>
                                User Name:
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </label>
                            <label>
                                First Name:
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                            <label>
                                Last Name:
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </label>
                            <Button className="buttonForm" onClick={handleUpdate} label="Save" />
                            <Button className="buttonForm" onClick={handleCancel} label="Cancel" />
                        </form>
                    </>
                ) : (
                    <Button className="edit-button" label="Edit Name" onClick={() => setIsEditing(true)} />
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <AccountSection
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
            />
            <AccountSection
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
            />
            <AccountSection
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
            />
        </main>
    );
};

const AccountSection = ({ title, amount, description }) => (
    <section className="account">
        <div className="account-content-wrapper">
            <h3 className="account-title">{title}</h3>
            <p className="account-amount">{amount}</p>
            <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
            <Button className="transaction-button" label="View transactions" />
        </div>
    </section>
);

export default User;
