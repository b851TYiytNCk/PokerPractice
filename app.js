var hand = [
	{ "suit": "треф", "rank": "король" },
	{ "suit": "треф", "rank": "четверка" },
	{ "suit": "треф", "rank": "тройка" },
	{ "suit": "треф", "rank": "шестерка" },
	{ "suit": "треф", "rank": "семерка" }
],
handRanks = hand.map(function(card){
	return card.rank;
}),
values = [],
ranks = [{"name": "туз", "value": 14},
		{"name": "король", "value": 13},
		{"name": "дама", "value": 12},
		{"name": "валет", "value": 11},
		{"name": "десятка", "value": 10},
		{"name": "девятка", "value": 9},
		{"name": "восьмерка", "value": 9},
		{"name": "семерка", "value": 7},
		{"name": "шестерка", "value": 6},
		{"name": "пятерка", "value": 5},
		{"name": "четверка","value": 4},
		{"name": "тройка", "value": 3},
		{"name": "двойка", "value": 2}],
combocard,
firstpair,
firstpairText,
secondpair,
secondpairText,
largest,
largestText,
smallest,
smallestText,
bigInHouse,
smallInHouse,
pairs = [], house = [];


function comboPairSetQuad (array, string, n) {
	num = array.filter(item => item === string).length;
	if (num === n) {
		return true;
	}
	else {
		return false;
	}	
};

handRanks.forEach(function(card){
	ranks.forEach(function(rankbody){
		if (card === rankbody.name) {
			values.push(rankbody.value);
		}
	});
});

largest = Math.max(...values);
smallest = Math.min(...values);

var twoPairs = function() {
	
	for (var i=0; i <= 12; i++){
		var rank = largest - i;
		if(comboPairSetQuad(values, rank, 2)){
	 		if (pairs.length < 3 && pairs.indexOf(rank) == -1) {
	 			pairs.push(rank);
	 		}
		}
	}

	if (pairs.length > 1) {
		if(pairs[0] !== Math.max(...pairs)) {
			firstpair = Math.max(...pairs);
			secondpair = pairs[0];
		}
		else {
			firstpair = pairs[0];
			secondpair = pairs[1];
		}
		return true;
	}
	else {
		return false;
	}
}

var fullHouse = function () {
	
	for (var i=0; i <= 12; i++){
		var rank = 14 - i;
		if(comboPairSetQuad(values, rank, 3) || comboPairSetQuad(values, rank, 2)){
	 		if (house.length < 3 && house.indexOf(rank) == -1 && containsNCards(3)) {
	 			house.push(rank);
	 		}
		}
	}

	if (house.length > 1) {
		return true;
	}
	else {
		return false;
	}

	bigInHouse = Math.max(...house);
	smallInHouse = Math.min(...house);
}

var containsNCards = function (n) {
	
	var result = false;

	ranks.forEach(function(rank){
		if(comboPairSetQuad(handRanks, rank.name, n)) {
			result = true;
			combocard = rank.name;
		}	
	});

	return result;
};

var gotStraight = function() {
	if(!containsNCards(2)) {	
		
		if (largest - smallest == 4) {
			return true;
		}
		else {
			return false;
		}

	}
	else {
		return false;
	}
};

var gotLowerStraight = function() {
	if (!containsNCards(2) && comboPairSetQuad(handRanks, "двойка", 1) && comboPairSetQuad(handRanks, "тройка", 1)
	&& comboPairSetQuad(handRanks, "четверка", 1) && comboPairSetQuad(handRanks, "пятерка", 1) && largest == 14) {
		return true;
	}
	else {
		return false;
	}
}

var gotFlush = function() {
	var suits = [];
	hand.forEach(function(card){
		suits.push(card.suit);
	});

	function spades(element) {
		if (element == "пик") {
			return element;
		};
	};
	function clubs(element) {
		if (element == "треф") {
			return element;
		};
	};
	function hearts(element) {
		if (element == "червей") {
			return element;
		};
	};
	function diamonds(element) {
		if (element == "бубен") {
			return element;
		};
	};
	

	if (suits.every(spades) || suits.every(clubs) || suits.every(hearts) || suits.every(diamonds)) {
		return true;
	}
	else {
		return false;
	}
};

function swap(n, string) {
	if (largest === n) {
		largestText = string;
		bigInHouse = string;
	 	if (firstpair === n) {
			firstpairText = string;
		}
	}
	if (smallest === n) {
		smallestText = string;
		smallInHouse = string;
	}
	if (secondpair === n) {
		secondpairText = string;
	}
	// else if (firstpair === n) {
	// 	firstpairText = string;
	// }
	// else if (secondpair === n) {
	// 	secondpairText = string;
	// }

}

function checkYourCombo() {
	swap(2, "двойка");
	swap(3, "тройка");
	swap(4, "четверка");
	swap(5, "пятерка");
	swap(6, "шестерка");
	swap(7, "семерка");
	swap(8, "восьмерка");
	swap(9, "девятка");
	swap(10, "десятка");
	swap(11, "валет");
	swap(12, "дама");
	swap(13, "король");
	swap(14, "туз");
	
	if (gotFlush() && gotStraight() && comboPairSetQuad(handRanks, "туз", 1) && comboPairSetQuad(handRanks, "десятка", 1)) {  // ROYAL FLUSH
		return "Royal Flush of " + hand[0].suit;
	}
	else if (gotFlush() && gotStraight()) {  // STRAIGHT FLUSH
		return "Straight Flush with " + largestText;
	}
	else if (gotFlush() && gotLowerStraight()) {  // STRAIGHT FLUSH
		return "Straight Flush with пятерка";
	}
	else if (containsNCards(4)) {  // FOUR OF A KIND
		return "Four of a kind with " + combocard;
	}
	else if (fullHouse()) {  // FULL HOUSE
		return "Full House with " + bigInHouse + " and " + smallInHouse;
	}
	else if (gotFlush()){  // FLUSH
		return "Flush with " + largestText;
	}
	else if (gotStraight() || gotLowerStraight()) { // STRAIGHT
		if(gotLowerStraight()) {
			return "Straight with пятерка";
		}
		else {
			return "Straight with " + largestText;
		}
	}
	else if (containsNCards(3) && !containsNCards(4)) { // A SET
		return "Three of a kind with " + combocard;
	}
	else if (twoPairs()){ // TWO PAIRS
		return "Two pairs of " + firstpairText + " and " + secondpairText;
	}
	else if (containsNCards(2) && !containsNCards(3) && !containsNCards(4)) { // A PAIR
		return "A pair of " + combocard;
	}
	else {
		return "High hand with " + largestText;
	}
	
}
checkYourCombo();
