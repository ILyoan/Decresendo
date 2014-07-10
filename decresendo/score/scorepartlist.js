goog.provide("Decresendo.Score.PartList");
goog.provide("Decresendo.Score.PartInfo");
goog.require("Decresendo.Score");
goog.require("Decresendo.Score.Node");
goog.require("Decresendo.Score.MXL");

var PartInfo = function(id, name) {
	this.id = id;
	this.name = name;
};

var PartList = function(data) {
	var supperclass = PartList.supperclass;
	supperclass.constructor.call(this, data);

	this.partList = MXL.PartList.getPartList(this);
};


Decresendo.Score.PartInfo = PartInfo;
Decresendo.Score.PartList = PartList;

Decresendo.inherited(
	Decresendo.Score.PartList,
	Decresendo.Score.Node);
