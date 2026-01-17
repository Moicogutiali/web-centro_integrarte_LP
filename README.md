
# INTEGRARSE - Centro de Conciliación y Arbitraje

Plataforma profesional para el acceso a la justicia en Bolivia.

## 🚀 Instrucciones para Despliegue

### 1. Preparar el Repositorio
Crea un nuevo repositorio en tu cuenta de GitHub y ejecuta los siguientes comandos en la carpeta de este proyecto:

```bash
git init
git add .
git commit -m "🚀 Initial deploy INTEGRARSE"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

### 2. Configurar Supabase
1. Crea un proyecto en [Supabase](https://supabase.com).
2. Ve a **Project Settings > API** y copia la `Project URL` y la `anon public key`.
3. Ve al **SQL Editor** y pega el contenido del archivo `SUPABASE_SCHEMA.sql` para crear las tablas automáticamente.

### 3. Conectar con Vercel
1. Inicia sesión en [Vercel](https://vercel.com).
2. Haz clic en **"Add New"** > **"Project"**.
3. Selecciona tu repositorio de GitHub.
4. **IMPORTANTE**: En la sección de **Environment Variables**, añade:
   - `API_KEY`: Tu llave de API de Google Gemini.
   - `SUPABASE_URL`: La URL de tu proyecto de Supabase.
   - `SUPABASE_ANON_KEY`: La llave anónima de tu proyecto de Supabase.
5. Haz clic en **"Deploy"**.

## 🛠️ Tecnologías Utilizadas
- **React 19** & **TypeScript**
- **Vite** (Build Tool)
- **Supabase** (Database & Auth)
- **Google Gemini API** (IA Assistant)
- **Tailwind CSS** (Styling)

