goog.provide('Decresendo.Render.Piano');
goog.require('Decresendo');
goog.require('Decresendo.Render');

var WW = 20;
var WH = 100;
var BW = 12;
var BH = 60;

var BOX_MARGIN = {
	top: 15,
	bottom: 10,
	left: 10,
	right: 10,
};

var Piano = function(context, octaves) {
	this.context = context;
	this.octaves = octaves;
	this.keys = [];
	var i = 0;
	for (i = 0; i < this.octaves * 12 + 1; ++i) this.keys[i] = new Key(i);
	this.keyWidth = (this.octaves * 7 + 1) * WW;
	this.keyHeight = WH;
	this.width = this.keyWidth + BOX_MARGIN.left + BOX_MARGIN.right;
	this.height = this.keyHeight + BOX_MARGIN.top + BOX_MARGIN.bottom;
};

var Key = function(id) {
	this.note = id + 1;
	this.octave = Math.floor(id / 12);
	this.inoctave = id % 12;
	this.isWhite = isWhite(this.inoctave);
	this.width = this.isWhite ? WW : BW;
	this.height = this.isWhite ? WH : BH;
	this.offset = getOffset(this.octave, this.inoctave);
	this.pushed = false;
};

var isWhite = function(inoctave) {
	switch (inoctave) {
		case 1:
		case 3:
		case 6:
		case 8:
		case 10:
			return false;
	}
	return true;
};

var getOffset = function(octave, inoctave) {
	var base = octave * 7 * WW;
	switch (inoctave) {
		case 0: return base + 0 * WW;
		case 1: return base + 1 * WW - BW / 2;
		case 2: return base + 1 * WW;
		case 3: return base + 2 * WW - BW / 2;
		case 4: return base + 2 * WW;
		case 5: return base + 3 * WW;
		case 6: return base + 4 * WW - BW / 2;
		case 7: return base + 4 * WW;
		case 8: return base + 5 * WW - BW / 2;
		case 9: return base + 5 * WW;
		case 10: return base + 6 * WW - BW / 2;
		case 11: return base + 6 * WW;
	}
};


Piano.prototype.noteOn = function(note) {
	this.keys[note].pushed = true;
};

Piano.prototype.noteOff = function(note) {
	this.keys[note].pushed = false;
};

Piano.prototype.draw = function() {
	this.context.save();
	this.drawBox();
	this.drawKeys();
	this.context.restore();
};

Piano.prototype.drawBox = function() {
	var boxWidth = this.width;
	var boxHeight = this.height;
	var keyWidth = this.keyWidth;

	this.context.fillStyle = "#303030";
	this.context.fillRect(0, 0, boxWidth, boxHeight);

	this.context.fillStyle = "#E00000";
	this.context.fillRect(BOX_MARGIN.left, BOX_MARGIN.top - 3, keyWidth, 3);
};

Piano.prototype.drawKeys = function() {
	var i = 0;
	for (i = 0; i < this.keys.length; ++i) {
		if (this.keys[i].isWhite) {
			this.keys[i].draw(this.context, BOX_MARGIN.top, BOX_MARGIN.left);
		}
	}
	for (i = 0; i < this.keys.length; ++i) {
		if (!this.keys[i].isWhite) {
			this.keys[i].draw(this.context, BOX_MARGIN.top, BOX_MARGIN.left);
		}
	}
};

Key.prototype.draw = function(context, topOffset, leftOffset) {
	if (this.isWhite) {
		context.fillStyle = "#FFFFFF";
	} else {
		context.fillStyle = "#000000";
	}
	context.fillRect(leftOffset + this.offset, topOffset, this.width, this.height);
	context.strokeRect(leftOffset + this.offset, topOffset, this.width, this.height);
};

Decresendo.Render.Piano = Piano;
