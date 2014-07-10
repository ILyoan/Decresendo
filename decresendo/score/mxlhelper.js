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
			list.push(new PartInfo(partId, partName));
		}
	});
	return list;

};

Decresendo.MXL = MXL;
