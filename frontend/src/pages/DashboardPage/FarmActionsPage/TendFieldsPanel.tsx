import { useState, useContext, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';

import ModalContext from '@contexts/modalContext';

import {
  retrieveCrops,
  retrieveFilteredCrops,
} from '@controllers/farmerActionsController';

import { CropType, CropVariant, CropStatus } from '@utils/enums';

import CanolaProfile from '@assets/crops/canola.png';
import WheatProfile from '@assets/crops/wheat.png';
import CornProfile from '@assets/crops/corn.png';
import PotatoProfile from '@assets/crops/potato.png';
import MustardProfile from '@assets/crops/mustard.png';
import CoconutProfile from '@assets/crops/coconut.png';

import styles from './TendFieldsPanel.module.scss';


/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */
/**
 * Gets the profile image of the crops
 */
const getCropProfile = (cropType: CropType) => {
  switch (cropType) {
    case CropType.CANOLA:
      return CanolaProfile;
    case CropType.WHEAT:
      return WheatProfile;
    case CropType.CORN:
      return CornProfile;
    case CropType.POTATOES:
      return PotatoProfile;
    case CropType.MUSTARD:
      return MustardProfile;
    case CropType.COCONUT:
      return CoconutProfile;
    default:
      return "";
  };
};


/**
 * Renders the 'Nurture Animals' panel of Farmer Actions
 */
const TendFieldsPanel = () => {
  const [crops, setCrops] = useState<Crop[] | null>(null);
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);

  const [cropTypeFilter, setCropTypeFilter] = useState<CropType | string>("all");
  const [cropVariantFilter, setCropVariantFilter] = useState<CropVariant | string>("all");
  const [cropStatusFilter, setCropStatusFilter] = useState<CropStatus | string>("all");
  const [minQuantityFilter, setMinQuantityFilter] = useState<number>(-1);
  const [maxQuantityFilter, setMaxQuantityFilter] = useState<number>(-1);

  const modalContext = useContext(ModalContext);

  /**
   * Clears all filters
   */
  const clearFilters = () => {
    setCropTypeFilter("all");
    setCropVariantFilter("all");
    setCropStatusFilter("all");
    setMinQuantityFilter(-1);
    setMaxQuantityFilter(-1);
    setFilterEnabled(false);
    getCrops(true);
  };

  /**
   * Retrieves all crops from the database
   * @param override If true, will ignore all filters
   */
  const getCrops = async (override?: boolean) => {
    try {
      const filteredData: FilteredCrop = {
        cropType: cropTypeFilter,
        cropVariant: cropVariantFilter,
        cropStatus: cropStatusFilter,
        minQuantity: minQuantityFilter,
        maxQuantity: maxQuantityFilter,
      }

      // Check if all filters are not set
      if (
        Object.values(filteredData).every((value) => (value === null || value === "all" || value === -1)) ||
        !filterEnabled ||
        override
      ) {
        // Retrieves all crops
        await retrieveCrops().then((crops) => {
          setCrops(crops);
        });
        return;
      };

      // Retrieves the filtered crops
      await retrieveFilteredCrops(filteredData).then((crops) => {
        setCrops(crops);
      });
    } catch (err) {
      console.error(err);
    };
  };

  /**
   * Syncs data
   */
  const syncData = () => {
    setTimeout(async () => {
      await getCrops();
    }, 500);
  };

  /**
   * Syncs the crop data with the database
   */
  useEffect(() => {
    syncData();
  }, []);

  return (
    <div className={styles.Panel}>
      <main>
        {/* CONTROL PANEL */}
        <div className={styles.ControlPanel}>
          <h2>Tend Fields</h2>

          <div className={styles.Controls}>
            <form className={styles.ViewCrops}>
              <button
                className={styles.Button}
                type="button"
                onClick={syncData}
              >
                View Crops
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
              <form className={styles.FilterCrops}>
                <section>
                  <label htmlFor="cropType">Crop Type</label>
                  <select
                    className={styles.Select}
                    name="cropType"
                    id="cropType"
                    defaultValue={"all"}
                    onChange={(e) => {setCropTypeFilter(e.target.value as CropType)}}
                  >
                    <option value="all">All</option>
                    <option value="canola">Canola</option>
                    <option value="wheat">Wheat</option>
                    <option value="corn">Corn</option>
                    <option value="potato">Potato</option>
                    <option value="mustard">Mustard</option>
                    <option value="coconut">Coconut</option>
                  </select>
                </section>

                <section>
                  <label htmlFor="cropVariant">Variant</label>
                  <select
                    className={styles.Select}
                    name="cropVariant"
                    id="cropVariant"
                    defaultValue={"all"}
                    onChange={(e) => {setCropVariantFilter(e.target.value as CropVariant)}}
                  >
                    <option value="all">All</option>
                    <option value="pollinated">Pollinated</option>
                    <option value="hybrids">Hybrids</option>
                  </select>
                </section>

                <section>
                  <label htmlFor="cropStatus">Crop Status</label>
                  <select
                    className={styles.Select}
                    name="cropStatus"
                    id="cropStatus"
                    defaultValue={"all"}
                    onChange={(e) => {setCropStatusFilter(e.target.value as CropStatus)}}
                  >
                    <option value="all">All</option>
                    <option value="planted">Planted</option>
                    <option value="harvested">Harvested</option>
                  </select>
                </section>

                <section>
                  <label htmlFor="minQuantity">Min Quantity</label>
                  <input
                    type="number"
                    name="minQuantity"
                    id="minQuantity"
                    defaultValue={minQuantityFilter || -1}
                    min={-1}
                    max={9999}
                    onChange={(e) => {setMinQuantityFilter(parseInt(e.target.value))}}
                  />
                </section>
                  
                <section>
                  <label htmlFor="maxQuantity">Max Quantity</label>
                  <input
                    type="number"
                    name="maxQuantity"
                    id="maxQuantity"
                    defaultValue={maxQuantityFilter || -1}
                    min={-1}
                    max={9999}
                    onChange={(e) => {setMaxQuantityFilter(parseInt(e.target.value))}}
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
          </div>
        </div>

        {/* DISPLAY PANEL */}
        <div className={styles.DisplayPanel}>
          <h2>Total Crops Displayed: {crops?.length}</h2>

          {crops && crops.map((crop, index) => (
            <fieldset key={index} className={styles.CropInfo}>
              <legend>Crop: {crop.cropType}</legend>
              <img
                src={getCropProfile(crop.cropType)}
                alt=""
                draggable={false}
              />

              <div className={styles.Info}>
                <b>GENERAL</b>
                <section>
                  <p>Variant: <b>{crop.cropVariant}</b></p>
                  <p>Quantity: <b>{crop.quantity}</b></p>
                  <p>Crop Status: <b>{crop.cropStatus}</b></p>
                </section>
              </div>
            </fieldset>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TendFieldsPanel;
