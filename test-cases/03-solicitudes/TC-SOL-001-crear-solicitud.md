# TC-SOL-001: Crear Solicitud de Retiro

## Información General

- **ID**: TC-SOL-001
- **Módulo**: Solicitudes
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario sin permisos de retiro directo (vendedor, stock, administrador) pueda crear una solicitud de retiro de tesorería correctamente, validando que:
1. El modal se abre correctamente
2. Los datos se validan
3. La solicitud se crea
4. Aparece en la lista de pendientes

## Precondiciones

1. Usuario autenticado: **vendedor** (sin permiso de retiro directo)
2. Saldo en tesorería: $10.000,00

## Pasos de Ejecución

### Paso 1: Verificar Permisos del Usuario
1. Login como vendedor
2. Navegar a "Movimientos de caja"
3. Observar box de Tesorería
4. **Resultado Esperado**: 
   - Botón "Retirar" NO visible
   - Esto confirma que el usuario no tiene permiso de retiro directo
   - Observar el box solicitudes
   - Tocar solicitar

### Paso 2: Abrir Modal de Solicitud
1. En el box de Tesorería, hacer clic en "Solicitar"
2. **Resultado Esperado**: 
   - Se abre modal con título "Solicitar dinero de tesorería"
   - Modal tiene header azul
   - Alerta informativa: "Su solicitud será enviada para aprobación. Una vez aprobada, el dinero estará disponible en caja."
   - Campos visibles: Importe, Concepto
   - Campos vacíos
   - Botones: Cancelar, Enviar Solicitud

### Paso 3: Ingresar Importe
1. En campo "Importe", escribir: 5000
2. **Resultado Esperado**: 
   - El campo acepta el valor
   - NO hay validación de saldo (la validación se hace al aprobar)
   - Botón "Enviar Solicitud" sigue deshabilitado (falta concepto)

### Paso 4: Ingresar Concepto
1. En campo "Concepto", escribir: "Gastos operativos sucursal"
2. **Resultado Esperado**: 
   - El campo acepta el texto
   - Botón "Enviar Solicitud" ahora habilitado

### Paso 5: Enviar Solicitud
1. Hacer clic en botón "Enviar Solicitud"
2. **Resultado Esperado**: 
   - Modal se cierra
   - Aparece mensaje de éxito: "Solicitud enviada correctamente. Será revisada por un administrador."
   - La página se recarga automáticamente

### Paso 6: Verificar en Lista de Solicitudes
1. Navegar a "Solicitudes"
2. Verificar que estás en tab "Pendientes"
3. **Resultado Esperado**: 
   - La nueva solicitud aparece en la tabla
   - Fecha: Hoy [hora actual]
   - Usuario: vendedor
   - Importe: $5.000,00
   - Concepto: "Gastos operativos sucursal"
   - Estado: Pendiente (o sin estado visible)
   - Botones: Aprobar, Descartar (solo si eres admin)

### Paso 7: Verificar que NO Afecta Saldos
1. Navegar a "Movimientos de caja"
2. Observar saldo de caja
3. Navegar a "Tesorería"
4. Observar saldo de tesorería
5. **Resultado Esperado**: 
   - Saldo de caja NO cambió
   - Saldo de tesorería NO cambió
   - La solicitud NO afecta saldos hasta ser aprobada

### Paso 8: Verificar Notificación (si aplica)
1. Si el sistema tiene notificaciones ( ver con el usuario cristal en otro navegador)
2. **Resultado Esperado**: 
   - Usuarios con permiso de aprobación reciben notificación
   - Notificación indica nueva solicitud pendiente

## Validaciones Adicionales

### Validación 1: Importe Cero
1. Abrir modal "Solicitar"
2. Escribir: 0
3. Intentar enviar
4. **Resultado Esperado**: 
   - Validación impide envío

### Validación 2: Importe Negativo
1. Escribir: -1000
2. **Resultado Esperado**: 
   - Sistema rechaza o convierte a positivo

### Validación 3: Concepto Vacío
1. Ingresar importe válido
2. Dejar concepto vacío
3. Intentar enviar
4. **Resultado Esperado**: 
   - hgfgdhValidación impide envío

### Validación 4: Concepto Solo Espacios
1. Ingresar importe válido
2. En concepto, escribir: "   " (solo espacios)
3. Enviar
4. **Resultado Esperado**: 
   - Se muestra mensaje de error

100
### Validación 6: Múltiples Solicitudes
1. Crear solicitud de $100.000
2. Crear otra solicitud de $200.000
3. Crear otra solicitud de $300.000
4. **Resultado Esperado**: 
   - Todas las solicitudes se crean
   - Todas aparecen en "Pendientes"
   - No hay límite de solicitudes pendientes

## Escenarios Especiales

### Escenario 1: Usuario con Permiso de Retiro
1. Logout de vendedor
2. Login como cristal
3. Navegar a "Movimientos de caja"
4. Observar box de Tesorería
5. **Resultado Esperado**: 
   - Botón "Retirar" SÍ visible
   - Botón "Solicitar" NO visible
   - cristal puede retirar directamente, no necesita solicitar

### Escenario 2: Saldo Cero en Tesorería
1. Vaciar tesorería: saldo = $0,00
2. Como vendedor, intentar crear solicitud
3. **Resultado Esperado**: 
   - Modal se abre normalmente
   - Se puede crear la solicitud
   - Al intentar aprobar, se validará que no hay saldo


## Criterios de Aceptación

- [ ] Usuario sin permisos puede crear solicitud
- [ ] Modal se abre correctamente
- [ ] Validaciones funcionan
- [ ] Solicitud se crea correctamente
- [ ] Aparece en lista de pendientes
- [ ] NO afecta saldos
- [ ] Mensaje de éxito es claro
- [ ] Usuarios con permiso de retiro NO ven botón "Solicitar"

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
