/*  
    !WHAT IS THIS?!
    This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
    Import this file using the "Add Extra Materials" bookmark.

    !KEEP IN MIND!
    It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making my character with it).
*/

/*  
    !INFORMATION!
    Subject:    Class
    Effect:     This script adds a class called the "Inventor" and will add its 9 subclasses once completed.

                This class has been made by KibblesTasty
                It can be found here: https://www.kthomebrew.com/
                This code is based on v2.2.2 of KibblesTasty's work (2021-12-07)

                This script was based upon most of MPMB's scripts.

    Code by:    Mechana
    Date:       2022-01-22 (sheet v13.1.0)
*/

/*  
    !IMPORTANT!
    This class has a lot of information to cover. Some of the features are very shortened versions of the full feature.
    Make sure you read the full description from the source. Also, I used a lot of different methods to fit the info, some of them are a little weird
*/

/** 
 * TODO: Changes for the update to v13 of sheet
 * | Use getFeatureChoice to check for chosen features
 * | Make a lot of the features/upgrades into magic items
 * | Add automation for ability score changes 
 * | Add automation for spell DC/attack changes
 */
/**
 * TODO: Changes and automation
 * | Rewrite the Cannonsmith subclass to be closer to MPMB's standards, fix bugs, and update to 2.0.2 of the class and v13 of the sheet
 * | Rewrite the Gadgetsmith subclass to be closer to MPMB's standards, fix bugs, and update to 2.0.2 of the class and v13 of the sheet
 * | Rewrite the Warsmith subclass to be closer to MPMB's standards, fix bugs, and update to 2.0.2 of the class and v13 of the sheet
 * | Automate the Gadgetsmith's Mechanical Familiar upgrade
 * | Write the code for Golemsmith
 * | Write the code for Infustionsmith
 * | Write the code for Potionsmith
 * | Write the code for Wandsmith
 */

var iFileName = "Inventor v2.2.2 [KibblesTasty's work, transcribed by Mechana].js";
RequiredSheetVersion("13.1.0");

SourceList["KT:I"] = {
    name : "KibblesTasty: Inventor (v2.2.2)",
    abbreviation : "KT:I",
    group : "kthomebrew",
    url : "https://www.kthomebrew.com/",
    date : "2021/12/07"
};

//first make the sheet know which spells are Inventor spells
[
    // 1st level
    "alarm",
    "arcane ablation",
    "arcane weapon",
    "awaken rope",
    "bond item",
    "catapult",
    "comprehend languages",
    "cure wounds",
    "detect magic",
    "disguise self",
    "expeditious retreat",
    "fall",
    "false life",
    "feather fall",
    "grease",
    "identify",
    "illusory script",
    "jump",
    "longstrider",
    "sanctuary",
    "seeking projectile",
    "snare",
    "unburden",
    "unseen servant",
    "tenser's floating disk",
    // 2nd level
    "aid",
    "alter self",
    "animate object",
    "arcane lock",
    "blur",
    "darkvision",
    "enhance ability",
    "enlarge/reduce",
    "find traps",
    "heat metal",
    "hold person",
    "imbue luck",
    "invisibility",
    "knock",
    "lightning charged",
    "locate object",
    "magic weapon",
    "magic mouth",
    "nystul's magic aura",
    "protection from poison",
    "see invisibility",
    "spider climb",
    "thunderburst mine",
    // 3rd level
    "dispel magic",
    "dispel construct",
    "elemental weapon",
    "fireburst mine",
    "gaseous form",
    "glyph of warding",
    "magic circle",
    "nondetection",
    "protection from energy",
    "sending",
    "water breathing",
    "water walk",
    "wind wall",
    // 4th level
    "arcane eye",
    "death ward",
    "fabricate",
    "fire shield",
    "freedom of movement",
    "greater invisibility",
    "leomund's secret chest",
    "otiluke's resilient sphere",
    "repair",
    "stone shape",
    "stoneskin",
    "translocating shot",
    // 5th level
    "animate objects",
    "creation",
    "hold monster",
    "legend lore",
    "mislead",
    "passwall",
    "telekinesis",
    "teleportation circle",
    "vorpal weapon",
    "wall of stone"
].forEach( function (s) {
    if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("inventor") === -1) SpellsList[s].classes.push("inventor");
});

//*****************************************************-Class-********************************************************\\

ClassList["inventor"] = {
    regExpSearch : /inventor/i,
    name : "Inventor",
    source : ["KT:I", 1],
    primaryAbility : "\n \u2022 Inventor: Thunder/Gadget/Curse/Relic: Dexterity\n\t Golem/Infusion/Potion/Rune: Intelligence\n\t War/Flesh: Strength",
    abilitySave : 4,
    prereqs : "Intelligence 13",
    improvements :  [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    die : 8,
    saves : ["Con", "Int"],
    skillstxt : {
		primary : "Choose three from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand",
        secondary : "You get Arcana"
    },
    toolProfs : { 
        primary : [["Thieves' Tools"], ["Any tool", 1]]
    },
    armorProfs : [
        [true, true, false, false],
        [true, false, false, false]
    ],
    weaponsProfs : [
        [true, false, ["hand crossbow", "heavy crossbow"]]
    ],
    equipment : "Inventor starting equipment:" + 
        "\n \u2022 A light crossbow and 20 bolts -or- any two simple weapons;" + 
        "\n \u2022 Scale mail -or- leather armor -or- chain mail;" + 
        "\n \u2022 Thieves' tools and a dungeoneer's pack." + 
        "\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
    subclasses : ["Inventor Specialization", [
        ////"inventor-gadgetsmith",
        ////"inventor-golemsmith",
        ////"inventor-infusionsmith",
        ////"inventor-potionsmith",
        "inventor-thundersmith",
        "inventor-warsmith",
        ////"inventor-fleshsmith",
        ////"inventor-cursesmith",
        ////"inventor-runesmith",
        ////"inventor-relicsmith"
    ]],
    attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    spellcastingFactor : 2,
    spellcastingKnown : {
        spells : [0, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
    },
    features : {
        "subclassfeature1" : {
            name : "Inventor Specialization",
            source : ["KT:I", 3],
            minlevel : 1,
            description : desc([
                "Choose the Specialization you focus your craft on and put it in the \"Class\" field"
            ])
        },
        "magic item analysis" : {
            name : "Magic Item Analysis",
            source : ["KT:I", 3],
            minlevel : 1,
            description : desc([
                "I can cast Detect Magic and Identify as rituals without material components"
            ]),
            spellcastingBonus : [{
                name :  "Magic Item Analysis",
                spells : ["detect magic"],
                selection : ["detect magic"],
                firstCol : "",
            }, {
                name : "Magic Item Analysis",
                spells : ["identify"],
                selection : ["identify"],
                firstCol : ""
            }],
            changeeval : function(lvl) {
                if (lvl[1] >= 11) {
                    ClassList["inventor"].features["magic item analysis"].spellcastingBonus[0].firstCol = "atwill";
                    ClassList["inventor"].features["magic item analysis"].spellcastingBonus[1].firstCol = "atwill";
                }
            },
        },
        "tool expertise" : {
            name : "Tool Expertise",
            source : ["KT:I", 3],
            minlevel : 2,
            description : " [Double proficiency with any tools from this class]",
            skillstxt : "I get double proficiency with any tool proficiencies I gain from the Inventor class."
        },
        "spellcasting" : {
            name : "Spellcasting",
            source : ["KT:I", 3],
            minlevel : 2,
            description : desc([
                "I can cast Inventor spells that I know, using Intelligence as my spellcasting ability",
                "I can use an arcane focus as a spellcasting focus"
            ]),
            additional : levels.map(function (n, idx) {
                return n < 2 ? "" : [0, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12][idx] + " spells known";
            })
        },
        "arcane reconstruction" : {
            name : "Arcane Reconstruction",
            source : ["KT:I", 4],
            minlevel : 6,
            description : desc([
                "I learn Mending and Cure Wounds (which can also heal constructs) as Inventor spells",
                "If I already know Cure Wounds I can take another spell from the Inventor list"
            ]),
            spellcastingBonus : [{
                name : "Arcane Reconstruction",
                spells : ["mending"],
                selection : ["mending"]
            }, {
                name : "Arcane Reconstruction",
                spells : ["cure wounds"],
                selection : ["cure wounds"],
            }]
        },
        "cross disciplinary knowledge" : {
            name : "Cross Disciplinary Knowledge",
            source : ["KT:I", 4],
            minlevel : 6,
            description : desc([
                "Use the \"Choose Features\" button to add a feature from another subclass"
            ]),
            choices: ["Stormforged Weapon", "Infused Armament", "Alchemical Reagents Pouch", "Gadgetsmith Upgrade"],
            "stormforged weapon" : {
                name : "Stormforged Weapon",
                description : desc([
                    "I get a Thundersmith's Stormforged Weapon, I get prof and how to make the ammo"
                ]),
                source : ["KT:I", 4]
                //TODO: Add automation
            },
            "infused armament" : {
                name : "Infused Armament",
                description : desc([
                    "I get an Infusionsmith's Animated Weapon, Blasting Rod, or infused weapon"
                ]),
                source : ["KT:I", 4]
                //TODO: Add automation
            },
            "alchemical reagents pouch" : {
                name : "Alchemical Reagents Pouch",
                description : desc([
                    "I get a Potionsmith's Alchemical Reagents Pouch and Alchemical Fire or Acid"
                ]),
                source : ["KT:I", 4]
                //TODO: Add automation
            },
            "gadgetsmith upgrade" : {
                name : "Gadgetsmith Upgrade",
                description : desc([
                    "I get an unrestricted Gadgetsmith Upgrade"
                ]),
                source : ["KT:I", 4]
                //TODO: Add automation
            }
        },
        "wondrous items proficiency" : {
            name : "Wondrous Items Proficiency",
            source : ["KT:I", 4],
            minlevel : 7,
            description : desc([
                "I can attune to 4 and, ignore class based restrictions on, magical items"
            ]),
        },
        "improved magical crafting" : {
            name : "Improved Magical Crafting",
            source : ["KT:I", 4],
            minlevel : 10,
            description : desc([
                "I can make a magic item in half the normal time. I can use 1 hr of a LR to:",
                "Make progress toward crafting a magic item, scroll, or potion"
            ])
        },
        "wondrous item recharge" : {
            name : "Wondrous Item Recharge",
            source : ["KT:I", 4],
            minlevel : 10,
            description : desc([
                "I can refill a magic item's charges needed to use it once, if they are used to cast spells",
                "I spend 1 min and a spell slot grater then or equal to the level of the spell the item casts"
            ])
        },
        "study of magic" : {
            name : "Study of Magic",
            source : ["KT:I", 4],
            minlevel : 11,
            description : " [Detect Magic and Identify at will]" + desc([
                "I have adv on all Int(Arcana) checks about magical traps, effects, or runes"
            ]),
            skillstxt : "adv on Int(Arcana) checks about magical traps, effects, or runes"
        },
        "wondrous item mastery" : {
            name : "Wondrous Item Mastery",
            source : ["KT:I", 4],
            minlevel : 18,
            description : desc([
                "I can attune to 5 and activate magic items that would normally take an action as a bonus action"
            ])
        },
        "peerless inventor" : {
            name : "Peerless Inventor",
            source : ["KT:I", 4],
            minlevel : 20,
            description : desc([
                "After every short rest I can select one extra 11th or lower upgrade from my subclass"
            ])
        },
    }
};

//***************************************************-Subclasses-*****************************************************\\

upgradeAdditionalMaker = function(n) {
    return !n ? "" : n + " upgrade" + (n > 1 ? "s" : "") + " known";
}

ClassSubList["inventor-thundersmith"] = {
    regExpSearch : /thundersmith/i,
    subname : "Thundersmith",
    source : ["KT:I", 22],
    features : {
        "subclassfeature1" : {
            name : "Bonus Proficiency",
            source : ["KT:I", 22],
            minlevel : 1,
            description : " [tinker's tools, smith's tools]" + desc([
                "I can create up to 50 rounds of ammunition during a LR (1gp per 10 rounds)"
            ]),
            toolProfs : ["Smith's Tools", "Tinker's Tools"]
        },
        "subclassfeature1.1" : {
            name : "Stormforged Weapon",
            source : ["KT:I", 22],
            minlevel : 1,
            description : " [create more: 3 days + 200 gp]" + desc([
                "I forge a Stormforged Weapon, a wondrous weapon that only I can attune to",
            ]),
            eval : function(lvl, chc) {
                AddMagicItem("Stormforged Weapon");
            },
            removeeval : function(lvl, chc) {
                RemoveMagicItem("Stormforged Weapon");
            }
        },
        "subclassfeature3" : {
            name : "Thundermonger",
            source : ["KT:I", 6],
            minlevel : 3,
            description : desc([
                "Once per turn, I can deal an extra 1d6 thunder dmg to a creature shoot", 
                "This extra damage increases by 1d6 when I reach certain levels in this class"
            ]),
            additional : levels.map(function (n, idx) {
                return n < 3 ? "" : [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9][idx] + "d6"; 
            }),//TODO: Automate this Nd6 with it's own function
            usages : 1,
            recovery : "turn"
        },
        "subclassfeature3.1" : {
            name : "Upgrades, Basic",
            source : ["KT:I", 4],
            minlevel : 3,
            description : desc([
                "Use the \"Choose Features\" button to add Upgrades to the third page (See notes page)"
            ]),
            additional : [0,0,1,1].map(upgradeAdditionalMaker),
            extraTimes : [0,0,1,1],
            extraname : "Unrestricted Upgrade",
            extrachoices : [],
            toNotesPage : [{
                name : "Specialization Upgrade",
                note : [
                    "You select an additional Upgrade at ",
                    "5th, 7th, 9th, 11th, 13th, 15th, 17th, and 19th level.",
                    "You cannot select an Upgrade more than once,",
                    "unless the Upgrade's description says otherwise.",
                    "Whenever you level up, you can exchange one of your existing upgrades for",
                    "another upgrade of the same level requirement as the replaced upgrade.",
                    "   In any case that a specialization allows an Upgrade to be swapped out,",
                    "Upgrades must always be selected as if the Inventor is",
                    "the level they were when they got that Upgrade slot. For example,",
                    "if you replace your Stormforged Weapon and",
                    "reselect all of your upgrades as a 5th level Inventor,",
                    "you could select one 3rd level upgrade and one 5th level upgrade,",
                    "or two 3rd level upgrades, but you would not be able to select two 5th level upgrades."
                ],
                source : ["KT:I", 4]
            }]
        },
        "subclassfeature5" : {
            name : "Devastating Blasts",
            source : ["KT:I", 23],
            minlevel : 5,
            description : desc([
                "When I miss an attack, I can still apply Thundermonger damage, but it only deals half"
            ])
        },
        "subclassfeature5.1" : {
            name : "Upgrades, Level 5",
            source : ["KT:I", 4],
            minlevel : 5,
            description : "",
            additional : [0,0,0,0,1,1,2,2].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,1,1,2,2],
            extraname : "Level 5 Upgrade",
            extrachoices : []
        },
        "subclassfeature9" : {
            name : "Upgrades, Level 9",
            source : ["KT:I", 4],
            minlevel : 9,
            description : "",
            additional : [0,0,0,0,0,0,0,0,1,1].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,0,0,0,0,1,1],
            extraname : "Level 9 Upgrade",
            extrachoices : []
        },
        "subclassfeature11" : {
            name : "Upgrades, Level 11",
            source : ["KT:I", 4],
            minlevel : 11,
            description : "",
            additional : [0,0,0,0,0,0,0,0,0,0,1,1,2,2].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,0,0,0,0,0,0,1,1,2,2],
            extraname : "Level 11 Upgrade",
            extrachoices : []
        },
        "subclassfeature14" : {
            name : "Unleashed Power",
            source : ["KT:I", 23],
            minlevel : 14,
            description : desc([
                "When rolling dmg for Thundermonger, I can use a spell slot to reroll up to my Int mod",
                "worth of dice and maximize a number equal to to the level of the spell slot used"
            ])
        },
        "subclassfeature15" : {
			name : "Upgrades, Level 15",
			source : ["KT:I", 4],
			minlevel : 15,
			description : "",
			additional : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3].map(upgradeAdditionalMaker),
			extraTimes : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3],
			extraname : "Level 15 Upgrade",
			extrachoices : []
		}
    }
};

