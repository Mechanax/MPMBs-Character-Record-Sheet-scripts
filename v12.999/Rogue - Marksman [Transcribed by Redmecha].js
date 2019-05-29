/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Rogue, called "Marksman"
				This subclass has been made by MD
				This code uses the subclass as it was on 2019-05-29
	Code by:	Redmecha
	Date:		2018-01-17 (sheet v12.999)
*/

var iFileName = "Rogue - Marksman [Transcribed by Redmecha].js";
RequiredSheetVersion(12.999);

AddSubClass("rogue", "marksman", {
	regExpSearch : /marksman/i,
	subname : "Marksman",
	source : ["HB", 0],
	fullname : "Marksman",
	features : {
		"subclassfeature3" : {
			name : "Deadly Precision",
			source : ["HB", 0],
			minlevel : 3,
			description : desc([
				"I don't need adv. for Sneak Attack if I'm using a ranged weapon"
			])
		},
		"subclassfeature3.1" : {
			name : "Archery Fighting Style",
			source : ["HB", 0],
			description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
			calcChanges : {
				atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
			}
		},
		"subclassfeature9" : {
			name : "Eagle Eye",
			source : ["HB", 0],
			minlevel : 9,
			description : "\n   " + "I can make a perception check as a bonus action",
			action : ["bonus action", ""]
		},
		"subclassfeature13" : {
			name : "Line Em' Up",
			source : ["HB", 0],
			minlevel : 13,
			description : desc([
				"When I kill a creature with a ranged attack",
				"I can make an attack roll against a creature behind the one killed",
				"If the attack hits, that creature takes the left-over damage, -1 for each foot traveled"
			])
		},
		"subclassfeature17" : {
			name : "Careful Aim",
			source : ["HB", 0],
			minlevel : 17,
			description : desc([
				"I can spend two rounds preparing a ranged attack (conc)",
				"After that I can make an attack, on a hit it is an automatic critical hit"
			])
		}
	}
});
