# TC-USR-004: Dashboard Personalizado por Usuario

## Información General

- **ID**: TC-USR-004
- **Módulo**: Usuarios / Dashboard
- **Prioridad**: P1 - Alto
- **Tipo**: Funcional
- **Autor**: QA Team
- **Fecha Creación**: 28/12/2025
- **Última Ejecución**: -
- **Estado**: ⏸️ Pendiente

## Descripción

Verificar que el sistema de dashboard personalizado funciona correctamente, mostrando diferentes layouts y componentes según el perfil del usuario configurado en `config/dashboard-usuarios.json`.

## Precondiciones

1. Archivo `config/dashboard-usuarios.json` existe y está bien formado
2. Existen configuraciones para diferentes perfiles
3. Usuarios de prueba con diferentes perfiles
4. Datos en el sistema para mostrar en los boxes

## Datos de Prueba

### Perfiles Configurados
- Administrador (cristal, superadmin, administrador)
- Vendedor (vendedor)
- Stock (stock)

## Pasos de Ejecución

---

## ESCENARIO 1: Dashboard de Administrador (cristal)

### Paso 1: Login como cristal
1. Login con usuario: cristal
2. **Resultado Esperado**: Redirige a dashboard

### Paso 2: Verificar Estructura del Dashboard
1. Observar el layout del dashboard
2. **Resultado Esperado**: 
   - Se muestran boxes configurados para perfil "Administrador"
   - Layout según config JSON
   - Todos los componentes visibles

### Paso 3: Verificar Box de Caja
1. Observar box "Caja"
2. **Resultado Esperado**: 
   - Título: "Caja"
   - Valor: Saldo actual de caja (formato: $X.XXX.XXX,XX)
   - Icono: fa-money
   - Color: bg-purple
   - Tamaño: según configuración
   - Botones: Ingresar, Listar, Extraer

### Paso 4: Verificar Box de Tesorería
1. Observar box "Tesorería"
2. **Resultado Esperado**: 
   - Título: "Tesorería"
   - Valor: Saldo de tesorería (formato: $X.XXX.XXX,XX)
   - Icono: fa-bank
   - Color: bg-yellow
   - Tamaño: según configuración
   - Botones: Ingresar, Retirar (solo para cristal/superadmin)

### Paso 5: Verificar Box de Solicitudes
1. Observar box "Solicitudes"
2. **Resultado Esperado**: 
   - Título: "Solicitudes"
   - Valor: Total de solicitudes pendientes
   - Icono: fa-bank
   - Color: bg-orange
   - Tamaño: completo
   - Botones: Solicitudes, Listar, Historial

### Paso 6: Verificar Formato de Montos
1. Observar todos los valores monetarios
2. **Resultado Esperado**: 
   - Formato argentino: $52.335.502,95
   - Punto para miles
   - Coma para decimales
   - Siempre 2 decimales

### Paso 7: Verificar Auto-ajuste de Fuente
1. Observar boxes con valores grandes (ej: $72.000.000,00)
2. **Resultado Esperado**: 
   - Fuente se ajusta automáticamente para que quepa
   - No hay overflow
   - Texto legible

3. Observar boxes con valores pequeños (ej: $1.000,00)
4. **Resultado Esperado**: 
   - Fuente más grande
   - Aprovecha el espacio disponible

### Paso 8: Verificar Funcionalidad de Botones
1. Hacer clic en botón "Ingresar" del box de Caja
2. **Resultado Esperado**: 
   - Abre modal "Ingresar dinero a caja"
   - Modal funcional

3. Hacer clic en botón "Listar" del box de Tesorería
4. **Resultado Esperado**: 
   - Navega a página "Tesorería"
   - Muestra movimientos

### Paso 9: Verificar Responsive
1. Reducir tamaño de ventana a tablet (768px)
2. **Resultado Esperado**: 
   - Boxes se reorganizan
   - Tamaños se adaptan (completo, mitad, tercio)
   - Todo sigue visible y funcional

3. Reducir a mobile (375px)
4. **Resultado Esperado**: 
   - Boxes en columna única
   - Botones accesibles
   - Valores legibles

---

## ESCENARIO 2: Dashboard de Vendedor

### Paso 1: Login como vendedor
1. Logout de cristal
2. Login con usuario: vendedor
3. **Resultado Esperado**: Redirige a dashboard

### Paso 2: Verificar Dashboard Diferente
1. Observar el layout del dashboard
2. **Resultado Esperado**: 
   - Dashboard diferente al de administrador
   - Boxes configurados para perfil "Vendedor"
   - Menos opciones que administrador

