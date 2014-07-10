goog.provide("Decresendo.Score.Score");
goog.require("Decresendo.Score");
goog.require("Decresendo.Score.Node");
goog.require("Decresendo.Score.PartList");
goog.require("Decresendo.Score.MXL");

var Score = function(data) {
	var supperclass = Score.supperclass;
	supperclass.constructor.call(this, data);

	var partwise = MXL.findPartwise(this);
	this.partwise = partwise ? partwise : undefined;
	this.node = this.partwise;
	this.title = MXL.Partwise.getTitle(this);
	this.partList = MXL.Partwise.getPartList(this);
};

Decresendo.Score.Score = Score;
Decresendo.inherited(
	Decresendo.Score.Score,
	Decresendo.Score.Node);

