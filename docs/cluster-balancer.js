/**
 * Turnitout Cluster Traffic Dispatcher
 * Automatically load-balances traffic across active high-speed cluster mirrors:
 *   1. https://turnitout1.streamlit.app/ (30% weight)
 *   2. https://turnitout2.streamlit.app/ (30% weight)
 *   3. https://turnitout3.streamlit.app/ (30% weight)
 *   4. https://turnitout.streamlit.app/  (10% weight - active heart anchor)
 */
(function() {
  const CLUSTER_NODES = [
    { url: "https://turnitout1.streamlit.app/", weight: 30 },
    { url: "https://turnitout2.streamlit.app/", weight: 30 },
    { url: "https://turnitout3.streamlit.app/", weight: 30 },
    { url: "https://turnitout.streamlit.app/",  weight: 10 }
  ];

  function getRandomClusterNode() {
    const totalWeight = CLUSTER_NODES.reduce(function(acc, n) { return acc + n.weight; }, 0);
    let rand = Math.random() * totalWeight;
    for (let i = 0; i < CLUSTER_NODES.length; i++) {
      if (rand < CLUSTER_NODES[i].weight) {
        return CLUSTER_NODES[i].url;
      }
      rand -= CLUSTER_NODES[i].weight;
    }
    return CLUSTER_NODES[0].url;
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
