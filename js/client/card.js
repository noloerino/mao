
const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;

const SPADES = 'S';
const HEARTS = 'H';
const CLUBS = 'C';
const DIAMONDS = 'D';

const CARD_WIDTH = 40;
const CARD_HEIGHT = 60;

const EDGE_DIST = 20;
const BTWN_SPACE = 5;

const CARDBACK_COLOR = 'red';

const FANCY_SUITS = true;

var Card = function(suit, number) {
	this.suit = suit;
	switch(number) {
		case 'a':
		case 'A':
			this.number = 1;
			break;
		case 'j':
		case 'J':
			this.number = 11;
			break;
		case 'q':
		case 'Q':
			this.number = 12;
			break;
		case 'k':
		case 'K':
			this.number = 13;
			break;
		default:
			this.number = number;
	}
	this.color = (suit == SPADES || suit == CLUBS) ? 'black' : 'red';
}

Card.prototype.draw = function(canvas, ctx, side, number, totalNumber, faceUp) {
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

Card.prototype.toString = function() {
	var str = "";
	switch(this.number) {
		case 1:
			str += 'A';
			break;
		case 11:
			str += 'J';
			break;
		case 12:
			str += 'Q';
			break;
		case 13:
			str += 'K';
			break;
		default:
			str += this.number;
	}
	if(FANCY_SUITS) {
		switch(this.suit) {
			case HEARTS:
				str += '\u2665';//'♥';
				break;
			case SPADES:
				str += '\u2660';//'♠';
				break;
			case CLUBS:
				str += '\u2663'//'♣';
				break;
			case DIAMONDS:
				str += '\u2666'//'♦';
				break;
		}
	}
	else
		str += this.suit;
	return str;
}

module.exports.Card = Card;