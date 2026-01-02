# TC-INT-003: Flujo Completo Solicitud-Aprobación-Transferencia

## Información General

- **ID**: TC-INT-003
- **Módulo**: Integración
- **Prioridad**: P0 - Crítico
- **Tipo**: End-to-End
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar el flujo completo desde que un vendedor crea una solicitud hasta que un administrador la aprueba y el dinero se transfiere a caja, validando que todas las partes del sistema se integran correctamente.

## Precondiciones

1. Usuarios autenticados:
   - **vendedor**: Usuario sin permisos de retiro
   - **cristal**: Usuario con permisos de aprobación
2. Base de datos en estado conocido:
   - Saldo en caja: $100.000,00
   - Saldo en tesorería: $72.000.000,00
3. Sin solicitudes pendientes

## Datos de Prueba

- **Usuario solicitante**: vendedor
- **Usuario aprobador**: cristal
- **Importe**: $2.000.000,00
- **Concepto**: "Gastos operativos sucursal norte"

## Flujo Completo

---

## FASE 1: Creación de Solicitud (Usuario: vendedor)

### Paso 1.1: Login como Vendedor
1. Login con usuario: vendedor
2. **Resultado Esperado**: 
   - Login exitoso
   - Dashboard de vendedor visible

### Paso 1.2: Verificar Saldos Iniciales
1. Navegar a "Movimientos de caja"
2. Anotar saldos:
   - Caja: $100.000,00
   - Tesorería: $72.000.000,00
3. **Resultado Esperado**: 
   - Saldos registrados para comparación

### Paso 1.3: Verificar Restricción de Retiro
1. Observar box de Tesorería
2. **Resultado Esperado**: 
   - Botón "Retirar" NO visible
   - Botón "Solicitar" SÍ visible
   - vendedor no puede retirar directamente

### Paso 1.4: Crear Solicitud
1. Hacer clic en "Solicitar"
2. Ingresar importe: 2000000
3. Ingresar concepto: "Gastos operativos sucursal norte"
4. Hacer clic en "Enviar Solicitud"
5. **Resultado Esperado**: 
   - Modal se cierra
   - Mensaje: "Solicitud enviada correctamente. Será revisada por un administrador."
   - Página se recarga

### Paso 1.5: Verificar Solicitud Creada
1. Navegar a "Solicitudes"
2. Verificar tab "Pendientes"
3. **Resultado Esperado**: 
   - Solicitud aparece en la tabla
   - Usuario: vendedor
   - Importe: $2.000.000,00
   - Concepto: "Gastos operativos sucursal norte"
   - Estado: Pendiente
   - Botones "Aprobar" y "Descartar" NO visibles (vendedor no puede aprobar)

### Paso 1.6: Verificar que NO Afecta Saldos
1. Verificar saldos actuales
2. **Resultado Esperado**: 
   - Caja: $100.000,00 (sin cambios)
   - Tesorería: $72.000.000,00 (sin cambios)
   - La solicitud NO afecta saldos hasta ser aprobada

---

## FASE 2: Aprobación de Solicitud (Usuario: cristal)

### Paso 2.1: Logout y Login como Administrador
1. Logout de vendedor
2. Login con usuario: cristal
3. **Resultado Esperado**: 
   - Login exitoso
   - Dashboard de administrador visible

### Paso 2.2: Navegar a Solicitudes
1. Hacer clic en menú "Solicitudes"
2. **Resultado Esperado**: 
   - Página de solicitudes se carga
   - Tab "Pendientes" activo

### Paso 2.3: Verificar Solicitud Pendiente
1. Observar tabla en tab "Pendientes"
2. Buscar solicitud de vendedor
3. **Resultado Esperado**: 
   - Solicitud visible
   - Usuario: vendedor
   - Importe: $2.000.000,00
   - Concepto: "Gastos operativos sucursal norte"
   - Botones "Aprobar" y "Descartar" SÍ visibles (cristal puede aprobar)

### Paso 2.4: Aprobar Solicitud
1. Hacer clic en botón "Aprobar"
2. **Resultado Esperado**: 
   - Mensaje de éxito: "Solicitud aprobada correctamente"
   - Página se recarga o actualiza

### Paso 2.5: Verificar que Desaparece de Pendientes
1. Observar tab "Pendientes"
2. **Resultado Esperado**: 
   - La solicitud YA NO aparece en "Pendientes"

### Paso 2.6: Verificar en Tab Aprobadas
1. Hacer clic en tab "Aprobadas"
2. **Resultado Esperado**: 
   - La solicitud AHORA aparece en "Aprobadas"
   - Muestra fecha de aprobación
   - Muestra usuario que aprobó: cristal

---

## FASE 3: Verificación de Transferencia

### Paso 3.1: Verificar Saldo de Tesorería
1. Navegar a "Tesorería"
2. Observar saldo
3. **Resultado Esperado**: 
   - Tesorería: $70.000.000,00 (72.000.000 - 2.000.000)
   - Saldo reducido correctamente

### Paso 3.2: Verificar Movimiento en Tesorería
1. Observar tabla de movimientos de tesorería
2. Buscar el último registro
3. **Resultado Esperado**: 
   - Fecha: Hoy [hora de aprobación]
   - Tipo: EGRESO (label rojo)
   - Monto: -$2.000.000,00 (negativo)
   - Concepto: "SOLICITUD APROBADA: Gastos operativos sucursal norte"
   - id_retiro: NULL

### Paso 3.3: Verificar Saldo de Caja
1. Navegar a "Movimientos de caja"
2. Observar saldo
3. **Resultado Esperado**: 
   - Caja: $102.000.000,00 (100.000 + 2.000.000)
   - Saldo incrementado correctamente

