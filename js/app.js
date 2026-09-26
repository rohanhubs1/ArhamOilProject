/**
 * Arham Oil - Robotics Showcase Application
 * Handles: Robot data, specifications switching, 3D interaction bridge,
 *          Real Photo Gallery Lightbox, ROI Calculator, and UI handlers.
 */

const ROBOTS_DATA = {
  mushaq: {
    id: 'mushaq',
    name: 'MUSHAQ 2.0',
    tagline: 'Intrinsically Safe ATEX Zone-0 Tank Cleaning Crawler',
    category: 'Flagship In-Tank Robot',
    badge: 'ATEX Zone-0 Certified',
    description: 'Arham Oil’s flagship compact non-man entry crawler engineered specifically for confined space storage tanks containing crude oil, high-viscosity sludge, slop, and hazardous hydrocarbons. Fits seamlessly through standard 24" (600mm) tank manways.',
    quickStats: [
      { label: 'Jetting Pressure', value: '1 – 50 bar', icon: 'gauge' },
      { label: 'Suction Capacity', value: '5 – 20 m³/h', icon: 'wind' },
      { label: 'Hydraulic Power', value: '15 HP Pack', icon: 'zap' },
      { label: 'Tether Range', value: '100 Meters', icon: 'maximize-2' }
    ],
    dimensions: {
      length: '30 inches (762 mm)',
      width: '20 inches (508 mm)',
      height: '8 inches (203 mm)',
      weight: '85 kg (approx.)'
    },
    subtabs: {
      dimensions: [
        { key: 'Dimensions (LxBxH)', val: '30 x 20 x 8 inches (762 x 508 x 203 mm)' },
        { key: 'Chassis Weight', val: '85 kg (approx.)' },
        { key: 'Chassis Material', val: 'AISI 316 Stainless Steel & Spark-Proof Bronze' },
        { key: 'Drive Type', val: 'Dual Heavy-Duty Hydraulic Caterpillar Tracks' },
        { key: 'Sludge Augers', val: 'Twin Spiral Helical Cutters (Hardened Tool Steel)' },
        { key: 'Traction Grip', val: 'Zero-Slip Nitrile Cleats for Sludge Submersion' },
        { key: 'Manway Clearance', val: 'Fits standard 24" (600 mm) tank manholes with ease' }
      ],
      hydraulics: [
        { key: 'Hydraulic Power Pack', val: '15 HP Flameproof Electro-Hydraulic Unit' },
        { key: 'Jetting Pressure', val: '1 to 50 bar (AdaptiveJet™ Pressure Control)' },
        { key: 'Upper Nozzle Array', val: 'Multi-jet manifold hitting sludge mounts' },
        { key: 'Lower Nozzle Array', val: 'Bottom flush bar scouring tank floor to bare metal' },
        { key: 'Suction Extraction', val: '5 to 20 m³/hour continuous slurry vacuum' },
        { key: 'Auger Configurations', val: '3–4 interchangeable auger configurations for varying viscosities' },
        { key: 'Solids Passage', val: 'Pumps up to 25 mm solids without impeller jamming' }
      ],
      safety: [
        { key: 'Hazardous Certification', val: 'ATEX Zone-0 (IIC T4) / IECEx intrinsically safe' },
        { key: 'Confined Space Policy', val: '100% Non-Man Entry Guaranteed (Zero Life Loss)' },
        { key: 'Gas Atmosphere', val: 'Safe in Explosive Hydrocarbon Atmospheres' },
        { key: 'Greenhouse Emissions', val: 'Zero Greenhouse / Closed-Loop Emissions' },
        { key: 'Control Isolation', val: 'Remote cabin operation outside hazardous bund wall' },
        { key: 'Emergency Failsafe', val: 'Automatic hydraulic lock & dead-man switch' }
      ],
      vision: [
        { key: 'LiDAR System', val: '360° Solid-State LiDAR SLAM 3D Point Cloud' },
        { key: 'Corrosion Mapping', val: 'Real-time sludge volume and wall corrosion scanning' },
        { key: 'Camera Suite', val: 'Dual Explosion-Proof Low-Light HD Cameras' },
        { key: 'Illumination', val: 'High-CRI LED Floodlights (4,000 Lumens)' },
        { key: 'Umbilical Cable', val: '100 m Armored Kevlar-Reinforced Tether' },
        { key: 'Telemetry Display', val: 'Live HD pilot console with pressure & depth telemetry' }
      ]
    },
    features: [
      'Upper Nozzles: Specifically calibrated for pulverizing solidified sludge mounds',
      'Lower Nozzles: Floor scouring wash bar flushing bottom plate clean to bare metal',
      '3-4 interchangeable auger configurations for varying sludge viscosities',
      'Capable of entering standard 24" (600 mm) tank manholes with ease',
      'LiDAR 3D mapping scans sludge volume, depth, and wall corrosion in real-time',
      'Remote joystick operation from air-conditioned command cabin outside the bund wall'
    ],
    applications: [
      'Crude Oil Floating & Fixed Roof Storage Tanks',
      'Refinery Slop and Heavy Distillate Tanks',
      'Cooling Tower Basins & Sumps',
      'ETP / OWS Hazardous Waste Pits',
      'Pipeline Desludging Applications'
    ],
    photos: [
      { url: 'assets/images/robot-cutout.webp', caption: 'Mushaq 2.0 Crawler Profile' },
      { url: 'assets/images/robot-real-2.webp', caption: 'Interior Tank Desludging Operations' },
      { url: 'assets/images/robot-real-1.webp', caption: 'Site Deployment Team Outside Manhole' },
      { url: 'assets/images/tank-cleaning-robots.webp', caption: 'High-Pressure Manifold Testing' }
    ]
  },

  lagoon: {
    id: 'lagoon',
    name: 'LAGOON & SUMP MASTER',
    tagline: 'Articulated Hydraulic Arm Dredging & Desludging Robot',
    category: 'Amphibious Dredging Robot',
    badge: 'Heavy Solids 25mm Clearance',
    description: 'A heavy-duty amphibious and swamp-tracked robotic dredge designed for uncrewed cleaning of open effluent lagoons, API oil-water separators, toxic sludge ponds, and refinery drainage sumps. Eliminates hazardous personnel exposure to toxic fumes (H2S, benzene).',
    quickStats: [
      { label: 'Solid Clearance', value: 'Up to 25 mm', icon: 'disc' },
      { label: 'Submersible Flow', value: 'Up to 45 m³/h', icon: 'droplet' },
      { label: 'Boom Reach', value: '2.8 Meters', icon: 'maximize-2' },
      { label: 'Power Source', value: '25 HP Hydraulic', icon: 'zap' }
    ],
    dimensions: {
      length: '48 inches (1220 mm)',
      width: '36 inches (915 mm)',
      height: '28 inches (710 mm)',
      weight: '210 kg'
    },
    subtabs: {
      dimensions: [
        { key: 'Dimensions (LxBxH)', val: '48 x 36 x 28 inches (1220 x 915 x 710 mm)' },
        { key: 'Operating Weight', val: '210 kg' },
        { key: 'Platform Type', val: 'Amphibious Deep-Mud Pontoon Track System' },
        { key: 'Buoyancy Assist', val: 'Sealed High-Density Aluminum Flotation Chambers' },
        { key: 'Slewing Ring', val: '360° Continuous Hydraulic Rotation' },
        { key: 'Arm Reach', val: '2.8 meters hydraulic reach with 180° swing radius' }
      ],
      hydraulics: [
        { key: 'Submersible Pump', val: 'High-Head Hardened Vortex Slurry Pump' },
        { key: 'Max Particle Size', val: '25 mm (Passes gravel, scale, and heavy solids)' },
        { key: 'Agitation System', val: 'Mechanical High-Torque Agitator Head' },
        { key: 'Pumping Rate', val: '20 to 45 m³/hr adjustable flow' },
        { key: 'Hydraulic Source', val: '25 HP External Power Pack' },
        { key: 'Dual Nozzle Jets', val: 'Assists in liquefying heavy settled tar' }
      ],
      safety: [
        { key: 'Hazard Elimination', val: 'Zero Human Exposure to H2S / Toxic Lagoon Vapors' },
        { key: 'Submersible Rating', val: 'Submerged operation up to 5 meters in sludge' },
        { key: 'Remote Range', val: '150 meters remote radio & umbilical control' },
        { key: 'Operating Safety', val: 'ATEX compliant hydraulic drive' }
      ],
      vision: [
        { key: 'Sonar / Depth Profiling', val: 'Ultrasonic sludge bed thickness mapping' },
        { key: 'Camera Mast', val: 'Dual waterproof IP68 inspection cameras' },
        { key: 'Searchlights', val: 'Ultra-bright LED submersible illumination' },
        { key: 'Control Interface', val: 'All-weather ruggedized joystick console' }
      ]
    },
    features: [
      'Articulated hydraulic arm maneuvers submerged pump directly into dense sludge pockets',
      'Mechanical agitation mobilizes thick sediment without needing chemical thinning',
      'Pumps solids up to 25mm without clogging or impeller jamming',
      'Operates in active lagoons without requiring plant shutdown or pond drainage',
      'Dual high-velocity agitation nozzles assist in liquefying heavy tar residues'
    ],
    applications: [
      'Refinery Effluent Treatment Ponds (ETP)',
      'Crude Oil Receiving Sump Pits (CRWS/OWS)',
      'Petrochemical Aeration Basins',
      'Acid Wagons & Underground Vessels',
      'Industrial Wastewater Lagoons'
    ],
    photos: [
      { url: 'assets/images/robot-3.webp', caption: 'Lagoon Master Submerged Head Setup' },
      { url: 'assets/images/robot-real-3.webp', caption: 'Heavy-Duty Hydraulic Control Tether' },
      { url: 'assets/images/robot-field-1.webp', caption: 'Refinery Pit Dredging Project' },
      { url: 'assets/images/hydrocarbon-robots.webp', caption: 'Amphibious Mobility Demonstration' }
    ]
  },

  hydrovac: {
    id: 'hydrovac',
    name: 'HYDRO-VAC CRAWLER',
    tagline: 'High-Flow Hydrocarbon Desludging & Inspection Robot',
    category: 'Inspection & Recovery Robot',
    badge: 'Integrated UT Thickness NDT',
    description: 'An advanced high-flow sludge extraction crawler featuring integrated Non-Destructive Testing (NDT) sensors. Simultaneously vacuums viscous hydrocarbon sludge and conducts ultrasonic thickness (UT) measurements on tank bottom plates.',
    quickStats: [
      { label: 'Vacuum Flow', value: 'Up to 35 m³/h', icon: 'wind' },
      { label: 'Surface Wash', value: 'Up to 200 bar', icon: 'gauge' },
      { label: 'NDT Inspection', value: 'UT Scanning', icon: 'activity' },
      { label: 'Turnaround Cut', value: '40% – 60%', icon: 'clock' }
    ],
    dimensions: {
      length: '36 inches (914 mm)',
      width: '28 inches (711 mm)',
      height: '14 inches (355 mm)',
      weight: '115 kg'
    },
    subtabs: {
      dimensions: [
        { key: 'Dimensions (LxBxH)', val: '36 x 28 x 14 inches (914 x 711 x 355 mm)' },
        { key: 'Chassis Weight', val: '115 kg' },
        { key: 'Chassis Profile', val: 'Ultra-low ground pressure with magnetic assist' },
        { key: 'Vacuum Hood Span', val: '750 mm wide-sweep hydraulic skirt' },
        { key: 'Mobility', val: 'Zero-radius turning dual track module' }
      ],
      hydraulics: [
        { key: 'Extraction Flow', val: 'Up to 35 m³/hr vacuum throughput' },
        { key: 'Washdown Pressure', val: '50 to 200 bar rotary high-impact nozzles' },
        { key: 'Vapor Handling', val: 'Closed-loop hydrocarbon vapor return system' },
        { key: 'Turnaround Speed', val: 'Turnaround in 3–5 days vs 14 days manual' }
      ],
      safety: [
        { key: 'Explosion Proof', val: 'Certified ATEX Zone-0 / IIC T4 rating' },
        { key: 'VOC Emissions', val: 'Closed-loop vapor recovery prevents vapor escape' },
        { key: 'Turnaround Safety', val: 'Zero personnel required inside tank' },
        { key: 'Compliance Report', val: 'API 653 & OISD 129 regulatory compliance' }
      ],
      vision: [
        { key: 'NDT Ultrasonic UT', val: 'Multi-channel floor plate thickness measurement' },
        { key: 'Pit Depth Profiling', val: 'Automated real-time corrosion pit scanning' },
        { key: 'Camera Mast', val: '4K Pan-Tilt-Zoom (PTZ) inspection camera' },
        { key: 'Digital Twin Export', val: 'Export 3D tank floor corrosion point cloud' }
      ]
    },
    features: [
      'Performs cleaning and API 653 baseline inspection in a single pass',
      'Closed-loop recovery minimizes volatile organic compound (VOC) emissions',
      'Reduces total tank cleaning turnaround from 14 days down to 3–5 days',
      'Compatible with Arham Oil’s mobile 3-phase oil recovery centrifuges',
      'Recovers 95%+ reusable oil for direct re-injection into pipeline/refinery'
    ],
    applications: [
      'Large Diameter Crude Oil Floating Roof Tanks',
      'White Oil & Finished Product Storage',
      'Chemical & Solvent Bullet Vessels',
      'Spherical Pressure Storage Tanks'
    ],
    photos: [
      { url: 'assets/images/robotic-tank-cleaning-2.webp', caption: 'Hydro-Vac Inspection Rig' },
      { url: 'assets/images/robot-field-2.webp', caption: 'Refinery Large Tank Turnaround' },
      { url: 'assets/images/robotic-cleaning-india.webp', caption: 'Floor Plate UT Scan Profile' },
      { url: 'assets/images/robot-cutout.webp', caption: 'Modular Chassis Configuration' }
    ]
  }
};

