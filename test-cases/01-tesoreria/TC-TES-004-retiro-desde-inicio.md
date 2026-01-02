# TC-TES-004: Retirar Dinero de Tesorería (desde Inicio)

## Información General

- **ID**: TC-TES-004
- **Módulo**: Tesorería
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario con permisos (cristal o superadmin) pueda retirar dinero de tesorería correctamente **desde la página Inicio (Dashboard)**, validando que:
1. Solo usuarios autorizados pueden retirar
2. El saldo se descuenta correctamente
3. Se crea un registro de retiro
4. Los movimientos se marcan con id_retiro

## Precondiciones

1. Usuario autenticado: **cristal** o **superadmin**
2. **Página inicial**: Inicio (Dashboard)
3. **Saldo en caja**: $25.000,00 (después de TC-TES-001/002/003)
4. **Saldo en tesorería**: $72.075.000,00 (después de TC-TES-001/002/003)
5. Existen movimientos activos 
6. Base de datos en estado conocido

## Datos de Prueba

- **Usuario**: cristal
- **Monto a retirar**: $5.000.000,00

## Pasos de Ejecución

### Paso 1: Verificar Dashboard (Inicio)
1. Verificar que estás en la página "Inicio" (Dashboard)
2. **Resultado Esperado**: Se muestran los boxes configurados para cristal, incluyendo box de Tesorería

### Paso 2: Verificar Saldo Inicial y Permisos
1. Observar el box "Tesorería"
2. **Resultado Esperado**: 
   - Tesorería muestra: $72.050.000,00
   - Botón "Retirar" está visible (solo para cristal/superadmin)
   - Si fuera vendedor, vería botón "Solicitar" en lugar de "Retirar"

### Paso 3: Abrir Modal de Retiro
1. En el box de Tesorería, hacer clic en "Retirar"
2. **Resultado Esperado**: 
   - Se abre modal con título "Retirar de Tesorería"
   - Modal tiene header amarillo
   - Muestra alerta con saldo disponible: "Saldo disponible: $72.050.000,00"
   - Campo "Importe" pre-llenado con el saldo total
   - Botones: Cancelar, Retirar

### Paso 4: Modificar Monto
1. Limpiar campo "Importe"
2. Escribir: 5000000
3. **Resultado Esperado**: 
   - El campo acepta el valor
   - Aparece texto de ayuda en verde: "Quedaría disponible: $67.050.000,00"
   - Botón "Retirar" está habilitado

### Paso 6: Enviar Formulario
1. Hacer clic en botón "Retirar"
2. **Resultado Esperado**: 
   - Modal se cierra
   - La página se recarga automáticamente

### Paso 7: Verificar Saldo Final
1. Observar el box "Tesorería" en el Dashboard
2. **Resultado Esperado**: 
   - Tesorería muestra: $67.075.000,00 

## Resultado Esperado Final

- ✅ Saldo de tesorería reducido correctamente: $72.050.000 → $67.075.000

## Casos de Prueba Relacionados

- TC-TES-001/002/003: Ingreso a tesorería (precondición)
- TC-TES-005: Retiro desde Movimientos de caja
- TC-TES-006: Retiro desde Tesorería
- TC-TES-007: Validaciones de saldo
- TC-TES-008: Historial de retiros
- TC-USR-001: Permisos de usuario cristal


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
