import React, { useReducer, useEffect } from "react";
import * as types from "../types";

const initialState: types.GameStateType = {
	status: "ready",
	spins: 0,
	lockedWheels: 0,
	player: {
		crownHP: 10,
		bulwark: 0,
		wheels: getRandomWheels(),
	},
	opponent: {
		crownHP: 10,
		bulwark: 0,
		wheels: getRandomWheels([], true),
	},
};

function getRandomWheels(wheels: types.PlayerType["wheels"] = [], isOpponent = false): types.PlayerType["wheels"] {
	if (wheels.length) {
		return wheels.map((wheel) => {
			if (wheel.locked) return wheel;
			return {
				tiles: [getRandomTile(), getRandomTile(), getRandomTile()],
				locked: false,
				selected: wheel.selected,
			};
		});
	}

	return Array.from({ length: 5 }, (_, index) => ({
		tiles: [getRandomTile(), getRandomTile(), getRandomTile()],
		locked: false,
		selected: index === 0,
	}));
}

function getRandomTile(): types.WheelTileType {
	const icon = types.wheelTileIcons[Math.floor(Math.random() * types.wheelTileIcons.length)];
	const double = icon === "blank" ? false : Math.random() >= 0.5;
	const hasXP = icon === "blank" || icon === "hammer" ? false : Math.random() >= 0.5;

	return {
		icon,
		double,
		hasXP,
	};
}

function reducer(state: types.GameStateType, action: types.ReducerActionType): types.GameStateType {
	if (state.status !== "ready" && state.status !== "active") return state;

	switch (action.type) {
		case "spinWheels":
			if (state.spins === 3 || state.lockedWheels === state.player.wheels.length) {
				return {
					...state,
					status: "roundEnd",
				};
			}

			return {
				...state,
				status: "active",
				spins: state.spins + 1,
				player: {
					...state.player,
					wheels: getRandomWheels(state.player.wheels),
				},
				opponent: {
					...state.opponent,
					wheels: getRandomWheels(state.opponent.wheels, true),
				},
			};
		case "lockWheel":
			let lockedWheels = state.lockedWheels;

			return {
				...state,
				player: {
					...state.player,
					wheels: state.player.wheels.map((wheel, index) => {
						const lockWheel = index === action.payload;

						if (lockWheel && wheel.locked) lockedWheels--;
						else if (lockWheel) lockedWheels++;

						return {
							...wheel,
							locked: lockWheel && wheel.locked ? false : lockWheel,
						};
					}),
				},
				lockedWheels,
			};
		case "selectWheel":
			return {
				...state,
				player: {
					...state.player,
					wheels: state.player.wheels.map((wheel, index) => {
						return {
							...wheel,
							selected: index === action.payload,
						};
					}),
				},
			};
		default:
			throw new Error("Unknown action");
	}
}

export default function GameBoard() {
	const [{ status, spins, lockedWheels, player, opponent }, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		// run code dependent on current game status
	}, [status]);

	return <div className="board"></div>;
}
