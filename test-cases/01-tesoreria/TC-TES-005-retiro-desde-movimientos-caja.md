# TC-TES-005: Retirar Dinero de Tesorería (desde Movimientos de Caja)

## Información General

- **ID**: TC-TES-005
- **Módulo**: Tesorería
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario con permisos (cristal o superadmin) pueda retirar dinero de tesorería correctamente **desde la página Movimientos de Caja**, validando que:
1. Solo usuarios autorizados pueden retirar
2. El saldo se descuenta correctamente
3. Se crea un registro de retiro
4. Los movimientos se marcan con id_retiro

## Precondiciones

1. Usuario autenticado: **cristal** 
2. **Página inicial**: Movimientos de Caja
3. **Saldo en caja**: $25.000,00 
4. **Saldo en tesorería**: $67.075.000,00 
5. Existen movimientos activos 
6. Base de datos en estado conocido

## Datos de Prueba

- **Usuario**: cristal
- **Monto a retirar**: $5.000.000,00

## Pasos de Ejecución

### Paso 1: Navegar a Movimientos de Caja
1. Hacer clic en boton listar de la caja de efectivo
2. **Resultado Esperado**: Se muestra la página con los boxes, incluyendo box de Tesorería, la url que se muestra: http://distribuidora.local/movimientos-caja

### Paso 2: Verificar Saldo Inicial y Permisos
1. Observar el box "Tesorería"
2. **Resultado Esperado**: 
   - Tesorería muestra: $67.075.000,00
   - Botón "Retirar" está visible (solo para cristal/superadmin)

### Paso 3: Abrir Modal de Retiro
1. En el box de Tesorería, hacer clic en "Retirar"
2. **Resultado Esperado**: 
   - Se abre modal con título "Retirar de Tesorería"
   - Modal tiene header amarillo
   - Muestra alerta con saldo disponible: "Saldo disponible: $67.075.000,00"
   - Campo "Importe" pre-llenado con el saldo total
   - Campo "Concepto" : "RETIRO TOTAL DE TESORERIA"
   - Botones: Cancelar, Retirar

### Paso 4: Modificar Monto
2. Escribir: 5000000
3. **Resultado Esperado**: 
   - El campo acepta el valor
   - Aparece texto de ayuda en verde: "Quedaría: 62.075.000,00"
   - Botón "Retirar" está habilitado

### Paso 5: Ingresar Concepto
1. En campo "Concepto", DICE: "RETIRO PARCIAL DE TESORERIA"


### Paso 6: Enviar Formulario
1. Hacer clic en botón "Retirar"
2. **Resultado Esperado**: 
   - Modal se cierra
   - La página se recarga automáticamente

### Paso 7: Verificar Saldo Final
1. Observar el box "Tesorería"
2. **Resultado Esperado**: 
   - Tesorería muestra: $62.075.000,00

## Resultado Esperado Final

- ✅ Saldo de tesorería reducido correctamente: $72.050.000 → $67.050.000



## Criterios de Aceptación

- [ ] Solo usuarios autorizados pueden retirar
- [ ] El saldo se actualiza correctamente
- [ ] Se crea registro en tabla "retiros"
- [ ] Los movimientos se marcan con id_retiro
- [ ] El historial se actualiza
- [ ] Las validaciones funcionan correctamente
- [ ] Los mensajes son claros

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
