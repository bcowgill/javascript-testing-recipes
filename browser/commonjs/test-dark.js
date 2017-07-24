(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var backbone = require("backbone")

var Concert = backbone.Model.extend()

module.exports = Concert


},{"backbone":7}],2:[function(require,module,exports){
var handlebars = require("handlebars"),
    templates  = require("../templates/templates")

var ConcertView = function(selector, concert) {
  this._element = $(selector)
  this._concert = concert

  var self = this
  concert.on("change", function() { self.render() })

  this.render()
}

ConcertView.prototype.render = function() {
  var html = handlebars.templates.concert(this._concert.attributes)
  this._element.html(html)
}

module.exports = ConcertView


},{"../templates/templates":6,"handlebars":23}],3:[function(require,module,exports){
var JS         = require("jstest"),
    handlebars = require("handlebars"),
    templates  = require("../templates/templates")

JS.Test.describe("templates.concert()", function() { with(this) {
  before(function() { with(this) {
    this.concert = {
      artist:    "Boredoms",
      venueName: "The Forum",
      cityName:  "Kentish Town",
      country:   "UK"
    }
    this.html = $(handlebars.templates.concert(concert))
  }})

  it("renders the artist name", function() { with(this) {
    assertEqual( "Boredoms", html.find(".artist").text() )
  }})

  it("renders the venue details", function() { with(this) {
    assertEqual( "The Forum, Kentish Town, UK", html.find(".venue").text() )
  }})
}})


},{"../templates/templates":6,"handlebars":23,"jstest":24}],4:[function(require,module,exports){
var JS      = require("jstest"),
    Concert = require("../lib/concert"),
    View    = require("../lib/concert_view")

JS.Test.describe("ConcertView", function() { with(this) {
  extend(HtmlFixture)
  fixture(' <div class="concert"></div> ')

  before(function() { with(this) {
    this.concert = new Concert({
      artist:    "Boredoms",
      venueName: "The Forum",
      cityName:  "Kentish Town",
      country:   "UK"
    })
    new View(".concert", concert)
  }})

  it("renders the artist name", function() { with(this) {
    assertEqual( "Boredoms", fixture.find(".artist").text() )
  }})

  it("updates the artist name if it changes", function() { with(this) {
    concert.set("artist", "Low")
    assertEqual( "Low", fixture.find(".artist").text() )
  }})
}})
  

},{"../lib/concert":1,"../lib/concert_view":2,"jstest":24}],5:[function(require,module,exports){
var JS = require("jstest")

require("./concert_template_spec")
require("./concert_view_spec")

JS.Test.autorun()


},{"./concert_template_spec":3,"./concert_view_spec":4,"jstest":24}],6:[function(require,module,exports){
var Handlebars = require("handlebars");  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['concert'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"concert\">\n  <h2 class=\"artist\">";
  if (helper = helpers.artist) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.artist); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n  <h3 class=\"venue\">";
  if (helper = helpers.venueName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.venueName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ", ";
  if (helper = helpers.cityName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cityName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ", ";
  if (helper = helpers.country) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.country); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n</div>\n\n";
  return buffer;
  });


},{"handlebars":23}],7:[function(require,module,exports){
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));

},{"underscore":25}],8:[function(require,module,exports){

},{}],9:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var Handlebars = require("./handlebars.runtime")["default"];

// Compiler imports
var AST = require("./handlebars/compiler/ast")["default"];
var Parser = require("./handlebars/compiler/base").parser;
var parse = require("./handlebars/compiler/base").parse;
var Compiler = require("./handlebars/compiler/compiler").Compiler;
var compile = require("./handlebars/compiler/compiler").compile;
var precompile = require("./handlebars/compiler/compiler").precompile;
var JavaScriptCompiler = require("./handlebars/compiler/javascript-compiler")["default"];

var _create = Handlebars.create;
var create = function() {
  var hb = _create();

  hb.compile = function(input, options) {
    return compile(input, options, hb);
  };
  hb.precompile = function (input, options) {
    return precompile(input, options, hb);
  };

  hb.AST = AST;
  hb.Compiler = Compiler;
  hb.JavaScriptCompiler = JavaScriptCompiler;
  hb.Parser = Parser;
  hb.parse = parse;

  return hb;
};

Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars.runtime":10,"./handlebars/compiler/ast":12,"./handlebars/compiler/base":13,"./handlebars/compiler/compiler":14,"./handlebars/compiler/javascript-compiler":15}],10:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars/base":11,"./handlebars/exception":19,"./handlebars/runtime":20,"./handlebars/safe-string":21,"./handlebars/utils":22}],11:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "1.3.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 4;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn, inverse) {
    if (toString.call(name) === objectType) {
      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      if (inverse) { fn.not = inverse; }
      this.helpers[name] = fn;
    }
  },

  registerPartial: function(name, str) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = str;
    }
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(arg) {
    if(arguments.length === 2) {
      return undefined;
    } else {
      throw new Exception("Missing helper: '" + arg + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse || function() {}, fn = options.fn;

    if (isFunction(context)) { context = context.call(this); }

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      return fn(context);
    }
  });

  instance.registerHelper('each', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) { 
              data.key = key; 
              data.index = i;
              data.first = (i === 0);
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    if (!Utils.isEmpty(context)) return options.fn(context);
  });

  instance.registerHelper('log', function(context, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, context);
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, obj) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};
exports.logger = logger;
function log(level, obj) { logger.log(level, obj); }

exports.log = log;var createFrame = function(object) {
  var obj = {};
  Utils.extend(obj, object);
  return obj;
};
exports.createFrame = createFrame;
},{"./exception":19,"./utils":22}],12:[function(require,module,exports){
"use strict";
var Exception = require("../exception")["default"];

function LocationInfo(locInfo){
  locInfo = locInfo || {};
  this.firstLine   = locInfo.first_line;
  this.firstColumn = locInfo.first_column;
  this.lastColumn  = locInfo.last_column;
  this.lastLine    = locInfo.last_line;
}

var AST = {
  ProgramNode: function(statements, inverseStrip, inverse, locInfo) {
    var inverseLocationInfo, firstInverseNode;
    if (arguments.length === 3) {
      locInfo = inverse;
      inverse = null;
    } else if (arguments.length === 2) {
      locInfo = inverseStrip;
      inverseStrip = null;
    }

    LocationInfo.call(this, locInfo);
    this.type = "program";
    this.statements = statements;
    this.strip = {};

    if(inverse) {
      firstInverseNode = inverse[0];
      if (firstInverseNode) {
        inverseLocationInfo = {
          first_line: firstInverseNode.firstLine,
          last_line: firstInverseNode.lastLine,
          last_column: firstInverseNode.lastColumn,
          first_column: firstInverseNode.firstColumn
        };
        this.inverse = new AST.ProgramNode(inverse, inverseStrip, inverseLocationInfo);
      } else {
        this.inverse = new AST.ProgramNode(inverse, inverseStrip);
      }
      this.strip.right = inverseStrip.left;
    } else if (inverseStrip) {
      this.strip.left = inverseStrip.right;
    }
  },

  MustacheNode: function(rawParams, hash, open, strip, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "mustache";
    this.strip = strip;

    // Open may be a string parsed from the parser or a passed boolean flag
    if (open != null && open.charAt) {
      // Must use charAt to support IE pre-10
      var escapeFlag = open.charAt(3) || open.charAt(2);
      this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
    } else {
      this.escaped = !!open;
    }

    if (rawParams instanceof AST.SexprNode) {
      this.sexpr = rawParams;
    } else {
      // Support old AST API
      this.sexpr = new AST.SexprNode(rawParams, hash);
    }

    this.sexpr.isRoot = true;

    // Support old AST API that stored this info in MustacheNode
    this.id = this.sexpr.id;
    this.params = this.sexpr.params;
    this.hash = this.sexpr.hash;
    this.eligibleHelper = this.sexpr.eligibleHelper;
    this.isHelper = this.sexpr.isHelper;
  },

  SexprNode: function(rawParams, hash, locInfo) {
    LocationInfo.call(this, locInfo);

    this.type = "sexpr";
    this.hash = hash;

    var id = this.id = rawParams[0];
    var params = this.params = rawParams.slice(1);

    // a mustache is an eligible helper if:
    // * its id is simple (a single part, not `this` or `..`)
    var eligibleHelper = this.eligibleHelper = id.isSimple;

    // a mustache is definitely a helper if:
    // * it is an eligible helper, and
    // * it has at least one parameter or hash segment
    this.isHelper = eligibleHelper && (params.length || hash);

    // if a mustache is an eligible helper but not a definite
    // helper, it is ambiguous, and will be resolved in a later
    // pass or at runtime.
  },

  PartialNode: function(partialName, context, strip, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type         = "partial";
    this.partialName  = partialName;
    this.context      = context;
    this.strip = strip;
  },

  BlockNode: function(mustache, program, inverse, close, locInfo) {
    LocationInfo.call(this, locInfo);

    if(mustache.sexpr.id.original !== close.path.original) {
      throw new Exception(mustache.sexpr.id.original + " doesn't match " + close.path.original, this);
    }

    this.type = 'block';
    this.mustache = mustache;
    this.program  = program;
    this.inverse  = inverse;

    this.strip = {
      left: mustache.strip.left,
      right: close.strip.right
    };

    (program || inverse).strip.left = mustache.strip.right;
    (inverse || program).strip.right = close.strip.left;

    if (inverse && !program) {
      this.isInverse = true;
    }
  },

  ContentNode: function(string, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "content";
    this.string = string;
  },

  HashNode: function(pairs, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "hash";
    this.pairs = pairs;
  },

  IdNode: function(parts, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "ID";

    var original = "",
        dig = [],
        depth = 0;

    for(var i=0,l=parts.length; i<l; i++) {
      var part = parts[i].part;
      original += (parts[i].separator || '') + part;

      if (part === ".." || part === "." || part === "this") {
        if (dig.length > 0) {
          throw new Exception("Invalid path: " + original, this);
        } else if (part === "..") {
          depth++;
        } else {
          this.isScoped = true;
        }
      } else {
        dig.push(part);
      }
    }

    this.original = original;
    this.parts    = dig;
    this.string   = dig.join('.');
    this.depth    = depth;

    // an ID is simple if it only has one part, and that part is not
    // `..` or `this`.
    this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

    this.stringModeValue = this.string;
  },

  PartialNameNode: function(name, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "PARTIAL_NAME";
    this.name = name.original;
  },

  DataNode: function(id, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "DATA";
    this.id = id;
  },

  StringNode: function(string, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "STRING";
    this.original =
      this.string =
      this.stringModeValue = string;
  },

  IntegerNode: function(integer, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "INTEGER";
    this.original =
      this.integer = integer;
    this.stringModeValue = Number(integer);
  },

  BooleanNode: function(bool, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "BOOLEAN";
    this.bool = bool;
    this.stringModeValue = bool === "true";
  },

  CommentNode: function(comment, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "comment";
    this.comment = comment;
  }
};

// Must be exported as an object rather than the root of the module as the jison lexer
// most modify the object to operate properly.
exports["default"] = AST;
},{"../exception":19}],13:[function(require,module,exports){
"use strict";
var parser = require("./parser")["default"];
var AST = require("./ast")["default"];

exports.parser = parser;

function parse(input) {
  // Just return if an already-compile AST was passed in.
  if(input.constructor === AST.ProgramNode) { return input; }

  parser.yy = AST;
  return parser.parse(input);
}

exports.parse = parse;
},{"./ast":12,"./parser":16}],14:[function(require,module,exports){
"use strict";
var Exception = require("../exception")["default"];

function Compiler() {}

exports.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
// function in a context. This is necessary for mustache compatibility, which
// requires that context functions in blocks are evaluated by blockHelperMissing,
// and then proceed as if the resulting value was provided to blockHelperMissing.

Compiler.prototype = {
  compiler: Compiler,

  disassemble: function() {
    var opcodes = this.opcodes, opcode, out = [], params, param;

    for (var i=0, l=opcodes.length; i<l; i++) {
      opcode = opcodes[i];

      if (opcode.opcode === 'DECLARE') {
        out.push("DECLARE " + opcode.name + "=" + opcode.value);
      } else {
        params = [];
        for (var j=0; j<opcode.args.length; j++) {
          param = opcode.args[j];
          if (typeof param === "string") {
            param = "\"" + param.replace("\n", "\\n") + "\"";
          }
          params.push(param);
        }
        out.push(opcode.opcode + " " + params.join(" "));
      }
    }

    return out.join("\n");
  },

  equals: function(other) {
    var len = this.opcodes.length;
    if (other.opcodes.length !== len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      var opcode = this.opcodes[i],
          otherOpcode = other.opcodes[i];
      if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
        return false;
      }
      for (var j = 0; j < opcode.args.length; j++) {
        if (opcode.args[j] !== otherOpcode.args[j]) {
          return false;
        }
      }
    }

    len = this.children.length;
    if (other.children.length !== len) {
      return false;
    }
    for (i = 0; i < len; i++) {
      if (!this.children[i].equals(other.children[i])) {
        return false;
      }
    }

    return true;
  },

  guid: 0,

  compile: function(program, options) {
    this.opcodes = [];
    this.children = [];
    this.depths = {list: []};
    this.options = options;

    // These changes will propagate to the other compiler components
    var knownHelpers = this.options.knownHelpers;
    this.options.knownHelpers = {
      'helperMissing': true,
      'blockHelperMissing': true,
      'each': true,
      'if': true,
      'unless': true,
      'with': true,
      'log': true
    };
    if (knownHelpers) {
      for (var name in knownHelpers) {
        this.options.knownHelpers[name] = knownHelpers[name];
      }
    }

    return this.accept(program);
  },

  accept: function(node) {
    var strip = node.strip || {},
        ret;
    if (strip.left) {
      this.opcode('strip');
    }

    ret = this[node.type](node);

    if (strip.right) {
      this.opcode('strip');
    }

    return ret;
  },

  program: function(program) {
    var statements = program.statements;

    for(var i=0, l=statements.length; i<l; i++) {
      this.accept(statements[i]);
    }
    this.isSimple = l === 1;

    this.depths.list = this.depths.list.sort(function(a, b) {
      return a - b;
    });

    return this;
  },

  compileProgram: function(program) {
    var result = new this.compiler().compile(program, this.options);
    var guid = this.guid++, depth;

    this.usePartial = this.usePartial || result.usePartial;

    this.children[guid] = result;

    for(var i=0, l=result.depths.list.length; i<l; i++) {
      depth = result.depths.list[i];

      if(depth < 2) { continue; }
      else { this.addDepth(depth - 1); }
    }

    return guid;
  },

  block: function(block) {
    var mustache = block.mustache,
        program = block.program,
        inverse = block.inverse;

    if (program) {
      program = this.compileProgram(program);
    }

    if (inverse) {
      inverse = this.compileProgram(inverse);
    }

    var sexpr = mustache.sexpr;
    var type = this.classifySexpr(sexpr);

    if (type === "helper") {
      this.helperSexpr(sexpr, program, inverse);
    } else if (type === "simple") {
      this.simpleSexpr(sexpr);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('blockValue');
    } else {
      this.ambiguousSexpr(sexpr, program, inverse);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('ambiguousBlockValue');
    }

    this.opcode('append');
  },

  hash: function(hash) {
    var pairs = hash.pairs, pair, val;

    this.opcode('pushHash');

    for(var i=0, l=pairs.length; i<l; i++) {
      pair = pairs[i];
      val  = pair[1];

      if (this.options.stringParams) {
        if(val.depth) {
          this.addDepth(val.depth);
        }
        this.opcode('getContext', val.depth || 0);
        this.opcode('pushStringParam', val.stringModeValue, val.type);

        if (val.type === 'sexpr') {
          // Subexpressions get evaluated and passed in
          // in string params mode.
          this.sexpr(val);
        }
      } else {
        this.accept(val);
      }

      this.opcode('assignToHash', pair[0]);
    }
    this.opcode('popHash');
  },

  partial: function(partial) {
    var partialName = partial.partialName;
    this.usePartial = true;

    if(partial.context) {
      this.ID(partial.context);
    } else {
      this.opcode('push', 'depth0');
    }

    this.opcode('invokePartial', partialName.name);
    this.opcode('append');
  },

  content: function(content) {
    this.opcode('appendContent', content.string);
  },

  mustache: function(mustache) {
    this.sexpr(mustache.sexpr);

    if(mustache.escaped && !this.options.noEscape) {
      this.opcode('appendEscaped');
    } else {
      this.opcode('append');
    }
  },

  ambiguousSexpr: function(sexpr, program, inverse) {
    var id = sexpr.id,
        name = id.parts[0],
        isBlock = program != null || inverse != null;

    this.opcode('getContext', id.depth);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    this.opcode('invokeAmbiguous', name, isBlock);
  },

  simpleSexpr: function(sexpr) {
    var id = sexpr.id;

    if (id.type === 'DATA') {
      this.DATA(id);
    } else if (id.parts.length) {
      this.ID(id);
    } else {
      // Simplified ID for `this`
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);
      this.opcode('pushContext');
    }

    this.opcode('resolvePossibleLambda');
  },

  helperSexpr: function(sexpr, program, inverse) {
    var params = this.setupFullMustacheParams(sexpr, program, inverse),
        name = sexpr.id.parts[0];

    if (this.options.knownHelpers[name]) {
      this.opcode('invokeKnownHelper', params.length, name);
    } else if (this.options.knownHelpersOnly) {
      throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
    } else {
      this.opcode('invokeHelper', params.length, name, sexpr.isRoot);
    }
  },

  sexpr: function(sexpr) {
    var type = this.classifySexpr(sexpr);

    if (type === "simple") {
      this.simpleSexpr(sexpr);
    } else if (type === "helper") {
      this.helperSexpr(sexpr);
    } else {
      this.ambiguousSexpr(sexpr);
    }
  },

  ID: function(id) {
    this.addDepth(id.depth);
    this.opcode('getContext', id.depth);

    var name = id.parts[0];
    if (!name) {
      this.opcode('pushContext');
    } else {
      this.opcode('lookupOnContext', id.parts[0]);
    }

    for(var i=1, l=id.parts.length; i<l; i++) {
      this.opcode('lookup', id.parts[i]);
    }
  },

  DATA: function(data) {
    this.options.data = true;
    if (data.id.isScoped || data.id.depth) {
      throw new Exception('Scoped data references are not supported: ' + data.original, data);
    }

    this.opcode('lookupData');
    var parts = data.id.parts;
    for(var i=0, l=parts.length; i<l; i++) {
      this.opcode('lookup', parts[i]);
    }
  },

  STRING: function(string) {
    this.opcode('pushString', string.string);
  },

  INTEGER: function(integer) {
    this.opcode('pushLiteral', integer.integer);
  },

  BOOLEAN: function(bool) {
    this.opcode('pushLiteral', bool.bool);
  },

  comment: function() {},

  // HELPERS
  opcode: function(name) {
    this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
  },

  declare: function(name, value) {
    this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
  },

  addDepth: function(depth) {
    if(depth === 0) { return; }

    if(!this.depths[depth]) {
      this.depths[depth] = true;
      this.depths.list.push(depth);
    }
  },

  classifySexpr: function(sexpr) {
    var isHelper   = sexpr.isHelper;
    var isEligible = sexpr.eligibleHelper;
    var options    = this.options;

    // if ambiguous, we can possibly resolve the ambiguity now
    if (isEligible && !isHelper) {
      var name = sexpr.id.parts[0];

      if (options.knownHelpers[name]) {
        isHelper = true;
      } else if (options.knownHelpersOnly) {
        isEligible = false;
      }
    }

    if (isHelper) { return "helper"; }
    else if (isEligible) { return "ambiguous"; }
    else { return "simple"; }
  },

  pushParams: function(params) {
    var i = params.length, param;

    while(i--) {
      param = params[i];

      if(this.options.stringParams) {
        if(param.depth) {
          this.addDepth(param.depth);
        }

        this.opcode('getContext', param.depth || 0);
        this.opcode('pushStringParam', param.stringModeValue, param.type);

        if (param.type === 'sexpr') {
          // Subexpressions get evaluated and passed in
          // in string params mode.
          this.sexpr(param);
        }
      } else {
        this[param.type](param);
      }
    }
  },

  setupFullMustacheParams: function(sexpr, program, inverse) {
    var params = sexpr.params;
    this.pushParams(params);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    if (sexpr.hash) {
      this.hash(sexpr.hash);
    } else {
      this.opcode('emptyHash');
    }

    return params;
  }
};

function precompile(input, options, env) {
  if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
    throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }

  var ast = env.parse(input);
  var environment = new env.Compiler().compile(ast, options);
  return new env.JavaScriptCompiler().compile(environment, options);
}

exports.precompile = precompile;function compile(input, options, env) {
  if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
    throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
  }

  options = options || {};

  if (!('data' in options)) {
    options.data = true;
  }

  var compiled;

  function compileInput() {
    var ast = env.parse(input);
    var environment = new env.Compiler().compile(ast, options);
    var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
    return env.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  return function(context, options) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled.call(this, context, options);
  };
}

exports.compile = compile;
},{"../exception":19}],15:[function(require,module,exports){
"use strict";
var COMPILER_REVISION = require("../base").COMPILER_REVISION;
var REVISION_CHANGES = require("../base").REVISION_CHANGES;
var log = require("../base").log;
var Exception = require("../exception")["default"];

function Literal(value) {
  this.value = value;
}

function JavaScriptCompiler() {}

JavaScriptCompiler.prototype = {
  // PUBLIC API: You can override these methods in a subclass to provide
  // alternative compiled forms for name lookup and buffering semantics
  nameLookup: function(parent, name /* , type*/) {
    var wrap,
        ret;
    if (parent.indexOf('depth') === 0) {
      wrap = true;
    }

    if (/^[0-9]+$/.test(name)) {
      ret = parent + "[" + name + "]";
    } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
      ret = parent + "." + name;
    }
    else {
      ret = parent + "['" + name + "']";
    }

    if (wrap) {
      return '(' + parent + ' && ' + ret + ')';
    } else {
      return ret;
    }
  },

  compilerInfo: function() {
    var revision = COMPILER_REVISION,
        versions = REVISION_CHANGES[revision];
    return "this.compilerInfo = ["+revision+",'"+versions+"'];\n";
  },

  appendToBuffer: function(string) {
    if (this.environment.isSimple) {
      return "return " + string + ";";
    } else {
      return {
        appendToBuffer: true,
        content: string,
        toString: function() { return "buffer += " + string + ";"; }
      };
    }
  },

  initializeBuffer: function() {
    return this.quotedString("");
  },

  namespace: "Handlebars",
  // END PUBLIC API

  compile: function(environment, options, context, asObject) {
    this.environment = environment;
    this.options = options || {};

    log('debug', this.environment.disassemble() + "\n\n");

    this.name = this.environment.name;
    this.isChild = !!context;
    this.context = context || {
      programs: [],
      environments: [],
      aliases: { }
    };

    this.preamble();

    this.stackSlot = 0;
    this.stackVars = [];
    this.registers = { list: [] };
    this.hashes = [];
    this.compileStack = [];
    this.inlineStack = [];

    this.compileChildren(environment, options);

    var opcodes = environment.opcodes, opcode;

    this.i = 0;

    for(var l=opcodes.length; this.i<l; this.i++) {
      opcode = opcodes[this.i];

      if(opcode.opcode === 'DECLARE') {
        this[opcode.name] = opcode.value;
      } else {
        this[opcode.opcode].apply(this, opcode.args);
      }

      // Reset the stripNext flag if it was not set by this operation.
      if (opcode.opcode !== this.stripNext) {
        this.stripNext = false;
      }
    }

    // Flush any trailing content that might be pending.
    this.pushSource('');

    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
      throw new Exception('Compile completed with content left on stack');
    }

    return this.createFunctionContext(asObject);
  },

  preamble: function() {
    var out = [];

    if (!this.isChild) {
      var namespace = this.namespace;

      var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
      if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
      if (this.options.data) { copies = copies + " data = data || {};"; }
      out.push(copies);
    } else {
      out.push('');
    }

    if (!this.environment.isSimple) {
      out.push(", buffer = " + this.initializeBuffer());
    } else {
      out.push("");
    }

    // track the last context pushed into place to allow skipping the
    // getContext opcode when it would be a noop
    this.lastContext = 0;
    this.source = out;
  },

  createFunctionContext: function(asObject) {
    var locals = this.stackVars.concat(this.registers.list);

    if(locals.length > 0) {
      this.source[1] = this.source[1] + ", " + locals.join(", ");
    }

    // Generate minimizer alias mappings
    if (!this.isChild) {
      for (var alias in this.context.aliases) {
        if (this.context.aliases.hasOwnProperty(alias)) {
          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
        }
      }
    }

    if (this.source[1]) {
      this.source[1] = "var " + this.source[1].substring(2) + ";";
    }

    // Merge children
    if (!this.isChild) {
      this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
    }

    if (!this.environment.isSimple) {
      this.pushSource("return buffer;");
    }

    var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

    for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
      params.push("depth" + this.environment.depths.list[i]);
    }

    // Perform a second pass over the output to merge content when possible
    var source = this.mergeSource();

    if (!this.isChild) {
      source = this.compilerInfo()+source;
    }

    if (asObject) {
      params.push(source);

      return Function.apply(this, params);
    } else {
      var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
      log('debug', functionSource + "\n\n");
      return functionSource;
    }
  },
  mergeSource: function() {
    // WARN: We are not handling the case where buffer is still populated as the source should
    // not have buffer append operations as their final action.
    var source = '',
        buffer;
    for (var i = 0, len = this.source.length; i < len; i++) {
      var line = this.source[i];
      if (line.appendToBuffer) {
        if (buffer) {
          buffer = buffer + '\n    + ' + line.content;
        } else {
          buffer = line.content;
        }
      } else {
        if (buffer) {
          source += 'buffer += ' + buffer + ';\n  ';
          buffer = undefined;
        }
        source += line + '\n  ';
      }
    }
    return source;
  },

  // [blockValue]
  //
  // On stack, before: hash, inverse, program, value
  // On stack, after: return value of blockHelperMissing
  //
  // The purpose of this opcode is to take a block of the form
  // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
  // replace it on the stack with the result of properly
  // invoking blockHelperMissing.
  blockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    this.replaceStack(function(current) {
      params.splice(1, 0, current);
      return "blockHelperMissing.call(" + params.join(", ") + ")";
    });
  },

  // [ambiguousBlockValue]
  //
  // On stack, before: hash, inverse, program, value
  // Compiler value, before: lastHelper=value of last found helper, if any
  // On stack, after, if no lastHelper: same as [blockValue]
  // On stack, after, if lastHelper: value
  ambiguousBlockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    var current = this.topStack();
    params.splice(1, 0, current);

    this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
  },

  // [appendContent]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Appends the string value of `content` to the current buffer
  appendContent: function(content) {
    if (this.pendingContent) {
      content = this.pendingContent + content;
    }
    if (this.stripNext) {
      content = content.replace(/^\s+/, '');
    }

    this.pendingContent = content;
  },

  // [strip]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Removes any trailing whitespace from the prior content node and flags
  // the next operation for stripping if it is a content node.
  strip: function() {
    if (this.pendingContent) {
      this.pendingContent = this.pendingContent.replace(/\s+$/, '');
    }
    this.stripNext = 'strip';
  },

  // [append]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Coerces `value` to a String and appends it to the current buffer.
  //
  // If `value` is truthy, or 0, it is coerced into a string and appended
  // Otherwise, the empty string is appended
  append: function() {
    // Force anything that is inlined onto the stack so we don't have duplication
    // when we examine local
    this.flushInline();
    var local = this.popStack();
    this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
    if (this.environment.isSimple) {
      this.pushSource("else { " + this.appendToBuffer("''") + " }");
    }
  },

  // [appendEscaped]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Escape `value` and append it to the buffer
  appendEscaped: function() {
    this.context.aliases.escapeExpression = 'this.escapeExpression';

    this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
  },

  // [getContext]
  //
  // On stack, before: ...
  // On stack, after: ...
  // Compiler value, after: lastContext=depth
  //
  // Set the value of the `lastContext` compiler value to the depth
  getContext: function(depth) {
    if(this.lastContext !== depth) {
      this.lastContext = depth;
    }
  },

  // [lookupOnContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext[name], ...
  //
  // Looks up the value of `name` on the current context and pushes
  // it onto the stack.
  lookupOnContext: function(name) {
    this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
  },

  // [pushContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext, ...
  //
  // Pushes the value of the current context onto the stack.
  pushContext: function() {
    this.pushStackLiteral('depth' + this.lastContext);
  },

  // [resolvePossibleLambda]
  //
  // On stack, before: value, ...
  // On stack, after: resolved value, ...
  //
  // If the `value` is a lambda, replace it on the stack by
  // the return value of the lambda
  resolvePossibleLambda: function() {
    this.context.aliases.functionType = '"function"';

    this.replaceStack(function(current) {
      return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
    });
  },

  // [lookup]
  //
  // On stack, before: value, ...
  // On stack, after: value[name], ...
  //
  // Replace the value on the stack with the result of looking
  // up `name` on `value`
  lookup: function(name) {
    this.replaceStack(function(current) {
      return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
    });
  },

  // [lookupData]
  //
  // On stack, before: ...
  // On stack, after: data, ...
  //
  // Push the data lookup operator
  lookupData: function() {
    this.pushStackLiteral('data');
  },

  // [pushStringParam]
  //
  // On stack, before: ...
  // On stack, after: string, currentContext, ...
  //
  // This opcode is designed for use in string mode, which
  // provides the string value of a parameter along with its
  // depth rather than resolving it immediately.
  pushStringParam: function(string, type) {
    this.pushStackLiteral('depth' + this.lastContext);

    this.pushString(type);

    // If it's a subexpression, the string result
    // will be pushed after this opcode.
    if (type !== 'sexpr') {
      if (typeof string === 'string') {
        this.pushString(string);
      } else {
        this.pushStackLiteral(string);
      }
    }
  },

  emptyHash: function() {
    this.pushStackLiteral('{}');

    if (this.options.stringParams) {
      this.push('{}'); // hashContexts
      this.push('{}'); // hashTypes
    }
  },
  pushHash: function() {
    if (this.hash) {
      this.hashes.push(this.hash);
    }
    this.hash = {values: [], types: [], contexts: []};
  },
  popHash: function() {
    var hash = this.hash;
    this.hash = this.hashes.pop();

    if (this.options.stringParams) {
      this.push('{' + hash.contexts.join(',') + '}');
      this.push('{' + hash.types.join(',') + '}');
    }

    this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
  },

  // [pushString]
  //
  // On stack, before: ...
  // On stack, after: quotedString(string), ...
  //
  // Push a quoted version of `string` onto the stack
  pushString: function(string) {
    this.pushStackLiteral(this.quotedString(string));
  },

  // [push]
  //
  // On stack, before: ...
  // On stack, after: expr, ...
  //
  // Push an expression onto the stack
  push: function(expr) {
    this.inlineStack.push(expr);
    return expr;
  },

  // [pushLiteral]
  //
  // On stack, before: ...
  // On stack, after: value, ...
  //
  // Pushes a value onto the stack. This operation prevents
  // the compiler from creating a temporary variable to hold
  // it.
  pushLiteral: function(value) {
    this.pushStackLiteral(value);
  },

  // [pushProgram]
  //
  // On stack, before: ...
  // On stack, after: program(guid), ...
  //
  // Push a program expression onto the stack. This takes
  // a compile-time guid and converts it into a runtime-accessible
  // expression.
  pushProgram: function(guid) {
    if (guid != null) {
      this.pushStackLiteral(this.programExpression(guid));
    } else {
      this.pushStackLiteral(null);
    }
  },

  // [invokeHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // Pops off the helper's parameters, invokes the helper,
  // and pushes the helper's return value onto the stack.
  //
  // If the helper is not found, `helperMissing` is called.
  invokeHelper: function(paramSize, name, isRoot) {
    this.context.aliases.helperMissing = 'helpers.helperMissing';
    this.useRegister('helper');

    var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

    var lookup = 'helper = ' + helper.name + ' || ' + nonHelper;
    if (helper.paramsInit) {
      lookup += ',' + helper.paramsInit;
    }

    this.push(
      '('
        + lookup
        + ',helper '
          + '? helper.call(' + helper.callParams + ') '
          + ': helperMissing.call(' + helper.helperMissingParams + '))');

    // Always flush subexpressions. This is both to prevent the compounding size issue that
    // occurs when the code has to be duplicated for inlining and also to prevent errors
    // due to the incorrect options object being passed due to the shared register.
    if (!isRoot) {
      this.flushInline();
    }
  },

  // [invokeKnownHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // This operation is used when the helper is known to exist,
  // so a `helperMissing` fallback is not required.
  invokeKnownHelper: function(paramSize, name) {
    var helper = this.setupHelper(paramSize, name);
    this.push(helper.name + ".call(" + helper.callParams + ")");
  },

  // [invokeAmbiguous]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of disambiguation
  //
  // This operation is used when an expression like `{{foo}}`
  // is provided, but we don't know at compile-time whether it
  // is a helper or a path.
  //
  // This operation emits more code than the other options,
  // and can be avoided by passing the `knownHelpers` and
  // `knownHelpersOnly` flags at compile-time.
  invokeAmbiguous: function(name, helperCall) {
    this.context.aliases.functionType = '"function"';
    this.useRegister('helper');

    this.emptyHash();
    var helper = this.setupHelper(0, name, helperCall);

    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
    var nextStack = this.nextStack();

    if (helper.paramsInit) {
      this.pushSource(helper.paramsInit);
    }
    this.pushSource('if (helper = ' + helperName + ') { ' + nextStack + ' = helper.call(' + helper.callParams + '); }');
    this.pushSource('else { helper = ' + nonHelper + '; ' + nextStack + ' = typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper; }');
  },

  // [invokePartial]
  //
  // On stack, before: context, ...
  // On stack after: result of partial invocation
  //
  // This operation pops off a context, invokes a partial with that context,
  // and pushes the result of the invocation back.
  invokePartial: function(name) {
    var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

    if (this.options.data) {
      params.push("data");
    }

    this.context.aliases.self = "this";
    this.push("self.invokePartial(" + params.join(", ") + ")");
  },

  // [assignToHash]
  //
  // On stack, before: value, hash, ...
  // On stack, after: hash, ...
  //
  // Pops a value and hash off the stack, assigns `hash[key] = value`
  // and pushes the hash back onto the stack.
  assignToHash: function(key) {
    var value = this.popStack(),
        context,
        type;

    if (this.options.stringParams) {
      type = this.popStack();
      context = this.popStack();
    }

    var hash = this.hash;
    if (context) {
      hash.contexts.push("'" + key + "': " + context);
    }
    if (type) {
      hash.types.push("'" + key + "': " + type);
    }
    hash.values.push("'" + key + "': (" + value + ")");
  },

  // HELPERS

  compiler: JavaScriptCompiler,

  compileChildren: function(environment, options) {
    var children = environment.children, child, compiler;

    for(var i=0, l=children.length; i<l; i++) {
      child = children[i];
      compiler = new this.compiler();

      var index = this.matchExistingProgram(child);

      if (index == null) {
        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
        index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context);
        this.context.environments[index] = child;
      } else {
        child.index = index;
        child.name = 'program' + index;
      }
    }
  },
  matchExistingProgram: function(child) {
    for (var i = 0, len = this.context.environments.length; i < len; i++) {
      var environment = this.context.environments[i];
      if (environment && environment.equals(child)) {
        return i;
      }
    }
  },

  programExpression: function(guid) {
    this.context.aliases.self = "this";

    if(guid == null) {
      return "self.noop";
    }

    var child = this.environment.children[guid],
        depths = child.depths.list, depth;

    var programParams = [child.index, child.name, "data"];

    for(var i=0, l = depths.length; i<l; i++) {
      depth = depths[i];

      if(depth === 1) { programParams.push("depth0"); }
      else { programParams.push("depth" + (depth - 1)); }
    }

    return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
  },

  register: function(name, val) {
    this.useRegister(name);
    this.pushSource(name + " = " + val + ";");
  },

  useRegister: function(name) {
    if(!this.registers[name]) {
      this.registers[name] = true;
      this.registers.list.push(name);
    }
  },

  pushStackLiteral: function(item) {
    return this.push(new Literal(item));
  },

  pushSource: function(source) {
    if (this.pendingContent) {
      this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
      this.pendingContent = undefined;
    }

    if (source) {
      this.source.push(source);
    }
  },

  pushStack: function(item) {
    this.flushInline();

    var stack = this.incrStack();
    if (item) {
      this.pushSource(stack + " = " + item + ";");
    }
    this.compileStack.push(stack);
    return stack;
  },

  replaceStack: function(callback) {
    var prefix = '',
        inline = this.isInline(),
        stack,
        createdStack,
        usedLiteral;

    // If we are currently inline then we want to merge the inline statement into the
    // replacement statement via ','
    if (inline) {
      var top = this.popStack(true);

      if (top instanceof Literal) {
        // Literals do not need to be inlined
        stack = top.value;
        usedLiteral = true;
      } else {
        // Get or create the current stack name for use by the inline
        createdStack = !this.stackSlot;
        var name = !createdStack ? this.topStackName() : this.incrStack();

        prefix = '(' + this.push(name) + ' = ' + top + '),';
        stack = this.topStack();
      }
    } else {
      stack = this.topStack();
    }

    var item = callback.call(this, stack);

    if (inline) {
      if (!usedLiteral) {
        this.popStack();
      }
      if (createdStack) {
        this.stackSlot--;
      }
      this.push('(' + prefix + item + ')');
    } else {
      // Prevent modification of the context depth variable. Through replaceStack
      if (!/^stack/.test(stack)) {
        stack = this.nextStack();
      }

      this.pushSource(stack + " = (" + prefix + item + ");");
    }
    return stack;
  },

  nextStack: function() {
    return this.pushStack();
  },

  incrStack: function() {
    this.stackSlot++;
    if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
    return this.topStackName();
  },
  topStackName: function() {
    return "stack" + this.stackSlot;
  },
  flushInline: function() {
    var inlineStack = this.inlineStack;
    if (inlineStack.length) {
      this.inlineStack = [];
      for (var i = 0, len = inlineStack.length; i < len; i++) {
        var entry = inlineStack[i];
        if (entry instanceof Literal) {
          this.compileStack.push(entry);
        } else {
          this.pushStack(entry);
        }
      }
    }
  },
  isInline: function() {
    return this.inlineStack.length;
  },

  popStack: function(wrapped) {
    var inline = this.isInline(),
        item = (inline ? this.inlineStack : this.compileStack).pop();

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      if (!inline) {
        if (!this.stackSlot) {
          throw new Exception('Invalid stack pop');
        }
        this.stackSlot--;
      }
      return item;
    }
  },

  topStack: function(wrapped) {
    var stack = (this.isInline() ? this.inlineStack : this.compileStack),
        item = stack[stack.length - 1];

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      return item;
    }
  },

  quotedString: function(str) {
    return '"' + str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
      .replace(/\u2029/g, '\\u2029') + '"';
  },

  setupHelper: function(paramSize, name, missingParams) {
    var params = [],
        paramsInit = this.setupParams(paramSize, params, missingParams);
    var foundHelper = this.nameLookup('helpers', name, 'helper');

    return {
      params: params,
      paramsInit: paramsInit,
      name: foundHelper,
      callParams: ["depth0"].concat(params).join(", "),
      helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
    };
  },

  setupOptions: function(paramSize, params) {
    var options = [], contexts = [], types = [], param, inverse, program;

    options.push("hash:" + this.popStack());

    if (this.options.stringParams) {
      options.push("hashTypes:" + this.popStack());
      options.push("hashContexts:" + this.popStack());
    }

    inverse = this.popStack();
    program = this.popStack();

    // Avoid setting fn and inverse if neither are set. This allows
    // helpers to do a check for `if (options.fn)`
    if (program || inverse) {
      if (!program) {
        this.context.aliases.self = "this";
        program = "self.noop";
      }

      if (!inverse) {
        this.context.aliases.self = "this";
        inverse = "self.noop";
      }

      options.push("inverse:" + inverse);
      options.push("fn:" + program);
    }

    for(var i=0; i<paramSize; i++) {
      param = this.popStack();
      params.push(param);

      if(this.options.stringParams) {
        types.push(this.popStack());
        contexts.push(this.popStack());
      }
    }

    if (this.options.stringParams) {
      options.push("contexts:[" + contexts.join(",") + "]");
      options.push("types:[" + types.join(",") + "]");
    }

    if(this.options.data) {
      options.push("data:data");
    }

    return options;
  },

  // the params and contexts arguments are passed in arrays
  // to fill in
  setupParams: function(paramSize, params, useRegister) {
    var options = '{' + this.setupOptions(paramSize, params).join(',') + '}';

    if (useRegister) {
      this.useRegister('options');
      params.push('options');
      return 'options=' + options;
    } else {
      params.push(options);
      return '';
    }
  }
};

