import styles from './NurtureAnimalsPanel.module.scss';

/**
 * Renders the 'Sell Products' panel of Farmer Actions
 */
const SellProductsPanel = () => {
  return (
    <div className={styles.Panel}>
      <main>
        {/* CONTROL PANEL */}
        <div className={styles.ControlPanel}>
          <h2>Sell Products</h2>
        </div>

        {/* DISPLAY PANEL */}
        <div className={styles.DisplayPanel}>

        </div>
      </main>
    </div>
  );
};

export default SellProductsPanel;
