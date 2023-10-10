import Transection from './components/Transection';
import FormComponent from './components/FormComponent';
import './App.css';
import { useEffect, useState } from 'react';
import DataContext from './data/DataContext';
import ReportComponent from './components/ReportComponent';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const design = { color: 'red', textAlign: 'center', fontSize: '1.5rem' };

  const initData = [
    { id: 1, title: 'เงินเดือน', amount: 20000 },
    { id: 2, title: 'ค่าน้ำมัน', amount: -500 },
    { id: 3, title: 'ค่าเช่าบ้าน', amount: -8000 },
    { id: 4, title: 'ขายของ', amount: 5000 },
  ];

  const [items, setItems] = useState(initData);
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    //console.log('ข้อมูลที่ส่งมาจาก Form Component =', item);
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };

  useEffect(() => {
    const amount = items.map((item) => item.amount);
    //console.log(amount);
    const income = amount
      .filter((value) => value > 0)
      .reduce((total, value) => (total += value), 0);
    //console.log('รายรับ: ' + income);
    const expense =
      amount
        .filter((value) => value < 0)
        .reduce((total, value) => (total += value), 0) * -1;
    //console.log('รายจ่าย' + expense);
    setReportIncome(income);
    setReportExpense(expense);
  }, [items, reportIncome, reportExpense]);

  //reducer state
  // const [showReport, setShowReport] = useState(false);

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case 'SHOW':
  //       return setShowReport(true);
  //     case 'HIDE':
  //       return setShowReport(false);
  //   }
  // };

  // const [result, dispatch] = useReducer(reducer, showReport);

  return (
    <DataContext.Provider
      value={{ income: reportIncome, expense: reportExpense }}
    >
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" exact element={<ReportComponent />}></Route>

              <Route
                path="/insert"
                element={[
                  <FormComponent onAddItem={onAddNewItem} />,
                  <Transection items={items} />,
                ]}
                // element={<Transection items={items} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
    // <div align="center">
    //   <h1>{result}</h1>
    //   <button onClick={() => dispatch({ type: 'ADD', payload: 10 })}>
    //     เพิ่ม
    //   </button>
    //   <button onClick={() => dispatch({ type: 'SUB', payload: 5 })}>ลด</button>
    //   <button onClick={() => dispatch({ type: 'CLEAR' })}>ล้าง</button>
    // </div>
  );
}

export default App;
