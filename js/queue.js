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

	function remove(item) {
		queue.splice(queue.indexOf(item), 1)
		events.trigger('queue', 'remove', item)
		events.trigger('queue', 'change', queue)
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
		remove: remove,
		items: items,
		forEach: forEach
	}
})(window)