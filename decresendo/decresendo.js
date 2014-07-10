goog.provide("Decresendo");
goog.require("Decresendo.Score");
goog.require("Decresendo.Score.Loader");
goog.require("Decresendo.Score.Node");
goog.require("Decresendo.Score.Score");
goog.require("Decresendo.MIDI");
goog.require("Decresendo.Render");
goog.require("Decresendo.Render.Piano");

Decresendo = Decresendo || {};


Decresendo.inherited = function(child_ctor, parent_ctor) {
	child_ctor.supperclass = parent_ctor.prototype;
	child_ctor.prototype = new parent_ctor();
	child_ctor.prototype.constructor = child_ctor;
};
