goog.provide('Decresendo.Score.Loader');
goog.require('Decresendo');
goog.require('Decresendo.Score');

Decresendo.Score.Loader = function(url, onSuccess, onError) {
	this.url = url;
	this.ext = (/.*\.mxl$/.test(this.url) ? 'mxl' : 'xml');
	this.onSuccess = onSuccess;
	this.onError = onError;
};

Decresendo.Score.Loader.MIMETypes = {
	MIME_MXL: 'application/vnd.recordare.musicxml',
	MIME_XML: 'application/vnd.recordare.musicxml+xml'
};

Decresendo.Score.Loader.prototype.getMIMEType = function() {
	if (this.ext === 'mxl') {
		return Decresendo.Score.Loader.MIMETypes.MIME_MXL;
	} else {
		return Decresendo.Score.Loader.MIMETypes.MIME_XML;
	}
};

Decresendo.Score.Loader.prototype.load = function() {
	console.log(this.url);
	$.ajax({
		'url': this.url,
		'type': 'GET',
		'mimeType': this.getMIMEType(),
		'dataType': this.ext,
		'success': this.onSuccess,
		'error': this.onError,
	});
};
