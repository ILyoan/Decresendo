goog.provide("Decresendo.Score.Node");
goog.require("Decresendo");
goog.require("Decresendo.Score");


var Node = function(src) {
	if (src && typeof src === "string") {
		this.node = $.parseXML(src).children();
	} else {
		this.node = src;
	}
};

Node.prototype.forEachChildElement = function(callback) {
	if (this.node) {
		var i, len = this.node.children.length;
		for (i = 0; i < len; ++i) {
			var child = this.node.children[i];
			if (callback(child)) {
				return true;
			}
		}
	}
	return false;
};

Node.prototype.preorder = function(callback) {
	if (this.node) {
		if (callback(this.node)) return true;
		var that = this;
		var i, len = this.node.children.length;
		for (i = 0; i < len; ++i) {
			var child = this.node.children[i];
			if (that.preorder.call(
					new Decresendo.Score.Node(child),
					callback)) {
				return true;
			}
		}
	}
	return false;
};


Decresendo.Score.Node = Node;