### Paso 3.4: Verificar Movimiento en Caja
1. Observar tabla de movimientos de caja
2. Buscar el último registro
3. **Resultado Esperado**: 
   - Fecha: Hoy [hora de aprobación]
   - Tipo: INGRESO (label verde)
   - Monto: +$2.000.000,00 (positivo)
   - Concepto: "SOLICITUD APROBADA: Gastos operativos sucursal norte"

---

## FASE 4: Verificación desde Vendedor

### Paso 4.1: Logout y Login como Vendedor
1. Logout de cristal
2. Login con usuario: vendedor
3. **Resultado Esperado**: 
   - Login exitoso

### Paso 4.2: Verificar Solicitud Aprobada
1. Navegar a "Solicitudes"
2. Hacer clic en tab "Aprobadas"
3. **Resultado Esperado**: 
   - Su solicitud aparece en "Aprobadas"
   - Muestra fecha de aprobación
   - Muestra usuario que aprobó: cristal
   - vendedor puede ver que su solicitud fue aprobada

### Paso 4.3: Verificar Saldo de Caja Actualizado
1. Navegar a "Movimientos de caja"
2. Observar saldo
3. **Resultado Esperado**: 
   - Caja: $102.000.000,00
   - vendedor puede ver que el dinero está disponible en caja

### Paso 4.4: Verificar Movimiento en Caja
1. Observar tabla de movimientos
2. **Resultado Esperado**: 
   - vendedor puede ver el movimiento INGRESO
   - Concepto: "SOLICITUD APROBADA: Gastos operativos sucursal norte"
   - Puede identificar que es su solicitud aprobada

---

## FASE 5: Verificación de Consistencia

### Paso 5.1: Verificar en Dashboard
1. Navegar a "Inicio"
2. Observar boxes
3. **Resultado Esperado**: 
   - Box Caja: $102.000.000,00
   - Box Tesorería: $70.000.000,00
   - Valores consistentes con movimientos

### Paso 5.2: Verificar Exportación
1. En "Movimientos de caja", exportar a Excel
2. Abrir archivo
3. **Resultado Esperado**: 
   - Archivo contiene el movimiento de la solicitud aprobada

4. En "Tesorería", exportar a Excel
5. Abrir archivo
6. **Resultado Esperado**: 
   - Archivo contiene el movimiento EGRESO de la solicitud

### Paso 5.3: Verificar Atomicidad
1. Verificar que ambos movimientos tienen la misma fecha/hora
2. **Resultado Esperado**: 
   - Movimientos sincronizados
   - Operación fue atómica

---

## FASE 6: Pruebas Negativas

### Prueba 1: Intentar Aprobar Dos Veces
1. Login como cristal
2. Intentar aprobar la misma solicitud nuevamente
3. **Resultado Esperado**: 
   - Sistema rechaza
   - Mensaje: "Esta solicitud ya fue procesada"
   - NO se duplican movimientos

### Prueba 2: Solicitud con Saldo Insuficiente
1. Login como vendedor
2. Crear solicitud de $100.000.000,00 (más del saldo)
3. Login como cristal
4. Intentar aprobar
5. **Resultado Esperado**: 
   - Sistema rechaza
   - Mensaje: "Saldo insuficiente en tesorería"
   - Solicitud permanece en "Pendientes"
   - NO se crean movimientos

### Prueba 3: Vendedor Intenta Aprobar
1. Login como vendedor
2. Navegar a "Solicitudes"
3. **Resultado Esperado**: 
   - Botones "Aprobar" y "Descartar" NO visibles
   - vendedor no puede aprobar sus propias solicitudes

---

## Checklist de Verificación Final

- [ ] vendedor puede crear solicitud
- [ ] Solicitud NO afecta saldos al crearla
- [ ] cristal puede ver la solicitud pendiente
- [ ] cristal puede aprobar la solicitud
- [ ] Saldo de tesorería se reduce: -$2.000.000
- [ ] Saldo de caja se incrementa: +$2.000.000
- [ ] Movimiento EGRESO en tesorería con concepto correcto
- [ ] Movimiento INGRESO en caja con concepto correcto
- [ ] Solicitud se mueve a tab "Aprobadas"
- [ ] vendedor puede ver su solicitud aprobada
- [ ] vendedor puede ver el dinero en caja
- [ ] Saldos consistentes en todas las páginas
- [ ] Operación es atómica
- [ ] NO se puede aprobar dos veces
- [ ] Validación de saldo funciona
- [ ] vendedor NO puede aprobar solicitudes

## Resultado Esperado Final

- ✅ Flujo completo funciona sin errores
- ✅ Todas las fases pasan
- ✅ Permisos se respetan
- ✅ Transferencia es correcta
- ✅ Operación es atómica
- ✅ Saldos son consistentes
- ✅ Validaciones funcionan

## Casos de Prueba Relacionados

- TC-SOL-001: Crear solicitud
- TC-SOL-002: Aprobar solicitud
- TC-USR-001: Permisos de cristal
- TC-USR-003: Permisos de vendedor

## Notas Críticas

- **Flujo completo**: Este es el flujo más común en el sistema
- **Permisos**: Demuestra la separación de permisos (solicitar vs aprobar)
- **Atomicidad**: La aprobación debe ser atómica (ambos movimientos o ninguno)
- **Trazabilidad**: El concepto permite rastrear el origen del dinero

## Criterios de Aceptación

- [ ] Flujo completo funciona
- [ ] Permisos se respetan
- [ ] Transferencia es correcta
- [ ] Operación es atómica
- [ ] Saldos consistentes
- [ ] Validaciones funcionan
- [ ] Trazabilidad completa

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Fase Fallida | Notas |
|-------|----------|-----------|--------------|-------|
| - | - | - | - | - |
