function newGame () {
	var toReturn = {
		global: {
		},
		job: [ "Farmer", "Hunter", "Woodcutter", "Iron Miner", "Stone Miner", "Carpenter"
//				, "Innkeeper", "Bartender", "Waiter"
		],
		area: [ "Plain", "Grassland", "Forest", "Hill"//, "Mountain"
		],
	};
	
	return toReturn;
}
var game = newGame();
