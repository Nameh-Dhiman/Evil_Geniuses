import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState({
    grades: false,
    assignments: false,
    pocketbuddy: false,
    talkToExpert: false,
  });

  useEffect(() => {
    let curLocation = window.location.pathname;
    if( curLocation === '/dashboard/grades'){
      setActive({
        ...active, 
        grades: true
      });
    }else if(curLocation === '/dashboard/assignments'){
      setActive({
        ...active,
        assignments: true,
      });
    }
    else if(curLocation === '/dashboard/pocketbuddy'){
      setActive({
        ...active,
        pocketbuddy: true,
      });
    }
    else if(curLocation === '/dashboard/talkToExpert'){
      setActive({
        ...active,
        talkToExpert: true,
      });
    }
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.SideNav}>
        <div
          className={
            !active.grades
              ? `${styles.SideNav_Item}`
              : `${styles.SideNav_Item} ${styles.SideNavItemActive}`
          }
          onClick={() => {
            navigate("/dashboard/grades");
            setActive({
              grades: true,
              assignments: false,
              pocketbuddy: false,
              talkToExpert: false,
            });
          }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-mortarboard"
              viewBox="0 0 16 16"
            >
              <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
              <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
            </svg>
          </div>
          <div>Grades</div>
        </div>
        <div
          className={
            !active.assignments
              ? `${styles.SideNav_Item}`
              : `${styles.SideNav_Item} ${styles.SideNavItemActive}`
          }
          onClick={() => {
            setActive({
              grades: false,
              assignments: true,
              pocketbuddy: false,
              talkToExpert: false,
            });
            navigate("/dashboard/assignments");
          }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-journal-bookmark"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"
              />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>
          </div>
          <div>Assignments</div>
        </div>
        <div
          className={
            !active.pocketbuddy
              ? `${styles.SideNav_Item}`
              : `${styles.SideNav_Item} ${styles.SideNavItemActive}`
          }
          onClick={() => {
            setActive({
              grades: false,
              assignments: false,
              pocketbuddy: true,
              talkToExpert: false,
            });
            navigate("/dashboard/pocketbuddy");
          }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-cash-coin"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
              />
              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
            </svg>
          </div>
          <div>Pocketbuddy</div>
        </div>
        <div
          className={
            !active.talkToExpert
              ? `${styles.SideNav_Item}`
              : `${styles.SideNav_Item} ${styles.SideNavItemActive}`
          }
          onClick={() => {
            setActive({
              grades: false,
              assignments: false,
              pocketbuddy: false,
              talkToExpert: true,
            });
            navigate("/dashboard/talkToExpert");
          }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-chat-left-text"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>
          <div>Talk to Expert</div>
        </div>
      </div>
      <div className={styles.Display}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
