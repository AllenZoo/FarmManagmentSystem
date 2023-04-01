/* -------------------------------------------------------------------------- */
/*                                    ENUMS                                   */
/* -------------------------------------------------------------------------- */
export enum CropType {
	CANOLA = "CANOLA",
	WHEAT = "WHEAT",
	CORN = "CORN",
	POTATOES = "POTATOES",
	MUSTARD = "MUSTARD",
	COCONUT = "COCONUT",
}

export enum CropStatusType {
	PLANTED = "PLANTED",
	HARVESTED = "HARVESTED",
}

export enum CropVariantType {
	POLLINATED = "POLLINATED",
	HYBRIDS = "HYBRIDS",
}

export enum FieldState {
	EMPTY = "EMPTY",
	GROWING = "GROWING",
	RESTING = "RESTING",
}

export enum AnimalType {
	CHICKEN = "CHICKEN",
	SHEEP = "SHEEP",
	COW = "COW",
	PIG = "PIG",
}

export enum HealthStatus {
	SICK = "SICK",
	ADEQUATE = "ADEQUATE",
	HEALTHY = "HEALTHY",
}
