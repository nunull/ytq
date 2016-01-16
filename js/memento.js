(function(global) {
	'use strict'

	function put(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	function get(key) {
		return JSON.parse(localStorage.getItem(key))
	}

	global.memento = {
		put: put,
		get: get
	}
})(window)