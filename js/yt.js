(function(global) {
	'use strict'

	var apiKey = 'AIzaSyBVd3lrN8o2RpRhVSkQWcVGrjsxbZGgs4g'
	var initDeferred
	var player

	var player = (function(global) {
		var player = null
		var curVideo = null

		function init() {
			ui.helper.loadScript('https://www.youtube.com/iframe_api')

			global.onYouTubeIframeAPIReady = () => {
				player = new YT.Player('player', {
					height: '390',
					width: '640',
					playerVars: {
						// controls: 0
					},
					events: {
						'onStateChange': onStateChange
					}
				})
			}
		}

		function onStateChange(e) {
			if(e.data == YT.PlayerState.ENDED) {
				events.trigger('yt.player', 'ended')
			}
		}

		function play(video) {
			curVideo = video
			player.loadVideoById(video.id, 0)
		}

		function stop() {
			curVideo = null
			player.stopVideo()
		}

		function getState() {
			return player.getPlayerState()
		}

		return {
			on: events.init('yt.player'),
			init: init,
			play: play,
			stop: stop,
			getState: getState
		}
	})(global)

	function init() {
		initDeferred = $.Deferred()

		player.init()
		global.ytInitApi = () => {
			gapi.client.setApiKey(apiKey)
			gapi.client.load('youtube', 'v3', initDeferred.resolve)
		}

		return initDeferred
	}

	function search(q) {
		var videoFilter = (item) => item.id.kind === 'youtube#video'
		var videoMapper = (item) => {
			return {
				id: item.id.videoId,
				title: item.snippet.title,
				publishedAt: moment(item.snippet.publishedAt).fromNow(),
				thumbnail: item.snippet.thumbnails.medium.url,
				channel: item.snippet.channelTitle
			}
		}

		var deferred = $.Deferred()
		var request = {
			q: q,
			part: 'snippet',
			maxResults: 50
		}

		gapi.client.youtube.search.list(request).execute(function(response) {
			deferred.resolve(response.items.filter(videoFilter).map(videoMapper))
		})

		return deferred
	}

	global.yt = {
		init: init,
		search: search,
		player: player
	}
})(window)