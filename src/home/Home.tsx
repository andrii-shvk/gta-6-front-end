import styles from './Home.module.css'

function Home() {

  const isSuccess = false;

  return (
      <div className={styles.wrapper}>
        <form>
            {isSuccess ? (
                <div className={styles.success}>Form Submitted!</div>
            ) : (
                <>
                    <h1>GTA 6 - Leave a request</h1>
                    <input type="name" placeholder='Enter Name:' />
                    <input type="email" placeholder='Enter Email:' />
                    <button>I Want A GTA!</button>
                </>
            )}
        </form>
      </div>
  )
}

export default Home;
