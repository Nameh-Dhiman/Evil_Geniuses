import React from "react";
import styles from "./PocketBuddy.module.scss";
// import axios from "axios";
// import { useEffect } from "react";
import { useState } from "react";

const PocketBuddy = () => {
  const [editBudget, setEditBudget] = useState(false);

  const changeBudget = async() => {
    alert("Budget Updated!");
  };

  const reminderHandler = async() => {
    alert("Reminder has been set");
  };

  return (
    <div className={styles.Container}>
      <p className={styles.PageTitle}>PocketBuddy</p>
      <div className={styles.PersonalBudget}>
        <p className={styles.PageTitle} style={{ fontSize: "1.2rem" }}>
          Manage your Expenses
        </p>
        {!editBudget ? (
          <div className={styles.EditBudget}>
            <button
              className={styles.Buttons}
              onClick={() => setEditBudget(true)}
            >
              Edit your Budget
            </button>
          </div>
        ) : (
          <>
            <div className={styles.InputContainer}>
              <input
                placeholder="Enter your Budget..."
                className={styles.ContainerInput}
                name="budget"
              />
              <label className={styles.ContainerLabel}>Budget</label>
            </div>
            <button
              onClick={() => {
                changeBudget();
                setEditBudget(false);
              }}
              className={styles.Buttons}
            >
              Save
            </button>
          </>
        )}

        <div className={styles.InputContainer}>
          <input
            placeholder="Enter Today's Expenditure..."
            className={styles.ContainerInput}
            name="spent"
          />
          <label className={styles.ContainerLabel}>Today's Expenditure</label>
        </div>
        <div className={styles.RemBudget}>Rs. 3000</div>
        <div className={styles.DailyBudget}>Rs. 100 per Day</div>
        <div className={styles.Reminder}>
          <label> Set Time for Reminder</label>
          <input type="time" />
          <button onClick={reminderHandler} className={styles.Buttons}>
            Set
          </button>
        </div>
      </div>
      <div className={styles.Loan}>
        <p className={styles.PageTitle} style={{ fontSize: "1.2rem" }}>
          Get a loan from your PocketBuddy!
        </p>
        <div className={styles.Total}>Amount to be Repayed: Rs. 500</div>
        <div className={styles.LoanAmount}>
          <select>
            <option value="">Amount</option>
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="750">750</option>
            <option value="1000">1000</option>
            <option value="1500">1500</option>
            <option value="2000">2000</option>
          </select>
        </div>
        <div className={styles.RepayDuration}>
          <select>
            <option value="">Tenure</option>
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="9">9 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>
        <div className={styles.DisperseAmount}>
          <p className={styles.PageTitle} style={{ fontSize: "1rem" }}>
            Bank Details
          </p>
          <div className={styles.InputContainer}>
            <input
              placeholder="Enter your Bank Name..."
              className={styles.ContainerInput}
              name="bankname"
            />
            <label className={styles.ContainerLabel}>Bank Name</label>
          </div>
          <div className={styles.InputContainer}>
            <input
              placeholder="Enter your Account Number..."
              className={styles.ContainerInput}
              name="accountnumber"
            />
            <label className={styles.ContainerLabel}>Account Number</label>
          </div>
          <div className={styles.InputContainer}>
            <input
              placeholder="Enter your IFSC Code..."
              className={styles.ContainerInput}
              name="ifsc"
            />
            <label className={styles.ContainerLabel}>IFSC</label>
          </div>
        </div>
        <div className={styles.GetLoan}>
          
        </div>
      </div>
    </div>
  );
};

export default PocketBuddy;
