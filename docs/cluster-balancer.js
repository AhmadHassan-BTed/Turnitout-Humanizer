/**
 * Turnitout Cluster Traffic Dispatcher
 * Automatically load-balances traffic across active high-speed cluster mirrors:
 *   1. https://turnitout1.streamlit.app/ (13% weight)
 *   2. https://turnitout2.streamlit.app/ (13% weight)
 *   3. https://turnitout3.streamlit.app/ (13% weight)
 *   4. https://turnitout4.streamlit.app/ (13% weight)
 *   5. https://turnitout5.streamlit.app/ (13% weight)
 *   6. https://turnitout6.streamlit.app/ (13% weight)
 *   7. https://turnitout7.streamlit.app/ (13% weight)
 *   8. https://turnitout.streamlit.app/  (9% weight - active heart anchor)
 */
(function() {
  const CLUSTER_NODES = [
    { url: "https://turnitout1.streamlit.app/", weight: 13 },
    { url: "https://turnitout2.streamlit.app/", weight: 13 },
    { url: "https://turnitout3.streamlit.app/", weight: 13 },
    { url: "https://turnitout4.streamlit.app/", weight: 13 },
    { url: "https://turnitout5.streamlit.app/", weight: 13 },
    { url: "https://turnitout6.streamlit.app/", weight: 13 },
    { url: "https://turnitout7.streamlit.app/", weight: 13 },
    { url: "https://turnitout.streamlit.app/",  weight: 9 }
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

  function isExplicitMirrorLink(link, href) {
    if (link.classList.contains('direct-mirror-link')) return true;
    if (link.dataset && link.dataset.direct === 'true') return true;
    const text = (link.textContent || '').trim().toLowerCase();
    if (text.includes('mirror 1') || text.includes('mirror 2') || text.includes('mirror 3') || text.includes('mirror 4') || text.includes('mirror 5') || text.includes('mirror 6') || text.includes('mirror 7')) {
      return true;
    }
    return false;
  }

  function randomizeAllClusterLinks() {
    try {
      const selectors = [
        '.app-launch-btn',
        '.hud-cta-app-btn',
        '.launch-streamlit-btn',
        'a[href="https://turnitout.streamlit.app/"]'
      ];
      const links = document.querySelectorAll(selectors.join(','));
      links.forEach(function(link) {
        if (!isExplicitMirrorLink(link, link.getAttribute('href'))) {
          link.href = getRandomClusterNode();
        }
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
    if (isExplicitMirrorLink(link, href)) {
      return; // Respect direct user choice
    }
    const isAppBtn = link.classList.contains('app-launch-btn') ||
                     link.classList.contains('hud-cta-app-btn') ||
                     link.classList.contains('launch-streamlit-btn');
    if (isAppBtn || (href && href === 'https://turnitout.streamlit.app/')) {
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
