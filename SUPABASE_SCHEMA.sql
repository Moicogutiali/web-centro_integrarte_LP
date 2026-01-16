
-- Tabla de Cursos
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  tag TEXT,
  instructor TEXT,
  date_string TEXT,
  time_string TEXT,
  price TEXT,
  is_free BOOLEAN DEFAULT false,
  img_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Inscripciones a Cursos
CREATE TABLE IF NOT EXISTS course_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id),
  full_name TEXT NOT NULL,
  ci TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Casos (Conciliación/Arbitraje)
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  ci TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'En Revisión',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Consultas IA
CREATE TABLE IF NOT EXISTS ai_consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT,
  user_email TEXT,
  query TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Datos iniciales para cursos
INSERT INTO courses (title, tag, instructor, date_string, time_string, price, is_free, img_url)
VALUES 
('Diplomado en Conciliación Extrajudicial', 'DIPLOMADO', 'Dr. Juan Pérez', '15 de Octubre, 2024', '18:30 - 21:30', '1.200 BS', false, 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=800'),
('Taller de Arbitraje Comercial y Civil', 'TALLER', 'Dra. Maria Lopez', '02 de Noviembre, 2024', '09:00 - 12:00', '450 BS', false, 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'),
('Seminario: Ética en la Función Judicial', 'SEMINARIO', 'Lic. Carlos Ruiz', '10 de Noviembre, 2024', '19:00 - 20:30', 'Gratis', true, 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800');
