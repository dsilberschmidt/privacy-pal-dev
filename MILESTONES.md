
# 🏁 PrivacyPal – Milestones

Este archivo documenta los hitos clave alcanzados durante el desarrollo del proyecto.

---

## ✅ 2025-06-14 – Funcionalidad Básica Restaurada

Rama: `versioned-tracking`  
Commit base: previo a `feat: implement versioned storage of privacy policies by site and hash`

**Restauración exitosa de:**
- Guardado de políticas de privacidad al visitar URLs válidas
- Generación de resumen con AIMLAPI
- Visualización clara en el popup
- Botón Reset DB operativo
- Estructura de carpetas y manifiesto compatibles con Manifest V3

**Notas:**
- Confirmado funcionamiento real en `https://www.mozilla.org/en-US/privacy/`
- AIML analiza y muestra el resumen IA correctamente
- El hash y comparación de versiones queda pendiente para próximos pasos

---

## 🛣️ Próximos pasos sugeridos

- Agregar historial de versiones por sitio
- Comparación de análisis IA entre versiones
- Tab de análisis separado en el popup
- Sugerencias de acciones automáticas
