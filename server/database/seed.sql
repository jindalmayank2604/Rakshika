-- Rakshika Seed Data for Development & Demonstrations
USE rakshika_db;

-- 1. Users
-- Default password: Password123! (bcrypt hashed)
INSERT INTO users (id, name, email, phone, password_hash, role) VALUES
(1, 'Rakshika Admin', 'admin@rakshika.org', '+91 9876543210', '$2a$10$w8T0MhJ0jQ0gV8Uo6F8U.eXbH3W0pE4K8Ww4O8s.X4e3b7rJgGz2K', 'admin'),
(2, 'Priya Sharma', 'priya@example.com', '+91 9812345678', '$2a$10$w8T0MhJ0jQ0gV8Uo6F8U.eXbH3W0pE4K8Ww4O8s.X4e3b7rJgGz2K', 'user');

-- 2. Emergency Contacts
INSERT INTO emergency_contacts (id, user_id, name, phone, relationship, is_primary) VALUES
(1, 2, 'Ananya Sharma', '+91 9823456789', 'Sister', TRUE),
(2, 2, 'Vikram Sharma', '+91 9834567890', 'Father', FALSE),
(3, 2, 'Dr. Meera Sen', '+91 9845678901', 'Friend / Mentor', FALSE);

-- 3. Realistic Community Reports
INSERT INTO reports (id, user_id, title, category, description, image_url, latitude, longitude, address, severity, status, verification_status) VALUES
(1, 2, 'Poor lighting near Sector 12 Bus Stop', 'Poor Lighting', 'Three continuous street lamps have been non-functional for past 2 weeks. The stretch from bus stand to metro pillar 42 is completely pitch dark after 7:30 PM.', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', 28.535517, 77.391029, 'Sector 12 Bus Stop, Main Market Road', 'Medium', 'Verified', 'Community Verified'),
(2, 2, 'Suspicious group gathering near Campus Back Gate', 'Suspicious Activity', 'Group of unidentified men loitering on parked motorbikes without number plates, passing unwelcome remarks at passing students between 6 PM - 9 PM.', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80', 28.542100, 77.401200, 'University North Gate Perimeter, Block C', 'High', 'Under Review', 'Unverified'),
(3, 2, 'Broken CCTV Camera at Pedestrian Subway', 'Broken CCTV', 'The surveillance camera dome at entrance B of the pedestrian underpass has been physically damaged and dislodged.', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80', 28.529800, 77.382400, 'Metro Underpass Exit 3, Central Ring', 'Medium', 'Resolved', 'Authority Verified'),
(4, 2, 'Isolated Pathway with dense overgrown bushes', 'Isolated Area', 'The pedestrian shortcut connecting the residential complex to the main boulevard is overgrown with bushes and lacks sightlines.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80', 28.549200, 77.378900, 'Greenway Corridor Link, Sector 15A', 'Low', 'Verified', 'Community Verified'),
(5, 2, 'Persistent verbal harassment near tea stall corner', 'Harassment', 'Repeated catcalling reported by multiple commuters in front of the tea kiosk during evening transit hours.', 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=600&auto=format&fit=crop&q=80', 28.538700, 77.399500, 'Commercial Junction Corner, Street 4', 'Critical', 'Under Review', 'Flagged');

-- 4. Audit History
INSERT INTO report_status_history (report_id, status, changed_by, notes) VALUES
(1, 'Submitted', 2, 'Initial community report filed.'),
(1, 'Verified', 1, 'Verified against local municipal complaint #MC-8821.'),
(3, 'Submitted', 2, 'Reported by commuter.'),
(3, 'Under Review', 1, 'Assigned to transit security cell.'),
(3, 'Resolved', 1, 'Technicians replaced camera module.');

-- 5. Notifications
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
(2, 'Report Verified', 'Your report "Poor lighting near Sector 12 Bus Stop" has been community verified.', 'report_verified', FALSE),
(2, 'Safety Advisory', 'Caution advised: 2 recent reports filed within 1 km of your saved journey route.', 'safety_alert', FALSE),
(2, 'Emergency Contact Active', 'Ananya Sharma has accepted and confirmed as your primary safety contact.', 'contact_alert', TRUE);

-- 6. AI Analysis
INSERT INTO ai_analysis (report_id, category, severity, summary, confidence) VALUES
(1, 'Poor Lighting', 'Medium', 'Identified infrastructure lighting defect posing evening commute safety risks.', 0.94),
(2, 'Suspicious Activity', 'High', 'Identified group loitering and harassment pattern in university vicinity.', 0.89);