// Add a function to see if the upgrade isn't already selected in another feature
ClassList["inventor"].chosenUpgrades = function() {
    var aClass = "inventor";
    if (!CurrentClasses[aClass]) return true;
    var theRe = [];
    for (var aFea in CurrentClasses[aClass].features) {
        var feaObj = CurrentClasses[aClass].features[aFea];
        if ((/^subclassfeature/).test(aFea) && feaObj.extrachoices && (/upgrade/i).test(feaObj.name)) {
            theRe = theRe.concat(GetFeatureChoice("class", aClass, aFea, true));
        }
    }
    return theRe;
};
//Unrestricted Upgrades

            // "echoing boom (prereq: incompatible with silencer)" : {
            //     name : "Echoing Boom",
            //     description : desc([
            //         "I pack extra power into my Thundermonger, increasing the damage it deals by 1d6"
            //     ]),
            //     source : ["KT:I", 6],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("silencer (prereq: incompatible with echoing boom)") == -1;
            //     }
            //     //TODO: Find out how to add full automation of this upgrade
            // },
            // "extended barrel" : {
            //     name : "Extended Barrel",
            //     description : desc([
            //         "The range of my Thunder Cannon increases by 30/90 feet",
            //         "I can take this upgrade 1 more time"
            //     ]),
            //     source : ["KT:I", 6],
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     fields.Range = "90/270 ft";
            //                 }
            //             },
            //             "Range increased by 30/90 ft"
            //         ]
            //     }
            // },
            // "extended barrel lv2 (prereq: extended barrel)" : {
            //     name : "Extended Barrel Lv2",
            //     description : desc([
            //         "The range of my Thunder Cannon increases by another 30/90 feet",
            //         "If I have the Bayonet upgrade, it gains the Reach property",
            //     ]),
            //     source : ["KT:I", 6],
            //     prereqeval : function(v) {
            //         return GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("extended barrel") != -1;
            //     },
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     fields.Range = "120/360 ft";
            //                 }
            //                 if (v.theWea.artLightningBayonet) {
            //                     fields.Description += ", reach";
            //                 }
            //             },
            //             "Range increased by another 30/90 ft and added reach to the Lightning Bayonet"
            //         ]
            //     }
            // },
            // "lightning burst" : {
            //     name : "Lightning Burst",
            //     description : desc([
            //         "As an action, I can fire the cannon; without using ammo, in a 5ft wide, 60ft long line",
            //         "Creatures hit make a Dex save, and take Thundermonger's damage as Lightning damage",
            //         "They take half on a successful save. This action uses Thundermonger for the turn"
            //     ]),
            //     source : ["KT:I", 6],
            //     action : ["action", ""]
            // },
            // "lightning charged bayonet" : {
            //     name : "Lightning Charged Bayonet",
            //     description : desc([
            //         "I add a finesse weapon melee weapon that I am proficient with to the end of my cannon,",
            //         "It deals 1d6 Piercing damage and I can use Thundermonger with it,",
            //         "but the damage type is lightning and counts as using it for the turn"
            //     ]),
            //     source : ["KT:I", 6],
            //     weaponOptions : {
            //         regExpSearch : /^(?=.*lightning)(?=.*bayonet).*$/i,
            //         name : "Lightning Bayonet",
            //         source : ["KT:I", 6],
            //         list : "inventor",
            //         ability : 2,
            //         type : "Inventor Weapon",
            //         damage : [1, 6, "piercing"],
            //         range : "Melee",
            //         description : "Finesse",
            //         abilitytodamage : true,
            //         artLightningBayonet : true
            //     },
            //     weaponsAdd : ["Lightning Bayonet"],
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //                 if (v.theWea.artLightningBayonet) fields.Proficiency = true;
            //             },
            //             ""
            //         ]
            //     }
            // },
            // "silencer (prereq: incompatible with echoing boom)" : {
            //     name : "Silencer",
            //     description : desc([
            //         "My Thunder Cannon loses the Loud property",
            //         "I can use a 2nd lvl spell slot to overcharge the silencer, casting silence"
            //     ]),
            //     source : ["KT:I", 6],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("echoing boom (prereq: incompatible with silencer)") == -1;
            //     },
            //     calcChanges : {
			// 		atkAdd : [
			// 			function (fields, v) {
			// 				if (v.theWea.artThundercannon) {
			// 					fields.Description = fields.Description.replace(" Loud,", "");
			// 				}
			// 			},
			// 			"My Thunder Cannon loses the Loud property."
			// 		]
			// 	},
            // },
            // "shock absorber" : {
            //     name : "Shock Absorber",
            //     description : desc([
            //         "If I take Lightning/Thunder Damage, I can cast Absorb Elements without using a spell slot",
            //         "I can apply this damage to my next Thundercannon attack even if its a ranged attack."
            //     ]),
            //     source : ["KT:I", 6],
            //     action : ["reaction", "[Lightning/Thunder Dmg]"]
            // },

            // //5th Level Upgrades

            // "autoloading magazine (prereq: level 5 Inventor)" : {
            //     name : "Autoloading Magazine",
            //     description : desc([
            //         "I automatically reload, I no longer require my bonus action"
            //     ]),
            //     source : ["KT:I", 6],
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //             if (v.theWea.artThundercannon) {
            //                 fields.Description = fields.Description.replace("Reload(1)", "Auto-Reload");
            //             }
            //         },
            //             "My Thunder Cannon now auto-reloads"
            //         ]
            //     },
            //     prereqeval : function(v) {return classes.known["inventor"].level >= 5;}
            // },
            // "cannon improvement (prereq: level 5 Inventor)" : {
            //     name : "Cannon Improvement",
            //     description : desc([
            //         "My Thunder Cannon gains a +1 to Attack and Damage, It now counts as magical",
            //         "I can take this upgrade 2 more times"
            //     ]),
            //     source : ["KT:I", 6],
            //     prereqeval : function(v) {return classes.known["inventor"].level >= 5;},
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     fields.Description += "; Counts as magical";
            //                 }
            //             },
            //             "My Thunder Cannon attacks count as magical for overcoming resistances and damage reduction."
            //         ],
            //         atkCalc : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     output.extraDmg += 1; output.extraHit += 1;
            //                 }
            //             },
            //             "The Thunder Cannon gains a +1 to Attack and Damage"
            //         ]
            //     }
            // },
            // "cannon improvement lv2 (prereq: cannon improvement)" : {
            //     name : "Cannon Improvement Lv2",
            //     description : desc([
            //         "My Thunder Cannon gains another +1 to Attack and Damage",
            //         "I can take this upgrade 1 more time"
            //     ]),
            //     source : ["KT:I", 6],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("cannon improvement (prereq: level 5 Inventor)") != -1;
            //     },
            //     calcChanges : {
            //         atkCalc : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     output.extraDmg += 1; output.extraHit += 1;
            //                 }
            //             },
            //             "The Thunder Cannon gains another +1 to Attack and Damage"
            //         ]
            //     }
            // },
            // "cannon improvement lv3 (prereq: cannon improvement lv2)" : {
            //     name : "Cannon Improvement Lv3",
            //     description : desc([
            //         "My Thunder Cannon gains another +1 to Attack and Damage"
            //     ]),
            //     source : ["KT:I", 6],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("cannon improvement lv2 (prereq: cannon improvement)") != -1;
            //     },
            //     calcChanges : {
            //         atkCalc : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     output.extraDmg += 1; output.extraHit += 1;
            //                 }
            //             },
            //             "The Thunder Cannon gains another +1 to Attack and Damage"
            //         ]
            //     }
            // },
            // "divination scope (prereq: level 5 Inventor)" : {
            //     name : "Divination Scope",
            //     description : desc([
            //         "The scope has 3 charges, As a bonus action I can use 1 charge to cast Hunter's Mark,",
            //         "as an action I can use 2 to cast See Invisibility, or 3 to cast Clairvoyance"
            //     ]),
            //     source : ["KT:I", 7],
            //     prereqeval : function(v) {return classes.known["inventor"].level >= 5;},
            //     usages : 3,
            //     recovery : "long rest",
            //     eval : function(lvl, chc) {
            //         changeSpellsOnMagicItem(true, "thunder cannon", "Divination Scope", ["hunter's mark", "see invisibility", "clairvoyance"], ["1","2","3"], [{},{},{time : "1 a", changes : "I can cast clairvoyance as an action instead of over 10 minutes."}]);
            //     },
            //     removeeval : function(lvl, chc) {
            //         changeSpellsOnMagicItem(false, "thunder cannon", "Divination Scope", ["hunter's mark", "see invisibility", "clairvoyance"], ["1","2","3"]);
            //     }
            // },
            // "harpoon reel (prereq: level 5 Inventor)" : {
            //     name : "Harpoon Reel",
            //     description : "See Notes sheet for info on how this works",
            //     source : ["KT:I", 7],
            //     action : ["bonus action", " [Reel]"],
            //     prereqeval : function(v) {return classes.known["inventor"].level >= 5;},
            //     weaponOptions : {
            //         regExpSearch : /^(?=.*harpoon)(?=.*reel).*$/i,
            //         name : "Harpoon Reel",
            //         source : ["KT:I", 7],
            //         list : "inventor",
            //         ability : 2,
            //         type : "Inventor Weapon",
            //         damage : [1, 6, "piercing"],
            //         range : "30/60 ft",
            //         description : "60 ft cord, Must be Reeled in, See notes sheet",
            //         abilitytodamage : true
            //     },
            //     weaponsAdd : ["Harpoon Reel"],
            //     toNotesPage : [{
            //         name : "Upgrade-Harpoon Reel",
            //         note : [
            //             "I can attack a surface, object, or creature with a harpoon",
            //             "It has a range of 30/60 feet, and deals 1d6 piercing dmg",
            //             "I must Reel it in before I can use it again.",
            //             "It impales the target hit, connecting us with a 60ft cord", 
            //             "Dragging the person connected causes the one moving to move at half speed",
            //             "Unless they are a size larger As an action it can remove it, but it takes 1d6 dmg",
            //             "If the target is medium or larger; using my bonus action, I can pull myself to it",
            //             "If the target is Small or smaller I pull it to me. I can also just disconnect the cord"
            //         ],
            //         source : ["KT:I", 7]
            //     }]
            // },
            // "terrifying thunder (prereq: echoing boom)" : {
            //     name : "Terrifying Thunder",
            //     description : desc([
            //         "The first time I hit a target, it is deaf until the end of it's next turn",
            //         "It must also make a Wis save against my spell save DC or become frightened for 1 minute",
            //         "It can repeat the save at the end it's turn; on success, it is immune to the effects for 24hrs"
            //     ]),
            //     source : ["KT:I", 7],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("echoing boom (prereq: incompatible with silencer)") != -1;
            //     }
            // },
            // "storm blast (prereq: level 5 Inventor)" : {
            //     name : "Storm Blast",
            //     description : desc([
            //         "I upgrade my cannon to fire in a 30-foot cone. Each creature hit must make a Str save,",
            //         "or take 1d6 plus half the damage of Thundermonger and they're knocked prone",
            //         "Using this counts as applying Thundermonger damage. Does not consume ammo."
            //     ]),
            //     source : ["KT:I", 7],
            //     prereqeval :  function(v) {return classes.known["inventor"].level >= 5;},
            //     action : ["action", " (1d6 + 1/2 Thundermonger)"]
            // },

            // //9th Level Upgrades

            // "shock harpoon (prereq: level 9 Inventor, harpoon reel)" : {
            //     name : "Shock Harpoon",
            //     description : desc([
            //         "As a bonus action, If the Harpoon is in a target, and I have not used Thundermonger yet",
            //         "I can do it's damage as lightning damage to the target and it is stunned unless:",
            //         "It succeeds on a Con save against my spell save DC. To use this again, I have to reel it in"
            //     ]),
            //     source : ["KT:I", 7],
            //     action : ["bonus action", "[Harpoon Reel]"],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("harpoon reel (prereq: level 5 Inventor)") != -1 && classes.known["inventor"].level >= 9;
            //     }
            // },
            // "synaptic feedback (prereq: level 9 Inventor)" : {
            //     name : "Synaptic Feedback",
            //     description : desc([
            //         "When I deal lightning damage with my cannon, my walking speed increases by 10ft",
            //         "and I can take the Dash or Disengage actions as a bonus action.",
            //         "This boost lasts until the start of my next turn."
            //     ]),
            //     action : [
            //         ["bonus action", "Dash (Synaptic Feedback)"],
            //         ["bonus action", "Disengage (Synaptic Feedback)"]
            //     ],
            //     source : ["KT:I", 7],
            //     prereqeval : function(v) {return classes.known["inventor"].level >= 9;}
            // },
            // "thunder jump (prereq: level 9 Inventor)" : {
            //     name : "Thunder Jump",
            //     description : desc([
            //         "As an action I can cast Thunder Step. This counts as applying my Thundermonger damage",
            //         "I cannot use this ability again until I complete a short or long rest."
            //     ]),
            //     source : ["KT:I", 7],
            //     prereqeval : function(v) {return classes.known["inventor"].level >= 9;},
            //     usages : 1,
            //     recovery : "short rest",
            //     eval : function(lvl, chc) {
            //         changeSpellsOnMagicItem(true, "thunder cannon", "Thunder Jump", ["thunder step"], ["oncesr"]);
            //     },
            //     removeeval : function(lvl, chc) {
            //         changeSpellsOnMagicItem(false, "thunder cannon", "Thunder Jump", ["thunder step"], ["oncesr"]);
            //     }
            // },

            // //11th Level Upgrades

            // "blast radius (prereq: level 11 Inventor)" : {
            //     name : "Blast Radius",
            //     description : desc([
            //         "My Devastating Blast now deals half my weapon damage + half Thundermonger damage",
            //         "When the target is within 30 ft of me"
            //     ]),
            //     source : ["KT:I", 7],
            //     prereqeval : function(v) {return classes.known["inventor"].level >= 11;}
            // },
            // "stabilization (prereq: level 11 Inventor)" : {
            //     name : "Stabilization",
            //     description : desc([
            //         "Being prone doesn't cause disadvantage when using my Thunder Cannon",
            //         "If me or my target hasn't moved sense my last attack, I get advantage"
            //     ]),
            //     source : ["KT:I", 7],
            //     prereqeval : function(v) {return classes.known["inventor"].level >= 11;}
            // },

            // //15th Level Upgrades

            // "mortar shells (prereq: level 15 Inventor)" : {
            //     name : "Mortar Shells",
            //     description : desc([
            //         "Pick a point within range, and make an attack roll against all creatures in a 5ft radius",
            //         "Creatures hit take weapon damage plus half of Thundermonger's damage (using it)",
            //         "Creatures do not benefit from cover against this unless they have overhead cover as well"
            //     ]),
            //     source : ["KT:I", 7],
            //     prereqeval : function(v) {return classes.known["inventor"].level >= 15;},
            //     action : ["action", ""]
            // }
[{
    name : "Adaptable Weapon",
    listlevel : 3,
    source : ["KT:I", 23],
    description : desc([
        "If my weapon has the ammunition property I can add a Charged Blade as a second atk",
        "If it doesn't I can add a Hand Cannon as a second atk"
    ])
}, {
    name : "Arcane Lightning",
		listlevel : 3,
		source : ["KT:I", 27],
		description : desc([
			"I add Thunderwave, Shatter, Lightning Bolt, and Storm Sphere to my Inventor spell list"
		]),
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					if (spName == "inventor" && spType.indexOf("bonus") == -1) {
						spList.extraspells = spList.extraspells.concat(["thunderwave", "shatter", "lightning bolt", "storm sphere"]);
					}
				},
				"I have extra spells added to my Inventor spell list: Thunderwave, Shatter, Lightning Bolt, and Storm Sphere."
			]
		}
}].forEach(function (aObj) {
    var upgName = aObj.listname ? aObj.listname : aObj.name;
    var upgNameLC = upgName.toLowerCase();
    var upgLevel = aObj.listlevel ? aObj.listlevel : 1;
    if (!aObj.prereqeval && upgLevel === 3) {
        aObj.prereqeval = function () {
            return classes.known["inventor"].level >= 3 && ClassList["inventor"].chosenUpgrades().indexOf(upgNameLC) == -1;
        }
        upgLevel = 1; // so that it's still added to the first list of upgrades
    } else if (!aObj.prereqeval && upgLevel < 15) {
        aObj.prereqeval = function () {
            return ClassList["inventor"].chosenUpgrades().indexOf(upgNameLC) == -1;
        }
    }
    for (var aFea in ClassSubList["inventor-thundersmith"].features) {
        var feaObj = ClassSubList["inventor-thundersmith"].features[aFea];
        if (!(/upgrade/i).test(feaObj.name) || !feaObj.extrachoices || feaObj.minlevel < upgLevel) continue;
        feaObj.extrachoices.push(upgName);
        feaObj[upgNameLC] = aObj;
    }
});

