import { useState, useContext, useEffect } from 'react';
import { GiBasket, GiBloodySword, GiGrain } from 'react-icons/gi';
import { FaFilter } from 'react-icons/fa';
import styled from 'styled-components';

import { StyledButton } from '.';

import ModalContext from '@contexts/modalContext';

import { deleteLivestock, insertLivestock, retrieveFilteredLivestock, retrieveLivestock, updateLivestock } from '@controllers/farmerActionsController';

import { ActionTypes, AnimalType, CropType } from '@utils/enums';
import { convertDateToSQL } from '@utils/DatesSQL';

import ChickenProfile from '@assets/livestock/chicken.png';
import CowProfile from '@assets/livestock/cow.png';
import PigProfile from '@assets/livestock/pig.png';
import SheepProfile from '@assets/livestock/sheep.png';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledPanel = styled.div`
  color: #fff;
  text-align: center;

  main {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    min-height: 50vh;
    margin: 1rem 2rem;
  }

  .ControlPanel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    height: 80vh;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0.1);
    overflow-x: none;
    transition: 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      transition: 0.2s ease;
    }

    h2 {
      padding: 0;
      margin: 0 0 0.5rem 0;
    }
    
    .Controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      gap: 0.5rem;
      padding: 1rem;
      border-radius: 5px;
      border: 1px solid #fff;
      background-color: rgba(0, 0, 0, 0.1);
      overflow-x: none;
      transition: 0.2s ease;

      .ViewLivestock {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }

      .FilterLivestock {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        height: 100%;
        width: 90%;
        gap: 0.5rem;
        padding: 1rem;
        border-radius: 5px;
        border: 1px solid #fff;
        background-color: rgba(0, 0, 0, 0.1);

        section {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;

          label {
            font-size: 1.2rem;
            font-weight: bold;
          }

          input {
            max-width: 8rem;
            padding: 0.5rem;
            border-radius: 0.5rem;
            border: 2px solid #fff;
            background-color: rgba(0, 0, 0, 0.1);
            text-align: center;
            font-size: 1.2rem;
            transition: 0.2s ease;
          }
        }

        #clearFilters,
        #applyFilters {
          margin-top: 1rem;
          min-width: 4rem;
          font-size: 1.2rem;
        }

        #clearFilters {
          border: 2px solid rgba(255, 0, 0, 0.5);
          transition: 0.2s ease;

          &:hover {
            transition: 0.2s ease;
          }
        }

        #applyFilters {
          border: 2px solid rgba(0, 255, 0, 0.5);
          transition: 0.2s ease;

          &:hover {
            transition: 0.2s ease;
          }
        }
      }
    }
  }

  .DisplayPanel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    height: 80vh;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0.1);
    transition: 0.2s ease;
    overflow-y: scroll;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      transition: 0.2s ease;
    }

    h2 {
      padding: 0;
      margin: 0;
    }

    .LivestockInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 5px;
      border: 1px solid #fff;
      background-color: rgba(0, 0, 0, 0.1);
      text-align: left;

      legend {
        font-size: 1.2rem;
        font-weight: bold;
      }

      img {
        height: 100%;
        width: 20%;
        padding: 0.5rem;
        border-radius: 10px;
        backdrop-filter: blur(5px);
        background-color: rgba(200, 255, 255, 0.1);
        transition: 0.2s ease;
        
        &:hover {
          transition: 0.2s ease;
          animation: pulse 1.5s ease-in-out infinite;

          @keyframes pulse {
            0% { background: rgba(200, 255, 255, 0.1); }
            50% { background: rgba(200, 255, 255, 0.2); }
            100% { background: rgba(200, 255, 255, 0.1); }
          }
        }
      }

      .Info {
        width: 80%;

        b {
          font-size: 1.2rem;
          border-left: 4px solid #fff;
          padding-left: 0.5rem;
          width: 100%;
        }

        section {
          display: flex;
          flex-direction: row;
          gap: 2rem;

          p {
            margin: 0.25rem;
            background-color: rgba(0, 0, 0, 0.1);
            padding: 0.5rem;
            border-radius: 5px;
          }

          b {
            font-size: 1rem;
            border-left: none;
            padding: 0 0.5rem;
            border-radius: 5px;
            background: rgba(100, 255, 100, 0.1);
          }
        }
      }

      .Actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 10%;
      }
    }
  }
`;

const StyledActionButton = styled.button`
  color: #fff;
  font-size: 1.5rem;
  text-align: center;

  border: 2px solid #fff;
  border-radius: 0.5rem;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  margin: 0;
  padding: 0.25rem;
  text-align: center;
  font-size: 2rem;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    scale: 1.05;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    transition: 0.2s ease;
  }

  &:disabled {
    opacity: 0.5;
    filter: grayscale(100%);
    cursor: not-allowed;

    &:hover {
      scale: 1;
      background: transparent;
      backdrop-filter: none;
      transition: 0.2s ease;
    }
  }

  &[id="filter"] {
    border-color: #8ff;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;

    svg {
      stroke: #8ff !important;
      fill: #8ff !important;
    }
  }

  &[id="feed"] {
    border-color: #ff8;

    svg {
      stroke: #ff8 !important;
      fill: #ff8 !important;
    }
  }

  &[id="harvest"] {
    border-color: #8f8;

    svg {
      stroke: #8f8 !important;
      fill: #8f8 !important;
    }
  }

  &[id="terminate"] {
    border-color: #f88;

    svg {
      stroke: #f88 !important;
      fill: #f88 !important;
    }
  }
`;

