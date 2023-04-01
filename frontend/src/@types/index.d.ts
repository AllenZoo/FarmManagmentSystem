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
}