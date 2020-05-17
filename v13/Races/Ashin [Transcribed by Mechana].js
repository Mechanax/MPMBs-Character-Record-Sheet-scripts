/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Ashin"
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/171361/)
				This subclass is made by Marshall Miller
	Code by:	Mechana
	Date:		2020-05-16 (sheet v13)

	Please support the creator of this content (Marshall Miller) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?author=Marshall%20Miller
*/

var iFileName = "Ashin [Transcribed by Mechana].js";
RequiredSheetVersion(13);

RaceList["male ashin"] = {
	regExpSearch : /^(?=.*male)(?=.*ashin).*$/i,
	name : "Male Ashin",
	sortname : "Ashin, Male",
	source : [["HB", 0]],
	plural : "Male Ashin",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Arcane"],
	skills : ["Athletics"],
	age : " reach adulthood in their late teens and live around 120 years",
	height : " range from 7 to 8 feet tall",
	weight : " weigh over 300 lb.",
	scorestxt : "+2 Strength and +1 to one other ability score of my choice",
	scores : [2, 0, 0, 0, 0, 0],
	trait : "Male Ashin (+2 Strength and +1 to one ability scores of my choice)\nPowerful Build: I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift.\nBrutal Strength: When I score a critical hit with a melee weapon attack, I can add an additional weapon damage die to the damage of the critical hit.",
	toolProfs : [
		["Artisan's Tools", 1]
	],
	carryingCapacity : 2
}

RaceList["female ashin"] = {
	regExpSearch : /^(?=.*female)(?=.*ashin).*$/i,
	name : "Female Ashin",
	sortname : "Ashin, Female",
	source : ["HB", 0],
	plural : "Female Ashin",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Arcane"],
	skills : ["Arcana"],
	age : " reach adulthood in their late teens and live around 120 years",
	height : " range from 4 to 5 feet tall",
	weight : " weigh between 70 and 110 lb.",
	scorestxt : "+2 Intelligence and +1 to one other ability score of my choice",
	scores : [0, 0, 0, 2, 0, 0],
	trait : "Female Ashin (+2 Intelligence and +1 to one ability scores of my choice)\nInnate Magic: I learn two cantrips from the wizard spell list. Int is my ability for them.",
	spellcastingAbility : 4,
	spellcastingBonus : {
		name : "Innate Magic",
		"class" : "wizard",
		level : [0, 0],
		firstCol : 'atwill'
	},
	toolProfs : [
		"Alchemist's supplies"
	]
}
