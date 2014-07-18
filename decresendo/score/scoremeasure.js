goog.provide("Decresendo.Score.Measure");
goog.require("Decresendo.Score");
goog.require("Decresendo.Score.MusicData");
goog.require("Decresendo.Score.MXL");


var modScoreMeasure = function() {

var MXL = Decresendo.Score.MXL;

var Measure = function(data) {
	var supperclass = Measure.supperclass;
	supperclass.constructor.call(this, data);

	this.number = MXL.Measure.getNumber(this);
	this.musicData = MXL.Measure.getMusicDatas(this);
};


Decresendo.Score.Measure = Measure;
Decresendo.inherited(
	Decresendo.Score.Measure,
	Decresendo.Score.Node);

}();
