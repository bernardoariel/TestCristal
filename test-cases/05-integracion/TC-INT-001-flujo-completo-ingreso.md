# TC-INT-001: Flujo Completo de Ingreso a Tesorería

## Información General

- **ID**: TC-INT-001
- **Módulo**: Integración
- **Prioridad**: P0 - Crítico
- **Tipo**: End-to-End
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar el flujo completo de ingreso de dinero a tesorería desde caja, validando que todas las partes del sistema se integran correctamente:
1. Dashboard muestra saldos correctos
2. Modal de ingreso funciona
3. Validaciones funcionan
4. Transacción se ejecuta correctamente
5. Ambas tablas se actualizan
6. Saldos se reflejan en todas las páginas
7. Historial se actualiza

## Precondiciones

1. Usuario autenticado: cristal
2. Base de datos en estado conocido:
   - Saldo en caja: $100.000,00
   - Saldo en tesorería: $72.000.000,00
3. Sin transacciones pendientes
4. Navegador con JavaScript habilitado

## Datos de Prueba

- **Usuario**: cristal
- **Monto a transferir**: $50.000,00
- **Concepto**: "Depósito bancario mensual"
- **Fecha**: 28/12/2025

## Flujo Completo

---

### FASE 1: Estado Inicial

#### Paso 1.1: Verificar Dashboard
1. Login como cristal
2. Observar dashboard
3. **Resultado Esperado**: 
   - Box Caja muestra: $100.000,00
   - Box Tesorería muestra: $72.000.000,00
   - Badge usuario: "Usuario: cristal"

#### Paso 1.2: Verificar Movimientos de Caja
1. Navegar a "Movimientos de caja"
2. Contar registros en tabla
3. **Resultado Esperado**: 
   - X movimientos existentes
   - Saldo caja: $100.000,00
   - Saldo tesorería: $72.000.000,00

#### Paso 1.3: Verificar Tesorería
1. Navegar a "Tesorería"
2. Contar registros en tabla
3. **Resultado Esperado**: 
   - Y movimientos existentes (id_retiro IS NULL)
   - Saldo tesorería: $72.000.000,00

---

### FASE 2: Preparación de la Transacción

#### Paso 2.1: Abrir Modal
1. Desde "Movimientos de caja", hacer clic en "Ingresar a tesorería" (box de Tesorería)
2. **Resultado Esperado**: 
   - Modal "Transferir a Tesorería" se abre
   - Header azul
   - Alerta informativa visible
   - Campos vacíos
   - Botón "Transferir" deshabilitado (sin datos)

#### Paso 2.2: Ingresar Monto
1. En campo "Importe", escribir: 50000
2. **Resultado Esperado**: 
   - Campo acepta el valor
   - Texto de ayuda verde: "Quedaría en caja: $50.000,00"
   - Botón "Transferir" sigue deshabilitado (falta concepto)

#### Paso 2.3: Ingresar Concepto
1. En campo "Concepto", escribir: "Depósito bancario mensual"
2. **Resultado Esperado**: 
   - Campo acepta el texto
   - Botón "Transferir" ahora habilitado
   - Todo listo para enviar

---

### FASE 3: Ejecución de la Transacción

#### Paso 3.1: Enviar Formulario
1. Hacer clic en botón "Transferir"
2. **Resultado Esperado**: 
   - Botón se deshabilita (previene doble clic)
   - Modal se cierra
   - Aparece indicador de carga (opcional)

#### Paso 3.2: Esperar Respuesta del Servidor
1. Esperar respuesta AJAX
2. **Resultado Esperado**: 
   - Respuesta exitosa en < 2 segundos
   - Mensaje de éxito aparece (toastr o swal)
   - Página se recarga automáticamente

---

### FASE 4: Verificación Inmediata

#### Paso 4.1: Verificar Saldos en Movimientos de Caja
1. Observar boxes después de la recarga
2. **Resultado Esperado**: 
   - Box Caja muestra: $50.000,00 (100.000 - 50.000)
   - Box Tesorería muestra: $72.050.000,00 (72.000.000 + 50.000)

#### Paso 4.2: Verificar Tabla de Movimientos de Caja
1. Observar tabla de movimientos
2. Buscar el último registro
3. **Resultado Esperado**: 
   - Nuevo registro en primera fila
   - Fecha: 28/12/2025 [hora actual]
   - Tipo: EGRESO (label rojo)
   - Monto: $50.000,00
   - Concepto: "TRANSFERENCIA A TESORERÍA: Depósito bancario mensual"

---

### FASE 5: Verificación en Tesorería

#### Paso 5.1: Navegar a Tesorería
1. Hacer clic en menú "Tesorería"
2. **Resultado Esperado**: 
   - Página carga correctamente
   - Box muestra: $72.050.000,00

#### Paso 5.2: Verificar Tabla de Tesorería
1. Observar tabla de movimientos
2. Buscar el último registro
3. **Resultado Esperado**: 
   - Nuevo registro en primera fila
   - Fecha: 28/12/2025 [hora actual]
   - Tipo: INGRESO (label verde)
   - Monto: $50.000,00
   - Concepto: "Depósito bancario mensual" (sin prefijo)
   - id_retiro: NULL

