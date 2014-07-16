goog.provide("Decresendo.Score.MXL");
goog.require("Decresendo.Score");


var MXL = {};


MXL.findPartwise = function(node) {
	var partwise = undefined;
	node.preorder(function(node) {
		if (node.tagName == "score-partwise") {
			partwise = node;
			return true;
		}
	});
	return partwise;
};

MXL.getAttribute = function(node, key, defaultValue) {
	var value = node.node.getAttribute(key);
	if (!value) value = defaultValue;
	return value;
};


// part-wise helper
MXL.Partwise = {};

MXL.Partwise.getTitle = function(partwise) {
	var title = "";
	partwise.forEachChildElement(function(e) {
		if (e.tagName == "movement-title") {
			title = e.innerText || e.textContent;
			return true;
		}
	});
	return title;
};

MXL.Partwise.getPartList = function(partwise) {
	var partList = null;
	partwise.forEachChildElement(function(e) {
		if (e.tagName == "part-list") {
			partList = new Decresendo.Score.PartList(e);
			return true;
		}
	});
	return partList;
};

MXL.Partwise.getParts = function(partwise) {
	var parts = [];
	partwise.forEachChildElement(function(e) {
		if (e.tagName == "part") {
			parts = new Decresendo.Score.Part(e);
		}
	});
	return parts;
};


// part-list helper
MXL.PartList = {};

MXL.PartList.getPartList = function(partList) {
	var list = [];
	partList.forEachChildElement(function(e) {
		if (e.tagName == "score-part") {
			var partId = e.getAttribute("id");
			var partName = "";
			var partNode = new Decresendo.Score.Node(e);
			partNode.forEachChildElement(function(ee) {
				if (ee.tagName == "part-name") {
					partName = ee.innerText || ee.textContent;
					return true;
				}
			});
			list.push(new Decresendo.Score.PartInfo(partId, partName));
		}
	});
	return list;

};


// part helper
MXL.Part = {};

MXL.Part.getId = function(part) {
	return MXL.getAttribute(part, "id");
};

MXL.Part.getMeasures = function(part) {
	var measures = [];
	part.forEachChildElement(function(e) {
		if (e.tagName == "measure") {
			measures.push(new Decresendo.Score.Measure(e));
		}
	});
	return measures;
};


// measure helper
MXL.Measure = {};

MXL.Measure.getNumber = function(measure) {
	return MXL.getAttribute(measure, "number");
};


Decresendo.MXL = MXL;
