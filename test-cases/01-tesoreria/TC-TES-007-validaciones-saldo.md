# TC-TES-003: Validaciones de Saldo en Tesorería

## Información General

- **ID**: TC-TES-003
- **Módulo**: Tesorería
- **Prioridad**: P1 - Alto
- **Tipo**: Validación
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que todas las validaciones de saldo funcionan correctamente en las operaciones de tesorería, incluyendo:
1. Validación en tiempo real al escribir montos
2. Validación de saldo insuficiente
3. Validación de formato de números
4. Mensajes de error claros

## Precondiciones

1. Usuario autenticado: cristal
2. Saldo en caja: $25.000,00
3. Saldo en tesorería: $47.075.000,00
4. Navegar a inicio


## Escenarios de Prueba

---

## ESCENARIO 1: Validación en Tiempo Real - Ingreso a Tesorería

### Datos de Prueba
- Saldo en caja: $25.000,00
- Acción: Ingresar a tesorería

### Pasos
1. Abrir modal "Ingresar a tesorería"
2. En campo "Importe", escribir: 10000
3. **Resultado Esperado**: 
   - Texto de ayuda verde: "Caja quedaría: 24.000,00"
   - Botón "Enviar a Tesoreria" habilitado

4. Cambiar monto a: 25000
5. **Resultado Esperado**: 
   - Texto de ayuda verde: "Caja quedaría: 0,00"
   - Botón "Enviar a Tesoreria" habilitado

6. Cambiar monto a: 30000
7. **Resultado Esperado**: 
   - Texto de ayuda rojo: "Caja disponible: 25.000,00 (faltan 5.000,00)"
   - Botón "Enviar a Tesoreria" deshabilitado

---

## ESCENARIO 2: Validación en Tiempo Real - Retiro de Tesorería

### Datos de Prueba
- Saldo en tesorería: $47.075.000,00
- Acción: Retirar de tesorería

### Pasos
1. Abrir modal "Retirar de Tesorería"
3. Campo "Importe" pre-llenado con: 47.075.000,00
4. **Resultado Esperado**: 
   - Texto de ayuda verde: "Quedaría: 0,00"
   - Botón "Retirar" habilitado

5. Cambiar monto a: 50000
6. **Resultado Esperado**: 
   - Texto de ayuda verde: "Quedaría: 47.025.000,00"
   - Botón "Retirar" habilitado

7. Cambiar monto a: un monto superior a lo que se puede retirar
8. **Resultado Esperado**: 
   - Botón "Retirar" no se deshabilita
   - se vuelve a llenar con el importe maximo siempre que lo que escribamos es superior a lo que tenemos

---

## ESCENARIO 3: Validación de Formato de Números

### Datos de Prueba
- Diferentes formatos de entrada

### Pasos

#### Formato Argentino (Correcto)
1. Abrir modal "Ingresar a tesorería"
2. Escribir: 1.500,50 ( tocando el punto numeral del teclado numerico)
3. **Resultado Esperado**: 
   - Sistema acepta el formato


#### Formato Argentino (Incorrecto pero tolerado)
1. Escribir: 1,500.50 ( tocando el punto numeral del teclado )
2. **Resultado Esperado**: 
   - Sistema acepta el formato

---

## ESCENARIO 4: Validación de Montos Inválidos

### Pasos

#### Monto Cero
1. Abrir modal "Ingresar a tesorería"
2. Escribir: 0
3. **Resultado Esperado**: 
   - Texto de ayuda vacío
   - Botón "Transferir" deshabilitado

#### Monto Negativo--
1. Escribir: -1000
2. **Resultado Esperado**: 
   - Sistema no permite ingresar el simbolo menos


#### Texto
1. Escribir: "mil pesos"
2. **Resultado Esperado**: 
   - Campo no acepta texto


#### Vacío
1. Dejar campo vacío
2. Intentar enviar formulario
3. **Resultado Esperado**: 
   - no se habilita el boton
   - Formulario no se envía

---

## ESCENARIO 5: Validación de Saldo Cero

### Datos de Prueba
- Saldo en tesorería: $0,00

### Pasos
1. Navegar a página "Tesorería"
2. Observar botón "Retirar"
3. **Resultado Esperado**: 
   - Botón muestra mensaje: "Sin saldo disponible"
   - Al hacer clic, muestra alerta: "No hay dinero en tesorería para retirar"
   - Modal no se abre

---



## Criterios de Aceptación

- [ ] Validación en tiempo real funciona
- [ ] Saldo insuficiente se detecta
- [ ] Formato de números se maneja correctamente
- [ ] Montos inválidos se rechazan
- [ ] Conceptos inválidos se rechazan


## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
