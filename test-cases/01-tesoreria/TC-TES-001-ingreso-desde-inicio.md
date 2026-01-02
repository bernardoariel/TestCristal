# TC-TES-001: Ingresar Dinero a Tesorería

## Información General

- **ID**: TC-TES-001
- **Módulo**: Tesorería
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario pueda transferir dinero desde caja efectivo hacia tesorería correctamente, validando que:
1. El dinero se descuente de caja
2. El dinero se agregue a tesorería
3. Se registren ambos movimientos correctamente

## Precondiciones

1. Usuario autenticado: **cristal**
2. **Página inicial**: Inicio (Dashboard)
3. Ingresar en caja: 72.100.000,00
4. Ingresar a tesoreria: 72.000.000,00
3. Saldo en caja: $100.000,00
4. Saldo en tesorería: $72.000.000,00
5. Base de datos en estado conocido


## Datos de Prueba

- **Usuario**: cristal
- **Monto a Ingresar a Tesoreria**: $50.000,00

## Pasos de Ejecución

### Paso 1: Verificar Dashboard (Inicio)
1. Verificar que estás en la página "Inicio" (Dashboard)
2. **Resultado Esperado**: Se muestran los boxes configurados para cristal, incluyendo box de Tesorería

### Paso 2: Verificar Saldos Iniciales
1. Observar el box "Caja actual (efectivo)"
2. Observar el box "Tesorería"
3. **Resultado Esperado**: 
   - Caja muestra: $100.000,00
   - Tesorería muestra: $72.000.000,00

### Paso 3: Abrir Modal de Ingreso a Tesorería desde Dashboard
1. En el box de Tesorería (en Dashboard), hacer clic en "Ingresar a tesorería"
2. **Resultado Esperado**: 
   - Se abre modal con título "Ingresar a Tesorería"
   - Modal tiene header azul
   - Muestra alerta informativa: " Esta operación registrará un EGRESO en caja y un INGRESO en tesorería."
   - Campos visibles: Importe, Concepto
   - Botones: Cancelar, Transferir

### Paso 4: Ingresar Datos
1. En campo "Importe", escribir: 50000
2. **Resultado Esperado**: 
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
   - Caja muestra: $50.000,00 (100.000 - 50.000)
   - Tesorería muestra: $72.050.000,00 (72.000.000 + 50.000)

### Paso 7: Verificar Movimiento en Caja
1. En la pagina movimientos de caja, la url ( es movimientos-caja) buscar el último registro que es el primero de la tabla
2. **Resultado Esperado**: 
   - Tipo: EGRESO (label rojo)
   - Monto: $50.000,00
   - Concepto: "Retiro para tesorería: ENVIO A TESORERIA"

### Paso 8: Verificar Movimiento en Tesorería
1. Hacer clic en el boton  "Listar de Tesorería"
2. En la tabla de movimientos de tesorería, buscar el último registro
3. **Resultado Esperado**: 
   - Tipo: INGRESO (label verde)
   - Monto: $50.000,00
   - Concepto: "ENVIO A TESORERIA"

## Resultado Esperado Final

- ✅ Saldo de caja reducido correctamente
- ✅ Saldo de tesorería incrementado correctamente
- ✅ Movimiento EGRESO registrado en caja_movimientos
- ✅ Movimiento INGRESO registrado en tesoreria_movimientos
- ✅ Conceptos correctos en ambos movimientos
- ✅ Operación atómica (ambos movimientos o ninguno)

## Casos de Prueba Relacionados

- TC-TES-002: Ingreso desde Movimientos de caja - ALTERNATIVO
- TC-TES-003: Ingreso desde Tesorería - ALTERNATIVO
- TC-TES-004/005/006: Retiro de tesorería (ejecutar después de este caso)
- TC-TES-007: Validaciones de saldo
- TC-CAJ-002: Egreso de caja
- TC-INT-001: Flujo completo de ingreso

## Notas

- Esta operación es crítica porque afecta dos tablas simultáneamente
- Debe ser transaccional (rollback si falla alguna parte)
- El formato de montos debe ser argentino (punto para miles, coma para decimales)

## Criterios de Aceptación

- [ ] Los saldos se actualizan correctamente
- [ ] Los movimientos se registran en ambas tablas
- [ ] Los conceptos son correctos
- [ ] La operación es atómica
- [ ] Los mensajes de éxito/error son claros
- [ ] La validación de saldo funciona
- [ ] El formato de números es argentino

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
