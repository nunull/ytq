(function(global) {
	'use strict'

	var queue = []

	function push(item) {
		queue.push(item)
		events.trigger('queue', 'push', item)
		events.trigger('queue', 'change', queue)
	}

	function pop() {
		var item = queue.pop()
		events.trigger('queue', 'pop', item)
		events.trigger('queue', 'change', queue)
		return item
	}

	function items() {
		return queue
	}

	function forEach(fn) {
		return queue.forEach(fn)
	}

	global.queue = {
		on: events.init('queue'),
		push: push,
		pop: pop,
		items: items,
		forEach: forEach
	}
})(window)