import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # High-End Dark UI Palette: Minimal, Modular, Elegant, Cool (Zero Emojis)
    BG_CANVAS = RGBColor(11, 15, 25)          # Deep Midnight Obsidian (#0B0F19)
    BG_CARD = RGBColor(19, 26, 42)            # Sleek Dark Navy Container (#131A2A)
    BG_CARD_ALT = RGBColor(24, 34, 56)        # Elevated Modular Box (#182238)
    BORDER_SUBTLE = RGBColor(38, 51, 79)      # Subtle Slate Blue Hairline (#26334F)
    BORDER_ACTIVE = RGBColor(99, 102, 241)    # Radiant Indigo Accent (#6366F1)
    
    TEXT_TITLE = RGBColor(255, 255, 255)      # Pure White (#FFFFFF)
    TEXT_BODY = RGBColor(203, 213, 225)       # Cool Slate Body (#CBD5E1)
    TEXT_MUTED = RGBColor(148, 163, 184)      # Subdued Slate (#94A3B8)
    
    ACCENT_INDIGO = RGBColor(99, 102, 241)    # Indigo Accent (#6366F1)
    ACCENT_CYAN = RGBColor(14, 165, 233)      # Sky Cyan (#0EA5E9)
    ACCENT_EMERALD = RGBColor(16, 185, 129)   # Mint Emerald (#10B981)
    ACCENT_ROSE = RGBColor(244, 63, 94)       # Coral Crimson (#F43F5E)
    ACCENT_AMBER = RGBColor(245, 158, 11)     # Warm Amber (#F59E0B)

    blank_layout = prs.slide_layouts[6]

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_CANVAS
        bg.line.fill.background()
        return bg

    def add_header(slide, slide_num, category_tag, title, subtitle=None):
        # Top Index & Category Badge
        badge_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11.733), Inches(0.35))
        tf_b = badge_box.text_frame
        tf_b.word_wrap = True
        tf_b.margin_left = tf_b.margin_top = tf_b.margin_right = tf_b.margin_bottom = 0
        p_b = tf_b.paragraphs[0]
        p_b.text = f"[ {slide_num:02d} / 10 ]   {category_tag.upper()}"
        p_b.font.name = "Segoe UI"
        p_b.font.size = Pt(10)
        p_b.font.bold = True
        p_b.font.color.rgb = ACCENT_CYAN

        # Title & Subtitle Box
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(1.1))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_title = tf.paragraphs[0]
        p_title.text = title
        p_title.font.name = "Segoe UI"
        p_title.font.size = Pt(21)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_TITLE
        p_title.space_after = Pt(3)

        if subtitle:
            p_sub = tf.add_paragraph()
            p_sub.text = subtitle
            p_sub.font.name = "Segoe UI"
            p_sub.font.size = Pt(11)
            p_sub.font.color.rgb = TEXT_MUTED

        # Subtle Header Divider
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.95), Inches(11.733), Inches(0.015))
        line.fill.solid()
        line.fill.fore_color.rgb = BORDER_SUBTLE
        line.line.fill.background()

    def add_card(slide, left, top, width, height, bg_color=BG_CARD, border_color=BORDER_SUBTLE):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1)
        return card

    # =========================================================================
    # SLIDE 1: Title & Introduction
    # Pattern Step 1: Introduce WeSafe on the first slide
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide1)

    # Top Index Tag
    tag_box1 = slide1.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.35))
    tf_tag1 = tag_box1.text_frame
    p_t1 = tf_tag1.paragraphs[0]
    p_t1.text = "[ 01 / 10 ]   PROJECT INTRODUCTION"
    p_t1.font.name = "Segoe UI"
    p_t1.font.size = Pt(11)
    p_t1.font.bold = True
    p_t1.font.color.rgb = ACCENT_CYAN

    # Hero Title Block
    hero_box = slide1.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(11.733), Inches(2.2))
    tf_hero = hero_box.text_frame
    tf_hero.word_wrap = True

    p_h1 = tf_hero.paragraphs[0]
    p_h1.text = "WESAFE : RAKSHIKA"
    p_h1.font.name = "Segoe UI"
    p_h1.font.size = Pt(36)
    p_h1.font.bold = True
    p_h1.font.color.rgb = TEXT_TITLE
    p_h1.space_after = Pt(4)

    p_h2 = tf_hero.add_paragraph()
    p_h2.text = "Intelligent Personal Safety, Crowdsourced Hazard Mapping & Safety-Weighted Navigation Ecosystem"
    p_h2.font.name = "Segoe UI"
    p_h2.font.size = Pt(14)
    p_h2.font.color.rgb = ACCENT_INDIGO
    p_h2.space_after = Pt(6)

    p_h3 = tf_hero.add_paragraph()
    p_h3.text = "A full-stack civic safety platform engineered to transform personal security from passive post-incident alarm response into proactive, algorithmic hazard avoidance."
    p_h3.font.name = "Segoe UI"
    p_h3.font.size = Pt(11)
    p_h3.font.color.rgb = TEXT_BODY

    # Three Modular Feature Cards on Slide 1
    c1_width = Inches(3.75)
    c_gap = Inches(0.24)
    c_top = Inches(3.6)
    c_h = Inches(3.2)

    # Module 1
    add_card(slide1, Inches(0.8), c_top, c1_width, c_h)
    tb_m1 = slide1.shapes.add_textbox(Inches(0.95), c_top + Inches(0.18), c1_width - Inches(0.3), c_h - Inches(0.36))
    tf_m1 = tb_m1.text_frame
    tf_m1.word_wrap = True
    
    p = tf_m1.paragraphs[0]
    p.text = "MODULAR NAVIGATION"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN
    p.space_after = Pt(4)

    p = tf_m1.add_paragraph()
    p.text = "Safety-Weighted Dijkstra"
    p.font.name = "Segoe UI"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(8)

    p = tf_m1.add_paragraph()
    p.text = "Custom graph search algorithm that balances geographic distance against real-time hazard severity scores, steering commuters away from high-risk corridors."
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.color.rgb = TEXT_BODY

    # Module 2
    add_card(slide1, Inches(0.8) + c1_width + c_gap, c_top, c1_width, c_h)
    tb_m2 = slide1.shapes.add_textbox(Inches(0.95) + c1_width + c_gap, c_top + Inches(0.18), c1_width - Inches(0.3), c_h - Inches(0.36))
    tf_m2 = tb_m2.text_frame
    tf_m2.word_wrap = True
    
    p = tf_m2.paragraphs[0]
    p.text = "COMMUNITY CONSENSUS"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD
    p.space_after = Pt(4)

    p = tf_m2.add_paragraph()
    p.text = "Global Incident Persistence"
    p.font.name = "Segoe UI"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(8)

    p = tf_m2.add_paragraph()
    p.text = "PostgreSQL-backed shared reporting pipeline eliminating client-isolated storage. Unresolved reports instantly populate global maps and alter path costs for all commuters."
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.color.rgb = TEXT_BODY

    # Module 3
    add_card(slide1, Inches(0.8) + (c1_width + c_gap) * 2, c_top, c1_width, c_h)
    tb_m3 = slide1.shapes.add_textbox(Inches(0.95) + (c1_width + c_gap) * 2, c_top + Inches(0.18), c1_width - Inches(0.3), c_h - Inches(0.36))
    tf_m3 = tb_m3.text_frame
    tf_m3.word_wrap = True
    
    p = tf_m3.paragraphs[0]
    p.text = "RAPID INTERVENTION"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_ROSE
    p.space_after = Pt(4)

    p = tf_m3.add_paragraph()
    p.text = "Emergency SOS & Safe Havens"
    p.font.name = "Segoe UI"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(8)

    p = tf_m3.add_paragraph()
    p.text = "One-touch GPS emergency broadcast engine paired with a curated database of verified 24/7 safe havens (police stations, hospitals, shelters) along navigation routes."
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.color.rgb = TEXT_BODY

    # =========================================================================
    # SLIDE 2: Problem Statement & Why It Is Necessary
    # Pattern Step 2: Next slide should explain the problem statement and why is it necessary
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide2)
    add_header(slide2, 2, "PROBLEM ANALYSIS", "The Navigational Blind Spot & The Necessity for Safety-First Routing",
               "Traditional mapping platforms prioritize distance and time, remaining blind to pedestrian vulnerability.")

    c2_w = Inches(3.75)
    c2_top = Inches(2.2)
    c2_h = Inches(4.7)

    # Card 1: Navigational Blindness
    add_card(slide2, Inches(0.8), c2_top, c2_w, c2_h)
    tb_p1 = slide2.shapes.add_textbox(Inches(1.0), c2_top + Inches(0.2), c2_w - Inches(0.4), c2_h - Inches(0.4))
    tf_p1 = tb_p1.text_frame
    tf_p1.word_wrap = True

    p = tf_p1.paragraphs[0]
    p.text = "CRITICAL PAIN POINT 01"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_ROSE
    p.space_after = Pt(4)

    p = tf_p1.add_paragraph()
    p.text = "Blind Optimization"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    bullets = [
        "Conventional routing systems (Google Maps, OSRM, GraphHopper) minimize travel time or Euclidean distance strictly.",
        "They blindly guide solitary pedestrians into poorly lit alleys, isolated passages, or areas with frequent harassment.",
        "Saving 90 seconds of transit time frequently introduces severe physical risk for commuters."
    ]
    for b in bullets:
        p = tf_p1.add_paragraph()
        p.text = f"--  {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # Card 2: Fragmented Reporting
    add_card(slide2, Inches(0.8) + c2_w + c_gap, c2_top, c2_w, c2_h)
    tb_p2 = slide2.shapes.add_textbox(Inches(1.0) + c2_w + c_gap, c2_top + Inches(0.2), c2_w - Inches(0.4), c2_h - Inches(0.4))
    tf_p2 = tb_p2.text_frame
    tf_p2.word_wrap = True

    p = tf_p2.paragraphs[0]
    p.text = "CRITICAL PAIN POINT 02"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_AMBER
    p.space_after = Pt(4)

    p = tf_p2.add_paragraph()
    p.text = "Disconnected & Stale Data"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    bullets2 = [
        "Civic safety reporting has historically been siloed inside administrative portals with days of moderation delay.",
        "Commuters lack a real-time crowdsourced telemetry layer that reflects immediate, active street-level hazards.",
        "Without shared persistence, reports remain isolated on local client caches rather than protecting the collective public."
    ]
    for b in bullets2:
        p = tf_p2.add_paragraph()
        p.text = f"--  {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # Card 3: Why It Is Necessary
    add_card(slide2, Inches(0.8) + (c2_w + c_gap) * 2, c2_top, c2_w, c2_h)
    tb_p3 = slide2.shapes.add_textbox(Inches(1.0) + (c2_w + c_gap) * 2, c2_top + Inches(0.2), c2_w - Inches(0.4), c2_h - Inches(0.4))
    tf_p3 = tb_p3.text_frame
    tf_p3.word_wrap = True

    p = tf_p3.paragraphs[0]
    p.text = "THE IMPERATIVE"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN
    p.space_after = Pt(4)

    p = tf_p3.add_paragraph()
    p.text = "Why WeSafe Is Necessary"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    bullets3 = [
        "Vulnerable demographics disproportionately curtail employment, education, and social movement due to fear of harassment.",
        "Reactive tools (panic whistles, delayed SMS) only operate once harm has commenced; proactive avoidance is vital.",
        "Navigation must treat safety as a first-class mathematical constraint, not an afterthought."
    ]
    for b in bullets3:
        p = tf_p3.add_paragraph()
        p.text = f"--  {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # =========================================================================
    # SLIDE 3: How Can It Be Solved?
    # Pattern Step 3: Third, how can it be solved?
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide3)
    add_header(slide3, 3, "THE SOLUTION", "Algorithmic Risk Avoidance & Unified Civic Telemetry",
               "A dual-engine paradigm: combining modified graph theory with live relational persistence.")

    c3_w = Inches(3.75)
    c3_top = Inches(2.2)
    c3_h = Inches(4.7)

    # Sol 1: Dynamic Path Penalization
    add_card(slide3, Inches(0.8), c3_top, c3_w, c3_h)
    tb_s1 = slide3.shapes.add_textbox(Inches(1.0), c3_top + Inches(0.2), c3_w - Inches(0.4), c3_h - Inches(0.4))
    tf_s1 = tb_s1.text_frame
    tf_s1.word_wrap = True

    p = tf_s1.paragraphs[0]
    p.text = "SOLUTION PILLAR 01"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_INDIGO
    p.space_after = Pt(4)

    p = tf_s1.add_paragraph()
    p.text = "Algorithmic Detour Engine"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    sol_bullets1 = [
        "Incorporate a dynamic Safety Index into pathfinding edge weights.",
        "Whenever a hazard is reported along an edge (u, v), the effective traversal cost spikes exponentially.",
        "The router naturally discovers optimal circumvention corridors that add minimal physical distance while maximizing safety."
    ]
    for b in sol_bullets1:
        p = tf_s1.add_paragraph()
        p.text = f"--  {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # Sol 2: Instant Public Telemetry
    add_card(slide3, Inches(0.8) + c3_w + c_gap, c3_top, c3_w, c3_h)
    tb_s2 = slide3.shapes.add_textbox(Inches(1.0) + c3_w + c_gap, c3_top + Inches(0.2), c3_w - Inches(0.4), c3_h - Inches(0.4))
    tf_s2 = tb_s2.text_frame
    tf_s2.word_wrap = True

    p = tf_s2.paragraphs[0]
    p.text = "SOLUTION PILLAR 02"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD
    p.space_after = Pt(4)

    p = tf_s2.add_paragraph()
    p.text = "Immediate Threat Ingestion"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    sol_bullets2 = [
        "Abolish multi-day administrative queues in favor of a binary status state machine (Unresolved vs. Resolved).",
        "Every report uploaded by any commuter immediately enters the database and surfaces on all client maps in real time.",
        "A shared 4-second reactive polling cadence synchronizes live hazard heatmaps globally."
    ]
    for b in sol_bullets2:
        p = tf_s2.add_paragraph()
        p.text = f"--  {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # Sol 3: Fortified Transit Corridors
    add_card(slide3, Inches(0.8) + (c3_w + c_gap) * 2, c3_top, c3_w, c3_h)
    tb_s3 = slide3.shapes.add_textbox(Inches(1.0) + (c3_w + c_gap) * 2, c3_top + Inches(0.2), c3_w - Inches(0.4), c3_h - Inches(0.4))
    tf_s3 = tb_s3.text_frame
    tf_s3.word_wrap = True

    p = tf_s3.paragraphs[0]
    p.text = "SOLUTION PILLAR 03"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN
    p.space_after = Pt(4)

    p = tf_s3.add_paragraph()
    p.text = "Safe Haven Attraction"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    sol_bullets3 = [
        "Incorporate a curated network of verified 24/7 sanctuaries: police stations, hospitals, well-lit petrol pumps, and transit kiosks.",
        "Graph nodes close to Safe Havens receive an algorithmic safety bonus, actively funneling pedestrians toward populated corridors.",
        "One-touch routing directs distress cases to the nearest sanctuary instantly."
    ]
    for b in sol_bullets3:
        p = tf_s3.add_paragraph()
        p.text = f"--  {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # =========================================================================
    # SLIDE 4: Technology Stack & Technical Deep Dive
    # Pattern Step 4: Fourth, what technology has been used, explain all of it in detail
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide4)
    add_header(slide4, 4, "TECHNOLOGY STACK", "Full-Stack System Architecture & Engineering Components",
               "A high-performance decoupled architecture engineered for responsiveness, spatial queries, and ACID persistence.")

    c4_w = Inches(2.78)
    c4_gap = Inches(0.2)
    c4_top = Inches(2.2)
    c4_h = Inches(4.7)

    tech_modules = [
        {
            "tag": "FRONTEND CLIENT",
            "title": "React 18 & MapLibre",
            "color": ACCENT_CYAN,
            "items": [
                "React 18 with functional hooks & Context API for global state management.",
                "Vite build toolchain delivering sub-second hot module reloading.",
                "Tailwind CSS for responsive modular components and dark mode UI.",
                "MapLibre GL client-side rendering for vector and raster geospatial tiles.",
                "Lucide React for crisp vector iconography."
            ]
        },
        {
            "tag": "BACKEND API",
            "title": "Node.js & Express",
            "color": ACCENT_EMERALD,
            "items": [
                "Node.js runtime with asynchronous non-blocking event loop.",
                "Express.js REST API providing clean resource-oriented endpoints.",
                "CORS middleware for secure cross-origin resource sharing.",
                "JWT (JSON Web Token) bearer token authentication.",
                "Parameterized SQL queries to strictly eliminate SQL injection vulnerabilities."
            ]
        },
        {
            "tag": "PERSISTENCE TIER",
            "title": "PostgreSQL Database",
            "color": ACCENT_INDIGO,
            "items": [
                "PostgreSQL 18 relational engine running on port 5432.",
                "pg connection pooling managing concurrent client transactions.",
                "Normalized tables: users, reports, emergency_contacts.",
                "ACID transactional guarantees on critical incident writes.",
                "Single source of truth: 0% dependency on mock data or local storage."
            ]
        },
        {
            "tag": "SPATIAL & ROUTING",
            "title": "Dijkstra & OpenStreetMap",
            "color": ACCENT_ROSE,
            "items": [
                "Custom Modified Dijkstra Algorithm implemented in JavaScript.",
                "Binary Min-Heap Priority Queue for O((V + E) log V) execution.",
                "OSRM (Open Source Routing Machine) road geometry extraction.",
                "Nominatim Geocoding API for reverse geocoding & address resolution.",
                "Haversine spherical distance metric for proximity penalty decay."
            ]
        }
    ]

    for idx, mod in enumerate(tech_modules):
        left_pos = Inches(0.8) + (c4_w + c4_gap) * idx
        add_card(slide4, left_pos, c4_top, c4_w, c4_h)
        tb = slide4.shapes.add_textbox(left_pos + Inches(0.18), c4_top + Inches(0.18), c4_w - Inches(0.36), c4_h - Inches(0.36))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = mod["tag"]
        p.font.name = "Segoe UI"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = mod["color"]
        p.space_after = Pt(4)

        p = tf.add_paragraph()
        p.text = mod["title"]
        p.font.name = "Segoe UI"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = TEXT_TITLE
        p.space_after = Pt(8)

        for item in mod["items"]:
            p = tf.add_paragraph()
            p.text = f"--  {item}"
            p.font.name = "Segoe UI"
            p.font.size = Pt(9.5)
            p.font.color.rgb = TEXT_BODY
            p.space_after = Pt(6)

    # =========================================================================
    # SLIDE 5: Safety-Weighted Dijkstra Algorithm (New Change & Core Innovation)
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide5)
    add_header(slide5, 5, "CORE ALGORITHM", "Safety-Weighted Dijkstra Pathfinding Formulation",
               "Balancing spatial distance against incident hazard density through dynamic graph edge penalization.")

    # Left Card: Mathematical Model
    c5_w1 = Inches(6.8)
    c5_top = Inches(2.2)
    c5_h = Inches(4.7)

    add_card(slide5, Inches(0.8), c5_top, c5_w1, c5_h)
    tb_alg1 = slide5.shapes.add_textbox(Inches(1.05), c5_top + Inches(0.25), c5_w1 - Inches(0.5), c5_h - Inches(0.5))
    tf_alg1 = tb_alg1.text_frame
    tf_alg1.word_wrap = True

    p = tf_alg1.paragraphs[0]
    p.text = "MATHEMATICAL FORMULATION"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_INDIGO
    p.space_after = Pt(4)

    p = tf_alg1.add_paragraph()
    p.text = "Edge Weight Penalty Function"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    # Box for formula
    p_f = tf_alg1.add_paragraph()
    p_f.text = "Cost(u, v) = Distance(u, v) * [ 1 + alpha * ((100 - SafetyIndex(u, v)) / 100) ]"
    p_f.font.name = "Consolas"
    p_f.font.size = Pt(11)
    p_f.font.bold = True
    p_f.font.color.rgb = ACCENT_CYAN
    p_f.space_after = Pt(12)

    formula_items = [
        "Distance(u, v): Spherical great-circle distance (km) between nodes computed via the Haversine equation.",
        "SafetyIndex(u, v): Dynamic corridor rating (0 to 100) continuously recalibrated from PostgreSQL hazard reports.",
        "alpha (Penalty Weight = 2.5): Scaling factor governing the algorithm's willingness to detour. High alpha enforces strict hazard avoidance.",
        "Hazard Penalty Decay: Incidents within 1.0 km exert 2.0x weight; incidents within 3.0 km exert 1.4x weight; incidents beyond 20 km decay to 0.6x.",
        "Severity Weights: Critical incidents deduct 24 pts; High deducts 16 pts; Medium deducts 8 pts; Safe Havens inject +10 pt bonus."
    ]
    for item in formula_items:
        p = tf_alg1.add_paragraph()
        p.text = f"--  {item}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(6)

    # Right Card: Data Structure & Complexity
    c5_w2 = Inches(4.7)
    add_card(slide5, Inches(7.833), c5_top, c5_w2, c5_h)
    tb_alg2 = slide5.shapes.add_textbox(Inches(8.05), c5_top + Inches(0.25), c5_w2 - Inches(0.4), c5_h - Inches(0.5))
    tf_alg2 = tb_alg2.text_frame
    tf_alg2.word_wrap = True

    p = tf_alg2.paragraphs[0]
    p.text = "HEAP-BASED IMPLEMENTATION"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD
    p.space_after = Pt(4)

    p = tf_alg2.add_paragraph()
    p.text = "Binary Priority Queue"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    ds_items = [
        "MinPriorityQueue: Custom binary min-heap implemented in dijkstraRouting.js.",
        "Logarithmic Efficiency: Insertion and extraction execute in O(log V) time using _bubbleUp and _sinkDown operations.",
        "Overall Complexity: O((V + E) log V), delivering sub-50ms execution on local street graphs.",
        "Dual-Route Evaluation: Simultaneously extracts the purely shortest corridor and the safety-weighted optimal corridor for user comparison.",
        "Fallback Geometry: If external routing graph fails, creates intelligent waypoint tangents around high-risk centroid coordinates."
    ]
    for item in ds_items:
        p = tf_alg2.add_paragraph()
        p.text = f"--  {item}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(6)

    # =========================================================================
    # SLIDE 6: Global Incident Persistence & Multi-Client Synchronization
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide6)
    add_header(slide6, 6, "DATA PIPELINE", "Elimination of Client Isolation & Global Database Synchronization",
               "Resolving the visibility defect: Transitioning from browser-local state to a single shared PostgreSQL truth.")

    c6_w = Inches(3.75)
    c6_top = Inches(2.2)
    c6_h = Inches(4.7)

    # Stage 1: Defect Audit & Removal
    add_card(slide6, Inches(0.8), c6_top, c6_w, c6_h)
    tb_sync1 = slide6.shapes.add_textbox(Inches(1.0), c6_top + Inches(0.2), c6_w - Inches(0.4), c6_h - Inches(0.4))
    tf_sync1 = tb_sync1.text_frame
    tf_sync1.word_wrap = True

    p = tf_sync1.paragraphs[0]
    p.text = "STAGE 01 : REFACTOR"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_ROSE
    p.space_after = Pt(4)

    p = tf_sync1.add_paragraph()
    p.text = "Eliminating Illusions"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    sync_items1 = [
        "Defect Found: Earlier builds utilized in-memory arrays and localStorage fallbacks that gave the illusion of cloud sync.",
        "Reports created by User A remained isolated to User A's browser instance; User B could not see hazards.",
        "Resolution: Fully excised mockData references from api.js and forced strict Express API persistence."
    ]
    for item in sync_items1:
        p = tf_sync1.add_paragraph()
        p.text = f"--  {item}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # Stage 2: Direct Database Ingestion
    add_card(slide6, Inches(0.8) + c6_w + c_gap, c6_top, c6_w, c6_h)
    tb_sync2 = slide6.shapes.add_textbox(Inches(1.0) + c6_w + c_gap, c6_top + Inches(0.2), c6_w - Inches(0.4), c6_h - Inches(0.4))
    tf_sync2 = tb_sync2.text_frame
    tf_sync2.word_wrap = True

    p = tf_sync2.paragraphs[0]
    p.text = "STAGE 02 : INGESTION"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN
    p.space_after = Pt(4)

    p = tf_sync2.add_paragraph()
    p.text = "PostgreSQL Source of Truth"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    sync_items2 = [
        "Every report is posted directly to POST /api/incidents with parameterized SQL INSERT queries.",
        "Binary status tag initialized to 'Unresolved'; records are assigned immutable database IDs and server timestamps.",
        "Zero verification bottlenecks: Community safety hazards are registered immediately to warn public commuters."
    ]
    for item in sync_items2:
        p = tf_sync2.add_paragraph()
        p.text = f"--  {item}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # Stage 3: Multi-Client Distribution
    add_card(slide6, Inches(0.8) + (c6_w + c_gap) * 2, c6_top, c6_w, c6_h)
    tb_sync3 = slide6.shapes.add_textbox(Inches(1.0) + (c6_w + c_gap) * 2, c6_top + Inches(0.2), c6_w - Inches(0.4), c6_h - Inches(0.4))
    tf_sync3 = tb_sync3.text_frame
    tf_sync3.word_wrap = True

    p = tf_sync3.paragraphs[0]
    p.text = "STAGE 03 : REPLICATION"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD
    p.space_after = Pt(4)

    p = tf_sync3.add_paragraph()
    p.text = "Reactive Multi-Client Sync"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    sync_items3 = [
        "SafetyContext implements a 4-second background polling cycle polling GET /api/incidents from the central server.",
        "Dispatches custom DOM events (wesafe_report_added) for zero-latency multi-tab updates.",
        "Verified via two-client automated integration test (testTwoClients.js): User A submit -> User B view verified 100%."
    ]
    for item in sync_items3:
        p = tf_sync3.add_paragraph()
        p.text = f"--  {item}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # =========================================================================
    # SLIDE 7: Core Feature Suite & Modular Capabilities
    # =========================================================================
    slide7 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide7)
    add_header(slide7, 7, "FEATURE SUITE", "Modular Personal Safety Capabilities & Application Services",
               "Four integrated application modules providing proactive route planning, active alerts, and verified sanctuaries.")

    f_w = Inches(5.74)
    f_gap_x = Inches(0.25)
    f_gap_y = Inches(0.2)
    f_h = Inches(2.25)

    features = [
        {
            "tag": "MODULE 01",
            "title": "Safer Route Planner",
            "color": ACCENT_CYAN,
            "desc": "Computes and contrasts Dijkstra-powered safest corridors against standard shortest routes. Renders live safety percentage badges, traversal time, and hazard proximity metrics with one-click map projection."
        },
        {
            "tag": "MODULE 02",
            "title": "Instant SOS Emergency Dispatch",
            "color": ACCENT_ROSE,
            "desc": "One-touch distress broadcast mechanism that captures high-precision browser GPS coordinates, compiles distress telemetry, and triggers emergency notifications to designated trusted contacts."
        },
        {
            "tag": "MODULE 03",
            "title": "Interactive Hazard Map Explorer",
            "color": ACCENT_AMBER,
            "desc": "MapLibre GL visualization layer with category-specific filtering (Poor Lighting, Harassment, Infrastructure, Deserted). Features severity-coded map pins and full incident descriptions."
        },
        {
            "tag": "MODULE 04",
            "title": "Verified Safe Haven Directory",
            "color": ACCENT_EMERALD,
            "desc": "Curated database of verified 24/7 public sanctuaries: police stations, hospitals, pharmacies, and security kiosks. Features direct routing, contact dialing, and distance indicators."
        }
    ]

    for idx, feat in enumerate(features):
        col = idx % 2
        row = idx // 2
        x = Inches(0.8) + (f_w + f_gap_x) * col
        y = Inches(2.2) + (f_h + f_gap_y) * row
        
        add_card(slide7, x, y, f_w, f_h)
        tb = slide7.shapes.add_textbox(x + Inches(0.2), y + Inches(0.18), f_w - Inches(0.4), f_h - Inches(0.36))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = feat["tag"]
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = feat["color"]
        p.space_after = Pt(3)

        p = tf.add_paragraph()
        p.text = feat["title"]
        p.font.name = "Segoe UI"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = TEXT_TITLE
        p.space_after = Pt(6)

        p = tf.add_paragraph()
        p.text = feat["desc"]
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY

    # =========================================================================
    # SLIDE 8: Relational Database Schema & Data Integrity
    # =========================================================================
    slide8 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide8)
    add_header(slide8, 8, "DATABASE DESIGN", "PostgreSQL Entity Architecture & Relational Data Integrity",
               "Normalized schema design guaranteeing ACID compliance, foreign key cascade rules, and credential encryption.")

    c8_w = Inches(3.75)
    c8_top = Inches(2.2)
    c8_h = Inches(4.7)

    schemas = [
        {
            "tag": "ENTITY 01",
            "table": "users",
            "color": ACCENT_INDIGO,
            "fields": [
                "id : SERIAL PRIMARY KEY",
                "username : VARCHAR(50) NOT NULL UNIQUE",
                "email : VARCHAR(100) NOT NULL UNIQUE",
                "password_hash : VARCHAR(255) NOT NULL",
                "role : VARCHAR(20) DEFAULT 'user'",
                "created_at : TIMESTAMP WITH TIME ZONE"
            ],
            "notes": "Secured with bcrypt cryptographic hashing (salt factor 10). Passwords are never stored in plain text."
        },
        {
            "tag": "ENTITY 02",
            "table": "reports",
            "color": ACCENT_CYAN,
            "fields": [
                "id : SERIAL PRIMARY KEY",
                "title : VARCHAR(150) NOT NULL",
                "description : TEXT",
                "category : VARCHAR(50) NOT NULL",
                "severity : VARCHAR(20) NOT NULL",
                "latitude : NUMERIC(10, 7) NOT NULL",
                "longitude : NUMERIC(10, 7) NOT NULL",
                "address : VARCHAR(255)",
                "status : VARCHAR(20) DEFAULT 'Unresolved'",
                "created_at : TIMESTAMP WITH TIME ZONE"
            ],
            "notes": "Coordinates indexed for rapid spatial bounding-box retrieval. Binary status: Unresolved vs. Resolved."
        },
        {
            "tag": "ENTITY 03",
            "table": "emergency_contacts",
            "color": ACCENT_EMERALD,
            "fields": [
                "id : SERIAL PRIMARY KEY",
                "user_id : INT REFERENCES users(id) ON DELETE CASCADE",
                "name : VARCHAR(100) NOT NULL",
                "phone : VARCHAR(20) NOT NULL",
                "relationship : VARCHAR(50)",
                "priority : INT DEFAULT 1"
            ],
            "notes": "Enforces strict relational integrity; user account deletion cascades to associated emergency contacts."
        }
    ]

    for idx, sch in enumerate(schemas):
        left_pos = Inches(0.8) + (c8_w + c_gap) * idx
        add_card(slide8, left_pos, c8_top, c8_w, c8_h)
        tb = slide8.shapes.add_textbox(left_pos + Inches(0.18), c8_top + Inches(0.2), c8_w - Inches(0.36), c8_h - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = sch["tag"]
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = sch["color"]
        p.space_after = Pt(4)

        p = tf.add_paragraph()
        p.text = f"Table: {sch['table']}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = TEXT_TITLE
        p.space_after = Pt(8)

        p = tf.add_paragraph()
        p.text = "COLUMNS & DATA TYPES:"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(4)

        for fld in sch["fields"]:
            p = tf.add_paragraph()
            p.text = f"--  {fld}"
            p.font.name = "Consolas"
            p.font.size = Pt(9)
            p.font.color.rgb = TEXT_BODY
            p.space_after = Pt(3)

        p = tf.add_paragraph()
        p.text = "INTEGRITY GUARANTEE:"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = sch["color"]
        p.space_before = Pt(8)
        p.space_after = Pt(3)

        p = tf.add_paragraph()
        p.text = sch["notes"]
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_BODY

    # =========================================================================
    # SLIDE 9: Empirical Validation & Algorithmic Benchmarks
    # =========================================================================
    slide9 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide9)
    add_header(slide9, 9, "EMPIRICAL BENCHMARKS", "Validation Metrics: Standard Shortest Path vs. Safety-Weighted Dijkstra",
               "Live comparative benchmarking across an urban test grid containing active Critical and High hazards.")

    # Top Metric Callout Cards (Row of 3)
    m_w = Inches(3.75)
    m_top = Inches(2.2)
    m_h = Inches(1.3)

    metrics = [
        {"value": "+53%", "label": "NET SAFETY SCORE GAIN", "sub": "Jump from 24% to 77% Corridor Safety", "color": ACCENT_EMERALD},
        {"value": "1.41 km", "label": "PRUDENT DETOUR DISTANCE", "sub": "Minimal physical penalty for risk circumvention", "color": ACCENT_CYAN},
        {"value": "< 45 ms", "label": "GRAPH ROUTE LATENCY", "sub": "Heap-optimized O((V+E) log V) pathfinding", "color": ACCENT_INDIGO}
    ]

    for idx, met in enumerate(metrics):
        left_pos = Inches(0.8) + (m_w + c_gap) * idx
        add_card(slide9, left_pos, m_top, m_w, m_h, bg_color=BG_CARD_ALT)
        tb = slide9.shapes.add_textbox(left_pos + Inches(0.18), m_top + Inches(0.1), m_w - Inches(0.36), m_h - Inches(0.2))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = met["value"]
        p.font.name = "Segoe UI"
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = met["color"]
        p.space_after = Pt(2)

        p = tf.add_paragraph()
        p.text = f"{met['label']}  |  {met['sub']}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = TEXT_MUTED

    # Two Comparative Route Breakdown Cards Below
    c9_top = Inches(3.75)
    c9_w = Inches(5.74)
    c9_h = Inches(3.15)

    # Left: Standard Shortest Path
    add_card(slide9, Inches(0.8), c9_top, c9_w, c9_h)
    tb_b1 = slide9.shapes.add_textbox(Inches(1.05), c9_top + Inches(0.2), c9_w - Inches(0.5), c9_h - Inches(0.4))
    tf_b1 = tb_b1.text_frame
    tf_b1.word_wrap = True

    p = tf_b1.paragraphs[0]
    p.text = "ROUTE PROFILE A"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_ROSE
    p.space_after = Pt(4)

    p = tf_b1.add_paragraph()
    p.text = "Standard Dijkstra (Shortest Path)"
    p.font.name = "Segoe UI"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(8)

    b1_stats = [
        "Total Path Distance: 2.99 km (Fastest linear trajectory).",
        "Estimated Travel Duration: 36 min walking transit.",
        "Composite Safety Score: 24% (Severe Risk).",
        "Corridor Threat Exposure: Intersects directly with 2 active Critical hazard zones (poor lighting, harassment).",
        "System Recommendation: REJECTED by WeSafe safety advisor."
    ]
    for st in b1_stats:
        p = tf_b1.add_paragraph()
        p.text = f"--  {st}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(4)

    # Right: Safety-Weighted Dijkstra
    add_card(slide9, Inches(0.8) + c9_w + Inches(0.25), c9_top, c9_w, c9_h)
    tb_b2 = slide9.shapes.add_textbox(Inches(1.05) + c9_w + Inches(0.25), c9_top + Inches(0.2), c9_w - Inches(0.5), c9_h - Inches(0.4))
    tf_b2 = tb_b2.text_frame
    tf_b2.word_wrap = True

    p = tf_b2.paragraphs[0]
    p.text = "ROUTE PROFILE B"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD
    p.space_after = Pt(4)

    p = tf_b2.add_paragraph()
    p.text = "WeSafe Modified Dijkstra (Safest Route)"
    p.font.name = "Segoe UI"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(8)

    b2_stats = [
        "Total Path Distance: 4.40 km (+1.41 km prudent detour).",
        "Estimated Travel Duration: 53 min walking transit.",
        "Composite Safety Score: 77% (High Confidence Safe Path).",
        "Corridor Threat Exposure: 0 Critical hazards intersected; safely bypasses threat buffer zones.",
        "System Recommendation: RECOMMENDED as primary safe transit corridor."
    ]
    for st in b2_stats:
        p = tf_b2.add_paragraph()
        p.text = f"--  {st}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(4)

    # =========================================================================
    # SLIDE 10: Conclusion, Impact & Future Roadmap
    # =========================================================================
    slide10 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide10)
    add_header(slide10, 10, "CONCLUSION & ROADMAP", "Transforming Urban Mobility & Strategic Engineering Roadmap",
               "Delivering algorithmic peace of mind for daily commuters and scaling towards municipal deployment.")

    c10_w = Inches(3.75)
    c10_top = Inches(2.2)
    c10_h = Inches(4.7)

    # Card 1: Delivered Value
    add_card(slide10, Inches(0.8), c10_top, c10_w, c10_h)
    tb_c1 = slide10.shapes.add_textbox(Inches(1.0), c10_top + Inches(0.2), c10_w - Inches(0.4), c10_h - Inches(0.4))
    tf_c1 = tb_c1.text_frame
    tf_c1.word_wrap = True

    p = tf_c1.paragraphs[0]
    p.text = "PROJECT DELIVERABLES"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN
    p.space_after = Pt(4)

    p = tf_c1.add_paragraph()
    p.text = "Delivered Milestones"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    c1_bullets = [
        "Implemented Safety-Weighted Dijkstra Algorithm with O((V+E) log V) heap efficiency.",
        "Eliminated mock data storage; established PostgreSQL as the immutable single source of truth.",
        "Automated multi-client real-time synchronization with 4-second reactive polling cycles.",
        "Designed clean, responsive, modular frontend built on React 18, MapLibre GL, and Tailwind CSS."
    ]
    for b in c1_bullets:
        p = tf_c1.add_paragraph()
        p.text = f"--  {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # Card 2: Societal Impact
    add_card(slide10, Inches(0.8) + c10_w + c_gap, c10_top, c10_w, c10_h)
    tb_c2 = slide10.shapes.add_textbox(Inches(1.0) + c10_w + c_gap, c10_top + Inches(0.2), c10_w - Inches(0.4), c10_h - Inches(0.4))
    tf_c2 = tb_c2.text_frame
    tf_c2.word_wrap = True

    p = tf_c2.paragraphs[0]
    p.text = "SOCIETAL IMPACT"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD
    p.space_after = Pt(4)

    p = tf_c2.add_paragraph()
    p.text = "Civic Empowerment"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    c2_bullets = [
        "Empowers women, students, and night commuters with transparent route safety scores.",
        "Shifts civic hazard management from delayed bureaucratic intervention to immediate peer protection.",
        "Creates data-backed accountability for municipal lighting and urban infrastructure improvements."
    ]
    for b in c2_bullets:
        p = tf_c2.add_paragraph()
        p.text = f"--  {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # Card 3: Future Roadmap
    add_card(slide10, Inches(0.8) + (c10_w + c_gap) * 2, c10_top, c10_w, c10_h)
    tb_c3 = slide10.shapes.add_textbox(Inches(1.0) + (c10_w + c_gap) * 2, c10_top + Inches(0.2), c10_w - Inches(0.4), c10_h - Inches(0.4))
    tf_c3 = tb_c3.text_frame
    tf_c3.word_wrap = True

    p = tf_c3.paragraphs[0]
    p.text = "FUTURE HORIZONS"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_INDIGO
    p.space_after = Pt(4)

    p = tf_c3.add_paragraph()
    p.text = "Engineering Roadmap"
    p.font.name = "Segoe UI"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(10)

    c3_bullets = [
        "Computer-Vision Lighting Analysis: Automated street illumination indexing from dashcam and municipal camera feeds.",
        "Predictive Incident Modeling: Time-series machine learning models predicting risk probabilities based on historical crime patterns.",
        "Offline Mesh Fallback: Peer-to-peer Bluetooth Low Energy mesh networking for emergency alerts in zero-connectivity environments."
    ]
    for b in c3_bullets:
        p = tf_c3.add_paragraph()
        p.text = f"--  {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_BODY
        p.space_after = Pt(8)

    # Save presentation to project directory and brain artifacts directory
    saved_files = []
    candidates = [
        r"d:\FEE 2 Project\Rakshika\WeSafe_Rakshika_Deck.pptx",
        r"d:\FEE 2 Project\Rakshika\WeSafe_Presentation_V2.pptx",
        r"d:\FEE 2 Project\Rakshika\WeSafe_Rakshika_Presentation.pptx",
        r"C:\Users\Mayank jindal\.gemini\antigravity\brain\33e8604b-dcd7-4292-8d0f-95d4aa4ed053\WeSafe_Rakshika_Deck.pptx",
        r"C:\Users\Mayank jindal\.gemini\antigravity\brain\33e8604b-dcd7-4292-8d0f-95d4aa4ed053\WeSafe_Rakshika_Presentation.pptx"
    ]
    for p in candidates:
        try:
            prs.save(p)
            saved_files.append(p)
            print(f"Presentation saved successfully to: {p}")
        except PermissionError:
            print(f"File currently open/locked, skipping: {p}")
        except Exception as e:
            print(f"Error saving to {p}: {e}")

    print(f"Total Slides Created: {len(prs.slides)}")

if __name__ == "__main__":
    create_presentation()
