var target = document.querySelector('div#target')
var startedAt, duration = 3000
var domain = [-100, window.innerWidth]
var range = domain[1] - domain[0]

function start() {
  startedAt = Date.now()
  updateTarget(0)
  requestAnimationFrame(update)
}

function update() {
  let elapsedTime = Date.now() - startedAt

  // playback is a value between 0 and 1
  // being 0 the start of the animation and 1 its end
  let playback = elapsedTime / duration

  updateTarget(playback)

  if (playback > 0 && playback < 1) {
  	// Queue the next frame
  	requestAnimationFrame(update)
  } else {
  	// Wait for a while and restart the animation
  	setTimeout(start, duration/10)
  }
}

function updateTarget(playback) {
  // Uncomment the line below to reverse the animation
  // playback = 1 - playback

  // Update the target properties based on the playback position
  let position = domain[0] + (playback * range)
  target.style.left = position + 'px'
  target.style.top = position + 'px'
  target.style.transform = 'scale(' + playback * 3 + ')'
}

start()