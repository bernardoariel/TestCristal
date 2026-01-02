# TC-CAJ-001: Ingresar Dinero a Caja

## Información General

- **ID**: TC-CAJ-001
- **Módulo**: Caja
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario pueda ingresar dinero a caja efectivo correctamente, validando que:
1. El modal se abre correctamente
2. Los datos se validan
3. El movimiento se registra
4. El saldo se actualiza

## Precondiciones

1. Usuario autenticado (cualquier perfil)
2. Saldo en caja: $50.000,00 ( ingresar si hace falta )

## Datos de Prueba

- **Usuario**: vendedor
- **Monto a ingresar**: $25.000,00

## Pasos de Ejecución

### Paso 1: Navegar a Movimientos de Caja
1. Login como vendedor
2. Hacer clic en menú "Movimientos de caja" por medio del boton listar de caja efectivo
3. **Resultado Esperado**: 
   - Se muestra la página con los boxes
   - Box "Caja actual (efectivo)" muestra: $50.000,00

### Paso 2: Abrir Modal de Ingreso
1. En el box de Caja, hacer clic en "Ingresar"
2. **Resultado Esperado**: 
   - Se abre modal con título "Ingresar dinero a caja"
   - Modal tiene header verde
   - Campos visibles: Importe, Detalle
   - Campos vacíos
   - Botones: Cancelar, Guardar

### Paso 3: Ingresar Monto
1. En campo "Importe", escribir: 25000
2. **Resultado Esperado**: 
   - El campo acepta el valor
   - No hay validaciones de saldo máximo (es ingreso)
   - Botón "Guardar" sigue deshabilitado (falta concepto)

### Paso 4: Ingresar Concepto
1. En campo "Detalle", escribir: "Venta contado cliente ABC" 
2. **Resultado Esperado**: 
   - El campo acepta el texto
   - Botón "Guardar" ahora habilitado

### Paso 5: Enviar Formulario
1. Hacer clic en botón "Guardar"
2. **Resultado Esperado**: 
   - Modal se cierra
   - La página se recarga automáticamente

### Paso 6: Verificar Saldo Final
1. Observar el box "Caja actual (efectivo)"
2. **Resultado Esperado**: 
   - Caja muestra: $75.000,00 (50.000 + 25.000)

### Paso 7: Verificar Movimiento en Tabla
1. En la tabla de movimientos de caja, buscar el último registro
2. **Resultado Esperado**: 
   - Fecha: Hoy [hora actual]
   - Tipo: INGRESO (label verde)
   - Monto: $25.000,00
   - Concepto: "VENTA CONTADO CLIENTE ABC" (mayúsculas)

### Paso 8: Verificar en Dashboard
1. Navegar a "Inicio"
2. Observar box de Caja
3. **Resultado Esperado**: 
   - Box muestra: $75.000,00
   - Valor consistente con movimientos-caja

## Validaciones Adicionales

### Validación 1: Monto Cero
1. Abrir modal "Ingresar"
2. Escribir: 0
3. Intentar guardar
4. **Resultado Esperado**: 
   - Validación impide envío

### Validación 2: Concepto Vacío
1. Ingresar monto válido
2. Dejar concepto vacío
3. Intentar guardar
4. **Resultado Esperado**: 
   - Validación impide envío

## Resultado Esperado Final

- ✅ Saldo de caja incrementado correctamente
- ✅ Movimiento INGRESO registrado en caja_movimientos
- ✅ Concepto correcto (en mayúsculas)
- ✅ Fecha y hora correctas
- ✅ Saldo consistente en todas las páginas

## Criterios de Aceptación

- [ ] Modal se abre correctamente
- [ ] Campos aceptan datos válidos
- [ ] Validaciones funcionan
- [ ] Movimiento se registra correctamente
- [ ] Saldo se actualiza
- [ ] Concepto en mayúsculas
- [ ] Consistencia entre páginas

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
