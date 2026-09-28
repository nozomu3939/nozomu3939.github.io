(() => {
  'use strict';
  const videos = [...document.querySelectorAll('.promo-video')];
  const hero = document.getElementById('promo-datarush');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;
  // Native controls remain available if autoplay is blocked or JS is disabled.
  // Once paused (by the visitor or scrolling away), only the visitor resumes it.
  videos.forEach(video => video.addEventListener('play', () => {
    if (video === hero) started = true;
    videos.forEach(other => { if (other !== video) other.pause(); });
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting, intersectionRatio}) => {
        if (!isIntersecting || intersectionRatio < 0.4) {
          target.pause();
        } else if (target === hero && !started && !reduced.matches && !document.hidden) {
          started = true;
          target.muted = true;
          target.play().catch(() => { /* Use the visible native play button. */ });
        }
      });
    }, {threshold: [0, 0.4]});
    videos.forEach(video => observer.observe(video));
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) videos.forEach(video => video.pause());
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) videos.forEach(video => video.pause());
  });
})();
