# TC-REG-001: Suite de Regresión Completa

## Información General

- **ID**: TC-REG-001
- **Módulo**: Regresión
- **Prioridad**: P0 - Crítico
- **Tipo**: Suite de Regresión
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Suite completa de regresión que debe ejecutarse antes de cada release o después de cambios significativos en el sistema. Incluye los casos de prueba más críticos de todos los módulos.

## Cuándo Ejecutar Esta Suite

- ✅ Antes de cada release a producción
- ✅ Después de cambios en código core (controladores, modelos)
- ✅ Después de cambios en base de datos
- ✅ Después de actualización de dependencias
- ✅ Semanalmente (regresión programada)
- ⚠️ Después de hotfixes críticos

## Tiempo Estimado

- **Ejecución Manual**: 2-3 horas
- **Ejecución Automatizada**: 15-30 minutos (futuro)

## Precondiciones

1. Ambiente de testing limpio
2. Base de datos con datos de prueba estándar
3. Todos los usuarios de prueba creados
4. Navegador actualizado
5. Sin procesos en background que afecten performance

## Suite de Casos de Prueba

---

## MÓDULO 1: TESORERÍA (30 min)

### TC-TES-001: Ingreso a Tesorería
- **Prioridad**: P0
- **Tiempo**: 10 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-TES-002: Retiro de Tesorería
- **Prioridad**: P0
- **Tiempo**: 10 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-TES-003: Validaciones de Saldo
- **Prioridad**: P1
- **Tiempo**: 5 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-TES-004: Historial de Retiros
- **Prioridad**: P1
- **Tiempo**: 5 min
- **Estado**: [ ]
- **Notas**: _____________________

---

## MÓDULO 2: CAJA (20 min)

### TC-CAJ-001: Ingreso a Caja
- **Prioridad**: P0
- **Tiempo**: 5 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-CAJ-002: Egreso de Caja
- **Prioridad**: P0
- **Tiempo**: 5 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-CAJ-003: Movimientos de Caja
- **Prioridad**: P1
- **Tiempo**: 10 min
- **Estado**: [ ]
- **Notas**: _____________________

---

## MÓDULO 3: SOLICITUDES (25 min)

### TC-SOL-001: Crear Solicitud
- **Prioridad**: P0
- **Tiempo**: 5 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-SOL-002: Aprobar Solicitud
- **Prioridad**: P0
- **Tiempo**: 10 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-SOL-003: Descartar Solicitud
- **Prioridad**: P1
- **Tiempo**: 5 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-SOL-004: Filtros y Búsqueda
- **Prioridad**: P2
- **Tiempo**: 5 min
- **Estado**: [ ]
- **Notas**: _____________________

---

## MÓDULO 4: USUARIOS Y PERMISOS (30 min)

### TC-USR-001: Permisos Cristal
- **Prioridad**: P0
- **Tiempo**: 10 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-USR-002: Permisos Superadmin
- **Prioridad**: P0
- **Tiempo**: 10 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-USR-003: Permisos Vendedor
- **Prioridad**: P1
- **Tiempo**: 5 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-USR-004: Dashboard Personalizado
- **Prioridad**: P1
- **Tiempo**: 5 min
- **Estado**: [ ]
- **Notas**: _____________________

---

## MÓDULO 5: INTEGRACIÓN (45 min)

### TC-INT-001: Flujo Completo Ingreso
- **Prioridad**: P0
- **Tiempo**: 20 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-INT-002: Flujo Completo Retiro
- **Prioridad**: P0
- **Tiempo**: 15 min
- **Estado**: [ ]
- **Notas**: _____________________

### TC-INT-003: Flujo Solicitud-Aprobación
- **Prioridad**: P0
- **Tiempo**: 10 min
- **Estado**: [ ]
- **Notas**: _____________________

---

## MÓDULO 6: SMOKE TESTS (10 min)

### Login y Navegación Básica
- [ ] Login exitoso con cada usuario
- [ ] Navegación entre páginas sin errores
- [ ] Logout exitoso

### Carga de Páginas
- [ ] Dashboard carga en < 2 segundos
- [ ] Movimientos de caja carga en < 2 segundos
- [ ] Tesorería carga en < 2 segundos
- [ ] Solicitudes carga en < 2 segundos

### Visualización de Datos
- [ ] Saldos se muestran correctamente
- [ ] Tablas se cargan con datos
- [ ] Formato de números es correcto
- [ ] Fechas se muestran correctamente

---

## MÓDULO 7: PRUEBAS NEGATIVAS (15 min)

### Validaciones
- [ ] No se puede ingresar monto negativo
- [ ] No se puede ingresar monto mayor al saldo
- [ ] No se puede dejar concepto vacío
- [ ] No se puede enviar formulario sin datos