var reservedWords = (
  "break else new var" +
  " case finally return void" +
  " catch for switch while" +
  " continue function this with" +
  " default if throw" +
  " delete in try" +
  " do instanceof typeof" +
  " abstract enum int short" +
  " boolean export interface static" +
  " byte extends long super" +
  " char final native synchronized" +
  " class float package throws" +
  " const goto private transient" +
  " debugger implements protected volatile" +
  " double import public let yield"
).split(" ");

var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

for(var i=0, l=reservedWords.length; i<l; i++) {
  compilerWords[reservedWords[i]] = true;
}

JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
  if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)) {
    return true;
  }
  return false;
};

exports["default"] = JavaScriptCompiler;
},{"../base":11,"../exception":19}],16:[function(require,module,exports){
"use strict";
/* jshint ignore:start */
/* Jison generated parser */
var handlebars = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"statements":4,"EOF":5,"program":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"sexpr":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"partial_option0":27,"sexpr_repetition0":28,"sexpr_option0":29,"dataName":30,"param":31,"STRING":32,"INTEGER":33,"BOOLEAN":34,"OPEN_SEXPR":35,"CLOSE_SEXPR":36,"hash":37,"hash_repetition_plus0":38,"hashSegment":39,"ID":40,"EQUALS":41,"DATA":42,"pathSegments":43,"SEP":44,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",35:"OPEN_SEXPR",36:"CLOSE_SEXPR",40:"ID",41:"EQUALS",42:"DATA",44:"SEP"},
productions_: [0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[37,1],[39,3],[26,1],[26,1],[26,1],[30,2],[21,1],[43,3],[43,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[38,1],[38,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return new yy.ProgramNode($$[$0-1], this._$); 
break;
case 2: return new yy.ProgramNode([], this._$); 
break;
case 3:this.$ = new yy.ProgramNode([], $$[$0-1], $$[$0], this._$);
break;
case 4:this.$ = new yy.ProgramNode($$[$0-2], $$[$0-1], $$[$0], this._$);
break;
case 5:this.$ = new yy.ProgramNode($$[$0-1], $$[$0], [], this._$);
break;
case 6:this.$ = new yy.ProgramNode($$[$0], this._$);
break;
case 7:this.$ = new yy.ProgramNode([], this._$);
break;
case 8:this.$ = new yy.ProgramNode([], this._$);
break;
case 9:this.$ = [$$[$0]];
break;
case 10: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 11:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0], this._$);
break;
case 12:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0], this._$);
break;
case 13:this.$ = $$[$0];
break;
case 14:this.$ = $$[$0];
break;
case 15:this.$ = new yy.ContentNode($$[$0], this._$);
break;
case 16:this.$ = new yy.CommentNode($$[$0], this._$);
break;
case 17:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 18:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 19:this.$ = {path: $$[$0-1], strip: stripFlags($$[$0-2], $$[$0])};
break;
case 20:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 21:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 22:this.$ = new yy.PartialNode($$[$0-2], $$[$0-1], stripFlags($$[$0-3], $$[$0]), this._$);
break;
case 23:this.$ = stripFlags($$[$0-1], $$[$0]);
break;
case 24:this.$ = new yy.SexprNode([$$[$0-2]].concat($$[$0-1]), $$[$0], this._$);
break;
case 25:this.$ = new yy.SexprNode([$$[$0]], null, this._$);
break;
case 26:this.$ = $$[$0];
break;
case 27:this.$ = new yy.StringNode($$[$0], this._$);
break;
case 28:this.$ = new yy.IntegerNode($$[$0], this._$);
break;
case 29:this.$ = new yy.BooleanNode($$[$0], this._$);
break;
case 30:this.$ = $$[$0];
break;
case 31:$$[$0-1].isHelper = true; this.$ = $$[$0-1];
break;
case 32:this.$ = new yy.HashNode($$[$0], this._$);
break;
case 33:this.$ = [$$[$0-2], $$[$0]];
break;
case 34:this.$ = new yy.PartialNameNode($$[$0], this._$);
break;
case 35:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
break;
case 36:this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0], this._$));
break;
case 37:this.$ = new yy.DataNode($$[$0], this._$);
break;
case 38:this.$ = new yy.IdNode($$[$0], this._$);
break;
case 39: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
break;
case 40:this.$ = [{part: $$[$0]}];
break;
case 43:this.$ = [];
break;
case 44:$$[$0-1].push($$[$0]);
break;
case 47:this.$ = [$$[$0]];
break;
case 48:$$[$0-1].push($$[$0]);
break;
}
},
table: [{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:29,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:30,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:31,21:24,30:25,40:[1,28],42:[1,27],43:26},{21:33,26:32,32:[1,34],33:[1,35],40:[1,28],43:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,40:[1,28],42:[1,27],43:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,43],24:[2,43],28:43,32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43],40:[2,43],42:[2,43]},{18:[2,25],24:[2,25],36:[2,25]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],40:[2,38],42:[2,38],44:[1,44]},{21:45,40:[1,28],43:26},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],42:[2,40],44:[2,40]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,41],21:50,27:49,40:[1,28],43:26},{18:[2,34],40:[2,34]},{18:[2,35],40:[2,35]},{18:[2,36],40:[2,36]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,40:[1,28],43:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,45],21:56,24:[2,45],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:[1,61],36:[2,45],37:55,38:62,39:63,40:[1,64],42:[1,27],43:26},{40:[1,65]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37],40:[2,37],42:[2,37]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,66]},{18:[2,42]},{18:[1,67]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24],36:[2,24]},{18:[2,44],24:[2,44],32:[2,44],33:[2,44],34:[2,44],35:[2,44],36:[2,44],40:[2,44],42:[2,44]},{18:[2,46],24:[2,46],36:[2,46]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26],40:[2,26],42:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27],40:[2,27],42:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],40:[2,28],42:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],40:[2,29],42:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],40:[2,30],42:[2,30]},{17:68,21:24,30:25,40:[1,28],42:[1,27],43:26},{18:[2,32],24:[2,32],36:[2,32],39:69,40:[1,70]},{18:[2,47],24:[2,47],36:[2,47],40:[2,47]},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],41:[1,71],42:[2,40],44:[2,40]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],40:[2,39],42:[2,39],44:[2,39]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{36:[1,72]},{18:[2,48],24:[2,48],36:[2,48],40:[2,48]},{41:[1,71]},{21:56,30:60,31:73,32:[1,57],33:[1,58],34:[1,59],35:[1,61],40:[1,28],42:[1,27],43:26},{18:[2,31],24:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],40:[2,31],42:[2,31]},{18:[2,33],24:[2,33],36:[2,33],40:[2,33]}],
defaultActions: {3:[2,2],16:[2,1],50:[2,42]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};


function stripFlags(open, close) {
  return {
    left: open.charAt(2) === '~',
    right: close.charAt(0) === '~' || close.charAt(1) === '~'
  };
}

/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {


function strip(start, end) {
  return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
}


var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:
                                   if(yy_.yytext.slice(-2) === "\\\\") {
                                     strip(0,1);
                                     this.begin("mu");
                                   } else if(yy_.yytext.slice(-1) === "\\") {
                                     strip(0,1);
                                     this.begin("emu");
                                   } else {
                                     this.begin("mu");
                                   }
                                   if(yy_.yytext) return 14;
                                 
break;
case 1:return 14;
break;
case 2:
                                   this.popState();
                                   return 14;
                                 
break;
case 3:strip(0,4); this.popState(); return 15;
break;
case 4:return 35;
break;
case 5:return 36;
break;
case 6:return 25;
break;
case 7:return 16;
break;
case 8:return 20;
break;
case 9:return 19;
break;
case 10:return 19;
break;
case 11:return 23;
break;
case 12:return 22;
break;
case 13:this.popState(); this.begin('com');
break;
case 14:strip(3,5); this.popState(); return 15;
break;
case 15:return 22;
break;
case 16:return 41;
break;
case 17:return 40;
break;
case 18:return 40;
break;
case 19:return 44;
break;
case 20:// ignore whitespace
break;
case 21:this.popState(); return 24;
break;
case 22:this.popState(); return 18;
break;
case 23:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 32;
break;
case 24:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 32;
break;
case 25:return 42;
break;
case 26:return 34;
break;
case 27:return 34;
break;
case 28:return 33;
break;
case 29:return 40;
break;
case 30:yy_.yytext = strip(1,2); return 40;
break;
case 31:return 'INVALID';
break;
case 32:return 5;
break;
}
};
lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[3],"inclusive":false},"INITIAL":{"rules":[0,1,32],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();exports["default"] = handlebars;
/* jshint ignore:end */
},{}],17:[function(require,module,exports){
"use strict";
var Visitor = require("./visitor")["default"];

function print(ast) {
  return new PrintVisitor().accept(ast);
}

exports.print = print;function PrintVisitor() {
  this.padding = 0;
}

exports.PrintVisitor = PrintVisitor;PrintVisitor.prototype = new Visitor();

PrintVisitor.prototype.pad = function(string, newline) {
  var out = "";

  for(var i=0,l=this.padding; i<l; i++) {
    out = out + "  ";
  }

  out = out + string;

  if(newline !== false) { out = out + "\n"; }
  return out;
};

PrintVisitor.prototype.program = function(program) {
  var out = "",
      statements = program.statements,
      i, l;

  for(i=0, l=statements.length; i<l; i++) {
    out = out + this.accept(statements[i]);
  }

  this.padding--;

  return out;
};

PrintVisitor.prototype.block = function(block) {
  var out = "";

  out = out + this.pad("BLOCK:");
  this.padding++;
  out = out + this.accept(block.mustache);
  if (block.program) {
    out = out + this.pad("PROGRAM:");
    this.padding++;
    out = out + this.accept(block.program);
    this.padding--;
  }
  if (block.inverse) {
    if (block.program) { this.padding++; }
    out = out + this.pad("{{^}}");
    this.padding++;
    out = out + this.accept(block.inverse);
    this.padding--;
    if (block.program) { this.padding--; }
  }
  this.padding--;

  return out;
};

PrintVisitor.prototype.sexpr = function(sexpr) {
  var params = sexpr.params, paramStrings = [], hash;

  for(var i=0, l=params.length; i<l; i++) {
    paramStrings.push(this.accept(params[i]));
  }

  params = "[" + paramStrings.join(", ") + "]";

  hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";

  return this.accept(sexpr.id) + " " + params + hash;
};

PrintVisitor.prototype.mustache = function(mustache) {
  return this.pad("{{ " + this.accept(mustache.sexpr) + " }}");
};

PrintVisitor.prototype.partial = function(partial) {
  var content = this.accept(partial.partialName);
  if(partial.context) { content = content + " " + this.accept(partial.context); }
  return this.pad("{{> " + content + " }}");
};

PrintVisitor.prototype.hash = function(hash) {
  var pairs = hash.pairs;
  var joinedPairs = [], left, right;

  for(var i=0, l=pairs.length; i<l; i++) {
    left = pairs[i][0];
    right = this.accept(pairs[i][1]);
    joinedPairs.push( left + "=" + right );
  }

  return "HASH{" + joinedPairs.join(", ") + "}";
};

PrintVisitor.prototype.STRING = function(string) {
  return '"' + string.string + '"';
};

PrintVisitor.prototype.INTEGER = function(integer) {
  return "INTEGER{" + integer.integer + "}";
};

PrintVisitor.prototype.BOOLEAN = function(bool) {
  return "BOOLEAN{" + bool.bool + "}";
};

PrintVisitor.prototype.ID = function(id) {
  var path = id.parts.join("/");
  if(id.parts.length > 1) {
    return "PATH:" + path;
  } else {
    return "ID:" + path;
  }
};

PrintVisitor.prototype.PARTIAL_NAME = function(partialName) {
    return "PARTIAL:" + partialName.name;
};

PrintVisitor.prototype.DATA = function(data) {
  return "@" + this.accept(data.id);
};

PrintVisitor.prototype.content = function(content) {
  return this.pad("CONTENT[ '" + content.string + "' ]");
};

PrintVisitor.prototype.comment = function(comment) {
  return this.pad("{{! '" + comment.comment + "' }}");
};
},{"./visitor":18}],18:[function(require,module,exports){
"use strict";
function Visitor() {}

Visitor.prototype = {
  constructor: Visitor,

  accept: function(object) {
    return this[object.type](object);
  }
};

exports["default"] = Visitor;
},{}],19:[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],20:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  if (!env) {
    throw new Exception("No environment passed to template");
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
    var result = env.VM.invokePartial.apply(this, arguments);
    if (result != null) { return result; }

    if (env.compile) {
      var options = { helpers: helpers, partials: partials, data: data };
      partials[name] = env.compile(partial, { data: data !== undefined }, env);
      return partials[name](context, options);
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,
    programs: [],
    program: function(i, fn, data) {
      var programWrapper = this.programs[i];
      if(data) {
        programWrapper = program(i, fn, data);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(i, fn);
      }
      return programWrapper;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = {};
        Utils.extend(ret, common);
        Utils.extend(ret, param);
      }
      return ret;
    },
    programWithDepth: env.VM.programWithDepth,
    noop: env.VM.noop,
    compilerInfo: null
  };

  return function(context, options) {
    options = options || {};
    var namespace = options.partial ? options : env,
        helpers,
        partials;

    if (!options.partial) {
      helpers = options.helpers;
      partials = options.partials;
    }
    var result = templateSpec.call(
          container,
          namespace, context,
          helpers,
          partials,
          options.data);

    if (!options.partial) {
      env.VM.checkRevision(container.compilerInfo);
    }

    return result;
  };
}

exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
  var args = Array.prototype.slice.call(arguments, 3);

  var prog = function(context, options) {
    options = options || {};

    return fn.apply(this, [context, options.data || data].concat(args));
  };
  prog.program = i;
  prog.depth = args.length;
  return prog;
}

exports.programWithDepth = programWithDepth;function program(i, fn, data) {
  var prog = function(context, options) {
    options = options || {};

    return fn(context, options.data || data);
  };
  prog.program = i;
  prog.depth = 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;
},{"./base":11,"./exception":19,"./utils":22}],21:[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],22:[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr] || "&amp;";
}

