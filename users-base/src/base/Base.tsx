import { auth } from "../app/App";
import Table from "../table";
import css from "./index.module.css";

const Base = ({ userName, setIsAuthenticated }) => {
  const signOut = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      console.log("Logout completed successfully");
    } catch (error) {
      console.error("Error when logging out:", error);
    }
  };

  return (
    <div>
      <div className={css.user_info_wrapper}>
        <div className={css.user_info}>
            <p className={css.hello}>Hello,</p>
            <p className={css.user}>{userName}!</p>
        </div>
        <button onClick={signOut} className={css.button}>Sign out</button>
      </div>
      <Table />
    </div>
  );
};

export default Base;