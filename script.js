
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const description = document.getElementById('description');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    
    let currentImageIndex = 0;
    let isZoomed = false; // To track zoom state

    function showLightbox(index) {
        const thumbnail = thumbnails[index];
        lightboxImage.src = thumbnail.getAttribute('data-large');
        description.textContent = thumbnail.getAttribute('data-description');
        lightbox.style.display = 'flex';
        currentImageIndex = index;
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        resetZoom(); // Reset zoom on close
    }
  
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
        showLightbox(currentImageIndex);
    }
  
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
        showLightbox(currentImageIndex);
    }
  
    function toggleZoom() {
        if (isZoomed) {
            resetZoom();
        } else {
            zoomIn();
        }
    }
  
    function zoomIn() {
        lightboxImage.style.transform = 'scale(2)'; // Change this scale value to your liking
        isZoomed = true;
    }
  
    function resetZoom() {
        lightboxImage.style.transform = 'scale(1)';
        isZoomed = false;
    }
  
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            showLightbox(index);
        });
    });
  
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    
    lightboxImage.addEventListener('dblclick', toggleZoom);

    window.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    window.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });

    // Tab functionality
    const tablinks = document.querySelectorAll('.tablink');
    const tabcontents = document.querySelectorAll('.tabcontent');
  
    function openTab(evt, tabName) {
        tabcontents.forEach(content => content.classList.remove('active'));
        tablinks.forEach(link => link.classList.remove('active'));
  
        document.getElementById(tabName).classList.add('active');
        if (evt) evt.currentTarget.classList.add('active');
    }
  
    // Event listeners for tabs
    tablinks.forEach(tablink => {
        tablink.addEventListener('click', function(event) {
            openTab(event, tablink.textContent.toLowerCase());
        });
    });
  
    // Activate the "All" tab by default
    openTab(null, 'all');
});

