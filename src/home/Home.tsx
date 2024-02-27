import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Home.module.css'

const isSuccess = false;
interface IFormState {
    name: string,
    email: string
}

function Home() {
    const {register, handleSubmit} = useForm<IFormState>();

    const onSubmit: SubmitHandler<IFormState> = (data) => {
        console.log(data);
    }

  return (
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
            {isSuccess ? (
                <div className={styles.success}>Form Submitted!</div>
            ) : (
                <>
                    <h1>GTA 6 - Leave a request</h1>
                    <input type="name" placeholder='Enter Name:' {...register('name')}/>
                    <input type="email" placeholder='Enter Email:' {...register('email')}/>
                    <button>I Want A GTA!</button>
                </>
            )}
        </form>
      </div>
  )
}

export default Home;
