import { useState } from 'react';
import { insertLivestock, retrieveLivestock } from '@controllers/farmerActionsController';
import { StyledPanel, StyledButton } from '.';

import { AnimalType, CropType } from '@utils/enums';
import { convertDateToSQL } from '@utils/DatesSQL';

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

  /**
   * Adds a new livestock to the database
   */
  const addLivestock = async () => {
    // Dummy data
    const newLivestock : Livestock = {
      tagID: '123456789',
      animalType: AnimalType.COW,
      age: 1,
      diet:  CropType.WHEAT,
      weight: 1000,
      lastFed: convertDateToSQL(new Date()),
      harvestable: false,
      lastViolatedForHarvestedGoods: convertDateToSQL(new Date())
    };

    try {
      await insertLivestock(newLivestock);
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

            <StyledButton
              type="button"
              onClick={addLivestock}
            >
              Add Livestock
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
