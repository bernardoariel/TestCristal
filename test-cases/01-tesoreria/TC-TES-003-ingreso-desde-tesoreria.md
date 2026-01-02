# TC-TES-003: Ingresar Dinero a Tesorería (desde Tesorería)

## Información General

- **ID**: TC-TES-003
- **Módulo**: Tesorería
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario pueda transferir dinero desde caja efectivo hacia tesorería correctamente **desde la página Tesorería**, validando que:
1. El dinero se descuente de caja
2. El dinero se agregue a tesorería
3. Se registren ambos movimientos correctamente

## Precondiciones

1. Usuario autenticado: **cristal**
2. **Página inicial**: Tesorería
3. **Saldo en caja**: $40.000,00
4. **Saldo en tesorería**: $72.060.000,00
5. Base de datos en estado conocido

## Datos de Prueba

- **Usuario**: cristal
- **Monto a transferir**: $15.000,00

## Pasos de Ejecución

### Paso 1: Navegar a Tesorería
1. Hacer clic en el boton "Listar de Tesorería"
2. **Resultado Esperado**: Se muestra la página de Tesorería con el box amarillo y la tabla de movimientos

### Paso 2: Verificar Saldo Inicial
1. Observar el box "Tesorería"
2. **Resultado Esperado**: 
   - Tesorería muestra: $72.060.000,00

### Paso 3: Abrir Modal de Ingreso a Tesorería
1. En el box de Tesorería, hacer clic en "Ingresar"
2. **Resultado Esperado**: 
   - Se abre modal con título "Transferir a Tesorería"
   - Modal tiene header azul
   - Muestra alerta informativa: "Esta operación registrará un EGRESO en caja y un INGRESO en tesorería."
   - Campos visibles: Importe, Concepto
   - Botones: Cancelar, Transferir

### Paso 4: Ingresar Datos
1. En campo "Importe", escribir: 15000
23. **Resultado Esperado**: 
   - El campo acepta el valor
   - Botón "Transferir" está habilitado

### Paso 5: Enviar Formulario
1. Hacer clic en botón "Transferir"
2. **Resultado Esperado**: 
   - Modal se cierra
   - La página se recarga automáticamente

### Paso 6: Verificar Saldo Final de Tesorería
1. Observar el box "Tesorería"
2. **Resultado Esperado**: 
   - Tesorería muestra: $72.075.000,00 (72.060.000 + 15.000)

### Paso 7: Verificar Movimiento en Tesorería (Misma Página)
1. En la tabla de movimientos de tesorería (en la misma página), buscar el último registro (primero de la tabla)
2. **Resultado Esperado**: 
   - Tipo: INGRESO (label verde)
   - Monto: $15.000,00
   - Concepto:  "ENVIO A TESORERIA"

### Paso 8: Verificar Movimiento en Caja
1. Navegar a "Movimientos de caja" Hacxiendo click en Lista de caja efectivo
2. Observar saldo de caja
3. **Resultado Esperado**: 
   - Caja muestra: $25.000,00 

4. En la tabla de movimientos de caja, buscar el último registro
5. **Resultado Esperado**: 
   - Tipo: EGRESO (label rojo)
   - Monto: $15.000,00
   - Concepto: "Retiro para tesorería: ENVIO A TESORERIA"

## Resultado Esperado Final

- ✅ Saldo de caja reducido correctamente
- ✅ Saldo de tesorería incrementado correctamente
- ✅ Movimiento EGRESO registrado en caja_movimientos
- ✅ Movimiento INGRESO registrado en tesoreria_movimientos
- ✅ Conceptos correctos en ambos movimientos
- ✅ Operación atómica (ambos movimientos o ninguno)

## Casos de Prueba Relacionados

- TC-TES-001: Ingreso desde Inicio (Dashboard) - ALTERNATIVO
- TC-TES-002: Ingreso desde Movimientos de caja - ALTERNATIVO
- TC-TES-004/005/006: Retiro de tesorería (ejecutar después de este caso)
- TC-TES-007: Validaciones de saldo
- TC-CAJ-002: Egreso de caja
- TC-INT-001: Flujo completo de ingreso

## Notas

- Esta operación es crítica porque afecta dos tablas simultáneamente
- Debe ser transaccional (rollback si falla alguna parte)
- El formato de montos debe ser argentino (punto para miles, coma para decimales)
- **Ventaja de esta página**: Puedes ver inmediatamente el movimiento en la tabla de tesorería sin navegar

## Criterios de Aceptación

- [ ] Los saldos se actualizan correctamente
- [ ] Los movimientos se registran en ambas tablas
- [ ] Los conceptos son correctos
- [ ] La operación es atómica
- [ ] Los mensajes de éxito/error son claros
- [ ] La validación de saldo funciona
- [ ] El formato de números es argentino
- [ ] El movimiento aparece inmediatamente en la tabla de tesorería

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
