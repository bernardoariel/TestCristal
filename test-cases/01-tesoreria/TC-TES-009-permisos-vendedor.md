# TC-TES-007: Permisos de Usuario Vendedor en Tesorería

## Información General

- **ID**: TC-TES-007
- **Módulo**: Tesorería - Permisos
- **Prioridad**: P0 - Crítico
- **Tipo**: Funcional - Seguridad
- **Autor**: QA Team
- **Fecha Creación**: 31/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que un usuario con perfil **vendedor** tiene permisos limitados en el módulo de tesorería:
- ✅ Puede ver saldo de caja
- ✅ Puede ingresar dinero a tesorería
- ✅ Puede listar movimientos de tesorería
- ✅ Puede ver historial de retiros
- ❌ NO puede retirar dinero de tesorería (debe solicitar)

## Precondiciones

1. Usuario autenticado: **vendedor** (perfil vendedor)
2. **Saldo en caja**: $25.000,00
3. **Saldo en tesorería**: $72.000.000,00 (o cualquier saldo)
4. Base de datos en estado conocido

## Datos de Prueba

- **Usuario**: vendedor
- **Perfil**: Vendedor
- **Saldo inicial caja**: $25.000,00
- **Saldo inicial tesorería**: 0
- **Monto a ingresar a tesoreria**: $10.000,00
- **Concepto**: "Ingreso desde vendedor"

## Pasos de Ejecución

### Paso 1: Verificar Dashboard (Inicio)
1. Iniciar sesión con usuario **vendedor**
2. Verificar que estás en la página "Inicio" (Dashboard)
3. **Resultado Esperado**: 
   - Se muestra el box "Caja actual (efectivo)"
   - Caja muestra: $25.000,00
   - **NO se muestra el box de Tesorería** (vendedor no tiene acceso desde Inicio)

### Paso 2: Navegar a Movimientos de Caja
1. Hacer clic en boton  "Listar de caja efectivo"
2. **Resultado Esperado**: 
   - Se carga la página "Movimientos de Caja"
   - Se muestran los siguientes boxes:
     * **Caja actual (efectivo)**: $25.000,00
     * **Ingresos del día**: (monto correspondiente)
     * **Egresos del día**: (monto correspondiente)
     * **Tesorería**: 0,00

### Paso 3: Verificar Box de Tesorería - Permisos Limitados
1. Observar el box de "Tesorería"
2. **Resultado Esperado**: 
   - Muestra saldo: $0,00
   - **Botones visibles**:
     * ✅ "Ingresar a tesorería" (puede ingresar)
     * ✅ "Listar" (puede ver movimientos)
     * ✅ "Historial" (puede ver historial de retiros)
   - **Botón NO visible**:
     * ❌ "Retirar" (NO tiene permiso para retirar)
     * En su lugar, debería ver "Solicitar" (si existe funcionalidad de solicitudes)

### Paso 4: Ingresar Dinero a Tesorería
1. En el box de Tesorería, hacer clic en "Ingresar a tesorería"
2. **Resultado Esperado**: 
   - Se abre modal "Transferir a Tesorería"
   - Modal tiene header azul
   - Muestra alerta: "Esta operación registrará un EGRESO en caja y un INGRESO en tesorería."
   - Campos visibles: Importe, Concepto
   - Botones: Cancelar, Transferir

3. En campo "Importe", escribir: 10000
4. En campo "Concepto", dice: "Envio a tesoreria"
5. **Resultado Esperado**: 
   - El campo acepta el valor
   - Aparece texto de ayuda : "Caja quedaría: 15.000,00"
   - Botón "Transferir" está habilitado

6. Hacer clic en botón "Transferir"
7. **Resultado Esperado**: 
   - Modal se cierra
   - La página se recarga automáticamente

### Paso 5: Verificar Saldos Después del Ingreso
1. Observar el box "Caja actual (efectivo)"
2. Observar el box "Tesorería"
3. **Resultado Esperado**: 
   - Caja muestra: $15.000,00 (25.000 - 10.000)
   - Tesorería muestra: $10.000,00 (0 + 10.000)

### Paso 6: Listar Movimientos de Tesorería
1. En el box de Tesorería, hacer clic en "Listar"
2. **Resultado Esperado**: 
   - Se carga la página "Tesorería"
   - Se muestra el box amarillo con saldo: $10.000,00
   - Se muestra tabla de movimientos de tesorería
   - El último movimiento (primero en la tabla) es:
     * Tipo: INGRESO (label verde)
     * Monto: $10.000,00
     * Concepto:"ENVIO A TESORERIA"
   - **Botones visibles en el box**:
     * ✅ "Ingresar" (puede ingresar)
     * ✅ "Historial" (puede ver historial)
   - **Botón NO visible**:
     * ❌ "Retirar" (NO tiene permiso)

### Paso 7: Verificar Movimiento en Caja
1. Navegar a "Movimientos de caja", tocando el boton listar de caja efectivo
2. En la tabla de movimientos de caja, buscar el último registro (primero de la tabla)
3. **Resultado Esperado**: 
   - Tipo: EGRESO (label rojo)
   - Monto: $10.000,00
   - Concepto: "Retiro para tesorería: Envio a tesoreria" 


## Criterios de Aceptación

- [ ] Vendedor puede ver saldo de caja
- [ ] Vendedor puede ingresar dinero a tesorería
- [ ] Vendedor puede listar movimientos de tesorería
- [ ] Vendedor puede ver historial de retiros
- [ ] Vendedor NO puede retirar dinero de tesorería
- [ ] Botón "Retirar" NO es visible para vendedor


## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
