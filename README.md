# Arham Oil — Hazardous Space Robotics 3D Showcase

A modern, high-performance interactive web application presenting **Arham Oil's** industrial robotic fleet for non-man entry storage tank and lagoon cleaning.

---

## 🌟 Key Accomplishments

### 1. Design & Styling (Unibose Inspired)
- **Deep Slate / Nautical Navy Color System**: Modeled after [Unibose](https://www.unibose.com/) (`#173042`, `#0d1e2b`, `#1f3e54`, `#0c1b26`).
- **Signature Unibose Pill Badges & Buttons**: Rounded pill badges with pulsing green beacons (`#7CAD3E`), fine borders (`rgba(175, 202, 226, 0.15)`), magnetic hover interactions, and subtle glassmorphism backdrop filters.
- **Minimalist Industrial Typography**: Clean pairings with modern geometric sans-serif and technical monospaced accents (`Space Grotesk`).
- **Stat Counters & Metrics Strip**: Unibose-style milestone counters highlighting Zero Life Loss, 1,000,000+ m³ processed, and 40%–60% downtime reduction.

### 2. Official Arham Oil Brand Assets & Brochure Imagery
- **Official Brand Logo**: Downloaded directly from [Arham Oil](https://www.arhamoil.com/) (`assets/images/logo.jpg`).
- **Genuine Field Photos**: High-resolution operational photography showcasing real robots inside crude oil tanks and effluent lagoons:
  - `robot-cutout.webp`: Structural crawler anatomy
  - `robot-real-1.webp`: Safe remote operation outside tank manway
  - `robot-real-2.webp`: Robot inside crude oil tank breaking sludge mounts
  - `robot-real-3.webp`: Heavy-duty hydraulic umbilical and control tether
  - `robot-field-1.webp`: Refinery lagoon and sump desludging setup
  - `robot-field-2.webp`: Turnaround centrifuge and processing unit
  - `tank-cleaning-robots.webp` & `hydrocarbon-robots.webp`: Equipment deployment
- **Client Credibility Marquee**: Official corporate logos of IndianOil (IOCL), Bharat Petroleum (BPCL), Hindustan Petroleum (HPCL), Oil India Limited (OIL), Cairn Oil & Gas, and Vedanta.

### 3. Interactive 3D Robot Presentation & Specifications
Each robot is presented with an interactive **Three.js WebGL 3D Model** alongside its verified brochure specifications:

1. **MUSHAQ 2.0 (Flagship In-Tank Cleaning Crawler)**
   - **3D Features**: Proportional 30" x 20" x 8" crawler chassis, dual continuous caterpillar rubber tracks, spinning dual helical auger screw cutters, upper jetting manifold (1 to 50 bar) with animated water spray particles, lower floor washing nozzles, rotating 360° LiDAR turret with animated scanning laser cone, explosion-proof dual LED headlights with volumetric illumination beams, and rear armored umbilical gland.
   - **Brochure Specifications**:
     - Dimensions: `30 x 20 x 8 inches (762 x 508 x 203 mm)`
     - Hydraulic Power Pack: `15 HP Flameproof Unit`
     - Jetting Pressure: `1 to 50 bar (AdaptiveJet™ Control)`
     - Suction Volume: `5 to 20 m³/hr continuous extraction`
     - Operating Tether Range: `100 meters`
     - Certification: `ATEX Zone-0 (IIC T4) / IECEx Non-Man Entry`
     - Key Applications: Crude oil storage tanks, cooling tower basins, slop/distillates, OWS pits, pipeline desludging.

2. **LAGOON & SUMP MASTER (Articulated Arm Hydraulic Dredging Robot)**
   - **3D Features**: Heavy pontoon swamp track chassis for deep mud, 360° slewing ring turret, 3-DOF articulated hydraulic boom that gently sways, and a tool head featuring a submersible vortex slurry pump and high-speed mechanical agitator blades.
   - **Brochure Specifications**:
     - Solid Clearance: `Up to 25 mm free passage without clogging`
     - Flow Capacity: `Up to 45 m³/hr`
     - Articulated Reach: `2.8 meters hydraulic boom`
     - Power: `25 HP External Hydraulic Power Pack`
     - Applications: Effluent treatment ponds (ETP), CRWS/OWS pits, aeration basins, toxic lagoons.

3. **HYDRO-VAC CRAWLER (High-Flow Hydrocarbon Desludging & Inspection Robot)**
   - **3D Features**: Wide-sweep vacuum hood, magnetic hold-down tracks, ultrasonic thickness (UT) inspection sensor array, 4K PTZ camera mast with dual inspection floodlights, and closed-loop vapor return flange.
   - **Brochure Specifications**:
     - Vacuum Extraction: `Up to 35 m³/hr`
     - Washdown Pressure: `Up to 200 bar ultra-high pressure`
     - Inspection: `Real-time ultrasonic thickness (UT) gauging for API 653 compliance`
     - Turnaround Benefit: `Cuts cleaning downtime from 14 days down to 3–5 days`

---

## 🛠 Interactive 3D Controls
- **Orbit Controls**: Drag mouse / touch to rotate, scroll to zoom in/out, right-click to pan.
- **Camera Presets**: One-click camera switches (`ISO`, `FRONT`, `TOP`, `SIDE`) with smooth cubic ease-in-out transitions.
- **Interactive 3D Hotspots**: Clickable 3D pins placed directly on robot components (e.g., LiDAR, Augers, Jetting Nozzles, Tracks) that spotlight the component and trigger technical descriptions.
- **Structural Wireframe / X-Ray Mode**: Toggle between realistic PBR metallic materials and structural wireframe.
- **Jetting Particle Simulation**: Toggle real-time animated water spray mist.
- **Night / Dark Tank Mode**: Switch between showroom studio lighting and dark in-tank inspection mode illuminated solely by the robot's onboard LED headlights.

---

## 🧮 Additional Value-Add Features
- **Tank Cleaning Turnaround & ROI Calculator**: Adjust tank diameter (10m–80m) and sludge depth (0.2m–2.5m) to see real-time estimates for sludge volume, days saved, barrels of oil recovered, and financial value.
- **Engineering Comparison Matrix**: Side-by-side technical benchmark between manual confined-space entry and Arham Oil robotics.
- **Responsive Photo Lightbox**: Click any gallery photo to view in high definition.
- **Technical Brochure Download Modal**: Complete lead capture modal for requesting engineering CAD sheets and case studies.

---

## 🚀 How to Run Locally

The application is completely self-contained with all local vendor files (`three.min.js`, `OrbitControls.js`, `lucide.min.js`) and downloaded assets.

```bash
# In the project directory:
python -m http.server 8080
```
Open your browser at:
`http://localhost:8080/index.html`
