# TC-USR-002: Permisos de Usuario Superadmin

## Información General

- **ID**: TC-USR-002
- **Módulo**: Usuarios y Permisos
- **Prioridad**: P0 - Crítico
- **Tipo**: Seguridad / Permisos
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que el usuario "superadmin" tiene todos los permisos del sistema, incluyendo acceso a configuración avanzada y todas las funcionalidades administrativas.

## Precondiciones

1. Usuario "superadmin" existe en la base de datos
2. Perfil asignado: Super Administrador
3. Saldo en tesorería: $72.000.000,00
4. Saldo en caja: $100.000,00

## Datos de Prueba

- **Usuario**: superadmin
- **Contraseña**: [contraseña del usuario]
- **Perfil**: Super Administrador

## Matriz de Permisos - Usuario Superadmin

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
| **Configuración básica** | ✅ **Sí** | [ ] |
| **Configuración avanzada** | ✅ **Sí** | [ ] |
| **Crear usuarios** | ✅ **Sí** | [ ] |
| **Editar usuarios** | ✅ **Sí** | [ ] |
| **Eliminar usuarios** | ✅ **Sí** | [ ] |
| **Gestionar permisos** | ✅ **Sí** | [ ] |
| **Ver logs del sistema** | ✅ **Sí** | [ ] |
| **Backup/Restore** | ✅ **Sí** | [ ] |

## Pasos de Ejecución

### Paso 1: Login
1. Navegar a la página de login
2. Ingresar usuario: superadmin
3. Ingresar contraseña
4. Hacer clic en "Ingresar"
5. **Resultado Esperado**: 
   - Login exitoso
   - Redirige a dashboard/inicio
   - Header muestra: "Usuario: superadmin"

### Paso 2: Verificar Dashboard
1. Observar el dashboard
2. **Resultado Esperado**: 
   - Dashboard completo visible
   - Todos los boxes configurados
   - Acceso a todas las secciones

### Paso 3: Verificar Menú Completo
1. Observar el menú lateral
2. **Resultado Esperado**: 
   - Menú completo con TODAS las opciones
   - Opciones adicionales vs otros usuarios:
     - ✅ Configuración
     - ✅ Usuarios
     - ✅ Permisos
     - ✅ Logs
     - ✅ Backup

### Paso 4: Verificar Retiro de Tesorería
1. Navegar a "Tesorería"
2. Hacer clic en "Retirar"
3. **Resultado Esperado**: 
   - Modal se abre
   - Puede retirar dinero
   - Operación exitosa

### Paso 5: Verificar Aprobación de Solicitudes
1. Navegar a "Solicitudes"
2. **Resultado Esperado**: 
   - Ve TODAS las solicitudes (de todos los usuarios)
   - Botones "Aprobar" y "Descartar" visibles
   - Puede aprobar/descartar cualquier solicitud

### Paso 6: Verificar Acceso a Configuración
1. Navegar a "Configuración" (si existe en menú)
2. **Resultado Esperado**: 
   - Acceso permitido
   - Puede ver/editar configuración del sistema
   - Opciones avanzadas disponibles

### Paso 7: Verificar Gestión de Usuarios
1. Navegar a "Usuarios" (si existe en menú)
2. **Resultado Esperado**: 
   - Lista de todos los usuarios
   - Botones: Crear, Editar, Eliminar
   - Puede gestionar usuarios

3. Intentar crear un nuevo usuario
4. **Resultado Esperado**: 
   - Formulario de creación se abre
   - Puede asignar perfiles
   - Puede crear usuario

### Paso 8: Verificar Logs del Sistema
1. Navegar a "Logs" o "Auditoría" (si existe)
2. **Resultado Esperado**: 
   - Puede ver logs del sistema
   - Puede filtrar por fecha, usuario, acción
   - Puede exportar logs

### Paso 9: Verificar Backup/Restore
1. Navegar a "Backup" (si existe)
2. **Resultado Esperado**: 
   - Puede crear backup de la base de datos
   - Puede restaurar desde backup
   - Puede descargar backups

### Paso 10: Comparar con Usuario Cristal
1. Logout de superadmin
2. Login como cristal
3. Observar menú
4. **Resultado Esperado**: 
   - cristal NO tiene acceso a:
     - Configuración avanzada
     - Gestión de usuarios
     - Logs del sistema
     - Backup/Restore
   - superadmin tiene MÁS permisos que cristal

## Diferencias Clave: Superadmin vs Cristal

| Funcionalidad | Superadmin | Cristal |
|---------------|------------|---------|
| Retirar de tesorería | ✅ | ✅ |
| Aprobar solicitudes | ✅ | ✅ |
| Configuración básica | ✅ | ✅ |
| **Configuración avanzada** | ✅ | ❌ |
| **Gestionar usuarios** | ✅ | ❌ |
| **Ver logs** | ✅ | ❌ |
| **Backup/Restore** | ✅ | ❌ |

## Resultado Esperado Final

- ✅ superadmin tiene TODOS los permisos
- ✅ Puede retirar de tesorería
- ✅ Puede aprobar/descartar solicitudes
- ✅ Puede acceder a configuración avanzada
- ✅ Puede gestionar usuarios
- ✅ Puede ver logs del sistema
- ✅ Puede hacer backup/restore
- ✅ Tiene MÁS permisos que cualquier otro usuario

## Casos de Prueba Relacionados

- TC-USR-001: Permisos de cristal
- TC-USR-003: Permisos de vendedor
- TC-TES-002: Retiro de tesorería
- TC-SOL-002: Aprobar solicitud

## Notas

- superadmin es el usuario con MÁXIMOS permisos
- Es el único con acceso a configuración avanzada
- Puede gestionar otros usuarios y sus permisos
- Debe usarse con precaución (poder absoluto)
- En producción, debe tener contraseña muy segura

## Criterios de Aceptación

- [ ] Login exitoso
- [ ] Dashboard completo visible
- [ ] Menú con todas las opciones
- [ ] Puede retirar de tesorería
- [ ] Puede aprobar/descartar solicitudes
- [ ] Puede acceder a configuración avanzada
- [ ] Puede gestionar usuarios
- [ ] Puede ver logs
- [ ] Puede hacer backup/restore
- [ ] Tiene más permisos que cristal

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