const StyledSelect = styled.select`
  color: #fff;
  font-size: 1.2rem;
  text-align: center;

  border: 2px solid #fff;
  border-radius: 0.5rem;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  margin: 0;
  padding: 0.25rem;
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    transition: 0.2s ease;
  }

  option {
    color: #000;
    background: #cff;
  }
`;


/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */
/**
 * Gets the profile image of the animal
 */
const getAnimalProfile = (animalType: AnimalType) => {
  switch (animalType) {
    case AnimalType.CHICKEN:
      return ChickenProfile;
    case AnimalType.COW:
      return CowProfile;
    case AnimalType.PIG:
      return PigProfile;
    case AnimalType.SHEEP:
      return SheepProfile;
    default:
      return "";
  };
};


/**
 * Renders the 'Nurture Animals' panel of Farmer Actions
 */
const NurtureAnimalsPanel = () => {
  const [livestock, setLivestock] = useState<Livestock[] | null>(null);
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);

  const [animalTypeFilter, setAnimalTypeFilter] = useState<AnimalType | string>("all");
  const [dietFilter, setDietFilter] = useState<CropType | string>("all");
  const [harvestableFilter, setHarvestableFilter] = useState<boolean | string>("all");
  const [minAgeFilter, setMinAgeFilter] = useState<number>(-1);
  const [maxAgeFilter, setMaxAgeFilter] = useState<number>(-1);

  const modalContext = useContext(ModalContext);

  /**
   * Clears all filters
   */
  const clearFilters = () => {
    setAnimalTypeFilter("all");
    setDietFilter("all");
    setHarvestableFilter("all");
    setMinAgeFilter(-1);
    setMaxAgeFilter(-1);
    setFilterEnabled(false);
  };

  /**
   * Retrieves all livestock from the database
   */
  const getLivestock = async () => {
    try {
      const filteredData: FilteredLivestock = {
        animalType: animalTypeFilter,
        minAge: minAgeFilter,
        maxAge: maxAgeFilter,
        diet: dietFilter,
        harvestable: harvestableFilter
      }

      // Check if all filters are not set
      if (
        Object.values(filteredData).every((value) => (value === null || value === "all" || value === -1)) ||
        !filterEnabled
      ) {
        const livestock = await retrieveLivestock();
        setLivestock(livestock);
        return;
      };

      const livestock = await retrieveFilteredLivestock(filteredData);
      setLivestock(livestock);
    } catch (err) {
      console.error(err);
    };
  };

  /**
   * Syncs data
   */
  const syncData = () => {
    setTimeout(async () => {
      await getLivestock();
    }, 300);
  };

  /**
   * Adds a new livestock to the database
   */
  const addLivestock = async () => {
    // Dummy data
    const newLivestock : Livestock = {
      tagID: '4000',
      animalType: AnimalType.COW,
      age: 4,
      diet:  CropType.WHEAT,
      weight: 70,
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

  /**
   * Feeds the livestock
   */
  const feedLivestock = async (livestock: Livestock) => {
    try {
      updateLivestock(livestock, ActionTypes.FEED);
    } catch (err) {
      console.error(err);
    };
  };

  /**
   * Harvests from the livestock
   */
  const harvestLivestock = async (livestock: Livestock) => {
    try {
      updateLivestock(livestock, ActionTypes.HARVEST);
    } catch (err) {
      console.error(err);
    };
  };

  /**
   * Terminate the livestock
   */
  const terminateLivestock = async (livestock: Livestock) => {
    try {
      modalContext.setModal(
        <>
          Are you sure you want to terminate this livestock?

          <StyledButton
            type="button"
            onClick={() => {
              deleteLivestock(livestock);
              modalContext.clearModal();
              syncData();
            }}
          >
            Absolutely Yes!
          </StyledButton>

          <StyledButton
            type="button"
            onClick={() => {modalContext.clearModal()}}
          >
            No
          </StyledButton>
        </>
      );
    } catch (err) {
      console.error(err);
    };
  };

  /**
   * Syncs the livestock data with the database
   */
  useEffect(() => {
    syncData();
  }, []);

  return (
    <StyledPanel>
      <main>
        {/* CONTROL PANEL */}
        <div className="ControlPanel">
          <h2>Nurture Animals</h2>

          <div className="Controls">
            <form className="ViewLivestock">
              <StyledButton
                type="button"
                onClick={syncData}
              >
                View Livestock
              </StyledButton>

              <StyledActionButton
                type="button"
                onClick={() => {setFilterEnabled(!filterEnabled)}}
                id="filter"
              >
                <FaFilter />
              </StyledActionButton>
            </form>

            {filterEnabled && (
              <form className="FilterLivestock" id="FilteringForm">
                <section>
                  <label htmlFor="animalType">Animal Type</label>
                  <StyledSelect
                    name="animalType"
                    id="animalType"
                    defaultValue={"all"}
                    onChange={(e) => {setAnimalTypeFilter(e.target.value as AnimalType)}}
                  >
                    <option value="all">All</option>
                    <option value="cow">Cow</option>
                    <option value="chicken">Chicken</option>
                    <option value="pig">Pig</option>
                    <option value="sheep">Sheep</option>
                  </StyledSelect>
                </section>

                <section>
                  <label htmlFor="diet">Diet</label>
                  <StyledSelect
                    name="diet"
                    id="diet"
                    defaultValue={"all"}
                    onChange={(e) => {setDietFilter(e.target.value as CropType)}}
                  >
                    <option value="all">All</option>
                    <option value="canola">Canola</option>
                    <option value="wheat">Wheat</option>
                    <option value="corn">Corn</option>

                  </StyledSelect>
                </section>

                <section>
                  <label htmlFor="harvestable">Harvestable</label>
                  <StyledSelect
                    name="harvestable"
                    id="harvestable"
                    defaultValue={"all"}
                    onChange={(e) => {
                      if (e.target.value === 'all')
                        setHarvestableFilter("all");
                      else
                        setHarvestableFilter(e.target.value === 'true' ? true : false)
                    }}
                  >
                    <option value="all">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </StyledSelect>
                </section>

                <section>
                  <label htmlFor="minAge">Min Age</label>
                  <input
                    type="number"
                    name="minAge"
                    id="minAge"
                    defaultValue={minAgeFilter || -1}
                    min={-1}
                    max={100}
                    onChange={(e) => {setMinAgeFilter(parseInt(e.target.value))}}
                  />
                </section>
                  
                <section>
                  <label htmlFor="maxAge">Max Age</label>
                  <input
                    type="number"
                    name="maxAge"
                    id="maxAge"
                    defaultValue={maxAgeFilter || -1}
                    min={-1}
                    max={100}
                    onChange={(e) => {setMaxAgeFilter(parseInt(e.target.value))}}
                  />
                </section>

                <section>
                  <StyledButton
                    type="button"
                    id="clearFilters"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </StyledButton>
                  
                  <StyledButton
                    type="button"
                    id="applyFilters"
                    onClick={syncData}
                  >
                    Apply Filters
                  </StyledButton>
                </section>
              </form>
            )}

            <form>
              <select>
                <option value="cow">Cow</option>
                <option value="chicken">Chicken</option>
                <option value="pig">Pig</option>
              </select>

              <StyledButton
                type="button"
                onClick={() => {
                  addLivestock();
                  syncData();
                }}
              >
                Add Livestock
              </StyledButton>
            </form>
          </div>
        </div>

        {/* DISPLAY PANEL */}
        <div className="DisplayPanel">
          <h2>Total Livestock Displayed: {livestock?.length}</h2>

          {livestock && livestock.map((livestock, index) => (
            <fieldset key={index} className="LivestockInfo">
              <legend>Livestock ID: #{livestock.tagID}</legend>
              <img
                src={getAnimalProfile(livestock.animalType)}
                alt=""
                draggable={false}
              />

              <div className="Info">
                <b>GENERAL</b>
                <section>
                  <p>Type: <b>{livestock.animalType}</b></p>
                  <p>Age: <b>{livestock.age} YEARS</b></p>
                  <p>Weight: <b>{livestock.weight} KG</b></p>
                </section>

                <b>FEEDING</b>
                <section>
                  <p>Diet: <b>{livestock.diet}</b></p>
                  <p>Last Fed: <b>{livestock.lastFed}</b></p>
                </section>

                <b>HARVEST</b>
                <section>
                  <p>Harvestable: <b>{livestock.harvestable ? "YES" : "NO"}</b></p>
                  <p>Last Violated For Harvested Goods: <b>{livestock.lastViolatedForHarvestedGoods || "N/A"}</b></p>
                </section>
              </div>

              <div className="Actions">
                <StyledActionButton
                  type="button"
                  onClick={() => feedLivestock(livestock)}
                  id="feed"
                  title={`Feed #${livestock.tagID} with ${livestock.diet}`}
                >
                  <GiGrain />
                </StyledActionButton>

                <StyledActionButton
                  type="button"
                  onClick={() => harvestLivestock(livestock)}
                  id="harvest"
                  title={livestock.harvestable ? `Harvest #${livestock.tagID}` : `Cannot harvest #${livestock.tagID} yet`}
                  disabled={!livestock.harvestable}
                >
                  <GiBasket />
                </StyledActionButton>

                <StyledActionButton
                  type="button"
                  onClick={() => terminateLivestock(livestock)}
                  id="terminate"
                  title={`Terminate #${livestock.tagID}`}
                >
                  <GiBloodySword />
                </StyledActionButton>
              </div>
            </fieldset>
          ))}
        </div>
      </main>
    </StyledPanel>
  );
};

export default NurtureAnimalsPanel;
