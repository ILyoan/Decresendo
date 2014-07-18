goog.provide("Decresendo.Score.MusicData");
goog.require("Decresendo.Score");
goog.require("Decresendo.Score.Attributes");
goog.require("Decresendo.Score.MXL");


var modScoreMusicData = function() {

var MXL = Decresendo.Score.MXL;

var MusicData = function(data) {
	var supperclass = MusicData.supperclass;
	supperclass.constructor.call(this, data);

	this.type = getType(MXL.getTagName(this));
};

MusicData.createMusicData = function(data) {
	var type = getType(data.tagName);
	switch (type) {
		case MusicData.TAG.attributes: return new Decresendo.Score.Attributes(data);
	}
};

MusicData.TAG = {
	note: 1,
	backup: 2,
	forward: 3,
	direction: 4,
	attirubtes: 5,
	harmony: 6,
	"figured-bass": 7,
	print: 8,
	sound: 9,
	barline: 10,
	grouping: 11,
	line: 12,
	bookmark: 13,
};

var getType = function(tagName) {
	return MusicData.TAG[tagName];
};

MusicData.prototype.isNote = function() {
	return this.type == MusicData.note;
};

MusicData.prototype.isAttribute = function() {
	return this.type == MusicData.attribute;
};


Decresendo.Score.MusicData = MusicData;
Decresendo.inherited(
	Decresendo.Score.MusicData,
	Decresendo.Score.Node);

}();