---

### FASE 6: Verificación en Dashboard

#### Paso 6.1: Volver al Dashboard
1. Hacer clic en "Inicio"
2. **Resultado Esperado**: 
   - Dashboard carga correctamente
   - Box Caja muestra: $50.000,00
   - Box Tesorería muestra: $72.050.000,00
   - Valores consistentes con otras páginas

---

### FASE 7: Verificación de Base de Datos (Opcional)

#### Paso 7.1: Verificar Tabla caja_movimientos
```sql
SELECT * FROM caja_movimientos 
ORDER BY id DESC LIMIT 1;
```
**Resultado Esperado**:
- tipo: EGRESO
- monto: 50000.00
- concepto: TRANSFERENCIA A TESORERÍA: Depósito bancario mensual
- fecha: 2025-12-28 [hora]

#### Paso 7.2: Verificar Tabla tesoreria_movimientos
```sql
SELECT * FROM tesoreria_movimientos 
WHERE id_retiro IS NULL 
ORDER BY id DESC LIMIT 1;
```
**Resultado Esperado**:
- tipo: INGRESO
- monto: 50000.00
- concepto: Depósito bancario mensual
- id_retiro: NULL
- fecha: 2025-12-28 [hora]

#### Paso 7.3: Verificar Saldos Calculados
```sql
-- Saldo de caja
SELECT COALESCE(SUM(monto), 0) AS saldo_caja 
FROM caja_movimientos;

-- Saldo de tesorería
SELECT COALESCE(SUM(monto), 0) AS saldo_tesoreria 
FROM tesoreria_movimientos 
WHERE id_retiro IS NULL;
```
**Resultado Esperado**:
- saldo_caja: 50000.00
- saldo_tesoreria: 72050000.00

---

### FASE 8: Verificación de Exportación

#### Paso 8.1: Exportar Movimientos de Caja
1. En "Movimientos de caja", hacer clic en "Descargar Excel"
2. Abrir archivo descargado
3. **Resultado Esperado**: 
   - Archivo contiene el nuevo movimiento
   - Datos correctos
   - Formato correcto

#### Paso 8.2: Exportar Movimientos de Tesorería
1. En "Tesorería", hacer clic en "Descargar Excel"
2. Abrir archivo descargado
3. **Resultado Esperado**: 
   - Archivo contiene el nuevo movimiento
   - Datos correctos
   - Formato correcto

---

### FASE 9: Verificación de Consistencia

#### Paso 9.1: Recargar Múltiples Veces
1. Recargar página "Movimientos de caja" 5 veces
2. **Resultado Esperado**: 
   - Saldos siempre iguales
   - No hay duplicados
   - Datos consistentes

#### Paso 9.2: Navegar Entre Páginas
1. Navegar: Inicio → Movimientos de caja → Tesorería → Inicio
2. **Resultado Esperado**: 
   - Saldos consistentes en todas las páginas
   - No hay discrepancias

---

### FASE 10: Verificación de Rollback (Prueba Negativa)

#### Paso 10.1: Simular Error en Tesorería
1. Modificar temporalmente código para que falle el INSERT en tesoreria_movimientos
2. Intentar transferir $10.000,00
3. **Resultado Esperado**: 
   - Transacción falla
   - Mensaje de error
   - **CRÍTICO**: Tampoco se registra el EGRESO en caja (rollback)
   - Saldos permanecen sin cambios

---

## Resultado Esperado Final

### Checklist de Verificación

- [ ] Saldo de caja reducido correctamente: $100.000 → $50.000
- [ ] Saldo de tesorería incrementado correctamente: $72.000.000 → $72.050.000
- [ ] Movimiento EGRESO registrado en caja_movimientos
- [ ] Movimiento INGRESO registrado en tesoreria_movimientos
- [ ] Conceptos correctos en ambas tablas
- [ ] Fechas correctas y sincronizadas
- [ ] Saldos consistentes en todas las páginas
- [ ] Dashboard actualizado
- [ ] Exportación incluye nuevos movimientos
- [ ] Transacción es atómica (todo o nada)
- [ ] No hay duplicados
- [ ] Performance aceptable (< 2 segundos)

## Casos de Prueba Relacionados

- TC-TES-001: Ingreso a tesorería
- TC-CAJ-002: Egreso de caja
- TC-TES-003: Validaciones de saldo

## Notas Críticas

- **Atomicidad**: La transacción DEBE ser atómica. Si falla una parte, debe hacer rollback de todo.
- **Consistencia**: Los saldos deben ser consistentes en todas las páginas en todo momento.
- **Formato**: El concepto en caja debe tener prefijo "TRANSFERENCIA A TESORERÍA:"
- **Performance**: La operación debe completarse en < 2 segundos.

## Criterios de Aceptación

- [ ] Flujo completo funciona sin errores
- [ ] Todas las fases pasan
- [ ] Transacción es atómica
- [ ] Saldos son consistentes
- [ ] Performance es aceptable
- [ ] Rollback funciona correctamente
- [ ] No hay efectos secundarios

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Fase Fallida | Notas |
|-------|----------|-----------|--------------|-------|
| - | - | - | - | - |
