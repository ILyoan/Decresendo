goog.provide("Decresendo.Score.Part");
goog.require("Decresendo.Score");
goog.require("Decresendo.Score.Measure");
goog.require("Decresendo.Score.MXL");


var Part = function(data) {
	var supperclass = Part.supperclass;
	supperclass.constructor.call(this, data);

	this.id = MXL.Part.getId(this);
	this.measures = MXL.Part.getMeasures(this);
};


Decresendo.Score.Part = Part;
Decresendo.inherited(
	Decresendo.Score.Part,
	Decresendo.Score.Node);
