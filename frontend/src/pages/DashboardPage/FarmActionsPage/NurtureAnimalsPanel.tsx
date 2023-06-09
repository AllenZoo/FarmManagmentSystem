import { useState, useContext, useEffect } from "react";
import {
  GiBasket,
  GiMedicalPack,
  GiBloodySword,
  GiGrain,
  GiPowderBag,
} from "react-icons/gi";
import { FaFilter } from "react-icons/fa";

import ModalContext from "@contexts/modalContext";

import {
  deleteLivestock,
  getLivestockCount,
  getResourcesSpent,
  getVetRecords,
  insertLivestock,
  retrieveFilteredLivestock,
  retrieveLivestock,
  updateLivestock,
} from "@controllers/farmerActionsController";

import { ActionTypes, AnimalType, CropType } from "@utils/enums";
import { convertDateToSQL } from "@utils/DatesSQL";

import ChickenProfile from "@assets/livestock/chicken.png";
import CowProfile from "@assets/livestock/cow.png";
import PigProfile from "@assets/livestock/pig.png";
import SheepProfile from "@assets/livestock/sheep.png";

import styles from "./NurtureAnimalsPanel.module.scss";

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
  }
};

/**
 * Renders the 'Nurture Animals' panel of Farmer Actions
 */
const NurtureAnimalsPanel = () => {
  const [livestock, setLivestock] = useState<Livestock[] | null>(null);
  const [livestockCount, setLivestockCount] = useState<
    { type: AnimalType; count: number }[]
  >([]);

  // Filter states
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);
  const [minTagIDFilter, setMinTagIDFilter] = useState<number>(4000);
  const [maxTagIDFilter, setMaxTagIDFilter] = useState<number>(4999);
  const [animalTypeFilter, setAnimalTypeFilter] = useState<AnimalType | string>(
    "all"
  );
  const [dietFilter, setDietFilter] = useState<CropType | string>("all");
  const [harvestableFilter, setHarvestableFilter] = useState<boolean | string>(
    "all"
  );
  const [minAgeFilter, setMinAgeFilter] = useState<number>(-1);
  const [maxAgeFilter, setMaxAgeFilter] = useState<number>(-1);
  const [minFoodSpentFilter, setMinFoodSpentFilter] = useState<number>(-1);
  const [minWaterSpentFilter, setMinWaterSpentFilter] = useState<number>(-1);

  // Add livestock states
  const [addEnabled, setAddEnabled] = useState<boolean>(false);
  const [tagIDAdd, setTagIDAdd] = useState<number>(4000);
  const [animalTypeAdd, setAnimalTypeAdd] = useState<AnimalType>(
    AnimalType.COW
  );
  const [dietAdd, setDietAdd] = useState<CropType>(CropType.CANOLA);
  const [ageAdd, setAgeAdd] = useState<number>(1);
  const [weightAdd, setWeightAdd] = useState<number>(5);
  const [lastFedAdd, setLastFedAdd] = useState<Date>(new Date());
  const [lastViolatedForHarvestedGoodsAdd, setLastViolatedForHarvestedGoodsAdd] = useState<Date>(new Date());
  const [harvestableAdd, setHarvestableAdd] = useState<boolean>(false);

  const modalContext = useContext(ModalContext);

  /**
   * Clears all filters
   */
  const clearFilters = () => {
    setMinTagIDFilter(4000);
    setMaxTagIDFilter(4999);
    setAnimalTypeFilter("all");
    setDietFilter("all");
    setHarvestableFilter("all");
    setMinAgeFilter(-1);
    setMaxAgeFilter(-1);
    setMinFoodSpentFilter(-1);
    setMinWaterSpentFilter(-1);
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
        tagID: { min: minTagIDFilter, max: maxTagIDFilter },
        animalType: animalTypeFilter,
        age: { min: minAgeFilter, max: maxAgeFilter },
        diet: dietFilter,
        harvestable: harvestableFilter,
        minFoodSpent: minFoodSpentFilter,
        minWaterSpent: minWaterSpentFilter,
      };

      // Check if all filters are not set
      if (
        Object.values(filteredData).every(
          (value) => value === null || value === "all" || value === -1
        ) ||
        !filterEnabled ||
        override
      ) {
        // Retrieves all livestock
        await retrieveLivestock().then((livestock) => {
          setLivestock(livestock);
        });
        return;
      }

      // Retrieves the filtered livestock
      await retrieveFilteredLivestock(filteredData).then((livestock) => {
        setLivestock(livestock);
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Syncs data
   */
  const syncData = () => {
    setTimeout(async () => {
      await getLivestock();
      // await getAnimalCounts();
    }, 500);
  };

  /**
   * Adds a new livestock to the database
   */
  const addLivestock = async () => {
    const newLivestock: Livestock = {
      tagID: tagIDAdd,
      animalType: animalTypeAdd,
      age: ageAdd,
      diet: dietAdd,
      weight: weightAdd,
      lastFed: convertDateToSQL(lastFedAdd),
      harvestable: harvestableAdd,
      lastViolatedForHarvestedGoods: convertDateToSQL(
        lastViolatedForHarvestedGoodsAdd
      ),
    };

    try {
      await insertLivestock(newLivestock);
      window.alert(`Livestock #${newLivestock.tagID} successfully added to database!`);
    } catch (err: any) {
      window.alert(`Failed to add Livestock #${newLivestock.tagID} to database!`);
    }
  };

  /**
   * Feeds the livestock
   */
  const feedLivestock = async (livestock: Livestock) => {
    try {
      updateLivestock(livestock, ActionTypes.FEED);
      syncData();
      window.alert(`Successfully fed livestock! \n ${livestock.animalType} #${livestock.tagID} says: "Mmm! That was delicious!"`);
    } catch (err) {
      window.alert(`Failed to feed livestock! \n ${livestock.animalType} #${livestock.tagID} says: "Welp! Guess I'll just starve."`);
    }
  };

  /**
   * Harvests from the livestock
   */
  const harvestLivestock = async (livestock: Livestock) => {
    try {
      updateLivestock(livestock, ActionTypes.HARVEST);
      syncData();
      window.alert(`Successfully harvested livestock! \n ${livestock.animalType} #${livestock.tagID} says: "AAAAAAAAAAAAHHHHHHHHHHH!!!"`);
    } catch (err) {
      window.alert(`Failed to harvest livestock! \n ${livestock.animalType} #${livestock.tagID} says: "Thank the heavens!"`);
    }
  };

  /**
   * Gets animal count
   */
  const getAnimalCounts = async () => {
    if (!livestock) return 0;

    try {
      setLivestockCount([]); // Reset the count

      Object.values(AnimalType).forEach(async (animalType) => {
        await getLivestockCount(animalType).then((count) => {
          count.forEach((c: any) => {
            setLivestockCount((prevCount) => [
              ...prevCount,
              { type: c.animalType, count: c.count },
            ]);
          });
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Loads resources spent on livestock
   */
  const lookUpResourcesSpent = async (livestock: Livestock) => {
    try {
      await getResourcesSpent(livestock).then((resourcesSpent) => {
        modalContext.setModal(
          <>
            <h1>
              Resources Spent On {livestock.animalType} (ID #{livestock.tagID})
            </h1>

            {resourcesSpent ? (
              <div>
                <h2>Total Food Consumed: {resourcesSpent.totalFoodConsumed}</h2>
                <h2>
                  Total Water Consumed: {resourcesSpent.totalWaterConsumed}
                </h2>
              </div>
            ) : (
              <h2>
                This animal has been neglected...deprived of food and water :D
              </h2>
            )}

            <button
              className={styles.Button}
              type="button"
              onClick={() => {
                modalContext.clearModal();
              }}
            >
              Close
            </button>
          </>
        );
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Loads vet records for livestock
   */
  const lookUpVetRecords = async (livestock: Livestock) => {
    try {
      await getVetRecords(livestock).then((vetRecords) => {
        modalContext.setModal(
          <>
            <h1>
              Veterinary Records For {livestock.animalType} (ID #
              {livestock.tagID})
            </h1>

            {vetRecords ? (
              <div>
                <h2>Record ID: #{vetRecords.recordID}</h2>
                <h2>Health Status: {vetRecords.healthstatus}</h2>
                <h2>Record Date: {vetRecords.record_date}</h2>
              </div>
            ) : (
              <h2>No records found</h2>
            )}

            <button
              className={styles.Button}
              type="button"
              onClick={() => {
                modalContext.clearModal();
              }}
            >
              Close
            </button>
          </>
        );
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Terminate the livestock
   */
  const terminateLivestock = async (livestock: Livestock) => {
    try {
      modalContext.setModal(
        <>
          <h1>
            Are you sure you want to terminate {livestock.animalType} (ID #
            {livestock.tagID})?
          </h1>

          <button
            className={styles.Button}
            type="button"
            onClick={() => {
              try {
                deleteLivestock(livestock);
                window.alert(`Successfully terminated livestock #${livestock.tagID}!`);
              } catch(err: any) {
                window.alert(`Could not terminate livestock #${livestock.tagID}!`);
              };

              modalContext.clearModal();
              syncData();
            }}
          >
            Absolutely Yes!
          </button>

          <button
            className={styles.Button}
            type="button"
            onClick={() => {
              modalContext.clearModal();
            }}
          >
            Not Now!
          </button>
        </>
      );
    } catch (err) {
      console.error(err);
    }
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
            {/* VIEW LIVESTOCK FORM */}
            <form className={styles.ViewLivestockForm}>
              <button
                className={styles.Button}
                type="button"
                id="viewLivestockButton"
                onClick={syncData}
              >
                View Livestock
              </button>

              <button
                className={styles.ActionButton}
                type="button"
                onClick={() => {
                  setFilterEnabled(!filterEnabled);
                }}
                id="filter"
              >
                <FaFilter />
              </button>
            </form>

            {filterEnabled && (
              <form className={styles.FilterLivestock}>
                <h2>Filter Livestock</h2>
                <section>
                  <label htmlFor="minTagID">Tag ID</label>
                  <input
                    type="number"
                    name="minTagID"
                    id="minTagID"
                    defaultValue={minTagIDFilter || 4000}
                    min={4000}
                    max={4999}
                    onChange={(e) => {
                      setMinTagIDFilter(parseInt(e.target.value));
                    }}
                  />
                  <label htmlFor="maxTagID">to</label>
                  <input
                    type="number"
                    name="maxTagID"
                    id="maxTagID"
                    defaultValue={maxTagIDFilter || 4999}
                    min={4000}
                    max={4999}
                    onChange={(e) => {
                      setMaxTagIDFilter(parseInt(e.target.value));
                    }}
                  />
                </section>

                <section>
                  <label htmlFor="animalType">Animal Type</label>
                  <select
                    name="animalType"
                    id="animalType"
                    defaultValue={"all"}
                    onChange={(e) => {
                      setAnimalTypeFilter(e.target.value as AnimalType);
                    }}
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
                    name="diet"
                    id="diet"
                    defaultValue={"all"}
                    onChange={(e) => {
                      setDietFilter(e.target.value as CropType);
                    }}
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
                    name="harvestable"
                    id="harvestable"
                    defaultValue={"all"}
                    onChange={(e) => {
                      if (e.target.value === "all") setHarvestableFilter("all");
                      else
                        setHarvestableFilter(
                          e.target.value === "true" ? true : false
                        );
                    }}
                  >
                    <option value="all">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </section>

                <section>
                  <label htmlFor="minAge">Age</label>
                  <input
                    type="number"
                    name="minAge"
                    id="minAge"
                    defaultValue={minAgeFilter || -1}
                    min={-1}
                    max={100}
                    onChange={(e) => {
                      setMinAgeFilter(parseInt(e.target.value));
                    }}
                  />
                  <label htmlFor="maxAge">to</label>
                  <input
                    type="number"
                    name="maxAge"
                    id="maxAge"
                    defaultValue={maxAgeFilter || -1}
                    min={-1}
                    max={100}
                    onChange={(e) => {
                      setMaxAgeFilter(parseInt(e.target.value));
                    }}
                  />
                </section>

                <section>
                  <label htmlFor="minFoodSpent">Min Food Spent</label>
                  <input
                    type="number"
                    name="minFoodSpent"
                    id="minFoodSpent"
                    defaultValue={minFoodSpentFilter || -1}
                    min={-1}
                    onChange={(e) => {
                      setMinFoodSpentFilter(parseInt(e.target.value));
                    }}
                  />
                </section>

                <section>
                  <label htmlFor="minWaterSpent">Min Water Spent</label>
                  <input
                    type="number"
                    name="minWaterSpent"
                    id="minWaterSpent"
                    defaultValue={minWaterSpentFilter || -1}
                    min={-1}
                    onChange={(e) => {
                      setMinWaterSpentFilter(parseInt(e.target.value));
                    }}
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

            {/* ADD LIVESTOCK FORM */}
            <form className={styles.AddLivestockForm}>
              <button
                className={styles.Button}
                type="button"
                onClick={() => {
                  setAddEnabled(!addEnabled);
                }}
              >
                Add Livestock
              </button>
            </form>

            {addEnabled && (
              <form className={styles.AddLivestock}>
                <h2>Add Livestock</h2>
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
                    onChange={(e) => {
                      setTagIDAdd(e.target.value as unknown as number);
                    }}
                  />
                </section>

                <section>
                  <label htmlFor="animalType">Animal Type</label>
                  <select
                    name="animalType"
                    id="animalType"
                    defaultValue={"cow"}
                    onChange={(e) => {
                      setAnimalTypeAdd(e.target.value as AnimalType);
                    }}
                  >
                    <option value="cow">Cow</option>
                    <option value="chicken">Chicken</option>
                    <option value="pig">Pig</option>
                    <option value="sheep">Sheep</option>
                  </select>
                </section>

                <section>
                  <label htmlFor="diet">Diet</label>
                  <select
                    name="diet"
                    id="diet"
                    defaultValue={"cow"}
                    onChange={(e) => {
                      setDietAdd(e.target.value as CropType);
                    }}
                  >
                    <option value="canola">Canola</option>
                    <option value="wheat">Wheat</option>
                    <option value="corn">Corn</option>
                    <option value="potatoes">Potatoes</option>
                    <option value="mustard">Mustard</option>
                    <option value="coconut">Coconut</option>
                  </select>
                </section>

                <section>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    min={0}
                    defaultValue={1}
                    onChange={(e) => {
                      setAgeAdd(e.target.value as unknown as number);
                    }}
                  />
                </section>

                <section>
                  <label htmlFor="weight">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    min={0}
                    defaultValue={5}
                    onChange={(e) => {
                      setWeightAdd(e.target.value as unknown as number);
                    }}
                  />
                </section>

                <section>
                  <label htmlFor="lastFed">Last Fed</label>
                  <input
                    type="date"
                    name="lastFed"
                    id="lastFed"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      setLastFedAdd(new Date(e.target.value));
                    }}
                  />
                </section>

                <section>
                  <label htmlFor="lastViolatedForHarvestedGoods">
                    Last Harvested
                  </label>
                  <input
                    type="date"
                    name="lastViolatedForHarvestedGoods"
                    id="lastViolatedForHarvestedGoods"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      setLastViolatedForHarvestedGoodsAdd(
                        new Date(e.target.value)
                      );
                    }}
                  />
                </section>

                <section>
                  <label htmlFor="harvestable">Harvestable</label>
                  <select
                    name="harvestable"
                    id="harvestable"
                    defaultValue={"true"}
                    onChange={(e) => {
                      setHarvestableAdd(
                        e.target.value === "true" ? true : false
                      );
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </section>

                <button
                  className={styles.Button}
                  type="button"
                  id="addLivestockButton"
                  onClick={() => {
                    addLivestock();
                    syncData();
                  }}
                >
                  Add Livestock #{tagIDAdd}
                </button>
              </form>
            )}

            {/* LIVESTOCK SUMMARY */}
            <div className={styles.LivestockSummary}>
              <h2>Livestock Summary</h2>
              <section>
                {Object.keys(AnimalType).map((animalType, index) => (
                  <span key={index}>
                    <h3># of {animalType}:</h3>
                    {livestockCount.find(
                      (livestockCount) =>
                        livestockCount.type.toUpperCase() === animalType
                    )?.count || 0}
                  </span>
                ))}
                <button className={styles.Button} onClick={getAnimalCounts}>
                  Refresh
                </button>
              </section>
            </div>
          </div>
        </div>

        {/* DISPLAY PANEL */}
        <div className={styles.DisplayPanel}>
          <h2>Total Livestock Displayed: {livestock?.length}</h2>

          {livestock &&
            livestock.map((livestock, index) => (
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
                    <p>
                      Type: <br />
                      <b>{livestock.animalType}</b>
                    </p>
                    <p>
                      Age: <br />
                      <b>{livestock.age} YEARS</b>
                    </p>
                    <p>
                      Weight: <br />
                      <b>{livestock.weight} KG</b>
                    </p>
                  </section>

                  <b>FEEDING</b>
                  <section>
                    <p>
                      Diet: <br />
                      <b>{livestock.diet}</b>
                    </p>
                    <p>
                      Last Fed: <br />
                      <b>{livestock.lastFed || "N/A"}</b>
                    </p>
                    {/* <p>
                      Food Spent: <br />
                      <b>
                        {livestock.foodSpent ? livestock.foodSpent : "None"}
                      </b>
                    </p>
                    <p>
                      Water Spent: <br />
                      <b>
                        {livestock.waterSpent ? livestock.waterSpent : "None"}
                      </b>
                    </p> */}
                  </section>

                  <b>HARVEST</b>
                  <section>
                    <p>
                      Harvestable: <br />
                      <b>{livestock.harvestable ? "YES" : "NO"}</b>
                    </p>
                    <p>
                      Last Violated For Harvested Goods: <br />
                      <b>{livestock.lastViolatedForHarvestedGoods || "N/A"}</b>
                    </p>
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
                    title={
                      livestock.harvestable
                        ? `Harvest #${livestock.tagID}`
                        : `Cannot harvest #${livestock.tagID} yet`
                    }
                    disabled={!livestock.harvestable}
                  >
                    <GiBasket />
                  </button>

                  <button
                    className={styles.ActionButton}
                    type="button"
                    onClick={() => lookUpResourcesSpent(livestock)}
                    id="resourcesSpent"
                    title={`Read Resources Spent on #${livestock.tagID}`}
                  >
                    <GiPowderBag />
                  </button>

                  <button
                    className={styles.ActionButton}
                    type="button"
                    onClick={() => lookUpVetRecords(livestock)}
                    id="vetRecords"
                    title={`Read Vet Records of #${livestock.tagID}`}
                  >
                    <GiMedicalPack />
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
