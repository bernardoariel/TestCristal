# TC-TES-006: Retirar Dinero de Tesorería (desde Tesorería)

## Información General

- **ID**: TC-TES-006
- **Módulo**: Tesorería
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario con permisos (cristal ) pueda retirar dinero de tesorería correctamente **desde la página Tesorería**, validando que:
1. Solo usuarios autorizados pueden retirar
2. El saldo se descuenta correctamente


## Precondiciones

1. Usuario autenticado: **cristal** 
2. **Página inicial**: Tesorería
3. **Saldo en caja**: $25.000,00 
4. **Saldo en tesorería**: $62.075.000,00 


## Datos de Prueba

- **Usuario**: cristal
- **Monto a retirar**: $15.000.000,00

## Pasos de Ejecución

### Paso 1: Navegar a Tesorería
1. En la caja de tesoreria tocar el boton listar
2. **Resultado Esperado**: Se muestra la página de tesorería con el box amarillo y la tabla de movimientos

### Paso 2: Verificar Saldo Inicial y Permisos
1. Observar el box "Tesorería"
2. **Resultado Esperado**: 
   - Tesorería muestra: $62.075.000,00
   - Botón "Retirar" está visible 

### Paso 3: Abrir Modal de Retiro
1. En el box de Tesorería, hacer clic en "Retirar"
2. **Resultado Esperado**: 
   - Se abre modal con título "Retirar DINERO DE  Tesorería"
   - Modal tiene header amarillo
   - Muestra el input CON EL IMPORTE SELECCIONADO DE 62.075.000,00, PRELLENADO 
   - Campo "Concepto" DICE: "RETIRO TOTAL DE TESORERIA"
   - Botones: Cancelar, Retirar

### Paso 4: Modificar Monto
1. Limpiar campo "Importe"
2. Escribir: 15.000.000,00
3. **Resultado Esperado**: 
   - El campo acepta el valor
   - Aparece texto de ayuda : "Quedaría: 47.075.000,00"
   - Botón "Retirar" está habilitado

### Paso 6: Enviar Formulario
1. Hacer clic en botón "Retirar"
2. **Resultado Esperado**: 
   - Modal se cierra
   - Aparece mensaje de éxito
   - La página se recarga automáticamente

### Paso 7: Verificar Saldo Final
1. Observar el box "Tesorería"
2. **Resultado Esperado**: 
   - Tesorería muestra: $47.075.000,00

### Paso 8: Verificar Movimientos Marcados (Misma Página)
1. Observar la tabla de movimientos de tesorería (en la misma página)
2. **Resultado Esperado**: 
   - Los movimientos antiguos aparecen en la tabla
   - el registro del ultimo movimiento es de egreso -15.000.000,00
   - **Ventaja de esta página**: Puedes ver inmediatamente que los movimientos desaparecieron

## Resultado Esperado Final

- ✅ Saldo de tesorería reducido correctamente

## Criterios de Aceptación

- [ ] Solo usuarios autorizados pueden retirar
- [ ] El saldo se actualiza correctamente


## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