### Paso 3: Verificar Restricciones
1. Observar box de Tesorería (si está visible)
2. **Resultado Esperado**: 
   - Botón "Retirar" NO visible
   - Botón "Solicitar" visible en su lugar
   - Otros botones según permisos

---

## ESCENARIO 3: Verificar Configuración JSON

### Paso 1: Leer Archivo de Configuración
1. Abrir `config/dashboard-usuarios.json`
2. **Resultado Esperado**: 
   - JSON bien formado
   - Estructura correcta
   - Perfiles definidos

### Paso 2: Verificar Estructura de Componentes
1. Revisar configuración de un box
2. **Resultado Esperado**: 
```json
{
  "tipo": "caja",
  "titulo": "Caja",
  "valor_funcion": "getSaldoCaja",
  "icono": "fa-money",
  "color": "bg-purple",
  "link": "movimientos-caja",
  "tamaño": "mitad",
  "tamaño_fuente": "auto",
  "botones": [
    {"texto": "Ingresar", "icono": "fa-plus", "link": "#", "modal": "modalIngresar"},
    {"texto": "Listar", "icono": "fa-list", "link": "movimientos-caja"},
    {"texto": "Extraer", "icono": "fa-minus", "link": "#", "modal": "modalExtraer"}
  ]
}
```

### Paso 3: Verificar Funciones de Valor
1. Revisar que todas las funciones existen en `helpers/dashboard.helper.php`
2. **Resultado Esperado**: 
   - getSaldoCaja() existe
   - getSaldoTesoreria() existe
   - getTotalSolicitudes() existe
   - Todas retornan valores correctos

---

## ESCENARIO 4: Modificar Configuración

### Paso 1: Cambiar Orden de Boxes
1. Editar `config/dashboard-usuarios.json`
2. Cambiar orden de boxes para perfil "Administrador"
3. Guardar archivo
4. Recargar dashboard
5. **Resultado Esperado**: 
   - Boxes se muestran en el nuevo orden
   - Sin errores

### Paso 2: Cambiar Tamaño de Box
1. Cambiar tamaño de box de "mitad" a "completo"
2. Guardar y recargar
3. **Resultado Esperado**: 
   - Box ocupa ancho completo
   - Otros boxes se ajustan

### Paso 3: Agregar Nuevo Botón
1. Agregar nuevo botón a un box
2. Guardar y recargar
3. **Resultado Esperado**: 
   - Nuevo botón visible
   - Funcional si el link/modal existe

---

## Tamaños Disponibles

| Tamaño | Clase Bootstrap | Ancho Desktop | Ancho Tablet | Ancho Mobile |
|--------|----------------|---------------|--------------|--------------|
| completo | col-lg-12 | 100% | 100% | 100% |
| mitad | col-lg-6 | 50% | 50% | 100% |
| tercio | col-lg-4 | 33% | 50% | 100% |
| dos-tercios | col-lg-8 | 66% | 100% | 100% |

## Colores Disponibles

- bg-purple: Morado (Caja)
- bg-yellow: Amarillo (Tesorería)
- bg-green: Verde (Ingresos)
- bg-red: Rojo (Egresos)
- bg-blue: Azul (Info)
- bg-orange: Naranja (Solicitudes)

## Resultado Esperado Final

- ✅ Dashboard se personaliza según perfil
- ✅ Boxes se muestran correctamente
- ✅ Valores se calculan correctamente
- ✅ Formato argentino funciona
- ✅ Auto-ajuste de fuente funciona
- ✅ Botones son funcionales
- ✅ Responsive funciona
- ✅ Configuración JSON es flexible

## Casos de Prueba Relacionados

- TC-USR-001: Permisos de cristal
- TC-USR-002: Permisos de superadmin
- TC-USR-003: Permisos de vendedor

## Notas

- El dashboard es la primera impresión del sistema
- Debe ser rápido de cargar (< 2 segundos)
- Los valores deben ser en tiempo real
- La configuración JSON permite personalización sin código

## Criterios de Aceptación

- [ ] Dashboard se personaliza por perfil
- [ ] Boxes se muestran correctamente
- [ ] Valores son correctos y en tiempo real
- [ ] Formato argentino funciona
- [ ] Auto-ajuste de fuente funciona
- [ ] Botones son funcionales
- [ ] Responsive funciona en todas las resoluciones
- [ ] Configuración JSON es fácil de modificar
- [ ] Performance es aceptable

## Bugs Conocidos

- Ninguno

## Historial de Ejecución

| Fecha | Ejecutor | Resultado | Notas |
|-------|----------|-----------|-------|
| - | - | - | - |
