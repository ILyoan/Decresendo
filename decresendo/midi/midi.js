goog.provide('Decresendo.MIDI');
goog.require('Decresendo');

Decresendo.MIDI = Decresendo.MIDI || {};

Decresendo.MIDI.Init = function(onSuccess, onError) {
	if (this.access) {
		if (onError) onError('Already initilized');
		return;
	}
	if (navigator.requestMIDIAccess) {
		navigator.requestMIDIAccess().then(
			function(access) {
				if (access.inputs().length == 0) {
					if (onError) onError('No MIDI device detected');
				} else {
					Decresendo.MIDI.access = access;
					if (onSuccess) onSuccess();
				}
			},
			function() {
				if (onError) onError('The MIDI system failed to start');
			});
	} else {
		if (onError) onError('Browser does not support MIDI');
	}
}

Decresendo.MIDI.setMIDIEventHandler = function(input, handler) {
	input.onmidimessage = handler;
}

Decresendo.MIDI.getInput = function(id) {
	if (this.access && this.access.inputs().length > 0) {
		if (!id) id = 0;
		return this.access.inputs()[id];
	} else {
		return null;
	}
}

Decresendo.MIDI.getOutput = function(id) {
	if (this.access && this.access.outputs().length > 0) {
		if (!id) id = 0;
		return this.access.outputs()[id];
	} else {
		return null;
	}
}
