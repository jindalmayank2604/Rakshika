-- WeSafe PostgreSQL Demo Seed Data

-- Insert Demo Users (bcrypt hash for "Password123!")
INSERT INTO users (id, name, email, phone, password_hash, role) VALUES
(1, 'WeSafe Security Admin', 'admin@wesafe.org', '+91 99999 00000', '$2a$10$779X3qg/f/7Dq55WqN9cO.W2y3v5p.M3cM5t5Q6E8T.Z/J0W0a8uS', 'admin'),
(2, 'Priya Sharma', 'priya@example.com', '+91 98123 45678', '$2a$10$779X3qg/f/7Dq55WqN9cO.W2y3v5p.M3cM5t5Q6E8T.Z/J0W0a8uS', 'user')
ON CONFLICT (id) DO NOTHING;

-- Reset serial sequence for users
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

-- Insert Emergency Contacts
INSERT INTO emergency_contacts (id, user_id, name, phone, relationship, is_primary) VALUES
(1, 2, 'Ananya Sharma', '+91 98234 56789', 'Sister', TRUE),
(2, 2, 'Vikram Sharma', '+91 98345 67890', 'Father', FALSE),
(3, 2, 'Dr. Meera Sen', '+91 98456 78901', 'Mentor / Friend', FALSE)
ON CONFLICT (id) DO NOTHING;

SELECT setval('emergency_contacts_id_seq', (SELECT MAX(id) FROM emergency_contacts));

-- Insert Verified Safe Havens
INSERT INTO safe_havens (id, name, type, latitude, longitude, phone, is_24_7, verified) VALUES
(1, '24/7 MedPlus Pharmacy Safe Point', 'Pharmacy / First Aid', 28.5365, 77.3920, '+91 11 2345 6789', TRUE, TRUE),
(2, 'City Police Community Assistance Post #5', 'Police Booth', 28.5410, 77.3980, '112', TRUE, TRUE),
(3, 'Metro Station Passenger Care Hub', 'Transit Safe Zone', 28.5310, 77.3840, '+91 11 2233 4455', TRUE, TRUE)
ON CONFLICT (id) DO NOTHING;

SELECT setval('safe_havens_id_seq', (SELECT MAX(id) FROM safe_havens));

-- Insert Community Incident Reports
INSERT INTO reports (id, user_id, title, category, description, image_url, latitude, longitude, address, severity, status, verification_status, ai_summary) VALUES
(1, 2, 'Poor lighting near Sector 12 Bus Stop', 'Poor Lighting', 'Three continuous street lamps have been non-functional for past 2 weeks. The stretch from bus stand to metro pillar 42 is completely pitch dark after 7:30 PM.', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', 28.535517, 77.391029, 'Sector 12 Bus Stop, Main Market Road', 'Medium', 'Verified', 'Community Verified', 'Reported infrastructure lighting defect posing evening commute safety risks.'),
(2, 2, 'Suspicious group gathering near Campus Back Gate', 'Suspicious Activity', 'Group of unidentified men loitering on parked motorbikes without number plates, passing unwelcome remarks at passing students between 6 PM - 9 PM.', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80', 28.542100, 77.401200, 'University North Gate Perimeter, Block C', 'High', 'Under Review', 'Unverified', 'Identified group loitering and harassment pattern in university vicinity.'),
(3, 2, 'Broken CCTV Camera at Pedestrian Subway', 'Broken CCTV', 'The surveillance camera dome at entrance B of the pedestrian underpass has been physically damaged and dislodged.', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80', 28.529800, 77.382400, 'Metro Underpass Exit 3, Central Ring', 'Medium', 'Resolved', 'Authority Verified', 'Damaged surveillance module creating security blindspot.'),
(4, 2, 'Isolated Pathway with dense overgrown bushes', 'Isolated Area', 'The pedestrian shortcut connecting the residential complex to the main boulevard is overgrown with bushes and lacks sightlines.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80', 28.549200, 77.378900, 'Greenway Corridor Link, Sector 15A', 'Low', 'Verified', 'Community Verified', 'Secluded walkway with obstructed visibility.')
ON CONFLICT (id) DO NOTHING;

SELECT setval('reports_id_seq', (SELECT MAX(id) FROM reports));
