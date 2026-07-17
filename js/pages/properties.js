// Properties Listing Catalog Page Logic

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const propertiesGrid = document.getElementById('properties-catalog-grid');
  const resultsCountEl = document.getElementById('results-count');
  const sortSelect = document.getElementById('sort-select');
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewListBtn = document.getElementById('view-list-btn');
  
  // Filter Inputs
  const searchInput = document.getElementById('filter-search');
  const citySelect = document.getElementById('filter-city');
  const typeSelect = document.getElementById('filter-type');
  const bedsSelect = document.getElementById('filter-beds');
  const priceSlider = document.getElementById('filter-price');
  const priceVal = document.getElementById('price-val');
  const areaSlider = document.getElementById('filter-area');
  const areaVal = document.getElementById('area-val');

  // Compare Bar Elements
  const compareBar = document.getElementById('compare-bar');
  const compareCountEl = document.getElementById('compare-count');

  // Catalog State
  let currentFilters = {
    search: '',
    city: '',
    type: '',
    beds: '',
    priceMax: 12000000,
    areaMax: 400000
  };
  let currentSort = 'featured';
  let viewMode = 'grid'; // 'grid' or 'list'

  // Initialize Filters from URL params
  const initFiltersFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('type')) {
      currentFilters.type = params.get('type');
      if (typeSelect) typeSelect.value = currentFilters.type;
    }
    if (params.has('city')) {
      currentFilters.city = params.get('city');
      if (citySelect) citySelect.value = currentFilters.city;
    }
    if (params.has('beds')) {
      currentFilters.beds = params.get('beds');
      if (bedsSelect) bedsSelect.value = currentFilters.beds;
    }
  };

  // Render Skeleton Loader
  const renderSkeletons = () => {
    if (!propertiesGrid) return;
    propertiesGrid.innerHTML = '';
    const count = viewMode === 'grid' ? 6 : 3;
    for (let i = 0; i < count; i++) {
      propertiesGrid.innerHTML += `
        <div class="shimmer-card">
          <div class="shimmer-img shimmer-placeholder"></div>
          <div class="shimmer-text shimmer-title shimmer-placeholder"></div>
          <div class="shimmer-text shimmer-desc shimmer-placeholder"></div>
          <div class="shimmer-text shimmer-meta shimmer-placeholder"></div>
        </div>
      `;
    }
  };

  // Render Property Card Markup
  const renderPropertiesList = (filteredData) => {
    if (!propertiesGrid) return;
    propertiesGrid.innerHTML = '';
    
    if (filteredData.length === 0) {
      propertiesGrid.innerHTML = `
        <div class="wishlist-empty-state" style="grid-column: 1 / -1;">
          <svg viewBox="0 0 24 24"><path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Zm0-12a1,1,0,1,0,1,1A1,1,0,0,0,12,8Zm1,8a1,1,0,0,0-2,0v-4a1,1,0,0,0,2,0Z"/></svg>
          <h3>No Properties Found</h3>
          <p>Try adjusting your filters or search keywords.</p>
        </div>
      `;
      if (resultsCountEl) resultsCountEl.innerText = '0 Properties Found';
      return;
    }

    if (resultsCountEl) {
      resultsCountEl.innerText = `${filteredData.length} ${filteredData.length === 1 ? 'Property' : 'Properties'} Found`;
    }

    const wishlist = getWishlist();
    const compareList = getCompareList();

    filteredData.forEach(p => {
      const isWishlisted = wishlist.includes(p.id);
      const isCompared = compareList.includes(p.id);
      
      const card = document.createElement('div');
      card.className = `glass-card property-card reveal reveal-up reveal-visible`;
      
      card.innerHTML = `
        <div class="property-card-img-wrapper">
          <img class="property-card-img" src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="property-badge">${p.featured ? 'Featured' : 'Premium'}</span>
          <span class="property-card-price">${p.price}</span>
          
          <div class="property-card-actions">
            <button class="property-action-btn fav-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}" aria-label="Add to Wishlist">
              <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
            <button class="property-action-btn compare-btn ${isCompared ? 'compare-active' : ''}" data-id="${p.id}" aria-label="Add to Compare">
              <svg viewBox="0 0 24 24"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/></svg>
            </button>
          </div>
        </div>
        
        <div class="property-card-content">
          <span class="property-card-tag">${p.type}</span>
          <h3 class="property-card-title">${p.title}</h3>
          <div class="property-card-address">
            <svg viewBox="0 0 24 24"><path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z"/></svg>
            <span>${p.address}</span>
          </div>
          
          <div class="property-card-features">
            <div class="property-feature-item">
              <svg viewBox="0 0 24 24"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-2.99H11v8H9v-8H3v10h18V6.01zM7 11h2v2H7v-2zm10 2h-6v-2h6v2z"/></svg>
              <span>${p.beds} Beds</span>
            </div>
            <div class="property-feature-item">
              <svg viewBox="0 0 24 24"><path d="M21 11c0-2.76-2.24-5-5-5s-5 2.24-5 5H3v10h18V11zm-5-3c1.66 0 3 1.34 3 3h-6c0-1.66 1.34-3 3-3zm-1 9h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>
              <span>${p.baths} Baths</span>
            </div>
            <div class="property-feature-item">
              <svg viewBox="0 0 24 24"><path d="M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z M17,12h-4V8h-2v4H7v2h4v4h2v-4h4V12z"/></svg>
              <span>${p.area} Sq Ft</span>
            </div>
            <div class="property-feature-item">
              <svg viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5z"/></svg>
              <span>${p.parking} Parking</span>
            </div>
          </div>
          
          <div class="property-card-footer">
            <a href="property-details.html?id=${p.id}" class="btn btn-outline-gold btn-sm btn-shimmer view-details-link">View Details</a>
          </div>
        </div>
      `;
      propertiesGrid.appendChild(card);
    });

    // Rebind micro-interactions
    bindCardActions();
  };

  // Bind click handlers to Favorite & Compare buttons inside cards
  const bindCardActions = () => {
    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const isActive = toggleWishlist(id);
        btn.classList.toggle('active', isActive);
      });
    });

    document.querySelectorAll('.compare-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const isCompared = toggleCompareList(id);
        btn.classList.toggle('compare-active', isCompared);
        updateCompareBar();
      });
    });
  };

  // Compare Bar controller
  const updateCompareBar = () => {
    if (!compareBar || !compareCountEl) return;
    const compareList = getCompareList();
    const count = compareList.length;
    
    if (count > 0) {
      compareCountEl.innerText = `${count} ${count === 1 ? 'property' : 'properties'} selected`;
      compareBar.classList.add('show');
    } else {
      compareBar.classList.remove('show');
    }
  };

  // Pipeline Filter Logic
  const applyFilters = () => {
    renderSkeletons();
    
    setTimeout(() => {
      let filtered = PROPERTIES.filter(p => {
        // Keyword Search (Matches Title, Address, City)
        const matchesSearch = currentFilters.search === '' || 
          p.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
          p.address.toLowerCase().includes(currentFilters.search.toLowerCase());

        // Dropdown options
        const matchesCity = currentFilters.city === '' || p.city.toLowerCase() === currentFilters.city.toLowerCase();
        const matchesType = currentFilters.type === '' || p.type.toLowerCase() === currentFilters.type.toLowerCase();
        
        // Bed count (Matches exact or higher if 5+)
        let matchesBeds = true;
        if (currentFilters.beds !== '') {
          const bedsNum = parseInt(currentFilters.beds, 10);
          matchesBeds = bedsNum === 5 ? p.beds >= 5 : p.beds === bedsNum;
        }

        // Numerical sliders
        const matchesPrice = p.priceRaw <= currentFilters.priceMax;
        const matchesArea = p.area <= currentFilters.areaMax;

        return matchesSearch && matchesCity && matchesType && matchesBeds && matchesPrice && matchesArea;
      });

      // Sorting
      if (currentSort === 'price-asc') {
        filtered.sort((a, b) => a.priceRaw - b.priceRaw);
      } else if (currentSort === 'price-desc') {
        filtered.sort((a, b) => b.priceRaw - a.priceRaw);
      } else if (currentSort === 'area') {
        filtered.sort((a, b) => b.area - a.area);
      } else {
        // Default "Featured" or Date sort (here featured first)
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }

      renderPropertiesList(filtered);
    }, 400); // Small delay to show shimmer skeleton effect
  };

  // Event Listeners for filters
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilters.search = e.target.value;
      applyFilters();
    });
  }
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      currentFilters.city = e.target.value;
      applyFilters();
    });
  }
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      currentFilters.type = e.target.value;
      applyFilters();
    });
  }
  if (bedsSelect) {
    bedsSelect.addEventListener('change', (e) => {
      currentFilters.beds = e.target.value;
      applyFilters();
    });
  }

  // Price slider formatting
  if (priceSlider && priceVal) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      currentFilters.priceMax = val;
      
      // Formatting USD representation
      if (val >= 1000000) {
        priceVal.innerText = `$${(val / 1000000).toFixed(1)}M`;
      } else {
        priceVal.innerText = `$${val.toLocaleString()}`;
      }
      applyFilters();
    });
  }

  // Area slider formatting
  if (areaSlider && areaVal) {
    areaSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      currentFilters.areaMax = val;
      areaVal.innerText = `${val.toLocaleString()} Sq Ft`;
      applyFilters();
    });
  }

  // Sorting Selector
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  // Grid/List toggles
  if (viewGridBtn && viewListBtn) {
    viewGridBtn.addEventListener('click', () => {
      viewMode = 'grid';
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      if (propertiesGrid) {
        propertiesGrid.classList.remove('list-view');
      }
      applyFilters();
    });

    viewListBtn.addEventListener('click', () => {
      viewMode = 'list';
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      if (propertiesGrid) {
        propertiesGrid.classList.add('list-view');
      }
      applyFilters();
    });
  }

  // Clear Compare Bar lists on load
  const compareClearBtn = document.getElementById('compare-clear-btn');
  if (compareClearBtn) {
    compareClearBtn.addEventListener('click', () => {
      localStorage.setItem('stackly_compare', JSON.stringify([]));
      document.querySelectorAll('.compare-btn').forEach(btn => {
        btn.classList.remove('compare-active');
      });
      updateCompareBar();
    });
  }

  // Run initial calculations
  initFiltersFromUrl();
  applyFilters();
  updateCompareBar();
});
