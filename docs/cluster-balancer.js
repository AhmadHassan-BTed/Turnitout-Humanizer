/**
 * Turnitout Cluster Traffic Dispatcher
 * Automatically load-balances traffic across active high-speed cluster mirrors:
 *   1. https://turnitout1.streamlit.app/
 *   2. https://turnitout2.streamlit.app/
 *   3. https://turnitout.streamlit.app/
 */
(function() {
  const CLUSTER_NODES = [
    "https://turnitout1.streamlit.app/",
    "https://turnitout2.streamlit.app/",
    "https://turnitout.streamlit.app/"
  ];

  function getRandomClusterNode() {
    return CLUSTER_NODES[Math.floor(Math.random() * CLUSTER_NODES.length)];
  }

  function randomizeAllClusterLinks() {
    try {
      const selectors = [
        'a[href*="streamlit.app"]',
        '.app-launch-btn',
        '.hud-cta-app-btn',
        '.launch-streamlit-btn'
      ];
      const links = document.querySelectorAll(selectors.join(','));
      links.forEach(function(link) {
        link.href = getRandomClusterNode();
      });
    } catch (e) {
      // Fallback silently if DOM is not ready
    }
  }

  // Intercept all clicks on launch buttons dynamically
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    const isAppBtn = link.classList.contains('app-launch-btn') ||
                     link.classList.contains('hud-cta-app-btn') ||
                     link.classList.contains('launch-streamlit-btn');
    if (isAppBtn || (href && href.includes('streamlit.app'))) {
      link.href = getRandomClusterNode();
    }
  }, true);

  // Randomize all existing links on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', randomizeAllClusterLinks);
  } else {
    randomizeAllClusterLinks();
  }

  // Expose helper globally if needed
  window.getRandomClusterNode = getRandomClusterNode;
})();
