use quizo_db
select * from quizo_db
-- Insert sample users (teachers)
INSERT INTO users (username, password) VALUES
('john.smith', 'demo123'),
('sarah.jones', 'demo123'),
('mike.wilson', 'demo123');

-- Insert sample quizzes
INSERT INTO quizzes (title, description, teacher_id, created_at) VALUES
-- Basic Mathematics Quiz
('Introduction to Algebra', 'A basic quiz covering fundamental algebraic concepts including linear equations, variables, and simple operations.', 1, NOW()),

-- Science Quiz
('Basic Chemistry Concepts', 'Test your knowledge of atomic structure, periodic table, and chemical bonds. Suitable for high school students.', 1, NOW()),

-- History Quiz
('World War II Overview', 'Comprehensive quiz covering major events, key figures, and important dates of World War II.', 2, NOW()),

-- Literature Quiz
('Shakespeare\'s Famous Works', 'Test your knowledge about Shakespeare\'s most famous plays, characters, and quotes.', 2, NOW()),

-- Geography Quiz
('World Capitals and Countries', 'Challenge yourself with questions about world capitals, countries, and their locations.', 3, NOW()),

-- Computer Science Quiz
('Programming Basics', 'Basic concepts of programming including variables, loops, and conditional statements.', 3, NOW()),

-- Biology Quiz
('Human Anatomy Basics', 'Essential questions about human body systems, organs, and their functions.', 1, NOW()),

-- Physics Quiz
('Newton\'s Laws of Motion', 'Test your understanding of the three laws of motion and their applications.', 2, NOW()),

-- English Grammar Quiz
('Advanced Grammar Rules', 'Challenging questions about complex grammar rules, punctuation, and sentence structure.', 3, NOW()),

-- Music Theory Quiz
('Music Theory Fundamentals', 'Basic concepts of music theory including notes, scales, and chord progressions.', 1, NOW());

-- Add some more specific subject quizzes
INSERT INTO quizzes (title, description, teacher_id, created_at) VALUES
-- Mathematics - Advanced
('Calculus Fundamentals', 'Covers derivatives, integrals, and limits. Designed for advanced high school students.', 1, NOW()),

-- Science - Environmental
('Environmental Science', 'Topics include climate change, ecosystems, and environmental conservation.', 2, NOW()),

-- Technology
('Web Development Basics', 'HTML, CSS, and JavaScript fundamentals for beginners.', 3, NOW()),

-- Social Studies
('Ancient Civilizations', 'Explore the history of Egyptian, Greek, and Roman civilizations.', 1, NOW()),

-- Art History
('Renaissance Art', 'Test your knowledge about major Renaissance artists and their famous works.', 2, NOW());
