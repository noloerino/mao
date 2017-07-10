
const _ = require('lodash');
const $ = require('jquery');

const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;

const SPADES = 'S';
const HEARTS = 'H';
const CLUBS = 'C';
const DIAMONDS = 'D';

const CARD_WIDTH = 40;
const CARD_HEIGHT = 1.45 * CARD_WIDTH;

const EDGE_DIST = 20;
const BTWN_SPACE = 5;

const CARDBACK_COLOR = 'red';

var getParentDiv = function() {
	return $("#player_hand");
};

const IMG_FOLDER = "res/cardImgs/";
var loadImage = function(card) {
	var n = card.number;
	var suit = card.suit;
	var str = IMG_FOLDER;
	if(n > 10 || n == 1) {
		switch(n) {
			case 1:
				str += "ace";
				break;
			case 11:
				str += "jack";
				break;
			case 12:
				str += "queen";
				break;
			case 13:
				str += "king";
				break;
			default:
				break;
		}
	}
	else
		str += n;
	str += "_of_";
	switch(suit) {
		case SPADES:
			str += "spades";
			break;
		case HEARTS:
			str += "hearts";
			break;
		case CLUBS:
			str += "clubs";
			break;
		case DIAMONDS:
			str += "diamonds";
			break;
	}
	if(n > 10) {
		str += 2;
	}
	str += ".png";
	getParentDiv().append("<img src=\""+ str + "\" alt=\"" + card.toString() + "\" style=\"width:" 
		+ CARD_WIDTH + "px;height:" + CARD_HEIGHT + "px;\">");
	return str;
};

var Card = function(suit, number) {
	this.suit = suit;
	this.number = royalToNumber(number);
	this.color = (suit == SPADES || suit == CLUBS) ? 'black' : 'red';
	this.imgSrc = loadImage(this);
};

Card.prototype.drawByCanvas = function(canvas, ctx, side, number, totalNumber, faceUp) {
	if(!faceUp)
		faceUp = true;
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var x0, y0;
	if(side == NORTH || side == SOUTH) {
		if(totalNumber % 2 == 0)
			x0 = centerX + BTWN_SPACE / 2;
		else
			x0 = centerX;
		x0 += (CARD_WIDTH + BTWN_SPACE) * (number - totalNumber / 2);
		if(side == NORTH)
			y0 = EDGE_DIST;
		else
			y0 = canvas.height - EDGE_DIST - CARD_HEIGHT;
	}
	else {
		// TODO cards should be flipped and stuff
		if(totalNumber % 2 == 0)
			y0 = centerY + BTWN_SPACE / 2;
		else
			y0 = centerY;
		y0 += (CARD_HEIGHT + BTWN_SPACE) * (number - totalNumber / 2);
		if(side == WEST)
			x0 = EDGE_DIST;
		else
			x0 = canvas.width - EDGE_DIST - CARD_WIDTH;
	}
	ctx.strokeStyle = 'black';
	ctx.strokeRect(x0, y0, CARD_WIDTH, CARD_HEIGHT);
	ctx.fillStyle = faceUp ? 'white' : CARDBACK_COLOR;
	ctx.fillRect(x0, y0, CARD_WIDTH, CARD_HEIGHT);
	ctx.fillStyle = this.color;
	ctx.fillText(this.toString(), x0 + CARD_WIDTH / 2 - ctx.measureText(this.toString()).width / 2, y0 + CARD_HEIGHT / 2);
};

Card.prototype.toString = function(fancy) {
	var str = numberToRoyal(this.number);
	if(fancy) {
		switch(this.suit) {
			case HEARTS:
				str += '\u2665'; //'♥';
				break;
			case SPADES:
				str += '\u2660'; //'♠';
				break;
			case CLUBS:
				str += '\u2663'; //'♣';
				break;
			case DIAMONDS:
				str += '\u2666'; //'♦';
				break;
		}
	}
	else
		str += this.suit;
	return str;
};

var numberToRoyal = function(n) {
	switch(n) {
		case 1:
			return 'A';
		case 11:
			return 'J';
		case 12:
			return 'Q';
		case 13:
			return 'K';
		default:
			return n;
	}
};

var royalToNumber = function(ch) {
	switch(ch) {
		case 'a':
		case 'A':
			return 1;
		case 'j':
		case 'J':
			return 11;
		case 'q':
		case 'Q':
			return 12;
		case 'k':
		case 'K':
			return 13;
		default:
			return ch;
	}
};

module.exports.Card = Card;