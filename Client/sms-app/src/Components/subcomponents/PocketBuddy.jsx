import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./PocketBuddy.module.scss";
import {AuthContext}  from "../../Context/AuthContext";
import { useContext } from "react";

const PocketBuddy = () => {
  const {curUser} = useContext(AuthContext);


  const [editBudget, setEditBudget] = useState(false);
  const [bank, setBank] = useState(false);
  const [paytm, setPaytm] = useState(false);

  const [budget, setBudget] = useState("");
  const [curBudget, setCurBudget] = useState("");
  const [expenditure, setExpenditure] = useState("");
  const [perDay, setPerDay] = useState("");
  const [balance, setBalance] = useState("");
  const [reminder, setReminder] = useState("");
  const [permitLoan, setPermitLoan] = useState(false);

  const [formData, setFormData] = useState({});
  const form = useRef();

  const submitHandler  = async(e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/api/loan/approve`, {student_id:curUser._id, ...formData}).then((res) => {console.log(res)}).catch((err) => console.log(err));
    form.current.reset();
  };

  const changeHandler = (e) => {
    let inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: e.target.value,
    });
  };


  const changeBudget = async () => {
    alert("Budget Updated!");
    await axios
      .post("http://localhost:8080/api/money/budget", {user_id:curUser._id, budget:parseInt(budget)})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };


  const dailyExp = async () => {
    await axios
      .post("http://localhost:8080/api/money/reduce", {
        user_id: curUser._id,
        value: parseInt(expenditure),
      })
      .then((res) => {
        setExpenditure("");
      })
      .catch((err) => console.log(err));
  };


  const getPerDay = async() => {
      await axios
        .get(`http://localhost:8080/api/money/${curUser._id}`)
        .then((res) => {setPerDay(res.data.budgetPerDay); setBalance(res.data.balance); setCurBudget(res.data.budget);})
        .catch((err) => console.log(err));
  };

  const checkLoan = async() => {
    let res =  await axios.get(`http://localhost:8080/api/loan/istaken/${curUser._id}`);
    let data = res.data.isTaken;
    setPermitLoan(data);
  };

  useEffect(() => {
    checkLoan();
    getPerDay();
  }, []);

  const reminderHandler = async () => {
    await axios
      .post("http://localhost:8080/api/money/reminder", {
        user_id:curUser._id,
        reminder,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    alert("Reminder has been set");
  };

  return (
    <div className={styles.Container}>
      <p className={styles.PageTitle}>PocketBuddy</p>
      <div className={styles.PersonalBudget}>
        <p className={styles.PageTitle} style={{ fontSize: "1.2rem" }}>
          Manage your Expenses
        </p>
        <div>Budget: ₹{curBudget} </div>
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
                onChange={(e) => setBudget(e.target.value)}
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

        <div className={styles.Expenditure}>
          <div className={styles.InputContainer}>
            <input
              placeholder="Enter Today's Expenditure..."
              className={styles.ContainerInput}
              onChange={(e) => setExpenditure(e.target.value)}
            />
            <label className={styles.ContainerLabel}>Today's Expenditure</label>
          </div>
          <button onClick={() => dailyExp()} className={styles.Buttons}>
            Add Expense
          </button>
        </div>

        <div className={styles.RemBudget}>Balance: ₹{balance}</div>
        <div className={styles.DailyBudget}>
          You can spend, ₹{perDay} per Day
        </div>
        <div className={styles.Reminder}>
          <label> Set Time for Reminder</label>
          <input type="time" onChange={(e) => setReminder(e.target.value)} />
          <button onClick={reminderHandler} className={styles.Buttons}>
            Set
          </button>
        </div>
      </div>
      <div className={styles.Loan}>
        <p className={styles.PageTitle} style={{ fontSize: "1.2rem" }}>
          Get a loan from your PocketBuddy!
        </p>
        {/* <div className={styles.Total}>Amount to be Repayed: Rs. 500</div> */}
        <form onSubmit={submitHandler} ref={form}>
          <div className={styles.LoanOptions}>
            <div className={styles.LoanAmount}>
              <select name="amount" onChange={changeHandler}>
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
              <select name="duedate" onChange={changeHandler}>
                <option value="">Tenure</option>
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="9">9 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>
          </div>

          <div className={styles.DisperseOption}>
            <div className={styles.DisperseOptionBtn}>
              <p
                onClick={() => {
                  setBank(true);
                  setPaytm(false);
                }}
                className={styles.Buttons}
              >
                Add Money to the Bank
              </p>
              <p
                onClick={() => {
                  setPaytm(true);
                  setBank(false);
                }}
                className={styles.Buttons}
              >
                Add Money using UPI ID
              </p>
            </div>
            {bank ? (
              <>
                <p className={styles.PageTitle} style={{ fontSize: "1rem" }}>
                  Bank Details
                </p>
                <div className={styles.InputContainer}>
                  <input
                    placeholder="Enter your Bank Name..."
                    className={styles.ContainerInput}
                    name="bankname"
                    onChange={changeHandler}
                  />
                  <label className={styles.ContainerLabel}>Bank Name</label>
                </div>
                <div className={styles.InputContainer}>
                  <input
                    placeholder="Enter your Account Number..."
                    className={styles.ContainerInput}
                    name="accountnumber"
                    onChange={changeHandler}
                  />
                  <label className={styles.ContainerLabel}>
                    Account Number
                  </label>
                </div>
                <div className={styles.InputContainer}>
                  <input
                    placeholder="Enter your IFSC Code..."
                    className={styles.ContainerInput}
                    name="ifsc"
                    onChange={changeHandler}
                  />
                  <label className={styles.ContainerLabel}>IFSC</label>
                </div>
              </>
            ) : paytm ? (
              <>
                <p className={styles.PageTitle} style={{ fontSize: "1rem" }}>
                  UPI ID
                </p>
                <div className={styles.InputContainer}>
                  <input
                    placeholder="Enter your UPI ID..."
                    className={styles.ContainerInput}
                    name="upi_id"
                    onChange={changeHandler}
                  />
                  <label className={styles.ContainerLabel}>UPI ID</label>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.GetLoan}>
            <input
              type="submit"
              value="Disburse Amount"
              className={styles.Buttons}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PocketBuddy;
