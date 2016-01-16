(function(global) {
	'use strict'

	function urlParam(key) {
		var url = decodeURIComponent(window.location.search.substring(1))
		var urlParts = url.split('&')
		var result = null

		urlParts.forEach(function(urlPart) {
			var keyValue = urlPart.split('=')
			if(keyValue[0] === key) result = keyValue[1] ? keyValue[1] : true
		})

		return result
	}

	global.helpers = {
		urlParam: urlParam
	}
})(window)