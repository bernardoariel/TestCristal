# TC-USR-003: Permisos de Usuario Vendedor

## Información General

- **ID**: TC-USR-003
- **Módulo**: Usuarios y Permisos
- **Prioridad**: P1 - Alto
- **Tipo**: Seguridad / Permisos
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que el usuario "vendedor" tiene permisos limitados correctos, puede realizar operaciones básicas pero NO puede retirar de tesorería ni aprobar solicitudes.

## Precondiciones

1. Usuario "vendedor" existe en la base de datos
2. Perfil asignado: Vendedor
3. Saldo en tesorería: $72.000.000,00
4. Saldo en caja: $100.000,00

## Datos de Prueba

- **Usuario**: vendedor
- **Contraseña**: [contraseña del usuario]
- **Perfil**: Vendedor

## Matriz de Permisos - Usuario Vendedor

| Funcionalidad | Permiso | Verificado |
|---------------|---------|------------|
| Ver dashboard | ✅ Sí | [ ] |
| Ingresar a caja | ✅ Sí | [ ] |
| Extraer de caja | ✅ Sí | [ ] |
| Ver movimientos de caja | ✅ Sí | [ ] |
| Ingresar a tesorería | ✅ Sí | [ ] |
| **Retirar de tesorería** | ❌ **NO** | [ ] |
| Ver movimientos de tesorería | ✅ Sí | [ ] |
| **Crear solicitud** | ✅ **Sí** | [ ] |
| **Aprobar solicitud** | ❌ **NO** | [ ] |
| **Descartar solicitud** | ❌ **NO** | [ ] |
| Ver solo sus solicitudes | ✅ Sí | [ ] |
| Ver historial de retiros | ✅ Sí | [ ] |
| Exportar a Excel | ✅ Sí | [ ] |
| Configuración básica | ❌ NO | [ ] |
| Configuración avanzada | ❌ NO | [ ] |
| Crear usuarios | ❌ NO | [ ] |
| Editar usuarios | ❌ NO | [ ] |
| Eliminar usuarios | ❌ NO | [ ] |

## Pasos de Ejecución

### Paso 1: Login
1. Navegar a la página de login
2. Ingresar usuario: vendedor
3. Ingresar contraseña
4. Hacer clic en "Ingresar"
5. **Resultado Esperado**: 
   - Login exitoso
   - Redirige a dashboard/inicio
   - Header muestra: "Usuario: vendedor"

### Paso 2: Verificar Dashboard Limitado
1. Observar el dashboard
2. **Resultado Esperado**: 
   - Dashboard personalizado para perfil "Vendedor"
   - Boxes visibles según configuración
   - Menos opciones que administrador

### Paso 3: Verificar Menú Limitado
1. Observar el menú lateral
2. **Resultado Esperado**: 
   - Menú con opciones básicas:
     - ✅ Inicio
     - ✅ Movimientos de caja
     - ✅ Tesorería (solo lectura)
     - ✅ Solicitudes (solo las propias)
     - ✅ Historial de retiros (solo lectura)
   - NO visible:
     - ❌ Configuración
     - ❌ Usuarios
     - ❌ Logs
     - ❌ Backup

### Paso 4: Verificar Operaciones en Caja (Permitidas)
1. Navegar a "Movimientos de caja"
2. **Resultado Esperado**: 
   - ✅ Puede ver saldo de caja
   - ✅ Botón "Ingresar" visible y funcional
   - ✅ Botón "Extraer" visible y funcional
   - ✅ Puede ver movimientos
   - ✅ Puede exportar a Excel

3. Probar "Ingresar a caja"
4. **Resultado Esperado**: 
   - Modal se abre
   - Puede ingresar dinero
   - Operación exitosa

5. Probar "Extraer de caja"
6. **Resultado Esperado**: 
   - Modal se abre
   - Puede extraer dinero (si hay saldo)
   - Operación exitosa

### Paso 5: Verificar Restricción en Tesorería (CRÍTICO)
1. Navegar a "Tesorería"
2. Observar box de Tesorería
3. **Resultado Esperado**: 
   - ✅ Puede ver saldo de tesorería
   - ✅ Botón "Ingresar" visible (puede transferir de caja a tesorería)
   - ❌ **Botón "Retirar" NO visible**
   - ✅ Botón "Solicitar" SÍ visible (debe solicitar en lugar de retirar)

4. Hacer clic en "Solicitar"
5. **Resultado Esperado**: 
   - Modal "Solicitar Retiro" se abre
   - Puede crear solicitud
   - Solicitud queda pendiente de aprobación

