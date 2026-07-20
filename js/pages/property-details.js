// Property Details Page Logic

document.addEventListener('DOMContentLoaded', () => {
  // Extract property ID from URL query
  const params = new URLSearchParams(window.location.search);
  const propertyId = parseInt(params.get('id'), 10) || 1; // Default to ID 1

  // Load Property Details from mock database
  const property = PROPERTIES.find(p => p.id === propertyId) || PROPERTIES[0];

  // Populate Details
  const titleEl = document.getElementById('details-title');
  const priceEl = document.getElementById('details-price');
  const typeEl = document.getElementById('details-type');
  const cityEl = document.getElementById('details-city');
  const addressEl = document.getElementById('details-address');
  const descEl = document.getElementById('details-description');
  const bedsEl = document.getElementById('details-beds');
  const bathsEl = document.getElementById('details-baths');
  const areaEl = document.getElementById('details-area');
  const parkingEl = document.getElementById('details-parking');
  const mainImgEl = document.getElementById('gallery-main-img');
  const thumbsContainer = document.getElementById('gallery-thumbnails');
  const amenitiesContainer = document.getElementById('amenities-grid');

  if (titleEl) titleEl.innerText = property.title;
  if (priceEl) priceEl.innerText = property.price;
  if (typeEl) typeEl.innerText = property.type;
  if (cityEl) cityEl.innerText = property.city;
  if (addressEl) addressEl.innerText = property.address;
  if (descEl) descEl.innerText = property.description;
  if (bedsEl) bedsEl.innerText = property.beds;
  if (bathsEl) bathsEl.innerText = property.baths;
  if (areaEl) areaEl.innerText = property.area;
  if (parkingEl) parkingEl.innerText = property.parking;

  // Set up Gallery Images
  if (mainImgEl) {
    mainImgEl.src = property.image;
    mainImgEl.alt = property.title;
  }

  // Generate dynamic thumbnails
  if (thumbsContainer) {
    thumbsContainer.innerHTML = '';
    
    // We will generate 5 thumbnails (using property image and other standard property JPEGs as mock variations)
    const gallerySrcs = [
      property.image,
      "images/properties/villa-2.webp",
      "images/properties/apt-2.webp",
      "images/properties/villa-3.webp",
      "images/properties/kitchen-1.webp"
    ];

    gallerySrcs.forEach((src, index) => {
      const thumb = document.createElement('div');
      thumb.className = `gallery-thumb ${index === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${src}" alt="Thumbnail ${index + 1}">`;
      
      thumb.addEventListener('click', () => {
        // Remove active class from all
        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        // Add to this
        thumb.classList.add('active');
        // Update main image path
        if (mainImgEl) mainImgEl.src = src;
      });
      thumbsContainer.appendChild(thumb);
    });
  }

  // Populate Amenities
  if (amenitiesContainer && property.amenities) {
    amenitiesContainer.innerHTML = '';
    property.amenities.forEach(amenity => {
      const item = document.createElement('div');
      item.className = 'amenity-item';
      item.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
        <span>${amenity}</span>
      `;
      amenitiesContainer.appendChild(item);
    });
  }

  // --- Gallery Fullscreen Lightbox Modal ---
  if (mainImgEl) {
    mainImgEl.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.id = 'gallery-lightbox';
      lightbox.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(11, 31, 58, 0.95); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; cursor: zoom-out;
      `;
      
      const img = document.createElement('img');
      img.src = mainImgEl.src;
      img.style.cssText = `max-width: 90%; max-height: 90%; object-fit: contain; border-radius: var(--radius-md); box-shadow: var(--shadow-lg);`;
      
      lightbox.appendChild(img);
      document.body.appendChild(lightbox);
      
      lightbox.addEventListener('click', () => {
        lightbox.remove();
      });
    });
  }

  // --- Mortgage Calculator Formula Solver ---
  const sliderPrice = document.getElementById('mortgage-price');
  const sliderDown = document.getElementById('mortgage-down');
  const sliderRate = document.getElementById('mortgage-rate');
  const sliderTerm = document.getElementById('mortgage-term');

  const lblPrice = document.getElementById('lbl-mortgage-price');
  const lblDown = document.getElementById('lbl-mortgage-down');
  const lblRate = document.getElementById('lbl-mortgage-rate');
  const lblTerm = document.getElementById('lbl-mortgage-term');
  const outputPrice = document.getElementById('mortgage-payment-output');

  // Set Initial Slider Price from Property
  if (sliderPrice && property.priceRaw) {
    sliderPrice.value = property.priceRaw;
    sliderPrice.max = property.priceRaw * 1.5;
    // Set down payment max to property price
    if (sliderDown) {
      sliderDown.max = property.priceRaw;
      sliderDown.value = Math.floor(property.priceRaw * 0.2); // 20% down
    }
  }

  const calculateMortgage = () => {
    if (!sliderPrice || !sliderDown || !sliderRate || !sliderTerm || !outputPrice) return;

    const P_raw = parseInt(sliderPrice.value, 10);
    const D_raw = parseInt(sliderDown.value, 10);
    const R_annual = parseFloat(sliderRate.value);
    const N_years = parseInt(sliderTerm.value, 10);

    // Update labels
    if (lblPrice) lblPrice.innerText = `$${P_raw.toLocaleString()}`;
    if (lblDown) lblDown.innerText = `$${D_raw.toLocaleString()}`;
    if (lblRate) lblRate.innerText = `${R_annual}%`;
    if (lblTerm) lblTerm.innerText = `${N_years} Years`;

    const P = P_raw - D_raw;
    const r = R_annual / 12 / 100;
    const n = N_years * 12;

    if (P <= 0) {
      outputPrice.innerText = "$0";
      return;
    }

    if (r === 0) {
      outputPrice.innerText = `$${Math.round(P / n).toLocaleString()}`;
      return;
    }

    // Formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    outputPrice.innerText = `$${Math.round(M).toLocaleString()}`;
  };

  // Add inputs listener
  [sliderPrice, sliderDown, sliderRate, sliderTerm].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', calculateMortgage);
    }
  });

  calculateMortgage(); // Initial calculation

  // --- Schedule Visit Form Actions ---
  const bookingForm = document.getElementById('visit-schedule-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const date = document.getElementById('visit-date').value;
      const time = document.getElementById('visit-time').value;
      const name = document.getElementById('visit-name').value;
      const email = document.getElementById('visit-email').value;
      
      if (!date || !time || !name || !email) {
        alert("Please populate all fields to submit.");
        return;
      }
      
      alert(`Visit successfully requested for ${date} at ${time}. One of our elite advisors will contact you shortly.`);
      // Redirect to 404 per navigation rules
      window.location.href = '404.html';
    });
  }

  // --- Render Sidebar Agent Card ---
  const sidebarAgent = AGENTS.find(a => a.id === property.agentId) || AGENTS[0];
  const agentAvatar = document.getElementById('agent-avatar');
  const agentName = document.getElementById('agent-name');
  const agentDesignation = document.getElementById('agent-designation');
  const agentExperience = document.getElementById('agent-experience');
  const agentSold = document.getElementById('agent-sold');

  if (agentAvatar) agentAvatar.src = sidebarAgent.image;
  if (agentName) agentName.innerText = sidebarAgent.name;
  if (agentDesignation) agentDesignation.innerText = sidebarAgent.designation;
  if (agentExperience) agentExperience.innerText = sidebarAgent.experience;
  if (agentSold) agentSold.innerText = `${sidebarAgent.sold}+ Properties`;

  // --- Similar Properties Recommendations ---
  const similarGrid = document.getElementById('similar-properties-grid');
  if (similarGrid) {
    similarGrid.innerHTML = '';
    // Select 3 properties (excluding current)
    const similarList = PROPERTIES.filter(p => p.id !== property.id).slice(0, 3);
    
    similarList.forEach(p => {
      const card = document.createElement('div');
      card.className = 'glass-card property-card';
      card.innerHTML = `
        <div class="property-card-img-wrapper">
          <img class="property-card-img" src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="property-card-price">${p.price}</span>
        </div>
        <div class="property-card-content">
          <span class="property-card-tag">${p.type}</span>
          <h4 class="property-card-title">${p.title}</h4>
          <p class="property-card-address">${p.city}</p>
          <div class="property-card-footer">
            <a href="property-details.html?id=${p.id}" class="btn btn-outline-gold btn-sm btn-shimmer">View Details</a>
          </div>
        </div>
      `;
      similarGrid.appendChild(card);
    });
  }
});
