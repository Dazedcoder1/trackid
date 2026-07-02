import os

# --- PHASE 0 TOKENS ---
COLORS = {
    "bg": "#FAFAFA",
    "stone": "#E5E5E5",
    "stone_dark": "#A3A3A3",
    "accent": "#0055FF", # Sapphire
    "gold": "#D4AF37",   # Fallback/Highlight
    "text": "#171717",
    "text_light": "#737373"
}

# --- SVG HELPER LIBRARY ---
class SVG:
    def __init__(self, width=800, height=600):
        self.w = width
        self.h = height
        self.elements = []
        
    def flow_box(self, x, y, w, h, text, role="neutral"):
        fill = COLORS["stone"] if role == "neutral" else COLORS["accent"] if role == "active" else COLORS["gold"]
        text_color = "#FFFFFF" if role in ["active", "gold"] else COLORS["text"]
        
        self.elements.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{fill}" stroke="{COLORS["stone_dark"]}" stroke-width="1"/>')
        
        # Simple text wrapping simulation
        lines = text.split(" | ")
        cy = y + (h / 2) - (len(lines) * 8) + 4
        for line in lines:
            self.elements.append(f'<text x="{x + w/2}" y="{cy}" font-family="sans-serif" font-size="12" fill="{text_color}" text-anchor="middle" dominant-baseline="middle">{line}</text>')
            cy += 16

    def arrow(self, x1, y1, x2, y2, label=""):
        self.elements.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{COLORS["stone_dark"]}" stroke-width="2" marker-end="url(#arrowhead)"/>')
        if label:
            mx, my = (x1+x2)/2, (y1+y2)/2
            self.elements.append(f'<rect x="{mx-15}" y="{my-10}" width="30" height="20" fill="{COLORS["bg"]}"/>')
            self.elements.append(f'<text x="{mx}" y="{my}" font-family="sans-serif" font-size="10" fill="{COLORS["text_light"]}" text-anchor="middle" dominant-baseline="middle">{label}</text>')

    def card(self, x, y, w, h, title, subtitle="", stroke_dash=False):
        dash = 'stroke-dasharray="4 4"' if stroke_dash else ''
        self.elements.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#FFFFFF" stroke="{COLORS["stone_dark"]}" stroke-width="1" {dash}/>')
        self.elements.append(f'<text x="{x+16}" y="{y+24}" font-family="sans-serif" font-weight="bold" font-size="14" fill="{COLORS["text"]}">{title}</text>')
        if subtitle:
            self.elements.append(f'<text x="{x+16}" y="{y+42}" font-family="sans-serif" font-size="11" fill="{COLORS["text_light"]}">{subtitle}</text>')

    def divider(self, x, y, w):
        self.elements.append(f'<line x1="{x}" y1="{y}" x2="{x+w}" y2="{y}" stroke="{COLORS["stone"]}" stroke-width="2"/>')

    def save(self, filename):
        defs = f'''
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="{COLORS["stone_dark"]}"/>
            </marker>
        </defs>
        '''
        svg_content = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" style="background-color:{COLORS["bg"]};">\n{defs}\n' + '\n'.join(self.elements) + '\n</svg>'
        
        # Saves directly to the current root directory
        with open(f"{filename}.svg", "w", encoding="utf-8") as f:
            f.write(svg_content)

# --- SECTION GENERATORS ---

def gen_01_hero():
    # Flow: Cursor Parallax & Auto-rotate
    s = SVG(800, 400)
    s.flow_box(50, 50, 140, 50, "Mount Canvas")
    s.flow_box(250, 50, 140, 50, "prefers-reduced-motion?")
    s.flow_box(500, 20, 140, 50, "Yes | Static Render", "gold")
    s.flow_box(500, 100, 140, 50, "No | Check Touch/Width")
    s.flow_box(500, 200, 140, 50, "Mobile | Auto-rotate only", "neutral")
    s.flow_box(500, 300, 140, 50, "Desktop | Auto-rotate | + Cursor Parallax", "active")
    
    s.arrow(190, 75, 250, 75)
    s.arrow(390, 60, 500, 45, "Yes")
    s.arrow(390, 90, 500, 125, "No")
    s.arrow(570, 150, 570, 200, "Yes")
    s.arrow(640, 125, 700, 125)
    s.arrow(700, 125, 700, 325)
    s.arrow(700, 325, 640, 325, "No")
    s.save("01_hero_flow")

    # Layout
    s = SVG(800, 400)
    s.card(50, 50, 700, 300, "Hero Viewport")
    s.elements.append(f'<text x="400" y="200" font-family="sans-serif" font-size="64" font-weight="bold" fill="{COLORS["stone"]}" text-anchor="middle" opacity="0.3">TrakID</text>')
    s.elements.append(f'<circle cx="400" cy="200" r="40" fill="{COLORS["accent"]}" opacity="0.8"/>')
    s.elements.append(f'<text x="400" y="310" font-family="sans-serif" font-size="14" fill="{COLORS["text_light"]}" text-anchor="middle">Scroll to explore</text>')
    s.elements.append(f'<rect x="700" y="70" width="30" height="30" rx="15" fill="{COLORS["stone"]}"/>') # Sound toggle
    s.save("01_hero_layout")

def gen_02_reveal():
    s = SVG(800, 400)
    s.flow_box(50, 150, 140, 50, "Scroll Position (0->1)")
    s.flow_box(250, 150, 140, 50, "GSAP scrub: true")
    s.flow_box(450, 50, 140, 50, "3D Renderer | Mesh Separation", "neutral")
    s.flow_box(450, 250, 140, 50, "2D Renderer | Layer Crossfade", "active")
    s.flow_box(650, 150, 120, 50, "Fade in Labels", "gold")
    s.arrow(190, 175, 250, 175)
    s.arrow(390, 160, 450, 75, "If 3D Asset")
    s.arrow(390, 190, 450, 275, "Current Asset")
    s.arrow(590, 75, 650, 160)
    s.arrow(590, 275, 650, 190)
    s.save("02_reveal_flow")

    s = SVG(800, 500)
    s.card(50, 50, 700, 400, "Pinned Scroll Viewport")
    s.elements.append(f'<circle cx="300" cy="250" r="30" fill="{COLORS["stone_dark"]}"/>') # Shell
    s.elements.append(f'<rect x="380" y="230" width="40" height="40" fill="{COLORS["gold"]}"/>') # PCB
    s.elements.append(f'<circle cx="500" cy="250" r="20" fill="{COLORS["accent"]}"/>') # Battery
    s.elements.append(f'<text x="300" y="300" font-family="sans-serif" font-size="12" text-anchor="middle">Shell</text>')
    s.elements.append(f'<text x="400" y="300" font-family="sans-serif" font-size="12" text-anchor="middle">PCB Core</text>')
    s.elements.append(f'<text x="500" y="300" font-family="sans-serif" font-size="12" text-anchor="middle">Power</text>')
    s.save("02_reveal_layout")

def gen_03_fork():
    s = SVG(800, 300)
    s.flow_box(50, 125, 140, 50, "User Clicks Card")
    s.flow_box(250, 125, 140, 50, "setTrackContext()")
    s.flow_box(450, 50, 140, 50, "Lenis scrollTo() | Institutional", "active")
    s.flow_box(450, 200, 140, 50, "Lenis scrollTo() | Families", "active")
    s.arrow(190, 150, 250, 150)
    s.arrow(390, 140, 450, 75)
    s.arrow(390, 160, 450, 225)
    s.save("03_fork_flow")

    s = SVG(800, 400)
    s.card(150, 100, 220, 250, "For Schools & Institutions", "Management & bulk tracking.")
    s.card(430, 100, 220, 250, "For Families", "Peace of mind & craftsmanship.")
    s.save("03_fork_layout")

def gen_04_05_data_driven(section, name, title, box_labels):
    s = SVG(800, 300)
    s.flow_box(50, 125, 140, 50, "copy.js Data Array")
    s.flow_box(250, 125, 140, 50, "React .map()")
    s.flow_box(450, 125, 160, 50, f"Render {title} Components", "active")
    s.flow_box(670, 125, 100, 50, "Framer fadeUp", "gold")
    s.arrow(190, 150, 250, 150)
    s.arrow(390, 150, 450, 150)
    s.arrow(610, 150, 670, 150)
    s.save(f"{section}_{name}_flow")

    s = SVG(800, 400)
    s.card(50, 50, 700, 300, f"{title} Layout", stroke_dash=True)
    start_x = 100
    for i, label in enumerate(box_labels):
        x_pos = start_x + (i % 4) * 150
        y_pos = 120 + (i // 4) * 100
        s.card(x_pos, y_pos, 130, 80, label)
    s.save(f"{section}_{name}_layout")

def gen_06_forms(section, name, track):
    s = SVG(800, 350)
    s.flow_box(50, 150, 120, 50, "formSchema.js")
    s.flow_box(220, 150, 120, 50, "handleChange(e)")
    s.flow_box(390, 150, 120, 50, "submitLead()", "active")
    s.flow_box(560, 50, 120, 50, "Validation Error", "gold")
    s.flow_box(560, 250, 120, 50, "Success Inline Msg", "neutral")
    s.arrow(170, 175, 220, 175)
    s.arrow(340, 175, 390, 175)
    s.arrow(450, 150, 560, 75, "Fail")
    s.arrow(450, 200, 560, 275, "Pass")
    s.save(f"{section}_{name}_flow")

    s = SVG(800, 400)
    s.card(200, 50, 400, 320, f"{track} Ask")
    s.elements.append(f'<rect x="230" y="100" width="340" height="40" rx="4" stroke="{COLORS["stone_dark"]}" fill="none"/>')
    s.elements.append(f'<rect x="230" y="160" width="340" height="40" rx="4" stroke="{COLORS["stone_dark"]}" fill="none"/>')
    if section == "06B":
        s.elements.append(f'<rect x="230" y="220" width="160" height="30" rx="15" stroke="{COLORS["accent"]}" fill="{COLORS["accent"]}" opacity="0.1"/>')
        s.elements.append(f'<rect x="410" y="220" width="160" height="30" rx="15" stroke="{COLORS["stone_dark"]}" fill="none"/>')
    s.elements.append(f'<rect x="230" y="280" width="340" height="50" rx="6" fill="{COLORS["text"]}"/>')
    s.elements.append(f'<text x="400" y="305" font-family="sans-serif" fill="#FFFFFF" text-anchor="middle">Submit</text>')
    s.save(f"{section}_{name}_layout")

def gen_05B_peace_of_mind():
    s = SVG(800, 300)
    s.flow_box(50, 50, 140, 50, "User Cursor Move")
    s.flow_box(50, 200, 140, 50, "Timer Interval")
    s.flow_box(250, 125, 140, 50, "State Machine")
    s.flow_box(500, 50, 140, 40, "Live Location", "active")
    s.flow_box(500, 130, 140, 40, "Safe Zone Reveal", "active")
    s.flow_box(500, 210, 140, 40, "SOS Triggered", "gold")
    s.arrow(190, 75, 250, 140)
    s.arrow(190, 225, 250, 160)
    s.arrow(390, 130, 500, 70)
    s.arrow(390, 150, 500, 150)
    s.arrow(390, 170, 500, 230)
    s.save("05B_peace_flow")

    s = SVG(800, 400)
    s.card(50, 50, 700, 300, "Stylized Map Container")
    s.elements.append(f'<circle cx="400" cy="200" r="120" fill="{COLORS["accent"]}" opacity="0.1"/>') # Safe zone
    s.elements.append(f'<circle cx="400" cy="200" r="120" stroke="{COLORS["accent"]}" stroke-dasharray="8 8" fill="none"/>') 
    s.elements.append(f'<circle cx="420" cy="180" r="8" fill="{COLORS["accent"]}"/>') # Pin
    s.elements.append(f'<circle cx="420" cy="180" r="24" fill="{COLORS["accent"]}" opacity="0.2"><animate attributeName="r" values="8;24;8" dur="2s" repeatCount="indefinite"/></circle>') 
    s.save("05B_peace_layout")

def gen_07_closing():
    s = SVG(800, 200)
    s.flow_box(50, 75, 140, 50, "Footer Link Data")
    s.flow_box(250, 75, 140, 50, "Static .map()")
    s.flow_box(450, 75, 140, 50, "Column Layout", "neutral")
    s.arrow(190, 100, 250, 100)
    s.arrow(390, 100, 450, 100)
    s.save("07_closing_flow")

    s = SVG(800, 300)
    s.card(50, 50, 700, 200, "Global Footer")
    s.elements.append(f'<text x="100" y="120" font-family="sans-serif" font-weight="bold" fill="{COLORS["text"]}">TrakID</text>')
    s.divider(250, 100, 1) # vertical line fake
    s.elements.append(f'<text x="300" y="120" font-family="sans-serif" fill="{COLORS["text_light"]}">Institutions</text>')
    s.elements.append(f'<text x="450" y="120" font-family="sans-serif" fill="{COLORS["text_light"]}">Families</text>')
    s.elements.append(f'<text x="600" y="120" font-family="sans-serif" fill="{COLORS["text_light"]}">Legal / Privacy</text>')
    s.save("07_closing_layout")

# Run Pipeline
if __name__ == "__main__":
    gen_01_hero()
    gen_02_reveal()
    gen_03_fork()
    gen_04_05_data_driven("04A", "compliance", "Static Typography & Stats", ["Stat 1", "Stat 2", "Quote"])
    gen_04_05_data_driven("05A", "engineering", "SpecGrid & Bio", ["GPS", "LTE", "IP67", "Battery"])
    gen_06_forms("06A", "institutional", "Institutional")
    gen_04_05_data_driven("04B", "anatomy", "PendantCard Gallery", ["Classic", "Sweetheart", "Owl", "Pathfinder"])
    gen_05B_peace_of_mind()
    gen_06_forms("06B", "invitation", "Family Shop")
    gen_07_closing()
    
    print("Successfully generated all 20 SVG diagrams in the root directory.")