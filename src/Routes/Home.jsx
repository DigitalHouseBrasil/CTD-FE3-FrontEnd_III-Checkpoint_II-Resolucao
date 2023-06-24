import { useState, useEffect } from "react";
import Card from "../Components/Card";
import apiBaseUrl from "../api";


const Home = () => {
  const [dentist, setDentist] = useState([]);

  useEffect(() => {
    try {
      fetch(`${apiBaseUrl}/dentista`)
        .then((res) => res.json())
        .then((data) => setDentist(data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {dentist.length
          ? dentist.map((dentist) => (
            <Card {...dentist} key={dentist.matricula} />
          ))
          : null}
      </div>
    </>
  );
};

export default Home;
