# TC-TES-008: Historial de Retiros

## Información General

- **ID**: TC-TES-008
- **Módulo**: Tesorería
- **Prioridad**: P1 - Alto
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que el historial de retiros muestra correctamente todos los retiros realizados, con filtros, búsqueda y exportación funcionando correctamente.

## Precondiciones

1. Usuario autenticado: **cristal**
2. **Saldo en tesorería**: $47.075.000,00 
3. Existen movimientos activos en tesorería:
   - INGRESO: $72.000.000,00 - "ENVIO A TESORERIA"
   - INGRESO: $50.000,00 - "ENVIO A TESORERIA"
   - INGRESO: $10.000,00 - "ENVIO A TESORERIA"
   - INGRESO: $15.000,00 - "ENVIO A TESORERIA"
   - EGRESO: $-5.000.000,00 - "RETIRO PARCIAL: RETIRO PARCIAL DE TESORERIA"
   - EGRESO: $-5.000.000,00 - "RETIRO PARCIAL: RETIRO PARCIAL DE TESORERIA"
   - EGRESO: $-15.000.000,00 - "RETIRO PARCIAL: RETIRO PARCIAL DE TESORERIA2"
4. **NO existen retiros en el historial** (todos los movimientos tienen id_retiro IS NULL)

## Datos de Prueba

**Saldo disponible**: $47.075.000,00

### Retiro a Realizar
- **Monto**: $47.075.000,00 (retiro total)
- **Concepto**: "Retiro total para prueba de historial"
- **Usuario**: cristal

## Pasos de Ejecución

### Paso 1: Verificar Estado Inicial - Historial Vacío
1. Desde cualquier página, hacer clic en "Historial" dentro del box de tesoreria
2. **Resultado Esperado**: 
   - Se carga la página "Historial de Retiros"
   - Se muestra breadcrumb: Inicio > Historial de Retiros
   - La tabla está vacía o muestra mensaje: "No se encontraron retiros en este período
   - **NOTA**: Esto es correcto porque aún no se ha hecho ningún retiro total

### Paso 2: Realizar Retiro Total
1. Navegar a "Tesorería" (o cualquier página con box de Tesorería)
2. Verificar saldo disponible: $47.075.000,00
3. Hacer clic en botón "Retirar"
4. **Resultado Esperado**: 
   - Se abre modal "Retirar de Tesorería"
   - Campo "Importe" pre-llenado con: 47.075.000,00

5. En campo "Concepto", dice: "RETIRO TOTAL DE TESORERIA"
6. Hacer clic en botón "Retirar"
7. **Resultado Esperado**: 
   - Modal se cierra
   - Aparece mensaje de éxito
   - Página se recarga
   - Saldo de tesorería: $0,00
   - Tabla de movimientos de tesorería está vacía (ir a listar de la caja de tesoreria)
   - La tabla dice "Ningún dato disponible en esta tabla"

### Paso 3: Navegar al Historial de Retiros
1. Hacer clic en "Historial" de la caja de tesoreria
2. **Resultado Esperado**: 
   - Se carga la página "Historial de Retiros"
   - Ahora SÍ aparece un registro en la tabla

### Paso 4: Verificar Estructura de la Tabla
1. Observar las columnas de la tabla
2. **Resultado Esperado**: 
   - Columnas visibles: #, Fecha, monto, Concepto, acciones
   - Formato de importe: $X.XXX.XXX,XX

### Paso 5: Verificar Datos del Retiro
1. Revisar la fila del retiro recién creado
2. **Resultado Esperado**: 
   - **Fecha**:  (fecha y hora actual)
   - **Importe**: $47.075.000,00
   - **Concepto**: "RETIRO TOTAL DE TESORERIA"
### Paso 6: Verificar Detalle del Retiro
1. Hacer clic en el botón "Ver detalle" del retiro realizado
2. **Resultado Esperado**: 
   - Se abre modal o página con el detalle completo del retiro
   
   **Encabezado del detalle**:
   - Retiro #3 (o el ID correspondiente)
   - Fecha: que corresponda
   - Monto total: $47.075.000,00
   - Concepto: "RETIRO TOTAL DE TESORERIA"
   
   **Tabla de movimientos asociados** (8 movimientos marcados con este id_retiro):
   
   | Fecha | Tipo | Concepto | Monto |
   |-------|------|----------|-------|
   | | EGRESO (verde) | RETIRO TOTAL: RETIRO TOTAL DE TESORERIA | -$47.075.000,00 |
   | | EGRESO (verde) | RETIRO PARCIAL: RETIRO PARCIAL DE TESORERIA | -$15.000.000,00 |
   | | EGRESO (verde) | RETIRO PARCIAL: RETIRO PARCIAL DE TESORERIA | -$5.000.000,00 |
   | | EGRESO (verde) | RETIRO PARCIAL: RETIRO PARCIAL DE TESORERIA | -$5.000.000,00 |
   | | INGRESO (rojo) | ENVIO A TESORERIA | $15.000,00 |
   | | INGRESO (rojo) | ENVIO A TESORERIA | $10.000,00 |
   | | INGRESO (rojo) | ENVIO A TESORERIA | $50.000,00 |
   | | INGRESO (rojo) | ENVIO A TESORERIA | $72.000.000,00 |
   
   **Totales al final de la tabla**:
   - TOTAL INGRESOS: $72.075.000,00
   - TOTAL EGRESOS: -$72.075.000,00
   
   **Validaciones**:
   - ✅ EGRESO se muestra con label verde (son salidas de tesorería)
   - ✅ INGRESO se muestra con label rojo (son entradas a tesorería)
   - ✅ Los montos de EGRESO son negativos
   - ✅ Los montos de INGRESO son positivos
   - ✅ La suma de INGRESOS ($72.075.000) = valor absoluto de la suma de EGRESOS (-$72.075.000)
   - ✅ El monto total del retiro ($47.075.000,00) coincide con el saldo que había disponible
   - ✅ Los totales confirman que el retiro es correcto (ingresos = egresos en valor absoluto)


## Resultado Esperado Final

- ✅ Historial inicialmente vacío (correcto)
- ✅ Retiro total de $47.075.000,00 realizado exitosamente
- ✅ Retiro aparece en el historial con datos correctos
- ✅ Búsqueda funciona
- ✅ Ordenamiento funciona
- ✅ Paginación funciona (cuando haya más retiros)
- ✅ Filtro por fechas funciona (si existe)
- ✅ Exportación a Excel funciona (si existe)
- ✅ Formato de datos es correcto
- ✅ Responsive funciona
- ✅ Movimientos desaparecieron de la tabla de tesorería 
- ✅ Saldo de tesorería: $0,00

## Criterios de Aceptación

- [ ] Historial inicialmente vacío (antes del retiro total)
- [ ] Retiro total se realiza correctamente
- [ ] Retiro aparece en el historial después de realizarlo
- [ ] Tabla muestra el retiro con datos correctos
- [ ] Búsqueda funciona correctamente
- [ ] Ordenamiento funciona en todas las columnas
- [ ] Paginación funciona (cuando aplique)
- [ ] Filtro por fechas funciona (si existe)
- [ ] Exportación a Excel funciona (si existe)
- [ ] Formato de datos es correcto (fecha, importe, concepto, usuario)
- [ ] Responsive funciona
- [ ] Movimientos desaparecen de la tabla de tesorería
- [ ] Saldo de tesorería queda en $0,00
- [ ] Performance es aceptable (< 2 segundos para cargar)

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
