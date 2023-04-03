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
	minTagID?: int | null;
	maxTagID?: int | null;
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
  minQuantity?: int | null;
  maxQuantity?: int | null;
  // orderBy?: String | null;
  // order?: boolean | null;
};