//#region
/*
ClassSubList["inventor-gadgetsmith"] = {

    regExpSearch : /gadgetsmith/i,
    subname : "Gadgetsmith",
    source : ["KT:I", 8],
    attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    features : {
        "subclassfeature1" : {
            name : "Gadgetsmith's Proficiency",
            source : ["KT:I", 8],
            minlevel : 1,
            description : desc([
                "I gain proficiency with nets, rapiers, whips, and tinker's tools."
            ]),
            weaponProfs : [true, false, ["net", "rapier", "whip"]],
            toolProfs : ["Tinker's Tools"]
        },
        "subclassfeature1.1" : {
            name : "Essential Tools: Grappling Hook/Smoke Bomb",
            source : ["KT:I", 8],
            minlevel : 1,
            description : "\n   See Notes page for info on how these work",
            toNotesPage : [{
                name : "Essential Tools: Grappling Hook",
                note : [
                    "I can attack a surface, object, or creature within 20 feet and hook on to it",
                    "If the it is small or smaller, I can make a Grapple check to pull it to me, grappling it",
                    "If the target is medium or larger, I can choose to be pulled to it, not grappling it"
                ],
                source : ["KT:I", 8]
            },{
                name : "Essential Tools: Smoke Bomb",
                note : [
                    "I can use my action to cast Fog Cloud without using a spell slot",
                    "It does not require concentration and lasts my Intelligence modifier in rounds"
                ],
                source : ["KT:I", 8]
            }]
        }, 
        "subclassfeature1.2" : {
            name : "Essential Tools: Gadgetsmith Weapon",
            source : ["KT:I", 8],
            minlevel : 1,
            description : desc([
                "Gadgetsmith Weapon: Use the \"Choose Features\" button to add a Gadgetsmith Weapon"
            ]),
            choices : ["Essential Tools: Boomerang of Hitting","Essential Tools: Impact Gauntlet","Essential Tools: Repeating Hand Crossbow","Essential Tools: Shock Generator","Essential Tools: Lightning Baton"],
            "essential tools: boomerang of hitting" : {
                name : "Essential Tools: Boomerang of Hitting",
                description : desc([
                    "I get a magical boomerang, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "When Thrown, I can make separate attacks at 2 creatures within 10 ft of each other"
                ]),
                source : ["KT:I", 8],
                weaponsAdd : ["Boomerang of Hitting"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artBoomerang && classes.known["inventor"].level >= 5 && classes.known["inventor"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artBoomerang && classes.known["inventor"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Boomerang of Hitting gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artBoomerang) fields.Proficiency = true;
                        },
                        ""
                    ]
                }
            },
            "essential tools: impact gauntlet" : {
                name : "Essential Tools: Impact Gauntlet",
                description : desc([
                    "I get a magical gauntlet, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "Before I attack, I can forgo my Prof mod for the attack, but If it hits I get double"
                ]),
                source : ["KT:I", 9],
                weaponsAdd : ["Impact Gauntlet"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artGauntlet && classes.known["inventor"].level >= 5 && classes.known["inventor"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artGauntlet && classes.known["inventor"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Impact Gauntlet gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artGauntlet) fields.Proficiency = true;
                        },
                        ""
                    ]
                }
            },
            "essential tools: repeating hand crossbow" : {
                name : "Essential Tools: Repeating Hand Crossbow",
                description : desc([
                    "I get a magical hand crossbow, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "If I have Adv, once per turn I can forgo it on an attack to make an additional attack"
                ]),
                source : ["KT:I", 9],
                weaponsAdd : ["Repeating Hand Crossbow"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artRepeatCrossbow && classes.known["inventor"].level >= 5 && classes.known["inventor"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artRepeatCrossbow && classes.known["inventor"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Repeating Hand Crossbow gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artRepeatCrossbow) fields.Proficiency = true;
                        },
                        ""
                    ]
                }
            },
            "essential tools: shock generator" : {
                name : "Essential Tools: Shock Generator",
                description : desc([
                    "I get a device that lets me cast Shocking Grasp",
                    "I can add my Dex or Int mod (sheet automatically chooses the highest) to the attack"
                ]),
                source : ["KT:I", 9],
                weaponsAdd : ["Shocking Grasp"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.WeaponTextName == "Shocking Grasp") {
                                if (What("Int Mod") >= What("Dex Mod")) {
                                    output.extraHit += What("Int Mod");
                                } else {
                                    output.extraHit += What("Dex Mod");
                                }
                            }
                        },
                        "I can add my Dexterity or Intelligence modifier to Shocking Grasp's attack roll (Sheet uses the highest)"
                    ]
                },
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Shock Generator", ["shocking grasp"], [""], [{description : "Spell attack+dex/int, adv. if metal armor, 1d8 Lightning dmg, no rea 1 turn; +1d8 at CL 5, 11, and 17", descriptionCantripDie : "Spell attack+dex/int, adv. if metal armor, `CD`d8 Lightning dmg, no rea 1 turn", changes : "I can add my Dexterity or Intelligence modifier to Shocking Grasp's attack roll"}]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Shock Generator", ["shocking grasp"], [""]);
                }
            },
            "essential tools: lightning baton" : {
                name : "Essential Tools: Lightning Baton",
                description : desc([
                    "I get a lightning baton, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14"
                ]),
                source : ["KT:I", 9],
                weaponsAdd : ["Lightning Baton"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artBaton && classes.known["inventor"].level >= 5 && classes.known["inventor"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artBaton && classes.known["inventor"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Lightning Baton gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artBaton) fields.Proficiency = true;
                        },
                        ""
                    ]
                }
            }
        },
        "subclassfeature3" : {
            name : "Additional Upgrade",
            minlevel : 3,
            description : desc([
                "As a Gadgetsmith I get one extra upgrade for my class, two at Lv. 5"
            ]),
            source : ["KT:I", 8],
            additional : levels.map(function (n, idx) {
                    return n < 3 ? "" : [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2][idx] + " extra upgrades";
            }),
            eval : function(lvl, chc) {
                AddMagicItem("Gadgetsmith's Gadgets");
            },
            removeeval : function(lvl, chc) {
                RemoveMagicItem("Gadgetsmith's Gadgets");
            },
            extraname : "Gadgetsmith Upgrades",
            extrachoices : [
                //Unrestricted Upgrades
                "Airburst Mine",
                "Boomerang of Hitting (Incompatible with Essential Tools: Boomerang of Hitting)",
                "Belt of Adjusting Size",
                "Gravity Switch",
                "Element Eater",
                "Enhanced Grappling Hook",
                "Fire Spitter",
                "Flashbang",
                "Impact Gauntlet (Incompatible with Essential Tools: Impact Gauntlet)",
                "Impact Gauntlet No.2 (prereq: Any Impact Gauntlet)",
                "Lightning Baton (Incompatible with Essential Tools: Lightning Baton)",
                "Lightning Baton No.2 (prereq: Any Lightning Baton)",
                "Mechanical Arm",
                "Mechanical Familiar",
                "Jumping Boots",
                "Repeating Hand Crossbow (Incompatible with Essential Tools: Repeating Hand Crossbow)",
                "Shock Generator (Incompatible with Essential Tools: Shock Generator)",
                "Shocking Hook (prereq: Shock Generator)",
                "Sight Lenses",
                "Smoke Cloak",
                "Striding Boots",
                //5th Level Upgrades
                "Autonomous Crossbow (prereq: level 5 Inventor)",
                "Binding Rope (prereq: level 5 Inventor)",
                //9th Level Upgrades
                "Arcane Nullifier (prereq: level 9 Inventor)",
                "Phase Trinket (prereq: level 9 Inventor)",
                "Stinking Gas (prereq: level 9 Inventor)",
                "Stopwatch Trinket (prereq: level 9 Inventor)",
                //11th Level Upgrades
                "Bracers of Empowerment (prereq: level 11 Inventor)",
                "Lightning Generator (prereq: level 11 Inventor, Any Shock Generator)",
                "Gripping Gloves (prereq: level 11 Inventor, Incompatible with Nimble Gloves)",
                "Deployable Wings (prereq: level 11 Inventor)",
                "Nimble Gloves (prereq: level 11 Inventor, Incompatible with Gripping Gloves)",
                "Truesight Lenses (prereq: level 11 Inventor, Sight Lenses)",
                "Useful Universal Key (prereq: level 11 Inventor)",
                //15th Level Upgrades
                "Disintegration Ray (prereq: level 15 Inventor)",
                "Bee Swarm Rockets (prereq: level 15 Inventor)",
            ],
            extraTimes : levels.map(function (n) {
                return n < 3 ? 0 : n < 5 ? 2 : n < 7 ? 4 : n < 9 ? 5 : n < 11 ? 6 : n < 13 ? 7 : n < 15 ? 8 : n < 17 ? 9 : n < 19 ? 10 : 11;
            }),

            //Unrestricted Upgrades

            "airburst mine" : {
                name : "Airburst Mine",
                description : desc([
                    "I can use this device to cast shatter without using a spell slot or I can place it",
                    "To be triggered by my reaction within 1 min; I cannot use it again until after a SR"
                ]),
                source : ["KT:I", 8],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Airburst Mine", ["shatter"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Airburst Mine", ["shatter"], ["oncesr"]);
                }
            },
            "boomerang of hitting (incompatible with essential tools: boomerang of hitting)" : {
                name : "Boomerang of Hitting",
                description : desc([
                    "I get a magical boomerang, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "When Thrown, I can make separate attacks at 2 creatures within 10 ft of each other"
                ]),
                source : ["KT:I", 8],
                weaponsAdd : ["Boomerang of Hitting"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artBoomerang && classes.known["inventor"].level >= 5 && classes.known["inventor"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artBoomerang && classes.known["inventor"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Boomerang of Hitting gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artBoomerang) fields.Proficiency = true;
                        },
                        ""
                    ]
                },
                prereqeval : function (v) { 
                    return GetFeatureChoice("class", "inventor", "subclassfeature1.2", true).indexOf("essential tools: boomerang of hitting") == -1;
                }
            },
            "belt of adjusting size" : {
                name : "Belt of Adjusting Size",
                description : desc([
                    "While wearing the belt, I can use an action to cast Enlarge/Reduce on myself",
                    "I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:I", 8],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Belt of Adjusting Size", ["enlarge/reduce"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Belt of Adjusting Size", ["enlarge/reduce"], ["oncesr"]);
                }
            },
            "gravity switch" : {
                name : "Gravity Switch",
                description : desc([
                    "I can use this device to cast fall without using a spell slot, as an action",
                    "I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:I", 8],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Gravity Switch", ["fall"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Gravity Switch", ["fall"], ["oncesr"]);
                }
            },
            "element eater" : {
                name : "Element Eater",
                description : desc([
                    "As a reaction to taking elemental damage, I can cast Absorb Elements",
                    "Without using a spell slot. I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:I", 9],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Element Eater", ["absorb elements"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Element Eater", ["absorb elements"], ["oncesr"]);
                }
            },
            "enhanced grappling hook" : {
                name : "Enhanced Grappling Hook",
                description : desc([
                    "I enhance my grappling hook, increasing its range to 40 feet",
                    "And lets me drag something with me when pulling myself to something"
                ]),
                source : ["KT:I", 8],
                additional : "See Notes sheet",
                toNotesPage : [{
                    name : "Enhanced Grappling Hook",
                    note : [
                        "I can attack a surface, object, or creature within 40 feet and hook on to it",
                        "If the it is small or smaller, I can make a Grapple check to pull it to me, grappling it",
                        "If the target is medium or larger, I can choose to be pulled to it, not grappling it",
                        "While pulling myself, I can drag a medium or smaller",
                        "willing/grappled creature within 5 ft of me with me"
                    ],
                    source : ["KT:I", 9]
                }]
            },
            "fire spitter" : {
                name : "Fire Spitter",
                description : desc([
                    "As an action, I can cast Aganazzar's Scorcher without using a spell slot",
                    "I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:I", 9],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Fire Spitter", ["aganazzar's scorcher"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Fire Spitter", ["aganazzar's scorcher"], ["oncesr"]);
                }
            },
            "flashbang" : {
                name : "Flashbang",
                description : desc([
                    "As an action, you can target a point in 30 ft. Any creature within a 20 ft radius makes:",
                    "A dex save or is blinded until the end of its next turn, It cannot used again until after a SR"
                ]),
                source : ["KT:I", 9],
                usages : 1,
                recovery : "short rest",
                action : ["action", ""],
            },
            "impact gauntlet (incompatible with essential tools: impact gauntlet)" : {
                name : "Impact Gauntlet",
                description : desc([
                    "I get a magical gauntlet, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "Before I attack, I can forgo my Prof mod for the attack, but If it hits I get double"
                ]),
                source : ["KT:I", 9],
                weaponsAdd : ["Impact Gauntlet"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artGauntlet && classes.known["inventor"].level >= 5 && classes.known["inventor"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artGauntlet && classes.known["inventor"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Impact Gauntlet gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artGauntlet) fields.Proficiency = true;
                        },
                        ""
                    ]
                },
                prereqeval : function (v) { 
                    return GetFeatureChoice("class", "inventor", "subclassfeature1.2", true).indexOf("essential tools: impact gauntlet") == -1;
                }
            },
            "impact gauntlet no.2 (prereq: any impact gauntlet)" : {
                name : "Impact Gauntlet No.2",
                description : desc([
                    "I get another magical gauntlet, letting me dual weld them"
                ]),
                source : ["KT:I", 9],
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "inventor", "subclassfeature1.2", true).indexOf("essential tools: impact gauntlet") != -1 || GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("impact gauntlet (incompatible with essential tools: impact gauntlet)") != -1;
                }
            },
            "lightning baton (incompatible with essential tools: lightning baton)" : {
                name : "Lightning Baton",
                description : desc([
                    "I get a lightning baton, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14"
                ]),
                source : ["KT:I", 9],
                weaponsAdd : ["Lightning Baton"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artBaton && classes.known["inventor"].level >= 5 && classes.known["inventor"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artBaton && classes.known["inventor"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Lightning Baton gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artBaton) fields.Proficiency = true;
                        },
                        ""
                    ]
                },
                prereqeval : function (v) { 
                    return GetFeatureChoice("class", "inventor", "subclassfeature1.2", true).indexOf("essential tools: lightning baton") == -1;
                }
            },
            "lightning baton no.2 (prereq: any lightning baton)" : {
                name : "Lightning Baton No.2",
                description : desc([
                    "I get another lightning baton, letting me dual weld them)"
                ]),
                source : ["KT:I", 9],
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "inventor", "subclassfeature1.2", true).indexOf("essential tools: lightning baton") != -1 || GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("lightning baton (incompatible with essential tools: lightning baton)") != -1;
                }
            },
            "mechanical arm" : {
                name : "Mechanical Arm",
                description : desc([
                    "The arm only works while it is mounted to my gear, but can be controlled mentally",
                    "It can do anything a normal hand could, but does not give you additional actions"
                ]),
                source : ["KT:I", 9],
            },
            "mechanical familiar" : {
                name : "Mechanical Familiar",
                description : desc([
                    "At the end of a long rest, I can cast Find Familiar with the following modifications:",
                    "Type: Construct, cannot fly, stays active until deactivated/destroyed, reactivated after LR"
                ]),
                source : ["KT:I", 9],
                //TODO: I'm sure this is automatable, but i'll come back to it later...
                //| Probably after I do the Golemsmith (which I'm sure is going be a BITCH to do...)
            },
            "jumping boots" : {
                name : "Jumping Boots",
                description : desc([
                    "While wearing these boots, I am under the effects of the Jump spell"
                ])
            },
            "shock generator (incompatible with essential tools: shock generator)" : {
                name : "Shock Generator",
                description : desc([
                    "I get a device that lets me cast Shocking Grasp",
                    "I can add my Dex or Int mod (sheet automatically chooses the highest) to the attack"
                ]),
                source : ["KT:I", 9],
                weaponsAdd : ["Shocking Grasp"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.WeaponTextName == "Shocking Grasp") {
                                if (What("Int Mod") >= What("Dex Mod")) {
                                    output.extraHit += What("Int Mod");
                                } else {
                                    output.extraHit += What("Dex Mod");
                                }
                            }
                        },
                        "I can add my Dexterity or Intelligence modifier to Shocking Grasp's attack roll (Sheet uses the highest)"
                    ]
                },
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Shock Generator", ["shocking grasp"], [""], [{description : "Spell attack+dex/int, adv. if metal armor, 1d8 Lightning dmg, no rea 1 turn; +1d8 at CL 5, 11, and 17", descriptionCantripDie : "Spell attack+dex/int, adv. if metal armor, `CD`d8 Lightning dmg, no rea 1 turn", changes : "I can add my Dexterity or Intelligence modifier to Shocking Grasp's attack roll"}]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Shock Generator", ["shocking grasp"], [""]);
                },
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "inventor", "subclassfeature1.2", true).indexOf("essential tools: shock generator") != -1;
                }
            },
            "repeating hand crossbow (incompatible with essential tools: repeating hand crossbow)" : {
                name : "Repeating Hand Crossbow",
                description : desc([
                    "I get a magical hand crossbow, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "If I have Adv, once per turn I can forgo it on an attack to make an additional attack"
                ]),
                source : ["KT:I", 9],
                weaponsAdd : ["Repeating Hand Crossbow"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artRepeatCrossbow && classes.known["inventor"].level >= 5 && classes.known["inventor"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artRepeatCrossbow && classes.known["inventor"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Repeating Hand Crossbow gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artRepeatCrossbow) fields.Proficiency = true;
                        },
                        ""
                    ]
                },
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "inventor", "subclassfeature1.2", true).indexOf("essential tools: repeating hand crossbow") != -1;
                }
            },
            "shocking hook (prereq: shock generator)" : {
                name : "Shocking Hook",
                description : desc([
                    "If the target of my Grappling Hook is a creature, I can cast Shocking Grasp on it",
                    "As a bonus action when pulling it to me or being pulled to it"
                ]),
                source : ["KT:I", 9],
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "inventor", "subclassfeature1.2", true).indexOf("essential tools: shock generator") != -1 || GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("shock generator (incompatible with essential tools: shock generator)") != -1;
                }
            },
            "sight lenses" : {
                name : "Sight Lenses",
                description : desc([
                    "I can see through fog, mist, smoke, clouds, and non-magical darkness, up to 15 ft"
                ]),
                source : ["KT:I", 9],
                vision : ["Sight Lenses", 15]
            },
            "smoke cloak" : {
                name : "Smoke Cloak",
                description : desc([
                    "When I start my turn lightly or heavily obscured by smoke, I am invisible until:",
                    "My turn ends, I cast a spell, make an attack, or damage an enemy"
                ]),
                source : ["KT:I", 9]
            },
            "striding boots" : {
                name : "Striding Boots",
                description : desc([
                    "While earing these boots, I am under the effects of the Longstrider spell"
                ]),
                source : ["KT:I", 9],
                speed : { 
                    allModes : "+10"
                }
            },

            //5th Level Upgrades

            "autonomous crossbow (prereq: level 5 Inventor)" : {
                name : "Autonomous Crossbow",
                description : desc([
                    "As an action once per short rest, I can deploy a construct and can fire it as a bonus action",
                    "Make a spell attack, if 1d6 + Int mod. It become inactive after 10 min or fired 10 times"
                ]),
                source : ["KT:I", 9]
            },
            "binding rope (prereq: level 5 Inventor)" : {
                name : "Binding Rope",
                description : desc([
                    "As an action, I restrain a creature (30 ft, dex save vs. spell DC) till the end of my next turn",
                    "Disadvantage If I'm already grappling it. I can only restrain one target a time"
                ]),
                source : ["KT:I", 10],
                action : ["action","[30 ft, dex save vs. spell DC]"],
                prereqeval : function(v) {return classes.known["inventor"].level >= 5;}
            },

            //9th Level Upgrades

            "arcane nullifier (prereq: level 9 Inventor)" : {
                name : "Arcane Nullifier ",
                description : desc([
                    "As an action, I can use this device to cast dispel magic",
                    "I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:I", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Arcane Nullifier", ["dispel magic"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Arcane Nullifier", ["dispel magic"], ["oncesr"]);
                },
                prereqeval : function(v) {return classes.known["inventor"].level >= 9;}
            },
            "phase trinket (prereq: level 9 Inventor)" : {
                name : "Phase Trinket",
                description : desc([
                    "As an action, I can cast Blink or Dimension Door without using a Spell Slot",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:I", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Phase Trinket", ["blink", "dimension door"], ["oncesr", "oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Phase Trinket", ["blink", "dimension door"], ["oncesr", "oncesr"]);
                },
                prereqeval : function(v) {return classes.known["inventor"].level >= 9;}
            },
            "stinking gas (prereq: level 9 Inventor)" : {
                name : "Stinking Gas",
                description : desc([
                    "When I use a smoke bomb, I can also choose to cast Stinking Cloud (follows the same rules)"
                ]),
                source : ["KT:I", 10],
                prereqeval : function(v) {return classes.known["inventor"].level >= 9;}
            },
            "stopwatch trinket (prereq: level 9 Inventor)" : {
                name : "Stopwatch Trinket",
                description : desc([
                    "As an action, I can cast Haste or Slow without expending a Spell Slot",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:I", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Phase Trinket", ["haste", "slow"], ["oncelr", "oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Phase Trinket", ["haste", "slow"], ["oncelr", "oncelr"]);
                },
                prereqeval : function(v) {return classes.known["inventor"].level >= 9;}
            },

            //11th Level Upgrades

            "bracers of empowerment (prereq: level 11 Inventor)" : {
                name : "Bracers of Empowerment",
                description : desc([
                    "I can use these to cast Tenser's Transformation without using a spell slot.",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:I", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Bracers of Empowerment", ["tenser's transformation"], ["oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Bracers of Empowerment", ["tenser's transformation"], ["oncelr"]);
                },
                prereqeval : function(v) {return classes.known["inventor"].level >= 11;}
            },
            "lightning generator (prereq: level 11 Inventor, any shock generator)" : {
                name : "Lightning Generator",
                description : desc([
                    "I can cast lightning lure at-will using it and can overload it to cast lightning bolt",
                    "Once overloaded, I cannot use lightning bolt again until I complete a short or long rest"
                ]),
                source : ["KT:I", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Lightning Generator", ["lightning lure", "lightning bolt"], ["atwill", "oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Lightning Generator", ["lightning lure", "lightning bolt"], ["atwill", "oncelr"]);
                },
                prereqeval : function(v) { 
                    return classes.known["inventor"].level >= 11 && (GetFeatureChoice("class", "inventor", "subclassfeature1.2", true).indexOf("essential tools: shock generator") != -1 || GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("shock generator (incompatible with essential tools: shock generator)") != -1);
                }
            },
            "gripping gloves (prereq: level 11 Inventor, incompatible with nimble gloves)" : {
                name : "Gripping Gloves",
                description : desc([
                    "While wearing the gloves, My min and max Str increases by 2",
                    "And I gain Adv on Athletics checks involving manipulating things with my hands"
                ]),
                source : ["KT:I", 10],
                scores : [2, 0, 0, 0, 0, 0],
                scoresMaximum : [22, 0, 0, 0, 0, 0],
                advantages : ["Athletics", true],
                prereqeval : function(v) {
                    return classes.known["inventor"].level >= 11 && GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("nimble gloves (prereq: level 11 Inventor, incompatible with gripping gloves)") == -1;
                }
            },
            "deployable wings (prereq: level 11 Inventor)" : {
                name : "Deployable Wings",
                description : desc([
                    "I can deploy wings as a bonus action/reaction to falling, I get a flying speed of 30 ft"
                ]),
                source : ["KT:I", 10],
                action : [
                    ["bonus action", ""], 
                    ["reaction", " (falling)"]
                ], 
                speed : { 
                    fly : { spd : 30, enc : 20 }
                },
                prereqeval : function(v) {return classes.known["inventor"].level >= 11;}
            },
            "nimble gloves (prereq: level 11 Inventor, incompatible with gripping gloves)" : {
                name : "Nimble Gloves",
                description : desc([
                    "While wearing the gloves, My Dex and maximum Dex increases by 2", //TODO(v13): add automation for this
                    "And I gain Adv on Slight of Hand checks involving manipulating things with my hands"
                ]),
                source : ["KT:I", 10],
                scores : [0, 2, 0, 0, 0, 0],
                scoresMaximum : [0, 22, 0, 0, 0, 0],
                prereqeval : function(v) {
                    return classes.known["inventor"].level >= 11 && GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("gripping gloves (prereq: level 11 Inventor, incompatible with nimble gloves)") == -1;
                }
            },
            "truesight lenses (prereq: level 11 Inventor, sight lenses)" : {
                name : "Truesight Lenses",
                description : desc([
                    "I get Truesight up to 30 feet"
                ]),
                source : ["KT:I", 10],
                vision : ["Truesight", 30],
                prereqeval : function(v) {
                    return classes.known["inventor"].level >= 11 && GetFeatureChoice("class", "inventor", "subclassfeature3", true).indexOf("sight lenses") != -1;
                }
            },
            "useful universal key (prereq: level 11 Inventor)" : {
                name : "Useful Universal Key",
                description : desc([
                    "As an action, I can  cast passwall without expending a spell slot",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:I", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Useful Universal Key", ["passwall"], ["oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Useful Universal Key", ["passwall"], ["oncelr"]);
                },
                prereqeval : function(v) {return classes.known["inventor"].level >= 11;}
            },

            //15th Level Upgrades
            
            "disintegration ray (prereq: level 15 Inventor)" : {
                name : "Disintegration Ray",
                description : desc([
                    "I can use this to cast Disintegration without expending a Spell Slot.",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:I", 11],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Disintegration Ray", ["disintegration"], ["oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Disintegration Ray", ["disintegration"], ["oncelr"]);
                },
                prereqeval : function(v) {return classes.known["inventor"].level >= 15;}
            },
            "bee swarm rockets (prereq: level 15 Inventor)" : {
                name : "Bee Swarm Rockets",
                description : desc([
                    "I have my Inventor level in rockets. I can fire up to my remaining rockets as an action",
                    "Each targets a point I can see in 40 ft creatures in 10 ft of the point make a dex save",
                    "On fail take 2d6 fire damage per rocket, half on success. I refill my stock during a LR"
                ]),
                source : ["KT:I", 11],
                usages : "Inventor level per ",
                usagescalc : "event.value = What('Character Level');",
                recovery : "long rest",
                prereqeval : function(v) {return classes.known["inventor"].level >= 15;}
            }
        },
        "subclassfeature3.1" : {
            name : "Recycle Gadgets",
            source : ["KT:I", 8],
            minlevel : 3,
            description : desc([
                "During a long rest and taking effect when I complete it",
                "I can swap any of my upgrades with a new one"
            ])
        },
        "subclassfeature5" : {
            name : "Extra Attack",
            source : ["KT:I", 8],
            minlevel : 5,
            description : desc([
                "I can attack twice whenever I take the Attack action on my turn"
            ])
        },
        "subclassfeature14" : {
            name : "Combat Gadgets",
            source : ["KT:I", 8],
            minlevel : 14,
            description : desc([
                "If I make an attack, I can replace an attack with a gadget that needs an action to use",
            ]),
            action : ["action"," [atk with gadget]"]
        }
    }
};

// ClassSubList["inventor-golemsmith"] = {
//     regExpSearch : /golemsmith/i,
//     subname : "Golemsmith",
//     features : {

//     }
// };

// ClassSubList["inventor-infusionsmith"] = {
//     regExpSearch : /infusionsmith/i,
//     subname : "Infusionsmith",
//     features : {

//     }
// };

ClassSubList["inventor-potionsmith"] = {
    regExpSearch : /potionsmith/i,
    subname : "Potionsmith",
    source : ["KT:I", 16],
    features : {
        "subclassfeature1" : {
            name : "Potionsmith's Proficiency",
            minlevel : 1,
            description : desc([
                "I gain proficiency with blowguns, alchemist’s supplies and herbalism kit",
                "Creating a potion through crafting takes half the normal time and cost"
            ]),
            source : ["KT:I", 16],
            weapons : [true, false, ["blowgun"]],
            toolProfs : [["Alchemist's Supplies", "Dex"],["Herbalism Kit", "Dex"]]
        },
        "subclassfeature1.1" : {
            name : "Alchemical Reagents Pouch",
            minlevel : 1,
            description : desc([
                "I have a pouch of basic reagents and can retrieve things from it if an ability needs them",
                "It counts as alchemy supplies and if lost, I can spend 50g or 1 hr gathering to remake it"
            ]),
            source : ["KT:I", 16],
        },
        "subclassfeature1.2" : {
            name : "Instant Reactions",
            minlevel : 1,
            description : desc([
                "I get the Instant Reactions Feat"
            ]),
            source : ["KT:I", 16],
            eval : "PickDropdown('Feat Name 5', 'Instant Reactions');",
            removeeval : "PickDropdown('Feat Name 5', '');"
        },
        "subclassfeature3" : {
            name : "Alchemical Infusions",
            minlevel : 3,
            description : desc([
                ""
            ]),
            source : ["KT:I", 17],
        },
        "subclassfeature3.1" : {
            name : "Alchemist Upgrades",
            minlevel : 3,
            description : desc([
                "Use the \"Choose Features\" button to add a Specialization Upgrade to the third page",
                "(Make sure to see the notes sheet for more info on choosing and swapping upgrades)"
            ]),
            source : ["KT:I", 2],
            additional : levels.map(function (n, idx) {
                    return n < 3 ? "" : [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9][idx] + " upgrades";
            }),
            noteDesc : desc([
                "I apply an additional upgrade to my Specialization's Wondrous Item at",
                "5th, 7th, 9th, 11th, 13th, 15th, 17th, and 19th level",
                "I cannot apply an upgrade more than once, unless the upgrade's description says otherwise",
                "Upgrades cannot be replaced or changed, besides as described in the specialization",
                "Only the Inventor selecting the upgrade can use the upgrade unless otherwise specified",
                "In any case that Specialization allows the upgrade to be swapped out",
                "Upgrades must always be selected as if I was level I was when they got that Upgrade slot",
                "Ex. if I replace my Thundercannon and reselect all my upgrades at as a 5th level Inventor,",
                "I could select 1 3rd level upgrade and 1 5th level upgrade,",
                "I would not be able to select two upgrades that had a prerequisite of 5th level Inventor."
            ]),
            eval : "notesPage('Alchemist Upgrades', ['Specialization Upgrade', 'KT:I', 2], ClassSubList['inventor-potionsmith'].features['subclassfeature3.1'].noteDesc);",
            removeeval : "notesPage('Alchemist Upgrades', ['Specialization Upgrade', 'KT:I', 2], ClassList['inventor-potionsmith'].features['subclassfeature3.1'].noteDesc, true);",
            extraname : "Alchemist Upgrades",
            extrachoices : [
                "Alchemical Acid",
                "Adrenaline Serum (prereq: level 9 Inventor)",
                "Aroma Therapies (prereq: level 9 Inventor)",
                "Auto Injector",
                "Delivery Mechanism",
                "Elixir of Life (prereq: Philosopher's Stone)",
                "Explosive Reaction",
                "Fortifying Fumes Reaction",
                "Frostbloom Reaction",
                "Greater Adrenaline Shot (prereq: Adrenaline Serum)",
                "Inoculations",
                "Infusion Stone (prereq: level 9 Inventor)",
                "Mana Potion (prereq: level 9 Inventor)",
                "Philosopher Stone (prereq: level 15 Inventor)",
                "Persistent Reactions",
                "Potent Reactions (prereq: level 9 Inventor)",
                "Poisoner's Proficiency",
                "Secrets of Enhancement",
                "Secrets of Fire",
                "Secrets of Frost",
                "Weapon Coating"
            ],
            "alchemical acid" : {
                name : "Alchemical Acid",
                description : desc([
                    "See the Instant Reactions section on your spell sheet"
                ]),
                source : ["KT:I", 17]
            },
            "adrenaline serum (prereq: level 9 Inventor)" : {
                name : "Adrenaline Serum",
                description : desc([
                    "I have my Con mod(min 1) in serums. As an action I can take one",
                    "gaining haste and heroism for Int mod(min 1) rounds, I still get the effects of haste ending",
                    "Another can take this, but must pass a Con save vs. my spell DC, poisoned on a fail"
                ]),
                source : ["KT:I", 17]
            },
            "" : {
                name : "",
                description : desc([
                    ""
                ]),
                source : ["KT:I", 17]
            }//,
            // "" : {
            //     name : "",
            //     description : desc([
            //         ""
            //     ]),
            //     source : ["KT:I", 17]
            // }
        },
        "subclassfeature5" : {
            name : "",
            minlevel : 5,
            description : desc([
                ""
            ]),
            source : ["KT:I", 17],
        },
        "subclassfeature14" : {
            name : "",
            minlevel : 14,
            description : desc([
                ""
            ]),
            source : ["KT:I", 17],
        },
    }
};
*/
//#endregion
ClassSubList["inventor-warsmith"] = {
    regExpSearch : /^(?=.*warsmith)(?!.*wizard).*$/i,
    subname : "Warsmith",
    fullname : "Warsmith",
    source : ["KT:I", 27],
    attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    features : {
        "subclassfeature1" : {
            name : "Upgrades, Basic",
            source : ["KT:I", 3],
            minlevel : 1,
            description : desc([
                "I can select a number of upgrades that are applied to the armor/gauntlet I create",
                "I can have multiple armors/gauntlets with different upgrades, but can attune to only one",
                "Attuning to either requires a long rest; I can swap 1 upgrade when I gain a level",
                "An upgrade can only be switched to another available at the same level",
                'Use the "Choose Feature" button above to select the upgrades of the currently equipped',
                "The above number includes the 'free' Power Fist, Force Blast, or Martial Grip upgrade"
            ]),
            additional : [1,1,2,2].map(upgradeAdditionalMaker),
            extraTimes : [1,1,2,2],
            extraname : "Unrestricted Upgrade",
            extrachoices : []
        },
        "subclassfeature1.2" : {
            name : "Warsmith's Proficiency",
            source : ["KT:I", 27],
            minlevel : 1,
            description : " [tinker's tools, smith's tools, heavy armor]",
            toolProfs : ["Tinker's tools", "Smith's tools"],
            armorProfs : [false, false, true, false]
        },
        "subclassfeature1.1" : {
            name : "Warplate Gauntlet",
            source : ["KT:I", 27],
            minlevel : 1,
            description : " [create more: long rest + 25 gp, or 2 days]" + desc([
                "I gain a warplate gauntlet, a wondrous item that only I can attune to",
                "When I create one, it has either the Power Fist, Force Blast, or Martial Grip upgrade"
            ]),
            eval : function () { AddMagicItem("Warplate Gauntlet"); },
            removeeval : function () { RemoveMagicItem("Warplate Gauntlet"); }
        },
        "subclassfeature3" : {
            name : "Warsmith's Armor",
            source : ["KT:I", 27],
            minlevel : 3,
            description : " [create more: 8 hours + 2000 gp]\n   I gain a warsmith's armor that includes a warplate gauntlet, no separate attunement",
            eval : function () { RemoveMagicItem("Warplate Gauntlet"); AddMagicItem("Warsmith's Armor"); },
            removeeval : function () { RemoveMagicItem("Warsmith's Armor"); AddMagicItem("Warplate Gauntlet"); }
        },
        "subclassfeature5" : {
            name : "Upgrades, Level 5",
            source : ["KT:I", 3],
            minlevel : 5,
            description : "",
            additional : [0,0,0,0,1,1,2,2].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,1,1,2,2],
            extraname : "Level 5 Upgrade",
            extrachoices : []
        },
        "subclassfeature9" : {
            name : "Upgrades, Level 9",
            source : ["KT:I", 3],
            minlevel : 9,
            description : "",
            additional : [0,0,0,0,0,0,0,0,1,1].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,0,0,0,0,1,1],
            extraname : "Level 9 Upgrade",
            extrachoices : []
        },
        "subclassfeature11" : {
            name : "Upgrades, Level 11",
            source : ["KT:I", 3],
            minlevel : 11,
            description : "",
            additional : [0,0,0,0,0,0,0,0,0,0,1,1,2].map(upgradeAdditionalMaker).concat(["3 upgrades known, includes level 14 bonus"]),
            extraTimes : [0,0,0,0,0,0,0,0,0,0,1,1,2,3], // includes level 14 bonus upgrade
            extraname : "Level 11 Upgrade",
            extrachoices : []
        },
        "subclassfeature14" : {
            name : "Fully Customized Gear",
            source : ["KT:I", 28],
            minlevel : 14,
            description : "\n   During a long rest, I can swap out one upgrade for another if all prerequisites are met"
        },
        "subclassfeature15" : {
            name : "Upgrades, Level 15",
            source : ["KT:I", 3],
            minlevel : 15,
            description : "",
            additional : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3],
            extraname : "Level 15 Upgrade",
            extrachoices : []
        }
    }
};

