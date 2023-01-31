import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginForm.css";

const SalasDeCine = () => {
  const [salasDeCine, setSalasDeCine] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://localhost:7238/api/SalasDeCine");
      setSalasDeCine(result.data);

      const resPeli = await axios.get("https://localhost:7238/api/peliculas");
      setMovies(resPeli.data.EnCines.concat(resPeli.data.FuturosEstrenos));
    };

    fetchData();
  }, []);

  const [showLogin, setShowLogin] = useState(false);

  const handleClick = () => {
    setShowLogin(!showLogin);
  };

  const [showForm, setShowForm] = useState(false);

  const handleClickForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="container">
        <h3 className="container_tittle">Usuarios</h3>
        <button className="primary-btn" onClick={handleClick}>
          Acceder
        </button>
        {showLogin && (
          <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="ingresar" type="submit">
              Ingresar
            </button>
          </form>
        )}
        <button onClick={handleClickForm} className="secondary-btn">
          {showForm ? "Cerrar Registrarse" : "Abrir Registrarse"}
        </button>
        {showForm && <RegisterForm />}
      </div>

      <div>
        <h1>Salas de Cine</h1>
        <ul>
          {salasDeCine.map((salaDeCine, index) => (
            <li key={index}>{salaDeCine.nombre}</li>
          ))}
        </ul>
      </div>

      <div className="App">
        <h1>Películas</h1>
        <ul className="movies-list">
          {movies.map((movie, index) => (
            <li key={index} className="movie-card">
              <h2>{movie.name}</h2>
              <p>Fecha de estreno: {movie.FechaEstreno}</p>
              <p>En cines: {movie.EnCines ? "Sí" : "No"}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
function RegisterForm() {
  return (
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <br />
      <button type="submit" className="ingresar">
        Enviar
      </button>
    </form>
  );
}
export default SalasDeCine;
