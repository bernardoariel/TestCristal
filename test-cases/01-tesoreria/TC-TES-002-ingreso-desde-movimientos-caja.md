# TC-TES-002: Ingresar Dinero a Tesorería (desde Movimientos de Caja)

## Información General

- **ID**: TC-TES-002
- **Módulo**: Tesorería
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario pueda transferir dinero desde caja efectivo hacia tesorería correctamente **desde la página Movimientos de Caja**, validando que:
1. El dinero se descuente de caja
2. El dinero se agregue a tesorería
3. Se registren ambos movimientos correctamente

## Precondiciones

1. Usuario autenticado: **cristal**
2. **Página inicial**: Movimientos de Caja ( EN INICIO TOCAMOS EL BOTON LISTAR DE CAJA EFECTIVO)
3. Saldo en caja: $50.000,00
4. Saldo en tesorería: $72.050.000,00


## Datos de Prueba

- **Usuario**: cristal
- **Monto a enviar a Tesoreria**: $10.000,00

## Pasos de Ejecución

### Paso 1: Navegar a Movimientos de Caja
1. Hacer clic el boton listar de "caja efectivo"
2. **Resultado Esperado**: Se muestra la página con los 3-4 boxes (Caja, Ingresos/Egresos del día, Tesorería, Solicitudes)

### Paso 2: Verificar Saldos Iniciales
1. Observar el box "Caja actual (efectivo)"
2. Observar el box "Tesorería"
3. **Resultado Esperado**: 
   - Caja muestra: $50.000,00
   - Tesorería muestra: $72.050.000,00

### Paso 3: Abrir Modal de Ingreso a Tesorería
1. En el box de Tesorería, hacer clic en "Ingresar a tesorería"
2. **Resultado Esperado**: 
   - Se abre modal con título "Transferir a Tesorería"
   - Modal tiene header azul
   - Muestra alerta informativa: "Esta operación registrará un EGRESO en caja y un INGRESO en tesorería."
   - Campos visibles: Importe, Concepto
   - Botones: Cancelar, Transferir

### Paso 4: Ingresar Datos
1. En campo "Importe", escribir: 10000
3. **Resultado Esperado**: 
   - El campo acepta el valor
   - Botón "Transferir" está habilitado

### Paso 5: Enviar Formulario
1. Hacer clic en botón "Transferir"
2. **Resultado Esperado**: 
   - Modal se cierra
   - La página se recarga automáticamente

### Paso 6: Verificar Saldos Finales
1. Observar el box "Caja actual (efectivo)"
2. Observar el box "Tesorería"
3. **Resultado Esperado**: 
   - Caja muestra: $40.000,00 (50.000 - 10.000)
   - Tesorería muestra: $72.060.000,00 (72.000.000 + 10.000)

### Paso 7: Verificar Movimiento en Caja (Misma Página)
1. En la tabla de movimientos de caja (en la misma página), buscar el último registro (primero de la tabla)
2. **Resultado Esperado**: 
   - Tipo: EGRESO (label rojo)
   - Monto: $10.000,00
   - Concepto: "Retiro para tesorería: ENVIO A TESORERIA"

### Paso 8: Verificar Movimiento en Tesorería
1. Hacer clic en botón "Listar de Tesorería" o navegar a "Tesorería"
2. En la tabla de movimientos de tesorería, buscar el último registro
3. **Resultado Esperado**: 
   - Tipo: INGRESO (label verde)
   - Monto: $10.000,00
   - Concepto: "Depósito bancario de prueba" o "ENVIO A TESORERIA"
   - id_retiro: NULL

## Resultado Esperado Final

- ✅ Saldo de caja reducido correctamente
- ✅ Saldo de tesorería incrementado correctamente
- ✅ Movimiento EGRESO registrado en caja_movimientos
- ✅ Movimiento INGRESO registrado en tesoreria_movimientos
- ✅ Conceptos correctos en ambos movimientos
- ✅ Operación atómica (ambos movimientos o ninguno)

## Casos de Prueba Relacionados

- TC-TES-001: Ingreso desde Inicio (Dashboard) - ALTERNATIVO
- TC-TES-003: Ingreso desde Tesorería - ALTERNATIVO
- TC-TES-004/005/006: Retiro de tesorería (ejecutar después de este caso)
- TC-TES-007: Validaciones de saldo
- TC-CAJ-002: Egreso de caja
- TC-INT-001: Flujo completo de ingreso

## Notas

- Esta operación es crítica porque afecta dos tablas simultáneamente
- Debe ser transaccional (rollback si falla alguna parte)
- El formato de montos debe ser argentino (punto para miles, coma para decimales)
- **Ventaja de esta página**: Puedes ver inmediatamente el movimiento en la tabla de caja sin navegar

## Criterios de Aceptación

- [ ] Los saldos se actualizan correctamente
- [ ] Los movimientos se registran en ambas tablas
- [ ] Los conceptos son correctos
- [ ] La operación es atómica
- [ ] Los mensajes de éxito/error son claros
- [ ] La validación de saldo funciona
- [ ] El formato de números es argentino
- [ ] El movimiento aparece inmediatamente en la tabla de caja

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
