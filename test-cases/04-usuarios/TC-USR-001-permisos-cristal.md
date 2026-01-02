# TC-USR-001: Permisos de Usuario Cristal

## Información General

- **ID**: TC-USR-001
- **Módulo**: Usuarios y Permisos
- **Prioridad**: P0 - Crítico
- **Tipo**: Seguridad / Permisos
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que el usuario "cristal" tiene todos los permisos correctos y puede acceder a todas las funcionalidades de administrador, incluyendo retiros de tesorería.

## Precondiciones

1. Usuario "cristal" existe en la base de datos
2. Perfil asignado: Administrador
3. Saldo en tesorería: $72.000.000,00
4. Saldo en caja: $100.000,00

## Datos de Prueba

- **Usuario**: cristal
- **Contraseña**: [contraseña del usuario]
- **Perfil**: Administrador

## Pasos de Ejecución

### Paso 1: Login
1. Navegar a la página de login
2. Ingresar usuario: cristal
3. Ingresar contraseña
4. Hacer clic en "Ingresar"
5. **Resultado Esperado**: 
   - Login exitoso
   - Redirige a dashboard/inicio
   - Header muestra: "Usuario: cristal"

### Paso 2: Verificar Dashboard Personalizado
1. Observar el dashboard
2. **Resultado Esperado**: 
   - Se muestra dashboard configurado para perfil "Administrador"
   - Boxes visibles según config/dashboard-usuarios.json
   - Todos los valores se cargan correctamente

### Paso 3: Verificar Menú de Navegación
1. Observar el menú lateral
2. **Resultado Esperado**: 
   - Menú completo visible
   - Opciones disponibles:
     - ✅ Inicio
     - ✅ Movimientos de caja
     - ✅ Tesorería
     - ✅ Solicitudes
     - ✅ Historial de retiros
     - ✅ Otros módulos según configuración

### Paso 4: Verificar Permisos en Caja
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

### Paso 5: Verificar Permisos en Tesorería - CRÍTICO
1. Navegar a "Tesorería"
2. **Resultado Esperado**: 
   - ✅ Puede ver saldo de tesorería
   - ✅ Botón "Ingresar" visible y funcional
   - ✅ **Botón "Retirar" visible y funcional** (PERMISO ESPECIAL)
   - ✅ Puede ver movimientos
   - ✅ Puede exportar a Excel

3. Hacer clic en "Retirar"
4. **Resultado Esperado**: 
   - Modal "Retirar de Tesorería" se abre
   - Muestra saldo disponible
   - Puede ingresar monto y concepto
   - Botón "Retirar" funcional

5. Completar retiro de $1.000.000,00
6. **Resultado Esperado**: 
   - Retiro exitoso
   - Saldo se actualiza
   - Registro en historial de retiros

### Paso 6: Verificar Permisos en Solicitudes
1. Navegar a "Solicitudes"
2. **Resultado Esperado**: 
   - ✅ Puede ver todas las solicitudes (no solo las propias)
   - ✅ Tabs visibles: Pendientes, Aprobadas, Descartadas
   - ✅ **Botones "Aprobar" y "Descartar" visibles** (PERMISO ESPECIAL)

3. Seleccionar una solicitud pendiente
4. Hacer clic en "Aprobar"
5. **Resultado Esperado**: 
   - Modal de confirmación se abre
   - Puede aprobar la solicitud
   - Solicitud se mueve a tab "Aprobadas"
   - Dinero se transfiere a caja

6. Seleccionar otra solicitud pendiente
7. Hacer clic en "Descartar"
8. **Resultado Esperado**: 
   - Modal de confirmación se abre
   - Puede descartar la solicitud
   - Solicitud se mueve a tab "Descartadas"

### Paso 7: Verificar Historial de Retiros
1. Navegar a "Historial de retiros"
2. **Resultado Esperado**: 
   - ✅ Puede ver todos los retiros (de todos los usuarios)
   - ✅ Puede filtrar por fechas
   - ✅ Puede exportar a Excel
   - ✅ Ve retiros propios y de otros usuarios

### Paso 8: Verificar Acceso a Configuración (si aplica)
1. Buscar opciones de configuración en el menú
2. **Resultado Esperado**: 
   - Puede acceder a configuración básica
   - No tiene acceso a configuración avanzada (solo superadmin)

### Paso 9: Verificar Badge de Usuario
1. Observar el header de la página
2. **Resultado Esperado**: 
   - Badge muestra: "Usuario: cristal"
   - Badge tiene estilo distintivo (color, icono)

### Paso 10: Verificar Restricciones (lo que NO puede hacer)
1. Intentar acceder a URL de configuración avanzada (si existe)
2. **Resultado Esperado**: 
   - ❌ Acceso denegado o redirige a inicio
   - Mensaje: "No tienes permisos para acceder a esta sección"

## Matriz de Permisos - Usuario Cristal

| Funcionalidad | Permiso | Verificado |
|---------------|---------|------------|
| Ver dashboard | ✅ Sí | [ ] |
| Ingresar a caja | ✅ Sí | [ ] |
| Extraer de caja | ✅ Sí | [ ] |
| Ver movimientos de caja | ✅ Sí | [ ] |
| Ingresar a tesorería | ✅ Sí | [ ] |
| **Retirar de tesorería** | ✅ **Sí** | [ ] |
| Ver movimientos de tesorería | ✅ Sí | [ ] |
| Crear solicitud | ✅ Sí | [ ] |
| **Aprobar solicitud** | ✅ **Sí** | [ ] |
| **Descartar solicitud** | ✅ **Sí** | [ ] |
| Ver todas las solicitudes | ✅ Sí | [ ] |
| Ver historial de retiros | ✅ Sí | [ ] |
| Exportar a Excel | ✅ Sí | [ ] |
| Configuración básica | ✅ Sí | [ ] |
| Configuración avanzada | ❌ No | [ ] |
| Crear usuarios | ❌ No | [ ] |
| Eliminar usuarios | ❌ No | [ ] |

## Resultado Esperado Final

- ✅ Usuario cristal tiene permisos de administrador
- ✅ Puede retirar de tesorería (permiso crítico)
- ✅ Puede aprobar/descartar solicitudes
- ✅ Puede ver todos los datos del sistema
- ✅ No tiene acceso a configuración avanzada

## Casos de Prueba Relacionados

- TC-USR-002: Permisos de superadmin
- TC-USR-003: Permisos de vendedor
- TC-TES-002: Retiro de tesorería
- TC-SOL-002: Aprobar solicitud

## Notas

- Usuario "cristal" es uno de los dos usuarios con permiso para retirar de tesorería
- El otro usuario con este permiso es "superadmin"
- Este permiso es crítico y debe estar bien protegido
- Los permisos se validan tanto en frontend (UI) como backend (seguridad)

## Criterios de Aceptación

- [ ] Login exitoso
- [ ] Dashboard personalizado se muestra
- [ ] Menú completo visible
- [ ] Puede realizar operaciones en caja
- [ ] **Puede retirar de tesorería**
- [ ] Puede aprobar/descartar solicitudes
- [ ] Puede ver historial completo
- [ ] No puede acceder a configuración avanzada
- [ ] Badge de usuario se muestra correctamente

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