[{
    name : "Accelerated Movement",
    listlevel : 3,
    source : ["KT:I", 28],
    description : desc([
        "While wearing my warsmith's armor, all my movement speeds increase with +10 ft",
        "In addition, my warsmith's armor weighs 15 lb less (not incorporated into automation)"
    ]),
    speed : { allModes : "+10" }
}, {
    listname : "Accelerated Movement, 2nd (prereq: Accelerated Movement)",
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return classes.known["inventor"].level >= 3 && upgKn.indexOf("accelerated movement, 2nd (prereq: accelerated movement)") == -1 && upgKn.indexOf("accelerated movement") != -1;
    },
    name : "Accelerated Movement, 2nd",
    source : ["KT:I", 28],
    description : " [another +10 ft, -15 lb]",
    speed : { allModes : "+10" }
}, {
    name : "Adaptable Armor",
    listlevel : 3,
    source : ["KT:I", 28],
    description : desc([
        "While wearing my armor, I get a climbing and swim speed equal to my walking speed",
        "I can also move across vertical surfaces and ceilings while leaving my hands free"
    ]),
    speed : { climb : { spd : "walk", enc : 0 }, swim: { spd : "walk", enc : 0 },}
}, {
    name : "Arcane Visor, Darkvision",
    listlevel : 3,
    source : ["KT:I", 28],
    description : desc([
        "I gain 60 ft darkvision, or add 60 ft to darkvision if I already had it",
        "In addition, I have advantage on saving throws against being blinded"
    ]),
    vision : [["Darkvision", "fixed 60"], ["Darkvision", "+60"]],
    savetxt : { adv_vs : ["blinded"] }
}, {
    name : "Arcane Visor, Sunlight Sensitivity",
    listlevel : 3,
    source : ["KT:I", 28],
    description : desc([
        "I can ignore Sunlight Sensitivity",
        "In addition, I have advantage on saving throws against being blinded"
    ]),
    vision : [["Ignore Sunlight Sensitivity", 0]],
    savetxt : { adv_vs : ["blinded"] }
}, {
    name : "Arcane Visor, Divination",
    listlevel : 3,
    source : ["KT:I", 28],
    description : desc([
        "Divination spells don't require my Concentration to maintain, only one spell at a time",
        "In addition, I have advantage on saving throws against being blinded"
    ]),
    calcChanges : {
        spellAdd : [
            function (spellKey, spellObj, spName) {
                if (spName == "inventor" && spellObj.school == "Div" && (/conc,/i).test(spellObj.duration)) {
                    spellObj.duration = spellObj.duration.replace(/conc, ?/i, "");
                    return true;
                }
            },
            "Any divination Inventor spells that I know no longer require concentration to maintain them."
        ]
    },
    savetxt : { adv_vs : ["blinded"] }
}, {
    listname : "Collapsible (Incompatible with Integrated Armor)",
    listlevel : 3,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return CurrentMagicItems.choices.indexOf("integrated armor (medium)") == -1 && upgKn.indexOf("collapsible (incompatible with integrated armor)") == -1;
    },
    name : "Collapsible",
    source : ["KT:I", 28],
    description : desc([
        "As an action, I can don or doff my warsuit or warplate as it can collapse into a case",
        "This case weighs 1/3 of the armor's full weight (not included in the automation)"
    ]),
    action : [["action", " (don/doff)"]]
}, {
    listname : "Construct Constitution (prereq: Integrated Armor)",
    listlevel : 3,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return CurrentMagicItems.choices.indexOf("integrated armor (medium)") != -1 && upgKn.indexOf("construct constitution (prereq: integrated armor)") == -1;
    },
    name : "Construct Constitution",
    source : ["KT:I", 28],
    description : desc([
        "I gain resistance to poison damage and immunity to the poisoned condition",
        "Also, I have adv on saves against diseases and spell effects that need a humanoid target"
    ]),
    dmgres : ["Poison"],
    savetxt : { adv_vs : ["diseases", "humanoid target spells"], immune : ["poison"], }
}, {
    name : "Flame Projector",
    listlevel : 3,
    source : ["KT:I", 28],
    description : desc([
        "While wearing my warplate gauntlet, I can use the Fire Bolt cantrip",
        "Also, I can cast Burning Hands, Scorching Ray, Fireball, Wall of Fire, and Immolation"
    ]),
    spellcastingBonus : {
        name : "Flame Projector",
        spells : ["fire bolt", "burning hands", "scorching ray", "fireball", "wall of fire", "immolation"],
        times : 6,
        selection : ["fire bolt", "burning hands", "scorching ray", "fireball", "wall of fire", "immolation"]
    }
}, {
    name : "Force Blast",
    source : ["KT:I", 28],
    description : desc([
        "I can make a 60 ft ranged spell attack to deal 1d8 + my Intelligence mod in force damage",
        "When I take the Attack action, I can do this instead of making one attack"
    ]),
    weaponsAdd : ["Force Blast"],
    weaponOptions : {
        regExpSearch : /^(?=.*force)(?=.*blast).*$/i,
        name : "Force Blast",
        source : ["KT:I", 28],
        ability : 4,
        type : "Spell",
        damage : [1, 8, "force"],
        range : "60 ft",
        description : "Can be used instead of one attack during an Attack action",
        abilitytodamage : true,
        isWarsmithForceBlast : true
    }
}, {
    listname : "Fortified Brace (prereq: Warplate)",
    listlevel : 3,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1 && upgKn.indexOf("fortified brace (prereq: warplate)") == -1;
    },
    name : "Fortified Brace",
    source : ["KT:I", 28],
    description : desc([
        "As a reaction to taking damage I have resistance to all damage until next turn", 
        "Also, any subsequent attacks against me have disadvantage",
        "On my next turn I have half my movement speed and cannot take an action"
    ]),
    action : [ "reaction", " (Taking Damage)"]
}, {
    listname : "Iron Fortitude (prereq: Integrated Armor)",
    listlevel : 3,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return CurrentMagicItems.choices.indexOf("integrated armor (medium)") != -1 && upgKn.indexOf("iron fortitude (prereq: integrated armor)") == -1;
    },
    name : "Iron Fortitude",
    source : ["KT:I", 28],
    description : desc([
        "When damage reduces me to 0 hp I make a DC 5 +damage taken Constitution save", 
        "Unless the damage is a critical hit I drop to 1 hp instead"
    ])
}, {
    listname : "Grappling Reel (prereq: Warplate or Integrated Armor)",
    listlevel : 3,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return (CurrentMagicItems.choices.indexOf("integrated armor (medium)") != -1 || CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1) && upgKn.indexOf("grappling reel (prereq: warplate or integrated armor)") == -1;
    },
    name : "Grappling Reel",
    source : ["KT:I", 28],
    description : desc([
        "As an action or one attack, I can use my warsmith's armor integrated grappling reel",
        "I target a surface, object, or creature within 30 ft; If it is Large or more, I move towards it",
        "If it is Large or smaller, I can make a grapple check to pull it towards me and grapple it"
    ]),
    action : [["action", ""]]
}, {
    listname : "Grappling Hook (prereq: Warsuit or Warskin)",
    listlevel : 3,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return (CurrentMagicItems.choices.indexOf("warsuit (medium)") != -1 || CurrentMagicItems.choices.indexOf("warskin (light)") != -1) && upgKn.indexOf("grappling hook (prereq: warsuit)") == -1;
    },
    name : "Grappling Hook",
    source : ["KT:I", 28],
    description : desc([
        "As an action or one attack, I can use my warsmith's armor integrated grappling reel",
        "I target a surface, object, or creature within 20 ft; If it is Medium or more, I move towards it",
        "If it is Small or smaller, I can make a grapple check to pull it towards me and grapple it"
    ]),
    action : [["action", ""]]
}, {
    name : "Lightning Channel",
    listlevel : 3,
    source : ["KT:I", 29],
    description : desc([
        "I can cast Lightning Charged as a bonus action without using a spell slot once per short rest",
        "Additionally, my Force Blast upgrade deals +1d6 lightning damage"
    ]),
    usages : 1,
    recovery : "short rest",
    spellcastingBonus : {
        name : "Lightning Channel",
        spells : ["lightning charged"],
        selection : ["lightning charged"],
        firstCol : "oncesr"
    },
    calcChanges : {
        atkAdd : [
            function (fields, v) {
                if (v.theWea.isWarsmithForceBlast) {
                    fields.Description += (fields.Description ? '; ' : '') + '+1d6 lightning damage';
                };
            },
            "I add a +1d6 bonus lightning damage to the ranged spell attacks that I make with my Force Blast upgrade."
        ]
    },
    spellChanges : {
        "lightning charged" : {
            time : "1 bns",
            changes : "When using my Lightning Channel upgrade, I can cast Lightning Charged as a bonus action without expending a spell slot."
        }
    }
}, {
    name : "Lightning Projector",
    listlevel : 3,
    source : ["KT:I", 29],
    description : desc([
        "While wearing my gauntlet, I can use Shocking Grasp. I can also cast",
        "Lightning Tendril, Lightning Charged, Lightning Bolt, Jumping Jolt, and Sky Burst"
    ]),
    spellcastingBonus : {
        name : "Lightning Projector",
        spells : ["shocking grasp", "lightning tendril", "lightning charged", "lightning bolt", "jumping jolt", "sky burst"],
        times : 6,
        selection : ["shocking grasp", "lightning tendril", "lightning charged", "lightning bolt", "jumping jolt", "sky burst"]
    }
}, {
    name : "Martial Grip",
    source : ["KT:I", 29],
    description : "\n   I have proficiency with martial weapons while wearing my warplate gauntlet",
    weaponProfs : [false, true]
}, {
    name : "Power Fist",
    source : ["KT:I", 29],
    description : desc([
        "I can use my warplate gauntlet as a magic weapon that deals 1d8 bludgeoning damage",
        "I have proficiency with this weapon and it has the light property",
        "I can forgo adding my Prof Bonus to its attack roll, instead adding it twice to its damage"
    ]),
    additional : levels.map(function (n) {
        return n < 5 ? 0 : "+" + (n < 14 ? 1 : 2) + " to hit/damage";
    }),
    weaponsAdd : ["Power Fist"],
    weaponOptions : {
        regExpSearch : /^(?=.*power)(?=.*fist).*$/i,
        name : "Power Fist",
        source : ["KT:I", 29],
        ability : 1,
        type : "Natural",
        damage : [1, 8, "bludgeoning"],
        range : "Melee",
        description : "Forgo Prof Bonus on to hit, instead add it twice to damage",
        abilitytodamage : true,
        isWarsmithPowerFist : true
    },
    calcChanges : {
        atkCalc : [
            function (fields, v, output) {
                if (v.theWea.isWarsmithPowerFist && classes.known['inventor'] && classes.known['inventor'].level >= 5) {
                    var extraBonus = classes.known['inventor'].level < 14 ? 1 : 2;
                    output.extraDmg += extraBonus;
                    output.extraHit += extraBonus;
                };
            },
            "I add a +1 bonus on my attack and damage roll for Power Fist once I reach 5th level, and again when I reach 14th level Inventor."
        ]
    }
}, {
    listname : "Power Fist, 2nd hand (prereq: Power Fist)",
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("power fist, 2nd hand (prereq: power fist)") == -1 && upgKn.indexOf("power fist") != -1;
    },
    name : "Power Fist, 2nd hand",
    source : ["KT:I", 29],
    description : "\n   With a Power Fist on both hands, I can use it for two-weapon fighting",
    weaponsAdd : ["Power Fist (off-hand)"]
}, {
    name : "Reinforced Armor",
    listlevel : 3,
    source : ["KT:I", 29],
    description : " [+1 AC to warsmith's armor]",
    extraAC : [{
        mod : 1,
        text : "I gain a +1 bonus to AC while I'm wearing my warsmith's armor.",
        stopeval : function (v) { return !CurrentArmour.known || !ArmourList[CurrentArmour.known] || !ArmourList[CurrentArmour.known].isWarsmithArmour; }
    }]
}, {
    listname : "Reinforced Armor, 2nd (prereq: Reinforced Armor)",
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("reinforced armor, 2nd (prereq: reinforced armor)") == -1 && upgKn.indexOf("reinforced armor") != -1;
    },
    name : "Reinforced Armor, 2nd",
    source : ["KT:I", 29],
    description : " [+1 AC to warsmith's armor]",
    extraAC : [{
        mod : 1,
        text : "I gain a +1 bonus to AC while I'm wearing my warsmith's armor.",
        stopeval : function (v) { return !CurrentArmour.known || !ArmourList[CurrentArmour.known] || !ArmourList[CurrentArmour.known].isWarsmithArmour; }
    }]
}, {
    listname : "Reinforced Armor, 3rd (prereq: Reinforced Armor, 2nd)",
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("reinforced armor, 3rd (prereq: reinforced armor)") == -1 && upgKn.indexOf("reinforced armor, 2nd (prereq: reinforced armor)") != -1 && upgKn.indexOf("reinforced armor") != -1;
    },
    name : "Reinforced Armor, 3rd",
    source : ["KT:I", 29],
    description : " [+1 AC to warsmith's armor]",
    extraAC : [{
        mod : 1,
        text : "I gain a +1 bonus to AC while I'm wearing my warsmith's armor.",
        stopeval : function (v) { return !CurrentArmour.known || !ArmourList[CurrentArmour.known] || !ArmourList[CurrentArmour.known].isWarsmithArmour; }
    }]
}, {
    name : "Sentient Armor",
    listlevel : 3,
    source : ["KT:I", 29],
    description : "\n   While wearing my warsmith's armor, I add +2 to my Intelligence score, up to 22",
    scores : [0, 0, 0, 2, 0, 0],
    scoresMaximum : [0, 0, 0, 22, 0, 0],
}, {
    listname : "Wire Acrobatics (prereq: Grappling Hook)",
    listlevel : 3,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("wire acrobatics (prereq: grappling hook)") == -1 && upgKn.indexOf("grappling hook (prereq: warsuit)") != -1;
    },
    name : "Wire Acrobatics",
    source : ["KT:I", 29],
    description : desc([
        "I can use my grappling hook to move instead of using it as an attack/action",
        "The first time I use it to move on a turn It don't provoke attacks of opportunity"
    ])
}, {
    listname : "Artificial Guidance (prereq: Sentient Armor)",
    listlevel : 5,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("artificial guidance (prereq: sentient armor)") == -1 && upgKn.indexOf("sentient armor") != -1;
    },
    name : "Artificial Guidance",
    source : ["KT:I", 29],
    description : desc([
        "While I'm able to communicate with my warsmith's armor, I have the effect of guidance",
        "When making an Intelligence or Wisdom ability check"
    ])
}, {
    listlevel : 5,
    name : "Active Camouflage",
    source : ["KT:I", 29],
    description : desc([
        "As an action, I can cause my suit to blend into its surrounding, making me lightly obscured",
        "Thus, I can hide in plain sight and others have disadv. on Perception checks to see me"
    ]),
    action : [["action", " (start/stop)"]]
}, {
    listname : "Emergency Protocol (prereq: Sentient Armor)",
    listlevel : 5,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("emergency protocol (prereq: sentient armor)") == -1 && upgKn.indexOf("sentient armor") != -1;
    },
    name : "Emergency Protocol",
    source : ["KT:I", 29],
    description : desc([
        "When I'm incapacitated or unconscious and can't take an action, my armor will act for me",
        "It will cast a spell using one of its upgrades or take the Dodge action"
    ]),
    usages : 1,
    recovery : "short rest"
}, {
    listname : "Force Accumulator (prereq: Force Blast)",
    listlevel : 5,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("force accumulator (prereq: force blast)") == -1 && upgKn.indexOf("force blast") != -1;
    },
    name : "Force Accumulator",
    source : ["KT:I", 29],
    description : desc([
        "Each time I use a spell slot of 1st or higher I get charges equal to the slot level",
        "I can only have a max number of charges equal to half my Int mod rounded down",
        "When I deal damage with my Force Blast I can expend them to deal 1d6 damage per charge",
        "Or push them away 5 ft. per charge. Charges not spent after 1 minute are lost"
    ]),
    calcChanges : {
        atkAdd : [
            function (fields, v) {
                if (v.theWea.isWarsmithForceBlast) {
                    fields.Description += '; Max of ' + Math.floor(What('Int Mod')*0.5) + ' Force Accumulator charges; +1d6/+5ft. push per charge';
                }
            },
            "The max number of charges granted by Force Accumulator and uses per charge"
        ]
    }
}, {
    listname : "Mechanical Enhancement (prereq: Integrated Armor)",
    listlevel : 5,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("mechanical enhancement (prereq: integrated armor)") == -1 && CurrentMagicItems.choices.indexOf("integrated armor (medium)") != -1;
    },
    name : "Mechanical Enhancement",
    source : ["KT:I", 29],
    description : "\n   +5 ft to all movement modes, +1 HP per Inventor level, and +1 on Str, Dex, and Con saves",
    calcChanges : {
        hp : function (totalHD) {
            if (classes.known["inventor"]) {
                return [classes.known["inventor"].level, "Mechanical Enhancement (Inventor level)"];
            }
        }
    },
    speed : { allModes : "+5" },
    addMod : [
        { type : "save", field : "Str", mod : 1, text : "I add +1 to my Strength, Dexterity, and Constitution saving throws." },
        { type : "save", field : "Dex", mod : 1, text : "I add +1 to my Strength, Dexterity, and Constitution saving throws." },
        { type : "save", field : "Con", mod : 1, text : "I add +1 to my Strength, Dexterity, and Constitution saving throws." }
    ]
}, {
    listname : "Reactive Plating (prereq: Warplate)",
    listlevel : 5,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("reactive plating (prereq: warplate)") == -1 && CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1;
    },
    name : "Reactive Plating",
    source : ["KT:I", 30],
    description : "\n   As a reaction when hit by an attack, I can reduce the damage by my proficiency bonus",
    action : [["reaction", " (when hit)"]]
}, {
    listname : "Resistance, Acid",
    listlevel : 5,
    name : "Acid Resistance",
    source : ["KT:I", 30],
    description : "\n   While wearing my warsmith's armor, I have resistance to acid damage",
    dmgres : ["Acid"]
}, {
    listname : "Resistance, Cold",
    listlevel : 5,
    name : "Cold Resistance",
    source : ["KT:I", 30],
    description : "\n   While wearing my warsmith's armor, I have resistance to Cold damage",
    dmgres : ["Cold"]
}, {
    listname : "Resistance, Fire",
    listlevel : 5,
    name : "Fire Resistance",
    source : ["KT:I", 30],
    description : "\n   While wearing my warsmith's armor, I have resistance to fire damage",
    dmgres : ["Fire"]
}, {
    listname : "Resistance, Force",
    listlevel : 5,
    name : "Force Resistance",
    source : ["KT:I", 30],
    description : "\n   While wearing my warsmith's armor, I have resistance to force damage",
    dmgres : ["Force"]
}, {
    listname : "Resistance, Lightning",
    listlevel : 5,
    name : "Lightning Resistance",
    source : ["KT:I", 30],
    description : "\n   While wearing my warsmith's armor, I have resistance to lightning damage",
    dmgres : ["Lightning"]
}, {
    listname : "Resistance, Necrotic",
    listlevel : 5,
    name : "Necrotic Resistance",
    source : ["KT:I", 30],
    description : "\n   While wearing my warsmith's armor, I have resistance to necrotic damage",
    dmgres : ["Necrotic"]
}, {
    listname : "Resistance, Radiant",
    listlevel : 5,
    name : "Radiant Resistance",
    source : ["KT:I", 30],
    description : "\n   While wearing my warsmith's armor, I have resistance to radiant damage",
    dmgres : ["Radiant"]
}, {
    listname : "Resistance, Thunder",
    listlevel : 5,
    name : "Thunder Resistance",
    source : ["KT:I", 30],
    description : "\n   While wearing my warsmith's armor, I have resistance to thunder damage",
    dmgres : ["Thunder"]
}, {
    listname : "Sealed Suit (prereq: Warplate)",
    listlevel : 5,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("sealed suit (prereq: warplate)") == -1 && CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1;
    },
    name : "Sealed Suit",
    source : ["KT:I", 30],
    description : desc([
        "As a bonus action, I can active an environment seal on my armor with 1 hour of air",
        "While active, I'm immune to poison and acclimated to high altitude and cold & hot climates"
    ]),
    action : [["bonus action", ""]]
}, {
    listname : "Assume Control (prereq: Emergency Protocol)",
    listlevel : 9,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("assume control (prereq: emergency protocol)") == -1 && upgKn.indexOf("emergency protocol (prereq: sentient armor)") != -1;
    },
    name : "Assume Control",
    source : ["KT:I", 30],
    description : desc([
        "Read the f**king document. I can't be asked right now"
    ])
}, {
    name : "Brute Force Style",
    listlevel : 9,
    source : ["KT:I", 30],
    description : desc([
        "",
        ""
    ])
}, {
    listlevel : 9,
    name : "Ether Reactor",
    source : ["KT:I", 30],
    description : " [6 charges \u0026 1\xD7 overdraw per long rest]" + desc([
        "I can use these charges to cast spells from other upgrades, without expending that upgrade",
        "This uses 1 charge per level of the spell; I can expend more to cast the spell at a higher level",
        "Once per long rest, when out of charges, I can overdraw the reactor to cast a spell anyway",
        "When I do so, my speed becomes 0 for a number of rounds equal to the spell level cast"
    ]),
    extraLimitedFeatures : [{
        name : "Ether Reactor Charges",
        usages : 6,
        recovery : "long rest"
    }, {
        name : "Ether Reactor Overdraw",
        usages : 1,
        recovery : "long rest"
    }],
}, {
    listname : "Heads Up Display (prereq: Arcane Visor and Sentient Armor)",
    listlevel : 9,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("heads up display (prereq: arcane visor and sentient armor)") == -1 && upgKn.indexOf("emergency protocol (prereq: sentient armor)") != -1 && (upgKn.indexOf("arcane visor, darkvision") != -1 || upgKn.indexOf("arcane visor, sunlight sensitivity") != -1 || upgKn.indexOf("arcane visor, divination") != -1);
    },
    name : "Heads Up Display",
    source : ["KT:I", 30],
    description : desc([
        "",
        "",
        "",
        ""
    ])
}, {
    listname : "Phase Suit (prereq: Warsuit)",
    listlevel : 9,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("phase suit (prereq: warsuit)") == -1 && CurrentMagicItems.choices.indexOf("warsuit (medium)") != -1;
    },
    name : "Phase Suit",
    source : ["KT:I", 30],
    description : desc([
        "I know the Misty Step and Blink spells",
        "As an action, I become intangible, moving through creatures and objects until my turn ends",
        "If I end my turn inside something, I'm shunted out of it and take 10 force damage"
    ]),
    spellcastingBonus : {
        name : "Phase Suit",
        spells : ["misty step", "blink"],
        selection : ["misty step", "blink"],
        times : 2
    },
    usages : 1,
    recovery : "long rest",
    additional : "intangible",
    action : [["action", " (intangible)"]]
}, {
    listname : "Piloted Golem (prereq: warplate, incompatible with collapsible)",
    listlevel : 9,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("piloted golem (prereq: warplate, incompatible with collapsible)") == -1 && upgKn.indexOf("collapsible (incompatible with integrated armor or piloted golem)") == -1 && CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1;
    },
    name : "Piloted Golem",
    source : ["KT:I", 30],
    description : desc([
        "While wearing my warplate, my size category increases by one step",
        "In addition, I gain adv. on Strength saves and adv. on Strength checks vs. smaller creatures"
    ]),
    savetxt : { text : ["Adv. on Str saves"] },
    eval : function() {
        var curSize = tDoc.getField("Size Category").currentValueIndices;
        if (curSize != -1) PickDropdown("Size Category", curSize - 1);
    },
    removeeval : function() {
        var curSize = tDoc.getField("Size Category").currentValueIndices;
        if (curSize != -1) PickDropdown("Size Category", curSize + 1);
    }
}, {
    listlevel : 9,
    name : "Recall",
    source : ["KT:I", 30],
    description : desc([
        "As a bonus action, I can remove and hide my warsmith's armor in a pocket dimension",
        "As an action, I can don it again as I return it from this pocket dimension",
        "While it remains in this pocket dimension, it can't be interacted with in any other way"
    ]),
    action : [["bonus action", " (doff and hide)"], ["action", " (return and don)"]]
}, {//TODO: Merge this with Piloted Golem
    listname : "Ablative Armor (prereq: Piloted Golem)",
    listlevel : 11,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("ablative armor (prereq: piloted golem)") == -1 && upgKn.indexOf("piloted golem (prereq: warplate, incompatible with collapsible)") != -1;
    },
    name : "Ablative Armor",
    source : ["KT:I", 29],
    description : "\n   Whenever I finish a short or long rest, I gain temp HP equal to my Int mod + Inventor level"
}, {
    listname : "Cloaking Device (prereq: Active Camouflage)",
    listlevel : 11,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("cloaking device (prereq: active camouflage)") == -1 && upgKn.indexOf("active camouflage") != -1;
    },
    name : "Cloaking Device",
    source : ["KT:I", 31],
    description : desc([
        "As a reaction on my turn where I don't move with active camouflage engaged, I can Hide",
        "I make an Int (Stealth) check, but at disadv. in 5 ft of a creature or if I attacked this turn",
        "I can overload my camouflage to cast Greater Invisibility without expending a spell slot"
    ]),
    action : [["reaction", " (if not moved)"]],
    usages : 1,
    recovery : "long rest",
    additional : "Greater Invisibility",
    spellcastingBonus : {
        name : "Cloaking Device",
        spells : ["greater invisibility"],
        selection : ["greater invisibility"],
        firstCol : "oncelr"
    }
}, {
    listname : "Lightning Rod (prereq: Lightning Channel)",
    listlevel : 11,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("lightning rod (prereq: lightning channel)") == -1 && upgKn.indexOf("lightning channel") != -1;
    },
    name : "Lightning Rod",
    source : ["KT:I", 31],
    description : "\n   Whenever I cast Lightning Charged, I treat it as if I had used a spell slot of 1 level higher",
    spellChanges : {
        "lightning charged" : {
            description : "If target crea melee atk, touch spell, or in grapple, other takes 1d6 Lightn. dmg; works 8+2/SL times",
            changes : "When using my Lightning Rod upgrade, I always cast Lightning Charged as if I had used a spell slot of 1 level higher than I actually used."
        }
    }
}, {
    listname : "Flash Freeze Capacitor (incompatible with other Capacitors)",
    listlevel : 11,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("flash freeze capacitor (incompatible with other capacitors)") == -1 && !(/capacitor[^s]/).test(upgKn);
    },
    name : "Flash Freeze Capacitor",
    source : ["KT:I", 31],
    description : desc([
        "Once per long rest, I can cast Cone of Cold using this upgrade without using a spell slot",
        "When doing so, the effected area is difficult terrain until the end of my next turn"
    ]),
    usages : 1,
    recovery : "long rest",
    spellcastingBonus : {
        name : "Flash Freeze Capacitor",
        spells : ["cone of cold"],
        selection : ["cone of cold"],
        firstCol : "oncelr"
    },
    spellChanges : {
        "cone of cold" : {
            description : "8d8+1d8/SL Cold dmg; save half; killed crea frozen statues till thawed; area dif. ter. till next turn ends",
            changes : "When using my Flash Freeze Capacitor upgrade to cast Cone of Cold, the effected area becomes difficult terrain until the end of my next turn."
        }
    }
}, {
    listname : "Flight (incompatible with Piloted Golem)",
    listlevel : 11,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("flight (incompatible with piloted golem)") == -1 && upgKn.indexOf("piloted golem (prereq: warplate, incompatible with collapsible)") == -1;
    },
    name : "Flight",
    source : ["KT:I", 31],
    description : "\n   While wearing my warsmith's armor, I have a magical flying speed of 30 ft",
    speed : { fly : { spd : 30, enc : 30 } }
}, {
    listname : "Integrated Attack (prereq: Integrated Armor or Warplate)",
    listlevel : 11,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("integrated attack (prereq: integrated armor or warplate)") == -1 && (CurrentMagicItems.choices.indexOf("integrated armor (medium)") == -1 || CurrentMagicItems.choices.indexOf("warplate (heavy)") == -1);
    },
    name : "Integrated Attack",
    source : ["KT:I", 31],
    description : " [can have multiple times]" + desc([
        "Upon selecting this upgrade, I incorporate a melee weapon I own into my warsmith's armor",
        "This weapon can't have the heavy property; As a bonus action, I can activate this weapon",
        "I am proficient with this weapon, I require no hands to wield it, and can't be disarmed of it",
        "As a bonus action and when activating, I can make one attack with this weapon"
    ]),
    action : [["bonus action", " (active/attack)"]]
}, {
    listlevel : 11,
    name : "Iron Muscle",
    source : ["KT:I", 31],
    description : "\n   While wearing my warsmith's armor, I add +2 to my Strength score, up to 24",
    scores : [2, 0, 0, 0, 0, 0],
    scoresMaximum : [24, 0, 0, 0, 0, 0]
}, {
    listname : "Power Slam Capacitor (incompatible with other Capacitors)",
    listlevel : 11,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("power slam capacitor (incompatible with other capacitors)") == -1 && !(/capacitor[^s]/).test(upgKn);
    },
    name : "Power Slam Capacitor",
    source : ["KT:I", 31],
    description : "\n   As an action, I jump up to my movement and cast Destructive Wave as I land (no spell slot)",
    usages : 1,
    recovery : "long rest",
    action : [["action", ""]],
    spellcastingBonus : {
        name : "Power Slam Capacitor",
        spells : ["destructive wave"],
        selection : ["destructive wave"],
        firstCol : "oncelr"
    }
}, {
    listname : "Self-Repair Matrix (prereq: Ablative Armor)",
    listlevel : 11,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("self-repair matrix (prereq: ablative armor)") == -1 && upgKn.indexOf("ablative armor (prereq: piloted golem)") != -1;
    },
    name : "Self-Repair Matrix",
    source : ["KT:I", 32],
    description : "\n   At the start of my turn when I have no temp HP, I gain my proficiency bonus in temp HP"
}, {
    listname : "Iron Grip (prereq: Iron Muscle, incompatible with Integrated Attack)",
    listlevel : 15,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("heads up display (prereq: arcane visor and sentient armor)") == -1 && upgKn.indexOf("emergency protocol (prereq: sentient armor)") != -1 && upgKn.indexOf("emergency protocol (prereq: sentient armor)") == -1;
    },
    name : "Heads Up Display",
    source : ["KT:I", 31],
    description : desc([
        "",
        "",
        "",
        ""
    ])
}, {
    listname : "Phase Engine (prereq: Warsuit)",
    listlevel : 15,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return CurrentMagicItems.choices.indexOf("warsuit (medium)") != -1;
    },
    name : "Phase Engine",
    source : ["KT:I", 31],
    description : desc([
        "As a reaction when attacked, I can become intangible causing the attack to miss",
        "If the attack is with a magical weapon, it has disadvantage instead",
        "This upgrade also recharges every time I teleport or otherwise visit the ethereal plane"
    ]),
    action : [["reaction", " (if attacked)"]],
    usages : 1,
    recovery : "short rest"
}, {
    listname : "Heavy Plating (prereq: Warplate)",
    listlevel : 15,
    prereqeval : function () {
        return CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1;
    },
    name : "Heavy Plating",
    source : ["KT:I", 31],
    description : "\n   While wearing my warplate, I have resistance to nonmagical bludg./pierc./slash. damage",
    dmgres : [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]
}, {
    listname : "Shield Arm (prereq: Piloted Golem)",
    listlevel : 15,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("piloted golem (prereq: warplate, incompatible with collapsible)") != -1;
    },
    name : "Shield Arm",
    source : ["KT:I", 32],
    description : desc([
        "As a bonus action, I can deploy the shield that is integrated in my armor's arm",
        "I am proficiency with this shield and it requires the use of my arm"
    ]),
    action : [["bonus action", " (deploy)"]],
    shieldAdd : ["Shield Arm", 2, 0]
}, {
    listlevel : 15,
    name : "Sun Cannon",
    source : ["KT:I", 31],
    description : "\n   Once per long rest, I can cast Sunbeam using this upgrade without using a spell slot",
    usages : 1,
    recovery : "long rest",
    spellcastingBonus : {
        name : "Sun Cannon",
        spells : ["sunbeam"],
        selection : ["sunbeam"],
        firstCol : "oncelr"
    }
}, {
    listname : "Virtual Interface (prereq: Sentient Armor)",
    listlevel : 15,
    prereqeval : function () {
        var upgKn = ClassList["inventor"].chosenUpgrades();
        return upgKn.indexOf("sentient armor") != -1;
    },
    name : "Virtual Interface",
    source : ["KT:I", 31],
    description : desc([
        "When I use artificial strength to raise my Strength, my Intelligence no longer lowers",
        "However, this only applies to my natural Int score (not counting upgrades or magic items)"
    ])
}].forEach(function (aObj) {
    var upgName = aObj.listname ? aObj.listname : aObj.name;
    var upgNameLC = upgName.toLowerCase();
    var upgLevel = aObj.listlevel ? aObj.listlevel : 1;
    if (!aObj.prereqeval && upgLevel === 3) {
        aObj.prereqeval = function () {
            return classes.known["inventor"].level >= 3 && ClassList["inventor"].chosenUpgrades().indexOf(upgNameLC) == -1;
        }
        upgLevel = 1; // so that it's still added to the first list of upgrades
    } else if (!aObj.prereqeval && upgLevel < 15) {
        aObj.prereqeval = function () {
            return ClassList["inventor"].chosenUpgrades().indexOf(upgNameLC) == -1;
        }
    }
    for (var aFea in ClassSubList["inventor-warsmith"].features) {
        var feaObj = ClassSubList["inventor-warsmith"].features[aFea];
        if (!(/upgrade/i).test(feaObj.name) || !feaObj.extrachoices || feaObj.minlevel < upgLevel) continue;
        feaObj.extrachoices.push(upgName);
        feaObj[upgNameLC] = aObj;
    }
});

