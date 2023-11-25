import { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = async (event) => {
    event.preventDefault();

    notificationCtx.showNotification({ title: "전송중", message: "데이터를 전송중입니다.", status: "pending" });
    //newsletter api
    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: emailRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      emailRef.current.value = "";
      notificationCtx.showNotification({
        title: "전송 완료",
        message: "데이터 전송을 완료했습니다..",
        status: "success",
      });
    } else {
      notificationCtx.showNotification({
        title: "전송 실패",
        message: "데이터 전송을 실패했습니다..",
        status: "error",
      });
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input type="email" id="email" ref={emailRef} placeholder="Your email" aria-label="Your email" />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
