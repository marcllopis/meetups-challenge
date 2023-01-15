# MEETUPS CHALLENGE

## La página online

Para una fácil visualización del proyecto, se puede ver el sitio en vivo [aquí](https://meetup-challenge-marc-llopis.netlify.app/)

![my team landing](https://i.imgur.com/bxVUmsD.png)

## Instalación en local

Para instalar y ejecutar este proyecto en local, se va a necesitar seguir los siguientes pasos.

Clona este repositorio en una carpeta de tu ordenador y ejecuta el comando `npm install`.

Cuando todo haya sido instalado, utiliza `npm start` para lanzar el servidor en [http://localhost:3000](http://localhost:3000) y poderlo ver en tu navegador. _Nota: Este proyecto fue creado con Create React app, más información se puede encontrar en su documentación oficial [aquí](https://github.com/facebook/create-react-app)_.

## Tecnologías utilizadas

Para crear esta aplicación se han utilizado:

- React v17.0.2
- React Router v6.6.2
- Styled components 5.3.6
- Jest y react-testing-library (incluidas en create-react-app)
- React toastify 9.1.1
- Cypress 12.3.0
- LocalStorage para mantener la información creada
- Netlify para el deploy final

## Proyecto y estructura de los ficheros

Para este proyecto se ha decidido mantener la base de la estructura inicial y construir las nuevas funcionalidades a partir de ahí.

El principal fichero sigue siendo `app.js` que sigue mantiendo la lógica para mostrar que contenido aparece en cada momento. Ahora se utiliza `react-router` para, depende de en que url te encuentras, mostrar un componente u otro. Este también se encarga de redirigir a la página principal cualquier path incorrecto.

Existe una carpeta `/pages` que es la encargada de mostrar el contenido por cada ruta creada a través de `react-router` y en la carpeta `/components` se mantiene la misma estructura de `/layout`, `/meetups` y `/ui`.

Se ha añadido una carpeta nueva `/context` dónde se ha creado un `Context` para toda esta aplicación. La razón principal ha sido para facilitar el manejo de distintas props en varios componentes. Por ejemplo:

- La aplicación empieza sin ningún meetup marcado como favorito, pero cuándo seleccionamos uno, lo añadimos a un array que almacena solo los meetups marcados como favoritos. Vamos a utilizar a este array en 2 sitios distintos, uno en la página de favoritos para mostrar esos meetups y también vamos a utilizar la propiedad `.length` de este array para mostrar en la barra de navegación, cuántos favoritos tenemos en todo momento. Gracias a almacenar esto en `Context` nos permite "escuchar" a cualquier cambio y actualizar en todos los componentes que lo consumen sin problema.

Se ha creado también, dentro de la carpeta `/utils` un nuevo `hook` llamado `useLocalStorage` que nos permite almacenar el estado de un componente en el local storage de nuestro navegador. Esto nos permite simular la persistencia de la información que tendría una página como esta ya que sin utilizar un backend conectado a una base de datos nos sería imposible.

Este `hook` hace que cualquier decisión tomada en la página como añadir / borrar un meetup de favoritos o crear uno de nuevo, persista en nuestro navegador y aunque refresquemos o cerremos el navegador, al volver a abrirlo esta información se mantiene ahí. Es útil trabajar con localStorage en situaciones dónde queremos hacer una demo a stakeholders o product owners ya que el funcionamiento parece más real y gracias a este `useLocalStorage hook` podemos reutilzar esa funcionalidad de forma simple.

### El header de la página

Para el header de esta página, se ha mantenido la estructura ya hecha y se ha añadido a cada link la funcionalidad específica de `react-router` para así poder crear un `path` nuevo al clicarlos.

Se ha creado, en `app.js` una animación para hacer desaparecer el header al hacer `scroll` hacia abajo y volver a aparecer al hacer `scroll` hacia arriba.

Este es el código encargado de ello:

```javascript
const [lastScroll, setLastScroll] = useState(0);
const [visible, setVisible] = useState(true);

useEffect(() => {
  function handleScroll() {
    const currentScroll = window.pageYOffset;
    currentScroll > lastScroll && currentScroll > 0
      ? setVisible(false)
      : setVisible(true);
    setLastScroll(currentScroll);
  }
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [lastScroll]);
```

Se utiliza `useEffect` para escuchar al evento de `scroll` en el objeto `window` del navegador. Cuándo este se lanza, se llama a la función de `handleScroll`. Esta función se encarga de capturar la posición Y del actual `scroll` y la compara con la última, almacenada en `lastScroll`. Si es mayor y también mayor a 0 cambiará el valor de la propiedad `visible`.
Al pasar a la fase de `unmount` se llama al método de `removeEventListener` para prevenir cualquier `memory leak`.

### La página de todos los meetups

En esta página se ha mantenido la estructura incial con algunos ajustes.

Se ha refactorizado dónde se hace la llamada api para poder reaprovechar el componente en otras secciones como `Favoritos` y también se itera sobre todos los objetos en `/data.json` ya que antes solo se mostraba el primer meetup de forma repetida.

El array de `meetups` que recibe este componente, también incluye los meetups que se creen de forma local a través del formulario de `New meetup` así se pueden ver los originales más los nuevos.

### La página de nuevo meetup

Se ha decidido incorporar también al proyecto la creación de un nuevo meetup. Este paso debería incluir el guardarlo en una base de datos mediante una conexión con un backend pero se ha optado por seguir utilizando `local storage` para almacenar en el propio navegador de forma temporal los nuevos meetups que se crean.

Al crear un nuevo meetup, una notificación aparece par dar al usuario visibilidad de que este ha sido creado.

### La página de favoritos

Esta página se aprovecha de reutilizar los componentes que se usan en la página de todos los meetups para mostrar solo los que han sido añadidos al array de favoritos. También se da la opción de poder eliminarlos desde aquí ya que el botón cambia la funcionalidad.

### El componente MeetupItem

Conviene destacar este componente ya que tiene cierta lógica encargada de gestionar que sucede si un meetup se añade o quita de favoritos.

Primero, hay que mencionar que este componente se muestra tanto en la página de todos los meetups como en la de favoritos y es por `props` que se consigue que el botón muestre el texto y la función de añadir a favoritos o de eliminar.

Al dar a este botón, si se está llamando a la función de añadir a favoritos se comprueba que:

- El meetup que se ha seleccionado no esté ya marcado como favorito. Para esto se va a mirar al array de favoritos en local storage (que simularía una base de datos) y si lo encuentra, se activa la notificación de que este meetup está duplicado.

- El meetup se añade como favorito. Para esto primero se conecta a local storage y se añade en el array de favoritos junto a los que ya existían. También se actualiza este array en Context ya que esto va a lanzar una actualización al header que consume el número de favoritos disponibles y se lanza la correspondiente notificación.

Si se está quitando de favoritos:

- El meetup se elimina de favoritos. Se hace el proceso inverso a añadirlo. Se conecta con local storage para buscar ese meetup del array de favoritos y eliminarlo, de igual forma se actualiza en Context y se lanza la correspondiente notificación.

### Otros elementos a destacar

Hay algunos elementos que se han cambiado del código original, como el componente `Card` que ahora pasa a utilizar `styled-components`, de la misma forma que el botón se ha refactorizado para usar también esta librería y permitir así, de forma sencilla, ejecutar unas props u otras dependiendo de dónde se utiliza. Esta lógica se encuentra ahora en el componente `Button`

También se utiliza, como se comento anteriormente, un sistema de notificaciones con la librería de `react-toastify` para mostrar al usuario que las acciones que ha tomado tienen un efecto.

## Testing

### Tests unitarios

Para hacer un testeo de forma unitaria de componentes y métodos, se han utilizado `Jest` y `react-testing-library`. Todos los tests se encuentran dentro de la carpeta `__tests__` de cada componente.

Se ha intentado testear todos los funcionalidades "críticas" de la aplicación para asegurar el funcionamiento.

Para ejecutar los tests, se puede usar el script:

```
npm test
```

Para comprobar la buena calidad de los tests, se puede utilizar también el script:

```
npm run test -- --coverage .
```

Y así ver el coverage general en el proyecto.

**_Nota: Para todos los ficheros de tests, se ha decidido mantener comentarios que explican de forma más directa la metodología utilizada ya que al final, testear puede ser algo más personal y así se asegura mostrar el porqué de esos tests._**

### Tests end to end

Aunque los tests unitarios ya cubrían bastante todas las funcionalidades de la aplicación, se ha decidido utilizar también `Cypress` para cubrir `flows` enteros como mostrar todos los meetups, crear un nuevo meetup y añadir un meetup a favorito.

Los tests de cypress se pueden ejecutar con el script:

```
npm run cypress
```

O si se prefiere ver la ejecución en el navegador:

```
npm run cypress:open
```

## Ejercicio extra

En este mismo proyecto también se puede encontrar [aquí](./StreamingExercise.md) el ejercicio extra relacionado con la mejora de un servicio de contenido multimedia online.