ClassSubList["inventor-cursesmith"] = {
    regExpSearch : /^(?=.*cursesmith)(?!.*wizard).*$/i,
    subname : "Cursesmith",
    fullname : "Cursesmith",
    source : ["KT:I", 40],
    attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    features : {
        "subclassfeature1" : {
            name : "Cursesmith's Proficiency",
            source : ["KT:I", 40],
            minlevel : 1,
            description : " [Artisan Tool, One Language]" + desc([
                "I have advantage to determine the nature of a curse"
            ]),
            toolProfs : ["Artisan’s Tools", 1],
            languageProfs : ["Infernal, Abyssal, Deepspeech, or Primordial.", 1],
        },
        "subclassfeature1.1" : {
            name : "Warplate Gauntlet",
            source : ["KT:I", 40],
            minlevel : 1,
            description : " [create more: long rest + 25 gp, or 2 days]" + desc([
                "I gain a warplate gauntlet, a wondrous item that only I can attune to",
                "When I create one, it has either the Power Fist, Force Blast, or Martial Grip upgrade"
            ]),
            eval : function () { AddMagicItem("Warplate Gauntlet"); },
            removeeval : function () { RemoveMagicItem("Warplate Gauntlet"); }
        },
        "subclassfeature3" : {
            name : "Warsmith's Armor",
            source : ["KT:I", 27],
            minlevel : 3,
            description : " [create more: 8 hours + 2000 gp]\n   I gain a warsmith's armor that includes a warplate gauntlet, no separate attunement",
            eval : function () { RemoveMagicItem("Warplate Gauntlet"); AddMagicItem("Warsmith's Armor"); },
            removeeval : function () { RemoveMagicItem("Warsmith's Armor"); AddMagicItem("Warplate Gauntlet"); }
        },
        "subclassfeature3.1" : {
            name : "Upgrades, Basic",
            source : ["KT:I", 3],
            minlevel : 3,
            description : desc([
                "I can select a number of upgrades that are applied to the armor/gauntlet I create",
                "I can have multiple armors/gauntlets with different upgrades, but can attune to only one",
                "Attuning to either requires a long rest; I can swap 1 upgrade when I gain a level",
                "An upgrade can only be switched to another available at the same level",
                'Use the "Choose Feature" button above to select the upgrades of the currently equipped',
                "The above number includes the 'free' Power Fist, Force Blast, or Martial Grip upgrade"
            ]),
            additional : [0,0,1,1].map(upgradeAdditionalMaker),
            extraTimes : [0,0,1,1],
            extraname : "Unrestricted Upgrade",
            extrachoices : []
        },
        "subclassfeature5" : {
            name : "Upgrades, Level 5",
            source : ["KT:I", 3],
            minlevel : 5,
            description : "",
            additional : [0,0,0,0,1,1,2,2].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,1,1,2,2],
            extraname : "Level 5 Upgrade",
            extrachoices : []
        },
        "subclassfeature9" : {
            name : "Upgrades, Level 9",
            source : ["KT:I", 3],
            minlevel : 9,
            description : "",
            additional : [0,0,0,0,0,0,0,0,1,1].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,0,0,0,0,1,1],
            extraname : "Level 9 Upgrade",
            extrachoices : []
        },
        "subclassfeature11" : {
            name : "Upgrades, Level 11",
            source : ["KT:I", 3],
            minlevel : 11,
            description : "",
            additional : [0,0,0,0,0,0,0,0,0,0,1,1,2].map(upgradeAdditionalMaker).concat(["3 upgrades known, includes level 14 bonus"]),
            extraTimes : [0,0,0,0,0,0,0,0,0,0,1,1,2,3], // includes level 14 bonus upgrade
            extraname : "Level 11 Upgrade",
            extrachoices : []
        },
        "subclassfeature14" : {
            name : "Fully Customized Gear",
            source : ["KT:I", 28],
            minlevel : 14,
            description : "\n   During a long rest, I can swap out one upgrade for another if all prerequisites are met"
        },
        "subclassfeature15" : {
            name : "Upgrades, Level 15",
            source : ["KT:I", 3],
            minlevel : 15,
            description : "",
            additional : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3],
            extraname : "Level 15 Upgrade",
            extrachoices : []
        }
    }
};

