goog.provide("Decresendo.Score.MXL");
goog.require("Decresendo.Score");


var modScoreMXL = function() {

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

MXL.getTagName = function(node) {
	if (node && node.node) {
		return node.node.tagName;
	} else {
		return "";
	}
};

MXL.getAttribute = function(node, key, defaultValue) {
	var value = node.node.getAttribute(key);
	if (!value) value = defaultValue;
	return value;
};

MXL.getText = function(e) {
	return e.innerText || e.textContent;
};


// part-wise helper
MXL.Partwise = {};

MXL.Partwise.getTitle = function(partwise) {
	var title = "";
	partwise.forChildElementWithTag("movement-title", function(e) {
		title = e.innerText || e.textContent;
		return true;
	});
	return title;
};

MXL.Partwise.getPartList = function(partwise) {
	var partList = null;
	partwise.forChildElementWithTag("part-list", function(e) {
		partList = new Decresendo.Score.PartList(e);
		return true;
	});
	return partList;
};

MXL.Partwise.getParts = function(partwise) {
	var parts = [];
	partwise.forChildElementWithTag("part", function(e) {
		parts.push(new Decresendo.Score.Part(e));
	});
	return parts;
};


// part-list helper
MXL.PartList = {};

MXL.PartList.getPartList = function(partList) {
	var list = [];
	partList.forChildElementWithTag("score-part", function(e) {
		var partId = e.getAttribute("id");
		var partName = "";
		var partNode = new Decresendo.Score.Node(e);
		partNode.forChildElementWithTag("part-name", function(ee) {
			partName = MXL.getText(ee);
			return true;
		});
		list.push(new Decresendo.Score.PartInfo(partId, partName));
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
	part.forChildElementWithTag("measure", function(e) {
		measures.push(new Decresendo.Score.Measure(e));
	});
	return measures;
};


// measure helper
MXL.Measure = {};

MXL.Measure.getNumber = function(measure) {
	return MXL.getAttribute(measure, "number");
};

MXL.Measure.getMusicDatas = function(measure) {
	var musicDatas = [];
	measure.forEachChildElement(function(e) {
		musicDatas.push(Decresendo.Score.MusicData.createMusicData(e));
	});
	return musicDatas;
};


// attributes helper
MXL.Attributes = {};

MXL.Attributes.getDivisions = function(attributes) {
	var divisions = 1;
	attributes.forChildElementWithTag("divisions", function(e) {
		divisions = MXL.getText(e);
		return true;
	});
	return divisions;
};

MXL.Attributes.getKeys = function(attributes) {
	var keys = [];
	attributes.forChildElementWithTag("key", function(e) {
		console.log("found key");
		keys.push(new Decresendo.Score.Key(e));
	});
	return keys;
};

MXL.Attributes.getKeyCancel = function(key) {
	var cancel = undefined;
	key.forChildElementWithTag("cancel", function(e) {
		cancel = MXL.getText(e);
		return true;
	});
	return cancel;
};

MXL.Attributes.getKeyFifths = function(key) {
	var fifths = undefined;
	key.forChildElementWithTag("fifths", function(e) {
		fifths = MXL.getText(e);
		return true;
	});
	return fifths;
};

MXL.Attributes.getKeyMode = function(key) {
	var mode = undefined;
	key.forChildElementWithTag("mode", function(e) {
		mode = MXL.getText(e);
		return true;
	});
	return mode;
};

Decresendo.Score.MXL = MXL;

}();
