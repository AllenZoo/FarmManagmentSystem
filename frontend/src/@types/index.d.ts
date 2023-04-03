/* -------------------------------------------------------------------------- */
/*                               TYPE INTERFACES                              */
/* -------------------------------------------------------------------------- */
interface Livestock {
	tagID: int;
	animalType: AnimalType;
	age: int;
	diet: CropType;
	weight: double;
	harvestable: boolean;
	lastFed: String | null;
	lastViolatedForHarvestedGoods: String | null;
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
  harvestable?: boolean | String | null;
  minLastViolatedForHarvestedGoods?: String | null;
  maxLastViolatedForHarvestedGoods?: String | null;
  // orderBy?: String | null;
  // order?: boolean | null;
};