### Paso 6: Verificar Restricción en Solicitudes (CRÍTICO)
1. Navegar a "Solicitudes"
2. **Resultado Esperado**: 
   - ✅ Puede ver sus propias solicitudes
   - ❌ **NO puede ver solicitudes de otros usuarios**
   - ❌ **Botones "Aprobar" y "Descartar" NO visibles**
   - ✅ Puede crear nuevas solicitudes

3. Verificar tabs
4. **Resultado Esperado**: 
   - Tabs visibles: Pendientes, Aprobadas, Descartadas
   - Solo muestra SUS solicitudes en cada tab

### Paso 7: Verificar Historial de Retiros (Solo Lectura)
1. Navegar a "Historial de retiros"
2. **Resultado Esperado**: 
   - ✅ Puede ver historial completo
   - ✅ Puede filtrar por fechas
   - ✅ Puede exportar a Excel
   - ❌ NO puede crear retiros directamente

### Paso 8: Intentar Acceso a Configuración (Debe Fallar)
1. Intentar navegar a URL de configuración manualmente
2. Ejemplo: /index.php?ruta=configuracion
3. **Resultado Esperado**: 
   - ❌ Acceso denegado
   - Redirige a inicio o muestra error 403
   - Mensaje: "No tienes permisos para acceder a esta sección"

### Paso 9: Intentar Acceso a Usuarios (Debe Fallar)
1. Intentar navegar a URL de usuarios manualmente
2. Ejemplo: /index.php?ruta=usuarios
3. **Resultado Esperado**: 
   - ❌ Acceso denegado
   - Redirige a inicio o muestra error 403

### Paso 10: Verificar Badge de Usuario
1. Observar el header de la página
2. **Resultado Esperado**: 
   - Badge muestra: "Usuario: vendedor"
   - Badge tiene estilo distintivo

## Pruebas de Seguridad (CRÍTICAS)

### Prueba 1: Intentar Aprobar Solicitud (Backend)
1. Usar herramientas de desarrollador
2. Intentar enviar request AJAX para aprobar solicitud
3. **Resultado Esperado**: 
   - Backend rechaza la operación
   - Respuesta: "No tienes permisos"
   - Solicitud NO se aprueba

### Prueba 2: Intentar Retirar de Tesorería (Backend)
1. Intentar enviar request AJAX para retirar de tesorería
2. **Resultado Esperado**: 
   - Backend rechaza la operación
   - Respuesta: "No tienes permisos"
   - Retiro NO se crea

### Prueba 3: Intentar Ver Solicitudes de Otros
1. Intentar acceder a solicitud de otro usuario por ID
2. Ejemplo: /ajax/solicitudes.ajax.php?id=X
3. **Resultado Esperado**: 
   - Backend rechaza o filtra
   - Solo muestra sus propias solicitudes

## Comparación de Permisos

| Funcionalidad | Vendedor | Cristal | Superadmin |
|---------------|----------|---------|------------|
| Ingresar/Extraer caja | ✅ | ✅ | ✅ |
| Ingresar a tesorería | ✅ | ✅ | ✅ |
| **Retirar de tesorería** | ❌ | ✅ | ✅ |
| **Crear solicitud** | ✅ | ✅ | ✅ |
| **Aprobar solicitud** | ❌ | ✅ | ✅ |
| Ver todas las solicitudes | ❌ | ✅ | ✅ |
| Configuración | ❌ | ✅ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ✅ |

## Resultado Esperado Final

- ✅ vendedor tiene permisos limitados correctos
- ✅ Puede realizar operaciones básicas de caja
- ✅ Puede crear solicitudes
- ❌ NO puede retirar de tesorería directamente
- ❌ NO puede aprobar/descartar solicitudes
- ❌ Solo ve sus propias solicitudes
- ❌ NO tiene acceso a configuración
- ✅ Validaciones backend funcionan

## Casos de Prueba Relacionados

- TC-USR-001: Permisos de cristal
- TC-USR-002: Permisos de superadmin
- TC-SOL-001: Crear solicitud
- TC-TES-002: Retiro de tesorería

## Notas

- **CRÍTICO**: Las restricciones deben existir en frontend Y backend
- El frontend oculta botones, el backend valida permisos
- vendedor representa el usuario con menos permisos
- Es el perfil más común en el sistema
- Debe poder trabajar sin supervisión en operaciones básicas

## Criterios de Aceptación

- [ ] Login exitoso
- [ ] Dashboard personalizado se muestra
- [ ] Menú limitado visible
- [ ] Puede realizar operaciones en caja
- [ ] NO puede retirar de tesorería
- [ ] Puede crear solicitudes
- [ ] NO puede aprobar solicitudes
- [ ] Solo ve sus propias solicitudes
- [ ] NO tiene acceso a configuración
- [ ] Validaciones backend funcionan
- [ ] Intentos de bypass fallan

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
