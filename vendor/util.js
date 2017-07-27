var util = {
	inherits: function (ctor, superCtor) {
		ctor.super_ = superCtor
		var F = function () {}
		F.prototype = superCtor.prototype
		ctor.prototype = new F()
		ctor.prototype.constructor = ctor
	}
}

