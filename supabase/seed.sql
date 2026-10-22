-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query)
-- for a fresh project. Creates the four content tables, enables RLS with a
-- public-read / authenticated-write policy on each, and seeds them with the
-- content that currently lives in src/data/*.ts.
--
-- After running this: Authentication -> Users -> Add user (create your one
-- admin login), then Authentication -> Settings -> disable "Allow new users
-- to sign up" (there's no registration page in the app anyway).

-- ============================================================
-- Tables
-- ============================================================

create table public.profile (
  id text primary key default 'default' check (id = 'default'),
  name text not null,
  first_name text not null,
  last_name text not null,
  initials text not null,
  role text not null,
  discipline text not null,
  location text not null,
  timezone text not null,
  email text not null,
  photo_home text not null,
  photo_lanyard text not null,
  available text not null,
  intro text not null,
  bio text[] not null default '{}',
  resume_url text not null,
  socials jsonb not null default '[]'
);

create table public.projects (
  slug text primary key,
  index text not null,
  title text not null,
  category text not null,
  year text not null,
  role text not null,
  summary text not null,
  description text[] not null default '{}',
  stack text[] not null default '{}',
  contributions text[] not null default '{}',
  cover text,
  gallery text[],
  web_url text,
  youtube_url text,
  repo_url text,
  docs_url text,
  featured boolean not null default false,
  sort_order int not null default 0
);

create table public.experience (
  id text primary key,
  period text not null,
  role text not null,
  org text not null,
  location text not null,
  description text not null,
  sort_order int not null default 0
);

create table public.certifications (
  id text primary key,
  title text not null,
  issuer text not null,
  year text not null,
  category text not null,
  image text,
  credential_id text,
  description text not null,
  url text,
  sort_order int not null default 0
);

-- ============================================================
-- Row Level Security: public read, authenticated (the one admin) write
-- ============================================================

alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.experience enable row level security;
alter table public.certifications enable row level security;

create policy "profile_public_read" on public.profile
  for select to anon, authenticated using (true);
create policy "profile_admin_write" on public.profile
  for all to authenticated using (true) with check (true);

create policy "projects_public_read" on public.projects
  for select to anon, authenticated using (true);
create policy "projects_admin_write" on public.projects
  for all to authenticated using (true) with check (true);

create policy "experience_public_read" on public.experience
  for select to anon, authenticated using (true);
create policy "experience_admin_write" on public.experience
  for all to authenticated using (true) with check (true);

create policy "certifications_public_read" on public.certifications
  for select to anon, authenticated using (true);
create policy "certifications_admin_write" on public.certifications
  for all to authenticated using (true) with check (true);

-- ============================================================
-- Seed data
-- ============================================================

insert into public.profile
  (id, name, first_name, last_name, initials, role, discipline, location, timezone, email,
   photo_home, photo_lanyard, available, intro, bio, resume_url, socials)
values (
  'default',
  'Natanael Vine Djapri',
  'Natanael',
  'Vine Djapri',
  'NVD',
  'Fullstack Developer',
  'Informatics Engineering, Tarumanagara University',
  'Jakarta, Indonesia',
  'GMT+7',
  'natanaelvinedj@gmail.com',
  '/images/PIC2.jpeg',
  '/images/PIC2.jpeg',
  'Open To Internship & Entry Level Jobs',
  'Motivated second-year Informatics Engineering student at Tarumanagara University with strong problem-solving, critical thinking, and communication skills, passionate about technology and continuous learning.',
  ARRAY[
    'My name is Natanael Vine Djapri, an undergraduate Informatics Engineering student at Tarumanagara University. I have a strong interest in software development, and artificial intelligence, especially in developing practical digital solutions for real-world problems.',
    'My experience comes mainly from academic and personal projects, where I have worked on full-stack applications, educational technology, and business digitalization. I particularly enjoy developing practical applications while exploring how AI can be integrated to create smarter and more useful solutions.',
    'I''m always looking to improve my technical skills and learn new technologies. My goal is to grow as a software engineer and contribute to projects that create meaningful and practical solutions'
  ],
  '/resume/natanael-vine-djapri-cv.pdf',
  '[
    {"label": "GitHub", "handle": "NatanaelVineDjapri", "url": "https://github.com/NatanaelVineDjapri"},
    {"label": "LinkedIn", "handle": "natanael-vine-djapri", "url": "https://www.linkedin.com/in/natanael-vine-djapri-595800344/"},
    {"label": "Instagram", "handle": "natanaellvd", "url": "https://www.instagram.com/natanaellvd/"},
    {"label": "Email", "handle": "natanaelvinedj@gmail.com", "url": "mailto:natanaelvinedj@gmail.com"}
  ]'::jsonb
);

insert into public.projects
  (slug, index, title, category, year, role, summary, description, stack, contributions,
   cover, gallery, web_url, youtube_url, repo_url, docs_url, featured, sort_order)
values
(
  'cbt-akademis-ai', '01', 'CBT Akademis AI', 'Computer-Based Testing Platform (CBT)', '2026', 'Lead Fullstack Developer',
  'CBT Akademis AI is a Computer-Based Test system designed to assist universities in managing digital examination processes. The system features automated grading and basic AI-based analysis to help lecturers evaluate student performance more efficiently and in a structured manner.',
  ARRAY[
    'CBT Akademis AI is a centralized digital examination platform designed to streamline the entire examination process, from question creation and exam scheduling to participant management, grading, and result reporting. The platform is built to provide a secure, scalable, and efficient digital examination experience for both administrators and participants.',
    'The system features AI-powered question generation, real-time exam monitoring, automatic grading for objective questions, manual essay evaluation, and real-time communication using WebSockets. It also integrates with academic and learning systems to streamline exam management and the handling of examination results across platforms.'
  ],
  ARRAY['Laravel', 'Next.js', 'PostgreSQL', 'Python', 'WebSocket'],
  ARRAY[
    'Developed and deployed a full-stack CBT platform using Laravel and Next.js.',
    'Implemented RESTful APIs, AI-powered proctoring services, PostgreSQL integration, and real-time WebSocket communication.',
    'Led end-to-end system development, including frontend, backend, deployment, environment configuration, and system integration.'
  ],
  '/images/cbt-akademis-ai/sprint%201/Dashbaord%20Mahasiswa%202.png',
  ARRAY[
    '/images/cbt-akademis-ai/sprint%201/Dashbaord%20Mahasiswa%202.png',
    '/images/cbt-akademis-ai/sprint%201/Dashboard%20Admin%201.png',
    '/images/cbt-akademis-ai/sprint%201/Dashboard%20Admin%202.png',
    '/images/cbt-akademis-ai/sprint%201/Dashboard%20Dosen%202.png',
    '/images/cbt-akademis-ai/sprint%201/Dashboard%20Mahasiswa.png',
    '/images/cbt-akademis-ai/sprint%201/Dashboard%20dosen%201.png',
    '/images/cbt-akademis-ai/sprint%201/Login%20Page.png',
    '/images/cbt-akademis-ai/sprint%201/Register%20Page.jpeg',
    '/images/cbt-akademis-ai/sprint%201/Role%20Management.png',
    '/images/cbt-akademis-ai/sprint%202/Create%20Soal%20Checkbox.png',
    '/images/cbt-akademis-ai/sprint%202/Create%20Soal%20Essay.png',
    '/images/cbt-akademis-ai/sprint%202/Create%20Soal%20Pilgan.png',
    '/images/cbt-akademis-ai/sprint%202/Create%20Ujian%201.png',
    '/images/cbt-akademis-ai/sprint%202/Create%20Ujian%202.png',
    '/images/cbt-akademis-ai/sprint%202/Create%20Ujian%203.png',
    '/images/cbt-akademis-ai/sprint%202/Create%20Ujian%204.png',
    '/images/cbt-akademis-ai/sprint%202/Dashboard%20Admin%203.png',
    '/images/cbt-akademis-ai/sprint%202/Dashboard%20Admin%204.png',
    '/images/cbt-akademis-ai/sprint%202/Dashboard%20Dosen%203.png',
    '/images/cbt-akademis-ai/sprint%202/Kelola%20Bank%20Soal.png',
    '/images/cbt-akademis-ai/sprint%202/Kelola%20Ujian.png',
    '/images/cbt-akademis-ai/sprint%202/import%20soal.png',
    '/images/cbt-akademis-ai/sprint%203/Hasil%20Ujian%20(dosen%20pov).png',
    '/images/cbt-akademis-ai/sprint%203/Hasil%20Ujian%20(mahasiswa%20pmb).png',
    '/images/cbt-akademis-ai/sprint%203/Hasil%20Ujian%20Mahasiswa%20(detail).png',
    '/images/cbt-akademis-ai/sprint%203/Rekap%20nilai%20di%20dosen.png',
    '/images/cbt-akademis-ai/sprint%203/Rekap%20nilai%20didosen%20(detail%20per%20murid).png',
    '/images/cbt-akademis-ai/sprint%203/Ujian%20CBT.png',
    '/images/cbt-akademis-ai/sprint%203/pop%20up%20waktu%20habis.png',
    '/images/cbt-akademis-ai/sprint%204/Activity%20Log%20Peserta%201.png',
    '/images/cbt-akademis-ai/sprint%204/Activity%20Log%20Peserta%202.png',
    '/images/cbt-akademis-ai/sprint%204/Activity%20Log%20Peserta%203.png',
    '/images/cbt-akademis-ai/sprint%204/Activity%20Log.png',
    '/images/cbt-akademis-ai/sprint%204/Create%20Soal%20(AI).png',
    '/images/cbt-akademis-ai/sprint%204/Dashboard%20Monitoring%20Dosen.png',
    '/images/cbt-akademis-ai/sprint%204/Hasil%20Generate%20Soal%20AI.png',
    '/images/cbt-akademis-ai/sprint%204/Proctoring%20Warning.png',
    '/images/cbt-akademis-ai/sprint%205/Deploy%20(Dosen).png',
    '/images/cbt-akademis-ai/sprint%205/Deploy(admin).png',
    '/images/cbt-akademis-ai/sprint%205/Deploy(buat%20ujian).png',
    '/images/cbt-akademis-ai/sprint%205/Deploy.png'
  ],
  'https://cbtakademis-ai.my.id/', null, 'https://github.com/NatanaelVineDjapri/CBT-Akademis-AI',
  'https://journal.untar.ac.id/index.php/jiksi/article/view/38604', true, 0
),
(
  'rajawali-plastik-digihub', '02', 'Rajawali Plastik', 'Operational Digital Platform', '2025', 'Fullstack Developer',
  'DigiHub platform that streamlines inventory, sales, and distribution processes within a single integrated system.',
  ARRAY[
    'DigiHub is a digital platform built to simplify inventory, sales, and distribution management at Rajawali Plastik.',
    'Core business modules were designed and integrated to improve operational efficiency and data accessibility, with Laravel on the backend and Next.js on the frontend.'
  ],
  ARRAY['Laravel', 'Next.js', 'MySQL'],
  ARRAY[
    'Built a digital platform to streamline inventory, sales, and distribution processes.',
    'Designed and integrated core business modules for operational efficiency and data accessibility.',
    'Oversaw frontend development, backend integration, and deployment throughout the project lifecycle.'
  ],
  '/images/rajawaliplastic/page/rajawaliplastic-page-01.png',
  ARRAY[
    '/images/rajawaliplastic/page/rajawaliplastic-page-01.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-02.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-03.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-04.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-05.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-06.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-07.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-08.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-09.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-10.png',
    '/images/rajawaliplastic/page/rajawaliplastic-page-11.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-01.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-02.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-03.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-04.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-05.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-06.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-07.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-08.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-09.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-10.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-11.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-12.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-13.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-14.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-15.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-16.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-17.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-18.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-19.png',
    '/images/rajawaliplastic/dashboard/rajawaliplastic-dashboard-20.png'
  ],
  'https://rajawali-plastic.vercel.app/', null, 'https://github.com/NatanaelVineDjapri/RajawaliPlastic',
  null, true, 1
),
(
  'eggsplore-marketplace', '03', 'Eggsplore', 'Mobile Marketplace', '2025', 'Mobile Developer',
  'Mobile marketplace app with authentication, product management, a shopping cart, and a virtual balance system.',
  ARRAY[
    'Eggsplore is a mobile marketplace app inspired by modern e-commerce platforms, focused on an interactive and easy-to-use shopping experience.',
    'Core e-commerce functionality was built end-to-end: user authentication, product management, shopping cart, and a virtual balance system, with a RESTful API bridging the app to backend services.'
  ],
  ARRAY['Flutter', 'Dart', 'Laravel', 'MySQL'],
  ARRAY[
    'Developed a mobile marketplace app with an interactive shopping experience.',
    'Implemented user authentication, product management, shopping cart, and digital wallet features.',
    'Integrated a RESTful API for seamless communication between the mobile app and backend.'
  ],
  '/images/eggsplore/eggsplore.png', null, null, null,
  'https://github.com/NatanaelVineDjapri/Eggsplore_Marketplace', null, true, 2
),
(
  'cakraquiz', '07', 'CakraQuiz', 'Static Website', '2025', 'Frontend Developer',
  'A basic web development project built with HTML, CSS, and JavaScript, without any additional frameworks or libraries.',
  ARRAY[
    'This project is designed to teach basic web development using HTML, CSS, and JavaScript, without any additional frameworks or libraries. The focus is on understanding web structure, styling, and simple interactivity.'
  ],
  ARRAY['HTML', 'CSS', 'JavaScript'],
  ARRAY[
    'Built a quiz web app from scratch using vanilla HTML, CSS, and JavaScript.',
    'Focused on clean web structure, styling, and simple interactivity without relying on frameworks or libraries.'
  ],
  '/images/cakraquiz/Screenshot%202025-09-13%20170911.png',
  ARRAY[
    '/images/cakraquiz/Screenshot%202025-09-13%20170911.png',
    '/images/cakraquiz/Screenshot%202025-09-13%20171001.png',
    '/images/cakraquiz/Screenshot%202025-09-13%20171027.png',
    '/images/cakraquiz/Screenshot%202025-09-13%20171049.png',
    '/images/cakraquiz/Screenshot%202025-09-13%20171125.png',
    '/images/cakraquiz/Screenshot%202025-09-13%20172121.png',
    '/images/cakraquiz/Screenshot%202025-09-13%20172211.png',
    '/images/cakraquiz/Screenshot%202025-09-13%20172233.png',
    '/images/cakraquiz/Screenshot%202025-09-13%20172424.png',
    '/images/cakraquiz/Screenshot%202025-09-14%20160258.png'
  ],
  null, null, 'https://github.com/NatanaelVineDjapri/CakraQuiz', null, false, 3
),
(
  'pingy', '04', 'Pingy', 'Social Media Backend', '2025', 'Backend Developer',
  'A Twitter/X-style backend project built on Laravel 11 as a social media architecture exercise.',
  ARRAY[
    'Pingy is a backend project built with the Laravel 11 framework, inspired by the Twitter/X social media platform.',
    'The focus was on designing data relationships, the authentication flow, and timeline rendering, with Blade and JavaScript for the view layer.'
  ],
  ARRAY['Laravel 11', 'Blade', 'JavaScript', 'MySQL'],
  ARRAY[
    'Designed the database schema and relationships between social media entities.',
    'Built the authentication flow along with core posting and user interaction operations.',
    'Built the view layer using Blade and JavaScript.'
  ],
  '/images/pingy/pingy-1.png',
  ARRAY[
    '/images/pingy/pingy-1.png', '/images/pingy/pingy-2.png', '/images/pingy/pingy-3.png',
    '/images/pingy/pingy-4.png', '/images/pingy/pingy-5.png', '/images/pingy/pingy-6.png',
    '/images/pingy/pingy-7.png', '/images/pingy/pingy-8.png', '/images/pingy/pingy-9.png'
  ],
  null, 'https://youtu.be/q7D1Q1XeO-s?si=I7sJPNp0l41N6lL9', 'https://github.com/NatanaelVineDjapri/Pingy',
  null, true, 4
),
(
  'thecocktail-api-clone', '05', 'Cocktails API', 'REST API', '2025', 'Backend Developer',
  'A clone of the TheCocktailDB REST API, built as the midterm exam for the Backend Programming course.',
  ARRAY[
    'This project was the midterm exam for the Backend Programming course, which required building a REST API based on an existing public API.',
    'TheCocktailDB was used as the reference public API, and the implementation was built with Node.js and Express.js.'
  ],
  ARRAY['Node.js', 'Express.js'],
  ARRAY[
    'Designed the endpoint structure following the reference API''s contract.',
    'Implemented routing, controllers, and error handling with Express.js.',
    'Tested API responses against different request scenarios.'
  ],
  null, null, null, null, 'https://github.com/NatanaelVineDjapri/Cocktails_API', null, false, 5
),
(
  'cod-mobile-website', '06', 'Call of Duty Mobile', 'Static Website', '2024', 'Frontend Developer',
  'A Call of Duty Mobile-themed static website, built as an early exercise in layout and styling with pure HTML and CSS.',
  ARRAY[
    'This site was an early frontend exercise: building a Call of Duty Mobile-themed page layout using only HTML and CSS, without any framework.',
    'The exercise focused on clean document structure, visual hierarchy, and manually arranging components.'
  ],
  ARRAY['HTML', 'CSS'],
  ARRAY[
    'Built the page structure and visual hierarchy from scratch.',
    'Arranged components and basic responsiveness using pure CSS.'
  ],
  null, null, null, null, null, null, false, 6
),
(
  'akar-cerita', '08', 'AkarCerita', 'Cultural Storytelling Platform', '2025', 'Frontend Developer',
  'AkarCerita showcases Indonesian folklore by region, letting users explore local legends and myths through an interactive map.',
  ARRAY[
    'AkarCerita presents a curated collection of Indonesian folk tales, organized by province through an interactive map of Indonesia. Selecting a province surfaces the local legends tied to that region, each paired with a moral message.',
    'The platform also includes account features — users can log in, register, and bookmark their favorite stories to revisit later.'
  ],
  ARRAY['HTML', 'CSS', 'JavaScript'],
  ARRAY[
    'Built an interactive map of Indonesia where selecting a province reveals its local folklore.',
    'Implemented login, registration, and a bookmarking system so users can save favorite stories.',
    'Designed the story detail pages, including narrative content and a moral-message callout for each legend.'
  ],
  '/images/akarcerita/Screenshot%20(238).png',
  ARRAY[
    '/images/akarcerita/Screenshot%20(238).png', '/images/akarcerita/Screenshot%20(239).png',
    '/images/akarcerita/Screenshot%20(240).png', '/images/akarcerita/Screenshot%20(241).png',
    '/images/akarcerita/Screenshot%20(242).png', '/images/akarcerita/Screenshot%20(243).png',
    '/images/akarcerita/Screenshot%20(244).png', '/images/akarcerita/Screenshot%20(245).png',
    '/images/akarcerita/Screenshot%20(246).png', '/images/akarcerita/Screenshot%20(247).png'
  ],
  null, 'https://youtu.be/Pbg10KR22mo?si=3n0AzCE-5vaJh8d2', 'https://github.com/NatanaelVineDjapri/AkarCerita',
  null, false, 7
);

insert into public.experience (id, period, role, org, location, description, sort_order)
values
(
  'exp-high-school', '2021 - 2024', 'High School, Science Track', 'Budi Mulia Jakarta', 'Jakarta, Indonesia',
  'Completed secondary education in the Science Track.', 0
),
(
  'exp-03', 'Nov 2021 - Sep 2023', 'Head of Spiritual Affairs Division, OSIS', 'Student Council', 'Jakarta, Indonesia',
  'Organized spiritual activities such as prayer fellowships and religious holiday celebrations, designed and distributed digital content themed around religious values, and encouraged students to apply those values in daily life.', 1
),
(
  'exp-04', '2024 - 2028 (target)', 'Bachelor''s Degree in Informatics Engineering, Faculty of Information Technology',
  'Universitas Tarumanagara', 'Jakarta, Indonesia',
  'Undergraduate program in Informatics Engineering with a cumulative GPA of 3.98 out of 4.00. Relevant coursework includes Data Structures and Algorithms, Database Systems, Software Engineering, Big Data, Distributed Systems, Machine Learning, and Artificial Intelligence.', 2
),
(
  'exp-02', 'Dec 2024 - Jun 2025', 'Staff of Advocation & Legislation', 'Dewan Perwakilan Mahasiswa FTI UNTAR', 'Jakarta, Indonesia',
  'Received, documented, stored, and returned lost-and-found items while helping identify their owners, and carried out work programs based on responsibilities assigned to new members.', 3
),
(
  'exp-01', 'Mar 2025 - Sept 2026', 'Student Assistant, Quality Assurance and Audit Office', 'Universitas Tarumanagara', 'Jakarta, Indonesia',
  'Drafted and formatted SPMI (internal quality assurance) standards at the university and faculty level, managed and updated the office''s official website so all quality assurance documents stayed current, and handled other administrative tasks for the Head of Office.', 4
);

insert into public.certifications
  (id, title, issuer, year, category, image, credential_id, description, url, sort_order)
values
(
  'cert-data-fundamentals', 'Data Fundamentals', 'IBM', 'Aug 2026', 'Learning',
  '/images/certificates/cert-data-fundamentals.png', 'c3b778fe-a5cc-45ab-86b0-73fcf1efccd2',
  'IBM digital credential covering the fundamentals of working with data.',
  'https://www.credly.com/badges/c3b778fe-a5cc-45ab-86b0-73fcf1efccd2/public_url', 0
),
(
  'cert-gemini-educator', 'Gemini Certified Educator', 'Gemini', 'Aug 2026 – Aug 2029', 'Learning',
  '/images/certificates/cert-gemini-educator.png', '28c906f9-43fe-4441-b8bf-33482e6e2cac',
  'Google Gemini credential for educators, recognizing certified proficiency in applying Gemini in teaching.',
  'https://edu.google.accredible.com/28c906f9-43fe-4441-b8bf-33482e6e2cac#acc.JLyAn7mx', 1
),
(
  'cert-gemini-student', 'Gemini Certified Student', 'Gemini', 'Aug 2026 – Aug 2029', 'Learning',
  '/images/certificates/cert-gemini-student.png', '58eec94a-289d-43b7-95e0-a6316f9e8888',
  'Google Gemini credential for students, recognizing certified proficiency in using Gemini.',
  'https://edu.google.accredible.com/58eec94a-289d-43b7-95e0-a6316f9e8888#acc.kIHrQqVd', 2
),
(
  'cert-web-dev-fundamentals', 'Web Development Fundamentals', 'IBM', 'Aug 2026', 'Learning',
  '/images/certificates/cert-web-dev-fundamentals.png', 'de6c506f-d0a6-4660-a777-49ef7a85ceb0',
  'IBM digital credential covering the fundamentals of web development.',
  'https://www.credly.com/badges/de6c506f-d0a6-4660-a777-49ef7a85ceb0/public_url', 3
),
(
  'cert-fullstack-js-itbox', 'Advanced Full Stack JavaScript Web Developer', 'ITBOX', 'Aug 2026', 'Learning',
  '/images/certificates/cert-fullstack-js-itbox.png', '13EDAF87D-13EF97E2B-12D18789B',
  'ITBOX certification for advanced full-stack JavaScript web development.',
  'https://itbox.id/certificate-verifier/13EDAF87D-13EF97E2B-12D18789B/', 4
),
(
  'cert-sql-intermediate-sololearn', 'SQL Intermediate', 'Sololearn', 'Aug 2026', 'Learning',
  '/images/certificates/cert-sql-intermediate-sololearn.png', 'CC-SVVUGUWU',
  'Sololearn certification for intermediate-level SQL.',
  'https://www.sololearn.com/certificates/CC-SVVUGUWU', 5
),
(
  'cert-web-development-sololearn', 'Web Development', 'Sololearn', 'Aug 2026', 'Learning',
  '/images/certificates/cert-web-development-sololearn.png', 'CC-HPCWVTMI',
  'Sololearn certification covering web development fundamentals.',
  'https://www.sololearn.com/certificates/CC-HPCWVTMI', 6
),
(
  'cert-java-intermediate-sololearn', 'Java Intermediate', 'Sololearn', 'Nov 2024', 'Learning',
  '/images/certificates/cert-java-intermediate-sololearn.jpg', 'CC-GEKIEIZY',
  'Sololearn certification for intermediate-level Java.',
  'https://www.sololearn.com/certificates/CC-GEKIEIZY', 7
),
(
  'cert-intro-software-engineering', 'Intro to Software Engineering', 'RevoU', 'Aug 2026', 'Learning',
  '/images/certificates/cert-intro-software-engineering.png', 'CCSE-030826-01-1-00002',
  'RevoU course certificate introducing core software engineering concepts.',
  null, 8
),
(
  'cert-sql-intermediate-hackerrank', 'SQL (Intermediate) Certification', 'HackerRank', 'Jul 2026', 'Learning',
  '/images/certificates/cert-sql-intermediate-hackerrank.png', '42570EFF92FD',
  'HackerRank certification assessing intermediate-level SQL skills.',
  'https://www.hackerrank.com/certificates/iframe/42570eff92fd', 9
),
(
  'cert-software-engineer-hackerrank', 'Software Engineer Certification', 'HackerRank', 'Jul 2026', 'Learning',
  '/images/certificates/cert-software-engineer-hackerrank.png', '2A5EC41826CF',
  'HackerRank certification assessing general software engineering skills.',
  'https://www.hackerrank.com/certificates/iframe/2a5ec41826cf', 10
),
(
  'cert-rhcsa-rh134', 'Red Hat System Administration II (RH134 - RHA) - Ver. 9.3', 'Red Hat', 'Dec 2025', 'Learning',
  '/images/certificates/cert-rhcsa-rh134.png', 'df4cf297-6701-4a2f-8b2c-8e34a298af85',
  'Red Hat certification covering advanced Linux system administration, version 9.3.',
  'https://www.credly.com/badges/df4cf297-6701-4a2f-8b2c-8e34a298af85', 11
),
(
  'cert-rhcsa-rh124', 'Red Hat System Administration I (RH124 - RHA) - Ver. 9.3', 'Red Hat', 'Sep 2025', 'Learning',
  '/images/certificates/cert-rhcsa-rh124.png', 'b16455d3-bf4c-4885-abac-a77dada70ddb',
  'Red Hat certification covering foundational Linux system administration, version 9.3.',
  'https://www.credly.com/badges/b16455d3-bf4c-4885-abac-a77dada70ddb', 12
),
(
  'cert-ai-introduction-dicoding', 'AI Introduction Course', 'Dicoding Indonesia', 'Dec 2025 – Dec 2028', 'Learning',
  '/images/certificates/cert-ai-introduction-dicoding.png', 'JMZVV5EL3ZN9',
  'Dicoding Indonesia course certificate introducing artificial intelligence concepts.',
  'https://www.dicoding.com/certificates/JMZVV5EL3ZN9', 13
),
(
  'cert-volunteer-03', 'Welcoming Party Mentor', 'BEM FTI UNTAR', 'Sep 2025 · 1 mo', 'Volunteering',
  '/images/certificates/cert-volunteer-03.png', null,
  'Guided and engaged freshmen through interactive games and bonding activities during the faculty welcoming party, fostering teamwork, connection, and a welcoming environment among new students.',
  'https://www.linkedin.com/in/natanael-vine-djapri-595800344/overlay/VolunteerExperience/2146557228/treasury/?profileId=ACoAAFZCo0EBSvEZ1gmpkwaVzEzM0L1_cDSNGd0', 14
),
(
  'cert-volunteer-04', 'Deputy Coordinator, Equipment Division', 'DPM FTI UNTAR', 'Apr 2025 · 1 mo', 'Volunteering',
  '/images/certificates/cert-volunteer-04.png', null,
  'Coordinated equipment and logistics for a social outreach event at Panti Asuhan Hati Bangsa, supporting activities for children at the orphanage.',
  'https://www.linkedin.com/in/natanael-vine-djapri-595800344/overlay/VolunteerExperience/66872/treasury/?profileId=ACoAAFZCo0EBSvEZ1gmpkwaVzEzM0L1_cDSNGd0', 15
),
(
  'cert-award-humaniora-2026', '2nd Place Winner – Festival Humaniora 2026 (Scientific Article Category)',
  'Universitas Tarumanagara', 'Jun 2026', 'Award',
  '/images/certificates/cert-award-humaniora-2026.png', null,
  'Awarded 2nd Place in the Scientific Article category at the 2026 UNTAR Humaniora Festival. Collaborated on a mixed-methods study examining public moral perceptions of nepotism as a form of corrupt behavior, combining an online survey of 127 respondents with in-depth interviews of three participants from different socioeconomic backgrounds.',
  null, 16
);
