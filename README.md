EA2 - Sitio Web Dinámico con JavaScript
Tema del proyecto
TechZone Store es un sitio web dinámico desarrollado con HTML, CSS y JavaScript (Vanilla JS). 
Simula una tienda en línea de productos tecnológicos, donde el usuario puede buscar, filtrar, ordenar y agregar artículos a un carrito persistente.

Objetivo
Demostrar el uso de:
- Manipulación avanzada del DOM.
- Eventos sin recargar la página.
- Carga de datos externos mediante Fetch API desde un archivo JSON local.
- Persistencia de datos con LocalStorage.
- Código organizado de forma modular con funciones y clases.

Funcionalidades principales
- Catálogo dinámico generado desde products.json.
- Búsqueda en tiempo real por nombre o descripción.
- Filtro por categoría.
- Ordenamiento por precio y nombre.
- Carrito de compras dinámico.
- Persistencia del carrito con LocalStorage.
- Interfaz responsiva y moderna.
- Notificaciones visuales al agregar productos o vaciar el carrito.

Estructura del proyecto
bash
EA2-Sitio-Web-Dinamico/
index.html
style.css
data/
    products.json
    js/
        main.js
        productService.js
        cart.js
        storage.js
        ui.js

Desafíos resueltos
1. Separación de responsabilidades:
   - productService.js carga los datos.
   - cart.js controla la lógica del carrito.
   - storage.js administra LocalStorage.
   - ui.js se encarga de renderizar la interfaz.
   - main.js coordina la aplicación.

2. Persistencia de información:
   - El carrito se guarda en el navegador para no perder los datos al recargar la página.

3. Contenido dinámico:
   - Los productos se generan automáticamente desde un JSON local.

4. Experiencia del usuario:
   - Se añadieron filtros, ordenamiento, notificaciones y diseño adaptable a celular.

Cómo ejecutar el proyecto
1. Descarga o clona el repositorio.
2. Abre la carpeta del proyecto en Visual Studio Code.
3. Ejecuta el proyecto con una extensión como Live Server.
4. Verifica que cargue correctamente el archivo products.json.

Tecnologías utilizadas
- HTML5
- CSS3
- JavaScript (ES6 Modules)
- LocalStorage
- Fetch API

## Autor
Nombre del alumno: Diego Avalos Izquierdo  
Materia: Programación Web 
Semestre: 4to Semestre
