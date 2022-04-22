import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Axios from "axios";
//import { header } from "express/lib/request";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [state, setstate] = useState("");
  const [type, settype] = useState("");
  const [adnumber, setadnumber] = useState(0);

  const [newadnumber, setNewadnumber] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      state: state,
      type: type,
      adnumber: adnumber,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          state: state,
          type: type,
          adnumber: adnumber,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeadnumber = (id) => {
    Axios.put("http://localhost:3001/update", {
      adnumber: newadnumber,
      id: id,
    }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: val.name,
                state: val.state,
                age: val.age,
                type: val.type,
                adnumber: newadnumber,
              }
            : val;
        })
      );
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      {/* <h3>Build Sign Up & Login UI Template in React</h3> */}
      <div className="Regpage">
        <center>
          <h1>Farm Alive</h1>
        </center>
        <h2>Registraion</h2>
      </div>
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>state:</label>
        <input
          type="text"
          onChange={(event) => {
            setstate(event.target.value);
          }}
        />
        <label>type:</label>
        <input
          type="text"
          onChange={(event) => {
            settype(event.target.value);
          }}
        />
        <label>Adhaar Number:</label>
        <input
          type="number"
          onChange={(event) => {
            setadnumber(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Register</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show My Detalis</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>state: {val.state}</h3>
                <h3>type: {val.type}</h3>
                <h3>adnumber: {val.adnumber}</h3>
              </div>
              <div>
                {/* <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewadnumber(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeadnumber(val.id);
                  }}
                >
                  {" "}
                  Update
                </button> */}

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
