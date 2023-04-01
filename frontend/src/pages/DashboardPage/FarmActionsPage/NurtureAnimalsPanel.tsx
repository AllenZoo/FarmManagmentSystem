import { useState } from 'react';
import { insertLivestock, retrieveLivestock } from '@controllers/farmerActionsController';
import { StyledPanel, StyledButton } from '.';

import { AnimalType, CropType } from '@utils/enums';
import { convertDateToSQL } from '@utils/DatesSQL';

/**
 * Renders the 'Nurture Animals' panel of Farmer Actions
 */
const NurtureAnimalsPanel = () => {
  const [livestock, setLivestock] = useState<Livestock[] | null>(null);

  /**
   * Retrieves all livestock from the database
   */
  const getLivestock = async () => {
    try {
      const livestock = await retrieveLivestock();
      setLivestock(livestock);
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

          <div className="Controls">
            <StyledButton
              type="button"
              onClick={getLivestock}
            >
              View All Livestock
            </StyledButton>

            <form>
              <select>
                <option value="cow">Cow</option>
                <option value="chicken">Chicken</option>
                <option value="pig">Pig</option>
              </select>

              <StyledButton
                type="button"
                onClick={addLivestock}
              >
                Add Livestock
              </StyledButton>
            </form>
          </div>
        </div>

        {/* DISPLAY PANEL */}
        <div className="DisplayPanel">
          {livestock && livestock.map((livestock, index) => (
            <div key={index}>
              <p>{livestock.tagID}</p>
              <p>{livestock.animalType}</p>
              <p>{livestock.age}</p>
              <p>{livestock.diet}</p>
              <p>{livestock.weight}</p>
              <p>{livestock.lastFed}</p>
              <p>{livestock.harvestable}</p>
              <p>{livestock.lastViolatedForHarvestedGoods}</p>
            </div>
          ))}
        </div>
      </main>
    </StyledPanel>
  );
};

export default NurtureAnimalsPanel;