class ArhamApp {
  constructor() {
    this.currentRobot = 'mushaq';
    this.currentSubtab = 'dimensions';
    this.viewer3D = null;
    this.init();
  }

  init() {
    // 1. Initialize 3D Viewer
    if (window.RobotViewer3D) {
      this.viewer3D = new window.RobotViewer3D('viewer-3d-canvas-container');
    }

    // 2. Setup Robot Selector Tabs
    this.setupRobotTabs();

    // 3. Setup Specs Subtabs
    this.setupSubtabs();

    // 4. Render Initial Specifications
    this.renderRobotDetails(this.currentRobot);

    // 5. Setup 3D Control Buttons
    this.setupViewerControls();

    // 6. Setup Real Photos Lightbox Modal
    this.setupLightbox();

    // 7. Setup Tank Cleaning ROI Calculator
    this.setupCalculator();

    // 8. Setup Mobile Navigation & Smooth Scroll
    this.setupNavigation();

    // 9. Setup Brochure / Request Modal
    this.setupBrochureModal();
    this.setupFullSpecsModal();

    // 10. Re-initialize Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // ------------------------------------------
  // ROBOT SELECTION & DATA UPDATE
  // ------------------------------------------
  setupRobotTabs() {
    const tabs = document.querySelectorAll('.robot-tab-trigger');
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const robotId = tab.getAttribute('data-robot-id');
        if (robotId && robotId !== this.currentRobot) {
          this.switchRobot(robotId);
        }
      });
    });
  }

  setupSubtabs() {
    const subtabs = document.querySelectorAll('.spec-subtab-trigger');
    subtabs.forEach((st) => {
      st.addEventListener('click', () => {
        const tabKey = st.getAttribute('data-subtab');
        if (tabKey) {
          this.currentSubtab = tabKey;
          subtabs.forEach((s) => s.classList.remove('active'));
          st.classList.add('active');
          this.renderSubtabContent();
        }
      });
    });
  }

  switchRobot(robotId) {
    this.currentRobot = robotId;

    // Update Tab UI
    document.querySelectorAll('.robot-tab-trigger').forEach((tab) => {
      if (tab.getAttribute('data-robot-id') === robotId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update 3D Model
    if (this.viewer3D) {
      this.viewer3D.switchRobot(robotId);
    }

    // Render Specs & Details
    this.renderRobotDetails(robotId);

    // Re-create icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderRobotDetails(robotId) {
    const data = ROBOTS_DATA[robotId];
    if (!data) return;

    // 1. Title & Badges (with animation)
    const nameEl = document.getElementById('robot-name');
    nameEl.textContent = data.name;
    nameEl.classList.remove('animate-reveal-fast');
    void nameEl.offsetWidth; // trigger reflow
    nameEl.classList.add('animate-reveal-fast');

    document.getElementById('robot-category-badge').textContent = data.category;
    document.getElementById('robot-status-badge').textContent = data.badge;
    document.getElementById('robot-tagline').textContent = data.tagline;
    document.getElementById('robot-description').textContent = data.description;

    // 2. Quick Stat Pills (Animated staggered)
    const statsContainer = document.getElementById('robot-quick-stats');
    if (statsContainer) {
      statsContainer.innerHTML = data.quickStats.map((stat, idx) => `
        <div class="spec-box-light flex items-center gap-2.5 animate-reveal-fast" style="animation-delay: ${idx * 75}ms; animation-fill-mode: both;">
          <div class="p-2 rounded-lg bg-[rgba(124,173,62,0.15)] text-[#7CAD3E] flex-shrink-0">
            <i data-lucide="${stat.icon}" class="w-4 h-4"></i>
          </div>
          <div class="min-w-0">
            <div class="spec-label-dark">${stat.label}</div>
            <div class="spec-value-dark text-base">${stat.value}</div>
          </div>
        </div>
      `).join('');
    }

    // 3. Render Subtab Content
    this.renderSubtabContent();

    // 4. Real Photos Carousel / Thumbnails (Animated staggered)
    const photosContainer = document.getElementById('robot-photos-carousel');
    if (photosContainer) {
      photosContainer.innerHTML = data.photos.map((p, idx) => `
        <div class="photo-card-light h-28 flex-shrink-0 w-44 relative rounded-xl overflow-hidden group hover-zoom-container hover-glow cursor-pointer shadow-md animate-reveal-fast" style="animation-delay: ${(idx * 75) + 150}ms; animation-fill-mode: both;" onclick="ArhamApp.openLightbox('${p.url}', '${p.caption}')">
          <img src="${p.url}" alt="${p.caption}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.95)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-3">
            <span class="text-[11px] text-white font-bold leading-tight drop-shadow-md line-clamp-2">${p.caption}</span>
          </div>
        </div>
      `).join('');
    }
  }

  renderSubtabContent() {
    const data = ROBOTS_DATA[this.currentRobot];
    if (!data) return;

    const subtabTarget = document.getElementById('specs-tab-content');
    if (!subtabTarget) return;

    if (this.currentSubtab === 'features') {
      subtabTarget.innerHTML = `
        <div class="space-y-2">
          <h5 class="text-xs font-mono uppercase tracking-wider text-[#7CAD3E] font-bold mb-2">Specialized Capabilities</h5>
          <ul class="space-y-2">
            ${data.features.map(f => `
              <li class="flex items-start gap-2.5 text-xs text-[#334155]">
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-[#7CAD3E] flex-shrink-0 mt-0.5"></i>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>

          <h5 class="text-xs font-mono uppercase tracking-wider text-[#7CAD3E] font-bold mt-4 mb-2">Applications</h5>
          <div class="flex flex-wrap gap-1.5">
            ${data.applications.map(a => `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A]">
                <i data-lucide="check" class="w-3 h-3 text-[#7CAD3E]"></i>
                ${a}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      const items = data.subtabs[this.currentSubtab] || data.subtabs['dimensions'] || [];
      subtabTarget.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          ${items.map(it => `
            <div class="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-center">
              <span class="text-[10px] text-[#64748B] uppercase font-mono tracking-wider font-semibold">${it.key}</span>
              <span class="text-[#0F172A] font-bold text-xs mt-0.5">${it.val}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // ------------------------------------------
  // 3D VIEWER CONTROLS INTERFACE
  // ------------------------------------------
  setupViewerControls() {
    document.querySelectorAll('[data-camera-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-camera-preset');
        if (this.viewer3D) {
          this.viewer3D.setCameraPreset(preset);
        }
        document.querySelectorAll('[data-camera-preset]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    const btnRotate = document.getElementById('btn-toggle-rotate');
    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        if (this.viewer3D) {
          const state = this.viewer3D.toggleAutoRotate();
          btnRotate.classList.toggle('active', state);
        }
      });
    }

    const btnWireframe = document.getElementById('btn-toggle-wireframe');
    if (btnWireframe) {
      btnWireframe.addEventListener('click', () => {
        if (this.viewer3D) {
          const state = this.viewer3D.toggleWireframe();
          btnWireframe.classList.toggle('active', state);
        }
      });
    }

    const btnJetting = document.getElementById('btn-toggle-jetting');
    if (btnJetting) {
      btnJetting.addEventListener('click', () => {
        if (this.viewer3D) {
          const state = this.viewer3D.toggleJetting();
          btnJetting.classList.toggle('active', state);
        }
      });
    }

    const btnNight = document.getElementById('btn-toggle-night');
    if (btnNight) {
      btnNight.addEventListener('click', () => {
        if (this.viewer3D) {
          const state = this.viewer3D.toggleTankLighting();
          btnNight.classList.toggle('active', state);
        }
      });
    }

    const btnReset = document.getElementById('btn-reset-view');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (this.viewer3D) {
          this.viewer3D.resetView();
        }
      });
    }

    const btnFull = document.getElementById('btn-fullscreen');
    if (btnFull) {
      btnFull.addEventListener('click', () => {
        const box = document.getElementById('viewer-3d-box');
        if (!document.fullscreenElement) {
          box.requestFullscreen().catch(err => console.log(err));
        } else {
          document.exitFullscreen();
        }
      });
    }
  }

  highlightFeature(item) {
    const banner = document.getElementById('hotspot-active-banner');
    if (banner) {
      banner.innerHTML = `
        <div class="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
          <span class="w-2.5 h-2.5 rounded-full bg-[#7CAD3E] animate-pulse"></span>
          <span>${item.label}</span>: <span class="text-[#AFCAE2] font-normal">${item.desc}</span>
        </div>
      `;
      banner.classList.remove('hidden');
      setTimeout(() => {
        banner.classList.add('hidden');
      }, 5000);
    }
  }

  // ------------------------------------------
  // LIGHTBOX MODAL
  // ------------------------------------------
  setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeLightbox());
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeLightbox();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeLightbox();
    });
  }

  static openLightbox(url, caption) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-image');
    const cap = document.getElementById('lightbox-caption');

    if (modal && img && cap) {
      img.src = url;
      cap.textContent = caption || 'Arham Oil Robot Field Operations';
      modal.classList.add('open');
    }
  }

  closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('open');
    }
  }

  // ------------------------------------------
  // TANK CLEANING ROI & DOWNTIME CALCULATOR
  // ------------------------------------------
  setupCalculator() {
    const diameterInput = document.getElementById('calc-diameter');
    const heightInput = document.getElementById('calc-sludge');
    const oilValInput = document.getElementById('calc-oil-val');

    if (!diameterInput || !heightInput) return;

    const calculate = () => {
      const diameter = parseFloat(diameterInput.value) || 30;
      const sludgeDepth = parseFloat(heightInput.value) || 0.8;
      const oilPricePerBbl = parseFloat(oilValInput ? oilValInput.value : 75) || 75;

      const radius = diameter / 2;
      const sludgeVolume = Math.round(Math.PI * Math.pow(radius, 2) * sludgeDepth);
      
      const manualDays = Math.max(10, Math.round(sludgeVolume / 45));
      const roboticDays = Math.max(3, Math.round(sludgeVolume / 180));
      const daysSaved = manualDays - roboticDays;

      const recoveredBarrels = Math.round(sludgeVolume * 0.45 * 6.29); 
      const recoveredValue = Math.round(recoveredBarrels * oilPricePerBbl);

      document.getElementById('val-diameter').textContent = `${diameter} m`;
      document.getElementById('val-sludge').textContent = `${sludgeDepth.toFixed(1)} m`;
      
      document.getElementById('res-sludge-vol').textContent = `${sludgeVolume.toLocaleString()} m³`;
      document.getElementById('res-downtime-saved').textContent = `${daysSaved} Days Saved`;
      document.getElementById('res-oil-recovered').textContent = `${recoveredBarrels.toLocaleString()} bbl`;
      document.getElementById('res-dollar-saved').textContent = `$${recoveredValue.toLocaleString()}`;
    };

    diameterInput.addEventListener('input', calculate);
    heightInput.addEventListener('input', calculate);
    if (oilValInput) oilValInput.addEventListener('input', calculate);

    calculate();
  }

  // ------------------------------------------
  // NAVIGATION & MODALS
  // ------------------------------------------
  setupNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('mobile-drawer-close');

    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
      });
    }

    if (drawerClose && mobileDrawer) {
      drawerClose.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    }

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileDrawer) mobileDrawer.classList.add('hidden');
      });
    });
  }


  setupFullSpecsModal() {
    const openBtn = document.getElementById('btn-open-full-specs');
    const modal = document.getElementById('full-specs-modal');
    const closeBtn = document.getElementById('modal-specs-close');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        this.renderModalSpecs();
        modal.classList.remove('hidden');
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }

    // Modal Subtabs Trigger
    const subtabs = modal ? modal.querySelectorAll('.spec-subtab-trigger') : [];
    subtabs.forEach((st) => {
      st.addEventListener('click', () => {
        const tabKey = st.getAttribute('data-subtab');
        if (tabKey) {
          this.currentSubtab = tabKey;
          subtabs.forEach((s) => s.classList.remove('active'));
          st.classList.add('active');
          this.renderModalSpecs();
        }
      });
    });
  }

  renderModalSpecs() {
    const data = ROBOTS_DATA[this.currentRobot];
    if (!data) return;

    document.getElementById('modal-robot-title').textContent = `${data.name} Specifications`;
    document.getElementById('modal-robot-tagline').textContent = data.tagline;

    const modalContent = document.getElementById('modal-specs-content');
    if (!modalContent) return;

    if (this.currentSubtab === 'features') {
      modalContent.innerHTML = `
        <div class="space-y-4">
          <div>
            <h5 class="text-xs font-mono uppercase tracking-wider text-[#7CAD3E] font-bold mb-3">Specialized Capabilities</h5>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${data.features.map(f => `
                <li class="flex items-start gap-2.5 text-xs text-[#334155] p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <i data-lucide="check-circle" class="w-4 h-4 text-[#7CAD3E] flex-shrink-0 mt-0.5"></i>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div>
            <h5 class="text-xs font-mono uppercase tracking-wider text-[#7CAD3E] font-bold mt-4 mb-3">Target Applications</h5>
            <div class="flex flex-wrap gap-2">
              ${data.applications.map(a => `
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A]">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-[#7CAD3E]"></i>
                  ${a}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else {
      const items = data.subtabs[this.currentSubtab] || data.subtabs['dimensions'] || [];
      modalContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          ${items.map(it => `
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
              <span class="text-[10px] text-[#64748B] uppercase font-mono tracking-wider font-semibold">${it.key}</span>
              <span class="text-[#0F172A] font-bold text-sm mt-1">${it.val}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setupBrochureModal() {
    const btnRequest = document.querySelectorAll('.btn-request-brochure');
    const modal = document.getElementById('brochure-modal');
    const closeBtn = document.getElementById('brochure-modal-close');
    const form = document.getElementById('brochure-form');

    btnRequest.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) modal.classList.add('open');
      });
    });

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const successBox = document.getElementById('brochure-form-success');
        if (successBox) {
          form.classList.add('hidden');
          successBox.classList.remove('hidden');
          setTimeout(() => {
            modal.classList.remove('open');
            form.classList.remove('hidden');
            successBox.classList.add('hidden');
            form.reset();
          }, 4000);
        }
      });
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.ArhamApp = new ArhamApp();
});