function extend(obj, value) {
  for(var key in value) {
    if(Object.prototype.hasOwnProperty.call(value, key)) {
      obj[key] = value[key];
    }
  }
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (!string && string !== 0) {
    return "";
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;
},{"./safe-string":21}],23:[function(require,module,exports){
// USAGE:
// var handlebars = require('handlebars');

// var local = handlebars.create();

var handlebars = require('../dist/cjs/handlebars')["default"];

handlebars.Visitor = require('../dist/cjs/handlebars/compiler/visitor')["default"];

var printer = require('../dist/cjs/handlebars/compiler/printer');
handlebars.PrintVisitor = printer.PrintVisitor;
handlebars.print = printer.print;

module.exports = handlebars;

// Publish a Node.js require() handler for .handlebars and .hbs files
if (typeof require !== 'undefined' && require.extensions) {
  var extension = function(module, filename) {
    var fs = require("fs");
    var templateString = fs.readFileSync(filename, "utf8");
    module.exports = handlebars.compile(templateString);
  };
  require.extensions[".handlebars"] = extension;
  require.extensions[".hbs"] = extension;
}

},{"../dist/cjs/handlebars":9,"../dist/cjs/handlebars/compiler/printer":17,"../dist/cjs/handlebars/compiler/visitor":18,"fs":8}],24:[function(require,module,exports){
var JS = (typeof this.JS === 'undefined') ? {} : this.JS;
JS.Date = Date;

(function(factory) {
  var $ = (typeof this.global === 'object') ? this.global : this,
      E = (typeof exports === 'object');

  if (E) {
    exports.JS = exports;
    JS = exports;
  } else {
    $.JS = JS;
  }
  factory($, JS);

})(function(global, exports) {
'use strict';

var Package = function(loader) {
  Package._index(this);

  this._loader    = loader;
  this._names     = new OrderedSet();
  this._deps      = new OrderedSet();
  this._uses      = new OrderedSet();
  this._styles    = new OrderedSet();
  this._observers = {};
  this._events    = {};
};

Package.displayName = 'Package';
Package.toString = function() { return Package.displayName };

Package.log = function(message) {
  if (!exports.debug) return;
  if (typeof window === 'undefined') return;
  if (typeof global.runtime === 'object') runtime.trace(message);
  if (global.console && console.info) console.info(message);
};

var resolve = function(filename) {
  if (/^https?:/.test(filename)) return filename;
  var root = exports.ROOT;
  if (root) filename = (root + '/' + filename).replace(/\/+/g, '/');
  return filename;
};

//================================================================
// Ordered list of unique elements, for storing dependencies

var OrderedSet = function(list) {
  this._members = this.list = [];
  this._index = {};
  if (!list) return;

  for (var i = 0, n = list.length; i < n; i++)
    this.push(list[i]);
};

OrderedSet.prototype.push = function(item) {
  var key   = (item.id !== undefined) ? item.id : item,
      index = this._index;

  if (index.hasOwnProperty(key)) return;
  index[key] = this._members.length;
  this._members.push(item);
};

//================================================================
// Wrapper for deferred values

var Deferred = Package.Deferred = function() {
  this._status    = 'deferred';
  this._value     = null;
  this._callbacks = [];
};

Deferred.prototype.callback = function(callback, context) {
  if (this._status === 'succeeded') callback.call(context, this._value);
  else this._callbacks.push([callback, context]);
};

Deferred.prototype.succeed = function(value) {
  this._status = 'succeeded';
  this._value  = value;
  var callback;
  while (callback = this._callbacks.shift())
    callback[0].call(callback[1], value);
};

//================================================================
// Environment settings

Package.ENV = exports.ENV = global;

Package.onerror = function(e) { throw e };

Package._throw = function(message) {
  Package.onerror(new Error(message));
};


//================================================================
// Configuration methods, called by the DSL

var instance = Package.prototype,

    methods = [['requires', '_deps'],
               ['uses',     '_uses']],

    i = methods.length;

while (i--)
  (function(pair) {
    var method = pair[0], list = pair[1];
    instance[method] = function() {
      var n = arguments.length, i;
      for (i = 0; i < n; i++) this[list].push(arguments[i]);
      return this;
    };
  })(methods[i]);

instance.provides = function() {
  var n = arguments.length, i;
  for (i = 0; i < n; i++) {
    this._names.push(arguments[i]);
    Package._getFromCache(arguments[i]).pkg = this;
  }
  return this;
};

instance.styling = function() {
  for (var i = 0, n = arguments.length; i < n; i++)
    this._styles.push(resolve(arguments[i]));
};

instance.setup = function(block) {
  this._onload = block;
  return this;
};

//================================================================
// Event dispatchers, for communication between packages

instance._on = function(eventType, block, context) {
  if (this._events[eventType]) return block.call(context);
  var list = this._observers[eventType] = this._observers[eventType] || [];
  list.push([block, context]);
  this._load();
};

instance._fire = function(eventType) {
  if (this._events[eventType]) return false;
  this._events[eventType] = true;

  var list = this._observers[eventType];
  if (!list) return true;
  delete this._observers[eventType];

  for (var i = 0, n = list.length; i < n; i++)
    list[i][0].call(list[i][1]);

  return true;
};

//================================================================
// Loading frontend and other miscellany

instance._isLoaded = function(withExceptions) {
  if (!withExceptions && this.__isLoaded !== undefined) return this.__isLoaded;

  var names = this._names.list,
      i     = names.length,
      name, object;

  while (i--) { name = names[i];
    object = Package._getObject(name, this._exports);
    if (object !== undefined) continue;
    if (withExceptions)
      return Package._throw('Expected package at ' + this._loader + ' to define ' + name);
    else
      return this.__isLoaded = false;
  }
  return this.__isLoaded = true;
};

instance._load = function() {
  if (!this._fire('request')) return;
  if (!this._isLoaded()) this._prefetch();

  var allDeps = this._deps.list.concat(this._uses.list),
      source  = this._source || [],
      n       = (this._loader || {}).length,
      self    = this;

  Package.when({load: allDeps});

  Package.when({complete: this._deps.list}, function() {
    Package.when({complete: allDeps, load: [this]}, function() {
      this._fire('complete');
    }, this);

    var loadNext = function(exports) {
      if (n === 0) return fireOnLoad(exports);
      n -= 1;
      var index = self._loader.length - n - 1;
      Package.loader.loadFile(self._loader[index], loadNext, source[index]);
    };

    var fireOnLoad = function(exports) {
      self._exports = exports;
      if (self._onload) self._onload();
      self._isLoaded(true);
      self._fire('load');
    };

    if (this._isLoaded()) {
      this._fire('download');
      return this._fire('load');
    }

    if (this._loader === undefined)
      return Package._throw('No load path found for ' + this._names.list[0]);

    if (typeof this._loader === 'function')
      this._loader(fireOnLoad);
    else
      loadNext();

    if (!Package.loader.loadStyle) return;

    var styles = this._styles.list,
        i      = styles.length;

    while (i--) Package.loader.loadStyle(styles[i]);

    this._fire('download');
  }, this);
};

instance._prefetch = function() {
  if (this._source || !(this._loader instanceof Array) || !Package.loader.fetch)
    return;

  this._source = [];

  for (var i = 0, n = this._loader.length; i < n; i++)
    this._source[i] = Package.loader.fetch(this._loader[i]);
};

instance.toString = function() {
  return 'Package:' + this._names.list.join(',');
};

//================================================================
// Class-level event API, handles group listeners

Package.when = function(eventTable, block, context) {
  var eventList = [], objects = {}, event, packages, i;
  for (event in eventTable) {
    if (!eventTable.hasOwnProperty(event)) continue;
    objects[event] = [];
    packages = new OrderedSet(eventTable[event]);
    i = packages.list.length;
    while (i--) eventList.push([event, packages.list[i], i]);
  }

  var waiting = i = eventList.length;
  if (waiting === 0) return block && block.call(context, objects);

  while (i--)
    (function(event) {
      var pkg = Package._getByName(event[1]);
      pkg._on(event[0], function() {
        objects[event[0]][event[2]] = Package._getObject(event[1], pkg._exports);
        waiting -= 1;
        if (waiting === 0 && block) block.call(context, objects);
      });
    })(eventList[i]);
};

//================================================================
// Indexes for fast lookup by path and name, and assigning IDs

var globalPackage = (global.JS || {}).Package || {};

Package._autoIncrement = globalPackage._autoIncrement || 1;
Package._indexByPath   = globalPackage._indexByPath   || {};
Package._indexByName   = globalPackage._indexByName   || {};
Package._autoloaders   = globalPackage._autoloaders   || [];

Package._index = function(pkg) {
  pkg.id = this._autoIncrement;
  this._autoIncrement += 1;
};

Package._getByPath = function(loader) {
  var path = loader.toString(),
      pkg  = this._indexByPath[path];

  if (pkg) return pkg;

  if (typeof loader === 'string')
    loader = [].slice.call(arguments);

  pkg = this._indexByPath[path] = new this(loader);
  return pkg;
};

Package._getByName = function(name) {
  if (typeof name !== 'string') return name;
  var cached = this._getFromCache(name);
  if (cached.pkg) return cached.pkg;

  var autoloaded = this._manufacture(name);
  if (autoloaded) return autoloaded;

  var placeholder = new this();
  placeholder.provides(name);
  return placeholder;
};

Package.remove = function(name) {
  var pkg = this._getByName(name);
  delete this._indexByName[name];
  delete this._indexByPath[pkg._loader];
};

//================================================================
// Auotloading API, generates packages from naming patterns

Package._autoload = function(pattern, options) {
  this._autoloaders.push([pattern, options]);
};

Package._manufacture = function(name) {
  var autoloaders = this._autoloaders,
      n = autoloaders.length,
      i, j, autoloader, path;

  for (i = 0; i < n; i++) {
    autoloader = autoloaders[i];
    if (!autoloader[0].test(name)) continue;

    path = autoloader[1].from;
    if (typeof path === 'string') path = this._convertNameToPath(path);

    var pkg = new this([path(name)]);
    pkg.provides(name);

    if (path = autoloader[1].require) {
      path = [].concat(path);
      j = path.length;
      while (j--) pkg.requires(name.replace(autoloader[0], path[j]));
    }

    return pkg;
  }
  return null;
};

Package._convertNameToPath = function(from) {
  return function(name) {
    return from.replace(/\/?$/, '/') +
           name.replace(/([a-z])([A-Z])/g, function(m,a,b) { return a + '_' + b })
               .replace(/\./g, '/')
               .toLowerCase() + '.js';
  };
};

//================================================================
// Cache for named packages and runtime objects

Package._getFromCache = function(name) {
  return this._indexByName[name] = this._indexByName[name] || {};
};

Package._getObject = function(name, rootObject) {
  if (typeof name !== 'string') return undefined;

  var cached = rootObject ? {} : this._getFromCache(name);
  if (cached.obj !== undefined) return cached.obj;

  var object = rootObject || this.ENV,
      parts  = name.split('.'), part;

  while (part = parts.shift()) object = object && object[part];

  if (rootObject && object === undefined)
    return this._getObject(name);

  return cached.obj = object;
};

Package.CommonJSLoader = {
  usable: function() {
    return typeof require === 'function' &&
           typeof exports === 'object';
  },

  __FILE__: function() {
    return this._currentPath;
  },

  loadFile: function(path, fireCallbacks) {
    var file, module;

    if (typeof process !== 'undefined') {
      module = path.replace(/\.[^\.]+$/g, '');
      file   = require('path').resolve(module);
    }
    else if (typeof phantom !== 'undefined') {
      file = phantom.libraryPath.replace(/\/$/, '') + '/' +
             path.replace(/^\//, '');
    }

    this._currentPath = file + '.js';
    var module = require(file);
    fireCallbacks(module);

    return module;
  }
};

Package.BrowserLoader = {
  HOST_REGEX: /^(https?\:)?\/\/[^\/]+/i,

  usable: function() {
    return !!Package._getObject('window.document.getElementsByTagName') &&
           typeof phantom === 'undefined';
  },

  __FILE__: function() {
    var scripts = document.getElementsByTagName('script'),
        src     = scripts[scripts.length - 1].src,
        url     = window.location.href;

    if (/^\w+\:\/+/.test(src)) return src;
    if (/^\//.test(src)) return window.location.origin + src;
    return url.replace(/[^\/]*$/g, '') + src;
  },

  cacheBust: function(path) {
    if (exports.cache !== false) return path;
    var token = new JS.Date().getTime();
    return path + (/\?/.test(path) ? '&' : '?') + token;
  },

  fetch: function(path) {
    var originalPath = path;
    path = this.cacheBust(path);

    this.HOST = this.HOST || this.HOST_REGEX.exec(window.location.href);
    var host = this.HOST_REGEX.exec(path);

    if (!this.HOST || (host && host[0] !== this.HOST[0])) return null;
    Package.log('[FETCH] ' + path);

    var source = new Package.Deferred(),
        self   = this,
        xhr    = window.ActiveXObject
               ? new ActiveXObject('Microsoft.XMLHTTP')
               : new XMLHttpRequest();

    xhr.open('GET', path, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      xhr.onreadystatechange = self._K;
      source.succeed(xhr.responseText + '\n//@ sourceURL=' + originalPath);
      xhr = null;
    };
    xhr.send(null);
    return source;
  },

  loadFile: function(path, fireCallbacks, source) {
    if (!source) path = this.cacheBust(path);

    var self   = this,
        head   = document.getElementsByTagName('head')[0],
        script = document.createElement('script');

    script.type = 'text/javascript';

    if (source)
      return source.callback(function(code) {
        Package.log('[EXEC]  ' + path);
        var execute = new Function('code', 'eval(code)');
        execute(code);
        fireCallbacks();
      });

    Package.log('[LOAD] ' + path);
    script.src = path;

    script.onload = script.onreadystatechange = function() {
      var state = script.readyState, status = script.status;
      if ( !state || state === 'loaded' || state === 'complete' ||
           (state === 4 && status === 200) ) {
        fireCallbacks();
        script.onload = script.onreadystatechange = self._K;
        head   = null;
        script = null;
      }
    };
    head.appendChild(script);
  },

  loadStyle: function(path) {
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = this.cacheBust(path);

    document.getElementsByTagName('head')[0].appendChild(link);
  },

  _K: function() {}
};

Package.RhinoLoader = {
  usable: function() {
    return typeof java === 'object' &&
           typeof require === 'function';
  },

  __FILE__: function() {
    return this._currentPath;
  },

  loadFile: function(path, fireCallbacks) {
    var cwd    = java.lang.System.getProperty('user.dir'),
        module = path.replace(/\.[^\.]+$/g, '');

    var requirePath = new java.io.File(cwd, module).toString();
    this._currentPath = requirePath + '.js';
    var module = require(requirePath);
    fireCallbacks(module);

    return module;
  }
};

Package.ServerLoader = {
  usable: function() {
    return typeof Package._getObject('load') === 'function' &&
           typeof Package._getObject('version') === 'function';
  },

  __FILE__: function() {
    return this._currentPath;
  },

  loadFile: function(path, fireCallbacks) {
    this._currentPath = path;
    load(path);
    fireCallbacks();
  }
};

Package.WshLoader = {
  usable: function() {
    return !!Package._getObject('ActiveXObject') &&
           !!Package._getObject('WScript');
  },

  __FILE__: function() {
    return this._currentPath;
  },

  loadFile: function(path, fireCallbacks) {
    this._currentPath = path;
    var fso = new ActiveXObject('Scripting.FileSystemObject'), file, runner;
    try {
      file   = fso.OpenTextFile(path);
      runner = function() { eval(file.ReadAll()) };
      runner();
      fireCallbacks();
    } finally {
      try { if (file) file.Close() } catch (e) {}
    }
  }
};

Package.XULRunnerLoader = {
  jsloader:   '@mozilla.org/moz/jssubscript-loader;1',
  cssservice: '@mozilla.org/content/style-sheet-service;1',
  ioservice:  '@mozilla.org/network/io-service;1',

  usable: function() {
    try {
      var CC = (Components || {}).classes;
      return !!(CC && CC[this.jsloader] && CC[this.jsloader].getService);
    } catch(e) {
      return false;
    }
  },

  setup: function() {
    var Cc = Components.classes, Ci = Components.interfaces;
    this.ssl = Cc[this.jsloader].getService(Ci.mozIJSSubScriptLoader);
    this.sss = Cc[this.cssservice].getService(Ci.nsIStyleSheetService);
    this.ios = Cc[this.ioservice].getService(Ci.nsIIOService);
  },

  loadFile: function(path, fireCallbacks) {
    Package.log('[LOAD] ' + path);

    this.ssl.loadSubScript(path);
    fireCallbacks();
  },

  loadStyle: function(path) {
    var uri = this.ios.newURI(path, null, null);
    this.sss.loadAndRegisterSheet(uri, this.sss.USER_SHEET);
  }
};

var candidates = [  Package.XULRunnerLoader,
                    Package.RhinoLoader,
                    Package.BrowserLoader,
                    Package.CommonJSLoader,
                    Package.ServerLoader,
                    Package.WshLoader ],

    n = candidates.length,
    i, candidate;

for (i = 0; i < n; i++) {
  candidate = candidates[i];
  if (candidate.usable()) {
    Package.loader = candidate;
    if (candidate.setup) candidate.setup();
    break;
  }
}

var DSL = {
  __FILE__: function() {
    return Package.loader.__FILE__();
  },

  pkg: function(name, path) {
    var pkg = path
        ? Package._getByPath(path)
        : Package._getByName(name);
    pkg.provides(name);
    return pkg;
  },

  file: function(filename) {
    var files = [], i = arguments.length;
    while (i--) files[i] = resolve(arguments[i]);
    return Package._getByPath.apply(Package, files);
  },

  load: function(path, fireCallbacks) {
    Package.loader.loadFile(path, fireCallbacks);
  },

  autoload: function(pattern, options) {
    Package._autoload(pattern, options);
  }
};

DSL.files  = DSL.file;
DSL.loader = DSL.file;

var packages = function(declaration) {
  declaration.call(DSL);
};

var parseLoadArgs = function(args) {
 var files = [], i = 0;

  while (typeof args[i] === 'string'){
    files.push(args[i]);
    i += 1;
  }

  return {files: files, callback: args[i], context: args[i+1]};
};

exports.load = function(path, callback) {
  var args = parseLoadArgs(arguments),
      n    = args.files.length;

  var loadNext = function(index) {
    if (index === n) return args.callback.call(args.context);
    Package.loader.loadFile(args.files[index], function() {
      loadNext(index + 1);
    });
  };
  loadNext(0);
};

exports.require = function() {
  var args = parseLoadArgs(arguments);

  Package.when({complete: args.files}, function(objects) {
    if (!args.callback) return;
    args.callback.apply(args.context, objects && objects.complete);
  });

  return this;
};

exports.Package  = Package;
exports.Packages = exports.packages = packages;
exports.DSL      = DSL;
});

var JS = (typeof this.JS === 'undefined') ? {} : this.JS;

(function(factory) {
  var $ = (typeof this.global === 'object') ? this.global : this,
      E = (typeof exports === 'object');

  if (E) {
    exports.JS = exports;
    JS = exports;
  } else {
    $.JS = JS;
  }
  factory($, JS);

})(function(global, exports) {
'use strict';

var JS = {ENV: global};

JS.END_WITHOUT_DOT = /([^\.])$/;

JS.array = function(enumerable) {
  var array = [], i = enumerable.length;
  while (i--) array[i] = enumerable[i];
  return array;
};

JS.bind = function(method, object) {
  return function() {
    return method.apply(object, arguments);
  };
};

JS.Date = JS.ENV.Date;

JS.extend = function(destination, source, overwrite) {
  if (!destination || !source) return destination;
  for (var field in source) {
    if (destination[field] === source[field]) continue;
    if (overwrite === false && destination.hasOwnProperty(field)) continue;
    destination[field] = source[field];
  }
  return destination;
};

JS.indexOf = function(list, item) {
  if (list.indexOf) return list.indexOf(item);
  var i = list.length;
  while (i--) {
    if (list[i] === item) return i;
  }
  return -1;
};

JS.isType = function(object, type) {
  if (typeof type === 'string')
    return typeof object === type;

  if (object === null || object === undefined)
    return false;

  return (typeof type === 'function' && object instanceof type) ||
         (object.isA && object.isA(type)) ||
         object.constructor === type;
};

JS.makeBridge = function(parent) {
  var bridge = function() {};
  bridge.prototype = parent.prototype;
  return new bridge();
};

JS.makeClass = function(parent) {
  parent = parent || Object;

  var constructor = function() {
    return this.initialize
         ? this.initialize.apply(this, arguments) || this
         : this;
  };
  constructor.prototype = JS.makeBridge(parent);

  constructor.superclass = parent;

  constructor.subclasses = [];
  if (parent.subclasses) parent.subclasses.push(constructor);

  return constructor;
};

JS.match = function(category, object) {
  if (object === undefined) return false;
  return typeof category.test === 'function'
       ? category.test(object)
       : category.match(object);
};

JS.Method = JS.makeClass();

JS.extend(JS.Method.prototype, {
  initialize: function(module, name, callable) {
    this.module   = module;
    this.name     = name;
    this.callable = callable;

    this._words = {};
    if (typeof callable !== 'function') return;

    this.arity  = callable.length;

    var matches = callable.toString().match(/\b[a-z\_\$][a-z0-9\_\$]*\b/ig),
        i       = matches.length;

    while (i--) this._words[matches[i]] = true;
  },

  setName: function(name) {
    this.callable.displayName =
    this.displayName = name;
  },

  contains: function(word) {
    return this._words.hasOwnProperty(word);
  },

  call: function() {
    return this.callable.call.apply(this.callable, arguments);
  },

  apply: function(receiver, args) {
    return this.callable.apply(receiver, args);
  },

  compile: function(environment) {
    var method     = this,
        trace      = method.module.__trace__ || environment.__trace__,
        callable   = method.callable,
        words      = method._words,
        allWords   = JS.Method._keywords,
        i          = allWords.length,
        keywords   = [],
        keyword;

    while  (i--) {
      keyword = allWords[i];
      if (words[keyword.name]) keywords.push(keyword);
    }
    if (keywords.length === 0 && !trace) return callable;

    var compiled = function() {
      var N = keywords.length, j = N, previous = {}, keyword, existing, kwd;

      while (j--) {
        keyword  = keywords[j];
        existing = this[keyword.name];

        if (existing && !existing.__kwd__) continue;

        previous[keyword.name] = {
          _value: existing,
          _own:   this.hasOwnProperty(keyword.name)
        };
        kwd = keyword.filter(method, environment, this, arguments);
        if (kwd) kwd.__kwd__ = true;
        this[keyword.name] = kwd;
      }
      var returnValue = callable.apply(this, arguments),
          j = N;

      while (j--) {
        keyword = keywords[j];
        if (!previous[keyword.name]) continue;
        if (previous[keyword.name]._own)
          this[keyword.name] = previous[keyword.name]._value;
        else
          delete this[keyword.name];
      }
      return returnValue;
    };

    var StackTrace = trace && (exports.StackTrace || require('./stack_trace').StackTrace);
    if (trace) return StackTrace.wrap(compiled, method, environment);
    return compiled;
  },

  toString: function() {
    var name = this.displayName || (this.module.toString() + '#' + this.name);
    return '#<Method:' + name + '>';
  }
});

JS.Method.create = function(module, name, callable) {
  if (callable && callable.__inc__ && callable.__fns__)
    return callable;

  var method = (typeof callable !== 'function')
             ? callable
             : new this(module, name, callable);

  this.notify(method);
  return method;
};

JS.Method.compile = function(method, environment) {
  return (method instanceof this)
      ? method.compile(environment)
      : method;
};

JS.Method.__listeners__ = [];

JS.Method.added = function(block, context) {
  this.__listeners__.push([block, context]);
};

JS.Method.notify = function(method) {
  var listeners = this.__listeners__,
      i = listeners.length,
      listener;

  while (i--) {
    listener = listeners[i];
    listener[0].call(listener[1], method);
  }
};

JS.Method._keywords = [];

JS.Method.keyword = function(name, filter) {
  this._keywords.push({name: name, filter: filter});
};

JS.Method.tracing = function(classes, block, context) {
  var pkg = exports.require ? exports : require('./loader');
  pkg.require('JS.StackTrace', function(StackTrace) {
    var logger = StackTrace.logger,
        active = logger.active;

    classes = [].concat(classes);
    this.trace(classes);
    logger.active = true;
    block.call(context);

    this.untrace(classes);
    logger.active = active;
  }, this);
};

JS.Method.trace = function(classes) {
  var i = classes.length;
  while (i--) {
    classes[i].__trace__ = true;
    classes[i].resolve();
  }
};

JS.Method.untrace = function(classes) {
  var i = classes.length;
  while (i--) {
    classes[i].__trace__ = false;
    classes[i].resolve();
  }
};

JS.Module = JS.makeClass();
JS.Module.__queue__ = [];

JS.extend(JS.Module.prototype, {
  initialize: function(name, methods, options) {
    if (typeof name !== 'string') {
      options = arguments[1];
      methods = arguments[0];
      name    = undefined;
    }
    options = options || {};

    this.__inc__ = [];
    this.__dep__ = [];
    this.__fns__ = {};
    this.__tgt__ = options._target;
    this.__anc__ = null;
    this.__mct__ = {};

    this.setName(name);
    this.include(methods, {_resolve: false});

    if (JS.Module.__queue__)
      JS.Module.__queue__.push(this);
  },

  setName: function(name) {
    this.displayName = name || '';

    for (var field in this.__fns__)
      this.__name__(field);

    if (name && this.__meta__)
      this.__meta__.setName(name + '.');
  },

  __name__: function(name) {
    if (!this.displayName) return;

    var object = this.__fns__[name];
    if (!object) return;

    name = this.displayName.replace(JS.END_WITHOUT_DOT, '$1#') + name;
    if (typeof object.setName === 'function') return object.setName(name);
    if (typeof object === 'function') object.displayName = name;
  },

  define: function(name, callable, options) {
    var method  = JS.Method.create(this, name, callable),
        resolve = (options || {})._resolve;

    this.__fns__[name] = method;
    this.__name__(name);
    if (resolve !== false) this.resolve();
  },

  include: function(module, options) {
    if (!module) return this;

    var options = options || {},
        resolve = options._resolve !== false,
        extend  = module.extend,
        include = module.include,
        extended, field, value, mixins, i, n;

    if (module.__fns__ && module.__inc__) {
      this.__inc__.push(module);
      if ((module.__dep__ || {}).push) module.__dep__.push(this);

      if (extended = options._extended) {
        if (typeof module.extended === 'function')
          module.extended(extended);
      }
      else {
        if (typeof module.included === 'function')
          module.included(this);
      }
    }
    else {
      if (this.shouldIgnore('extend', extend)) {
        mixins = [].concat(extend);
        for (i = 0, n = mixins.length; i < n; i++)
          this.extend(mixins[i]);
      }
      if (this.shouldIgnore('include', include)) {
        mixins = [].concat(include);
        for (i = 0, n = mixins.length; i < n; i++)
          this.include(mixins[i], {_resolve: false});
      }
      for (field in module) {
        if (!module.hasOwnProperty(field)) continue;
        value = module[field];
        if (this.shouldIgnore(field, value)) continue;
        this.define(field, value, {_resolve: false});
      }
      if (module.hasOwnProperty('toString'))
        this.define('toString', module.toString, {_resolve: false});
    }

    if (resolve) this.resolve();
    return this;
  },

  alias: function(aliases) {
    for (var method in aliases) {
      if (!aliases.hasOwnProperty(method)) continue;
      this.define(method, this.instanceMethod(aliases[method]), {_resolve: false});
    }
    this.resolve();
  },

  resolve: function(host) {
    var host   = host || this,
        target = host.__tgt__,
        inc    = this.__inc__,
        fns    = this.__fns__,
        i, n, key, compiled;

    if (host === this) {
      this.__anc__ = null;
      this.__mct__ = {};
      i = this.__dep__.length;
      while (i--) this.__dep__[i].resolve();
    }

    if (!target) return;

    for (i = 0, n = inc.length; i < n; i++)
      inc[i].resolve(host);

    for (key in fns) {
      compiled = JS.Method.compile(fns[key], host);
      if (target[key] !== compiled) target[key] = compiled;
    }
    if (fns.hasOwnProperty('toString'))
      target.toString = JS.Method.compile(fns.toString, host);
  },

  shouldIgnore: function(field, value) {
    return (field === 'extend' || field === 'include') &&
           (typeof value !== 'function' ||
             (value.__fns__ && value.__inc__));
  },

  ancestors: function(list) {
    var cachable = !list,
        list     = list || [],
        inc      = this.__inc__;

    if (cachable && this.__anc__) return this.__anc__.slice();

    for (var i = 0, n = inc.length; i < n; i++)
      inc[i].ancestors(list);

    if (JS.indexOf(list, this) < 0)
      list.push(this);

    if (cachable) this.__anc__ = list.slice();
    return list;
  },

  lookup: function(name) {
    var cached = this.__mct__[name];
    if (cached && cached.slice) return cached.slice();

    var ancestors = this.ancestors(),
        methods   = [],
        fns;

    for (var i = 0, n = ancestors.length; i < n; i++) {
      fns = ancestors[i].__fns__;
      if (fns.hasOwnProperty(name)) methods.push(fns[name]);
    }
    this.__mct__[name] = methods.slice();
    return methods;
  },

  includes: function(module) {
    if (module === this) return true;

    var inc  = this.__inc__;

    for (var i = 0, n = inc.length; i < n; i++) {
      if (inc[i].includes(module))
        return true;
    }
    return false;
  },

  instanceMethod: function(name) {
    return this.lookup(name).pop();
  },

  instanceMethods: function(recursive, list) {
    var methods = list || [],
        fns     = this.__fns__,
        field;

    for (field in fns) {
      if (!JS.isType(this.__fns__[field], JS.Method)) continue;
      if (JS.indexOf(methods, field) >= 0) continue;
      methods.push(field);
    }

    if (recursive !== false) {
      var ancestors = this.ancestors(), i = ancestors.length;
      while (i--) ancestors[i].instanceMethods(false, methods);
    }
    return methods;
  },

  match: function(object) {
    return object && object.isA && object.isA(this);
  },

  toString: function() {
    return this.displayName;
  }
});

JS.Kernel = new JS.Module('Kernel', {
  __eigen__: function() {
    if (this.__meta__) return this.__meta__;
    var name = this.toString() + '.';
    this.__meta__ = new JS.Module(name, null, {_target: this});
    return this.__meta__.include(this.klass, {_resolve: false});
  },

  equals: function(other) {
    return this === other;
  },

  extend: function(module, options) {
    var resolve = (options || {})._resolve;
    this.__eigen__().include(module, {_extended: this, _resolve: resolve});
    return this;
  },

  hash: function() {
    return JS.Kernel.hashFor(this);
  },

  isA: function(module) {
    return (typeof module === 'function' && this instanceof module) ||
           this.__eigen__().includes(module);
  },

  method: function(name) {
    var cache = this.__mct__ = this.__mct__ || {},
        value = cache[name],
        field = this[name];

    if (typeof field !== 'function') return field;
    if (value && field === value._value) return value._bound;

    var bound = JS.bind(field, this);
    cache[name] = {_value: field, _bound: bound};
    return bound;
  },

  methods: function() {
    return this.__eigen__().instanceMethods();
  },

  tap: function(block, context) {
    block.call(context, this);
    return this;
  },

  toString: function() {
    if (this.displayName) return this.displayName;
    var name = this.klass.displayName || this.klass.toString();
    return '#<' + name + ':' + this.hash() + '>';
  }
});

(function() {
  var id = 1;

  JS.Kernel.hashFor = function(object) {
    if (object.__hash__ !== undefined) return object.__hash__;
    object.__hash__ = (new JS.Date().getTime() + id).toString(16);
    id += 1;
    return object.__hash__;
  };
})();

JS.Class = JS.makeClass(JS.Module);

JS.extend(JS.Class.prototype, {
  initialize: function(name, parent, methods, options) {
    if (typeof name !== 'string') {
      options = arguments[2];
      methods = arguments[1];
      parent  = arguments[0];
      name    = undefined;
    }
    if (typeof parent !== 'function') {
      options = methods;
      methods = parent;
      parent  = Object;
    }
    JS.Module.prototype.initialize.call(this, name);
    options = options || {};

    var klass = JS.makeClass(parent);
    JS.extend(klass, this);

    klass.prototype.constructor =
    klass.prototype.klass = klass;

    klass.__eigen__().include(parent.__meta__, {_resolve: options._resolve});
    klass.setName(name);

    klass.__tgt__ = klass.prototype;

    var parentModule = (parent === Object)
                     ? {}
                     : (parent.__fns__ ? parent : new JS.Module(parent.prototype, {_resolve: false}));

    klass.include(JS.Kernel,    {_resolve: false})
         .include(parentModule, {_resolve: false})
         .include(methods,      {_resolve: false});

    if (options._resolve !== false) klass.resolve();

    if (typeof parent.inherited === 'function')
      parent.inherited(klass);

    return klass;
  }
});

(function() {
  var methodsFromPrototype = function(klass) {
    var methods = {},
        proto   = klass.prototype;

    for (var field in proto) {
      if (!proto.hasOwnProperty(field)) continue;
      methods[field] = JS.Method.create(klass, field, proto[field]);
    }
    return methods;
  };

  var classify = function(name, parentName) {
    var klass  = JS[name],
        parent = JS[parentName];

    klass.__inc__ = [];
    klass.__dep__ = [];
    klass.__fns__ = methodsFromPrototype(klass);
    klass.__tgt__ = klass.prototype;

    klass.prototype.constructor =
    klass.prototype.klass = klass;

    JS.extend(klass, JS.Class.prototype);
    klass.include(parent || JS.Kernel);
    klass.setName(name);

    klass.constructor = klass.klass = JS.Class;
  };

  classify('Method');
  classify('Module');
  classify('Class', 'Module');

  var eigen = JS.Kernel.instanceMethod('__eigen__');

  eigen.call(JS.Method).resolve();
  eigen.call(JS.Module).resolve();
  eigen.call(JS.Class).include(JS.Module.__meta__);
})();

JS.NotImplementedError = new JS.Class('NotImplementedError', Error);

JS.Method.keyword('callSuper', function(method, env, receiver, args) {
  var methods    = env.lookup(method.name),
      stackIndex = methods.length - 1,
      params     = JS.array(args);

  if (stackIndex === 0) return undefined;

  var _super = function() {
    var i = arguments.length;
    while (i--) params[i] = arguments[i];

    stackIndex -= 1;
    if (stackIndex === 0) delete receiver.callSuper;
    var returnValue = methods[stackIndex].apply(receiver, params);
    receiver.callSuper = _super;
    stackIndex += 1;

    return returnValue;
  };

  return _super;
});

JS.Method.keyword('blockGiven', function(method, env, receiver, args) {
  var block = Array.prototype.slice.call(args, method.arity),
      hasBlock = (typeof block[0] === 'function');

  return function() { return hasBlock };
});

JS.Method.keyword('yieldWith', function(method, env, receiver, args) {
  var block = Array.prototype.slice.call(args, method.arity);

  return function() {
    if (typeof block[0] !== 'function') return;
    return block[0].apply(block[1] || null, arguments);
  };
});

JS.Interface = new JS.Class('Interface', {
  initialize: function(methods) {
    this.test = function(object, returnName) {
      var n = methods.length;
      while (n--) {
        if (typeof object[methods[n]] !== 'function')
          return returnName ? methods[n] : false;
      }
      return true;
    };
  },

  extend: {
    ensure: function() {
      var args = JS.array(arguments), object = args.shift(), face, result;
      while (face = args.shift()) {
        result = face.test(object, true);
        if (result !== true) throw new Error('object does not implement ' + result + '()');
      }
    }
  }
});

JS.Singleton = new JS.Class('Singleton', {
  initialize: function(name, parent, methods) {
    return new (new JS.Class(name, parent, methods));
  }
});

JS.extend(exports, JS);
if (global.JS) JS.extend(global.JS, JS);
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS;

  if (E) exports.JS = exports;
  factory(js, E ? exports : js);

})(function(JS, exports) {
'use strict';

var Enumerable = new JS.Module('Enumerable', {
  extend: {
    ALL_EQUAL: {},

    forEach: function(block, context) {
      if (!block) return new Enumerator(this, 'forEach');
      for (var i = 0; i < this.length; i++)
        block.call(context, this[i]);
      return this;
    },

    isComparable: function(list) {
      return list.all(function(item) { return typeof item.compareTo === 'function' });
    },

    areEqual: function(expected, actual) {
      var result;

      if (expected === actual)
        return true;

      if (expected && typeof expected.equals === 'function')
        return expected.equals(actual);

      if (expected instanceof Function)
        return expected === actual;

      if (expected instanceof Array) {
        if (!(actual instanceof Array)) return false;
        for (var i = 0, n = expected.length; i < n; i++) {
          result = this.areEqual(expected[i], actual[i]);
          if (result === this.ALL_EQUAL) return true;
          if (!result) return false;
        }
        if (expected.length !== actual.length) return false;
        return true;
      }

      if (expected instanceof Date) {
        if (!(actual instanceof Date)) return false;
        if (expected.getTime() !== actual.getTime()) return false;
        return true;
      }

      if (expected instanceof Object) {
        if (!(actual instanceof Object)) return false;
        if (this.objectSize(expected) !== this.objectSize(actual)) return false;
        for (var key in expected) {
          if (!this.areEqual(expected[key], actual[key]))
            return false;
        }
        return true;
      }

      return false;
    },

    objectKeys: function(object, includeProto) {
      var keys = [];
      for (var key in object) {
        if (object.hasOwnProperty(key) || includeProto !== false)
          keys.push(key);
      }
      return keys;
    },

    objectSize: function(object) {
      return this.objectKeys(object).length;
    },

    Collection: new JS.Class({
      initialize: function(array) {
        this.length = 0;
        if (array) Enumerable.forEach.call(array, this.push, this);
      },

      push: function(item) {
        Array.prototype.push.call(this, item);
      },

      clear: function() {
        var i = this.length;
        while (i--) delete this[i];
        this.length = 0;
      }
    })
  },

  all: function(block, context) {
    block = Enumerable.toFn(block);
    var truth = true;
    this.forEach(function(item) {
      truth = truth && (block ? block.apply(context, arguments) : item);
    });
    return !!truth;
  },

  any: function(block, context) {
    block = Enumerable.toFn(block);
    var truth = false;
    this.forEach(function(item) {
      truth = truth || (block ? block.apply(context, arguments) : item);
    });
    return !!truth;
  },

  chunk: function(block, context) {
    if (!block) return this.enumFor('chunk');

    var result  = [],
        value   = null,
        started = false;

    this.forEach(function(item) {
      var v = block.apply(context, arguments);
      if (started) {
        if (Enumerable.areEqual(value, v))
          result[result.length - 1][1].push(item);
        else
          result.push([v, [item]]);
      } else {
        result.push([v, [item]]);
        started = true;
      }
      value = v;
    });
    return result;
  },

  count: function(block, context) {
    if (typeof this.size === 'function') return this.size();
    var count = 0, object = block;

    if (block && typeof block !== 'function')
      block = function(x) { return Enumerable.areEqual(x, object) };

    this.forEach(function() {
      if (!block || block.apply(context, arguments))
        count += 1;
    });
    return count;
  },

  cycle: function(n, block, context) {
    if (!block) return this.enumFor('cycle', n);
    block = Enumerable.toFn(block);
    while (n--) this.forEach(block, context);
  },

  drop: function(n) {
    var entries = [];
    this.forEachWithIndex(function(item, i) {
      if (i >= n) entries.push(item);
    });
    return entries;
  },

  dropWhile: function(block, context) {
    if (!block) return this.enumFor('dropWhile');
    block = Enumerable.toFn(block);

    var entries = [],
        drop    = true;

    this.forEach(function(item) {
      if (drop) drop = drop && block.apply(context, arguments);
      if (!drop) entries.push(item);
    });
    return entries;
  },

  forEachCons: function(n, block, context) {
    if (!block) return this.enumFor('forEachCons', n);
    block = Enumerable.toFn(block);

    var entries = this.toArray(),
        size    = entries.length,
        limit   = size - n,
        i;

    for (i = 0; i <= limit; i++)
      block.call(context, entries.slice(i, i+n));

    return this;
  },

  forEachSlice: function(n, block, context) {
    if (!block) return this.enumFor('forEachSlice', n);
    block = Enumerable.toFn(block);

    var entries = this.toArray(),
        size    = entries.length,
        m       = Math.ceil(size/n),
        i;

    for (i = 0; i < m; i++)
      block.call(context, entries.slice(i*n, (i+1)*n));

    return this;
  },

  forEachWithIndex: function(offset, block, context) {
    if (typeof offset === 'function') {
      context = block;
      block   = offset;
      offset  = 0;
    }
    offset = offset || 0;

    if (!block) return this.enumFor('forEachWithIndex', offset);
    block = Enumerable.toFn(block);

    return this.forEach(function(item) {
      var result = block.call(context, item, offset);
      offset += 1;
      return result;
    });
  },

  forEachWithObject: function(object, block, context) {
    if (!block) return this.enumFor('forEachWithObject', object);
    block = Enumerable.toFn(block);

    this.forEach(function() {
      var args = [object].concat(JS.array(arguments));
      block.apply(context, args);
    });
    return object;
  },

  find: function(block, context) {
    if (!block) return this.enumFor('find');
    block = Enumerable.toFn(block);

    var needle = {}, K = needle;
    this.forEach(function(item) {
      if (needle !== K) return;
      needle = block.apply(context, arguments) ? item : needle;
    });
    return needle === K ? null : needle;
  },

  findIndex: function(needle, context) {
    if (needle === undefined) return this.enumFor('findIndex');

    var index = null,
        block = (typeof needle === 'function');

    this.forEachWithIndex(function(item, i) {
      if (index !== null) return;
      if (Enumerable.areEqual(needle, item) || (block && needle.apply(context, arguments)))
        index = i;
    });
    return index;
  },

  first: function(n) {
    var entries = this.toArray();
    return (n === undefined) ? entries[0] : entries.slice(0,n);
  },

  grep: function(pattern, block, context) {
    block = Enumerable.toFn(block);
    var results = [];
    this.forEach(function(item) {
      var match = (typeof pattern.match === 'function') ? pattern.match(item)
                : (typeof pattern.test === 'function')  ? pattern.test(item)
                : JS.isType(item, pattern);

      if (!match) return;
      if (block) item = block.apply(context, arguments);
      results.push(item);
    });
    return results;
  },

  groupBy: function(block, context) {
    if (!block) return this.enumFor('groupBy');
    block = Enumerable.toFn(block);

    var Hash = ((typeof require === 'function') ? require('./hash') : JS).Hash,
        hash = new Hash();

    this.forEach(function(item) {
      var value = block.apply(context, arguments);
      if (!hash.hasKey(value)) hash.store(value, []);
      hash.get(value).push(item);
    });
    return hash;
  },

  inject: function(memo, block, context) {
    var args    = JS.array(arguments),
        counter = 0,
        K       = {};

    switch (args.length) {
      case 1:   memo      = K;
                block     = args[0];
                break;

      case 2:   if (typeof memo === 'function') {
                  memo    = K;
                  block   = args[0];
                  context = args[1];
                }
    }
    block = Enumerable.toFn(block);

    this.forEach(function(item) {
      if (!counter++ && memo === K) return memo = item;
      var args = [memo].concat(JS.array(arguments));
      memo = block.apply(context, args);
    });
    return memo;
  },

  map: function(block, context) {
    if (!block) return this.enumFor('map');
    block = Enumerable.toFn(block);

    var map = [];
    this.forEach(function() {
      map.push(block.apply(context, arguments));
    });
    return map;
  },

  max: function(block, context) {
    return this.minmax(block, context)[1];
  },

  maxBy: function(block, context) {
    if (!block) return this.enumFor('maxBy');
    return this.minmaxBy(block, context)[1];
  },

  member: function(needle) {
    return this.any(function(item) { return Enumerable.areEqual(item, needle) });
  },

  min: function(block, context) {
    return this.minmax(block, context)[0];
  },

  minBy: function(block, context) {
    if (!block) return this.enumFor('minBy');
    return this.minmaxBy(block, context)[0];
  },

  minmax: function(block, context) {
    var list = this.sort(block, context);
    return [list[0], list[list.length - 1]];
  },

  minmaxBy: function(block, context) {
    if (!block) return this.enumFor('minmaxBy');
    var list = this.sortBy(block, context);
    return [list[0], list[list.length - 1]];
  },

  none: function(block, context) {
    return !this.any(block, context);
  },

  one: function(block, context) {
    block = Enumerable.toFn(block);
    var count = 0;
    this.forEach(function(item) {
      if (block ? block.apply(context, arguments) : item) count += 1;
    });
    return count === 1;
  },

  partition: function(block, context) {
    if (!block) return this.enumFor('partition');
    block = Enumerable.toFn(block);

    var ayes = [], noes = [];
    this.forEach(function(item) {
      (block.apply(context, arguments) ? ayes : noes).push(item);
    });
    return [ayes, noes];
  },

  reject: function(block, context) {
    if (!block) return this.enumFor('reject');
    block = Enumerable.toFn(block);

    var map = [];
    this.forEach(function(item) {
      if (!block.apply(context, arguments)) map.push(item);
    });
    return map;
  },

  reverseForEach: function(block, context) {
    if (!block) return this.enumFor('reverseForEach');
    block = Enumerable.toFn(block);

    var entries = this.toArray(),
        n       = entries.length;

    while (n--) block.call(context, entries[n]);
    return this;
  },

  select: function(block, context) {
    if (!block) return this.enumFor('select');
    block = Enumerable.toFn(block);

    var map = [];
    this.forEach(function(item) {
      if (block.apply(context, arguments)) map.push(item);
    });
    return map;
  },

  sort: function(block, context) {
    var comparable = Enumerable.isComparable(this),
        entries    = this.toArray();

    block = block || (comparable
        ? function(a,b) { return a.compareTo(b); }
        : null);
    return block
        ? entries.sort(function(a,b) { return block.call(context, a, b); })
        : entries.sort();
  },

  sortBy: function(block, context) {
    if (!block) return this.enumFor('sortBy');
    block = Enumerable.toFn(block);

    var util       = Enumerable,
        map        = new util.Collection(this.map(block, context)),
        comparable = util.isComparable(map);

    return new util.Collection(map.zip(this).sort(function(a, b) {
      a = a[0]; b = b[0];
      return comparable ? a.compareTo(b) : (a < b ? -1 : (a > b ? 1 : 0));
    })).map(function(item) { return item[1]; });
  },

  take: function(n) {
    var entries = [];
    this.forEachWithIndex(function(item, i) {
      if (i < n) entries.push(item);
    });
    return entries;
  },

  takeWhile: function(block, context) {
    if (!block) return this.enumFor('takeWhile');
    block = Enumerable.toFn(block);

    var entries = [],
        take    = true;
    this.forEach(function(item) {
      if (take) take = take && block.apply(context, arguments);
      if (take) entries.push(item);
    });
    return entries;
  },

  toArray: function() {
    return this.drop(0);
  },

  zip: function() {
    var util    = Enumerable,
        args    = [],
        counter = 0,
        n       = arguments.length,
        block, context;

    if (typeof arguments[n-1] === 'function') {
      block = arguments[n-1]; context = {};
    }
    if (typeof arguments[n-2] === 'function') {
      block = arguments[n-2]; context = arguments[n-1];
    }
    util.forEach.call(arguments, function(arg) {
      if (arg === block || arg === context) return;
      if (arg.toArray) arg = arg.toArray();
      if (JS.isType(arg, Array)) args.push(arg);
    });
    var results = this.map(function(item) {
      var zip = [item];
      util.forEach.call(args, function(arg) {
        zip.push(arg[counter] === undefined ? null : arg[counter]);
      });
      return ++counter && zip;
    });
    if (!block) return results;
    util.forEach.call(results, block, context);
  }
});

// http://developer.mozilla.org/en/docs/index.php?title=Core_JavaScript_1.5_Reference:Global_Objects:Array&oldid=58326
Enumerable.define('forEach', Enumerable.forEach);

Enumerable.alias({
  collect:    'map',
  detect:     'find',
  entries:    'toArray',
  every:      'all',
  findAll:    'select',
  filter:     'select',
  reduce:     'inject',
  some:       'any'
});

Enumerable.extend({
  toFn: function(object) {
    if (!object) return object;
    if (object.toFunction) return object.toFunction();
    if (this.OPS[object]) return this.OPS[object];
    if (JS.isType(object, 'string') || JS.isType(object, String))
    return function() {
        var args   = JS.array(arguments),
            target = args.shift(),
            method = target[object];
        return (typeof method === 'function') ? method.apply(target, args) : method;
      };
    return object;
  },

  OPS: {
    '+':    function(a,b) { return a + b },
    '-':    function(a,b) { return a - b },
    '*':    function(a,b) { return a * b },
    '/':    function(a,b) { return a / b },
    '%':    function(a,b) { return a % b },
    '^':    function(a,b) { return a ^ b },
    '&':    function(a,b) { return a & b },
    '&&':   function(a,b) { return a && b },
    '|':    function(a,b) { return a | b },
    '||':   function(a,b) { return a || b },
    '==':   function(a,b) { return a == b },
    '!=':   function(a,b) { return a != b },
    '>':    function(a,b) { return a > b },
    '>=':   function(a,b) { return a >= b },
    '<':    function(a,b) { return a < b },
    '<=':   function(a,b) { return a <= b },
    '===':  function(a,b) { return a === b },
    '!==':  function(a,b) { return a !== b },
    '[]':   function(a,b) { return a[b] },
    '()':   function(a,b) { return a(b) }
  },

  Enumerator: new JS.Class({
    include: Enumerable,

    extend: {
      DEFAULT_METHOD: 'forEach'
    },

    initialize: function(object, method, args) {
      this._object = object;
      this._method = method || this.klass.DEFAULT_METHOD;
      this._args   = (args || []).slice();
    },

    // this is largely here to support testing since I don't want to make the
    // ivars public
    equals: function(enumerator) {
      return JS.isType(enumerator, this.klass) &&
             this._object === enumerator._object &&
             this._method === enumerator._method &&
             Enumerable.areEqual(this._args, enumerator._args);
          },

          forEach: function(block, context) {
      if (!block) return this;
      var args = this._args.slice();
      args.push(block);
      if (context) args.push(context);
      return this._object[this._method].apply(this._object, args);
    }
  })
});

Enumerable.Enumerator.alias({
  cons:       'forEachCons',
  reverse:    'reverseForEach',
  slice:      'forEachSlice',
  withIndex:  'forEachWithIndex',
  withObject: 'forEachWithObject'
});

Enumerable.Collection.include(Enumerable);

JS.Kernel.include({
  enumFor: function(method) {
    var args   = JS.array(arguments),
        method = args.shift();
    return new Enumerable.Enumerator(this, method, args);
  }
}, {_resolve: false});

JS.Kernel.alias({toEnum: 'enumFor'});

exports.Enumerable = Enumerable;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS,

      Enumerable = js.Enumerable || require('./enumerable').Enumerable;

  if (E) exports.JS = exports;
  factory(js, Enumerable, E ? exports : js);

})(function(JS, Enumerable, exports) {
'use strict';

var Console = new JS.Module('Console', {
  extend: {
    nameOf: function(object, root) {
      var results = [], i, n, field, l;

      if (JS.isType(object, Array)) {
        for (i = 0, n = object.length; i < n; i++)
          results.push(this.nameOf(object[i]));
        return results;
      }

      if (object.displayName) return object.displayName;

      field = [{name: null, o: root || JS.ENV}];
      l = 0;
      while (typeof field === 'object' && l < this.MAX_DEPTH) {
        l += 1;
        field = this.descend(field, object);
      }
      if (typeof field == 'string') {
        field = field.replace(/\.prototype\./g, '#');
        object.displayName = field;
        if (object.__meta__) object.__meta__.displayName = field + '.__meta__';
      }
      return object.displayName;
    },

    descend: function(list, needle) {
      var results = [],
          n       = list.length,
          i       = n,
          key, item, name;

      while (i--) {
        item = list[i];
        if (JS.isType(item.o, Array)) continue;
        name = item.name ? item.name + '.' : '';
        for (key in item.o) {
          if (needle && item.o[key] === needle) return name + key;
          results.push({name: name + key, o: item.o[key]});
        }
      }
      return results;
    },

    convert: function(object, stack) {
      if (object === null || object === undefined) return String(object);
      var E = Enumerable, stack = stack || [], items;

      if (JS.indexOf(stack, object) >= 0) return '#circular';

      if (object instanceof Error) {
        return (typeof object.message === 'string' && !object.message)
             ? object.name
             : object.name + (object.message ? ': ' + object.message : '');
      }

      if (object instanceof Array) {
        stack.push(object);
        items = new E.Collection(object).map(function(item) {
            return this.convert(item, stack);
          }, this).join(', ');
        stack.pop();
        return items ? '[ ' + items + ' ]' : '[]';
      }

      if (object instanceof String || typeof object === 'string')
        return '"' + object + '"';

      if (object instanceof Function)
        return object.displayName ||
               object.name ||
              (object.toString().match(/^\s*function ([^\(]+)\(/) || [])[1] ||
               '#function';

      if (object instanceof Date)
        return object.toGMTString();

      if (object.toString &&
          object.toString !== Object.prototype.toString &&
          !object.toString.__traced__)
        return object.toString();

      if (object.nodeType !== undefined) return object.toString();

      stack.push(object);
      items = new E.Collection(E.objectKeys(object, false).sort()).map(function(key) {
          return this.convert(key, stack) + ': ' + this.convert(object[key], stack);
        }, this).join(', ');
      stack.pop();
      return items ? '{ ' + items + ' }' : '{}';
    },

    filterBacktrace: function(stack) {
      if (!stack) return stack;
      stack = stack.replace(/^\S.*\n?/gm, '');
      var filter = this.adapter.backtraceFilter();

      return filter
           ? stack.replace(filter, '')
           : stack;
    },

    ANSI_CSI:       '\u001B[',
    DEFAULT_WIDTH:  78,
    DEFAULT_HEIGHT: 24,
    MAX_DEPTH:      4,
    NO_COLOR:       'NO_COLOR',

    ESCAPE_CODES: {
      cursor: {
        cursorUp:           '%1A',
        cursorDown:         '%1B',
        cursorForward:      '%1C',
        cursorBack:         '%1D',
        cursorNextLine:     '%1E',
        cursorPrevLine:     '%1F',
        cursorColumn:       '%1G',
        cursorPosition:     '%1;%2H',
        cursorHide:         '?25l',
        cursorShow:         '?25h'
      },

      screen: {
        eraseScreenForward: '0J',
        eraseScreenBack:    '1J',
        eraseScreen:        '2J',
        eraseLineForward:   '0K',
        eraseLineBack:      '1K',
        eraseLine:          '2K'
      },

      reset: {
        reset:      '0m'
      },

      weight: {
        bold:       '1m',   normal:     '22m'
      },

      style: {
        italic:     '',     noitalic:   ''
      },

      underline: {
        underline:  '4m',   noline:     '24m'
      },

      blink: {
        blink:      '5m',   noblink:    '25m'
      },

      color: {
        black:      '30m',
        red:        '31m',
        green:      '32m',
        yellow:     '33m',
        blue:       '34m',
        magenta:    '35m',
        cyan:       '36m',
        white:      '37m',
        nocolor:    '39m',
        grey:       '90m'
      },

      background: {
        bgblack:    '40m',
        bgred:      '41m',
        bggreen:    '42m',
        bgyellow:   '43m',
        bgblue:     '44m',
        bgmagenta:  '45m',
        bgcyan:     '46m',
        bgwhite:    '47m',
        bgnocolor:  '49m'
      }
    },

    coloring: function() {
      return this.adapter.coloring();
    },

    envvar: function(name) {
      return this.adapter.envvar(name);
    },

    escape: function(string) {
      return Console.ANSI_CSI + string;
    },

    exit: function(status) {
      this.adapter.exit(status);
    },

    getDimensions: function() {
      return this.adapter.getDimensions();
    }
  },

  consoleFormat: function() {
    this.reset();
    var i = arguments.length;
    while (i--) this[arguments[i]]();
  },

  print: function(string) {
    string = (string === undefined ? '' : string).toString();
    Console.adapter.print(string);
  },

  puts: function(string) {
    string = (string === undefined ? '' : string).toString();
    Console.adapter.puts(string);
  }
});

Console.extend({
  Base: new JS.Class({
    __buffer__: '',
    __format__: '',

    backtraceFilter: function() {
      if (typeof version === 'function' && version() > 100) {
        return /.*/;
      } else {
        return null;
      }
    },

    coloring: function() {
      return !this.envvar(Console.NO_COLOR);
    },

    echo: function(string) {
      if (typeof console !== 'undefined') return console.log(string);
      if (typeof print === 'function')    return print(string);
    },

    envvar: function(name) {
      return null;
    },

    exit: function(status) {
      if (typeof system === 'object' && system.exit) system.exit(status);
      if (typeof quit === 'function')                quit(status);
    },

    format: function(type, name, args) {
      if (!this.coloring()) return;
      var escape = Console.ESCAPE_CODES[type][name];

      for (var i = 0, n = args.length; i < n; i++)
        escape = escape.replace('%' + (i+1), args[i]);

      this.__format__ += Console.escape(escape);
    },

    flushFormat: function() {
      var format = this.__format__;
      this.__format__ = '';
      return format;
    },

    getDimensions: function() {
      var width  = this.envvar('COLUMNS') || Console.DEFAULT_WIDTH,
          height = this.envvar('ROWS')    || Console.DEFAULT_HEIGHT;

      return [parseInt(width, 10), parseInt(height, 10)];
    },

    print: function(string) {
      var coloring = this.coloring(),
          width    = this.getDimensions()[0],
          esc      = Console.escape,
          length, prefix, line;

      while (string.length > 0) {
        length = this.__buffer__.length;
        prefix = (length > 0 && coloring) ? esc('1F') + esc((length + 1) + 'G') : '';
        line   = string.substr(0, width - length);

        this.__buffer__ += line;

        if (coloring) this.echo(prefix + this.flushFormat() + line);

        if (this.__buffer__.length === width) {
          if (!coloring) this.echo(this.__buffer__);
          this.__buffer__ = '';
        }
        string = string.substr(width - length);
      }
    },

    puts: function(string) {
      var coloring = this.coloring(),
          esc      = Console.escape,
          length   = this.__buffer__.length,
          prefix   = (length > 0 && coloring) ? esc('1F') + esc((length + 1) + 'G') : this.__buffer__;

      this.echo(prefix + this.flushFormat() + string);
      this.__buffer__ = '';
    }
  })
});

Console.extend({
  Browser: new JS.Class(Console.Base, {
    backtraceFilter: function() {
      return new RegExp(window.location.href.replace(/(\/[^\/]+)/g, '($1)?') + '/?', 'g');
    },

    coloring: function() {
      if (this.envvar(Console.NO_COLOR)) return false;
      return Console.AIR;
    },

    echo: function(string) {
      if (window.runtime) return window.runtime.trace(string);
      if (window.console) return console.log(string);
      alert(string);
    },

    envvar: function(name) {
      return window[name] || null;
    },

    getDimensions: function() {
      if (Console.AIR) return this.callSuper();
      return [1024, 1];
    }
  })
});

Console.extend({
  BrowserColor: new JS.Class(Console.Browser, {
    COLORS: {
      green: 'limegreen'
    },

    __queue__: [],
    __state__: null,

    format: function(type, name) {
      name = name.replace(/^bg/, '');

      var state = JS.extend({}, this.__state__ || {}),
          color = this.COLORS[name] || name,
          no    = /^no/.test(name);

      if (type === 'reset')
        state = null;
      else if (no)
        delete state[type];
      else if (type === 'weight')
        state.weight = 'font-weight: ' + name;
      else if (type === 'style')
        state.style = 'font-style: ' + name;
      else if (type === 'underline')
        state.underline = 'text-decoration: underline';
      else if (type === 'color')
        state.color = 'color: ' + color;
      else if (type === 'background')
        state.background = 'background-color: ' + color;
      else
        state = undefined;

      if (state !== undefined) {
        this.__state__ = state;
        this.__queue__.push(state);
      }
    },

    print: function(string) {
      this.__queue__.push(string)
    },

    puts: function(string) {
      this.print(string);
      var buffer = '', formats = [], item;
      while ((item = this.__queue__.shift()) !== undefined) {
        if (typeof item === 'string') {
          if (this.__state__) {
            buffer += '%c' + item;
            formats.push(this._serialize(this.__state__));
          } else {
            buffer += item;
          }
        } else {
          this.__state__ = item;
        }
      }
      console.log.apply(console, [buffer].concat(formats));
    },

    _serialize: function(state) {
      var rules = [];
      for (var key in state) rules.push(state[key]);
      return rules.join('; ');
    }
  })
});

Console.extend({
  Node: new JS.Class(Console.Base, {
    backtraceFilter: function() {
      return new RegExp(process.cwd() + '/', 'g');
    },

    coloring: function() {
      return !this.envvar(Console.NO_COLOR) && require('tty').isatty(1);
    },

    envvar: function(name) {
      return process.env[name] || null;
    },

    exit: function(status) {
      process.exit(status);
    },

    getDimensions: function() {
      var width, height, dims;
      if (process.stdout.getWindowSize) {
        dims   = process.stdout.getWindowSize();
        width  = dims[0];
        height = dims[1];
      } else {
        dims   = process.binding('stdio').getWindowSize();
        width  = dims[1];
        height = dims[0];
      }
      return [width, height];
    },

    print: function(string) {
      process.stdout.write(this.flushFormat() + string);
    },

    puts: function(string) {
      console.log(this.flushFormat() + string);
    }
  })
});

Console.extend({
  Phantom: new JS.Class(Console.Base, {
    echo: function(string) {
      console.log(string);
    },

    envvar: function(name) {
      return require('system').env[name] || null;
    },

    exit: function(status) {
      phantom.exit(status);
    }
  })
});

Console.extend({
  Rhino: new JS.Class(Console.Base, {
    backtraceFilter: function() {
      return new RegExp(java.lang.System.getProperty('user.dir') + '/', 'g');
    },

    envvar: function(name) {
      var env = java.lang.System.getenv();
      return env.get(name) || null;
    },

    getDimensions: function() {
      var proc = java.lang.Runtime.getRuntime().exec(['sh', '-c', 'stty -a < /dev/tty']),
          is   = proc.getInputStream(),
          bite = 0,
          out  = '',
          width, height;

      while (bite >= 0) {
        bite = is.read();
        if (bite >= 0) out += String.fromCharCode(bite);
      }

      var match = out.match(/rows\s+(\d+);\s+columns\s+(\d+)/);
      if (!match) return this._dimCache || this.callSuper();

      return this._dimCache = [parseInt(match[2], 10), parseInt(match[1], 10)];
    },

    print: function(string) {
      java.lang.System.out.print(this.flushFormat() + string);
    },

    puts: function(string) {
      java.lang.System.out.println(this.flushFormat() + string);
    }
  })
});

Console.extend({
  Windows: new JS.Class(Console.Base, {
    coloring: function() {
      return false;
    },

    echo: function(string) {
      WScript.Echo(string);
    },

    exit: function(status) {
      WScript.Quit(status);
    }
  })
});

Console.BROWSER = (typeof window !== 'undefined');
Console.NODE    = (typeof process === 'object') && !Console.BROWSER;
Console.PHANTOM = (typeof phantom !== 'undefined');
Console.AIR     = (Console.BROWSER && typeof runtime !== 'undefined');
Console.RHINO   = (typeof java !== 'undefined' && typeof java.lang !== 'undefined');
Console.WSH     = (typeof WScript !== 'undefined');

var useColor = false, ua;
if (Console.BROWSER) {
  ua = navigator.userAgent;
  if (window.console && /Chrome/.test(ua))
    useColor = true;
}

if (Console.PHANTOM)      Console.adapter = new Console.Phantom();
else if (useColor)        Console.adapter = new Console.BrowserColor();
else if (Console.BROWSER) Console.adapter = new Console.Browser();
else if (Console.NODE)    Console.adapter = new Console.Node();
else if (Console.RHINO)   Console.adapter = new Console.Rhino();
else if (Console.WSH)     Console.adapter = new Console.Windows();
else                      Console.adapter = new Console.Base();

for (var type in Console.ESCAPE_CODES) {
  for (var key in Console.ESCAPE_CODES[type]) (function(type, key) {
    Console.define(key, function() {
      Console.adapter.format(type, key, arguments);
    });
  })(type, key);
}

Console.extend(Console);

exports.Console = Console;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS;

  if (E) exports.JS = exports;
  factory(js, E ? exports : js);

})(function(JS, exports) {
'use strict';

var DOM = {
  ELEMENT_NODE:                   1,
  ATTRIBUTE_NODE:                 2,
  TEXT_NODE:                      3,
  CDATA_SECTION_NODE:             4,
  ENTITY_REFERENCE_NODE:          5,
  ENTITY_NODE:                    6,
  PROCESSING_INSTRUCTION_NODE:    7,
  COMMENT_NODE:                   8,
  DOCUMENT_NODE:                  9,
  DOCUMENT_TYPE_NODE:             10,
  DOCUMENT_FRAGMENT_NODE:         11,
  NOTATION_NODE:                  12,

  ENV: this,

  toggleClass: function(node, className) {
    if (this.hasClass(node, className)) this.removeClass(node, className);
    else this.addClass(node, className);
  },

  hasClass: function(node, className) {
    var classes = node.className.split(/\s+/);
    return JS.indexOf(classes, className) >= 0;
  },

  addClass: function(node, className) {
    if (this.hasClass(node, className)) return;
    node.className = node.className + ' ' + className;
  },

  removeClass: function(node, className) {
    var pattern = new RegExp('\\b' + className + '\\b\\s*', 'g');
    node.className = node.className.replace(pattern, '');
  }
};

DOM.Builder = new JS.Class('DOM.Builder', {
  extend: {
    addElement: function(name) {
      this.define(name, function() {
        return this.makeElement(name, arguments);
      });
      DOM[name] = function() {
        return new DOM.Builder().makeElement(name, arguments);
      };
    },

    addElements: function(list) {
      var i = list.length;
      while (i--) this.addElement(list[i]);
    }
  },

  initialize: function(parent) {
    this._parentNode = parent;
  },

  makeElement: function(name, children) {
    var element, child, attribute;
    if ( document.createElementNS ) {
      // That makes possible to mix HTML within SVG or XUL.
      element = document.createElementNS('http://www.w3.org/1999/xhtml', name);
    } else {
      element = document.createElement(name);
    }
    for (var i = 0, n = children.length; i < n; i++) {
      child = children[i];
      if (typeof child === 'function') {
        child(new this.klass(element));
      } else if (JS.isType(child, 'string')) {
        element.appendChild(document.createTextNode(child));
      } else {
        for (attribute in child)
          element[attribute] = child[attribute];
      }
    }
    if (this._parentNode) this._parentNode.appendChild(element);
    return element;
  },

  concat: function(text) {
    if (!this._parentNode) return;
    this._parentNode.appendChild(document.createTextNode(text));
  }
});

DOM.Builder.addElements([
  'a', 'abbr', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b',
  'base', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
  'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del',
  'details', 'device', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset',
  'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input',
  'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'map', 'mark',
  'marquee', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol',
  'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp',
  'rt', 'ruby', 'samp', 'script', 'section', 'select', 'small', 'source',
  'span', 'strong', 'style', 'sub', 'sup', 'summary', 'table', 'tbody', 'td',
  'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'ul',
  'var', 'video', 'wbr'
]);

DOM.Event = {
  _registry: [],

  on: function(element, eventName, callback, context) {
    if (element === undefined) return;

    if (element !== DOM.ENV &&
        element.nodeType !== DOM.ELEMENT_NODE &&
        element.nodeType !== DOM.DOCUMENT_NODE)
      return;

    var wrapped = function() { callback.call(context, element) };

    if (element.addEventListener)
      element.addEventListener(eventName, wrapped, false);
    else if (element.attachEvent)
      element.attachEvent('on' + eventName, wrapped);

    this._registry.push({
      _element:   element,
      _type:      eventName,
      _callback:  callback,
      _context:   context,
      _handler:   wrapped
    });
  },

  detach: function(element, eventName, callback, context) {
    var i = this._registry.length, register;
    while (i--) {
      register = this._registry[i];

      if ((element    && element    !== register._element)   ||
          (eventName  && eventName  !== register._type)      ||
          (callback   && callback   !== register._callback)  ||
          (context    && context    !== register._context))
        continue;

      if (register._element.removeEventListener)
        register._element.removeEventListener(register._type, register._handler, false);
      else if (register._element.detachEvent)
        register._element.detachEvent('on' + register._type, register._handler);

      this._registry.splice(i,1);
      register = null;
    }
  }
};

DOM.Event.on(DOM.ENV, 'unload', DOM.Event.detach, DOM.Event);

exports.DOM = DOM;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS;

  if (E) exports.JS = exports;
  factory(js, E ? exports : js);

})(function(JS, exports) {
'use strict';

var Comparable = new JS.Module('Comparable', {
  extend: {
    ClassMethods: new JS.Module({
      compare: function(one, another) {
        return one.compareTo(another);
      }
    }),

    included: function(base) {
      base.extend(this.ClassMethods);
    }
  },

  lt: function(other) {
    return this.compareTo(other) < 0;
  },

  lte: function(other) {
    return this.compareTo(other) < 1;
  },

  gt: function(other) {
    return this.compareTo(other) > 0;
  },

  gte: function(other) {
    return this.compareTo(other) > -1;
  },

  eq: function(other) {
    return this.compareTo(other) === 0;
  },

  between: function(a, b) {
    return this.gte(a) && this.lte(b);
  }
});

exports.Comparable = Comparable;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS,

      Enumerable = js.Enumerable || require('./enumerable').Enumerable,
      Comparable = js.Comparable || require('./comparable').Comparable;

  if (E) exports.JS = exports;
  factory(js, Enumerable, Comparable, E ? exports : js);

})(function(JS, Enumerable, Comparable, exports) {
'use strict';

var Hash = new JS.Class('Hash', {
  include: Enumerable || {},

  extend: {
    Pair: new JS.Class({
      include: Comparable || {},
      length: 2,

      setKey: function(key) {
        this[0] = this.key = key;
      },

      hasKey: function(key) {
        return Enumerable.areEqual(this.key, key);
      },

      setValue: function(value) {
        this[1] = this.value = value;
      },

      hasValue: function(value) {
        return Enumerable.areEqual(this.value, value);
      },

      compareTo: function(other) {
        return this.key.compareTo
            ? this.key.compareTo(other.key)
            : (this.key < other.key ? -1 : (this.key > other.key ? 1 : 0));
      },

      hash: function() {
        var key   = Hash.codeFor(this.key),
            value = Hash.codeFor(this.value);

        return [key, value].sort().join('/');
      }
    }),

    codeFor: function(object) {
      if (typeof object !== 'object') return String(object);
      return (typeof object.hash === 'function')
          ? object.hash()
          : object.toString();
    }
  },

  initialize: function(object) {
    this.clear();
    if (!JS.isType(object, Array)) return this.setDefault(object);
    for (var i = 0, n = object.length; i < n; i += 2)
      this.store(object[i], object[i+1]);
  },

  forEach: function(block, context) {
    if (!block) return this.enumFor('forEach');
    block = Enumerable.toFn(block);

    var hash, bucket, i;

    for (hash in this._buckets) {
      if (!this._buckets.hasOwnProperty(hash)) continue;
      bucket = this._buckets[hash];
      i = bucket.length;
      while (i--) block.call(context, bucket[i]);
    }
    return this;
  },

  _bucketForKey: function(key, createIfAbsent) {
    var hash   = this.klass.codeFor(key),
        bucket = this._buckets[hash];

    if (!bucket && createIfAbsent)
      bucket = this._buckets[hash] = [];

    return bucket;
  },

  _indexInBucket: function(bucket, key) {
    var i     = bucket.length,
        ident = !!this._compareByIdentity;

    while (i--) {
      if (ident ? (bucket[i].key === key) : bucket[i].hasKey(key))
        return i;
    }
    return -1;
  },

  assoc: function(key, createIfAbsent) {
    var bucket, index, pair;

    bucket = this._bucketForKey(key, createIfAbsent);
    if (!bucket) return null;

    index = this._indexInBucket(bucket, key);
    if (index > -1) return bucket[index];
    if (!createIfAbsent) return null;

    this.size += 1; this.length += 1;
    pair = new this.klass.Pair;
    pair.setKey(key);
    bucket.push(pair);
    return pair;
  },

  rassoc: function(value) {
    var key = this.key(value);
    return key ? this.assoc(key) : null;
  },

  clear: function() {
    this._buckets = {};
    this.length = this.size = 0;
  },

  compareByIdentity: function() {
    this._compareByIdentity = true;
    return this;
  },

  comparesByIdentity: function() {
    return !!this._compareByIdentity;
  },

  setDefault: function(value) {
    this._default = value;
    return this;
  },

  getDefault: function(key) {
    return (typeof this._default === 'function')
        ? this._default(this, key)
        : (this._default || null);
  },

  equals: function(other) {
    if (!JS.isType(other, Hash) || this.length !== other.length)
      return false;
    var result = true;
    this.forEach(function(pair) {
      if (!result) return;
      var otherPair = other.assoc(pair.key);
      if (otherPair === null || !otherPair.hasValue(pair.value)) result = false;
    });
    return result;
  },

  hash: function() {
    var hashes = [];
    this.forEach(function(pair) { hashes.push(pair.hash()) });
    return hashes.sort().join('');
  },

  fetch: function(key, defaultValue, context) {
    var pair = this.assoc(key);
    if (pair) return pair.value;

    if (defaultValue === undefined) throw new Error('key not found');
    if (typeof defaultValue === 'function') return defaultValue.call(context, key);
    return defaultValue;
  },

  forEachKey: function(block, context) {
    if (!block) return this.enumFor('forEachKey');
    block = Enumerable.toFn(block);

    this.forEach(function(pair) {
      block.call(context, pair.key);
    });
    return this;
  },

  forEachPair: function(block, context) {
    if (!block) return this.enumFor('forEachPair');
    block = Enumerable.toFn(block);

    this.forEach(function(pair) {
      block.call(context, pair.key, pair.value);
    });
    return this;
  },

  forEachValue: function(block, context) {
    if (!block) return this.enumFor('forEachValue');
    block = Enumerable.toFn(block);

    this.forEach(function(pair) {
      block.call(context, pair.value);
    });
    return this;
  },

  get: function(key) {
    var pair = this.assoc(key);
    return pair ? pair.value : this.getDefault(key);
  },

  hasKey: function(key) {
    return !!this.assoc(key);
  },

  hasValue: function(value) {
    var has = false, ident = !!this._compareByIdentity;
    this.forEach(function(pair) {
      if (has) return;
      if (ident ? value === pair.value : Enumerable.areEqual(value, pair.value))
        has = true;
    });
    return has;
  },

  invert: function() {
    var hash = new this.klass;
    this.forEach(function(pair) {
      hash.store(pair.value, pair.key);
    });
    return hash;
  },

  isEmpty: function() {
    for (var hash in this._buckets) {
      if (this._buckets.hasOwnProperty(hash) && this._buckets[hash].length > 0)
        return false;
    }
    return true;
  },

  keepIf: function(block, context) {
    return this.removeIf(function() {
      return !block.apply(context, arguments);
    });
  },

  key: function(value) {
    var result = null;
    this.forEach(function(pair) {
      if (!result && Enumerable.areEqual(value, pair.value))
        result = pair.key;
    });
    return result;
  },

  keys: function() {
    var keys = [];
    this.forEach(function(pair) { keys.push(pair.key) });
    return keys;
  },

  merge: function(hash, block, context) {
    var newHash = new this.klass;
    newHash.update(this);
    newHash.update(hash, block, context);
    return newHash;
  },

  rehash: function() {
    var temp = new this.klass;
    temp._buckets = this._buckets;
    this.clear();
    this.update(temp);
  },

  remove: function(key, block) {
    if (block === undefined) block = null;
    var bucket, index, result;

    bucket = this._bucketForKey(key);
    if (!bucket) return (typeof block === 'function')
                      ? this.fetch(key, block)
                      : this.getDefault(key);

    index = this._indexInBucket(bucket, key);
    if (index < 0) return (typeof block === 'function')
                        ? this.fetch(key, block)
                        : this.getDefault(key);

    result = bucket[index].value;
    this._delete(bucket, index);
    this.size -= 1;
    this.length -= 1;

    if (bucket.length === 0)
      delete this._buckets[this.klass.codeFor(key)];

    return result;
  },

  _delete: function(bucket, index) {
    bucket.splice(index, 1);
  },

  removeIf: function(block, context) {
    if (!block) return this.enumFor('removeIf');
    block = Enumerable.toFn(block);

    var toRemove = [];

    this.forEach(function(pair) {
      if (block.call(context, pair))
        toRemove.push(pair.key);
    }, this);

    var i = toRemove.length;
    while (i--) this.remove(toRemove[i]);

    return this;
  },

  replace: function(hash) {
    this.clear();
    this.update(hash);
  },

  shift: function() {
    var keys = this.keys();
    if (keys.length === 0) return this.getDefault();
    var pair = this.assoc(keys[0]);
    this.remove(pair.key);
    return pair;
  },

  store: function(key, value) {
    this.assoc(key, true).setValue(value);
    return value;
  },

  toString: function() {
    return 'Hash:{' + this.map(function(pair) {
      return pair.key.toString() + '=>' + pair.value.toString();
    }).join(',') + '}';
  },

  update: function(hash, block, context) {
    var givenBlock = (typeof block === 'function');
    hash.forEach(function(pair) {
      var key = pair.key, value = pair.value;
      if (givenBlock && this.hasKey(key))
        value = block.call(context, key, this.get(key), value);
      this.store(key, value);
    }, this);
  },

  values: function() {
    var values = [];
    this.forEach(function(pair) { values.push(pair.value) });
    return values;
  },

  valuesAt: function() {
    var i = arguments.length, results = [];
    while (i--) results.push(this.get(arguments[i]));
    return results;
  }
});

Hash.alias({
  includes: 'hasKey',
  index:    'key',
  put:      'store'
});

var OrderedHash = new JS.Class('OrderedHash', Hash, {
  assoc: function(key, createIfAbsent) {
    var _super = Hash.prototype.assoc;

    var existing = _super.call(this, key, false);
    if (existing || !createIfAbsent) return existing;

    var pair = _super.call(this, key, true);

    if (!this._first) {
      this._first = this._last = pair;
    } else {
      this._last._next = pair;
      pair._prev = this._last;
      this._last = pair;
    }
    return pair;
  },

  clear: function() {
    this.callSuper();
    this._first = this._last = null;
  },

  _delete: function(bucket, index) {
    var pair = bucket[index];

    if (pair._prev) pair._prev._next = pair._next;
    if (pair._next) pair._next._prev = pair._prev;

    if (pair === this._first) this._first = pair._next;
    if (pair === this._last) this._last = pair._prev;

    return this.callSuper();
  },

  forEach: function(block, context) {
    if (!block) return this.enumFor('forEach');
    block = Enumerable.toFn(block);

    var pair = this._first;
    while (pair) {
      block.call(context, pair);
      pair = pair._next;
    }
  },

  rehash: function() {
    var pair = this._first;
    this.clear();
    while (pair) {
      this.store(pair.key, pair.value);
      pair = pair._next;
    }
  }
});

exports.Hash = Hash;
exports.OrderedHash = OrderedHash;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS,

      Enumerable = js.Enumerable || require('./enumerable').Enumerable,
      hash = js.Hash ? js : require('./hash');

  if (E) exports.JS = exports;
  factory(js, Enumerable, hash, E ? exports : js);

})(function(JS, Enumerable, hash, exports) {
'use strict';

var Set = new JS.Class('Set', {
  extend: {
    forEach: function(list, block, context) {
      if (!list || !block) return;
      if (list.forEach) return list.forEach(block, context);
      for (var i = 0, n = list.length; i < n; i++) {
        if (list[i] !== undefined)
          block.call(context, list[i], i);
      }
    }
  },

  include: Enumerable || {},

  initialize: function(list, block, context) {
    this.clear();
    if (block) this.klass.forEach(list, function(item) {
      this.add(block.call(context, item));
    }, this);
    else this.merge(list);
  },

  forEach: function(block, context) {
    if (!block) return this.enumFor('forEach');
    block = Enumerable.toFn(block);

    this._members.forEachKey(block, context);
    return this;
  },

  add: function(item) {
    if (this.contains(item)) return false;
    this._members.store(item, true);
    this.length = this.size = this._members.length;
    return true;
  },

  classify: function(block, context) {
    if (!block) return this.enumFor('classify');
    block = Enumerable.toFn(block);

    var classes = new hash.Hash();
    this.forEach(function(item) {
      var value = block.call(context, item);
      if (!classes.hasKey(value)) classes.store(value, new this.klass);
      classes.get(value).add(item);
    }, this);
    return classes;
  },

  clear: function() {
    this._members = new hash.Hash();
    this.size = this.length = 0;
  },

  complement: function(other) {
    var set = new this.klass;
    this.klass.forEach(other, function(item) {
      if (!this.contains(item)) set.add(item);
    }, this);
    return set;
  },

  contains: function(item) {
    return this._members.hasKey(item);
  },

  difference: function(other) {
    other = JS.isType(other, Set) ? other : new Set(other);
    var set = new this.klass;
    this.forEach(function(item) {
      if (!other.contains(item)) set.add(item);
    });
    return set;
  },

  divide: function(block, context) {
    if (!block) return this.enumFor('divide');
    block = Enumerable.toFn(block);

    var classes = this.classify(block, context),
        sets    = new Set;

    classes.forEachValue(sets.method('add'));
    return sets;
  },

  equals: function(other) {
    if (this.length !== other.length || !JS.isType(other, Set)) return false;
    var result = true;
    this.forEach(function(item) {
      if (!result) return;
      if (!other.contains(item)) result = false;
    });
    return result;
  },

  hash: function() {
    var hashes = [];
    this.forEach(function(object) { hashes.push(hash.Hash.codeFor(object)) });
    return hashes.sort().join('');
  },

  flatten: function(set) {
    var copy = new this.klass;
    copy._members = this._members;
    if (!set) { set = this; set.clear(); }
    copy.forEach(function(item) {
      if (JS.isType(item, Set)) item.flatten(set);
      else set.add(item);
    });
    return set;
  },

  inspect: function() {
    return this.toString();
  },

  intersection: function(other) {
    var set = new this.klass;
    this.klass.forEach(other, function(item) {
      if (this.contains(item)) set.add(item);
    }, this);
    return set;
  },

  isEmpty: function() {
    return this._members.length === 0;
  },

  isProperSubset: function(other) {
    return this._members.length < other._members.length && this.isSubset(other);
  },

  isProperSuperset: function(other) {
    return this._members.length > other._members.length && this.isSuperset(other);
  },

  isSubset: function(other) {
    var result = true;
    this.forEach(function(item) {
      if (!result) return;
      if (!other.contains(item)) result = false;
    });
    return result;
  },

  isSuperset: function(other) {
    return other.isSubset(this);
  },

  keepIf: function(block, context) {
    return this.removeIf(function() {
      return !block.apply(context, arguments);
    });
  },

  merge: function(list) {
    this.klass.forEach(list, function(item) { this.add(item) }, this);
  },

  product: function(other) {
    var pairs = new Set;
    this.forEach(function(item) {
      this.klass.forEach(other, function(partner) {
        pairs.add([item, partner]);
      });
    }, this);
    return pairs;
  },

  rebuild: function() {
    this._members.rehash();
    this.length = this.size = this._members.length;
  },

  remove: function(item) {
    this._members.remove(item);
    this.length = this.size = this._members.length;
  },

  removeIf: function(block, context) {
    if (!block) return this.enumFor('removeIf');
    block = Enumerable.toFn(block);

    this._members.removeIf(function(pair) {
      return block.call(context, pair.key);
    });
    this.length = this.size = this._members.length;
    return this;
  },

  replace: function(other) {
    this.clear();
    this.merge(other);
  },

  subtract: function(list) {
    this.klass.forEach(list, function(item) {
      this.remove(item);
    }, this);
  },

  toString: function() {
    var items = [];
    this.forEach(function(item) {
      items.push(item.toString());
    });
    return this.klass.displayName + ':{' + items.join(',') + '}';
  },

  union: function(other) {
    var set = new this.klass;
    set.merge(this);
    set.merge(other);
    return set;
  },

  xor: function(other) {
    var set = new this.klass(other);
    this.forEach(function(item) {
      set[set.contains(item) ? 'remove' : 'add'](item);
    });
    return set;
  },

  _indexOf: function(item) {
    var i    = this._members.length,
        Enum = Enumerable;

    while (i--) {
      if (Enum.areEqual(item, this._members[i])) return i;
    }
    return -1;
  }
});

Set.alias({
  n:  'intersection',
  u:  'union',
  x:  'product'
});

var OrderedSet = new JS.Class('OrderedSet', Set, {
  clear: function() {
    this._members = new hash.OrderedHash();
    this.size = this.length = 0;
  }
});

var SortedSet = new JS.Class('SortedSet', Set, {
  extend: {
    compare: function(one, another) {
      return JS.isType(one, Object)
          ? one.compareTo(another)
          : (one < another ? -1 : (one > another ? 1 : 0));
    }
  },

  forEach: function(block, context) {
    if (!block) return this.enumFor('forEach');
    block = Enumerable.toFn(block);
    this.klass.forEach(this._members, block, context);
    return this;
  },

  add: function(item) {
    var point = this._indexOf(item, true);
    if (point === null) return false;
    this._members.splice(point, 0, item);
    this.length = this.size = this._members.length;
    return true;
  },

  clear: function() {
    this._members = [];
    this.size = this.length = 0;
  },

  contains: function(item) {
    return this._indexOf(item) !== -1;
  },

  rebuild: function() {
    var members = this._members;
    this.clear();
    this.merge(members);
  },

  remove: function(item) {
    var index = this._indexOf(item);
    if (index === -1) return;
    this._members.splice(index, 1);
    this.length = this.size = this._members.length;
  },

  removeIf: function(block, context) {
    if (!block) return this.enumFor('removeIf');
    block = Enumerable.toFn(block);

    var members = this._members,
        i       = members.length;

    while (i--) {
      if (block.call(context, members[i]))
        this.remove(members[i]);
    }
    return this;
  },

  _indexOf: function(item, insertionPoint) {
    var items   = this._members,
        n       = items.length,
        i       = 0,
        d       = n,
        compare = this.klass.compare,
        Enum    = Enumerable,
        found;

    if (n === 0) return insertionPoint ? 0 : -1;

    if (compare(item, items[0]) < 1)   { d = 0; i = 0; }
    if (compare(item, items[n-1]) > 0) { d = 0; i = n; }

    while (!Enum.areEqual(item, items[i]) && d > 0.5) {
      d = d / 2;
      i += (compare(item, items[i]) > 0 ? 1 : -1) * Math.round(d);
      if (i > 0 && compare(item, items[i-1]) > 0 && compare(item, items[i]) < 1) d = 0;
    }

    // The pointer will end up at the start of any homogenous section. Step
    // through the section until we find the needle or until the section ends.
    while (items[i] && !Enum.areEqual(item, items[i]) &&
        compare(item, items[i]) === 0) i += 1;

    found = Enum.areEqual(item, items[i]);
    return insertionPoint
        ? (found ? null : i)
        : (found ? i : -1);
  }
});

Enumerable.include({
  toSet: function(klass, block, context) {
    klass = klass || Set;
    return new klass(this, block, context);
  }
});

exports.Set = exports.HashSet = Set;
exports.OrderedSet = OrderedSet;
exports.SortedSet = SortedSet;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS,

      Enumerable = js.Enumerable || require('./enumerable').Enumerable,
      Hash = js.Hash || require('./hash').Hash;

  if (E) exports.JS = exports;
  factory(js, Enumerable, Hash, E ? exports : js);

})(function(JS, Enumerable, Hash, exports) {
'use strict';

var Range = new JS.Class('Range', {
  include: Enumerable || {},

  extend: {
    compare: function(one, another) {
      return JS.isType(one, Object)
          ? one.compareTo(another)
          : (one < another ? -1 : (one > another ? 1 : 0));
    },

    succ: function(object) {
      if (JS.isType(object, 'string')) {
        var chars = object.split(''),
            i     = chars.length,
            next  = null,
            set   = null,
            roll  = true;

        while (roll && i--) {
          next = null;

          Enumerable.forEach.call(this.SETS, function(name) {
            var range = this[name];
            if (chars[i] !== range._last) return;
            set  = range;
            next = range._first;
          }, this);

          if (next === null) {
            next = String.fromCharCode(chars[i].charCodeAt(0) + 1);
            roll = false;
          }
          chars[i] = next;
        }

        if (roll) chars.unshift( set._first === '0' ? '1' : set._first );

        return chars.join('');
      }

      if (JS.isType(object, 'number')) return object + 1;
      if (typeof object.succ === 'function') return object.succ();
      return null;
    }
  },

  initialize: function(first, last, excludeEnd) {
    this._first = first;
    this._last  = last;
    this._excludeEnd = !!excludeEnd;
  },

  forEach: function(block, context) {
    if (!block) return this.enumFor('forEach');
    block = Enumerable.toFn(block);

    var needle  = this._first,
        exclude = this._excludeEnd;

    if (this.klass.compare(needle, this._last) > 0)
      return;

    var check = JS.isType(needle, Object)
        ? function(a,b) { return a.compareTo(b) < 0 }
        : function(a,b) { return a !== b };

    while (check(needle, this._last)) {
      block.call(context, needle);
      needle = this.klass.succ(needle);
      if (JS.isType(needle, 'string') && needle.length > this._last.length) {
        exclude = true;
        break;
      }
    }

    if (this.klass.compare(needle, this._last) > 0)
      return;

    if (!exclude) block.call(context, needle);
  },

  equals: function(other) {
    return JS.isType(other, Range) &&
           Enumerable.areEqual(other._first, this._first) &&
           Enumerable.areEqual(other._last, this._last) &&
           other._excludeEnd === this._excludeEnd;
  },

  hash: function() {
    var hash = Hash.codeFor(this._first) + '..';
    if (this._excludeEnd) hash += '.';
    hash += Hash.codeFor(this._last);
    return hash;
  },

  first: function() { return this._first },

  last:  function() { return this._last  },

  excludesEnd: function() { return this._excludeEnd },

  includes: function(object) {
    var a = this.klass.compare(object, this._first),
        b = this.klass.compare(object, this._last);

    return a >= 0 && (this._excludeEnd ? b < 0 : b <= 0);
  },

  step: function(n, block, context) {
    if (!block) return this.enumFor('step', n);
    block = Enumerable.toFn(block);

    var i = 0;
    this.forEach(function(member) {
      if (i % n === 0) block.call(context, member);
      i += 1;
    });
  },

  toString: function() {
    var str = this._first.toString() + '..';
    if (this._excludeEnd) str += '.';
    str += this._last.toString();
    return str;
  }
});

Range.extend({
  DIGITS:     new Range('0','9'),
  LOWERCASE:  new Range('a','z'),
  UPPERCASE:  new Range('A','Z'),
  SETS:       ['DIGITS', 'LOWERCASE', 'UPPERCASE']
});

Range.alias({
  begin:  'first',
  end:    'last',
  covers: 'includes',
  match:  'includes',
  member: 'includes'
});

exports.Range = Range;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS;

  if (E) exports.JS = exports;
  factory(js, E ? exports : js);

})(function(JS, exports) {
'use strict';

var MethodChain = function(base) {
  var queue      = [],
      baseObject = base || {};

  this.____ = function(method, args) {
    queue.push({func: method, args: args});
  };

  this.__exec__ = function(base) {
    return MethodChain.exec(queue, base || baseObject);
  };
};

MethodChain.exec = function(queue, object) {
  var method, property, i, n;
  loop: for (i = 0, n = queue.length; i < n; i++) {
    method = queue[i];
    if (object instanceof MethodChain) {
      object.____(method.func, method.args);
      continue;
    }
    switch (typeof method.func) {
      case 'string':    property = object[method.func];       break;
      case 'function':  property = method.func;               break;
      case 'object':    object = method.func; continue loop;  break;
    }
    object = (typeof property === 'function')
        ? property.apply(object, method.args)
        : property;
  }
  return object;
};

MethodChain.displayName = 'MethodChain';

MethodChain.toString = function() {
  return 'MethodChain';
};

MethodChain.prototype = {
  __: function() {
    var base = arguments[0],
        args, i, n;

    switch (typeof base) {
      case 'object': case 'function':
        args = [];
        for (i = 1, n = arguments.length; i < n; i++) args.push(arguments[i]);
        this.____(base, args);
    }
    return this;
  },

  toFunction: function() {
    var chain = this;
    return function(object) { return chain.__exec__(object); };
  }
};

MethodChain.reserved = (function() {
  var names = [], key;
  for (key in new MethodChain) names.push(key);
  return new RegExp('^(?:' + names.join('|') + ')$');
})();

MethodChain.addMethod = function(name) {
  if (this.reserved.test(name)) return;
  var func = this.prototype[name] = function() {
    this.____(name, arguments);
    return this;
  };
  func.displayName = 'MethodChain#' + name;
};

MethodChain.addMethods = function(object) {
  var methods = [], property, i;

  for (property in object) {
    if (Number(property) !== property) methods.push(property);
  }

  if (object instanceof Array) {
    i = object.length;
    while (i--) {
      if (typeof object[i] === 'string') methods.push(object[i]);
    }
  }
  i = methods.length;
  while (i--) this.addMethod(methods[i]);

  object.__fns__ && this.addMethods(object.__fns__);
  object.prototype && this.addMethods(object.prototype);
};

JS.Method.added(function(method) {
  if (method && method.name) MethodChain.addMethod(method.name);
});

JS.Kernel.include({
  wait: function(time) {
    var chain = new MethodChain(), self = this;

    if (typeof time === 'number')
      JS.ENV.setTimeout(function() { chain.__exec__(self) }, time * 1000);

    if (this.forEach && typeof time === 'function')
      this.forEach(function(item) {
        JS.ENV.setTimeout(function() { chain.__exec__(item) }, time.apply(this, arguments) * 1000);
      });

    return chain;
  },

  __: function() {
    var base = arguments[0],
        args = [],
        i, n;

    for (i = 1, n = arguments.length; i < n; i++) args.push(arguments[i]);
    return  (typeof base === 'object' && base) ||
            (typeof base === 'function' && base.apply(this, args)) ||
            this;
  }
});

(function() {
  var queue = JS.Module.__queue__,
      n     = queue.length;

  while (n--) MethodChain.addMethods(queue[n]);
  delete JS.Module.__queue__;
})();

MethodChain.addMethods([
  "abs", "acos", "addEventListener", "anchor", "animation", "appendChild",
  "apply", "arguments", "arity", "asin", "atan", "atan2", "attributes", "auto",
  "background", "baseURI", "baseURIObject", "big", "bind", "blink", "blur",
  "bold", "border", "bottom", "bubbles", "call", "caller", "cancelBubble",
  "cancelable", "ceil", "charAt", "charCodeAt", "childElementCount",
  "childNodes", "children", "classList", "className", "clear", "click",
  "clientHeight", "clientLeft", "clientTop", "clientWidth", "clip",
  "cloneNode", "color", "columns", "compareDocumentPosition", "concat",
  "constructor", "contains", "content", "contentEditable", "cos", "create",
  "css", "currentTarget", "cursor", "dataset", "defaultPrevented",
  "defineProperties", "defineProperty", "dir", "direction", "dispatchEvent",
  "display", "endsWith", "eval", "eventPhase", "every", "exec", "exp",
  "explicitOriginalTarget", "filter", "firstChild", "firstElementChild",
  "fixed", "flex", "float", "floor", "focus", "font", "fontcolor", "fontsize",
  "forEach", "freeze", "fromCharCode", "getAttribute", "getAttributeNS",
  "getAttributeNode", "getAttributeNodeNS", "getBoundingClientRect",
  "getClientRects", "getDate", "getDay", "getElementsByClassName",
  "getElementsByTagName", "getElementsByTagNameNS", "getFeature",
  "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth",
  "getOwnPropertyDescriptor", "getOwnPropertyNames", "getPrototypeOf",
  "getSeconds", "getTime", "getTimezoneOffset", "getUTCDate", "getUTCDay",
  "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes",
  "getUTCMonth", "getUTCSeconds", "getUserData", "getYear", "global",
  "hasAttribute", "hasAttributeNS", "hasAttributes", "hasChildNodes",
  "hasOwnProperty", "height", "hyphens", "icon", "id", "ignoreCase", "imul",
  "indexOf", "inherit", "initEvent", "initial", "innerHTML",
  "insertAdjacentHTML", "insertBefore", "is", "isArray", "isContentEditable",
  "isDefaultNamespace", "isEqualNode", "isExtensible", "isFinite", "isFrozen",
  "isGenerator", "isInteger", "isNaN", "isPrototypeOf", "isSameNode",
  "isSealed", "isSupported", "isTrusted", "italics", "join", "keys", "lang",
  "lastChild", "lastElementChild", "lastIndex", "lastIndexOf", "left",
  "length", "link", "localName", "localeCompare", "log", "lookupNamespaceURI",
  "lookupPrefix", "map", "margin", "marks", "mask", "match", "max", "min",
  "mozMatchesSelector", "mozRequestFullScreen", "multiline", "name",
  "namespaceURI", "nextElementSibling", "nextSibling", "nodeArg", "nodeName",
  "nodePrincipal", "nodeType", "nodeValue", "none", "normal", "normalize",
  "now", "offsetHeight", "offsetLeft", "offsetParent", "offsetTop",
  "offsetWidth", "opacity", "order", "originalTarget", "orphans", "otherNode",
  "outerHTML", "outline", "overflow", "ownerDocument", "padding", "parentNode",
  "parse", "perspective", "pop", "position", "pow", "prefix", "preventBubble",
  "preventCapture", "preventDefault", "preventExtensions",
  "previousElementSibling", "previousSibling", "propertyIsEnumerable",
  "prototype", "push", "querySelector", "querySelectorAll", "quote", "quotes",
  "random", "reduce", "reduceRight", "removeAttribute", "removeAttributeNS",
  "removeAttributeNode", "removeChild", "removeEventListener", "replace",
  "replaceChild", "resize", "reverse", "right", "round", "schemaTypeInfo",
  "scrollHeight", "scrollIntoView", "scrollLeft", "scrollTop", "scrollWidth",
  "seal", "search", "setAttribute", "setAttributeNS", "setAttributeNode",
  "setAttributeNodeNS", "setCapture", "setDate", "setFullYear", "setHours",
  "setIdAttribute", "setIdAttributeNS", "setIdAttributeNode",
  "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime",
  "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds",
  "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setUserData", "setYear",
  "shift", "sin", "slice", "small", "some", "sort", "source", "spellcheck",
  "splice", "split", "sqrt", "startsWith", "sticky",
  "stopImmediatePropagation", "stopPropagation", "strike", "style", "sub",
  "substr", "substring", "sup", "tabIndex", "tagName", "tan", "target", "test",
  "textContent", "timeStamp", "title", "toDateString", "toExponential",
  "toFixed", "toGMTString", "toISOString", "toInteger", "toJSON",
  "toLocaleDateString", "toLocaleFormat", "toLocaleLowerCase",
  "toLocaleString", "toLocaleTimeString", "toLocaleUpperCase", "toLowerCase",
  "toPrecision", "toSource", "toString", "toTimeString", "toUTCString",
  "toUpperCase", "top", "transform", "transition", "trim", "trimLeft",
  "trimRight", "type", "unshift", "unwatch", "valueOf", "visibility", "w3c",
  "watch", "widows", "width"
]);

exports.MethodChain = MethodChain;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS;

  if (E) exports.JS = exports;
  factory(js, E ? exports : js);

})(function(JS, exports) {
'use strict';

var Observable = new JS.Module('Observable', {
  extend: {
    DEFAULT_METHOD: 'update'
  },

  addObserver: function(observer, context) {
    (this.__observers__ = this.__observers__ || []).push({_block: observer, _context: context});
  },

  removeObserver: function(observer, context) {
    this.__observers__ = this.__observers__ || [];
    context = context;
    var i = this.countObservers();
    while (i--) {
      if (this.__observers__[i]._block === observer && this.__observers__[i]._context === context) {
        this.__observers__.splice(i,1);
        return;
      }
    }
  },

  removeObservers: function() {
    this.__observers__ = [];
  },

  countObservers: function() {
    return (this.__observers__ = this.__observers__ || []).length;
  },

  notifyObservers: function() {
    if (!this.isChanged()) return;
    var i = this.countObservers(), observer, block, context;
    while (i--) {
      observer = this.__observers__[i];
      block    = observer._block;
      context  = observer._context;
      if (typeof block === 'function') block.apply(context, arguments);
      else block[context || Observable.DEFAULT_METHOD].apply(block, arguments);
    }
  },

  setChanged: function(state) {
    this.__changed__ = !(state === false);
  },

  isChanged: function() {
    if (this.__changed__ === undefined) this.__changed__ = true;
    return !!this.__changed__;
  }
});

Observable.alias({
  subscribe:    'addObserver',
  unsubscribe:  'removeObserver'
}, true);

exports.Observable = Observable;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS,

      Observable = js.Observable || require('./observable').Observable,
      Enumerable = js.Enumerable || require('./enumerable').Enumerable,
      Console    = js.Console    || require('./console').Console;

  if (E) exports.JS = exports;
  factory(js, Observable, Enumerable, Console, E ? exports : js);

})(function(JS, Observable, Enumerable, Console, exports) {
'use strict';

var StackTrace = new JS.Module('StackTrace', {
  extend: {
    logger: new JS.Singleton({
      include: Console,
      active: false,

      update: function(event, data) {
        if (!this.active) return;
        switch (event) {
          case 'call':    return this.logEnter(data);
          case 'return':  return this.logExit(data);
          case 'error':   return this.logError(data);
        }
      },

      indent: function() {
        var indent = ' ';
        StackTrace.forEach(function() { indent += '|  ' });
        return indent;
      },

      fullName: function(frame) {
        var C        = Console,
            method   = frame.method,
            env      = frame.env,
            name     = method.name,
            module   = method.module;

        return C.nameOf(env) +
                (module === env ? '' : '(' + C.nameOf(module) + ')') +
                '#' + name;
      },

      logEnter: function(frame) {
        var fullName = this.fullName(frame),
            args = Console.convert(frame.args).replace(/^\[/, '(').replace(/\]$/, ')');

        if (this._open) this.puts();

        this.reset();
        this.print(' ');
        this.consoleFormat('bgblack', 'white');
        this.print('TRACE');
        this.reset();
        this.print(this.indent());
        this.blue();
        this.print(fullName);
        this.red();
        this.print(args);
        this.reset();

        this._open = true;
      },

      logExit: function(frame) {
        var fullName = this.fullName(frame);

        if (frame.leaf) {
          this.consoleFormat('red');
          this.print(' --> ');
        } else {
          this.reset();
          this.print(' ');
          this.consoleFormat('bgblack', 'white');
          this.print('TRACE');
          this.reset();
          this.print(this.indent());
          this.blue();
          this.print(fullName);
          this.red();
          this.print(' --> ');
        }
        this.consoleFormat('yellow');
        this.puts(Console.convert(frame.result));
        this.reset();
        this.print('');
        this._open = false;
      },

      logError: function(e) {
        this.puts();
        this.reset();
        this.print(' ');
        this.consoleFormat('bgred', 'white');
        this.print('ERROR');
        this.consoleFormat('bold', 'red');
        this.print(' ' + Console.convert(e));
        this.reset();
        this.print(' thrown by ');
        this.bold();
        this.print(StackTrace.top().name);
        this.reset();
        this.puts('. Backtrace:');
        this.backtrace();
      },

      backtrace: function() {
        StackTrace.reverseForEach(function(frame) {
          var args = Console.convert(frame.args).replace(/^\[/, '(').replace(/\]$/, ')');
          this.print('      | ');
          this.consoleFormat('blue');
          this.print(frame.name);
          this.red();
          this.print(args);
          this.reset();
          this.puts(' in ');
          this.print('      |  ');
          this.bold();
          this.puts(Console.convert(frame.object));
        }, this);
        this.reset();
        this.puts();
      }
    }),

    include: [Observable, Enumerable],

    wrap: function(func, method, env) {
      var self = StackTrace;
      var wrapper = function() {
        var result;
        self.push(this, method, env, Array.prototype.slice.call(arguments));

        try { result = func.apply(this, arguments) }
        catch (e) { self.error(e) }

        self.pop(result);
        return result;
      };
      wrapper.toString = function() { return func.toString() };
      wrapper.__traced__ = true;
      return wrapper;
    },

    stack: [],

    forEach: function(block, context) {
      Enumerable.forEach.call(this.stack, block, context);
    },

    top: function() {
      return this.stack[this.stack.length - 1] || {};
    },

    push: function(object, method, env, args) {
      var stack = this.stack;
      if (stack.length > 0) stack[stack.length - 1].leaf = false;

      var frame = {
        object: object,
        method: method,
        env:    env,
        args:   args,
        leaf:   true
      };
      frame.name = this.logger.fullName(frame);
      this.notifyObservers('call', frame);
      stack.push(frame);
    },

    pop: function(result) {
      var frame = this.stack.pop();
      frame.result = result;
      this.notifyObservers('return', frame);
    },

    error: function(e) {
      if (e.logged) throw e;
      e.logged = true;
      this.notifyObservers('error', e);
      this.stack = [];
      throw e;
    }
  }
});

StackTrace.addObserver(StackTrace.logger);

exports.StackTrace = StackTrace;
});

(function(factory) {
  var E  = (typeof exports === 'object'),
      js = (typeof JS === 'undefined') ? require('./core') : JS,

      Console     = js.Console     || require('./console').Console,
      DOM         = js.DOM         || require('./dom').DOM,
      Enumerable  = js.Enumerable  || require('./enumerable').Enumerable,
      SortedSet   = js.SortedSet   || require('./set').SortedSet,
      Range       = js.Range       || require('./range').Range,
      Hash        = js.Hash        || require('./hash').Hash,
      MethodChain = js.MethodChain || require('./method_chain').MethodChain,
      Comparable  = js.Comparable  || require('./comparable').Comparable,
      StackTrace  = js.StackTrace  || require('./stack_trace').StackTrace;

  if (E) exports.JS = exports;
  factory(js, Console, DOM, Enumerable, SortedSet, Range, Hash, MethodChain, Comparable, StackTrace, E ? exports : js);

})(function(JS, Console, DOM, Enumerable, SortedSet, Range, Hash, MethodChain, Comparable, StackTrace, exports) {
'use strict';

var Test = new JS.Module('Test', {
  extend: {
    asyncTimeout: 5,

    filter: function(objects, suffix) {
      return Test.Runner.filter(objects, suffix);
    },

    Reporters: new JS.Module({
      extend: {
        METHODS: ['startSuite', 'startContext', 'startTest',
                  'update', 'addFault',
                  'endTest', 'endContext', 'endSuite'],

        _registry: {},

        register: function(name, klass) {
          this._registry[name] = klass;
        },

        get: function(name) {
          if (!name) return null;
          return this._registry[name] || null;
        }
      }
    }),

    UI:   new JS.Module({}),
    Unit: new JS.Module({})
  }
});

Test.Unit.extend({
  Observable: new JS.Module({
    addListener: function(channelName, block, context) {
      if (block === undefined) throw new Error('No callback was passed as a listener');

      this.channels()[channelName] = this.channels()[channelName] || [];
      this.channels()[channelName].push([block, context]);

      return block;
    },

    removeListener: function(channelName, block, context) {
      var channel = this.channels()[channelName];
      if (!channel) return;

      var i = channel.length;
      while (i--) {
        if (channel[i][0] === block) {
          channel.splice(i,1);
          return block;
        }
      }
      return null;
    },

    notifyListeners: function(channelName, args) {
      var args        = JS.array(arguments),
          channelName = args.shift(),
          channel     = this.channels()[channelName];

      if (!channel) return 0;

      for (var i = 0, n = channel.length; i < n; i++)
        channel[i][0].apply(channel[i][1] || null, args);

      return channel.length;
    },

    channels: function() {
      return this.__channels__ = this.__channels__ || [];
    }
  })
});

Test.Unit.extend({
  isFailure: function(error) {
    var types = Test.ASSERTION_ERRORS, i = types.length;
    while (i--) {
      if (JS.isType(error, types[i])) return true;
    }
    return false;
  },

  AssertionFailedError: new JS.Class(Error, {
    initialize: function(message) {
      this.message = message.toString();
    }
  }),

  Assertions: new JS.Module({
    assertBlock: function(message, block, context) {
      if (typeof message === 'function') {
        context = block;
        block   = message;
        message = null;
      }
      this.__wrapAssertion__(function() {
        if (!block.call(context)) {
          message = this.buildMessage(message || 'assertBlock failed');
          throw new Test.Unit.AssertionFailedError(message);
        }
      });
    },

    flunk: function(message) {
      this.assertBlock(this.buildMessage(message || 'Flunked'), function() { return false });
    },

    assert: function(bool, message) {
      this.__wrapAssertion__(function() {
        this.assertBlock(this.buildMessage(message, '<?> is not true', bool),
                         function() { return bool });
      });
    },

    assertNot: function(bool, message) {
      this.__wrapAssertion__(function() {
        this.assertBlock(this.buildMessage(message, '<?> is not false', bool),
                         function() { return !bool });
      });
    },

    assertEqual: function(expected, actual, message) {
      var fullMessage = this.buildMessage(message, '<?> expected but was\n<?>', expected, actual);
      this.assertBlock(fullMessage, function() {
        return Enumerable.areEqual(expected, actual);
      });
    },

    assertNotEqual: function(expected, actual, message) {
      var fullMessage = this.buildMessage(message, '<?> expected not to be equal to\n<?>',
                                                   expected,
                                                   actual);
      this.assertBlock(fullMessage, function() {
        return !Enumerable.areEqual(expected, actual);
      });
    },

    assertNull: function(object, message) {
      this.assertEqual(null, object, message);
    },

    assertNotNull: function(object, message) {
      var fullMessage = this.buildMessage(message, '<?> expected not to be null', object);
      this.assertBlock(fullMessage, function() { return object !== null });
    },

    assertKindOf: function(klass, object, message) {
      this.__wrapAssertion__(function() {
        var type = (!object || typeof klass === 'string') ? typeof object : (object.klass || object.constructor);
        var fullMessage = this.buildMessage(message, '<?> expected to be an instance of\n' +
                                                     '<?> but was\n' +
                                                     '<?>',
                                                     object, klass, type);
        this.assertBlock(fullMessage, function() { return JS.isType(object, klass) });
      });
    },

    assertRespondTo: function(object, method, message) {
      this.__wrapAssertion__(function() {
        var fullMessage = this.buildMessage('', '<?>\ngiven as the method name argument to #assertRespondTo must be a String', method);

        this.assertBlock(fullMessage, function() { return typeof method === 'string' });

        var type = object ? object.constructor : typeof object;
        fullMessage = this.buildMessage(message, '<?>\n' +
                                                 'of type <?>\n' +
                                                 'expected to respond to <?>',
                                                 object,
                                                 type,
                                                 method);
        this.assertBlock(fullMessage, function() { return object && object[method] !== undefined });
      });
    },

    assertMatch: function(pattern, string, message) {
      this.__wrapAssertion__(function() {
        var fullMessage = this.buildMessage(message, '<?> expected to match\n<?>', string, pattern);
        this.assertBlock(fullMessage, function() {
          return JS.match(pattern, string);
        });
      });
    },

    assertNoMatch: function(pattern, string, message) {
      this.__wrapAssertion__(function() {
        var fullMessage = this.buildMessage(message, '<?> expected not to match\n<?>', string, pattern);
        this.assertBlock(fullMessage, function() {
          return (typeof pattern.test === 'function')
               ? !pattern.test(string)
               : !pattern.match(string);
        });
      });
    },

    assertSame: function(expected, actual, message) {
      var fullMessage = this.buildMessage(message, '<?> expected to be the same as\n' +
                                                   '<?>',
                                                   expected, actual);
      this.assertBlock(fullMessage, function() { return actual === expected });
    },

    assertNotSame: function(expected, actual, message) {
      var fullMessage = this.buildMessage(message, '<?> expected not to be the same as\n' +
                                                   '<?>',
                                                   expected, actual);
      this.assertBlock(fullMessage, function() { return actual !== expected });
    },

    assertInDelta: function(expected, actual, delta, message) {
      this.__wrapAssertion__(function() {
        this.assertKindOf('number', expected);
        this.assertKindOf('number', actual);
        this.assertKindOf('number', delta);
        this.assert(delta >= 0, 'The delta should not be negative');

        var fullMessage = this.buildMessage(message, '<?> and\n' +
                                                     '<?> expected to be within\n' +
                                                     '<?> of each other',
                                                     expected,
                                                     actual,
                                                     delta);
        this.assertBlock(fullMessage, function() {
          return Math.abs(expected - actual) <= delta;
        });
      });
    },

    assertSend: function(sendArray, message) {
      this.__wrapAssertion__(function() {
        this.assertKindOf(Array, sendArray, 'assertSend requires an array of send information');
        this.assert(sendArray.length >= 2, 'assertSend requires at least a receiver and a message name');
        var fullMessage = this.buildMessage(message, '<?> expected to respond to\n' +
                                                     '<?(?)> with a true value',
                                                     sendArray[0],
                                                     Test.Unit.AssertionMessage.literal(sendArray[1]),
                                                     sendArray.slice(2));
        this.assertBlock(fullMessage, function() {
          return sendArray[0][sendArray[1]].apply(sendArray[0], sendArray.slice(2));
        });
      });
    },

    __processExceptionArgs__: function(args) {
      var args     = JS.array(args),
          context  = (typeof args[args.length - 1] === 'function') ? null : args.pop(),
          block    = args.pop(),
          message  = JS.isType(args[args.length - 1], 'string') ? args.pop() : '',
          expected = new Enumerable.Collection(args);

      return [args, expected, message, block, context];
    },

    assertThrow: function() {
      var A        = this.__processExceptionArgs__(arguments),
          args     = A[0],
          expected = A[1],
          message  = A[2],
          block    = A[3],
          context  = A[4];

      this.__wrapAssertion__(function() {
        var fullMessage = this.buildMessage(message, '<?> exception expected but none was thrown', args),
            actualException;

        this.assertBlock(fullMessage, function() {
          try {
            block.call(context);
          } catch (e) {
            actualException = e;
            return true;
          }
          return false;
        });

        fullMessage = this.buildMessage(message, '<?> exception expected but was\n?', args, actualException);
        this.assertBlock(fullMessage, function() {
          return expected.any(function(type) {
            return JS.isType(actualException, type) || (actualException.name &&
                                                        actualException.name === type.name);
          });
        });
      });
    },

    assertThrows: function() {
      return this.assertThrow.apply(this, arguments);
    },

    assertNothingThrown: function() {
      var A        = this.__processExceptionArgs__(arguments),
          args     = A[0],
          expected = A[1],
          message  = A[2],
          block    = A[3],
          context  = A[4];

      this.__wrapAssertion__(function() {
        try {
          block.call(context);
        } catch (e) {
          if ((args.length === 0 && !Test.Unit.isFailure(e)) ||
              expected.any(function(type) { return JS.isType(e, type) }))
            this.assertBlock(this.buildMessage(message, 'Exception thrown:\n?', e), function() { return false });
          else
            throw e;
        }
      });
    },

    buildMessage: function() {
      var args     = JS.array(arguments),
          head     = args.shift(),
          template = args.shift();
      return new Test.Unit.AssertionMessage(head, template, args);
    },

    __wrapAssertion__: function(block) {
      if (this.__assertionWrapped__ === undefined) this.__assertionWrapped__ = false;
      if (!this.__assertionWrapped__) {
        this.__assertionWrapped__ = true;
        try {
          this.addAssertion();
          return block.call(this);
        } finally {
          this.__assertionWrapped__ = false;
        }
      } else {
        return block.call(this);
      }
    },

    addAssertion: function() {}
  })
});

Test.extend({
  ASSERTION_ERRORS: [Test.Unit.AssertionFailedError]
});

if (Console.NODE)
  Test.ASSERTION_ERRORS.push(require('assert').AssertionError);

Test.Unit.extend({
  AssertionMessage: new JS.Class({
    extend: {
      Literal: new JS.Class({
        initialize: function(value) {
          this._value = value;
          this.toString = this.inspect;
        },

        inspect: function() {
          return this._value.toString();
        }
      }),

      literal: function(value) {
        return new this.Literal(value);
      },

      Template: new JS.Class({
        extend: {
          create: function(string) {
            var parts = string ? string.match(/\(\?\)|(?=[^\\])\?|(?:(?!\(\?\))(?:\\\?|[^\?]))+/g) : [];
            return new this(parts);
          }
        },

        initialize: function(parts) {
          this._parts = new Enumerable.Collection(parts);
          this.count = this._parts.findAll(function(e) { return e === '?' || e === '(?)' }).length;
        },

        result: function(parameters) {
          if (parameters.length !== this.count) throw 'The number of parameters does not match the number of substitutions';
          var params = JS.array(parameters);
          return this._parts.collect(function(e) {
            if (e === '(?)') return params.shift().replace(/^\[/, '(').replace(/\]$/, ')');
            if (e === '?') return params.shift();
            return e.replace(/\\\?/g, '?');
          }).join('');
        }
      })
    },

    initialize: function(head, template, parameters) {
      this._head = head;
      this._templateString = template;
      this._parameters = new Enumerable.Collection(parameters);
    },

    template: function() {
      return this._template = this._template || this.klass.Template.create(this._templateString);
    },

    toString: function() {
      var messageParts = [], head, tail;
      if (this._head) messageParts.push(this._head);
      tail = this.template().result(this._parameters.collect(function(e) {
        return Console.convert(e);
      }, this));
      if (tail !== '') messageParts.push(tail);
      return messageParts.join('\n');
    }
  })
});

Test.Unit.extend({
  Failure: new JS.Class({
    initialize: function(testCase, message) {
      this._testCase = testCase;
      this._message  = message;
    },

    metadata: function() {
      return {
        test:   this.testMetadata(),
        error:  this.errorMetadata()
      }
    },

    testMetadata: function() {
      return this._testCase.metadata();
    },

    errorMetadata: function() {
      return {
        type:     'failure',
        message:  this._message
      };
    }
  })
});

Test.Unit.extend({
  Error: new JS.Class({
    initialize: function(testCase, exception) {
      if (typeof exception === 'string')
        exception = new Error(exception);

      this._testCase  = testCase;
      this._exception = exception;
    },

    metadata: function() {
      return {
        test:   this.testMetadata(),
        error:  this.errorMetadata()
      }
    },

    testMetadata: function() {
      return this._testCase.metadata();
    },

    errorMetadata: function() {
      return {
        type:       'error',
        message:    this._exception.name + ': ' + this._exception.message,
        backtrace:  Console.filterBacktrace(this._exception.stack)
      };
    }
  })
});

Test.Unit.extend({
  TestResult: new JS.Class({
    include: Test.Unit.Observable,

    extend: {
      CHANGED:  'Test.Unit.TestResult.CHANGED',
      FAULT:    'Test.Unit.TestResult.FAULT'
    },

    initialize: function() {
      this._runCount = this._assertionCount = 0;
      this._failures = [];
      this._errors   = [];
    },

    addRun: function() {
      this._runCount += 1;
      this.notifyListeners(this.klass.CHANGED, this);
    },

    addFailure: function(failure) {
      this._failures.push(failure);
      this.notifyListeners(this.klass.FAULT, failure);
      this.notifyListeners(this.klass.CHANGED, this);
    },

    addError: function(error) {
      this._errors.push(error);
      this.notifyListeners(this.klass.FAULT, error);
      this.notifyListeners(this.klass.CHANGED, this);
    },

    addAssertion: function() {
      this._assertionCount += 1;
      this.notifyListeners(this.klass.CHANGED, this);
    },

    passed: function() {
      return this._failures.length === 0 && this._errors.length === 0;
    },

    runCount: function() {
      return this._runCount;
    },

    assertionCount: function() {
      return this._assertionCount;
    },

    failureCount: function() {
      return this._failures.length;
    },

    errorCount: function() {
      return this._errors.length;
    },

    metadata: function() {
      return {
        passed:     this.passed(),
        tests:      this.runCount(),
        assertions: this.assertionCount(),
        failures:   this.failureCount(),
        errors:     this.errorCount()
      };
    }
  })
});

Test.Unit.extend({
  TestSuite: new JS.Class({
    include: Enumerable,

    extend: {
      STARTED:  'Test.Unit.TestSuite.STARTED',
      FINISHED: 'Test.Unit.TestSuite.FINISHED',

      forEach: function(tests, block, continuation, context) {
        var looping    = false,
            pinged     = false,
            n          = tests.length,
            i          = -1,
            breakTime  = new JS.Date().getTime(),
            setTimeout = Test.FakeClock.REAL.setTimeout;

        var ping = function() {
          pinged = true;
          var time = new JS.Date().getTime();

          if (Console.BROWSER && (time - breakTime) > 1000) {
            breakTime = time;
            looping = false;
            setTimeout(iterate, 0);
          }
          else if (!looping) {
            looping = true;
            while (looping) iterate();
          }
        };

        var iterate = function() {
          i += 1;
          if (i === n) {
            looping = false;
            return continuation && continuation.call(context);
          }
          pinged = false;
          block.call(context, tests[i], ping);
          if (!pinged) looping = false;
        };

        ping();
      }
    },

    initialize: function(metadata, tests) {
      this._metadata = metadata;
      this._tests    = tests;
    },

    forEach: function(block, continuation, context) {
      this.klass.forEach(this._tests, block, continuation, context);
    },

    run: function(result, continuation, callback, context) {
      if (this._metadata.fullName)
        callback.call(context, this.klass.STARTED, this);

      this.forEach(function(test, resume) {
        test.run(result, resume, callback, context)
      }, function() {
        if (this._metadata.fullName)
          callback.call(context, this.klass.FINISHED, this);

        continuation.call(context);
      }, this);
    },

    size: function() {
      if (this._size !== undefined) return this._size;
      var totalSize = 0, i = this._tests.length;
      while (i--) totalSize += this._tests[i].size();
      return this._size = totalSize;
    },

    empty: function() {
      return this._tests.length === 0;
    },

    metadata: function(root) {
      var data = JS.extend({size: this.size()}, this._metadata);
      if (root) {
        delete data.fullName;
        delete data.shortName;
        delete data.context;
      }
      return data;
    }
  })
});

Test.Unit.extend({
  TestCase: new JS.Class({
    include: Test.Unit.Assertions,

    extend: {
      STARTED:  'Test.Unit.TestCase.STARTED',
      FINISHED: 'Test.Unit.TestCase.FINISHED',

      reports:   [],
      handlers:  [],

      clear: function() {
        this.testCases = [];
      },

      inherited: function(klass) {
        if (!this.testCases) this.testCases = [];
        this.testCases.push(klass);
      },

      pushErrorCathcer: function(handler, push) {
        if (!handler) return;
        this.popErrorCathcer(false);

        if (Console.NODE)
          process.addListener('uncaughtException', handler);
        else if (Console.BROWSER)
          window.onerror = handler;

        if (push !== false) this.handlers.push(handler);
        return handler;
      },

      popErrorCathcer: function(pop) {
        var handlers = this.handlers,
            handler  = handlers[handlers.length - 1];

        if (!handler) return;

        if (Console.NODE)
          process.removeListener('uncaughtException', handler);
        else if (Console.BROWSER)
          window.onerror = null;

        if (pop !== false) {
          handlers.pop();
          this.pushErrorCathcer(handlers[handlers.length - 1], false);
        }
      },

      processError: function(testCase, error) {
        if (!error) return;

        if (Test.Unit.isFailure(error))
          testCase.addFailure(error.message);
        else
          testCase.addError(error);
      },

      runWithExceptionHandlers: function(testCase, _try, _catch, _finally) {
        try {
          _try.call(testCase);
        } catch (e) {
          if (_catch) _catch.call(testCase, e);
        } finally {
          if (_finally) _finally.call(testCase);
        }
      },

      metadata: function() {
        var shortName = this.displayName,
            context   = [],
            klass     = this,
            root      = Test.Unit.TestCase;

        while (klass !== root) {
          context.unshift(klass.displayName);
          klass = klass.superclass;
        }
        context.pop();

        return {
          fullName:   this === root ? '' : context.concat(shortName).join(' '),
          shortName:  shortName,
          context:    this === root ? null : context
        };
      },

      suite: function(filter) {
        var metadata    = this.metadata(),
            root        = Test.Unit.TestCase,
            fullName    = metadata.fullName,
            methodNames = new Enumerable.Collection(this.instanceMethods(false)),
            suite       = [],
            children    = [],
            child, i, n;

        var tests = methodNames.select(function(name) {
              if (!/^test./.test(name)) return false;
              name = name.replace(/^test:\W*/ig, '');
              return this.filter(fullName + ' ' + name, filter);
            }, this).sort();

        for (i = 0, n = tests.length; i < n; i++) {
          try { suite.push(new this(tests[i])) } catch (e) {}
        }

        if (this.testCases) {
          for (i = 0, n = this.testCases.length; i < n; i++) {
            child = this.testCases[i].suite(filter);
            if (child.size() === 0) continue;
            children.push(this.testCases[i].displayName);
            suite.push(child);
          }
        }

        metadata.children = children;
        return new Test.Unit.TestSuite(metadata, suite);
      },

      filter: function(name, filter) {
        if (!filter || filter.length === 0) return true;

        var n = filter.length;
        while (n--) {
          if (name.indexOf(filter[n]) >= 0) return true;
        }
        return false;
      }
    },

    initialize: function(testMethodName) {
      if (typeof this[testMethodName] !== 'function') throw 'invalid_test';
      this._methodName = testMethodName;
      this._testPassed = true;
    },

    run: function(result, continuation, callback, context) {
      callback.call(context, this.klass.STARTED, this);
      this._result = result;

      var teardown = function(error) {
        this.klass.processError(this, error);

        this.exec('teardown', function(error) {
          this.klass.processError(this, error);

          this.exec(function() { Test.Unit.mocking.verify() }, function(error) {
            this.klass.processError(this, error);

            result.addRun();
            callback.call(context, this.klass.FINISHED, this);
            continuation();
          });
        });
      };

      this.exec('setup', function() {
        this.exec(this._methodName, teardown);
      }, teardown);
    },

    exec: function(methodName, onSuccess, onError) {
      if (!methodName) return onSuccess.call(this);

      if (!onError) onError = onSuccess;

      var arity = (typeof methodName === 'function')
                ? methodName.length
                : this.__eigen__().instanceMethod(methodName).arity,

          callable = (typeof methodName === 'function') ? methodName : this[methodName],
          timeout  = null,
          failed   = false,
          resumed  = false,
          self     = this;

      if (arity === 0)
        return this.klass.runWithExceptionHandlers(this, function() {
          callable.call(this);
          onSuccess.call(this);
        }, onError);

      var onUncaughtError = function(error) {
        failed = true;
        self.klass.popErrorCathcer();
        if (timeout) JS.ENV.clearTimeout(timeout);
        onError.call(self, error);
      };
      this.klass.pushErrorCathcer(onUncaughtError);

      this.klass.runWithExceptionHandlers(this, function() {
        callable.call(this, function(asyncResult) {
          resumed = true;
          self.klass.popErrorCathcer();
          if (timeout) JS.ENV.clearTimeout(timeout);
          if (failed) return;

          if (typeof asyncResult === 'string') asyncResult = new Error(asyncResult);

          if (typeof asyncResult === 'object' && asyncResult !== null)
            onUncaughtError(asyncResult);
          else if (typeof asyncResult === 'function')
            self.exec(asyncResult, onSuccess, onError);
          else
            self.exec(null, onSuccess, onError);
        });
      }, onError);

      if (resumed || !JS.ENV.setTimeout) return;

      timeout = JS.ENV.setTimeout(function() {
        failed = true;
        self.klass.popErrorCathcer();
        var message = 'Timed out after waiting ' + Test.asyncTimeout + ' seconds for test to resume';
        onError.call(self, new Error(message));
      }, Test.asyncTimeout * 1000);
    },

    setup: function() {},

    teardown: function() {},

    passed: function() {
      return this._testPassed;
    },

    size: function() {
      return 1;
    },

    addAssertion: function() {
      this._result.addAssertion();
    },

    addFailure: function(message) {
      this._testPassed = false;
      this._result.addFailure(new Test.Unit.Failure(this, message));
    },

    addError: function(exception) {
      this._testPassed = false;
      this._result.addError(new Test.Unit.Error(this, exception));
    },

    metadata: function() {
      var klassData = this.klass.metadata(),
          shortName = this._methodName.replace(/^test:\W*/ig, '');

      return {
        fullName:   klassData.fullName + ' ' + shortName,
        shortName:  shortName,
        context:    klassData.context.concat(klassData.shortName)
      };
    },

    toString: function() {
      return 'TestCase{' + this.metadata().fullName + '}';
    }
  })
});

Test.UI.extend({
  Terminal: new JS.Class({
    getOptions: function() {
      var options = {},
          format  = Console.envvar('FORMAT'),
          test    = Console.envvar('TEST');

      if (Console.envvar('TAP')) options.format = 'tap';

      if (format) options.format = format;
      if (test)   options.test   = [test];

      delete options.argv;
      options.test = options.test || [];
      return options;
    },

    getReporters: function(options) {
      var R = Test.Reporters,
          Printer = R.get(options.format) || R.Dot;

      return [
        new R.Coverage(options),
        new Printer(options),
        new R.ExitStatus(options)
      ];
    }
  })
});

Test.UI.extend({
  Browser: new JS.Class({
    getOptions: function() {
      var qs      = (location.search || '').replace(/^\?/, ''),
          pairs   = qs.split('&'),
          options = {},
          parts, key, value;

      for (var i = 0, n = pairs.length; i < n; i++) {
        parts = pairs[i].split('=');
        key   = decodeURIComponent(parts[0]);
        value = decodeURIComponent(parts[1]);

        if (/\[\]$/.test(parts[0])) {
          key = key.replace(/\[\]$/, '');
          if (!(options[key] instanceof Array)) options[key] = [];
          options[key].push(value);
        } else {
          options[key] = value;
        }
      }

      if (options.test)
        options.test = [].concat(options.test);
      else
        options.test = [];

      return options;
    },

    getReporters: function(options) {
      var reporters = [],
          R         = Test.Reporters,
          reg       = R._registry,
          browser   = new R.Browser(options),
          reporter;

      reporters.push(new R.Coverage());
      reporters.push(browser);

      for (var name in reg) {
        reporter = reg[name] && reg[name].create && reg[name].create(options, browser);
        if (reporter) reporters.push(reporter);
      }

      return reporters;
    }
  })
});

Test.Reporters.extend({
  Error: new JS.Class({
    include: Console,

    NAMES: {
      failure:  'Failure',
      error:    'Error'
    },

    startSuite: function(event) {
      this._faults = [];
      this._start  = event.timestamp;

      this.consoleFormat('bold');
      this.puts('Loaded suite: ' + event.children.join(', '));
      this.reset();
      this.puts('');
    },

    startContext: function(event) {},

    startTest: function(event) {},

    addFault: function(event) {
      this._faults.push(event);
      this._printFault(this._faults.length, event);
    },

    update: function(event) {},

    endTest: function(event) {},

    endContext: function(event) {},

    endSuite: function(event) {
      this._printSummary(event);
    },

    _printFault: function(index, fault) {
      this.consoleFormat('bold', 'red');
      this.puts(index + ') ' + this.NAMES[fault.error.type] + ': ' + fault.test.fullName);
      this.reset();
      this.puts(fault.error.message);
      if (fault.error.backtrace) {
        this.grey();
        this.puts(fault.error.backtrace);
      }
      this.reset();
      this.puts('');
    },

    _printSummary: function(event) {
      var runtime = (event.timestamp - this._start) / 1000;
      this.reset();
      this.puts('Finished in ' + runtime + ' seconds');

      var color = event.passed ? 'green' : 'red';
      this.consoleFormat(color);
      this.puts(this._plural(event.tests, 'test') + ', ' +
                this._plural(event.assertions, 'assertion') + ', ' +
                this._plural(event.failures, 'failure') + ', ' +
                this._plural(event.errors, 'error'));
      this.reset();
      this.puts('');
    },

    _plural: function(number, noun) {
      return number + ' ' + noun + (number === 1 ? '' : 's');
    }
  })
});

Test.Reporters.register('error', Test.Reporters.Error);

Test.Reporters.extend({
  Dot: new JS.Class(Test.Reporters.Error, {
    SYMBOLS: {
      failure:  'F',
      error:    'E'
    },

    startTest: function(event) {
      this._outputFault = false;
    },

    addFault: function(event) {
      this._faults.push(event);
      if (this._outputFault) return;
      this._outputFault = true;
      this.consoleFormat('bold', 'red');
      this.print(this.SYMBOLS[event.error.type]);
      this.reset();
    },

    endTest: function(event) {
      if (this._outputFault) return;
      this.consoleFormat('green');
      this.print('.');
      this.reset();
    },

    endSuite: function(event) {
      this.puts('\n');

      for (var i = 0, n = this._faults.length; i < n; i++)
        this._printFault(i + 1, this._faults[i]);

      this._printSummary(event);
    }
  })
});

Test.Reporters.register('dot', Test.Reporters.Dot);

Test.Reporters.extend({
  JSON: new JS.Class({
    include: Console,

    _log: function(eventName, data) {
      if (!JS.ENV.JSON) return;
      this.puts(JSON.stringify({jstest: [eventName, data]}));
    },

    extend: {
      create: function() {
        if (!JS.ENV.navigator) return;
        if (Test.Reporters.Headless.UA.test(navigator.userAgent)) return new this();
      },

      Reader: new JS.Class({
        initialize: function(reporter) {
          this._reporter = new Test.Reporters.Composite([reporter]);
        },

        read: function(message) {
          if (!JS.ENV.JSON) return false;
          try {
            var data    = JSON.parse(message),
                payload = data.jstest,
                method  = payload[0],
                event   = payload[1];

            this._reporter[method](event);
            return true;
          }
          catch (e) {
            return false;
          }
        }
      })
    }
  })
});

(function() {
  var methods = Test.Reporters.METHODS,
      n       = methods.length;

  while (n--)
    (function(i) {
      var method = methods[i];
      Test.Reporters.JSON.define(method, function(event) {
        this._log(method, event);
      });
    })(n);
})();

Test.Reporters.register('json', Test.Reporters.JSON);

Test.Reporters.extend({
  TAP: new JS.Class({
    extend: {
      HOSTNAME: 'testling',

      create: function(options) {
        if (!JS.ENV.location) return;
        var parts = location.hostname.split('.');
        if (JS.indexOf(parts, this.HOSTNAME) >= 0) return new this(options);
      }
    },

    include: Console,

    startSuite: function(event) {
      this._testId = 0;
      this.puts('1..' + event.size);
    },

    startContext: function(event) {},

    startTest: function(event) {
      this._testPassed = true;
      this._faults = [];
    },

    addFault: function(event) {
      this._testPassed = false;
      this._faults.push(event);
    },

    endTest: function(event) {
      var line = this._testPassed ? 'ok' : 'not ok';
      line += ' ' + ++this._testId + ' - ' + this._format(event.fullName);
      this.puts(line);

      var fault, message, parts, j, m;
      for (var i = 0, n = this._faults.length; i < n; i++) {
        fault = this._faults[i];
        var message = fault.error.message;
        if (fault.error.backtrace) message += '\n' + fault.error.backtrace;
        parts = message.split(/[\r\n]/);
        for (j = 0, m = parts.length; j < m; j++)
          this.puts('    ' + parts[j]);
      }
    },

    endContext: function(event) {},

    update: function(event) {},

    endSuite: function(event) {},

    _format: function(string) {
      return string.replace(/[\s\t\r\n]+/g, ' ');
    }
  })
});

Test.Reporters.register('tap', Test.Reporters.TAP);

Test.Reporters.extend({
  ExitStatus: new JS.Class({
    startSuite: function(event) {},

    startContext: function(event) {},

    startTest: function(event) {},

    addFault: function(event) {},

    endTest: function(event) {},

    endContext: function(event) {},

    update: function(event) {},

    endSuite: function(event) {
      Console.exit(event.passed ? 0 : 1);
    }
  })
});

// http://phantomjs.org/
// http://slimerjs.org/

Test.Reporters.extend({
  Headless: new JS.Class({
    extend: {
      UA: /\b(PhantomJS|SlimerJS)\b/
    },

    initialize: function(options) {
      this._options = options || {};

      var format = Console.envvar('FORMAT');

      if (Console.envvar('TAP')) format = format || 'tap';
      this._options.format = this._options.format || format;

      var R        = Test.Reporters,
          Printer  = R.get(this._options.format) || R.Dot,
          reporter = new R.Composite();

      reporter.addReporter(new Printer(options));
      reporter.addReporter(new R.ExitStatus());

      this._reader = new R.JSON.Reader(reporter);
    },

    open: function(url) {
      var page = (typeof WebPage === 'function') ? new WebPage() : require('webpage').create(),
          self = this;

      page.onConsoleMessage = function(message) {
        if (!self._reader.read(message)) console.log(message);
      };
      page.open(url);
      return page;
    }
  })
});

Test.Reporters.extend({
  Browser: new JS.Class({
    initialize: function(options) {
      this._options = options || {};
    },

    _contextFor: function(test) {
      var context = this._context,
          scopes  = test.context;

      for (var i = 0, n = scopes.length; i < n; i++)
        context = context.child(scopes[i]);

      return context;
    },

    startSuite: function(event) {
      var self = this;
      if (this._container) document.body.removeChild(this._container);
      this._start = event.timestamp;

      this._container = DOM.div({className: 'test-result-container'}, function(div) {
        div.table({className: 'report'}, function(table) {
          table.thead(function(thead) {
            thead.tr(function(tr) {
              tr.th({scope: 'col'}, 'Tests');
              tr.th({scope: 'col'}, 'Assertions');
              tr.th({scope: 'col'}, 'Failures');
              tr.th({scope: 'col'}, 'Errors');
            });
          });
          table.tbody(function(tbody) {
            tbody.tr(function(tr) {
              self._tests      = tr.td();
              self._assertions = tr.td();
              self._failures   = tr.td();
              self._errors     = tr.td();
            });
          });
        });
        self._light = div.div({className: 'light light-pending'});
        div.p({className: 'user-agent'}, window.navigator.userAgent);
        self._context = new self.klass.Context('spec', div.ul({className: 'specs'}), undefined, self._options);
        self._summary = div.p({className: 'summary'});
      });

      document.body.insertBefore(this._container, document.body.firstChild);
      this.update({tests: 0, assertions: 0, failures: 0, errors: 0});
    },

    startContext: function(event) {},

    startTest: function(event) {
      this._contextFor(event).addTest(event.shortName);
    },

    addFault: function(event) {
      this._contextFor(event.test).child(event.test.shortName).addFault(event.error);
    },

    endTest: function(event) {},

    endContext: function(event) {},

    update: function(event) {
      this._tests.innerHTML      = String(event.tests);
      this._assertions.innerHTML = String(event.assertions);
      this._failures.innerHTML   = String(event.failures);
      this._errors.innerHTML     = String(event.errors);
    },

    endSuite: function(event) {
      this.update(event);
      DOM.removeClass(this._light, 'light-pending');
      DOM.addClass(this._light, event.passed ? 'light-passed' : 'light-failed');

      var runtime = (event.timestamp - this._start) / 1000;
      this._summary.innerHTML = 'Finished in ' + runtime + ' seconds';
    },

    serialize: function() {
      var items = document.getElementsByTagName('li'),
          n     = items.length;
      while (n--) DOM.removeClass(items[n], 'closed');

      var items = document.getElementsByTagName('script'),
          n     = items.length;
      while (n--) items[n].parentNode.removeChild(items[n]);

      var html = document.getElementsByTagName('html')[0];
      return '<!doctype html><html>' + html.innerHTML + '</html>';
    }
  })
});

Test.Reporters.Browser.extend({
  Context: new JS.Class({
    initialize: function(type, parent, name, options) {
      this._parent   = parent;
      this._type     = type;
      this._name     = name;
      this._options  = options;
      this._children = [];

      if (name === undefined) {
        this._ul = parent;
        return;
      }

      var container = this._parent._ul || this._parent,
          fields    = {_tests: 'Tests', _failures: 'Failed'},
          self      = this;

      this._li = new DOM.Builder(container).li({className: this._type + ' passed'}, function(li) {
        li.ul({className: 'stats'}, function(ul) {
          for (var key in fields)
            ul.li(function(li) {
              li.span({className: 'label'}, fields[key] + ': ');
              self[key] = li.span({className: 'number'}, '0');
            });
        });
        if (name) {
          self._toggle = li.p({className: self._type + '-name'}, name);
          self._runner = DOM.span({className: 'runner'}, 'Run');
          self._toggle.insertBefore(self._runner, self._toggle.firstChild);
        }
        self._ul = li.ul({className: 'children'});
      });

      var filters = this._options.test || [];
      if (filters.length === 0)
        DOM.addClass(this._li, 'closed');

      DOM.Event.on(this._toggle, 'click', function() {
        DOM.toggleClass(this._li, 'closed');
      }, this);

      if (this._runner)
        DOM.Event.on(this._runner, 'click', this.runTest, this);
    },

    ping: function(field) {
      if (!this[field]) return;
      this[field].innerHTML = parseInt(this[field].innerHTML) + 1;
      if (this._parent.ping) this._parent.ping(field);
    },

    fail: function() {
      if (!this._li) return;
      DOM.removeClass(this._li, 'passed');
      DOM.addClass(this._toggle, 'failed');
      if (this._parent.fail) this._parent.fail();
    },

    child: function(name) {
      return this._children[name] = this._children[name] ||
                                    new this.klass('spec', this, name, this._options);
    },

    addTest: function(name) {
      var test = this._children[name] = new this.klass('test', this, name, this._options);
      test.ping('_tests');
    },

    addFault: function(fault) {
      var message = fault.message;
      if (fault.backtrace) message += '\n' + fault.backtrace;

      var item = DOM.li({className: 'fault'}, function(li) {
        li.p(function(p) {
          var parts = message.split(/[\r\n]+/);
          for (var i = 0, n = parts.length; i < n; i++) {
            if (i > 0) p.br();
            p.concat(parts[i]);
          }
        });
      });
      this._ul.appendChild(item);
      this.ping('_failures');
      this.fail();
    },

    getName: function() {
      var parts  = [],
          parent = this._parent && this._parent.getName && this._parent.getName();

      if (parent) parts.push(parent);
      parts.push(this._name);
      return parts.join(' ');
    },

    runTest: function() {
      window.location.search = 'test=' + encodeURIComponent(this.getName());
    }
  })
});

Test.Reporters.extend({
  Coverage: new JS.Class({
    include: Console,

    startSuite: function(event) {},

    startContext: function(event) {},

    startTest: function(event) {},

    addFault: function(event) {},

    endTest: function(event) {},

    endContext: function(event) {},

    update: function(event) {},

    endSuite: function(event) {
      var reports = Test.Unit.TestCase.reports;
      for (var i = 0, n = reports.length; i < n; i++) {
        this.reset();
        this.puts('');
        reports[i].report();
      }
    }
  })
});

Test.Reporters.extend({
  Composite: new JS.Class({
    initialize: function(reporters) {
      this._reporters = reporters || [];
      this._queue     = [];
      this._pointer   = 0;
    },

    addReporter: function(reporter) {
      if (!reporter) return;
      this._reporters.push(reporter);
    },

    removeReporter: function(reporter) {
      var index = JS.indexOf(this._reporters, reporter);
      if (index >= 0) this._reporters.splice(index, 1);
    },

    flush: function() {
      var queue = this._queue, method, event, i, n, fn;
      while (queue[this._pointer] !== undefined) {
        method = queue[this._pointer][0];
        event =  queue[this._pointer][1];
        for (i = 0, n = this._reporters.length; i < n; i++) {
          fn = this._reporters[i][method];
          if (fn) fn.call(this._reporters[i], event);
        }
        this._pointer += 1;
      }
    }
  })
});

(function() {
  var methods = Test.Reporters.METHODS,
      n       = methods.length;

  while (n--)
    (function(i) {
      var method = methods[i];
      Test.Reporters.Composite.define(method, function(event) {
        this._queue[event.eventId] = [method, event];
        this.flush();
      });
    })(n);
})();

// https://github.com/jquery/testswarm

Test.Reporters.extend({
  TestSwarm: new JS.Class({
    extend: {
      create: function(options, browser) {
        if (JS.ENV.TestSwarm) return new this(options, browser);
      }
    },

    initialize: function(options, browserReporter) {
      this._browserReporter = browserReporter;

      TestSwarm.serialize = function() {
        return browserReporter.serialize();
      };
    },

    startSuite: function(event) {},

    startContext: function(event) {},

    startTest: function(event) {},

    addFault: function(event) {},

    endTest: function(event) {
      TestSwarm.heartbeat();
    },

    endContext: function(event) {},

    update: function(event) {},

    endSuite: function(event) {
      TestSwarm.submit({
        fail:   event.failures,
        error:  event.errors,
        total:  event.tests
      });
    }
  })
});

Test.Reporters.register('testswarm', Test.Reporters.TestSwarm);

Test.extend({
  Context: new JS.Module({
    extend: {
      included: function(base) {
        base.extend(Test.Context.Context, {_resolve: false});
        base.include(Test.Context.LifeCycle, {_resolve: false});
        base.extend(Test.Context.Test, {_resolve: false});
        base.include(Console);
      },

      Context: new JS.Module({
        context: function(name, block) {
          var klass = new JS.Class(name.toString(), this, {}, {_resolve: false});
          klass.__eigen__().resolve();
          block.call(klass);
          return klass;
        },

        cover: function(module) {
          var logger = new Test.Coverage(module);
          this.before_all_callbacks.push(logger.method('attach'));
          this.after_all_callbacks.push(logger.method('detach'));
          Test.Unit.TestCase.reports.push(logger);
        }
      })
    }
  }),

  describe: function(name, block) {
    var klass = new JS.Class(name.toString(), Test.Unit.TestCase, {}, {_resolve: false});
    klass.include(Test.Context, {_resolve: false});
    klass.__eigen__().resolve();

    block.call(klass);
    return klass;
  }
});

Test.Context.Context.alias({describe: 'context'});

Test.extend({
  context:  Test.describe
});

Test.Context.LifeCycle = new JS.Module({
  extend: {
    included: function(base) {
      base.extend(this.ClassMethods);

      base.before_all_callbacks     = [];
      base.before_each_callbacks    = [];
      base.after_all_callbacks      = [];
      base.after_each_callbacks     = [];
      base.before_should_callbacks  = {};

      base.extend({
        inherited: function(child) {
          this.callSuper();
          child.before_all_callbacks    = [];
          child.before_each_callbacks   = [];
          child.after_all_callbacks     = [];
          child.after_each_callbacks    = [];
          child.before_should_callbacks = {};
        }
      });
    },

    ClassMethods: new JS.Module({
      blockTransform: function(block) {
        return block;
      },

      before: function(period, block) {
        if (block === undefined) {
          block  = period;
          period = 'each';
        }

        this['before_' + (period + '_') + 'callbacks'].push(this.blockTransform(block));
      },

      after: function(period, block) {
        if (block === undefined) {
          block  = period;
          period = 'each';
        }

        this['after_' + (period + '_') + 'callbacks'].push(this.blockTransform(block));
      },

      gatherCallbacks: function(callbackType, period) {
        var outerCallbacks = (typeof this.superclass.gatherCallbacks === 'function')
          ? this.superclass.gatherCallbacks(callbackType, period)
          : [];

        var mine = this[callbackType + '_' + (period + '_') + 'callbacks'];

        return (callbackType === 'before')
                ? outerCallbacks.concat(mine)
                : mine.concat(outerCallbacks);
      }
    })
  },

  setup: function(resume) {
    if (this.klass.before_should_callbacks[this._methodName])
      this.klass.before_should_callbacks[this._methodName].call(this);

    this.runCallbacks('before', 'each', resume);
  },

  teardown: function(resume) {
    this.runCallbacks('after', 'each', resume);
  },

  runCallbacks: function(callbackType, period, continuation) {
    var callbacks = this.klass.gatherCallbacks(callbackType, period);

    Test.Unit.TestSuite.forEach(callbacks, function(callback, resume) {
      this.exec(callback, resume, continuation);
    }, continuation, this);
  },

  runAllCallbacks: function(callbackType, continuation, context) {
    var previousIvars = this.instanceVariables();
    this.runCallbacks(callbackType, 'all', function() {

      var ivars = this.instanceVariables().inject({}, function(hash, ivar) {
        if (previousIvars.member(ivar)) return hash;
        hash[ivar] = this[ivar];
        return hash;
      }, this);

      if (continuation) continuation.call(context, ivars);
    });
  },

  setValuesFromCallbacks: function(values) {
    for (var key in values)
      this[key] = values[key];
  },

  instanceVariables: function() {
    var ivars = [];
    for (var key in this) {
      if (this.hasOwnProperty(key)) ivars.push(key);
    }
    return new Enumerable.Collection(ivars);
  }
});

(function() {
  var m = Test.Context.LifeCycle.ClassMethods.method('instanceMethod');

  Test.Context.LifeCycle.ClassMethods.include({
    setup:    m('before'),
    teardown: m('after')
  });
})();

Test.Context.extend({
  SharedBehavior: new JS.Class(JS.Module, {
    extend: {
      createFromBehavior: function(beh) {
        var mod = new this();
        mod._behavior = beh;
        return mod;
      },

      moduleName: function(name) {
        return name.toLowerCase()
                   .replace(/[\s:',\.~;!#=\(\)&]+/g, '_')
                   .replace(/\/(.?)/g, function(m,a) { return '.' + a.toUpperCase() })
                   .replace(/(?:^|_)(.)/g, function(m,a) { return a.toUpperCase() });
      }
    },

    included: function(arg) {
      this._behavior.call(arg);
    }
  })
});

Test.Unit.TestCase.extend({
  shared: function(name, block) {
    name = Test.Context.SharedBehavior.moduleName(name);
    JS.ENV[name] = Test.Context.SharedBehavior.createFromBehavior(block);
  },

  use: function(sharedName) {
    if (JS.isType(sharedName, Test.Context.SharedBehavior) ||
        JS.isType(sharedName, JS.Module))
      this.include(sharedName);

    else if (JS.isType(sharedName, 'string')) {
      var name = Test.Context.SharedBehavior.moduleName(sharedName),
          beh  = JS.ENV[name];

      if (!beh) throw new Error('Could not find example group named "' + sharedName + '"');
      this.include(beh);
    }
  }
});

(function() {
  var alias = function(method, aliases) {
    var extension = {};
    for (var i = 0, n = aliases.length; i < n; i++)
      extension[aliases[i]] = Test.Unit.TestCase[method];
    Test.Unit.TestCase.extend(extension);
  };

  alias('shared', ['sharedBehavior', 'shareAs', 'shareBehaviorAs', 'sharedExamplesFor']);
  alias('use', ['uses', 'itShouldBehaveLike', 'behavesLike', 'usesExamplesFrom']);
})();

Test.Context.Test = new JS.Module({
  test: function(name, opts, block) {
    var testName = 'test: ' + name;

    if (JS.indexOf(this.instanceMethods(false), testName) >= 0)
      throw new Error(testName + ' is already defined in ' + this.displayName);

    opts = opts || {};

    if (typeof opts === 'function') {
      block = opts;
    } else {
      if (opts.before !== undefined)
        this.before_should_callbacks[testName] = opts.before;
    }

    this.define(testName, this.blockTransform(block), {_resolve: false});
  },

  beforeTest: function(name, block) {
    this.it(name, {before: block}, function() {});
  }
});

Test.Context.Test.alias({
  it:           'test',
  should:       'test',
  tests:        'test',
  beforeIt:     'beforeTest',
  beforeShould: 'beforeTest',
  beforeTests:  'beforeTest'
});

Test.Unit.TestSuite.include({
  run: function(result, continuation, callback, context) {
    if (this._metadata.fullName)
      callback.call(context, this.klass.STARTED, this);

    var withIvars = function(ivarsFromCallback) {
      this.forEach(function(test, resume) {
        if (ivarsFromCallback && test.setValuesFromCallbacks)
          test.setValuesFromCallbacks(ivarsFromCallback);

        test.run(result, resume, callback, context);

      }, function() {
        var afterCallbacks = function() {
          if (this._metadata.fullName)
            callback.call(context, this.klass.FINISHED, this);

          continuation.call(context);
        };
        if (ivarsFromCallback && first.runAllCallbacks)
          first.runAllCallbacks('after', afterCallbacks, this);
        else
          afterCallbacks.call(this);

      }, this);
    };

    var first = this._tests[0], ivarsFromCallback = null;

    if (first && first.runAllCallbacks)
      first.runAllCallbacks('before', withIvars, this);
    else
      withIvars.call(this, null);
  }
});

Test.extend({
  Mocking: new JS.Module({
    extend: {
      ExpectationError: new JS.Class(Test.Unit.AssertionFailedError),

      UnexpectedCallError: new JS.Class(Error, {
        initialize: function(message) {
          this.message = message.toString();
        }
      }),

      __activeStubs__: [],

      stub: function(object, methodName, implementation) {
        var constructor = false, stub;

        if (object === 'new') {
          object         = methodName;
          methodName     = implementation;
          implementation = undefined;
          constructor    = true;
        }
        if (JS.isType(object, 'string')) {
          implementation = methodName;
          methodName     = object;
          object         = JS.ENV;
        }

        var stubs = this.__activeStubs__,
            i     = stubs.length;

        while (i--) {
          if (stubs[i]._object === object && stubs[i]._methodName === methodName) {
            stub = stubs[i];
            break;
          }
        }

        if (!stub) stub = new Test.Mocking.Stub(object, methodName);
        stubs.push(stub);
        return stub.createMatcher(implementation, constructor);
      },

      removeStubs: function() {
        var stubs = this.__activeStubs__,
            i     = stubs.length;

        while (i--) stubs[i].revoke();
        this.__activeStubs__ = [];
      },

      verify: function() {
        try {
          var stubs = this.__activeStubs__;
          for (var i = 0, n = stubs.length; i < n; i++)
            stubs[i]._verify();
        } finally {
          this.removeStubs();
        }
      },

      Stub: new JS.Class({
        initialize: function(object, methodName) {
          this._object     = object;
          this._methodName = methodName;
          this._original   = object[methodName];
          this._matchers   = [];

          this._ownProperty = object.hasOwnProperty
                            ? object.hasOwnProperty(methodName)
                            : (typeof this._original !== 'undefined');

          this.activate();
        },

        createMatcher: function(implementation, constructor) {
          if (implementation !== undefined && typeof implementation !== 'function') {
            this._object[this._methodName] = implementation;
            return null;
          }

          var mocking = JS.Test.Mocking,
              matcher = new mocking.Parameters([new mocking.AnyArgs()], constructor, implementation);

          this._matchers.push(matcher);
          return matcher;
        },

        activate: function() {
          var object = this._object, methodName = this._methodName;
          if (object[methodName] !== this._original) return;

          var self = this;

          var shim = function() {
            var isConstructor = (this instanceof shim);
            return self._dispatch(this, arguments, isConstructor);
          };
          object[methodName] = shim;
        },

        revoke: function() {
          if (this._ownProperty) {
            this._object[this._methodName] = this._original;
          } else {
            try {
              delete this._object[this._methodName];
            } catch (e) {
              this._object[this._methodName] = undefined;
            }
          }
        },

        _dispatch: function(receiver, args, isConstructor) {
          var matchers = this._matchers,
              eligible = [],
              matcher, result;

          for (var i = 0, n = matchers.length; i < n; i++) {
            matcher = matchers[i];
            result  = matcher.match(receiver, args, isConstructor);
            if (!result) continue;
            matcher.ping();
            eligible.push([matcher, result]);
          }

          if (eligible.length === 0)
            this._throwUnexpectedCall(receiver, args, isConstructor);

          eligible = eligible.pop();
          matcher  = eligible[0];
          result   = eligible[1];

          if (result.fake) return result.fake.apply(receiver, args);

          if (result.exception) throw result.exception;

          if (result.hasOwnProperty('callback')) {
            if (!result.callback) this._throwUnexpectedCall(receiver, args, isConstructor);
            result.callback.apply(result.context, matcher.nextYieldArgs());
          }

          if (result) return matcher.nextReturnValue();
        },

        _throwUnexpectedCall: function(receiver, args, isConstructor) {
          var message;
          if (isConstructor) {
            message = new Test.Unit.AssertionMessage('',
                          '<?> unexpectedly constructed with arguments:\n(?)',
                          [this._original, JS.array(args)]);
          } else {
            message = new Test.Unit.AssertionMessage('',
                          '<?> unexpectedly received call to ' + this._methodName + '() with arguments:\n(?)',
                          [receiver, JS.array(args)]);
          }
          throw new Test.Mocking.UnexpectedCallError(message);
        },

        _verify: function() {
          for (var i = 0, n = this._matchers.length; i < n; i++)
            this._matchers[i].verify(this._object, this._methodName, this._original);
        }
      })
    }
  })
});

Test.Mocking.extend({
  Parameters: new JS.Class({
    initialize: function(params, constructor, implementation) {
      this._params      = JS.array(params);
      this._constructor = constructor;
      this._fake        = implementation;
      this._expected    = false;
      this._callsMade   = 0;
    },

    withNew: function() {
      this._constructor = true;
      return this;
    },

    on: function(target) {
      this._target = target;
      return this;
    },

    given: function() {
      this._params = JS.array(arguments);
      return this;
    },

    returns: function() {
      this._returnIndex  = 0;
      this._returnValues = arguments;
      return this;
    },

    yields: function() {
      this._yieldIndex = 0;
      this._yieldArgs  = arguments;
      return this;
    },

    raises: function(exception) {
      this._exception = exception;
      return this;
    },

    expected: function() {
      this._expected = true;
      return this;
    },

    atLeast: function(n) {
      this._expected = true;
      this._minimumCalls = n;
      return this;
    },

    atMost: function(n) {
      this._expected = true;
      this._maximumCalls = n;
      return this;
    },

    exactly: function(n) {
      this._expected = true;
      this._expectedCalls = n;
      return this;
    },

    match: function(receiver, args, isConstructor) {
      var argsCopy = JS.array(args), callback, context;

      if (this._constructor !== isConstructor) return false;

      if (this._yieldArgs) {
        if (typeof argsCopy[argsCopy.length - 2] === 'function') {
          context  = argsCopy.pop();
          callback = argsCopy.pop();
        } else if (typeof argsCopy[argsCopy.length - 1] === 'function') {
          context  = null;
          callback = argsCopy.pop();
        }
      }

      if (this._target !== undefined && !Enumerable.areEqual(this._target, receiver))
        return false;
      if (!Enumerable.areEqual(this._params, argsCopy))
        return false;

      var result = {};

      if (this._exception) { result.exception = this._exception }
      if (this._yieldArgs) { result.callback = callback; result.context = context }
      if (this._fake)      { result.fake = this._fake }

      return result;
    },

    nextReturnValue: function() {
      if (!this._returnValues) return undefined;
      var value = this._returnValues[this._returnIndex];
      this._returnIndex = (this._returnIndex + 1) % this._returnValues.length;
      return value;
    },

    nextYieldArgs: function() {
      if (!this._yieldArgs) return undefined;
      var value = this._yieldArgs[this._yieldIndex];
      this._yieldIndex = (this._yieldIndex + 1) % this._yieldArgs.length;
      return value;
    },

    ping: function() {
      this._callsMade += 1;
    },

    toArray: function() {
      var array = this._params.slice();
      if (this._yieldArgs) array.push(new Test.Mocking.InstanceOf(Function));
      return array;
    },

    verify: function(object, methodName, original) {
      if (!this._expected) return;

      var okay = true, extraMessage;

      if (this._callsMade === 0 && this._maximumCalls === undefined && this._expectedCalls === undefined) {
        okay = false;
      } else if (this._expectedCalls !== undefined && this._callsMade !== this._expectedCalls) {
        extraMessage = this._createMessage('exactly');
        okay = false;
      } else if (this._maximumCalls !== undefined && this._callsMade > this._maximumCalls) {
        extraMessage = this._createMessage('at most');
        okay = false;
      } else if (this._minimumCalls !== undefined && this._callsMade < this._minimumCalls) {
        extraMessage = this._createMessage('at least');
        okay = false;
      }
      if (okay) return;

      var target = this._target || object, message;
      if (this._constructor) {
        message = new Test.Unit.AssertionMessage('Mock expectation not met',
                      '<?> expected to be constructed with\n(?)' +
                      (extraMessage ? '\n' + extraMessage : ''),
                      [original, this.toArray()]);
      } else {
        message = new Test.Unit.AssertionMessage('Mock expectation not met',
                      '<?> expected to receive call\n' + methodName + '(?)' +
                      (extraMessage ? '\n' + extraMessage : ''),
                      [target, this.toArray()]);
      }

      throw new Test.Mocking.ExpectationError(message);
    },

    _createMessage: function(type) {
      var actual = this._callsMade,
          report = 'but ' + actual + ' call' + (actual === 1 ? ' was' : 's were') + ' made';

      var copy = {
        'exactly':   this._expectedCalls,
        'at most':   this._maximumCalls,
        'at least':  this._minimumCalls
      };
      return type + ' ' + copy[type] + ' times\n' + report;
    }
  })
});

Test.Mocking.Parameters.alias({
  raising:    'raises',
  returning:  'returns',
  yielding:   'yields'
});

Test.Mocking.extend({
  Anything: new JS.Class({
    equals: function() { return true },
    toString: function() { return 'anything()' }
  }),

  AnyArgs: new JS.Class({
    equals: function() { return Enumerable.ALL_EQUAL },
    toString: function() { return 'anyArgs()' }
  }),

  ArrayIncluding: new JS.Class({
    initialize: function(elements) {
      this._elements = Array.prototype.slice.call(elements);
    },

    equals: function(array) {
      if (!JS.isType(array, Array)) return false;
      var i = this._elements.length, j;
      loop: while (i--) {
        j = array.length;
        while (j--) {
          if (Enumerable.areEqual(this._elements[i], array[j]))
            continue loop;
        }
        return false;
      }
      return true;
    },

    toString: function() {
      var name = Console.convert(this._elements).replace(/^\[/, '').replace(/\]$/, '');
      return 'arrayIncluding(' + name + ')';
    }
  }),

  ObjectIncluding: new JS.Class({
    initialize: function(elements) {
      this._elements = elements;
    },

    equals: function(object) {
      if (!JS.isType(object, Object)) return false;
      for (var key in this._elements) {
        if (!Enumerable.areEqual(this._elements[key], object[key]))
          return false;
      }
      return true;
    },

    toString: function() {
      var name = Console.convert(this._elements);
      return 'objectIncluding(' + name + ')';
    }
  }),

  InstanceOf: new JS.Class({
    initialize: function(type) {
      this._type = type;
    },

    equals: function(object) {
      return JS.isType(object, this._type);
    },

    toString: function() {
      var name = Console.convert(this._type);
      return 'instanceOf(' + name + ')';
    }
  }),

  Matcher: new JS.Class({
    initialize: function(type) {
      this._type = type;
    },

    equals: function(object) {
      return JS.match(this._type, object);
    },

    toString: function() {
      var name = Console.convert(this._type);
      return 'match(' + name + ')';
    }
  })
});

Test.Mocking.extend({
  DSL: new JS.Module({
    stub: function() {
      return Test.Mocking.stub.apply(Test.Mocking, arguments);
    },

    expect: function() {
      var stub = Test.Mocking.stub.apply(Test.Mocking, arguments);
      stub.expected();
      this.addAssertion();
      return stub;
    },

    anything: function() {
      return new Test.Mocking.Anything();
    },

    anyArgs: function() {
      return new Test.Mocking.AnyArgs();
    },

    instanceOf: function(type) {
      return new Test.Mocking.InstanceOf(type);
    },

    match: function(type) {
      return new Test.Mocking.Matcher(type);
    },

    arrayIncluding: function() {
      return new Test.Mocking.ArrayIncluding(arguments);
    },

    objectIncluding: function(elements) {
      return new Test.Mocking.ObjectIncluding(elements);
    }
  })
});

Test.Unit.TestCase.include(Test.Mocking.DSL);
Test.Unit.mocking = Test.Mocking;

Test.extend({
  AsyncSteps: new JS.Class(JS.Module, {
    define: function(name, method) {
      this.callSuper(name, function() {
        var args = [name, method].concat(JS.array(arguments));
        this.__enqueue__(args);
      });
    },

    included: function(klass) {
      klass.include(Test.AsyncSteps.Sync);
      if (!klass.blockTransform) return;

      klass.extend({
        blockTransform: function(block) {
          return function(resume) {
            this.exec(block, function(error) {
              this.sync(function() { resume(error) });
            });
          };
        }
      });
    },

    extend: {
      Sync: new JS.Module({
        __enqueue__: function(args) {
          this.__stepQueue__ = this.__stepQueue__ || [];
          this.__stepQueue__.push(args);
          if (this.__runningSteps__) return;
          this.__runningSteps__ = true;

          var setTimeout = Test.FakeClock.REAL.setTimeout;
          setTimeout(this.method('__runNextStep__'), 1);
        },

        __runNextStep__: function(error) {
          if (typeof error === 'object' && error !== null) return this.addError(error);

          var step = this.__stepQueue__.shift(), n;

          if (!step) {
            this.__runningSteps__ = false;
            if (!this.__stepCallbacks__) return;

            n = this.__stepCallbacks__.length;
            while (n--) this.__stepCallbacks__.shift().call(this);

            return;
          }

          var methodName = step.shift(),
              method     = step.shift(),
              parameters = step.slice(),
              block      = function() { method.apply(this, parameters) };

          parameters[method.length - 1] = this.method('__runNextStep__');
          if (!this.exec) return block.call(this);
          this.exec(block, function() {}, this.method('__endSteps__'));
        },

        __endSteps__: function(error) {
          Test.Unit.TestCase.processError(this, error);
          this.__stepQueue__ = [];
          this.__runNextStep__();
        },

        addError: function() {
          this.callSuper();
          this.__endSteps__();
        },

        sync: function(callback) {
          if (!this.__runningSteps__) return callback.call(this);
          this.__stepCallbacks__ = this.__stepCallbacks__ || [];
          this.__stepCallbacks__.push(callback);
        }
      })
    }
  }),

  asyncSteps: function(methods) {
    return new this.AsyncSteps(methods);
  }
});

Test.extend({
  FakeClock: new JS.Module({
    extend: {
      API: new JS.Singleton({
        METHODS: ['Date', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'],

        stub: function() {
          var mocking = Test.Mocking,
              methods = this.METHODS,
              i       = methods.length;

          Test.FakeClock.reset();

          while (i--) {
            if (methods[i] === 'Date')
              mocking.stub('new', methods[i], Test.FakeClock.method(methods[i]));
            else
              mocking.stub(methods[i], Test.FakeClock.method(methods[i]));
          }

          Date.now = Test.FakeClock.REAL.Date.now;
        },

        reset: function() {
          return Test.FakeClock.reset();
        },

        tick: function(milliseconds) {
          return Test.FakeClock.tick(milliseconds);
        }
      }),

      REAL: {},

      Schedule: new JS.Class(SortedSet, {
        nextScheduledAt: function(time) {
          return this.find(function(timeout) { return timeout.time <= time });
        }
      }),

      Timeout: new JS.Class({
        include: Comparable,

        initialize: function(callback, interval, repeat) {
          this.callback = callback;
          this.interval = interval;
          this.repeat   = repeat;
        },

        compareTo: function(other) {
          return this.time - other.time;
        },

        toString: function() {
          return (this.repeat ? 'Interval' : 'Timeout') +
                '(' + this.interval + ')' +
                ':' + this.time;
        }
      }),

      reset: function() {
        this._currentTime = new Date().getTime();
        this._callTime    = this._currentTime;
        this._schedule    = new this.Schedule();
      },

      tick: function(milliseconds) {
        this._currentTime += milliseconds;
        var timeout;
        while (timeout = this._schedule.nextScheduledAt(this._currentTime))
          this._run(timeout);
        this._callTime = this._currentTime;
      },

      _run: function(timeout) {
        this._callTime = timeout.time;
        timeout.callback();

        if (timeout.repeat) {
          timeout.time += timeout.interval;
          this._schedule.rebuild();
        } else {
          this.clearTimeout(timeout);
        }
      },

      _timer: function(callback, milliseconds, repeat) {
        var timeout = new this.Timeout(callback, milliseconds, repeat);
        timeout.time = this._callTime + milliseconds;
        this._schedule.add(timeout);
        return timeout;
      },

      Date: function() {
        var date = new Test.FakeClock.REAL.Date();
        date.setTime(this._callTime);
        return date;
      },

      setTimeout: function(callback, milliseconds) {
        return this._timer(callback, milliseconds, false);
      },

      setInterval: function(callback, milliseconds) {
        return this._timer(callback, milliseconds, true);
      },

      clearTimeout: function(timeout) {
        this._schedule.remove(timeout)
      },

      clearInterval: function(timeout) {
        this._schedule.remove(timeout);
      }
    }
  })
});

Test.FakeClock.include({
  clock: Test.FakeClock.API
});

(function() {
  var methods = Test.FakeClock.API.METHODS,
      i       = methods.length;

  while (i--) Test.FakeClock.REAL[methods[i]] = JS.ENV[methods[i]];
})();

Test.extend({
  Coverage: new JS.Class({
    initialize: function(module) {
      this._module = module;
      this._methods = new Hash([]);

      var storeMethods = function(module) {
        var methods = module.instanceMethods(false),
            i = methods.length;
        while (i--) this._methods.store(module.instanceMethod(methods[i]), 0);
      };
      storeMethods.call(this, module);
      storeMethods.call(this, module.__eigen__());
    },

    attach: function() {
      var module = this._module;
      StackTrace.addObserver(this);
      JS.Method.trace([module, module.__eigen__()]);
    },

    detach: function() {
      var module = this._module;
      JS.Method.untrace([module, module.__eigen__()]);
      StackTrace.removeObserver(this);
    },

    update: function(event, frame) {
      if (event !== 'call') return;
      var pair = this._methods.assoc(frame.method);
      if (pair) pair.setValue(pair.value + 1);
    },

    report: function() {
      var methods = this._methods.entries().sort(function(a,b) {
        return b.value - a.value;
      });
      var covered = this._methods.all(function(pair) { return pair.value > 0 });

      this.printTable(methods, function(row, i) {
        if (row[1] === 0) return ['bgred', 'white'];
        return (i % 2 === 0) ? ['bold'] : [];
      });
      return covered;
    },

    printTable: function(table, formatter) {
      var widths = [],
          table  = [['Method', 'Calls']].concat(table),
          C = Console,
          i = table.length,
          j, string;

      while (i--) {
        j = table[i].length;
        while (j--) {
          widths[j] = widths[j] || 0;
          string = (table[i][j] === undefined ? '' : table[i][j]).toString();
          widths[j] = Math.max(string.length, widths[j]);
        }
      }

      var divider = '+', j = widths.length;
      while (j--) divider = '+' + this.repeat('-', widths[j] + 2) + divider;
      divider = '  ' + divider;
      C.reset();
      C.puts();
      C.puts(divider);

      var printRow = function(row, format) {
        var data = table[row];
        C.reset();
        C.print('  ');
        for (var i = 0, n = data.length; i < n; i++) {
          C.reset();
          C.print('|');
          C.consoleFormat.apply(C, format);
          C.print(' ' + this.pad(data[i], widths[i]) + ' ');
        }
        C.reset();
        C.puts('|');
      };
      printRow.call(this, 0, ['bold']);
      C.reset();
      C.puts(divider);

      for (var i = 1, n = table.length; i < n; i++) {
        var format = formatter ? formatter(table[i], i) : [];
        printRow.call(this, i, format);
      }
      C.reset();
      C.puts(divider);
    },

    pad: function(string, width) {
      string = (string === undefined ? '' : string).toString();
      return string + this.repeat(' ', width - string.length);
    },

    repeat: function(string, n) {
      var result = '';
      while (n--) result += string;
      return result;
    }
  })
});

Test.extend({
  Helpers: new JS.Module({
    $R: function(start, end) {
      return new Range(start, end);
    },

    $w: function(string) {
      return string.split(/\s+/);
    },

    forEach: function(list, block, context) {
      for (var i = 0, n = list.length; i < n; i++) {
        block.call(context, list[i], i);
      }
    },

    its: function() {
      return new MethodChain();
    },

    map: function(list, block, context) {
      return new Enumerable.Collection(list).map(block, context)
    },

    repeat: function(n, block, context) {
      while (n--) block.call(context);
    }
  })
});

Test.extend({
  Runner: new JS.Class({
    initialize: function(settings) {
      this._settings = (typeof settings === 'string')
                     ? {format: settings}
                     : (settings || {});

      this._ui = this.klass.getUI(this._settings);
    },

    run: function(callback, context) {
      this.prepare(function() {
        this.start(callback, context);
      }, this);
    },

    prepare: function(callback, context) {
      var R    = Test.Reporters._registry,
          n    = 0,
          done = false;

      for (var name in R) {
        if (!R[name] || !R[name].prepare) continue;
        n += 1;
        R[name].prepare(function() {
          n -= 1;
          if (n === 0 && done) callback.call(context);
        });
      }
      done = true;
      if (n === 0) callback.call(context);
    },

    start: function(callback, context) {
      var options   = this.getOptions(),
          reporters = this._ui.getReporters(options),
          suite     = this.getSuite(options);

      this.setReporter(new Test.Reporters.Composite(reporters));
      if (callback) callback.call(context, this);

      var testResult = new Test.Unit.TestResult(),
          TR         = Test.Unit.TestResult,
          TS         = Test.Unit.TestSuite,
          TC         = Test.Unit.TestCase;

      var resultListener = testResult.addListener(TR.CHANGED, function() {
        var result = testResult.metadata();
        this._reporter.update(this.klass.timestamp(result));
      }, this);

      var faultListener = testResult.addListener(TR.FAULT, function(fault) {
        this._reporter.addFault(this.klass.timestamp(fault.metadata()));
      }, this);

      var reportResult = function() {
        testResult.removeListener(TR.CHANGED, resultListener);
        testResult.removeListener(TR.FAULT, faultListener);

        var result = testResult.metadata();
        this._reporter.endSuite(this.klass.timestamp(result));
      };

      var reportEvent = function(channel, testCase) {
        var event = this.klass.timestamp(testCase.metadata());
        if (channel === TS.STARTED)       this._reporter.startContext(event);
        else if (channel === TC.STARTED)  this._reporter.startTest(event);
        else if (channel === TC.FINISHED) this._reporter.endTest(event);
        else if (channel === TS.FINISHED) this._reporter.endContext(event);
      };

      this.klass.reportEventId = 0;
      this._reporter.startSuite(this.klass.timestamp(suite.metadata(true)));

      suite.run(testResult, reportResult, reportEvent, this);
    },

    addReporter: function(reporter) {
      var current = this._reporter;
      if (!(current instanceof Test.Reporters.Composite)) {
        this._reporter = new Test.Reporters.Composite();
        this._reporter.addReporter(current);
      }
      this._reporter.addReporter(reporter);
    },

    setReporter: function(reporter) {
      this._reporter = reporter;
    },

    getOptions: function() {
      return JS.extend(this._ui.getOptions(), this._settings);
    },

    getSuite: function(options) {
      var filter = options.test;
      Test.Unit.TestCase.resolve();
      var suite = Test.Unit.TestCase.suite(filter);
      Test.Unit.TestCase.clear();
      return suite;
    },

    extend: {
      timestamp: function(event) {
        event.eventId = this.reportEventId++;
        event.timestamp = new JS.Date().getTime();
        return event;
      },

      getUI: function(settings) {
        if (Console.BROWSER && !Console.PHANTOM)
          return new Test.UI.Browser(settings);
        else
          return new Test.UI.Terminal(settings);
      },

      filter: function(objects, suffix) {
        var filter = this.getUI().getOptions().test,
            n      = filter.length,
            output = [],
            m, object;

        if (n === 0) return objects;

        while (n--) {
          m = objects.length;
          while (m--) {
            object = objects[m].replace(new RegExp(suffix + '$'), '');
            if (filter[n].substr(0, object.length) === object)
              output.push(objects[m]);
          }
        }
        return output;
      }
    }
  }),

  autorun: function(options, callback, context) {
    if (typeof options === 'function') {
      context  = callback;
      callback = options;
      options  = {};
    }
    if (typeof callback !== 'function') {
      callback = undefined;
      context  = undefined;
    }
    var runner = new Test.Runner(options);
    runner.run(callback, context);
  }
});

exports.Test = Test;
});

(function() {
  if (typeof document === 'undefined') return;
  var head  = document.getElementsByTagName('head')[0],
      style = document.createElement('style');
  try {
    style.type = 'text/css';
    style.innerHTML = '@import url(data:text/css;base64,Ym9keSB7IC8qIEJBU0MgYWRkZWQgKi8KICBiYWNrZ3JvdW5kOiAgICMwMDA7CiAgY29sb3I6ICAgICAgICAjYmJiOwp9Ci50ZXN0LXJlc3VsdC1jb250YWluZXIgewogIGJhY2tncm91bmQ6ICAgIzAwMDsKICBib3JkZXI6ICAgICAgIDJweCBzb2xpZCAjYmJiOwogIGNvbG9yOiAgICAgICAgI2JiYjsKICBmb250OiAgICAgICAgIG5vcm1hbCAxNXB4IEZyZWVTYW5zLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmOwogIG92ZXJmbG93OiAgICAgaGlkZGVuOwogIHBvc2l0aW9uOiAgICAgYWJzb2x1dGU7CiAgcmlnaHQ6ICAgICAgICAzMHB4OwogIHRvcDogICAgICAgICAgMzBweDsKICB3aWR0aDogICAgICAgIDY0MHB4OwoKICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDE2cHg7CiAgICAgLW1vei1ib3JkZXItcmFkaXVzOiAxNnB4OwogICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDsKfQoKLnRlc3QtcmVzdWx0LWNvbnRhaW5lciBwLAoudGVzdC1yZXN1bHQtY29udGFpbmVyIHVsLAoudGVzdC1yZXN1bHQtY29udGFpbmVyIGxpIHsKICBsaXN0LXN0eWxlOiAgIGNpcmNsZSBvdXRzaWRlOwogIG1hcmdpbjogICAgICAgMDsKICBwYWRkaW5nOiAgICAgIDA7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnJlcG9ydCB7CiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsKICBtYXJnaW46ICAgICAgIDA7CiAgcGFkZGluZzogICAgICAwOwp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5yZXBvcnQgdGg6Zmlyc3QtY2hpbGQgewogIC13ZWJraXQtYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTRweDsKICAgICAtbW96LWJvcmRlci1yYWRpdXMtdG9wbGVmdDogIDE0cHg7CiAgICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxNHB4Owp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5yZXBvcnQgdGg6bGFzdC1jaGlsZCB7CiAgLXdlYmtpdC1ib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTRweDsKICAgICAtbW96LWJvcmRlci1yYWRpdXMtdG9wcmlnaHQ6ICAxNHB4OwogICAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDE0cHg7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnJlcG9ydCB0aCwKLnRlc3QtcmVzdWx0LWNvbnRhaW5lciAucmVwb3J0IHRkIHsKICBib3JkZXItbGVmdDogIDFweCBzb2xpZCAjMzMzOwogIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMzMzM7CiAgZm9udC13ZWlnaHQ6ICBib2xkOwogIHBhZGRpbmc6ICAgICAgMCA4cHg7CiAgdGV4dC1hbGlnbjogICByaWdodDsKICB3aWR0aDogICAgICAgIDE0NHB4Owp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5yZXBvcnQgdGg6Zmlyc3QtY2hpbGQsCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnJlcG9ydCB0ZDpmaXJzdC1jaGlsZCB7CiAgYm9yZGVyLWxlZnQ6IG5vbmU7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnJlcG9ydCB0aDpsYXN0LWNoaWxkLAoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5yZXBvcnQgdGQ6bGFzdC1jaGlsZCB7CiAgYm9yZGVyLXJpZ2h0OiBub25lOwp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5yZXBvcnQgdGggewogIGJhY2tncm91bmQ6ICAgIzExMTsKICBwYWRkaW5nOiAgICAgIDRweCA4cHg7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnJlcG9ydCB0ZCB7CiAgY29sb3I6ICAgICAgICAjNjY2OwogIGZvbnQtc2l6ZTogICAgMzAwJTsKfQoKLnRlc3QtcmVzdWx0LWNvbnRhaW5lciAubGlnaHQgewogIGZvbnQtc2l6ZTogICAgMDsKICBoZWlnaHQ6ICAgICAgIDZweDsKICBvdmVyZmxvdzogICAgIGhpZGRlbjsKfQoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5saWdodC1wZW5kaW5nIHsKICBiYWNrZ3JvdW5kOiAgICNmYzY7Cn0KLnRlc3QtcmVzdWx0LWNvbnRhaW5lciAubGlnaHQtcGFzc2VkIHsKICBiYWNrZ3JvdW5kOiAgICM2YzM7Cn0KLnRlc3QtcmVzdWx0LWNvbnRhaW5lciAubGlnaHQtZmFpbGVkIHsKICBiYWNrZ3JvdW5kOiAgICNlNDA7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnVzZXItYWdlbnQgewogIGJhY2tncm91bmQ6ICAgIzAwMDsgLyogQlNBQyB3YXMgNDQ0ICovCiAgY29sb3I6ICAgICAgICAjYmJiOyAvKiBCU0FDIHdhcyBmZmYgKi8KICBmb250LXNpemU6ICAgIDgwJTsKICBsaXN0LXN0eWxlOiAgIG5vbmU7CiAgcGFkZGluZzogICAgICA0cHggMTJweDsKfQoKLnRlc3QtcmVzdWx0LWNvbnRhaW5lciAuc3BlY3MgLnNwZWMsCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnNwZWNzIC50ZXN0IHsKICBwb3NpdGlvbjogICAgIHJlbGF0aXZlOwp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5zcGVjcyAuc3BlYy1uYW1lLAoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5zcGVjcyAudGVzdC1uYW1lIHsKICBjdXJzb3I6ICAgICAgIHBvaW50ZXI7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnNwZWMtbmFtZSB7CiAgYm9yZGVyLXRvcDogICAxcHggc29saWQgIzIyMjsKICBjdXJzb3I6ICAgICAgIHBvaW50ZXI7CiAgZm9udC13ZWlnaHQ6ICBib2xkOwp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5zcGVjcyB1bCB7CiAgbWFyZ2luLWxlZnQ6ICAzMnB4Owp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5zcGVjcyBwIHsKICBwYWRkaW5nOiAgICAgIDRweCAxMnB4Owp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5zcGVjcyAucnVubmVyIHsKICBiYWNrZ3JvdW5kOiAgIHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJBQUFBQVFDQVlBQUFBZjgvOWhBQUFBQkdkQlRVRUFBSy9JTndXSzZRQUFBQmwwUlZoMFUyOW1kSGRoY21VQVFXUnZZbVVnU1cxaFoyVlNaV0ZrZVhISlpUd0FBQUVzU1VSQlZEakxZL2ovL3o4REpaaGhtQnVRdmRqOGErcDh3Ly94YzNVNXlUSWdlYjdoMThiTlVmL0RaMmo4OTU4cXowblFnUHlsdHY5ekY1di9UVjlvL0RkeHJ2N2ZtdldoLzFlZG52aS9aTFgvZjlkKzhiKzIzWUk4ZUEwQU92bi9oblBUL3E4OU93V3NjY1hwQ2Y4bjdDbjV2L0I0MS8rTXBXNy9UZHZaLytvMk0vTGpOQURvWkxEbXZsMzUvenQzWlA5djNaYjJ2MkZ6NHYrbXJlbi9aeHhxL2grendPYS9hajNESDV3R1JNL1cvTC95MUlUL1MwLzAvbDk0ck92L3ZLTWRRRU95L2s4LzFQUS9iYW5IZjhWYWhsZlNsUXdHT0EwSW5LNzR6M09pOUQvbmZ0Ri8xdDM4LytMbVcvMmZkckRoZjlKaXQvL3l0UXpQSlNzWnRFaUtCZTFteHEveEM1My95MWN6UEFGcVZpYzVHb0ZPL2lwWHpmeGZ0SkpCa2V5VUtGek93RG00OHdJQWg1WEgrZzdkck93QUFBQUFTVVZPUks1Q1lJST0pIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0OwogIGN1cnNvcjogICAgICAgcG9pbnRlcjsKICBkaXNwbGF5OiAgICAgIGJsb2NrOwogIGZsb2F0OiAgICAgICAgbGVmdDsKICBoZWlnaHQ6ICAgICAgIDA7CiAgbWFyZ2luLXJpZ2h0OiA2cHg7CiAgb3ZlcmZsb3c6ICAgICBoaWRkZW47CiAgcGFkZGluZy10b3A6ICAxOHB4OwogIHdpZHRoOiAgICAgICAgMTZweDsKfQoKLnRlc3QtcmVzdWx0LWNvbnRhaW5lciAuc3BlY3MgLmZhdWx0IHsKICBmb250LXNpemU6ICAgIDc1JTsKfQoKLnRlc3QtcmVzdWx0LWNvbnRhaW5lciAuc3BlY3MgLmZhaWxlZCB7CiAgY29sb3I6ICAgICAgICAjZTQwOwp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5zcGVjcyAuY2xvc2VkIHVsLmNoaWxkcmVuIHsKICBkaXNwbGF5OiAgICAgIG5vbmU7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnRlc3QgLnN0YXRzIHsKICBkaXNwbGF5OiAgICAgIG5vbmU7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnN0YXRzIHsKICBmbG9hdDogICAgICAgIHJpZ2h0OwogIGxpc3Qtc3R5bGU6ICAgbm9uZTsKICByaWdodDogICAgICAgIDA7CiAgdG9wOiAgICAgICAgICAwOwp9CgoudGVzdC1yZXN1bHQtY29udGFpbmVyIC5zdGF0cyBsaSB7CiAgYm9yZGVyLWxlZnQ6ICAxcHggc29saWQgIzExMTsKICBkaXNwbGF5OiAgICAgIGJsb2NrOwogIGZsb2F0OiAgICAgICAgbGVmdDsKICBsaXN0LXN0eWxlOiAgIG5vbmU7CiAgcGFkZGluZzogICAgICA0cHggOHB4OwogIHdpZHRoOiAgICAgICAgNjRweDsKfQoKLnRlc3QtcmVzdWx0LWNvbnRhaW5lciAuc3RhdHMgLm51bWJlciB7CiAgY29sb3I6ICAgICAgICAjOTk5OwogIGZvbnQtd2VpZ2h0OiAgYm9sZDsKfQoKLnRlc3QtcmVzdWx0LWNvbnRhaW5lciAuc3RhdHMgLmxhYmVsIHsKICBjb2xvcjogICAgICAgICM2NjY7CiAgZm9udC1zaXplOiAgICA4MCU7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnBhc3NlZCAubnVtYmVyIHsKICBjb2xvcjogICAgICAgICM2YzM7Cn0KCi50ZXN0LXJlc3VsdC1jb250YWluZXIgLnN1bW1hcnkgewogIGJvcmRlci10b3A6ICAgMXB4IHNvbGlkICM2NjY7CiAgY29sb3I6ICAgICAgICAjOTk5OwogIG1hcmdpbjogICAgICAgMDsKICBwYWRkaW5nOiAgICAgIDRweCAxMnB4Owp9Cg==)';
    head.appendChild(style);
  } catch (e) {}
})();

(function() {
  var Test    = JS.Test,
      Console = JS.Console;

// http://busterjs.org/

Test.Reporters.extend({
  Buster: new JS.Class({

    /*  Missing events:
        See http://docs.busterjs.org/en/latest/modules/buster-test/runner/

        - context:unsupported
        - test:setUp
        - test:async
        - test:tearDown
        - test:timeout
        - test:deferred
        - uncaughtException
    */

    extend: {
      create: function(options) {
        if (JS.ENV.buster) return new this(options);
      }
    },

    startSuite: function(event) {
      this._contexts = 0;
      this._stack = [];
      buster.emit('suite:start');
    },

    startContext: function(event) {
      if (event.context === null) return;
      this._contexts += 1;
      buster.emit('context:start', {name: event.shortName});
    },

    startTest: function(event) {
      this._testPassed = true;
      buster.emit('test:start', {name: event.shortName});
    },

    addFault: function(event) {
      if (!this._testPassed) return;
      this._testPassed = false;

      if (event.error.type === 'failure') {
        buster.emit('test:failure', {
          name: event.test.shortName,
          error: {message: event.error.message}
        });
      }
      else {
        buster.emit('test:error', {
          name: event.test.shortName,
          error: {
            message: event.error.message,
            stack: event.error.backtrace
          }
        });
      }
    },

    endTest: function(event) {
      if (!this._testPassed) return;
      buster.emit('test:success', {name: event.shortName});
    },

    endContext: function(event) {
      if (event.context === null) return;
      buster.emit('context:end', {name: event.fullName});
    },

    update: function(event) {},

    endSuite: function(event) {
      buster.emit('suite:end', {
        ok:         event.passed,
        contexts:   this._contexts,
        tests:      event.tests,
        assertions: event.assertions,
        failures:   event.failures,
        errors:     event.errors,
        timeouts:   0                   // <- TODO
      });
    }
  })
});

Test.Reporters.register('buster', Test.Reporters.Buster);

// https://github.com/karma-runner/karma

Test.Reporters.extend({
  Karma: new JS.Class({
    extend: {
      create: function(options) {
        if (JS.ENV.__karma__) return new this(options);
      }
    },

    initialize: function(options) {
      this._karma  = JS.ENV.__karma__;
      this._testId = 0;
    },

    startSuite: function(event) {
      this._karma.info({total: event.size});
    },

    startContext: function(event) {},

    startTest: function(event) {
      this._faults = [];
      this._start  = event.timestamp;
    },

    addFault: function(event) {
      var message = event.error.message;
      if (event.error.backtrace) message += '\n' + event.error.backtrace;
      this._faults.push(message);
    },

    endTest: function(event) {
      this._karma.result({
        id:          ++this._testId,
        description: event.shortName,
        suite:       event.context,
        success:     this._faults.length === 0,
        skipped:     0,
        time:        event.timestamp - this._start,
        log:         this._faults
      });
    },

    endContext: function(event) {},

    update: function(event) {},

    endSuite: function(event) {
      this._karma.complete();
    }
  })
});

Test.Reporters.register('karma', Test.Reporters.Karma);

Test.Reporters.extend({
  Progress: new JS.Class(Test.Reporters.Dot, {
    extend: {
      CACHE_TIME: 1000
    },

    startSuite: function(event) {
      if (!Console.coloring())
        throw new Error('Cannot use the progress reporter; terminal formatting is not available');

      this._tests  = [];
      this._faults = [];
      this._start  = event.timestamp;
      this._size   = event.size;
      this._pipe   = '|';
      this._space  = ' ';
      this._lines  = [''];

      var n = 10;
      while (n--) {
        this._space = this._space + this._space;
        this._pipe = this._pipe + this._pipe;
      }
 
      this.puts('\n\n\n');
      this.cursorHide();
    },

    startTest: function(event) {
      this._tests.push(event);

      var words = event.fullName.split(/\s+/),
          width = this._getWidth() - 10,
          lines = [],
          line  = '';

      while (words.length > 0) {
        while (words[0] && line.length + words[0].length + 1 <= width)
          line += words.shift() + ' ';

        if (words[0]) {
          lines.push(line);
          line = '';
        }
      }
      lines.push(line);

      while (lines.length < this._lines.length) lines.push('');
      this._nextLines = lines;
      this._draw();
    },

    endTest: function(event) {},

    addFault: function(event) {
      this._faults.push(event);
      this._draw();
    },

    endSuite: function(event) {
      this._passed = event.passed;
      this._draw();
      this.cursorPrevLine(2);
      this.cursorShow();
      this.callSuper();
    },

    _draw: function() {
      var cols     = this._getWidth(),
          fraction = this._tests.length / this._size,
          test     = this._tests[this._tests.length - 1],
          blocks   = Math.floor(cols * fraction),
          percent  = String(Math.floor(100 * fraction)),
          line, i, n;

      this.cursorPrevLine(2 + this._lines.length);
      this.reset();
      this.print('  ');

      if (this._faults.length > 0)
        this.red();
      else if (this._passed)
        this.green();
      else
        this.cyan();

      this.bold();
      this.puts(this._pipe.substr(0, blocks));
      this.reset();

      if (this._passed !== undefined) {
        this.eraseScreenForward();
        return this.puts('');
      }

      while (percent.length < 2) percent = ' ' + percent;
      percent = '[' + percent + '%]';
      this.cursorForward(2 + cols - percent.length);
      this.puts(percent);
      this.cursorPrevLine(1);

      this._lines = this._nextLines;
      for (i = 0, n = this._lines.length; i < n; i++) {
        line = this._lines[i];
        this.puts('  ' + line + this._space.substr(0, cols - line.length - 10));
      }

      this.puts('');
    },

    _getWidth: function() {
      var time = new JS.Date().getTime();
      if (this._width && time < this._cacheTime + this.klass.CACHE_TIME)
        return this._width;

      this._cacheTime = new JS.Date().getTime();
      return this._width = Console.getDimensions()[0] - 8;
    }
  })
});

Test.Reporters.register('progress', Test.Reporters.Progress);

Test.Reporters.extend({
  Spec: new JS.Class(Test.Reporters.Dot, {
    extend: {
      TICK:   '\u2713',
      CROSS:  '\u2717'
    },

    startSuite: function(event) {
      this._faults = [];
      this._start  = event.timestamp;
      this._stack  = [];

      this.puts('');
    },

    startContext: function(event) {
      if (event.context === null) return;
      this.puts(this._indent(this._stack.length) + event.shortName);
      this._stack.push(event.shortName);
    },

    startTest: function(event) {
      this._testPassed = true;
    },

    addFault: function(event) {
      this._faults.push(event);
      this._testPassed = false;
    },

    endTest: function(event) {
      var indent = this._indent(this._stack.length),
          color  = this._testPassed ? 'green' : 'red',
          icon   = this._testPassed ? this.klass.TICK : this.klass.CROSS,
          number = this._testPassed ? '' : ' (' + this._faults.length + ')';

      this.consoleFormat(color);
      this.puts(indent + icon + number + ' ' + event.shortName);
      this.reset();
    },

    endContext: function(event) {
      if (event.context === null) return;
      this._stack.pop();
    },

    _indent: function(n) {
      var indent = '';
      while (n--) indent += '  ';
      return indent;
    }
  })
});

Test.Reporters.register('spec', Test.Reporters.Spec);

// http://rubydoc.info/github/rubyworks/tapout/file/TAP-YJ.md

Test.Reporters.extend({
  TAP_YJ: new JS.Class({
    STATUSES: {
      failure: 'fail',
      error:   'error'
    },

    startSuite: function(event) {
      this._write({
        type:  'suite',
        start: this._timestamp(),
        count: event.size,
        rev:   2
      });
      this._start = event.timestamp;
    },

    startContext: function(event) {
      this._write({
        type:  'case',
        label: event.shortName,
        level: event.context.length
      });
    },

    startTest: function(event) {
      this._faults = [];
      this._status = null;
    },

    addFault: function(event) {
      this._faults.push(event);
      this._status = this._status || this.STATUSES[event.error.type];
    },

    endTest: function(event) {
      var payload = {
        type:   'test',
        status: this._status || 'pass',
        label:  event.shortName,
        time:   this._ellapsedTime(event.timestamp)
      };

      var fault = this._faults[0];
      if (fault)
        payload.exception = {
          message:   fault.error.message,
          backtrace: fault.error.backtrace ? fault.error.backtrace.split('\n') : []
        };

      this._write(payload);
    },

    endContext: function(event) {},

    update: function(event) {},

    endSuite: function(event) {
      this._write({
        type: 'final',
        time: this._ellapsedTime(event.timestamp),
        counts: {
          total: event.tests,
          pass:  event.tests - event.failures - event.errors,
          fail:  event.failures,
          error: event.errors
        }
      });
    },

    _ellapsedTime: function(timestamp) {
      return (timestamp - this._start) / 1000;
    },

    _write: function(object) {
      Console.puts(this._serialize(object));
    },

    _timestamp: function() {
      var date   = new JS.Date(),
          year   = date.getFullYear(),
          month  = this._pad(date.getMonth() + 1),
          day    = this._pad(date.getDate()),
          hour   = this._pad(date.getHours()),
          minute = this._pad(date.getMinutes()),
          second = this._pad(date.getSeconds());

      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    },

    _pad: function(value) {
      var string = value.toString();
      while (string.length < 2) string = '0' + string;
      return string;
    }
  })
});

Test.Reporters.extend({
  TAP_YAML: new JS.Class(Test.Reporters.TAP_YJ, {
    _serialize: function(value, level) {
      level = level || 0;

      var out = '';
      if (level === 0) out = '---';

      if      (value instanceof Array)    out += this._array(value, level);
      else if (typeof value === 'object') out += this._object(value, level);
      else if (typeof value === 'string') out += this._string(value, level);
      else if (typeof value === 'number') out += this._number(value, level);

      return out;
    },

    _array: function(value, level) {
      if (value.length === 0) return '[]';
      var out = '', indent = this._indent(level);
      for (var i = 0, n = value.length; i < n; i++) {
        out += '\n' + indent + '- ' + this._serialize(value[i], level + 1);
      }
      return out;
    },

    _object: function(object, level) {
      var out = '', indent = this._indent(level);
      for (var key in object) {
        if (!object.hasOwnProperty(key)) continue;
        out += '\n' + indent + key + ': ' + this._serialize(object[key], level + 1);
      }
      return out;
    },

    _string: function(string, level) {
      if (!/[\r\n]/.test(string))
        return '"' + string.replace(/"/g, '\\"') + '"';

      var lines  = string.split(/\r\n?|\n/),
          out    = '|',
          indent = this._indent(level);

      for (var i = 0, n = lines.length; i < n; i++) {
        out += '\n' + indent + lines[i];
      }
      return out;
    },

    _number: function(number, level) {
      return number.toString();
    },

    _indent: function(level) {
      var indent = '';
      while (level--) indent += '  ';
      return indent;
    }
  }),

  TAP_JSON: new JS.Class(Test.Reporters.TAP_YJ, {
    _serialize: function(value) {
      return JS.ENV.JSON ? JSON.stringify(value) : '';
    }
  })
});

var R = Test.Reporters;

R.register('tap/yaml', R.TAP_YAML);
R.register('tap/y',    R.TAP_YAML);
R.register('tap-yaml', R.TAP_YAML);
R.register('tap-y',    R.TAP_YAML);

R.register('tap/json', R.TAP_JSON);
R.register('tap/j',    R.TAP_JSON);
R.register('tap-json', R.TAP_JSON);
R.register('tap-j',    R.TAP_JSON);

// https://github.com/modeset/teaspoon

Test.Reporters.extend({
  Teaspoon: new JS.Class({
    extend: {
      Spec: new JS.Class({
        initialize: function(spec) {
          this._spec           = spec;
          this.fullDescription = spec.event.fullName;
          this.description     = spec.event.shortName;
          this.parent          = Test.Reporters.Teaspoon.Suite.find(spec.event.context);
          this.link            = '?grep=' + encodeURIComponent(this.fullDescription);
        },

        errors: function() {
          var errors = [], faults = this._spec.faults;

          for (var i = 0, n = faults.length; i < n; i++) {
            errors.push(faults[i].error);
          }
          return errors;
        },

        getParents: function() {
          if (this._parents) return this._parents;
          this._parents = [];
          var context = this._spec.event.context;
          for (var i = 1, n = context.length; i < n; i++) {
            this._parents.push(Test.Reporters.Teaspoon.Suite.find(context.slice(0, i)));
          }
          return this._parents;
        },

        result: function() {
          var status = 'passed';
          if (this._spec.faults.length > 0) status = 'failed';
          return {status: status, skipped: false};
        }
      }),

      Suite: new JS.Class({
        extend: {
          _cache: {},

          find: function(context) {
            var key = context.join('~');
            if (key === '') return null;
            return this._cache[key] = this._cache[key] || {context: context};
          }
        },

        initialize: function(suite) {
          var context = suite.context;
          this.fullDescription = context.join(' ');
          this.description     = context[context.length - 1];
          this.parent          = this.klass.find(context.slice(0, context.length - 1));
          this.link            = '?grep=' + encodeURIComponent(this.fullDescription);
        }
      })
    },

    initialize: function(options, teaspoon) {
      this._teaspoon = teaspoon;
    },

    startSuite: function(event) {
      this._teaspoon.reportRunnerStarting({total: event.size});
    },

    startContext: function(event) {},

    startTest: function(event) {
      this._faults = [];
      if (this._teaspoon.reportSpecStarting)
        this._teaspoon.reportSpecStarting({event: event, faults: this._faults});
    },

    addFault: function(event) {
      event.error.stack = event.error.backtrace;
      this._faults.push(event);
    },

    endTest: function(event) {
      this._teaspoon.reportSpecResults({event: event, faults: this._faults});
    },

    endContext: function(event) {},

    update: function(event) {},

    endSuite: function(event) {
      this._teaspoon.reportRunnerResults();
    }
  })
});

(function() {
  var Teaspoon = JS.ENV.Teaspoon || JS.ENV.Teabag;
  if (!Teaspoon) return;

  Teaspoon.Reporters.HTML.prototype.envInfo = function() {
    return 'jstest';
  };

  Teaspoon.Runner.prototype.setup = function() {
    var options = {};
    if (Teaspoon.params.grep) options.test = [Teaspoon.params.grep];

    var teaspoon = this.getReporter(),
        reporter = new Test.Reporters.Teaspoon({}, new teaspoon());

    Test.autorun(options, function(runner) {
      runner.setReporter(reporter);
    });
  };

  Teaspoon.Spec  = Test.Reporters.Teaspoon.Spec;
  Teaspoon.Suite = Test.Reporters.Teaspoon.Suite;
})();

// https://github.com/airportyh/testem

Test.Reporters.extend({
  Testem: new JS.Class({
    extend: {
      SCRIPT_URL: '/testem.js',

      prepare: function(callback, context) {
        if (!JS.ENV.location) return callback.call(context || null);

        var hash = (location.hash || '').replace(/^#/, '');
        if (hash !== 'testem') return callback.call(context || null);

        JS.load(this.SCRIPT_URL, function() {
          callback.call(context || null);
        });
      },

      create: function(options) {
        if (JS.ENV.Testem) return new this(options);
      }
    },

    initialize: function() {
      var self = this;
      Testem.useCustomAdapter(function(socket) { self._socket = socket });
    },

    startSuite: function(event) {
      this._results = [];
      this._testId = 0;
      this._socket.emit('tests-start');
    },

    startContext: function(event) {},

    startTest: function(event) {
      this._testPassed = true;
      this._faults = [];
    },

    addFault: function(event) {
      this._testPassed = false;
      this._faults.push({
        passed:     false,
        message:    event.error.message,
        stacktrace: event.error.backtrace
      });
    },

    endTest: function(event) {
      var result = {
        passed: this._testPassed ? 1 : 0,
        failed: this._testPassed ? 0 : 1,
        total:  1,
        id:     ++this._testId,
        name:   event.fullName,
        items:  this._faults
      };
      this._results.push(result);
      this._socket.emit('test-result', result);
    },

    endContext: function(event) {},

    update: function(event) {},

    endSuite: function(event) {
      this._socket.emit('all-test-results', {
        passed: event.tests - event.failures - event.errors,
        failed: event.failures,
        total:  event.tests,
        tests:  this._results
      });
    }
  })
});

Test.Reporters.register('testem', Test.Reporters.Testem);

Test.Reporters.extend({
  XML: new JS.Class({
    include: Console,

    startSuite: function(event) {
      this._faults = [];
      this._stack  = [];
      this._suites = [];

      this.puts('<?xml version="1.0" encoding="UTF-8"?>');
      this.puts('<testsuites>');
    },

    startContext: function(event) {
      if (event.context === null) return;
      if (this._stack.length === 0)
        this._suites.push({
          name:     event.shortName,
          cases:    [],
          tests:    0,
          failures: 0,
          errors:   0,
          start:    event.timestamp
        });
      this._stack.push(event.shortName);
    },

    startTest: function(event) {
      this._suites[this._suites.length - 1].cases.push({
        name:     event.context.slice(1).concat(event.shortName).join(' '),
        start:    event.timestamp,
        failures: []
      });
    },

    addFault: function(event) {
      var suite = this._suites[this._suites.length - 1],
          test  = suite.cases[suite.cases.length - 1];

      if (event.error.type === 'failure') {
        suite.failures += 1;
        test.failures.push({type: 'Failure', error: event.error});
      } else if (event.error.type === 'error') {
        suite.errors += 1;
        test.failures.push({type: 'Error', error: event.error});
      }
    },

    endTest: function(event) {
      var suite = this._suites[this._suites.length - 1],
          test  = suite.cases[suite.cases.length - 1];

      test.time = (event.timestamp - test.start) / 1000;
      delete test.start;
    },

    endContext: function(event) {
      this._stack.pop();
      if (this._stack.length > 0) return;
      var suite = this._suites[this._suites.length - 1];
      suite.time = (event.timestamp - suite.start) / 1000;
      delete suite.start;

      var test, failure, ending, i, j, m, n;

      this.puts('    <testsuite name="' + this._xmlStr(suite.name) +
                             '" tests="' + suite.cases.length +
                             '" failures="' + suite.failures +
                             '" errors="' + suite.errors +
                             '" time="' + suite.time +
                             '">');

      for (i = 0, n = suite.cases.length; i < n; i++) {
        test   = suite.cases[i];
        ending = (test.failures.length === 0) ? '/>' : '>';
        this.puts('        <testcase classname="' + this._xmlStr(suite.name) +
                                  '" name="' + this._xmlStr(test.name) +
                                  '" time="' + test.time +
                                  '"' + ending);

        for (j = 0, m = test.failures.length; j < m; j++) {
          failure = test.failures[j];
          ending  = failure.error.backtrace ? '>' : '/>';
          this.puts('            <failure type="' + failure.type +
                                       '" message="' + this._xmlStr(failure.error.message) +
                                       '"' + ending);

          if (failure.error.backtrace) {
            this._printBacktrace(failure.error.backtrace);
            this.puts('            </failure>');
          }
        }
        if (test.failures.length > 0)
          this.puts('        </testcase>');
      }
      this.puts('    </testsuite>');
    },

    update: function(event) {},

    endSuite: function(event) {
      this.puts('</testsuites>');
    },

    _xmlStr: function(string) {
      return string.replace(/[\s\t\r\n]+/g, ' ')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;');
    },

    _printBacktrace: function(backtrace) {
      var lines = backtrace.replace(/^\s*|\s*$/g, '').split(/\s*[\r\n]+\s*/);
      for (var i = 0, n = lines.length; i < n; i++) {
        this.puts('                ' + this._xmlStr(lines[i]));
      }
    }
  })
});

Test.Reporters.register('xml', Test.Reporters.XML);
Test.Reporters.register('junit', Test.Reporters.XML);

})();
},{}],25:[function(require,module,exports){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

},{}]},{},[5])