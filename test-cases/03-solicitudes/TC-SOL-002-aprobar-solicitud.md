# TC-SOL-002: Aprobar Solicitud de Retiro

## Información General

- **ID**: TC-SOL-002
- **Módulo**: Solicitudes
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario con permisos (cristal, superadmin, administrador) pueda aprobar una solicitud de retiro correctamente, validando que:
1. Solo usuarios autorizados pueden aprobar
2. Se valida el saldo disponible
3. El dinero se transfiere de tesorería a caja
4. La solicitud cambia de estado
5. Se registran los movimientos correctamente

## Precondiciones

1. Usuario autenticado: **cristal** (con permiso de aprobación)
2. Existe una solicitud pendiente:
   - Usuario: vendedor
   - Importe: $150.000
   - Concepto: "Gastos operativos"
3. Saldo en tesorería: $50.000.000,00
4. Saldo en caja: $25.000,00

## Datos de Prueba

- **Usuario aprobador**: cristal
- **Solicitud a aprobar**: ID #1, $2.000.000,00, "Gastos operativos"

## Pasos de Ejecución

### Paso 1: Navegar a Solicitudes
1. Login como cristal
2. Hacer clic en menú "Solicitudes"
3. **Resultado Esperado**: 
   - Se carga la página de solicitudes
   - Se muestran 3 tabs: Pendientes, Aprobadas, Descartadas
   - Tab "Pendientes" está activo por defecto

### Paso 2: Verificar Solicitud Pendiente
1. Observar la tabla en tab "Pendientes"
2. Buscar la solicitud de vendedor
3. **Resultado Esperado**: 
   - Solicitud visible en la tabla
   - Columnas: #, Fecha, Usuario, Importe, Concepto, Acciones
   - Importe: $2.000.000
   - Usuario: vendedor
   - Concepto: "gastos operativos"
   - Botones: Aprobar (verde), Descartar (rojo)

### Paso 3: Verificar Saldos Antes de Aprobar
1. Anotar saldos actuales:
   - Tesorería: $50.000.000,00
   - Caja: $25.000,00
2. **Resultado Esperado**: 
   - Saldos registrados para comparación posterior

### Paso 4: Aprobar Solicitud
1. Hacer clic en botón "Aprobar" de la solicitud
2. **Resultado Esperado**: 
   - Aparece modal de confirmación 
   - Y luego de confirmar sale el toast de aprobacion

### Paso 5: Verificar que Desaparece de Pendientes
1. Observar tab "Pendientes"
2. **Resultado Esperado**: 
   - La solicitud YA NO aparece en "Pendientes"
   - Se movió a otro tab

### Paso 6: Verificar en Tab Aprobadas
1. Hacer clic en tab "Aprobadas"
2. Buscar la solicitud
3. **Resultado Esperado**: 
   - La solicitud AHORA aparece en "Aprobadas"
   - Muestra fecha de aprobación
   - Muestra usuario que aprobó (cristal)
   - Ya NO tiene botones de acción

### Paso 7: Verificar Saldos Después de Aprobar
1. Navegar a "Tesorería"
2. Observar saldo de tesorería
3. **Resultado Esperado**: 
   - Tesorería: $48.000.000,00 (50.000.000 - 2.000.000)
   - Saldo reducido correctamente

4. Navegar a "Movimientos de caja"
5. Observar saldo de caja
6. **Resultado Esperado**: 
   - Caja: $2.025.000,00 (25.000 + 2.000.000)
   - Saldo incrementado correctamente

### Paso 8: Verificar Movimiento en Tesorería
1. En página "Tesorería", observar tabla de movimientos
2. Buscar el último registro
3. **Resultado Esperado**: 
   - Fecha: Hoy [hora actual]
   - Tipo: EGRESO (label rojo)
   - Monto: -$2.000.000,00 (negativo)
   - Concepto: "SOLICITUD APROBADA: Gastos operativos"

### Paso 9: Verificar Movimiento en Caja
1. Navegar a "Movimientos de caja"
2. Observar tabla de movimientos
3. Buscar el último registro
4. **Resultado Esperado**: 
   - Fecha: Hoy [hora actual]
   - Tipo: INGRESO (label verde)
   - Monto: +$2.000.000,00 (positivo)
   - Concepto: "SOLICITUD APROBADA: Gastos operativos"



## Validaciones Críticas

### Validación 1: Saldo Insuficiente
1. Crear solicitud de $100.000.000,00 (más del saldo disponible)
2. Como cristal, intentar aprobar
3. **Resultado Esperado**: 
   - Sistema advierte antes de la aprobación, que se va a hacer pero con lo que queda en tesoreria
   - Al tocar que apruebe queda aprobada

### Validación 2: Usuario Sin Permisos
1. Logout de cristal
2. Login como vendedor
3. Navegar a "Solicitudes"
4. **Resultado Esperado**: 
   - Botones "Aprobar" y "Descartar" NO visibles
   - O están deshabilitados
   - vendedor solo puede ver sus propias solicitudes
   - revisar los saldos
      caja: $50.025.000,00
      tesoreria: $0,00
      solicitudes pendientes: $0,00

## Escenarios Especiales

### Escenario 1: Aprobar con Saldo Exacto
1. Saldo en tesorería: $2.000.000,00
2. Solicitud de: $2.000.000,00
3. Aprobar
4. **Resultado Esperado**: 
   - Aprobación exitosa
   - Tesorería queda en: $0,00
   - Caja incrementa: +$2.000.000,00

### Escenario 2: Aprobar Múltiples con Saldo Límite
1. Saldo en tesorería: $5.000.000,00
2. Solicitud 1: $2.000.000,00
3. Solicitud 2: $2.000.000,00
4. Solicitud 3: $2.000.000,00
5. Aprobar las 3
6. **Resultado Esperado**: 
   - Solicitud 1: ✅ Aprobada (quedan $3.000.000)
   - Solicitud 2: ✅ Aprobada (queda $1.000.000)
   - Solicitud 3: ✅ Aprobada, pero parcialemnte (queda $0)


## Criterios de Aceptación

- [ ] Solo usuarios autorizados pueden aprobar
- [ ] Validación de saldo funciona
- [ ] Saldos se actualizan correctamente
- [ ] Movimientos se registran en ambas tablas
- [ ] Conceptos correctos
- [ ] Solicitud se mueve a "Aprobadas"
- [ ] Operación es atómica
- [ ] No se puede aprobar dos veces
- [ ] Mensajes de error son claros

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
