export const wheelTileIcons = ["diamond", "square", "hammer", "blank"] as const;

export type AttributeType = {
	type: "crownDamage" | "bulwarkDamage" | "actionDamage" | "healthBoost" | "actionBoost";
	attribute: number;
};

export type FigurineType = {
	type: "mage" | "knight" | "archer" | "engineer" | "assassin" | "priest";
	position: "left" | "right";
	level: "bronze" | "silver" | "gold";
	actionTokens: number;
	maxActionTokens: number;
	experience: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	attributes: [AttributeType, AttributeType];
};

export type WheelTileType = {
	icon: (typeof wheelTileIcons)[number];
	double: boolean;
	hasXP: boolean;
};

export type WheelType = {
	tiles: [WheelTileType, WheelTileType, WheelTileType];
	selected: boolean;
	locked: boolean;
};

export type PlayerType = {
	crownHP: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	bulwark: 0 | 1 | 2 | 3 | 4 | 5;
	wheels: WheelType[];
	figurines?: [FigurineType, FigurineType];
};

export type GameStateType = {
	status: "ready" | "active" | "roundEnd" | "win" | "loss" | "draw";
	spins: number;
	lockedWheels: number;
	player: PlayerType;
	opponent: PlayerType;
};

export type ReducerActionType = {
	type: "spinWheels" | "lockWheel" | "selectWheel";
	payload?: number;
};
