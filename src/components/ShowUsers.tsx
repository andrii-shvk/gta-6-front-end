import { useState } from "react";
import axios from "axios";
import styles from "./ShowUsers.module.css";
import { IFormState } from "../home/Home";
import clsx from "clsx";

const ShowUsers = () => {
    const [isOpenWindow, setIsOpenWindow] = useState<boolean>(false);
    const [users, setUsers] = useState<IFormState[]>([]);
    const [editableUser, setIsEditableUser] = useState<number | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_DB_PORT}/user`
            );
            setUsers(response.data);
            setIsOpenWindow(true);
        } catch(e) {
            console.log("Error with fetching users", e);
        }
    };

    const hideUsers = () => {
        setIsOpenWindow(false);
    }

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`${import.meta.env.VITE_DB_PORT}/user/${id}`);
            fetchUsers();
        } catch(e) {
            console.log("Error with delete user", e)
        }
    };

    const editUser = (id: number) => {
        setIsEditableUser(id);
    }

    const updateUser = async (id: number) => {
        try {
            const userToUpdate = users.find((user) => user.id === id);
            await axios.put(`${import.meta.env.VITE_DB_PORT}/user`, userToUpdate);
            setIsEditableUser(null);
        } catch(e) {
            console.log("Error with update user", e)
        }
    };

    const handleInputChange = (id: number, field: keyof IFormState, value: string) => {
        setUsers((prevUsers) => prevUsers.map((user) => user.id === id ?
            {...user, [field]: value} : user
        ))
    }

    return (
        <div className={styles.block}>
            <button className={styles.btn} onClick={() => isOpenWindow ? hideUsers() : fetchUsers()}>
                {isOpenWindow ? "Hide all requests" : "Show all requests"}
            </button>
            <div className={clsx(styles.embla, { [styles.embla__hide]: !isOpenWindow })}>
                <div className={styles.users__block}>
                    {users?.map((user) => (
                        <div
                            key={user.id}
                            className={styles.embla__slide}>
                                <div className={styles.form__block}>
                                    <label>Name:</label>
                                    <input
                                        className={styles.form__input}
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => handleInputChange(user.id, "name", e.target.value)}
                                        disabled={user.id !== editableUser}
                                    />
                                </div>
                                <div className={styles.form__block}>
                                    <label>Email:</label>
                                    <input
                                        className={
                                            styles.form__input
                                        }
                                        type="email"
                                        value={user.email}
                                        onChange={(e) => handleInputChange(user.id, "email", e.target.value)}
                                        disabled={user.id !== editableUser}
                                    />
                                </div>
                                <button onClick={() => {user.id === editableUser 
                                    ? updateUser(user.id) : editUser(user.id)}}
                                    className={styles.btn}
                                >
                                    {user.id === editableUser ? "Confirm update" : "Update user"}
                                </button>
                                <button
                                    onClick={() => deleteUser(user.id)}
                                    className={styles.btn}
                                >
                                    Delete user
                                </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { ShowUsers };
