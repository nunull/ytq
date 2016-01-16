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

	yt.init().then(function() {
		ui.on('queueVideo', (video) => {
			queue.push(video)
			if(yt.player.getState() != 1) playNext()
		})

		ui.on('search', (query) => {
			yt.search(query).then(ui.render.searchResults)
		})

		ui.on('next', playNext)
		ui.on('stop', stop)

		queue.on('change', () => {
			ui.render.queue(queue)
		})

		yt.player.on('ended', playNext)

		if(helpers.urlParam('debug')) $('#query').val('blawan').keyup()
	})
})()