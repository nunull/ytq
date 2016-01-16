(function(global) {
	'use strict'

	var sources = {}

	function init(id) {
		if(!sources[id]) sources[id] = {}

		return function(name, callback) {
			if(!sources[id][name]) sources[id][name] = []
			sources[id][name].push(callback)
		}
	}

	function trigger(id, name, data) {
		var source = sources[id]
		if(!source) return

		var callbacks = source[name]
		if(!callbacks) return

		callbacks.forEach(function(callback) {
			callback.call(null, data)
		})
	}

	global.events = {
		init: init,
		trigger: trigger
	}
})(window)