//***********************************************-Extra Class/Subclass Stuff-***********************************************\\

//* 1st Level Spells
SpellsList["arcane ablation"] = {
    name : "Arcane Ablation",
	source : ["KT:I", 59],
	classes : ["inventor"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Touch",
	components : "V,S",
	duration : "1 h",
	description : "Imbue armor/clothing, crea wearing n(4+1/SL) temp hp, after exhausted +(n-1) temp hp, repeat",
	descriptionFull : "You touch a piece of worn armor or clothing and imbue it with magic. The creature wearing this the imbued item gains 4 temporary hit points for the duration. When these temporary hit points are exhausted, at the start of the creatures next turn it will gain 3 temporary hit points. This repeats when those temporary hit points are exhausted as the previous total minus one, until no temporary hit points would be gained and the spell ends." + "\n   " + "At Higher Levels: The initial temporary hit points increases by 1 for each slot level above 1st."
};
SpellsList["arcane weapon"] = {
    name : "Arcane Weapon",
	source : ["KT:I", 59],
	classes : ["inventor"],
    level : 1,
    school : "Trans",
	time : "1 bns",
    range : "Touch",
	components : "V,S",
	duration : "1 h",
	description : "Imbue weapon, counts as magical, deals Force dmg, no ammo consumption or reloading",
	descriptionFull : "You touch a weapon and imbue it with magic. For the duration the weapon counts as a magical weapon and any damage dealt by it is Force damage. When casting this one a weapon with the ammunition property, it no longer consumes ammunition when fired, and does not need to be reloaded." + "\n   " + "At Higher Levels. When you cast this spell using a spell slot of 3rd or 4th level, the duration becomes 8 hours. When you use a spell slot of 5th level or higher, the duration becomes 24 hours."
};
SpellsList["awaken rope"] = {
    name : "Awaken Rope",
	source : ["KT:I", 60],
	classes : ["inventor"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Touch",
	components : "V,S,M",
    compMaterial : "10 to 60 ft of cord or rope, worth at least 1 cp",
	duration : "Instantaneous",
	description : "Command rope to bind, fasten, or grab. Better stats at higher SL",
	descriptionFull : "As an action, you can touch a rope 10 to 60 feet long and issue a single command to it, selecting from the following options: " + "\n\n   " + "Bind. The rope attempts to bind a creature of your choice within 20 feet of you. The creature must make a Dexterity saving throw or become restrained until it is freed. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the rope (AC 10) also frees the creature without harming it, ending the effect and destroying the rope." + "\n   " + "Fasten. The rope flies up 60 feet and ties one end to an object or surface that a rope could be tied to, before becoming inanimate again, hanging from the object." + "\n   " + "Grab. The rope lashes out grabs one Small or smaller object that is not being worn by a creature within a range equal to the length of the rope and pulls that object back to your hand. If that object is being carried by a creature, it must make a Strength saving throw. On success, it retains the object, and on failure the object is pulled from the creature." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, you can target a chain instead of a rope. It has the same available actions, but it has a DC 15, an AC of 15, and resistance to slashing damage when taking the Bind action. When cast with a spell slot of 3rd level or higher targeting a rope, that rope is magically imbued for 1 minute, gaining an DC of 15, an AC 20, and 20 hit points."
};
SpellsList["bond item"] = {
    name : "Bond Item",
	source : ["KT:I", 61],
	classes : ["inventor"],
    level : 1,
    school : "Conj",
	time : "1 min",
    range : "Touch",
	components : "V,S",
    duration : "8 h",
    save : "Cha",
	description : "Link a up to 100 lb item, recall as bns; If crea hold/wear save, adv. if greater then 1 min",
	descriptionFull : "You touch a item weighing no more than 100 pounds and form a link between you and it. Until the spell ends, you can recall it to your hand as a bonus action." + "\n   " + "If another creature is holding or wearing the item when you try to recall it, they make a Charisma saving throw, and if they succeed, the spell fails. They make this save with Advantage if they have had possession of the item for more than 1 minute."
};
SpellsList["fall"] = {
    name : "Fall",
	source : ["KT:I", 62],
	classes : ["inventor","sorcerer","wizard"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Self",
	components : "V,S",
    duration : "Instantaneous",
	description : "Change which way is down for you, fall up to 500 ft, all normal effects apply",
	descriptionFull : "You alter gravity for yourself, causing you to reorient which way is down for you until the end of your turn. You can pick any direction to fall as if under the effect of gravity, falling up to 500 feet before the spell ends." + "\n   " + "If you collide with something during this time, you take falling damage as normal, but you can control your fall as you could under normal conditions by holding onto objects or move along a surface according to your new orientation as normal until your turn ends and gravity returns to normal."
};
SpellsList["lightning tendril"] = {
    name : "Lightning Tendril",
	source : ["KT:I", 63],
	classes : ["druid","occultist","sorcerer","warlock","wizard"],
    level : 1,
    school : "Evoc",
	time : "1 bns",
    range : "S:20 ft",
	components : "V,S,M",
    duration : "Conc, 1 min",
	description : "Deal 1d12 as action, 3/4SL; 2d12 at 30ft, 5/6SL; 3d12 at 60ft, 7SL; 4d12 at 120ft",
	descriptionFull : "Crackling beams of blue energy leap from your hands. For the duration of the spell, as an action, you can direct them toward a creature within range, dealing 1d12 lightning damage to that creature." + AtHigherLevels + "When you cast this spell using a 3rd- or 4th-level spell slot, the damage increases to 2d12 and the range increases to 30 feet. When you cast it using a 5th- or 6th-level spell slot, the damage increases to 3d12 and the range increases to 60 feet. When you cast it using a spell slot of 7th level or higher, the damage increases to 4d12 and the range increases to 120 feet."
};
SpellsList["returning weapon"] = {
    name : "Returning Weapon",
	source : ["KT:I", 65],
	classes : ["inventor"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Self",
	components : "V,S",
    duration : "24 h",
	description : "Grant thrown 20/60 property to weapon, returns to hand after thrown",
	descriptionFull : "You touch a weapon granting it the thrown 20/60 property. If it already has the thrown property, it’s range increases by 20/60. It also gains the \"returning\" property. After being thrown it automatically reappears in the thrower’s hand."
};
SpellsList["seeking projectile"] = {
    name : "Seeking Projectile",
	source : ["KT:I", 65],
	classes : ["inventor", "ranger"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Touch",
	components : "V,S",
    duration : "Conc, 10 min",
	description : "1 ammo/thrown, add spell mod to atk roll, if >= 20 crit",
	descriptionFull : "You touch a piece of ammunition or weapon with the thrown property imbuing it with the property of seeking its target. When an ranged attack roll is made with that weapon, the attack roll can add your spell casting modifier to the value on the dice. If that makes the value on the die a 20 or more, the attack is a critical hit as if a 20 was rolled. After making the attack roll, the spell ends."
};
SpellsList["unburden"] = {
    name : "Unburden",
	source : ["KT:I", 67],
	classes : ["inventor"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Touch",
	components : "V,S",
    duration : "1 h",
	description : "No penalties to MS or Dex(Stealth) in heavy armor, carry up to double weight",
	descriptionFull : "A creature you touch no longer suffers the penalties to movement speed or to their Dexterity (Stealth) check while wearing heavy armor, and is no long encumbered from carry weight unless they are carrying more than twice the weight that would encumber them."
};
//* 2nd Level Spells
SpellsList["animate object"] = {
    name : "Animate Object",
	source : ["KT:I", 59],
	classes : ["bard", "inventor", "occultist", "sorcerer", "wizard"],
    level : 2,
    school : "Trans",
	time : "1 a",
    range : "60 ft",
	components : "V,S",
    duration : "Conc, 1 min",
	description : "Bring a Tiny object to life, command with bns action within 60 ft",
	descriptionFull : "You bring a Tiny object to life. Its Constitution is 10 and its Intelligence and Wisdom are 3, and its Charisma is 1. Its speed is 30 feet; if the object lacks legs or other appendages it can use for locomotion, it instead has a flying speed of 30 feet and can hover. The object has the following stats: HP: 20, AC: 18, Str: 4, Dex: 18. The object has an attack modifier equal to your spell attack modifier. If the object is not a weapon, it deals 1d4 + your Spellcasting modifier damage on hit. Select from bludgeoning, piercing, or slashing damage based on the nature of the item. If the object is a weapon, it deals the weapon’s damage dice + your Spellcasting modifier of the weapon’s damage type. The spell can only animate one-handed weapons without the special modifier this way." + "\n   " + "As a bonus action, you can mentally command the animated object as long as it is within 60 feet of you. You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete." + "\n   " + "If the object is securely attached to a surface or a larger object, such as a chain bolted to a wall, its speed is 0. It has blindsight with a radius of 30 feet and is blind beyond that distance. When the animated object drops to 0 hit points, it reverts to its original object form, and any remaining damage carries over to its original object form."
};
SpellsList["imbue luck"] = {
    name : "Imbue Luck",
	source : ["KT:I", 63],
	classes : ["inventor"],
    level : 2,
    school : "Abjur",
	time : "1 a",
    range : "Touch",
	components : "V,S,M",
    duration : "1 h",
	description : "1 weapon/armor, if weapon on atk extra d20, if armor on atk against wearer",
	descriptionFull : "You touch a weapon and worn item and imbue luck into it. If imbued on a weapon, for the duration, on an attack roll, the wielder can roll an additional d20 (they can choose to this after they roll, but before the outcome is determined). The creature can choose which of the d20s is used for the attack roll." + "\n   " + "If imbued into a worn item, they can roll a d20 when attacked, then choose whether the attack uses the attacker's roll or theirs." + "\n   " + "With either use, the spell immediately ends upon rolling the extra d20."
};
SpellsList["lightning charged"] = {
    name : "Lightning Charged",
    classes : ["inventor"],
    source : ["KT:I", 63],
    level : 2,
    school : "Evoc",
    time : "1 a",
    range : "Touch",
    components : "V,S,M",
    compMaterial : "A piece of once used lightning rod",
    duration : "10 min",
    description : "If target crea melee atk, touch spell, or in grapple, other takes 1d6 Lightn. dmg; works 6+2/SL times",
    descriptionFull : "You channel lightning energy into a creature. The energy is harmless to the creature, but escapes in dangerous bursts to other nearby creatures.\n   Every time that creature strikes another creature with a melee attack, a spell with a range of touch, is struck by another creature with melee attack, or ends their turn while grappling or being grappled by another creature, they deal 1d6 Lightning damage to that creature.\n   Once this spell has discharged 6 times (dealing up to 6d6 damage), the spell ends." + AtHigherLevels + "The spell can discharge damage 2 additional times (dealing 2d6 more total damage) before the spell ends for each slot level above 2nd."
}
SpellsList["thunderburst mine"] = {
    name : "Thunderburst Mine",
	source : ["KT:I", 66],
	classes : ["inventor"],
    level : 2,
    school : "Abjur",
	time : "1 min",
    range : "Touch",
    components : "V,S,M",
    compMaterial : "Any tiny nonmagical item, which is destroyed by the activation of the spell",
    duration : "8 h",
    save : "Con",
	description : "Set trap 5 ft/1 rea(1 or more mines), crea in 10 ft save 3d8 thunder dmg, half on success",
	descriptionFull : "You can set a magical trap by infusing explosive magic into an item. You can set this item to detonate when someone comes within 5 feet of it, or by a verbal command using your reaction (one or more mines can be detonated)." + "\n   " + "When the magic trap detonates, Each creature in a 10-foot-radius Sphere centered on item must make a Constitution saving throw. A creature takes 3d8 thunder damage on a failed save, or half as much damage on a successful one. If a creature is in the area of effect of more than one thunderburst mine during a turn, they take half damage from any subsequent effects of the mines." + "\n   " + "A magical mine must be set 5 feet or more from another mine, and cannot be moved once placed; any attempt to move it results it in detonating unless the Inventor that set it disarms it with an action."
};
//* 3rd Level Spells
SpellsList["dispel construct"] = {
    name : "Dispel Construct",
	source : ["KT:I", 61],
	classes : ["inventor"],
    level : 3,
    school : "Abjur",
	time : "1 a",
    range : "60 ft",
    components : "V,S",
    duration : "Instantaneous",
    save : "Con",
	description : "1 construct 4d10 force dmg, con save or stunned for 1 min, if <50 hp after fail reduce to 0",
	descriptionFull : "You can attempt to purge the magic animating a construct within range, rendering it inert. The target takes 4d10 force damage and must succeed on a Constitution saving throw or become stunned for 1 minute. At the end of each of its turns, the target can make another Constitution saving throw. On a success, the spell ends on the target. If the target has less than 50 hit points remaining when it fails, it is reduced to zero hit points."
};
SpellsList["fireburst mine"] = {
    name : "Fireburst Mine",
	source : ["KT:I", 62],
	classes : ["inventor"],
    level : 3,
    school : "Abjur",
	time : "1 min",
    range : "Touch",
    components : "V,S,M",
    duration : "8 h",
    save : "Con",
	description : "Set trap 5 ft/1 rea(1 or more mines), crea in 20 ft save 5d8 fire dmg, half on success",
	descriptionFull : "You can set a magical trap by infusing explosive magic into an item. You can set this item to detonate when someone comes within 5 feet of it, or by a verbal command using your reaction (one or more mines can be detonated)." + "\n   " + "When the magic trap detonates, Each creature in a 20-foot-radius Sphere centered on item must make a Dexterity saving throw. A creature takes 5d8 fire damage on a failed save, or half as much damage on a successful one. If a creature is in the area of effect of more than one fireburst mine during a turn, they take half damage from any subsequent effects of the mines." + "\n   " + "A magical mine must be set 5 feet or more from another mine, and cannot be moved once placed; any attempt to move it results it in detonating unless the Inventor that set it disarms it with an action."
};
//* 4th Level Spells
SpellsList["jumping jolt"] = {
    name : "Jumping Jolt",
	source : ["KT:I", 63],
	classes : ["sorcerer","wizard"],
    level : 4,
    school : "Evoc",
	time : "1 a",
    range : "60 ft",
    components : "V,S",
    duration : "Instantaneous",
	description : "Atk crea for 4d12+SLd12 lightning, extra atk on crea 20 ft area; repeat, half dmg on miss; no extra atk",
	descriptionFull : "You release an arc of lighting at a creature within range. Make a ranged spell attack roll against the target. On hit, the target takes 4d12 lightning damage, and you can cause the spell to jump to another target within 20 feet of the first target making a new attack roll for each target. The spell cannot hit the same target twice, or jump to a target out of the spells range. The spell can jump a maximum of five times.\n    On a miss, the target takes half as much damage and the spell does not jump to a new target." + AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, the starting damage increases by 1d12 for each slot level above 4th."
};
SpellsList["repair"] = {
    name : "Repair",
	source : ["KT:I", 64],
	classes : ["inventor"],
    level : 4,
    school : "Trans",
	time : "1 a",
    range : "Touch",
    components : "V,S",
    duration : "Instantaneous",
	description : "Restore 10d6+2d6/SL hp or years ago to an construct/obj",
	descriptionFull : "You touch a construct or inanimate object, causing it regain 10d6 hit points. This causes any parts or material that has broken away from the construct or object to reattach, repairing it to the condition it when before losing those hit points." + "\n   " + "If the construct or object damaged state is the result of age, you can instead repair to the condition it was in 10d6 years ago, if it was previously in a better condition during that time (the condition can only improve or not change)" + AtHigherLevels + "The hit points restored increases by 2d6 (or the years restored) for each slot above 4th."
};
//* 5th Level Spells
SpellsList["sky burst"] = {
    name : "Sky Burst",
	source : ["KT:I", 65],
	classes : ["druid", "sorcerer", "Wizard"],
    level : 5,
    school : "Evoc",
	time : "1 a",
    range : "120 ft",
    components : "V,S",
    duration : "Instantaneous",
	description : "5 points + 1 SL, crea in 5 ft area dex save or 4d12, half on save, crea only hit once",
	descriptionFull : "Five bolts of lightning strike five points of your choice that you can see within range. Each creature within 5 feet of the chosen points must make a Dexterity saving throw. A creature takes 4d12 lightning damage on a failed save, or half as much on a successful one. A creature in the area of more than one lightning burst is affected only once." + AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, you can call down an additional bolt of lightning targeting another point within range for each slot level above 5th."
};
SpellsList["translocating shot"] = {
    name : "Translocating Shot",
	source : ["KT:I", 66],
	classes : ["inventor", "Ranger", "Wizard"],
    level : 5,
    school : "Trans",
	time : "1 bns",
    range : "5 ft",
    components : "V,S,M",
    compMaterial : "a piece of ammunition worth at least 1 cp",
    duration : "Conc, 1 min",
	description : "Bind willing to ammo, tele to target, Large=< 4 willing, 6th SL 9 willing to Huge",
	descriptionFull : "You magically bind a willing creature within range into a piece of ammunition. When the piece of ammunition is fired, the creature bound to the piece of ammunition is teleported to the target destination. You can fire the ammunition at a creature, object, or point within the normal range of the weapon. When attacking a creature or object, the target is teleported to within 5 feet of the target hit or miss." + "\n   " + "When you cast this spell, if you cast it on a Large or larger piece of ammunition, you can bind up to 4 creatures to the piece of ammunition." + AtHigherLevels + "When you using 6th level slot or higher, you can cast it on a huge piece of ammunition, binding up to nine creatures to the piece of ammunition."
};
SpellsList["vorpal weapon"] = {
    name : "Vorpal Weapon",
	source : ["KT:I", 67],
	classes : ["inventor"],
    level : 5,
    school : "Trans",
	time : "1 a",
    range : "Touch",
    components : "V,S",
    duration : "Conc, 1 h",
	description : "Ignore slashing dmg resistance, double dmg to obj, +3 to atk & dmg if less; crit kills if less then 50 hp",
	descriptionFull : "Until the spell ends, a weapon touch becomes indescribably sharp, ignoring resistance to slashing damage, and gains the Siege property, dealing double damage to inanimate objects such as structures. The weapon has a modifier of less than +3 to attack and damage rolls, its modifier becomes +3 to attack and damage rolls for the duration of the spell." + "\n   " + "Additionally, if a critical strike of this weapon would leave a creature with less than 50 hit points, the target creature is killed."
};


//*****************************************************\\
//*                  -Thundersmith-                   *\\
//*****************************************************\\

MagicItemsList["stormforged weapon"] = {
    name : "Stormforged Weapon",
    source : ["KT:I", 22],
    type : "wondrous item",
    rarity : "very rare",
    extraTooltip : "Attunement (creator only)",
    attunement : true,
    prerequisite : "Only for a Thundersmith Inventor or if you take the Stormforged Weapon as a Cross Disciplinary Knowledge feature as an Inventor",
    prereqeval : function(v) {
        return classes.known["inventor"].subclass == "inventor-thundersmith" || GetFeatureChoice("class", "inventor", "cross disciplinary knowledge", true).indexOf("stormforged weapon") != -1;
    },
    allowDuplicates : true,
    description : "While attuned to this weapon you have proficiency with it, You can only be attuned to one of these weapons at a time, which can be changed over a long rest,if lost it can be remade over 3 days (8h each) + 200 gp. It can be augmented with Thundersmith upgrades, each one can have different or the same upgrades.",
    descriptionFull : "This weapon requires attunement and you proficient with it while attuned. and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest." + "\n   " + "If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (eight hours each day) by expending 200 gold pieces worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or different type, and select the same or different upgrades." + "\n   " + "Stormcharged: When you use an action, bonus action, or reaction to attack with a Stormcharged Weapon, you can make only one Attack regardless of the number of attacks you can normally make. If you could otherwise make additional attacks with that action, the weapon deals an additional 3d6 lightning or thunder damage per attack that was foregone." + "\n   " + "Loud: Your weapon rings with thunder that is audible within 300 feet of you whenever it makes an attack.",
    choices : ["Thunder Cannon", "Hand Cannon", "Kinetic Hammer", "Charged Blade", "Lightning Pike"],
    "thunder cannon" : {
        name : "Thunder Cannon",
        source : ["KT:I", 22],
        description : "This powerful two-handed cannon does d12 piercing damage, has a range of 60/180 ft, requires attunement for proficiency, it can be augmented with Thundersmith upgrades, and has the Loud and Stormcharged properties.",
		descriptionLong : "This weapon requires attunement and you proficient with it while attuned. and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest." + "\n   " + "If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (eight hours each day) by expending 200 gold pieces worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or different type, and select the same or different upgrades." + "\n   " + "Stormcharged: When you use an action, bonus action, or reaction to attack with a Stormcharged Weapon, you can make only one Attack regardless of the number of attacks you can normally make. If you could otherwise make additional attacks with that action, the weapon deals an additional 3d6 lightning or thunder damage per attack that was foregone." + "\n   " + "Loud: Your weapon rings with thunder that is audible within 300 feet of you whenever it makes an attack.",
		weight : 15,
        weaponAdd : "Thunder Cannon",
        weaponOptions : {
            regExpSearch : /^(?=.*thunder)(?=.*cannon).*$/i,
            name : "Thunder Cannon",
            source : ["KT:I", 22],
            ability : 2,
            type : "Inventor Weapon",
            damage : [1, 12, "piercing"],
            range : "60/180 ft",
            weight : 15,
            description : "Ammunition, Two-handed, Loud, Stormcharged",
            abilitytodamage : true,
            ammo : "storm rounds",
            artThundercannon : true
        }
    },
    "hand cannon" : {
        name : "Hand Cannon",
        source : ["KT:I", 22],
        description : "This powerful but light cannon does d10 piercing damage, has a range of 30/90 ft, requires attunement for proficiency, it can be augmented with Thundersmith upgrades, and has the Loud and Stormcharged properties.",
		descriptionLong : "This weapon requires attunement and you proficient with it while attuned. and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest." + "\n   " + "If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (eight hours each day) by expending 200 gold pieces worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or different type, and select the same or different upgrades." + "\n   " + "Stormcharged: When you use an action, bonus action, or reaction to attack with a Stormcharged Weapon, you can make only one Attack regardless of the number of attacks you can normally make. If you could otherwise make additional attacks with that action, the weapon deals an additional 3d6 lightning or thunder damage per attack that was foregone." + "\n   " + "Loud: Your weapon rings with thunder that is audible within 300 feet of you whenever it makes an attack.",
		weight : 5,
        weaponAdd : "Hand Cannon",
        weaponOptions : {
            regExpSearch : /^(?=.*Hand)(?=.*cannon).*$/i,
            name : "Hand Cannon",
            source : ["KT:I", 22],
            ability : 2,
            type : "Inventor Weapon",
            damage : [1, 10, "piercing"],
            range : "30/90 ft",
            weight : 5,
            description : "Ammunition, Light, Loud, Stormcharged",
            abilitytodamage : true,
            ammo : "storm rounds",
            artHandcannon : true
        }
    },
    "kinetic hammer" : {
        name : "Kinetic Hammer",
        source : ["KT:I", 22],
        description : "This powerful melee weapon does d10 bludgeoning damage plus an extra d4 Thunder damage, requires attunement for proficiency, it can be augmented with Thundersmith upgrades, and has the Loud property.",
		descriptionLong : "This weapon requires attunement and you proficient with it while attuned. and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest." + "\n   " + "If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (eight hours each day) by expending 200 gold pieces worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or different type, and select the same or different upgrades." + "\n   " + "Loud: Your weapon rings with thunder that is audible within 300 feet of you whenever it makes an attack.",
		weight : 10,
        weaponAdd : "Kinetic Hammer",
        weaponOptions : {
            regExpSearch : /^(?=.*kinetic)(?=.*hammer).*$/i,
            name : "Kinetic Hammer",
            source : ["KT:I", 22],
            ability : 1,
            type : "Inventor Weapon",
            damage : [1, 10, "bludgeoning"],
            range : "Melee",
            weight : 10,
            description : "+1d4 Thunder Dmg, Two-Handed, Heavy, Loud",
            abilitytodamage : true,
            artKineticHammer : true
        }
    },
    "charged blade" : {
        name : "Charged Blade",
        source : ["KT:I", 22],
        description : "This powerful but light melee weapon does d10 slashing damage plus an extra d4 lightning damage, requires attunement for proficiency, it can be augmented with Thundersmith upgrades, and has the Loud property.",
		descriptionLong : "This weapon requires attunement and you proficient with it while attuned. and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest." + "\n   " + "If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (eight hours each day) by expending 200 gold pieces worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or different type, and select the same or different upgrades." + "\n   " + "Loud: Your weapon rings with thunder that is audible within 300 feet of you whenever it makes an attack.",
		weight : 3,
        weaponAdd : "Charged Blade",
        weaponOptions : {
            regExpSearch : /^(?=.*charged)(?=.*blade).*$/i,
            name : "Charged Blade",
            source : ["KT:I", 22],
            ability : 1,
            type : "Inventor Weapon",
            damage : [1, 6, "slashing"],
            range : "Melee",
            weight : 3,
            description : "+1d4 Lightning Dmg, Finesse, Loud",
            abilitytodamage : true,
            artChargedBlade : true
        }
    },
    "lightning pike" : {
        name : "Lightning Pike",
        source : ["KT:I", 22],
        description : "This long and powerful melee weapon does d8 piercing damage plus an extra d4 lightning damage, requires attunement for proficiency, it can be augmented with Thundersmith upgrades, and has the Loud property.",
		descriptionLong : "This weapon requires attunement and you proficient with it while attuned. and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest." + "\n   " + "If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (eight hours each day) by expending 200 gold pieces worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or different type, and select the same or different upgrades." + "\n   " + "Loud: Your weapon rings with thunder that is audible within 300 feet of you whenever it makes an attack.",
		weight : 10,
        weaponAdd : "Lightning Pike",
        weaponOptions : {
            regExpSearch : /^(?=.*lightning)(?=.*pike).*$/i,
            name : "Lightning Pike",
            source : ["KT:I", 22],
            ability : 1,
            type : "Inventor Weapon",
            damage : [1, 8, "piercing"],
            range : "Melee",
            weight : 10,
            description : "+1d4 Lightning Dmg, Reach, Two-Handed, Loud",
            abilitytodamage : true,
            artLightningPike : true
        }
    }
};

AmmoList["storm rounds"] = {
    name : "Storm Rounds",
    source : ["KT:I", 5],
    weight : 0.2, // based on the weight of renaissance bullets from the DMG
    icon : "Bullets",
    checks : [".Bullet"],
    display : 50,
    invName : "Storm Rounds",
    alternatives : [/^((?=.*storm)|(?=.*rounds?)).*$/i]
};
//#region
//*****************************************************\\
//*                   -Gadgetsmith-                   *\\
//*****************************************************\\

// MagicItemsList["gadgetsmith's gadgets"] = {
//     name : "Gadgetsmith's Gadgets",
//     source : ["KT:I", 5],
//     type : "wondrous item",
//     rarity : "artifact",
//     extraTooltip : "Attunement (creator only)",
//     attunement : true,
//     prerequisite : "Only for a Gadgetsmith Inventor",
//     prereqeval : function(v) {
//         return classes.known["inventor"].subclass == "inventor-gadgetsmith";
//     },
//     allowDuplicates : true,
//     description : "A bunch of gadgets and tools that you have that have all kinds of functions. I can get get new gadgets and tools from my Specialization Upgrade feature. (This is just a item I added to hold the spells from the upgrades)",
//     descriptionFull : "A bunch of gadgets and tools that you have that have all kinds of functions. I can get get new gadgets and tools from my Specialization Upgrade feature. (This is just a item I added to hold the spells from the upgrades)",
//     spellcastingBonus : [],
//     spellFirstColTitle : "Rs",
//     spellChanges : {}
// };

// WeaponsList["boomerang of hitting"] = {
//     regExpSearch : /^(?=.*boomerang)(?=.*hitting).*$/i,
//     name : "Boomerang of Hitting",
//     source : ["KT:I", 8],
//     list : "inventor",
//     ability : 2,
//     type : "Inventor Weapon",
//     damage : [1, 4, "bludgeoning"],
//     range : "Melee, 30/90 ft",
//     description : "Finesse; Thrown, Returns; Special",
//     abilitytodamage : true,
//     artBoomerang : true
// };
// WeaponsList["impact gauntlet"] = {
//     regExpSearch : /^(?=.*impact)(?=.*gauntlet).*$/i,
//     name : "Impact Gauntlet",
//     source : ["KT:I", 9],
//     list : "inventor",
//     ability : 2,
//     type : "Inventor Weapon",
//     damage : [1, 8, "bludgeoning"],
//     range : "Melee",
//     description : "Finesse, Light, Special",
//     abilitytodamage : true,
//     artGauntlet : true
// };
// WeaponsList["repeating hand crossbow"] = {
//     regExpSearch : /^(?=.*repeating)(?=.*crossbow).*$/i,
//     name : "Repeating Hand Crossbow",
//     source : ["KT:I", 9],
//     list : "inventor",
//     ability : 2,
//     type : "Inventor Weapon",
//     damage : [1, 6, "piercing"],
//     range : "30/120 ft",
//     description : "Ammunition, Light, Special, Auto-loading",
//     abilitytodamage : true,
//     ammo : "Bolts",
//     artRepeatCrossbow : true
// };
// WeaponsList["lightning baton"] = {
//     regExpSearch : /^(?=.*lightning)(?=.*baton).*$/i,
//     name : "Lightning Baton",
//     source : ["KT:I", 9],
//     list : "inventor",
//     ability : 2,
//     type : "Inventor Weapon",
//     damage : ["1d4/1d4", "", "bludgeoning"],
//     range : "30/120 ft",
//     description : "Finesse, Light, 1d4 is lightning, Con save vs. spell save DC on crit; fail - is stunned until my next turn",
//     abilitytodamage : true,
//     artBaton : true
// };

//*****************************************************\\
//*                    -Golemsmith-                   *\\
//*****************************************************\\

//*****************************************************\\
//*                  -Infusionsmith-                  *\\
//*****************************************************\\

//*****************************************************\\
//*                   -Potionsmith-                   *\\
//*****************************************************\\



//Did this as a feat to separate the reactions from normal spells
// FeatsList["instant reactions"] = {
//     name : "Instant Reactions",
// 	source : ["KT:I", 16],
// 	prerequisite : "Being a Potionsmith",
// 	prereqeval : "classes.known['inventor'].subclass == 'inventor-potionsmith'",
// 	description : "I know how to get instant reactions to occur without the niceties for more refined concoctions. I know the instant reactions Alchemical Fire, Poisonous Gas, and Healing Draught now. I can learn additional reactions through my upgrades",
// 	spellcastingBonus : [{
// 		name : "Starting Instant Reactions",
// 		spellcastingAbility : 4,
// 		spells : ["alchemical fire", "poisonous gas", "healing draught"],
// 		selection : ["alchemical fire", "poisonous gas", "healing draught"],
//         firstCol : "St",
//         times : 3
// 	}, {
//         name : "Upgrade Instant Reactions",
// 		spells : ["alchemical acid", "explosive reaction", "fortifying fumes reaction", "frostbloom reaction"],
// 		selection : ["alchemical acid", "explosive reaction", "fortifying fumes reaction", "frostbloom reaction"],
//         firstCol : "Up",
//         times : 4
//     }]
// };

// //Add Instant Reactions
// SpellsList["alchemical fire"] = {
//     name : "Alchemical Fire",
// 	classes : [],
// 	source : ["KT:I", 16],
//     level : 0,
//     school : "Trans",
// 	time : "1 a",
//     range : "15 ft",
// 	components : "S,M",
// 	duration : "Instantaneous",
// 	save : "Dex",
// 	description : "5-ft rad all save or 1d8 Fire dmg; +1d8 at CL 5/11/17",
// 	descriptionFull : "As an action you can produce a reaction causing a searing flame. At a point within 15 feet, you can a toss quick combination of reagents that will cause searing fire to flare up in a 5 foot radius. Creatures in that area have to make a dexterity saving throw, or take 1d8 fire damage." + "\n   " + "The damage damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
// };
// SpellsList["poisonous gas"] = {
//     name : "Poisonous Gas",
//     classes : [],
//     source : ["KT:I", 16],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     save : "Con",
//     description : "5-ft rad all save or 1d4 Poison dmg and poisoned until end of next turn; +1d4 at CL 5/11/17",
//     descriptionFull : "As an action you can produce a reaction causing noxious fumes. At a point within 15 feet, you can toss a quick combination of reagents that will cause a whiff of poisonous gas to erupt spreading to a radius of 5 feet. Creatures in that area have to make a constitution saving throw, or take 1d4 poison damage and become poisoned until the end of their next turn." + "\n   " + "The damage damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
// };
// SpellsList["healing draught"] = {
//     name : "Healing Draught",
//     classes : [],
//     source : ["KT:I", 17],
//     level : 0,
//     school : "Trans",
//     time : "1 bns",
//     range : "Touch",
//     components : "S,M",
//     duration : "Instantaneous",
//     description : "Crate draught; 1 a administer; Heals 1d8 hp; Only works per Con mod per LR; +1d8 at CL 5/11/17",
//     descriptionFull : "As a bonus action, you can produce a combination that will provide potent magical healing. Immediately after creating the draught, you can use your action to consume it or administer it to a creature within 5 feet. A creature who drinks this draught regains 1d8 health. A creature can benefit from a number of these healing draughts equal to their constitution modifier (minimum 1), after which they provide no additional benefit until they complete a long rest. A Healing Draught that is not consumed by the end of your turn loses its potency." + "\n   " + "The healing increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
// };
// SpellsList["alchemical acid"] = {
//     name : "Alchemical Acid",
//     classes : [],
//     source : ["KT:I", 17],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     save : "Dex",
//     description : "5-ft rad all save or 2d4 Acid dmg; Double dmg to obj; +2d4 at CL 5/11/17",
//     descriptionFull : "As an action you can produce a reaction causing a caustic acid to form. At a creature within 15 feet, you can a toss quick combination of reagents that will cause a splatter of acid in a 5 foot radius. Creatures in that area have to make a dexterity saving throw, or take 2d4 acid damage. Deals double damage against structures." + "\n   " + "The damage damage increases by 2d4 when you reach 5th level (4d4), 11th level (6d4), and 17th level (8d4)."
// };
// SpellsList["explosive reaction"] = {
//     name : "Explosive Reaction",
//     classes : [],
//     source : ["KT:I", 18],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     save : "Con",
//     description : "10-ft rad all save or 1d10 Thunder dmg; +1d10 at CL 5/11/17",
//     descriptionFull : "Targeting a point within 15 feet, as an action, you cause an explosion. Creatures within 10 feet of the target point must make a constitution saving throw, or take 1d10 thunder damage from the shockwave of the explosion." + "\n   " + "The damage damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
// };
// SpellsList["fortifying fumes reaction"] = {
//     name : "Fortifying Fumes Reaction",
//     classes : [],
//     source : ["KT:I", 18],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     description : "10-ft rad all 1d4 temp hp, next atk does +1d4, and adv. on next Con save; +1d4 at CL 5/11/17",
//     descriptionFull : "Targeting a point within 15 feet, as an action, you cause fumes to erupt. Creatures within 10 feet of the target point can choose to hold their breath and not inhale, but creatures that inhale the fumes gain 1d4 temporary hit points, deal 1d4 additional damage on their next melee weapon attack, and have advantage on their next Constitution saving throw. Any remaining benefits fade at the end of your next turn." + "\n   " + "Both the temporary hit points and damage bonus increase by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4)"
// };
// SpellsList["frostbloom reaction"] = {
//     name : "Frostbloom Reaction",
//     classes : [],
//     source : ["KT:I", 18],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     save : "Dex",
//     description : "5-ft rad all save or 1d6 Cold dmg and restrained; dif. ter. end of next turn; +1d6 at CL 5/11/17",
//     descriptionFull : "Targeting a point within 15 feet, as an action, you cause an the area to erupt in frost. The area within 5 feet of the target point becomes difficult terrain until the end of your next turn, and any creature in the area must make a dexterity saving throw, or be caught by the ice taking 1d6 cold damage; a creature entirely in the area of effect that fails also becoming restrained until the end of their next turn. They can use their action to make a Strength saving throw to break free of the ice early." + "\n   " + "The damage damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
// };

// //Add Weapons for Instant Reactions
// WeaponsList["alchemical fire"] = {
// 	regExpSearch : /^(?=.*alchemical)(?=.*fire).*$/i,
// 	name : "Alchemical Fire",
// 	source : ["KT:I", 16],
// 	list : "instant reactions",
// 	ability : 2,
// 	type : "Cantrip",
// 	damage : ["C", 8, "fire"],
// 	range : "15 ft",
// 	description : "5-ft rad; Dex save, success - no damage;",
// 	abilitytodamage : false,
//     dc : true
// };
// WeaponsList["poisonous gas"] = {
// 	regExpSearch : /^(?=.*poisonous)(?=.*gas).*$/i,
// 	name : "Poisonous Gas",
// 	source : ["KT:I", 16],
// 	list : "instant reactions",
// 	ability : 3,
// 	type : "Cantrip",
// 	damage : ["C", 4, "poison"],
// 	range : "15 ft",
// 	description : "5-ft rad; Con save, success - no damage, fail - also poisoned till end of their next turn;",
// 	abilitytodamage : false,
// 	dc : true
// };
// WeaponsList["alchemical acid"] = {
// 	regExpSearch : /^(?=.*alchemical)(?=.*acid).*$/i,
// 	name : "Alchemical Acid",
// 	source : ["KT:I", 17],
// 	list : "instant reactions",
// 	ability : 2,
// 	type : "Cantrip",
// 	damage : ["=C+C", 4, "acid"],
// 	range : "15 ft",
// 	description : "5-ft rad; Dex save, success - no damage; double dmg to structures;",
// 	abilitytodamage : false,
// 	dc : true
// };
// WeaponsList["explosive reaction"] = {
// 	regExpSearch : /^(?=.*explosive)(?=.*reaction).*$/i,
// 	name : "Explosive Reaction",
// 	source : ["KT:I", 18],
// 	list : "instant reactions",
// 	ability : 3,
// 	type : "Cantrip",
// 	damage : ["C", 10, "thunder"],
// 	range : "15 ft",
// 	description : "10-ft rad; Con save, success - no damage;",
// 	abilitytodamage : false,
// 	dc : true
// };
// WeaponsList["fortifying fumes reaction"] = {
// 	regExpSearch : /^(?=.*fortifying)(?=.*fumes)(?=.*reaction).*$/i,
// 	name : "Fortifying Fumes Reaction",
// 	source : ["KT:I", 18],
// 	list : "instant reactions",
// 	ability : 3,
// 	type : "Cantrip",
// 	damage : ["Cd4/Cd4", "", "Same"],
// 	range : "15 ft",
// 	description : "10-ft rad all; First is temp Hp added; second is dmg added to next wea atk; adv. on next Con save",
// 	abilitytodamage : false
// };
// WeaponsList["frostbloom reaction"] = {
// 	regExpSearch : /^(?=.*frostbloom)(?=.*reaction).*$/i,
// 	name : "Frostbloom Reaction",
// 	source : ["KT:I", 18],
// 	list : "instant reactions",
// 	ability : 2,
// 	type : "Cantrip",
// 	damage : ["C", 6, "cold"],
// 	range : "15 ft",
// 	description : "5-ft rad; Dex save, success - no damage. fail - also restrained; area becomes difficult terrain",
// 	abilitytodamage : false,
// 	dc : true
// };
//#endregion
//*****************************************************\\
//*                     -Warsmith-                    *\\
//*****************************************************\\

MagicItemsList["warplate gauntlet"] = {
    name : "Warplate Gauntlet",
    source : ["KT:I", 26],
    type : "wondrous item",
    description : "As an action while wearing this gauntlet, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int. I can stop this at any time and it automatically stops when I take off the gauntlet. It can also be augmented by my warsmith upgrades.",
    attunement : true,
    action : [["action", "Artificial Strength"]],
    prerequisite : "A warsmith's armor already includes a warplate gauntlet and you can't be attuned to both at the same time",
    prereqeval : function(v) { return CurrentMagicItems.known.indexOf("warsmith's armor") == -1; },
}
MagicItemsList["warsmith's armor"] = {
    name : "Warsmith's Armor",
    source : ["KT:I", 28],
    type : "armor",
    description : "This armor adds 2 to my Str (up to 22), makes me count as one size greater for the weight I can carry, can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int.",
    attunement : true,
    prerequisite : "A warsmith's armor already includes a warplate gauntlet and you can't be attuned to both at the same time",
    prereqeval : function(v) { return CurrentMagicItems.known.indexOf("warplate gauntlet") == -1; },
    action : [["action", "Artificial Strength"]],
    scores : [2, 0, 0, 0, 0, 0],
    scoresMaximum : [22, 0, 0, 0, 0, 0],
    choices : ["Warplate (heavy)", "Warsuit (medium)", "Integrated Armor (medium)", "Warskin (light)"],
    "warplate (heavy)" : {
        name : "Warsmith's Warplate",
        description : "This armor adds 2 to my Str (up to 22), makes me count as one size greater for the weight I can carry, can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int.",
        descriptionLong : "This heavy armor includes a warplate gauntlet and gives me an AC of 18, regardless of Dexterity. It gives my disadvantage on my Stealth checks and increases my Strength score with 2, up to a maximum of 22. Also, it increases my size from Small to Medium and makes me count as one size category higher for determining the weight I can lift or carry (count as Large for a Small race). As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and stops when I take it off.",
        weight : 75,
        carryingCapacity : 2,
        armorAdd : "Warplate",
        armorOptions : [{
            regExpSearch : /warplate/i,
            name : "Warplate",
            source : ["KT:I", 28],
            type : "heavy",
            ac : 18,
            weight : 75,
            isWarsmithArmour : true
        }]
    },
    "warsuit (medium)" : {
        name : "Warsmith's Warsuit",
        description : "This armor adds 2 to my Str, up to 22. It can be augmented by my warsmith upgrades and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int. I can stop this at any time and it stops when I take it off.",
        descriptionLong : "This medium armor includes a warplate gauntlet and gives me an AC of 14 + my Dexterity modifier (max 2) and increases my Strength score with 2, up to a maximum of 22. As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and it stops automatically when I take the gauntlet off.",
        weight : 45,
        armorAdd : "Warsuit",
        armorOptions : [{
            regExpSearch : /warsuit/i,
            name : "Warsuit",
            source : ["KT:I", 28],
            type : "medium",
            ac : 14,
            weight : 45,
            isWarsmithArmour : true
        }],
        eval : function () {
            if (CurrentRace.size < 4) MagicItemsList["warsmith's armor"]["warsuit (medium)"].carryingCapacity = 2;
        },
        removeeval : function () {
            if (CurrentRace.size < 4) MagicItemsList["warsmith's armor"]["warsuit (medium)"].carryingCapacity = 2;
        }
    },
    "warskin (light)" : {
        name : "Warsmith's Warskin",
        description : "This armor adds 2 to my Str (up to 22), It can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int.",
        descriptionLong : "This light armor includes a warplate gauntlet and gives me an AC of 14 + my Dexterity modifier (max 2) and increases my Strength score with 2, up to a maximum of 22. Also, it makes me count as one size category higher for determining the weight I can lift or carry. As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and it stops automatically when I take the gauntlet off.",
        weight : 13,
        armorAdd : "Integrated",
        armorOptions : [{
            regExpSearch : /warskin/i,
            name : "Integrated",
            source : ["KT:I", 28],
            type : "light",
            ac : 12,
            weight : 13,
            isWarsmithArmour : true
        }]
    },
    "integrated armor (medium)" : {
        name : "Warsmith's Integrated Armor",
        description : "This armor adds 2 to my Str (up to 22), makes me count as one size greater for the weight I can carry, can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int.",
        descriptionLong : "This medium armor includes a warplate gauntlet and gives me an AC of 14 + my Dexterity modifier (max 2) and increases my Strength score with 2, up to a maximum of 22. Also, it makes me count as one size category higher for determining the weight I can lift or carry. As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and it stops automatically when I take the gauntlet off.",
        weight : 30,
        armorAdd : "Integrated",
        armorOptions : [{
            regExpSearch : /integrated/i,
            name : "Integrated",
            source : ["KT:I", 28],
            type : "medium",
            ac : 14,
            weight : 30,
            isWarsmithArmour : true
        }]
    }
}