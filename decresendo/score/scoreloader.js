goog.provide('Decresendo.Score.Loader');
goog.require('Decresendo');
goog.require('Decresendo.Score');

var Loader = function(url, onSuccess, onError) {
	this.url = url;
	this.ext = (/.*\.mxl$/.test(this.url) ? 'mxl' : 'xml');
	this.onSuccess = onSuccess;
	this.onError = onError;
};


Loader.MIMETypes = {
	MIME_MXL: 'application/vnd.recordare.musicxml',
	MIME_XML: 'application/vnd.recordare.musicxml+xml'
};

Loader.prototype.getMIMEType = function() {
	if (this.ext === 'mxl') {
		return Decresendo.Score.Loader.MIMETypes.MIME_MXL;
	} else {
		return Decresendo.Score.Loader.MIMETypes.MIME_XML;
	}
};

Loader.prototype.load = function() {
	$.ajax({
		'url': this.url,
		'type': 'GET',
		'mimeType': this.getMIMEType(),
		'dataType': this.ext,
		'success': this.onSuccess,
		'error': this.onError,
	});
};


Decresendo.Score.Loader = Loader;
