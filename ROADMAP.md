
# 🗺️ PrivacyPal – Roadmap (`versioned-tracking`)

Esta hoja de ruta define los próximos objetivos de desarrollo experimental en la rama `versioned-tracking`.

---

## 🧩 Objetivo general

Permitir seguimiento, comparación y acción sobre cambios en políticas de privacidad de manera 100% local, segura y asistida por IA.

---

## 🧱 Etapas próximas

### 1. Guardado de múltiples versiones por URL o dominio
- [ ] Permitir guardar una política si su `hash` es distinto al anterior
- [ ] Asociar `previousHash` si existe
- [ ] Agregar timestamp de cada versión

### 2. Comparación de versiones
- [ ] Detectar cambios entre la política actual y su versión anterior
- [ ] Resaltar nuevos párrafos o frases eliminadas
- [ ] Mostrar resumen de cambios clave

### 3. Tab de análisis
- [ ] Crear un tab o sección visual para IA
- [ ] Mostrar los resúmenes AIML anteriores y actuales
- [ ] Mostrar diferencias entre resúmenes

### 4. Sugerencias de acción
- [ ] Detectar condiciones de riesgo (ej. retención indefinida, cesión a terceros)
- [ ] Mostrar botones como:
    - “Solicitar eliminación de datos”
    - “Desuscribirme”
    - “Enviar este email legal”

---

## 🧪 Extras opcionales

- [ ] Guardado selectivo: solo al aceptar términos (botón de consentimiento)
- [ ] Exportar histórico de políticas como texto o JSON
- [ ] Notificaciones locales si una política cambió

---

## 📌 Seguimiento

Esta hoja de ruta debe actualizarse conforme se completen etapas o se ajusten prioridades.
