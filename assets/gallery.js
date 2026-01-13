const Gallery = (() => {
  let photoSwipeModule = null;

  async function loadPhotoSwipe() {
    if (photoSwipeModule) return photoSwipeModule;

    try {
      photoSwipeModule = await import('https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.esm.min.js');
      return photoSwipeModule;
    } catch (error) {
      console.error('Failed to load PhotoSwipe:', error);
      return null;
    }
  }

  function getGalleryItems() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return [];

    const items = [];
    gallery.querySelectorAll('.gallery-item').forEach((item, index) => {
      const img = item.querySelector('img');
      if (!img) return;

      items.push({
        src: item.href || img.src,
        width: parseInt(item.dataset.pswpWidth) || 1200,
        height: parseInt(item.dataset.pswpHeight) || 800,
        alt: img.alt || `Gallery image ${index + 1}`,
        element: item
      });
    });

    return items;
  }

  async function openLightbox(index) {
    const PhotoSwipeModule = await loadPhotoSwipe();
    if (!PhotoSwipeModule) return;

    const { default: PhotoSwipe } = PhotoSwipeModule;
    const items = getGalleryItems();

    if (items.length === 0) return;

    const dataSource = items.map(item => ({
      src: item.src,
      width: item.width,
      height: item.height,
      alt: item.alt
    }));

    const pswp = new PhotoSwipe({
      dataSource,
      index,
      bgOpacity: 0.9,
      showHideAnimationType: 'fade',
      pswpModule: PhotoSwipe
    });

    pswp.init();
  }

  function initGalleryClicks() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    const items = gallery.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
      });
    });
  }

  function init() {
    if (!document.getElementById('gallery')) return;
    
    initGalleryClicks();
    
    loadPhotoSwipe();
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    init,
    openLightbox
  };
})();

export default Gallery;

