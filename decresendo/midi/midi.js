goog.provide('Decresendo.MIDI');
goog.require('Decresendo');


var modMIDI = function() {

var MIDI = function(input, output) {
	if (!input || !output) {
		return undefined;
	}
	this.input = input;
	this.output = output;
	if (this.input.midi) {
		this.input.midi.push(this);
	} else {
		this.input.midi = [this];
	}
	this.eventHandlers = [];
	this.noteOnHandlers = [];
	this.noteOffHandlers = [];
};

MIDI.prototype.addEventHandler = function(handler) {
	this.eventHandlers.push(handler);
};

MIDI.prototype.addNoteOnHandler = function(handler) {
	this.noteOnHandlers.push(handler);
};

MIDI.prototype.addNoteOffHandler = function(handler) {
	this.noteOffHandlers.push(handler);
};

MIDI.prototype.onMIDIEvent = function(event) {
	var i = 0;
	for (i = 0; i < this.eventHandlers.length; ++i) {
		this.eventHandlers[i](this, event);
	}
};

MIDI.prototype.onNoteOnEvent = function(note, velocity) {
	var i = 0;
	for (i = 0; i < this.noteOnHandlers.length; ++i) {
		this.noteOnHandlers[i](note, velocity);
	}
};

MIDI.prototype.onNoteOffEvent = function(note) {
	var i = 0;
	for (i = 0; i < this.noteOffHandlers.length; ++i) {
		this.noteOffHandlers[i](note);
	}
};

MIDI.Init = function(onSuccess, onError) {
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
					MIDI.access = access;
					MIDI.initInput();
					if (onSuccess) onSuccess();
				}
			},
			function() {
				if (onError) onError('The MIDI system failed to start');
			});
	} else {
		if (onError) onError('Browser does not support MIDI');
	}
};

MIDI.initInput = function() {
	var i = 0;
	for (i = 0; i < this.access.inputs().length; ++i) {
		var input = this.access.inputs()[i];
		input.midi = [];
		input.onmidimessage = function(event) {
			var i = 0;
			var j = 0;
			for (i = 0; i < this.midi.length; ++i) {
				this.midi[i].onMIDIEvent(event);
			}
			if (event.data[1]) {
				var note = event.data[1];
				var velocity = event.data[2];
				if (velocity > 0) {
					for (i = 0; i < this.midi.length; ++i) {
						this.midi[i].onNoteOnEvent(note, velocity);
					}
				} else {
					for (i = 0; i < this.midi.length; ++i) {
						this.midi[i].onNoteOffEvent(note);
					}
				}
			}
			if (event.data[1]) console.log(event.data[1], event.data[2]);
		};
	}
};

MIDI.setMIDIEventHandler = function(input, handler) {
	input.onmidimessage = handler;
};

MIDI.getInput = function(id) {
	if (this.access && this.access.inputs().length > 0) {
		if (!id) id = 0;
		return this.access.inputs()[id];
	} else {
		return null;
	}
};

MIDI.getOutput = function(id) {
	if (this.access && this.access.outputs().length > 0) {
		if (!id) id = 0;
		return this.access.outputs()[id];
	} else {
		return null;
	}
};


Decresendo.MIDI = MIDI;

}();
