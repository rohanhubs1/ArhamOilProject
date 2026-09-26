/**
 * Arham Oil - 3D Interactive Robot Viewer
 * Engine: Three.js WebGL
 * Features: Procedural 3D robot models, OrbitControls, Camera Presets, 
 *           Animations (spinning augers, scanning LiDAR, hydraulic tracks, water jets), 
 *           Interactive 3D Hotspots, Wireframe Mode, Night/Tank lighting mode.
 */

class RobotViewer3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container #${containerId} not found`);
      return;
    }

    this.currentRobotId = 'mushaq';
    this.isAutoRotating = true;
    this.isWireframe = false;
    this.isJettingActive = true;
    this.isTankLighting = false;
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = new THREE.Clock();
    
    // Robot model groups
    this.robotGroups = {};
    this.currentGroup = null;
    
    // Animation targets
    this.animatableObjects = {
      augers: [],
      lidarTurret: null,
      lidarBeam: null,
      jetParticles: null,
      articulatedArm: null,
      cutterHead: null,
      tracks: []
    };
    
    // Hotspots
    this.hotspots = [];
    this.activeHotspotData = [];
    
    // Camera transition state
    this.cameraTransition = {
      active: false,
      startPos: new THREE.Vector3(),
      targetPos: new THREE.Vector3(),
      startLook: new THREE.Vector3(),
      targetLook: new THREE.Vector3(),
      progress: 0,
      duration: 1.0
    };

    this.init();
  }

  init() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0e2230);
    this.scene.fog = new THREE.FogExp2(0x0e2230, 0.05);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(3.5, 2.2, 3.8);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't clip below floor
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 10;
    this.controls.target.set(0, 0.35, 0);

    // 5. Lighting Setup
    this.setupLighting();

    // 6. Environment & Floor
    this.setupEnvironment();

    // 7. Build Procedural 3D Robot Models
    this.buildRobotModels();

    // 8. Particle System (Jetting spray)
    this.setupJetParticles();

    // 9. Hotspots Overlay
    this.setupHotspots();

    // 10. Event Listeners
    window.addEventListener('resize', () => this.onResize());

    // 11. Start Loop
    this.animate();
  }

  setupLighting() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(this.ambientLight);

    // Main Key Light
    this.dirLight1 = new THREE.DirectionalLight(0xfff5e6, 1.2);
    this.dirLight1.position.set(5, 8, 5);
    this.dirLight1.castShadow = true;
    this.dirLight1.shadow.mapSize.width = 2048;
    this.dirLight1.shadow.mapSize.height = 2048;
    this.dirLight1.shadow.camera.near = 0.5;
    this.dirLight1.shadow.camera.far = 25;
    this.dirLight1.shadow.bias = -0.0005;
    const d = 3.5;
    this.dirLight1.shadow.camera.left = -d;
    this.dirLight1.shadow.camera.right = d;
    this.dirLight1.shadow.camera.top = d;
    this.dirLight1.shadow.camera.bottom = -d;
    this.scene.add(this.dirLight1);

    // Fill Cool Light (Unibose Navy/Cyan Tint)
    this.dirLight2 = new THREE.DirectionalLight(0x7cad3e, 0.7);
    this.dirLight2.position.set(-6, 4, -4);
    this.scene.add(this.dirLight2);

    // Rim/Accent Light (Electric Cyan)
    this.dirLight3 = new THREE.DirectionalLight(0x38bdf8, 0.8);
    this.dirLight3.position.set(0, 5, -6);
    this.scene.add(this.dirLight3);
  }

  setupEnvironment() {
    // Technical Grid Floor (Unibose aesthetic)
    const gridHelper = new THREE.GridHelper(16, 32, 0x7cad3e, 0x1f3e54);
    gridHelper.position.y = 0.001;
    this.scene.add(gridHelper);

    // Floor Mesh for shadows & subtle reflection
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c1b26,
      roughness: 0.85,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Subtle Circular Ground Pedestal
    const ringGeo = new THREE.RingGeometry(1.4, 1.44, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x7cad3e, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.005;
    this.scene.add(ring);

    const outerRingGeo = new THREE.RingGeometry(2.1, 2.12, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = 0.004;
    this.scene.add(outerRing);
  }

  // ==========================================
  // BUILD PROCEDURAL HIGH-DETAIL 3D ROBOT MODELS
  // ==========================================
  buildRobotModels() {
    // Materials
    this.matChassisDark = new THREE.MeshStandardMaterial({
      color: 0x1e272e,
      roughness: 0.4,
      metalness: 0.85
    });

    this.matChassisYellow = new THREE.MeshStandardMaterial({
      color: 0xebb417, // Industrial safety yellow
      roughness: 0.35,
      metalness: 0.4
    });

    this.matChassisOrange = new THREE.MeshStandardMaterial({
      color: 0xe65c00, // Heavy duty orange for lagoon master
      roughness: 0.4,
      metalness: 0.35
    });

    this.matTracks = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.9,
      metalness: 0.2
    });

    this.matSteelChrome = new THREE.MeshStandardMaterial({
      color: 0xdcdde1,
      roughness: 0.15,
      metalness: 0.95
    });

    this.matBrassNozzle = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.9
    });

    this.matAugerSteel = new THREE.MeshStandardMaterial({
      color: 0x718093,
      roughness: 0.3,
      metalness: 0.85
    });

    this.matGlass = new THREE.MeshPhysicalMaterial({
      color: 0x173042,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      ior: 1.5
    });

    this.matLaserGreen = new THREE.MeshBasicMaterial({
      color: 0x7cad3e,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });

    this.matLedLight = new THREE.MeshBasicMaterial({
      color: 0xe0f2fe
    });

    // 1. Build Mushaq 2.0
    this.robotGroups['mushaq'] = this.createMushaqModel();
    this.scene.add(this.robotGroups['mushaq']);
    this.currentGroup = this.robotGroups['mushaq'];

    // 2. Build Lagoon & Sump Master
    this.robotGroups['lagoon'] = this.createLagoonModel();
    this.robotGroups['lagoon'].visible = false;
    this.scene.add(this.robotGroups['lagoon']);

    // 3. Build Hydro-Vac Crawler
    this.robotGroups['hydrovac'] = this.createHydroVacModel();
    this.robotGroups['hydrovac'].visible = false;
    this.scene.add(this.robotGroups['hydrovac']);
  }

  // ------------------------------------------
  // ROBOT 1: MUSHAQ 2.0 (Tank Cleaning Crawler)
  // Dimensions proportional to 30" x 20" x 8"
  // ------------------------------------------
  createMushaqModel() {
    const group = new THREE.Group();
    group.name = "mushaq";

    const length = 1.4; // 30"
    const width = 0.95; // 20"
    const height = 0.38; // 8"

    // 1. Main Central Chassis Body
    const bodyGeo = new THREE.BoxGeometry(length * 0.72, height, width * 0.65);
    const body = new THREE.Mesh(bodyGeo, this.matChassisDark);
    body.position.set(0, height * 0.75, 0);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Yellow Top Protective Cowling with chamfer
    const topCoverGeo = new THREE.BoxGeometry(length * 0.65, height * 0.28, width * 0.62);
    const topCover = new THREE.Mesh(topCoverGeo, this.matChassisYellow);
    topCover.position.set(0, height * 1.32, 0);
    topCover.castShadow = true;
    group.add(topCover);

    // Hazard Stripes plate on top
    const plateGeo = new THREE.PlaneGeometry(0.5, 0.2);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.rotation.x = -Math.PI / 2;
    plate.position.set(0, height * 1.47, 0);
    group.add(plate);

    // 2. Crawler Track Assemblies (Left & Right)
    const trackWidth = 0.18;
    const trackHeight = height * 0.85;
    const trackLen = length * 0.95;

    [-1, 1].forEach((side) => {
      const trackGroup = new THREE.Group();
      trackGroup.position.set(0, trackHeight * 0.5, side * (width * 0.5 - trackWidth * 0.5));

      // Main track side frame
      const frameGeo = new THREE.BoxGeometry(trackLen, trackHeight * 0.9, trackWidth * 0.8);
      const frame = new THREE.Mesh(frameGeo, this.matChassisDark);
      frame.castShadow = true;
      trackGroup.add(frame);

      // Sprockets / Wheels (3 large wheels per side)
      for (let i = -1; i <= 1; i++) {
        const wheelGeo = new THREE.CylinderGeometry(trackHeight * 0.38, trackHeight * 0.38, trackWidth, 24);
        const wheel = new THREE.Mesh(wheelGeo, this.matSteelChrome);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(i * (trackLen * 0.33), 0, 0);
        wheel.castShadow = true;
        trackGroup.add(wheel);

        // Center hub
        const hubGeo = new THREE.CylinderGeometry(trackHeight * 0.15, trackHeight * 0.15, trackWidth * 1.05, 16);
        const hub = new THREE.Mesh(hubGeo, this.matChassisYellow);
        hub.rotation.x = Math.PI / 2;
        hub.position.set(i * (trackLen * 0.33), 0, 0);
        trackGroup.add(hub);
      }

      // Outer Rubber Tread loop (Capsule-like track body)
      const treadGeo = new THREE.BoxGeometry(trackLen * 1.02, trackHeight * 0.98, trackWidth);
      const tread = new THREE.Mesh(treadGeo, this.matTracks);
      tread.castShadow = true;
      trackGroup.add(tread);

      // Mud guard arch
      const guardGeo = new THREE.BoxGeometry(trackLen * 1.05, 0.03, trackWidth * 1.15);
      const guard = new THREE.Mesh(guardGeo, this.matChassisYellow);
      guard.position.set(0, trackHeight * 0.55, 0);
      guard.castShadow = true;
      trackGroup.add(guard);

      group.add(trackGroup);
      this.animatableObjects.tracks.push(trackGroup);
    });

    // 3. Front Dual Auger Screw Cutters (The distinctive sludge churning drill)
    const augerLen = width * 0.38;
    const augerRadius = 0.09;
    const augerZOffsets = [-width * 0.22, width * 0.22];

    augerZOffsets.forEach((zOff) => {
      const augerGroup = new THREE.Group();
      augerGroup.position.set(length * 0.42, height * 0.45, zOff);

      // Central core shaft
      const shaftGeo = new THREE.CylinderGeometry(0.025, 0.025, augerLen, 16);
      const shaft = new THREE.Mesh(shaftGeo, this.matSteelChrome);
      shaft.rotation.x = Math.PI / 2;
      shaft.castShadow = true;
      augerGroup.add(shaft);

      // Helical spiral flighting (procedural spiral segments)
      const spiralSegments = 16;
      for (let s = 0; s < spiralSegments; s++) {
        const angle = (s / spiralSegments) * Math.PI * 4;
        const bladeGeo = new THREE.BoxGeometry(0.02, augerRadius * 1.8, 0.035);
        const blade = new THREE.Mesh(bladeGeo, this.matAugerSteel);
        blade.position.z = (s / spiralSegments - 0.5) * augerLen * 0.9;
        blade.rotation.z = angle;
        blade.castShadow = true;
        augerGroup.add(blade);
      }

      // End bearing bracket
      const bracketGeo = new THREE.BoxGeometry(0.04, 0.16, 0.03);
      const bracket = new THREE.Mesh(bracketGeo, this.matChassisDark);
      bracket.position.z = zOff > 0 ? augerLen * 0.52 : -augerLen * 0.52;
      group.add(bracket);

      group.add(augerGroup);
      this.animatableObjects.augers.push(augerGroup);
    });

    // Central Sludge Intake Throat (Vacuum mouth behind augers)
    const intakeGeo = new THREE.BoxGeometry(0.18, 0.14, width * 0.5);
    const intake = new THREE.Mesh(intakeGeo, this.matChassisDark);
    intake.position.set(length * 0.32, height * 0.4, 0);
    group.add(intake);

    // 4. Upper Jetting Manifold (1 to 50 bar AdaptiveJet™)
    const manifoldGeo = new THREE.CylinderGeometry(0.02, 0.02, width * 0.55, 16);
    const manifold = new THREE.Mesh(manifoldGeo, this.matSteelChrome);
    manifold.rotation.x = Math.PI / 2;
    manifold.position.set(length * 0.38, height * 1.05, 0);
    manifold.castShadow = true;
    group.add(manifold);

    // 4 Brass Jetting Nozzles on Upper Bar (angled forward and slightly up)
    for (let n = -2; n <= 2; n++) {
      if (n === 0) continue;
      const nozzleGeo = new THREE.ConeGeometry(0.022, 0.06, 12);
      const nozzle = new THREE.Mesh(nozzleGeo, this.matBrassNozzle);
      nozzle.rotation.z = -Math.PI / 2 - 0.15; // Point forward & slightly up
      nozzle.position.set(length * 0.41, height * 1.05, n * 0.08);
      nozzle.castShadow = true;
      group.add(nozzle);
    }

    // Lower Floor Washing Nozzles (Pointing directly down at tank floor)
    for (let ln = -2; ln <= 2; ln++) {
      const lowNozzleGeo = new THREE.CylinderGeometry(0.012, 0.015, 0.04, 8);
      const lowNozzle = new THREE.Mesh(lowNozzleGeo, this.matBrassNozzle);
      lowNozzle.position.set(length * 0.25, height * 0.2, ln * 0.09);
      group.add(lowNozzle);
    }

    // 5. 360° LiDAR Scanner Dome on Top
    const lidarBaseGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.05, 24);
    const lidarBase = new THREE.Mesh(lidarBaseGeo, this.matChassisDark);
    lidarBase.position.set(0, height * 1.5, 0);
    group.add(lidarBase);

    const lidarTurretGroup = new THREE.Group();
    lidarTurretGroup.position.set(0, height * 1.55, 0);

    const turretInnerGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.06, 16);
    const turretInner = new THREE.Mesh(turretInnerGeo, this.matSteelChrome);
    lidarTurretGroup.add(turretInner);

    // Optics lens
    const lensGeo = new THREE.BoxGeometry(0.02, 0.03, 0.02);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x7cad3e });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.set(0.06, 0, 0);
    lidarTurretGroup.add(lens);

    group.add(lidarTurretGroup);
    this.animatableObjects.lidarTurret = lidarTurretGroup;

    // Transparent Glass Dome Cover
    const domeGeo = new THREE.SphereGeometry(0.085, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeo, this.matGlass);
    dome.position.set(0, height * 1.52, 0);
    group.add(dome);

    // Laser Fan Beam (Visual scanning effect)
    const beamGeo = new THREE.ConeGeometry(1.8, 2.5, 16, 1, true, 0, 0.5);
    const beam = new THREE.Mesh(beamGeo, this.matLaserGreen);
    beam.rotation.z = Math.PI / 2;
    beam.rotation.x = -Math.PI / 2;
    beam.position.set(1.2, height * 1.55, 0);
    lidarTurretGroup.add(beam);
    this.animatableObjects.lidarBeam = beam;

    // 6. Dual Explosion-Proof Forward LED Floodlights
    [-0.22, 0.22].forEach((zPos) => {
      const lightHousingGeo = new THREE.CylinderGeometry(0.045, 0.05, 0.07, 16);
      const lightHousing = new THREE.Mesh(lightHousingGeo, this.matSteelChrome);
      lightHousing.rotation.z = Math.PI / 2;
      lightHousing.position.set(length * 0.36, height * 0.88, zPos);
      lightHousing.castShadow = true;
      group.add(lightHousing);

      const bulbGeo = new THREE.CircleGeometry(0.04, 16);
      const bulb = new THREE.Mesh(bulbGeo, this.matLedLight);
      bulb.rotation.y = Math.PI / 2;
      bulb.position.set(length * 0.396, height * 0.88, zPos);
      group.add(bulb);

      // Light Volumetric Glow Cone
      const coneGeo = new THREE.ConeGeometry(0.35, 1.2, 16, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0xe0f2fe,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.rotation.z = -Math.PI / 2;
      cone.position.set(length * 0.39 + 0.6, height * 0.88, zPos);
      group.add(cone);
    });

    // 7. Rear Umbilical & Hydraulic Gland
    const glandGeo = new THREE.CylinderGeometry(0.065, 0.075, 0.14, 16);
    const gland = new THREE.Mesh(glandGeo, this.matSteelChrome);
    gland.rotation.z = Math.PI / 2;
    gland.position.set(-length * 0.39, height * 0.75, 0);
    group.add(gland);

    // Flexible Umbilical Hose curve
    const hoseCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-length * 0.46, height * 0.75, 0),
      new THREE.Vector3(-length * 0.65, height * 0.85, 0.08),
      new THREE.Vector3(-length * 0.95, height * 0.45, 0.18),
      new THREE.Vector3(-length * 1.35, 0.05, 0.35)
    ]);
    const hoseGeo = new THREE.TubeGeometry(hoseCurve, 32, 0.038, 12, false);
    const hoseMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 });
    const hose = new THREE.Mesh(hoseGeo, hoseMat);
    hose.castShadow = true;
    group.add(hose);

    return group;
  }

  // ----------------------------------------------------
  // ROBOT 2: LAGOON & SUMP MASTER (Articulated Arm Dredger)
  // For open lagoons, sludge pits, 25mm solid handling
  // ----------------------------------------------------
  createLagoonModel() {
    const group = new THREE.Group();
    group.name = "lagoon";

    const length = 1.7;
    const width = 1.15;
    const height = 0.55;

    // 1. Heavy Pontoon Swamp Tracks
    const trackWidth = 0.26;
    [-1, 1].forEach((side) => {
      const trackGroup = new THREE.Group();
      trackGroup.position.set(0, height * 0.45, side * (width * 0.5 - trackWidth * 0.5));

      const frameGeo = new THREE.BoxGeometry(length * 0.95, height * 0.85, trackWidth);
      const frame = new THREE.Mesh(frameGeo, this.matTracks);
      frame.castShadow = true;
      trackGroup.add(frame);

      // Big sprockets
      for (let i = -1.2; i <= 1.2; i += 0.8) {
        const wheelGeo = new THREE.CylinderGeometry(height * 0.35, height * 0.35, trackWidth * 1.05, 20);
        const wheel = new THREE.Mesh(wheelGeo, this.matChassisDark);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(i * 0.45, 0, 0);
        trackGroup.add(wheel);
      }

      // Pontoon Flotation Cover
      const pontoonGeo = new THREE.BoxGeometry(length * 1.02, height * 0.35, trackWidth * 1.12);
      const pontoon = new THREE.Mesh(pontoonGeo, this.matChassisOrange);
      pontoon.position.set(0, height * 0.45, 0);
      pontoon.castShadow = true;
      trackGroup.add(pontoon);

      group.add(trackGroup);
    });

    // 2. Central Platform Base
    const baseGeo = new THREE.BoxGeometry(length * 0.75, height * 0.45, width * 0.55);
    const base = new THREE.Mesh(baseGeo, this.matChassisDark);
    base.position.set(-0.05, height * 0.65, 0);
    base.castShadow = true;
    group.add(base);

    // Rear Hydraulic Power Enclosure
    const powerBoxGeo = new THREE.BoxGeometry(0.55, 0.45, width * 0.52);
    const powerBox = new THREE.Mesh(powerBoxGeo, this.matChassisOrange);
    powerBox.position.set(-length * 0.28, height * 0.95, 0);
    powerBox.castShadow = true;
    group.add(powerBox);

    // Cooling vent grilles
    for (let g = -0.15; g <= 0.15; g += 0.08) {
      const ventGeo = new THREE.BoxGeometry(0.4, 0.02, 0.02);
      const vent = new THREE.Mesh(ventGeo, this.matSteelChrome);
      vent.position.set(-length * 0.28, height * 0.95 + g, width * 0.265);
      group.add(vent);
    }

    // 3. Slewing Ring Turret (Rotating Arm Base)
    const turretGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.12, 24);
    const turret = new THREE.Mesh(turretGeo, this.matChassisDark);
    turret.position.set(length * 0.15, height * 0.95, 0);
    turret.castShadow = true;
    group.add(turret);

    // 4. Articulated Hydraulic Boom (Arm)
    const armGroup = new THREE.Group();
    armGroup.position.set(length * 0.15, height * 1.02, 0);

    // Main Boom (First segment)
    const boomLen = 0.85;
    const boomGeo = new THREE.BoxGeometry(boomLen, 0.12, 0.12);
    const boom = new THREE.Mesh(boomGeo, this.matChassisOrange);
    boom.position.set(boomLen * 0.4, 0.25, 0);
    boom.rotation.z = Math.PI / 6; // Angled up
    boom.castShadow = true;
    armGroup.add(boom);

    // Hydraulic cylinder on Boom
    const cylGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 12);
    const cyl = new THREE.Mesh(cylGeo, this.matSteelChrome);
    cyl.rotation.z = Math.PI / 4;
    cyl.position.set(boomLen * 0.25, 0.12, 0.08);
    armGroup.add(cyl);

    // Second Segment (Stick)
    const stickGroup = new THREE.Group();
    stickGroup.position.set(boomLen * 0.75, 0.5, 0);

    const stickLen = 0.75;
    const stickGeo = new THREE.BoxGeometry(stickLen, 0.1, 0.1);
    const stick = new THREE.Mesh(stickGeo, this.matChassisDark);
    stick.position.set(stickLen * 0.4, -0.2, 0);
    stick.rotation.z = -Math.PI / 5; // Angled down
    stick.castShadow = true;
    stickGroup.add(stick);

    // Tool Head: Submersible Slurry Pump & Cutter
    const toolGroup = new THREE.Group();
    toolGroup.position.set(stickLen * 0.85, -0.45, 0);

    // Slurry pump casing
    const pumpGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.25, 20);
    const pump = new THREE.Mesh(pumpGeo, this.matChassisDark);
    pump.castShadow = true;
    toolGroup.add(pump);

    // 25mm Solids Discharge Pipe
    const pipeGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.35, 16);
    const pipe = new THREE.Mesh(pipeGeo, this.matSteelChrome);
    pipe.rotation.z = Math.PI / 3;
    pipe.position.set(0.12, 0.12, 0);
    toolGroup.add(pipe);

    // Mechanical Vortex Cutter / Agitator Head (Spinning blades)
    const cutterGroup = new THREE.Group();
    cutterGroup.position.set(0, -0.16, 0);

    const cutterCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.06, 12), this.matAugerSteel);
    cutterGroup.add(cutterCenter);

    for (let c = 0; c < 4; c++) {
      const bladeGeo = new THREE.BoxGeometry(0.18, 0.04, 0.015);
      const blade = new THREE.Mesh(bladeGeo, this.matSteelChrome);
      blade.rotation.y = (c / 4) * Math.PI * 2;
      cutterGroup.add(blade);
    }
    toolGroup.add(cutterGroup);
    this.animatableObjects.cutterHead = cutterGroup;

    stickGroup.add(toolGroup);
    armGroup.add(stickGroup);
    group.add(armGroup);
    this.animatableObjects.articulatedArm = armGroup;

    return group;
  }

  // ----------------------------------------------------
  // ROBOT 3: HYDRO-VAC CRAWLER (High-Flow Hydrocarbon Vacuum)
  // For crude oil tanks, chemical vessels, 4K inspection
  // ----------------------------------------------------
  createHydroVacModel() {
    const group = new THREE.Group();
    group.name = "hydrovac";

    const length = 1.5;
    const width = 1.05;
    const height = 0.42;

    // 1. Ultra-Low Ground Pressure Chassis
    const chassisGeo = new THREE.BoxGeometry(length * 0.78, height * 0.7, width * 0.65);
    const chassis = new THREE.Mesh(chassisGeo, this.matChassisDark);
    chassis.position.set(0, height * 0.6, 0);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    group.add(chassis);

    // Sleek Upper Metallic Blue Fairing (Unibose Navy)
    const fairingGeo = new THREE.BoxGeometry(length * 0.68, height * 0.35, width * 0.62);
    const fairingMat = new THREE.MeshStandardMaterial({
      color: 0x173042,
      roughness: 0.25,
      metalness: 0.8
    });
    const fairing = new THREE.Mesh(fairingGeo, fairingMat);
    fairing.position.set(0, height * 1.05, 0);
    fairing.castShadow = true;
    group.add(fairing);

    // Electric Cyan Strip Accent
    const stripGeo = new THREE.BoxGeometry(length * 0.7, 0.025, width * 0.64);
    const stripMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const strip = new THREE.Mesh(stripGeo, stripMat);
    strip.position.set(0, height * 0.88, 0);
    group.add(strip);

    // 2. High-Traction Enclosed Track Modules
    [-1, 1].forEach((side) => {
      const trackGroup = new THREE.Group();
      trackGroup.position.set(0, height * 0.45, side * (width * 0.5 - 0.1));

      const frameGeo = new THREE.BoxGeometry(length * 0.9, height * 0.8, 0.2);
      const frame = new THREE.Mesh(frameGeo, this.matTracks);
      frame.castShadow = true;
      trackGroup.add(frame);

      group.add(trackGroup);
    });

    // 3. Front Wide-Sweep Vacuum Pickup Hood
    const hoodGeo = new THREE.BoxGeometry(0.3, height * 0.5, width * 0.85);
    const hood = new THREE.Mesh(hoodGeo, this.matSteelChrome);
    hood.position.set(length * 0.46, height * 0.38, 0);
    hood.castShadow = true;
    group.add(hood);

    // Suction intake slot underneath
    const slotGeo = new THREE.BoxGeometry(0.15, 0.04, width * 0.75);
    const slotMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const slot = new THREE.Mesh(slotGeo, slotMat);
    slot.position.set(length * 0.48, height * 0.15, 0);
    group.add(slot);

    // 4. Ultrasonic Thickness (UT) Non-Destructive Testing Sensor Probe Array
    for (let u = -2; u <= 2; u++) {
      const probeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.08, 12);
      const probe = new THREE.Mesh(probeGeo, this.matBrassNozzle);
      probe.position.set(length * 0.22, height * 0.2, u * 0.12);
      group.add(probe);
    }

    // 5. 4K PTZ Inspection Camera Turret on Mast
    const mastGeo = new THREE.CylinderGeometry(0.03, 0.035, 0.45, 16);
    const mast = new THREE.Mesh(mastGeo, this.matSteelChrome);
    mast.position.set(-length * 0.15, height * 1.45, 0);
    mast.castShadow = true;
    group.add(mast);

    // PTZ Camera Pod
    const camPodGeo = new THREE.SphereGeometry(0.08, 20, 16);
    const camPod = new THREE.Mesh(camPodGeo, this.matChassisDark);
    camPod.position.set(-length * 0.15, height * 1.7, 0);
    camPod.castShadow = true;
    group.add(camPod);

    // Dual 4K Inspection Floodlights
    [-0.12, 0.12].forEach((zOff) => {
      const ptzLight = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.05, 12), this.matSteelChrome);
      ptzLight.rotation.z = Math.PI / 2;
      ptzLight.position.set(-length * 0.15 + 0.04, height * 1.7, zOff);
      group.add(ptzLight);
    });

    // 6. Rear Closed-Loop Hydrocarbon Vapor Return Flange
    const flangeGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.06, 20);
    const flange = new THREE.Mesh(flangeGeo, this.matChassisYellow);
    flange.rotation.z = Math.PI / 2;
    flange.position.set(-length * 0.42, height * 0.65, 0);
    group.add(flange);

    return group;
  }

  // ==========================================
  // WATER JETTING & MIST PARTICLE SYSTEM
  // ==========================================
  setupJetParticles() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      // Start from nozzle positions
      positions[i * 3] = 0.55 + (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 1] = 0.4 + (Math.random() - 0.5) * 0.08;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.35;

      velocities.push({
        x: 1.5 + Math.random() * 2.0,
        y: -0.15 - Math.random() * 0.3,
        z: (Math.random() - 0.5) * 0.4,
        life: Math.random()
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    this.jetParticles = new THREE.Points(geometry, material);
    this.jetVelocities = velocities;
    this.scene.add(this.jetParticles);
  }

  updateJetParticles(delta) {
    if (!this.jetParticles || !this.isJettingActive) {
      if (this.jetParticles) this.jetParticles.visible = false;
      return;
    }
    this.jetParticles.visible = true;

    const positions = this.jetParticles.geometry.attributes.position.array;
    const count = this.jetVelocities.length;

    for (let i = 0; i < count; i++) {
      const v = this.jetVelocities[i];
      v.life += delta * 2.5;

      if (v.life > 1.0) {
        // Reset to nozzle mouth
        positions[i * 3] = 0.55;
        positions[i * 3 + 1] = 0.4;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
        v.life = 0;
      } else {
        positions[i * 3] += v.x * delta;
        positions[i * 3 + 1] += v.y * delta;
        positions[i * 3 + 2] += v.z * delta;
      }
    }
    this.jetParticles.geometry.attributes.position.needsUpdate = true;
  }

  // ==========================================
  // INTERACTIVE 3D HOTSPOT SYSTEM
  // ==========================================
  setupHotspots() {
    this.hotspotDataByRobot = {
      mushaq: [
        { id: 'lidar', label: '360° LiDAR & SLAM', desc: 'Real-time 3D point cloud mapping & hazard obstacle avoidance', pos: new THREE.Vector3(0, 0.68, 0) },
        { id: 'auger', label: 'Dual Sludge Augers', desc: 'High-torque spiral cutters pulverize hardened bitumen mounts', pos: new THREE.Vector3(0.65, 0.22, 0.22) },
        { id: 'jet', label: 'AdaptiveJet™ (50 bar)', desc: 'Upper and lower high-pressure washing manifold', pos: new THREE.Vector3(0.55, 0.45, 0) },
        { id: 'track', label: 'ATEX Hydraulic Tracks', desc: 'Intrinsically safe Zone-0 high traction caterpillar crawler', pos: new THREE.Vector3(0, 0.2, 0.5) },
        { id: 'suction', label: 'Suction Slurry Port', desc: '5 to 20 m³/hr continuous high-viscosity sludge extraction', pos: new THREE.Vector3(-0.45, 0.3, 0) }
      ],
      lagoon: [
        { id: 'arm', label: '3-DOF Articulated Boom', desc: '2.8m hydraulic reach with 180° slewing radius', pos: new THREE.Vector3(0.5, 0.75, 0) },
        { id: 'cutter', label: '25mm Solids Cutter Head', desc: 'Vortex mechanical agitation cutter head for deep lagoon muck', pos: new THREE.Vector3(1.1, 0.15, 0) },
        { id: 'pontoon', label: 'Pontoon Tracks', desc: 'Amphibious buoyancy tracks for deep mud and marsh navigation', pos: new THREE.Vector3(0, 0.28, 0.58) },
        { id: 'power', label: 'Hydraulic Manifold', desc: '25 HP external power pack interface for continuous dredging', pos: new THREE.Vector3(-0.45, 0.55, 0) }
      ],
      hydrovac: [
        { id: 'hood', label: 'Vacuum Suction Hood', desc: 'Wide-sweep 35 m³/hr extraction with variable hydraulic skirt', pos: new THREE.Vector3(0.7, 0.22, 0) },
        { id: 'ut', label: 'UT Thickness Gauge', desc: 'Ultrasonic non-destructive plate thickness measurement in real-time', pos: new THREE.Vector3(0.3, 0.15, 0.25) },
        { id: 'ptz', label: '4K PTZ Inspection Mast', desc: 'High-CRI explosion-proof inspection camera with optical zoom', pos: new THREE.Vector3(-0.2, 0.8, 0) },
        { id: 'vapor', label: 'Vapor Return Flange', desc: 'Closed-loop hydrocarbon vapor recovery for zero emissions', pos: new THREE.Vector3(-0.6, 0.35, 0) }
      ]
    };

    this.hotspotsContainer = document.getElementById('hotspots-layer');
    this.updateActiveHotspots();
  }

  updateActiveHotspots() {
    if (!this.hotspotsContainer) return;
    this.hotspotsContainer.innerHTML = '';
    this.activeHotspotData = this.hotspotDataByRobot[this.currentRobotId] || [];

    this.activeHotspotData.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'hotspot-annotation';
      el.id = `hotspot-${item.id}`;
      el.innerHTML = `
        <div class="hotspot-pin">${idx + 1}</div>
        <div class="hotspot-content">
          <strong>${item.label}</strong>
        </div>
      `;

      el.addEventListener('click', () => {
        this.onHotspotClick(item);
      });

      this.hotspotsContainer.appendChild(el);
      item.domElement = el;
    });
  }

  updateHotspotPositions() {
    if (!this.activeHotspotData || !this.camera) return;

    const widthHalf = this.container.clientWidth / 2;
    const heightHalf = this.container.clientHeight / 2;

    this.activeHotspotData.forEach((item) => {
      if (!item.domElement) return;

      const wp = item.pos.clone();
      wp.project(this.camera);

      // Check if behind camera
      if (wp.z > 1) {
        item.domElement.style.opacity = '0';
        item.domElement.style.pointerEvents = 'none';
        return;
      }

      const x = wp.x * widthHalf + widthHalf;
      const y = -(wp.y * heightHalf) + heightHalf;

      item.domElement.style.left = `${x}px`;
      item.domElement.style.top = `${y}px`;
      item.domElement.style.opacity = '1';
      item.domElement.style.pointerEvents = 'auto';
    });
  }

  onHotspotClick(item) {
    // Focus camera slightly towards the hotspot
    const target = item.pos.clone().add(new THREE.Vector3(0.8, 0.4, 0.8));
    this.setCameraView(target, item.pos);

    // Highlight corresponding spec or feature in UI
    if (window.ArhamApp && typeof window.ArhamApp.highlightFeature === 'function') {
      window.ArhamApp.highlightFeature(item);
    }
  }

  // ==========================================
  // SWITCH ROBOT MODEL
  // ==========================================
  switchRobot(robotId) {
    if (this.currentRobotId === robotId) return;

    // Hide all
    Object.keys(this.robotGroups).forEach((id) => {
      this.robotGroups[id].visible = false;
    });

    if (this.robotGroups[robotId]) {
      this.robotGroups[robotId].visible = true;
      this.currentGroup = this.robotGroups[robotId];
      this.currentRobotId = robotId;
      this.updateActiveHotspots();

      // Reset camera to standard perspective
      this.setCameraPreset('iso');
    }
  }

  // ==========================================
  // CAMERA PRESETS & TRANSITIONS
  // ==========================================
  setCameraPreset(preset) {
    const presets = {
      iso: { pos: new THREE.Vector3(3.2, 2.0, 3.4), look: new THREE.Vector3(0, 0.35, 0) },
      front: { pos: new THREE.Vector3(3.8, 0.5, 0), look: new THREE.Vector3(0, 0.35, 0) },
      top: { pos: new THREE.Vector3(0.01, 4.5, 0.01), look: new THREE.Vector3(0, 0, 0) },
      side: { pos: new THREE.Vector3(0, 0.6, 3.8), look: new THREE.Vector3(0, 0.35, 0) }
    };

    const target = presets[preset] || presets.iso;
    this.setCameraView(target.pos, target.look);
  }

  setCameraView(targetPos, targetLook) {
    this.cameraTransition.startPos.copy(this.camera.position);
    this.cameraTransition.targetPos.copy(targetPos);
    this.cameraTransition.startLook.copy(this.controls.target);
    this.cameraTransition.targetLook.copy(targetLook);
    this.cameraTransition.progress = 0;
    this.cameraTransition.active = true;
  }

  updateCameraTransition(delta) {
    if (!this.cameraTransition.active) return;

    this.cameraTransition.progress += delta / this.cameraTransition.duration;
    const t = Math.min(this.cameraTransition.progress, 1);

    // Smooth cubic ease-in-out
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    this.camera.position.lerpVectors(this.cameraTransition.startPos, this.cameraTransition.targetPos, ease);
    this.controls.target.lerpVectors(this.cameraTransition.startLook, this.cameraTransition.targetLook, ease);

    if (t >= 1) {
      this.cameraTransition.active = false;
    }
  }

  // ==========================================
  // FEATURE TOGGLES
  // ==========================================
  toggleAutoRotate() {
    this.isAutoRotating = !this.isAutoRotating;
    this.controls.autoRotate = this.isAutoRotating;
    this.controls.autoRotateSpeed = 1.2;
    return this.isAutoRotating;
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    Object.values(this.robotGroups).forEach((group) => {
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => (m.wireframe = this.isWireframe));
          } else {
            child.material.wireframe = this.isWireframe;
          }
        }
      });
    });
    return this.isWireframe;
  }

  toggleJetting() {
    this.isJettingActive = !this.isJettingActive;
    return this.isJettingActive;
  }

  toggleTankLighting() {
    this.isTankLighting = !this.isTankLighting;
    if (this.isTankLighting) {
      // In-tank dark environment
      this.scene.background = new THREE.Color(0x050b10);
      this.scene.fog.color = new THREE.Color(0x050b10);
      this.ambientLight.intensity = 0.15;
      this.dirLight1.intensity = 0.25;
      this.dirLight2.intensity = 0.2;
      this.dirLight3.intensity = 0.3;
    } else {
      // Standard studio / showroom lighting
      this.scene.background = new THREE.Color(0x0e2230);
      this.scene.fog.color = new THREE.Color(0x0e2230);
      this.ambientLight.intensity = 0.65;
      this.dirLight1.intensity = 1.2;
      this.dirLight2.intensity = 0.7;
      this.dirLight3.intensity = 0.8;
    }
    return this.isTankLighting;
  }

  resetView() {
    this.setCameraPreset('iso');
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // ==========================================
  // MAIN ANIMATION LOOP
  // ==========================================
  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // 1. Controls & Transitions
    if (this.cameraTransition.active) {
      this.updateCameraTransition(delta);
    } else {
      this.controls.autoRotate = this.isAutoRotating;
      this.controls.autoRotateSpeed = 1.2;
    }
    this.controls.update();

    // 2. Animate Mushaq 2.0 Augers & LiDAR
    if (this.currentRobotId === 'mushaq') {
      // Spinning auger screws
      this.animatableObjects.augers.forEach((aug, idx) => {
        aug.rotation.x += delta * (idx % 2 === 0 ? 9 : -9);
      });

      // 360° spinning LiDAR turret
      if (this.animatableObjects.lidarTurret) {
        this.animatableObjects.lidarTurret.rotation.y += delta * 6.0;
      }
    }

    // 3. Animate Lagoon Master Articulated Arm & Cutter
    if (this.currentRobotId === 'lagoon') {
      // Gentle sway of articulated arm
      if (this.animatableObjects.articulatedArm) {
        this.animatableObjects.articulatedArm.rotation.y = Math.sin(elapsed * 0.8) * 0.35;
      }
      // Spinning cutter head
      if (this.animatableObjects.cutterHead) {
        this.animatableObjects.cutterHead.rotation.y += delta * 12.0;
      }
    }

    // 4. Update Water Jetting Particles
    this.updateJetParticles(delta);

    // 5. Update 2D Hotspot Pins Position
    this.updateHotspotPositions();

    // 6. Render
    this.renderer.render(this.scene, this.camera);
  }
}

// Global hook for initialization
window.RobotViewer3D = RobotViewer3D;
