import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Home.module.css";
import { useState } from "react";
import axios from "axios";
import { ShowUsers } from "../components/ShowUsers";

export interface IFormState {
    id: number;
    name: string;
    email: string;
}

function Home() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormState>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: SubmitHandler<IFormState> = async (data) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_DB_PORT}/user`,
                data
            );
            if (response.data) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 3000)
                reset();
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {isSuccess ? (
                    <div className={styles.success}>Form Submitted!</div>
                ) : (
                    <>
                        <h1>GTA 6 - Leave a request</h1>
                        {errors.name && <p className={styles.errorInput}>Name is requried</p>}
                        <input
                            type="name"
                            placeholder="Enter Name:"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        {errors.email && <p className={styles.errorInput}>Email is requried</p>}
                        <input
                            type="email"
                            placeholder="Enter Email:"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        <button disabled={isLoading}>
                            {isLoading ? "Loading..." : "I Want A GTA!"}
                        </button>
                    </>
                )}
            </form>
            <ShowUsers />
        </div>
    );
}

export default Home;
