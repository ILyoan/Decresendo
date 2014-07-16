goog.provide("Decresendo.Score.Measure");
goog.require("Decresendo.Score");
goog.require("Decresendo.MXL");


var Measure = function(data) {
	var supperclass = Measure.supperclass;
	supperclass.constructor.call(this, data);

	this.number = MXL.Measure.getNumber(this);
};


Decresendo.Score.Measure = Measure;
Decresendo.inherited(
	Decresendo.Score.Measure,
	Decresendo.Score.Node);

