import Lenis from 'lenis'

/* One Lenis instance for the page. Motion's useScroll reads the native scroll position, which Lenis drives,
   so scroll-linked animation needs no extra wiring. Reduced-motion visitors get plain native scrolling. */

let lenis: Lenis | null = null
let locks = 0
const SPACE_SCROLL_PAGE_MS = 25_000

function initSpaceScroll() {
  let frame = 0
  let previous = 0
  let position = 0
  let direction = 1

  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
  }

  const tick = (now: number) => {
    if (locks > 0 || document.hidden) { stop(); return }
    const elapsed = Math.max(0, Math.min(now - previous, 50))
    previous = now
    const limit = Math.max(0, document.documentElement.scrollHeight - innerHeight)
    position = Math.max(0, Math.min(limit, position + direction * limit * elapsed / SPACE_SCROLL_PAGE_MS))
    if (lenis) lenis.scrollTo(position, { immediate: true })
    else scrollTo({ top: position, behavior: 'instant' })
    frame = requestAnimationFrame(tick)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.code !== 'Space' || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return
    if (event.target instanceof Element && event.target.closest('button,input,textarea,select,summary,audio,video,[role="button"],[role="textbox"],[contenteditable]:not([contenteditable="false"])')) return
    event.preventDefault()
    if (locks > 0 || event.repeat || frame) return
    direction = event.shiftKey ? -1 : 1
    position = scrollY
    previous = performance.now()
    frame = requestAnimationFrame(tick)
  }

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'Space') stop()
  }

  addEventListener('keydown', onKeyDown)
  addEventListener('keyup', onKeyUp)
  addEventListener('blur', stop)
  document.addEventListener('visibilitychange', stop)
  return () => {
    stop()
    removeEventListener('keydown', onKeyDown)
    removeEventListener('keyup', onKeyUp)
    removeEventListener('blur', stop)
    document.removeEventListener('visibilitychange', stop)
  }
}

export function initScroll() {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { duration: 1.5 } })
    if (locks > 0) lenis.stop()
  }
  const cleanupSpaceScroll = initSpaceScroll()
  return () => { cleanupSpaceScroll(); lenis?.destroy(); lenis = null }
}

export function scrollToTarget(target: string | number) {
  if (lenis) { lenis.scrollTo(target, { duration: 1.5 }); return }
  if (typeof target === 'number') scrollTo({ top: target })
  else document.querySelector(target)?.scrollIntoView()
}

/* Counted, so the preloader, the menu and the contact panel can each hold a lock without fighting. */
export function lockScroll(on: boolean) {
  locks = Math.max(0, locks + (on ? 1 : -1))
  const locked = locks > 0
  document.documentElement.classList.toggle('locked', locked)
  if (locked) lenis?.stop()
  else lenis?.start()
}
