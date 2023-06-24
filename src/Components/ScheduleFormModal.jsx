import { useContext } from "react";
import { ContextGlobal } from './utils/global.context';
import ScheduleForm from './ScheduleForm';
import styles from './ScheduleFormModal.module.css';

const ScheduleFormModal = () => {
  const { theme } = useContext(ContextGlobal)
  const isDarkMode = theme === "dark" || false;

  return (
    <div className={`modal fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className={`modal-content ${isDarkMode ? styles.DarkModal : ''}`}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Select the doctor, patient and day time</h1>
            <button type="button" className={`btn-close ${isDarkMode ? styles.closeButtonDark : ''}`} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ScheduleForm />
          </div>
        </div>
      </div>
    </div >

  );
};

export default ScheduleFormModal;
