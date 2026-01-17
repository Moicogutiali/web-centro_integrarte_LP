
-- Habilitar extensión de UUID si no está (opcional en versiones nuevas)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Cursos
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  full_name TEXT NOT NULL,
  ci TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Casos (Conciliación/Arbitraje)
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT,
  user_email TEXT,
  query TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Datos iniciales para cursos
DELETE FROM courses; 
INSERT INTO courses (title, tag, instructor, date_string, time_string, price, is_free, img_url)
VALUES 
('Diplomado en Conciliación Extrajudicial', 'DIPLOMADO', 'Dr. Juan Pérez', '15 de Octubre, 2024', '18:30 - 21:30', '1.200 BS', false, 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=800'),
('Taller de Arbitraje Comercial y Civil', 'TALLER', 'Dra. Maria Lopez', '02 de Noviembre, 2024', '09:00 - 12:00', '450 BS', false, 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'),
('Seminario: Ética en la Función Judicial', 'SEMINARIO', 'Lic. Carlos Ruiz', '10 de Noviembre, 2024', '19:00 - 20:30', 'Gratis', true, 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800');

-- SEGURIDAD (Row Level Security)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_consultations ENABLE ROW LEVEL SECURITY;

-- Políticas para COURSES (Público puede leer)
CREATE POLICY "Todo el mundo puede ver los cursos" ON courses FOR SELECT USING (true);

-- Políticas para COURSE_REGISTRATIONS (Público puede enviar, Solo admin puede ver)
CREATE POLICY "Público puede inscribirse" ON course_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Solo admins pueden ver inscripciones" ON course_registrations FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para CASES (Público puede enviar, Solo admin puede ver/gestionar)
CREATE POLICY "Público puede registrar casos" ON cases FOR INSERT WITH CHECK (true);
CREATE POLICY "Solo admins pueden gestionar casos" ON cases FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para AI_CONSULTATIONS (Público puede enviar, Solo admin puede ver)
CREATE POLICY "Público puede realizar consultas IA" ON ai_consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Solo admins pueden ver consultas IA" ON ai_consultations FOR ALL USING (auth.role() = 'authenticated');
