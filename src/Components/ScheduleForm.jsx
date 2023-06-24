import { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "./utils/global.context";
import { getTokenFromStorage } from "./utils/localStorage.service";
import styles from "./ScheduleForm.module.css";
import apiBaseUrl from "../api";

const ScheduleForm = () => {
  const [dentistList, setDentistList] = useState([]);
  const [patienceList, setPatienceList] = useState([]);

  const { theme } = useContext(ContextGlobal);
  const isDarkMode = theme === "dark" || false;

  useEffect(() => {
    async function fetchData() {
      try {
        const [dentist, patience] = await Promise.all([
          fetch(`${apiBaseUrl}/dentista`),
          fetch(`${apiBaseUrl}/paciente`),
        ]);
        const dentistList = await dentist.json();
        const patienceList = await patience.json();
        setDentistList(dentistList);
        setPatienceList(patienceList.body);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const token = getTokenFromStorage();
    //TODO Do the Scheduling in API
    try {
      fetch(`${apiBaseUrl}/consulta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dentista: {
            matricula: data.dentist,
          },
          paciente: {
            matricula: data.patient,
          },
          dataHoraAgendamento: data.appointmentDate,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("Consulta agendada com sucesso");
          window.location.href = '/';
        }
        else {
          alert("Ocorreu um erro");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`text-center container ${isDarkMode ? styles.cardDark : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <div className={`row ${styles.rowSpacing}`}>
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="dentist" className="form-label">
              Dentist
            </label>
            <select className="form-select" name="dentist" id="dentist">
              {dentistList.length > 0 &&
                dentistList.map((dentist) => (
                  <option key={dentist.matricula} value={dentist.matricula}>
                    {`${dentist.nome} ${dentist.sobrenome}`}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="patient" className="form-label">
              Patient
            </label>
            <select className="form-select" name="patient" id="patient">
              {patienceList.length > 0 &&
                patienceList.map((patience) => (
                  <option key={patience.matricula} value={patience.matricula}>
                    {`${patience.nome} ${patience.sobrenome}`}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className={`row ${styles.rowSpacing}`}>
          <div className="col-12">
            <label htmlFor="appointmentDate" className="form-label">
              Date
            </label>
            <input
              className="form-control"
              id="appointmentDate"
              name="appointmentDate"
              type="datetime-local"
            />
          </div>
        </div>
        <div className={`row ${styles.rowSpacing}`}>
          <button
            className={`btn btn-${isDarkMode ? "dark" : "light"} ${styles.button
              }`}
            type="submit"
          >
            Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
