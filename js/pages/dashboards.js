// Dashboards Rendering & Interactivity Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- Responsive Sidebar Toggles ---
  const toggleBtn = document.querySelector('.sidebar-toggle-btn');
  const sidebar = document.querySelector('.dashboard-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });

    // Close sidebar on clicking main content area
    document.querySelector('.dashboard-main').addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  }

  // --- Dynamic SVG Chart Generator ---
  const chartSvg = document.getElementById('chart-svg');
  if (chartSvg) {
    const dataPoints = [24, 38, 30, 48, 56, 75]; // Represents luxury properties deals monthly
    const padding = 40;
    const width = chartSvg.clientWidth || 600;
    const height = chartSvg.clientHeight || 240;
    
    // Clear initial markup (except gradient defs)
    const defs = chartSvg.querySelector('defs');
    chartSvg.innerHTML = '';
    if (defs) chartSvg.appendChild(defs);

    const xStep = (width - padding * 2) / (dataPoints.length - 1);
    const maxVal = Math.max(...dataPoints) * 1.1;
    const yRatio = (height - padding * 2) / maxVal;

    // Build Coordinates
    const coords = dataPoints.map((val, idx) => {
      return {
        x: padding + idx * xStep,
        y: height - padding - val * yRatio
      };
    });

    // Draw Grid Lines (Horizontal values guidelines)
    const gridCount = 4;
    for (let i = 0; i <= gridCount; i++) {
      const y = padding + (i * (height - padding * 2)) / gridCount;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', padding);
      line.setAttribute('y1', y);
      line.setAttribute('x2', width - padding);
      line.setAttribute('y2', y);
      line.setAttribute('class', 'chart-gridline');
      chartSvg.appendChild(line);
    }

    // Build Polyline path points
    const pointsString = coords.map(c => `${c.x},${c.y}`).join(' ');
    
    // Build Gradient Area path
    const areaPointsString = `${coords[0].x},${height - padding} ` + pointsString + ` ${coords[coords.length - 1].x},${height - padding}`;
    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    areaPath.setAttribute('points', areaPointsString);
    areaPath.setAttribute('class', 'chart-area');
    chartSvg.appendChild(areaPath);

    // Draw Primary Polyline
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', pointsString);
    polyline.setAttribute('class', 'chart-line');
    chartSvg.appendChild(polyline);

    // Draw Interactive Data Dots
    coords.forEach((c, idx) => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', c.x);
      dot.setAttribute('cy', c.y);
      dot.setAttribute('r', 5);
      dot.setAttribute('class', 'chart-dot');
      
      // Interactive tooltip overlay
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = `Month ${idx + 1}: ${dataPoints[idx]} deals`;
      dot.appendChild(title);
      
      chartSvg.appendChild(dot);
    });
  }

  // --- Mock Notifications Clear Handler ---
  const notifyClearBtn = document.getElementById('clear-notify-btn');
  if (notifyClearBtn) {
    notifyClearBtn.addEventListener('click', () => {
      const activityTimeline = document.querySelector('.activity-timeline');
      if (activityTimeline) {
        activityTimeline.innerHTML = `
          <div class="wishlist-empty-state" style="padding: var(--spacing-md) 0;">
            <p>No new notifications or alerts.</p>
          </div>
        `;
      }
      notifyClearBtn.style.display = 'none';
    });
  }
});
