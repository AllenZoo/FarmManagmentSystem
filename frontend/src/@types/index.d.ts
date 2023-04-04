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
  foodSpent?: int | null;
  waterSpent?: int | null;
};

interface FilteredLivestock {
  tagID?: { min: int | null, max: int | null } | null;
	animalType?: AnimalType | null;
	diet?: CropType | null;
  age?: { min: int | null, max: int | null } | null;
  weight?: { min: double | null, max: double | null } | null;
  lastFed?: { min: String | null, max: String | null } | null;
  lastViolatedForHarvestedGoods?: { min: String | null, max: String | null } | null;
	harvestable?: boolean | String | null;
	minFoodSpent?: int | null;
	minWaterSpent?: int | null;
	// orderBy?: String | null;
	// order?: boolean | null;
};

interface Crop {
	cropType: CropType;
	cropVariant: CropVariant;
	cropStatus: CropStatus;
  quantity: int;
};

interface FilteredCrop {
	cropType?: CropType | null;
	cropVariant?: CropVariant | null;
	cropStatus?: CropStatus | null;
	quantity?: { min: int | null; max: int | null } | null;
	// orderBy?: String | null;
	// order?: boolean | null;
};
