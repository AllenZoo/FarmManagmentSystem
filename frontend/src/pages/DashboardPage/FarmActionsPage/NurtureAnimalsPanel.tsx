import { useState, useContext, useEffect } from 'react';
import { GiBasket, GiBloodySword, GiGrain } from 'react-icons/gi';
import { FaFilter } from 'react-icons/fa';

import ModalContext from '@contexts/modalContext';

import {
  deleteLivestock,
  getLivestockCount,
  insertLivestock,
  retrieveFilteredLivestock,
  retrieveLivestock,
  updateLivestock
} from '@controllers/farmerActionsController';

import { ActionTypes, AnimalType, CropType } from '@utils/enums';
import { convertDateToSQL } from '@utils/DatesSQL';

import ChickenProfile from '@assets/livestock/chicken.png';
import CowProfile from '@assets/livestock/cow.png';
import PigProfile from '@assets/livestock/pig.png';
import SheepProfile from '@assets/livestock/sheep.png';

import styles from './NurtureAnimalsPanel.module.scss';


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
  const [livestockCount, setLivestockCount] = useState<{type: AnimalType, count: number}[]>([]);
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);

  const [animalTypeFilter, setAnimalTypeFilter] = useState<AnimalType | string>("all");
  const [dietFilter, setDietFilter] = useState<CropType | string>("all");
  const [harvestableFilter, setHarvestableFilter] = useState<boolean | string>("all");
  const [minAgeFilter, setMinAgeFilter] = useState<number>(-1);
  const [maxAgeFilter, setMaxAgeFilter] = useState<number>(-1);

  const [tagIDAdd, setTagIDAdd] = useState<number>(4000);
  const [animalTypeAdd, setAnimalTypeAdd] = useState<AnimalType>(AnimalType.COW);

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
    getLivestock(true);
  };

  /**
   * Retrieves all livestock from the database
   * @param override If true, will ignore all filters
   */
  const getLivestock = async (override?: boolean) => {
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
        !filterEnabled ||
        override
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
      await getAnimalCounts(1);
    }, 500);
  };

  /**
   * Adds a new livestock to the database
   */
  const addLivestock = async () => {
    // TODO: Generate more random data
    const newLivestock : Livestock = {
      tagID: tagIDAdd,
      animalType: animalTypeAdd,
      age: 4,
      diet: CropType.CANOLA,
      weight: 70,
      lastFed: convertDateToSQL(new Date()),
      harvestable: Math.random() < 0.5 ? true : false,
      lastViolatedForHarvestedGoods: convertDateToSQL(new Date())
    };

    try {
      await insertLivestock(newLivestock);
    } catch (err) {
      window.alert("Failed to add livestock");
    };
  };

  /**
   * Feeds the livestock
   */
  const feedLivestock = async (livestock: Livestock) => {
    try {
      updateLivestock(livestock, ActionTypes.FEED);
      syncData();
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
      syncData();
    } catch (err) {
      console.error(err);
    };
  };

  /**
   * Gets animal count
   */
  const getAnimalCounts = async (age: number) => {
    if (!livestock) return 0;

    try {
      Object.values(AnimalType).forEach(async (animalType) => {
        const count = await getLivestockCount(age);
        setLivestockCount((prevCount) => [...prevCount, {type: animalType, count}]);
      });
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

          <button
            className={styles.Button}
            type="button"
            onClick={() => {
              deleteLivestock(livestock);
              modalContext.clearModal();
              syncData();
            }}
          >
            Absolutely Yes!
          </button>

          <button
            className={styles.Button}
            type="button"
            onClick={() => {modalContext.clearModal()}}
          >
            No
          </button>
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
    <div className={styles.Panel}>
      <main>
        {/* CONTROL PANEL */}
        <div className={styles.ControlPanel}>
          <h2>Nurture Animals</h2>

          <div className={styles.Controls}>
            <form className={styles.ViewLivestock}>
              <button
                className={styles.Button}
                type="button"
                onClick={syncData}
              >
                View Livestock
              </button>

              <button
                className={styles.ActionButton}
                type="button"
                onClick={() => {setFilterEnabled(!filterEnabled)}}
                id="filter"
              >
                <FaFilter />
              </button>
            </form>

            {filterEnabled && (
              <form className={styles.FilterLivestock}>
                <section>
                  <label htmlFor="animalType">Animal Type</label>
                  <select
                    className={styles.Select}
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
                  </select>
                </section>

                <section>
                  <label htmlFor="diet">Diet</label>
                  <select
                    className={styles.Select}
                    name="diet"
                    id="diet"
                    defaultValue={"all"}
                    onChange={(e) => {setDietFilter(e.target.value as CropType)}}
                  >
                    <option value="all">All</option>
                    <option value="canola">Canola</option>
                    <option value="wheat">Wheat</option>
                    <option value="corn">Corn</option>

                  </select>
                </section>

                <section>
                  <label htmlFor="harvestable">Harvestable</label>
                  <select
                    className={styles.Select}
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
                  </select>
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
                  <button
                    className={styles.Button}
                    type="button"
                    id="clearFilters"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                  
                  <button
                    className={styles.Button}
                    type="button"
                    id="applyFilters"
                    onClick={syncData}
                  >
                    Apply Filters
                  </button>
                </section>
              </form>
            )}

            <form className={styles.AddLivestock}>
              <section>
                <label htmlFor="tagID">Tag ID</label>
                <input
                  type="number"
                  name="tagID"
                  id="tagID"
                  maxLength={4}
                  min={4000}
                  max={4999}
                  defaultValue={4000}
                  onChange={(e) => {setTagIDAdd(e.target.value as unknown as number)}}
                />
              </section>

              <section>
                <label htmlFor="animalType">Animal Type</label>
                <select
                  className={styles.Select}
                  name="animalType"
                  id="animalType"
                  defaultValue={"cow"}
                  onChange={(e) => {setAnimalTypeAdd(e.target.value as AnimalType)}}
                >
                  <option value="cow">Cow</option>
                  <option value="chicken">Chicken</option>
                  <option value="pig">Pig</option>
                  <option value="sheep">Sheep</option>
                </select>
              </section>

              <button
                className={styles.Button}
                type="button"
                onClick={() => {
                  addLivestock();
                  syncData();
                }}
              >
                Add Livestock
              </button>
            </form>

            <div className={styles.LivestockSummary}>
              <h2>Livestock Summary</h2>
              <section>
                {Object.keys(AnimalType).map((animalType, index) => (
                  <span key={index}>
                    <h3># of {animalType}:</h3>
                    {livestockCount.find((livestockCount) => livestockCount.type === animalType)?.count || 0}
                  </span>
                ))}
              </section>
            </div>
          </div>
        </div>

        {/* DISPLAY PANEL */}
        <div className={styles.DisplayPanel}>
          <h2>Total Livestock Displayed: {livestock?.length}</h2>

          {livestock && livestock.map((livestock, index) => (
            <fieldset key={index} className={styles.LivestockInfo}>
              <legend>Livestock ID: #{livestock.tagID}</legend>
              <img
                src={getAnimalProfile(livestock.animalType)}
                alt=""
                draggable={false}
              />

              <div className={styles.Info}>
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

              <div className={styles.Actions}>
                <button
                  className={styles.ActionButton}
                  type="button"
                  onClick={() => feedLivestock(livestock)}
                  id="feed"
                  title={`Feed #${livestock.tagID} with ${livestock.diet}`}
                >
                  <GiGrain />
                </button>

                <button
                  className={styles.ActionButton}
                  type="button"
                  onClick={() => harvestLivestock(livestock)}
                  id="harvest"
                  title={livestock.harvestable ? `Harvest #${livestock.tagID}` : `Cannot harvest #${livestock.tagID} yet`}
                  disabled={!livestock.harvestable}
                >
                  <GiBasket />
                </button>

                <button
                  className={styles.ActionButton}
                  type="button"
                  onClick={() => terminateLivestock(livestock)}
                  id="terminate"
                  title={`Terminate #${livestock.tagID}`}
                >
                  <GiBloodySword />
                </button>
              </div>
            </fieldset>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NurtureAnimalsPanel;