### Seguridad
- [ ] Usuario sin permisos no puede retirar de tesorería
- [ ] Usuario sin permisos no puede aprobar solicitudes
- [ ] Validaciones backend funcionan (no se pueden bypassear)

### Manejo de Errores
- [ ] Errores de red se manejan correctamente
- [ ] Errores de base de datos se manejan correctamente
- [ ] Mensajes de error son claros

---

## MÓDULO 8: CROSS-BROWSER (20 min)

### Chrome
- [ ] Todas las funcionalidades funcionan
- [ ] Formato de números correcto
- [ ] Modales funcionan

### Firefox
- [ ] Todas las funcionalidades funcionan
- [ ] Formato de números correcto
- [ ] Modales funcionan

### Edge
- [ ] Todas las funcionalidades funcionan
- [ ] Formato de números correcto
- [ ] Modales funcionan

---

## MÓDULO 9: RESPONSIVE (15 min)

### Desktop (1920x1080)
- [ ] Layout correcto
- [ ] Todos los elementos visibles
- [ ] Funcionalidad completa

### Tablet (768x1024)
- [ ] Layout se adapta
- [ ] Elementos accesibles
- [ ] Funcionalidad completa

### Mobile (375x667)
- [ ] Layout en columna única
- [ ] Botones accesibles
- [ ] Funcionalidad completa

---

## Resumen de Ejecución

### Estadísticas

| Módulo | Total | Pass | Fail | Blocked | Skip |
|--------|-------|------|------|---------|------|
| Tesorería | 4 | - | - | - | - |
| Caja | 3 | - | - | - | - |
| Solicitudes | 4 | - | - | - | - |
| Usuarios | 4 | - | - | - | - |
| Integración | 3 | - | - | - | - |
| Smoke Tests | 12 | - | - | - | - |
| Negativas | 9 | - | - | - | - |
| Cross-Browser | 9 | - | - | - | - |
| Responsive | 9 | - | - | - | - |
| **TOTAL** | **57** | **-** | **-** | **-** | **-** |

### Resultado Final

- **Estado**: ⏸️ Pendiente
- **% Éxito**: -
- **Bloqueadores**: -
- **Recomendación**: -

---

## Criterios de Aprobación

Para aprobar el release, se deben cumplir:

- ✅ **100% de casos P0 pasan** (crítico)
- ✅ **95% de casos P1 pasan** (alto)
- ✅ **No hay bloqueadores** (bugs que impiden funcionalidad core)
- ✅ **Performance aceptable** (< 2 segundos para operaciones principales)
- ✅ **Sin errores de consola** (JavaScript)
- ✅ **Sin errores de PHP** (warnings, notices)

## Criterios de Rechazo

Se rechaza el release si:

- ❌ Algún caso P0 falla
- ❌ Más del 10% de casos P1 fallan
- ❌ Existen bloqueadores sin resolver
- ❌ Performance inaceptable (> 5 segundos)
- ❌ Errores críticos de seguridad

## Bugs Encontrados

| ID | Descripción | Severidad | Estado | Asignado a |
|----|-------------|-----------|--------|------------|
| - | - | - | - | - |

## Notas de Ejecución

_Espacio para notas del tester durante la ejecución_

---

## Recomendaciones Post-Ejecución

### Si TODO pasa (100%)
- ✅ Aprobar release
- ✅ Documentar en changelog
- ✅ Notificar a stakeholders

### Si hay fallos menores (< 5% P1/P2)
- ⚠️ Aprobar con reservas
- ⚠️ Crear tickets para fallos
- ⚠️ Planificar fixes para próximo sprint

### Si hay fallos críticos (P0)
- ❌ Rechazar release
- ❌ Crear tickets urgentes
- ❌ Re-ejecutar suite después de fixes

---

## Historial de Ejecuciones

| Fecha | Ejecutor | Total | Pass | Fail | % Éxito | Resultado | Notas |
|-------|----------|-------|------|------|---------|-----------|-------|
| - | - | - | - | - | - | - | - |

---

## Checklist Pre-Ejecución

Antes de comenzar la suite, verificar:

- [ ] Ambiente de testing está limpio
- [ ] Base de datos tiene datos de prueba
- [ ] Usuarios de prueba existen
- [ ] Navegador actualizado
- [ ] Sin procesos en background
- [ ] Conexión a internet estable
- [ ] Tiempo suficiente (2-3 horas)
- [ ] Herramientas de captura de pantalla listas

## Checklist Post-Ejecución

Después de completar la suite:

- [ ] Todos los casos documentados
- [ ] Screenshots de fallos capturados
- [ ] Bugs reportados en sistema
- [ ] Resumen enviado a equipo
- [ ] Recomendación documentada
- [ ] Ambiente limpiado
