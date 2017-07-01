
const $ = require('jquery');
const _ = require('lodash');
const Card = require('./card.js').Card;

const SPADES = 'S';
const HEARTS = 'H';
const CLUBS = 'C';
const DIAMONDS = 'D';
// temporary placeholder
const FULL_DECK = _.flatten(_.range(1, 14).reduce(function(acc, x) {
	acc.push([SPADES, HEARTS, CLUBS, DIAMONDS].map((y) => new Card(y, x)));
	return acc;
}, []));

console.log(FULL_DECK);

var deck = FULL_DECK.slice();

var hands = [
	[],
	[],
	[],
	[]
]

function takeRandomCard(arr) {
	n = Math.random() * arr.length;
	return arr.splice(n, 1)[0];
}

function shuffle(deck, hand) {
	for(let i = 0; i < 6; i++) {
		hand.push(takeRandomCard(deck));
	}
}

for(let player of hands) {
	shuffle(deck, player);
}

console.log(deck);
console.log(hands);

var canvas = document.getElementById("board");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var ctx = canvas.getContext("2d");

var drawAll = function() {
	for(let i = 0; i < hands.length; i++) {
		var hand = hands[i];
		console.log("hand", hand);
		for(let j = 0; j < hand.length; j++) {
			var card = hand[j];
			console.log("card", card);
			card.draw(canvas, ctx, i, j, hand.length, true);
		}
	}
	ctx.beginPath();
	ctx.moveTo(0, canvas.height / 2);
	ctx.lineTo(canvas.width, canvas.height / 2);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.stroke();
	// handle = window.requestAnimationFrame(drawAll);
}

var handle = window.requestAnimationFrame(drawAll);
