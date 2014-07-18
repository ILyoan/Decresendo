goog.provide("Decresendo.Score.Attributes");
goog.require("Decresendo.Score");
goog.require("Decresendo.Score.MusicData");
goog.require("Decresendo.Score.MXL");


var modScoreAttribute = function() {

var MXL = Decresendo.Score.MXL;

var Attributes = function(data) {
	var supperclass = Attributes.supperclass;
	supperclass.constructor.call(this, data);

	this.divisions = MXL.Attributes.getDivisions(this);
	this.keys = MXL.Attributes.getKeys(this);
};

var Key = function(data) {
	var supperclass = Key.supperclass;
	supperclass.constructor.call(this, data);

	this.cancel = MXL.Attributes.getKeyCancel(this);
	this.fifths = MXL.Attributes.getKeyFifths(this);
	this.mode = MXL.Attributes.getKeyMode(this);
};


Decresendo.Score.Attributes = Attributes;
Decresendo.inherited(
	Decresendo.Score.Attributes,
	Decresendo.Score.MusicData);


Decresendo.Score.Key = Key;
Decresendo.inherited(
	Decresendo.Score.Key,
	Decresendo.Score.Node);

}();
