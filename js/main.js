(function() {
	'use strict'

	function playNext() {
		var next = queue.pop()
		if(next) {
			ui.render.title(next.title)
			yt.player.play(next)
		} else {
			ui.render.title('')
		}
	}

	function stop() {
		ui.render.title('')
		yt.player.stop()
	}

	function restore() {
		var storedVideos = memento.get('queue')
		if(storedVideos) {
			storedVideos.forEach((storedVideo) => queue.push(storedVideo))
			playNext()
		}
	}

	yt.init().then(() => {
		ui.on('queueVideo', (video) => {
			queue.push(video)
			if(yt.player.getState() != 1) playNext()
		})

		ui.on('query', (query) => {
			yt.completeQuery(query).then(ui.render.searchSuggestions)
		})

		ui.on('search', (query) => {
			yt.search(query).then(ui.render.searchResults)
		})

		ui.on('next', playNext)
		ui.on('stop', stop)

		queue.on('change', () => {
			ui.render.queue(queue)
			memento.put('queue', queue.items())
		})

		yt.player.on('ended', playNext)

		restore()

		if(helpers.urlParam('debug')) {
			var e = $.Event('keyup');
			e.keyCode = 13
			$('#query').val('blawan').trigger(e)
		}
	})
})()