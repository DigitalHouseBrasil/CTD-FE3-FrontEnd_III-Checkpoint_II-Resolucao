import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ScheduleFormModal from "./ScheduleFormModal";
import { ContextGlobal } from "./utils/global.context";
import styles from "./DetailCard.module.css";
import apiBaseUrl from "../api";
import { getTokenFromStorage } from "./utils/localStorage.service";


const DetailCard = () => {
  const { id } = useParams();
  const [dentist, setDentist] = useState(undefined);
  const { theme } = useContext(ContextGlobal);
  const isDarkMode = theme === "dark" || false;

  const token = getTokenFromStorage();

  useEffect(() => {
    async function fetchData() {
      fetch(`${apiBaseUrl}/dentista?matricula=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDentist(data);
        });
    }
    fetchData();
  }, [id]);
  return (
    <>
      {dentist ? (
        <>
          <h1>Detail about Dentist {dentist?.nome} </h1>
          <section className="card col-sm-12 col-lg-6 container">
            <div
              className={`card-body row ${isDarkMode ? styles.cardDark : ""}`}
            >
              <div className="col-sm-12 col-lg-6">
                <img
                  className="card-img-top"
                  src="/images/doctor.jpg"
                  alt="doctor placeholder"
                />
              </div>
              <div className="col-sm-12 col-lg-6">
                <ul className="list-group">
                  <li className="list-group-item">Name: {dentist.nome}</li>
                  <li className="list-group-item">
                    Surname: {dentist.sobrenome}
                  </li>
                  <li className="list-group-item">
                    Username: {dentist.usuario.username}
                  </li>
                </ul>
                <div className="text-center">
                  <button
                    disabled={!token ? true : false}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className={`btn btn-${isDarkMode ? "dark" : "light"} ${styles.button
                      }`}
                  >
                    Schedule a Consult
                  </button>

                  <br />

                  {!token ? "NOTE: Login is necessary" : ""}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
