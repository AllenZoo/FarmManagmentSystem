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
  animalType?: AnimalType | null;
  minAge?: int | null;
  maxAge?: int | null;
  diet?: CropType | null;
  minWeight?: double | null;
  maxWeight?: double | null;
  minLastFed?: String | null;
  maxLastFed?: String | null;
  harvestable?: boolean | null;
  minLastViolatedForHarvestedGoods?: String | null;
  maxLastViolatedForHarvestedGoods?: String | null;
  // orderBy?: String | null;
  // order?: boolean | null;
};
