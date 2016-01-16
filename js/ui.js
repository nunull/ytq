(function(global) {
	'use strict'

	var $query = $('#query')
	var $next  = $('#next')
	var $stop  = $('#stop')
	var $list  = $('#list')
	var $queue = $('#queue')
	var $title = $('#title')
	var queryAwesomplete
	var state = {
		videos: [],
		query: ''
	}

	function init() {
		queryAwesomplete = new Awesomplete($query[0])

		$list.on('click', 'li', (e) => {
			var id = $(e.currentTarget).attr('data-id')
			var video = state.videos.find((video) => id === video.id)

			if(video) events.trigger('ui', 'queueVideo', video)
		})

		$next.on('click', () => {
			events.trigger('ui', 'next')
		})

		$stop.on('click', () => {
			events.trigger('ui', 'stop')
		})

		$query.keyup(function(e) {
			var query = $query.val()
			if(query) {
				if(e.keyCode === 13) {
					queryAwesomplete.close()
					events.trigger('ui', 'search', query)
				} else if(query !== state.query) {
					events.trigger('ui', 'query', query)
				}
			}

			if(state.query !== query) state.query = query
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

	function renderSearchSuggestions(suggestions) {
		queryAwesomplete.list = suggestions
	}

	function renderTitle(title) {
		$title.text(title)
	}

	function loadScript(url) {
		$(document).append($('<script></script>').attr('src', url))
	}

	init()

	global.ui = {
		on: events.init('ui'),
		render: {
			queue: renderQueue,
			searchResults: renderSearchResults,
			searchSuggestions: renderSearchSuggestions,
			title: renderTitle
		},
		helper: {
			loadScript: loadScript
		}
	}
})(window)