// ------------------------------------------
// PREMIUM ANIMATIONS SETUP
// ------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-up, .reveal-blur');

  // Force all reveal elements to be visible immediately so content is NEVER blank
  document.querySelectorAll('.reveal-up, .reveal-blur, .stagger-table-row').forEach(el => {
    el.classList.add('is-visible');
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.filter = 'none';
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Parallax Effect for Images
  const parallaxImages = document.querySelectorAll('.parallax-img');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        parallaxImages.forEach(img => {
          const speed = img.dataset.parallaxSpeed || 0.15;
          const yPos = -(scrolled * speed);
          img.style.transform = `translateY(${yPos}px) scale(1.05)`; // scale slightly to avoid borders showing
        });
      });
    }, { passive: true });
  }
});


// ------------------------------------------
// GSAP & ADVANCED CINEMATIC INTERACTIONS
// ------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // 1. Dynamic Header Scroll Shrink
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled-nav');
    } else {
      header?.classList.remove('scrolled-nav');
    }
  }, { passive: true });

  // 2. GSAP Animations Integration
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entrance Animation
    gsap.from('#hero h1', {
      duration: 1.2,
      y: 40,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.from('#hero .parallax-img', {
      duration: 2,
      scale: 1.2,
      opacity: 0,
      ease: 'power2.out'
    });


  }

  // 3. 3D Tilt Card Interaction
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  }

  // 4. Magnetic Buttons Effect
  const magneticBtns = document.querySelectorAll('.btn-magnetic');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

});

  // 5. Ambient Cursor Follower Glow
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
      });
    }, { passive: true });
  }
