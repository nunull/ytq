(function(global) {
	'use strict'

	var $search = $('#search')
	var $query  = $('#query')
	var $next   = $('#next')
	var $stop   = $('#stop')
	var $list   = $('#list')
	var $queue  = $('#queue')
	var $title  = $('#title')
	var state = {
		videos: []
	}

	function init() {
		$list.on('click', 'li', (e) => {
			var id = $(e.target).attr('data-id')
			var video = state.videos.find((video) => id === video.id)

			if(video) events.trigger('ui', 'queueVideo', video)
		})

		$search.on('click', () => {
			var query = $query.val()
			if(query) events.trigger('ui', 'search', query)
		})

		$next.on('click', () => {
			events.trigger('ui', 'next')
		})

		$stop.on('click', () => {
			events.trigger('ui', 'stop')
		})
	}

	function renderQueue(queue) {
		$queue.html('')
		queue.forEach(function(item) {
			$queue.append('<li>' + item.title + '</li>')
		})
	}

	function renderSearchResults(videos) {
		state.videos = videos

		$(document).scrollTop(0)
		$list.html('')
		videos.forEach((video) => {
			$list.append('<li data-id="' + video.id + '">' +
				'<img src="' + video.thumbnail + '"><div>' +
				'<b>' + video.title + '</b><br>' + video.publishedAt + '<br>' + video.channel + '</div></li>')
		})
	}

	function loadScript(url) {
		$(document).append($('<script></script>').attr('src', url))
	}

	init()

	global.ui = {
		on: events.init('ui'),
		render: {
			queue: renderQueue,
			searchResults: renderSearchResults
		},
		helper: {
			loadScript: loadScript
		}
	}
})(window)