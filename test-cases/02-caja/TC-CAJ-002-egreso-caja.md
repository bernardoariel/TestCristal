# TC-CAJ-002: Extraer Dinero de Caja

## Información General

- **ID**: TC-CAJ-002
- **Módulo**: Caja
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario pueda extraer dinero de caja efectivo correctamente, validando que:
1. El modal se abre correctamente
2. Las validaciones de saldo funcionan
3. El movimiento se registra
4. El saldo se actualiza

## Precondiciones

1. Usuario autenticado (cualquier perfil)
2. Saldo en caja: $100.000,00
3. Base de datos en estado conocido

## Datos de Prueba

- **Usuario**: vendedor
- **Monto a extraer**: $30.000,00
- **Concepto**: "Pago a proveedor XYZ"

## Pasos de Ejecución

### Paso 1: Navegar a Movimientos de Caja
1. Login como vendedor
2. Hacer clic en menú "Movimientos de caja"
3. **Resultado Esperado**: 
   - Se muestra la página con los boxes
   - Box "Caja actual (efectivo)" muestra: $100.000,00

### Paso 2: Abrir Modal de Extracción
1. En el box de Caja, hacer clic en "Extraer"
2. **Resultado Esperado**: 
   - Se abre modal con título "Extraer dinero de caja"
   - Modal tiene header rojo
   - Campos visibles: Importe, Detalle
   - Campos vacíos
   - Texto de ayuda vacío
   - Botones: Cancelar, Extraer (deshabilitado)

### Paso 3: Ingresar Monto Válido
1. En campo "Importe", escribir: 30000
2. **Resultado Esperado**: 
   - El campo acepta el valor
   - Texto de ayuda verde: "Quedaría en caja: $70.000,00"
   - Botón "Extraer" sigue deshabilitado (falta concepto)

### Paso 4: Ingresar Concepto
1. En campo "Detalle", escribir: "Pago a proveedor XYZ"
2. **Resultado Esperado**: 
   - El campo acepta el texto
   - Botón "Extraer" ahora habilitado

### Paso 5: Enviar Formulario
1. Hacer clic en botón "Extraer"
2. **Resultado Esperado**: 
   - Modal se cierra
   - Aparece mensaje de éxito
   - La página se recarga automáticamente

### Paso 6: Verificar Saldo Final
1. Observar el box "Caja actual (efectivo)"
2. **Resultado Esperado**: 
   - Caja muestra: $70.000,00 (100.000 - 30.000)

### Paso 7: Verificar Movimiento en Tabla
1. En la tabla de movimientos de caja, buscar el último registro
2. **Resultado Esperado**: 
   - Fecha: Hoy [hora actual]
   - Tipo: EGRESO (label rojo)
   - Monto: $30.000,00
   - Concepto: "PAGO A PROVEEDOR XYZ" (mayúsculas)

### Paso 8: Verificar en Dashboard
1. Navegar a "Inicio"
2. Observar box de Caja
3. **Resultado Esperado**: 
   - Box muestra: $70.000,00
   - Valor consistente con movimientos-caja

## Validaciones Críticas

### Validación 1: Monto Mayor al Saldo
1. Abrir modal "Extraer"
2. Escribir: 150000 (más del saldo disponible)
3. **Resultado Esperado**: 
   - Texto de ayuda rojo: "Saldo disponible: $100.000,00 (te faltan $50.000,00)"
   - Botón "Extraer" deshabilitado
   - No se puede enviar el formulario

### Validación 2: Monto Exacto al Saldo
1. Abrir modal "Extraer"
2. Escribir: 100000 (exactamente el saldo)
3. **Resultado Esperado**: 
   - Texto de ayuda verde: "Quedaría en caja: $0,00"
   - Botón "Extraer" habilitado
   - Se puede extraer todo el saldo

### Validación 3: Monto Cero
1. Escribir: 0
2. **Resultado Esperado**: 
   - Texto de ayuda vacío
   - Botón "Extraer" deshabilitado

### Validación 4: Monto Negativo
1. Escribir: -1000
2. **Resultado Esperado**: 
   - Sistema rechaza o convierte a positivo
   - Validación apropiada

### Validación 5: Concepto Vacío
1. Ingresar monto válido
2. Dejar concepto vacío
3. Intentar guardar
4. **Resultado Esperado**: 
   - Validación HTML5: "Por favor, rellene este campo"

### Validación 6: Validación en Tiempo Real
1. Escribir: 50000
2. Observar texto de ayuda: "Quedaría en caja: $50.000,00" (verde)
3. Cambiar a: 120000
4. Observar texto de ayuda: "Saldo disponible: $100.000,00 (te faltan $20.000,00)" (rojo)
5. **Resultado Esperado**: 
   - Validación se actualiza en tiempo real
   - Botón se habilita/deshabilita dinámicamente

## Validaciones Backend

### Validación 7: Bypass de Frontend
1. Usar herramientas de desarrollador
2. Habilitar botón "Extraer" manualmente
3. Modificar monto a 150000
4. Enviar formulario
5. **Resultado Esperado**: 
   - Backend rechaza la operación
   - Respuesta JSON: `{"ok": false, "msg": "Saldo insuficiente en caja"}`
   - Se muestra mensaje de error
   - Saldo NO cambia

## Resultado Esperado Final

- ✅ Saldo de caja reducido correctamente
- ✅ Movimiento EGRESO registrado en caja_movimientos
- ✅ Concepto correcto (en mayúsculas)
- ✅ Validaciones frontend funcionan
- ✅ Validaciones backend funcionan
- ✅ No se puede extraer más del saldo disponible
- ✅ Saldo consistente en todas las páginas

## Casos de Prueba Relacionados

- TC-CAJ-001: Ingreso a caja
- TC-CAJ-003: Movimientos de caja
- TC-TES-003: Validaciones de saldo

## Notas

- **CRÍTICO**: Las validaciones de saldo deben existir en frontend Y backend
- El frontend mejora UX, el backend garantiza seguridad
- No se puede extraer más dinero del disponible
- El concepto se convierte a mayúsculas automáticamente
- La validación es en tiempo real (al escribir)

## Criterios de Aceptación

- [ ] Modal se abre correctamente
- [ ] Validación en tiempo real funciona
- [ ] No se puede extraer más del saldo
- [ ] Validaciones backend funcionan
- [ ] Movimiento se registra correctamente
- [ ] Saldo se actualiza
- [ ] Concepto en mayúsculas
- [ ] Mensajes de error claros
- [ ] Botón se habilita/deshabilita correctamente

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
