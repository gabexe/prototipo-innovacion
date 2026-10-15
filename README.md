# Prototipo Proyecto Vivo UBP — SPA Interactiva Responsive

> **Universidad Blas Pascal (UBP) · Córdoba, Argentina**  
> *"Tu idea no termina con la nota"*: Plataforma para continuar proyectos de cátedra y acreditarlos como alternativa a la tesis de grado o práctica profesional supervisada.

---

## 📱 Diseño y Presentación

- **Diseño Fiel al Prototipo Inicial**: Basado en las 4 pantallas oficiales del prototipo UBP con su paleta de colores institucional (`#9E1B34` borravino UBP, `#FFCD00` amarillo oro, `#2F6B4F` verde aprobado, `#1F4E8C` azul marino y `#F6F3EF` fondo cálido) y tipografía **Figtree**.
- **Visualización en Dispositivos Móviles**: La app se adapta al 100% de la pantalla del smartphone de forma fluida y nativa con navegación ergonómica en la barra inferior (Bottom Navigation Bar).
- **Simulador de Smartphone para Pantallas de Escritorio (Desktop)**: En pantallas de PC y notebooks, la aplicación se muestra centrada dentro de un elegante marco de smartphone (390 × 844 px) con Dynamic Island / notch superior, barra de estado y controles auxiliares para probar la experiencia móvil exacta.
- **Interacción Completa**: Formulario funcional, cronograma dinámico con progreso en tiempo real, modales nativos `<dialog>` para marcar hitos y agendar charlas con mentores egresados de la UBP, y selección de continuidad para la presentación final.
- **Persistencia Local**: Guarda el estado del proyecto en `localStorage` del navegador con botón de reinicio en cualquier momento.

---

## 🚀 Las 4 Pantallas del Prototipo

1. **Subí tu proyecto (`#inicio`)**: Formulario para cargar nombre, materia de origen, modalidad (*Alternativa a tesis* o *Práctica profesional*) y subida del PDF entregado.
2. **Hitos y avisos (`#hitos`)**: Panel del proyecto con punto de control semanal, barra de avance porcentual y lista de los 5 hitos académicos (*Problema validado*, *Prototipo testeado*, *Análisis de mercado*, *Plan de negocio*, *Presentación final*). Hacé clic en cualquier hito para abrir el modal interactivo de aprobación.
3. **La traba: Mentor UBP (`#mentores`)**: Red de graduados UBP clasificados por categorías (*Técnico, Legal, Financiero, Comercial*). Tarjeta de mentor sugerido con botón "Pedir una charla" para agendar el encuentro.
4. **Presentación final (`#final`)**: Pantalla de proyecto listo para presentar tras cumplir los hitos, con opciones de continuidad (*Seguir como emprendimiento con DoingLABS* o *Iniciativa de impacto*) y botón para agendar la fecha ante el tribunal académico.

---

## 💻 Cómo Ejecutar en Local

```bash
# Entrar a la carpeta del proyecto
cd /home/gabel/.gemini/antigravity-ide/scratch/proyecto-vivo-ubp

# Iniciar servidor estático con Python 3:
python3 -m http.server 3344

# Abrir en el navegador:
# http://localhost:3344
```

---

## 🌐 Cómo Subir a GitHub Pages

1. Inicializar git y subir al repositorio:
   ```bash
   git init
   git add .
   git commit -m "Prototipo interactivo Proyecto Vivo UBP"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/proyecto-vivo-ubp.git
   git push -u origin main
   ```
2. En GitHub, ingresar a **Settings > Pages**.
3. En **Build and deployment > Source**, seleccionar **Deploy from a branch**.
4. Seleccionar la rama `main` y la carpeta `/ (root)`. Guardar.
5. El sitio estará disponible en `https://<tu-usuario>.github.io/proyecto-vivo-ubp/`.
