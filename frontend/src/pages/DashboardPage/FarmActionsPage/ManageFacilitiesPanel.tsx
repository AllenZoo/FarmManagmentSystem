import styles from './NurtureAnimalsPanel.module.scss';


/**
 * Renders the 'Manage Facilities' panel of Farmer Actions
 */
const ManageFacilitiesPanel = () => {
  return (
    <div className={styles.Panel}>
      <main>
        {/* CONTROL PANEL */}
        <div className={styles.ControlPanel}>
          <h2>Manage Facilities</h2>
        </div>

        {/* DISPLAY PANEL */}
        <div className={styles.DisplayPanel}>

        </div>
      </main>
    </div>
  );
};

export default ManageFacilitiesPanel;
