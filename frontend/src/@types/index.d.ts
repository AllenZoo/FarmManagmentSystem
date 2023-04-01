/* -------------------------------------------------------------------------- */
/*                               TYPE INTERFACES                              */
/* -------------------------------------------------------------------------- */
interface Livestock {
  tagID: int;
  animalType: AnimalType;
  age: int;
  diet: CropType;
  weight: double;
  lastFed: String;
  harvestable: boolean;
  lastViolatedForHarvestedGoods: String;
};

interface FilteredLivestock {
  animalTypes: AnimalType[] | null;
  minAge: int | null;
  maxAge: int | null;
  diets: CropType[] | null;
  minWeight: double | null;
  maxWeight: double | null;
  minLastFed: String | null;
  maxLastFed: String | null;
  harvestable: boolean | null;
  minLastViolatedForHarvestedGoods: String | null;
  maxLastViolatedForHarvestedGoods: String | null;
};
