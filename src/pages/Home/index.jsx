import { useState, useEffect, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

//React Hooks

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const response = await api.get("/users");

    setUsers(response.data);
    console.log(users);
  }

  async function createUsers() {
    await api.post("/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    await getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);

    await getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  const usersTest = [
    {
      id: "1213asd413ads321",
      name: "Rodolfo",
      age: 24,
      email: "rod@gmail.com",
    },
    { id: "fdlak41lkadf", name: "Aline", age: 18, email: "aline2@gmail.com" },
    {
      id: "1233123dadas",
      name: "Rogério",
      age: 34,
      email: "rogerio@gmail.com",
    },
  ];

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" type="text" name="name" ref={inputName} />
        <input placeholder="Email" type="email" name="email" ref={inputAge} />
        <input placeholder="Idade" type="number" name="number" ref={inputEmail} />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {usersTest.map((user) => {
        return (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade:<span> {user.age}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>
            <div>
              <button onClick={()=>deleteUsers(user.id)}>
                <img src={Trash} alt="Lixeira" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
