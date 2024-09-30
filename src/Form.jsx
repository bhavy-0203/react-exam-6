import React, { useEffect, useState } from "react";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let [id, setId] = useState(-1);
  const [userdata, setUserData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id != -1) {
      updateUser(id, data);
      setId(-1);
    } else {
      createUser();
    }

    getUsers();
  };

  const updateUser = async (id, user) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
  };

  const createUser = async () => {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const getUsers = async () => {
    const req = await fetch("http://localhost:3000/users");
    const res = await req.json();
    setUserData(res);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };

  const updateData = (userdata) => {
    setData({ ...userdata });

    setId(userdata.id);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleInput = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleInput}
          value={data.name}
        />
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
          value={data.email}
        />
        <input
          type="text"
          name="password"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
          value={data.password}
        />
        <input type="submit" value={id == -1 ? "create" : "update"} />
      </form>

      {userdata.map((e) => (
        <div key={e.id}>
          <h1>{e.name}</h1>
          <h1>{e.email}</h1>
          <h1>{e.password}</h1>
          <button onClick={() => handleDelete(e.id)}>delete</button>
          <button onClick={() => updateData(e)}>update</button>
        </div>
      ))}
    </div>
  );
};

export default Form;
