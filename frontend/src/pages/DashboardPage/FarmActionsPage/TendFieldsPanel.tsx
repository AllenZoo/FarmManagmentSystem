import styles from './NurtureAnimalsPanel.module.scss';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the 'Tend Fields' panel of Farmer Actions
 */
const TendFieldsPanel = () => {
  return (
    <div className={styles.Panel}>
      <main>
        {/* CONTROL PANEL */}
        <div className={styles.ControlPanel}>
          <h2>Tend Fields</h2>
        </div>

        {/* DISPLAY PANEL */}
        <div className={styles.DisplayPanel}>

        </div>
      </main>
    </div>
  );
};

export default TendFieldsPanel;
