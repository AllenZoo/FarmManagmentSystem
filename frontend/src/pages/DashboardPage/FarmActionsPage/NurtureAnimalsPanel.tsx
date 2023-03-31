import { useState } from 'react';
import { retrieveLivestock } from '@controllers/farmerActionsController';
import { StyledPanel, StyledButton } from '.';

/**
 * Renders the 'Nurture Animals' panel of Farmer Actions
 */
const NurtureAnimalsPanel = () => {
  const [livestock, setLivestock] = useState<String[] | null>(null);

  /**
   * Retrieves all livestock from the database
   */
  const getLivestock = async () => {
    try {
      const livestock = await retrieveLivestock();
      setLivestock(livestock);
      console.log(livestock);
    } catch (err) {
      console.error(err);
    };
  };

  return (
    <StyledPanel>
      <main>
        {/* CONTROL PANEL */}
        <div className="ControlPanel">
          <h2>Nurture Animals</h2>

          <div>
            <StyledButton
              type="button"
              onClick={getLivestock}
            >
              View All Livestock
            </StyledButton>
          </div>
        </div>

        {/* DISPLAY PANEL */}
        <div className="DisplayPanel">
        </div>
      </main>
    </StyledPanel>
  );
};

export default NurtureAnimalsPanel;
