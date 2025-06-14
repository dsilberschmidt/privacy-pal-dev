
# 🧭 Development Branching Strategy – PrivacyPal

Este archivo documenta la estructura de ramas del proyecto y su propósito.

## 🌳 Ramas activas

### `stable-pre-versioned`
- Punto de restauración funcional antes de introducir almacenamiento versionado por hash y sitio.
- Contiene una versión confirmada que:
  - Guarda políticas con éxito
  - Tiene funcionalidad de análisis AIML opcional
  - Muestra correctamente en el popup
- Ideal para referencia, testing o futuras releases estables.

### `versioned-tracking`
- Rama experimental donde se implementa:
  - Almacenamiento de múltiples versiones por sitio
  - Comparación de hashes
  - Posibles sugerencias de acciones basadas en IA
- Puede tener errores o comportamientos no pulidos.
- Recomendada para desarrollo y mejora progresiva.

---

## 📌 Recomendaciones

- Los cambios funcionales deben validarse en `versioned-tracking` antes de fusionarse a `main`.
- Usar `stable-pre-versioned` como fallback confiable si se desea una demo o referencia estable.
- Mantener documentación de commits clara y granular.
