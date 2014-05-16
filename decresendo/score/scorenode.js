goog.provide('Decresendo.Score.Node');
goog.require('Decresendo.Score');

Decresendo.Score.Node = function(src) {
	if (src && typeof src === 'string') {
		this.node = $($.parseXML(src)).children();
	} else if (src && $.isXMLDoc(node)) {
		this.node = $(src);
	}
};
