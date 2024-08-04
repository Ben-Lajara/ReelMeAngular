# ReelMe

Este repositorio contiene el código del _frontend_ de la aplicación ReelMe, presentada como **proyecto fin de ciclo** en el **Grado Superior de Desarrollo de Aplicaciones Multiplataforma** en el **IES Ingeniero de la Cierva**.

ReelMe es una aplicación web de reseñas de películas, donde los usuarios pueden registrarse, buscar películas, escribir reseñas y seguir a otros usuarios.

## Descripción

Este _frontend_ está desarrollado en `Angular` y provee la interfaz de usuario del proyecto. Para ello, hace uso de llamadas a la `API` del _backend_ y a las `APIs` de `OMDB`, `TMDB` y `YouTube`.

## Funcionamiento

### APIs

El frontend de _ReelMe_ hace uso de 4 `APIs` para su funcionamiento. Tres de ellas son externas, mientras que la cuarta es la que genera el _backend_.

> [!IMPORTANT]
> Para las _APIs_ externas es necesario el uso de sus respectivas _API Keys_.

#### Open Movie Database (OMDB)

Se usa en la búsqueda de las películas y es de donde se extraen los datos para las películas al insertarlas en la base de datos. Su elección para esta función es debido a que solo provee los datos en inglés, proporcionando así uniformidad en la base de datos.

Su _API Key_ se debe especificar en el parámetro `apiOMDB`, en `reel-me.service.ts`. Se puede generar [aquí](https://www.omdbapi.com/apikey.aspx).

#### The Movie Database (TMDB)

Esta _API_ se usa únicamente en el apartado de detalles de las películas, ya que proporciona más datos que la _API_ de _OMDB_ pero lo hace en múltiples idiomas que pueden ser especificados al realizar la llamada. El idioma se especifica mediante el desplegable de idiomas de la barra de navegación.

Su _API Key_ se debe especificar en el parámetro `apiTMDB`, en `reel-me.service.ts`. Se puede generar [aquí](https://developer.themoviedb.org/reference/intro/getting-started).

#### YouTube

Se usa para mostrar el _trailer_ de la película en la sección de detalles. Devuelve el primer resultado de la búsqueda del nombre de la película y su año de estreno más las palabras clave _official trailer_.

Su _API Key_ se debe especificar en la constante `apiKey` del método `getTrailer` de `detalles.component.ts`. Se puede obtener la _API Key_ siguiendo [estas instrucciones](https://developers.google.com/youtube/v3/getting-started?hl=es-419).

#### API REST del _backend_

Se trata de la _API REST_ generada por el _backend_ de la aplicación, cuyo código y documentación se encuentran en [este repositorio](https://github.com/Ben-Lajara/ReelMeSpringBoot). Su uso es imprescindible para el funcionamiento de la aplicación, ya que se encarga de extraer, modificar e insertar información en la base de datos.

### Internacionalización

La aplicación cuenta con la posibilidad de alternar entre los idiomas _español_ e _inglés_ gracias a un desplegable en la `navbar`. Los textos de la aplicación se encuentran en los ficheros `es.js` y `en.js`, preparados para su llamada en el código de la aplicación, que los filtra mediante la _pipe_ `translate` en el caso de los ficheros _HTML_ y del método `translate` en los ficheros _TypeScript_.

## Estructura

### Landing Page

Es la página inicial, mostrada antes del inicio de sesión o del registro. Muestra una serie de información para animar a que los usuarios se registren.

![Landing page](/src/assets/images/capturas/landingPage.png)

![Landing page](/src/assets/images/capturas/landingPage2.png)

### Inicio de sesión

Formulario para iniciar sesión. En caso de no estar registrado, el usuario puede registrarse pinchando en el enlace que le redirige al `registro`. Si no recuerda su contraseña, puede hacer uso del `restablecimiento de contraseña`.

![Inicio de sesión](/src/assets/images/capturas/login.png)

### Registro

Formulario para crear cuenta en la aplicación. Son necesarios el _nombre de usuario_, el _email_ y la _contraseña_ (es necesario repetirla a modo de confirmación). Tras introducir un nombre de usuario y pasar a la siguiente casilla del formulario, se realiza una búsqueda en la base de datos para comprobar si el nombre está disponible. En caso de no estarlo se indica el error, impidiendo el envío del formulario.

![Registro](/src/assets/images/capturas/registro.png)

### Restablecer / Restablecimiento

Si el usuario no recuerda su contraseña, puede restablecerla. El componente `restablecer` consiste en un breve formulario en el que se debe introducir el `email` del usuario. Desde el `backend` se envía un enlace al correo, que redirige a `restablecimiento`.

![Restablecer](/src/assets/images/capturas/restablecer.png)

El componente `restablecimiento` pide la nueva contraseña dos veces a modo de confirmación. Si todo está correcto, se restablecerá la contraseña y el usuario será redirigido al `inicio de sesión`.

![Restablecimiento](/src/assets/images/capturas/restablecimiento.png)

### Inicio

En esta página se muestran las películas más populares y la última película vista por las cuentas que sigue el usuario (si no sigue ninguna cuenta, se muestra un aviso indicándolo).

![Página de inicio](/src/assets/images/capturas/inicio.png)

### Búsqueda

Si el usuario ha iniciado sesión, permite buscar películas y usuarios mediante una `nav` para elegir la opción. En caso contrario, permite buscar únicamente las películas.

![Búsqueda de películas](/src/assets/images/capturas/busquedaPeliculas.png)

![Búsqueda de usuarios](/src/assets/images/capturas/busquedaUsuarios.png)

Muestra los resultados a través de tarjetas, que al pulsarlas redirigen a los detalles de la película o al perfil del usuario.

### Detalles

Muestra información de una película en específico, así como sus estadísticas en la aplicación.

![Detalles](/src/assets/images/capturas/detalles.png)

Si el usuario ha iniciado sesión, muestra dos secciones más: una tarjeta que muestra si ha reseñado o no la película (y la calificación que le ha dado en caso de haberlo hecho), además del botón de escribir/editar reseña y un apartado mostrando las cuentas que sigue el usuario que han reseñado la película.

![Detalles continuación](/src/assets/images/capturas/detalles2.png)

### Perfil

Muestra los datos públicos del usuario, con una tarjeta en la parte superior indicando su nombre, una _badge_ indicativa (en caso de tener suficiente rango), el número de películas reseñadas, las películas vistas este año, los seguidores y los seguidos.

![Perfil](/src/assets/images/capturas/perfil.png)

Debajo de esta tarjeta, se muestran 3 apartados:

- _Actividad reciente_, que muestra las cuatro últimas películas reseñadas e indica si se trata de un revisionado.
- _Reseñas_, que muestra todas las reseñas que ha realizado el usuario.
- _Diario_, que permite visualizar el diario del usuario. Si se trata del usuario con sesión iniciada en el dispositivo, muestra el botón de editar.

### Diario

En este apartado se visualizan a modo de historial las películas reseñadas por el usuario. Estas se muestran en tarjetas agrupadas por los meses, ya sea de forma descendente (el modo por defecto) o ascendente. Las tarjetas indican la fecha (con un icono específico para indicar si es revisionado), la película, la calificación y si al usuario le ha gustado o no.

El componente comprueba si se trata del mismo usuario con sesión iniciada, de manera que muestra el botón de editar en caso afirmativo, redirigiendo al formulario de reseña.

![Diario](/src/assets/images/capturas/diario.png)

### Reseña

Se trata de un formulario donde el usuario podrá puntuar la película mediante un sistema de estrellas, indicar si le ha gustado y escribir una reseña (pudiendo indicar si contiene _spoilers_). La fecha es obligatoria y por defecto es la actual, no permitiendo una fecha posterior a la misma.

Además puede anotar sus revisionados, los cuales no pueden tener una fecha superior a la actual ni anterior al visionado original.

Si el usuario ya ha efectuado una reseña de la película, se mostrarán los datos guardados, permitiendo modificar tanto la reseña como los revisionados.

![Reseña](/src/assets/images/capturas/resena.png)

### Reseña pública

Muestra la calificación y el comentario del usuario, indicando si hay revisionados con sus respectivos comentarios (si los hay).

![Reseña pública](/src/assets/images/capturas/resenaPublica.png)

En caso de presentar contenido ofensivo, se puede realizar una denuncia.

![Denuncia de reseña pública](/src/assets/images/capturas/resenaPublicaDenuncia.png)

### Ajustes

En esta sección, el usuario podrá realizar modificaciones en su cuenta. En los dispositivos estrechos (móviles), se presentan las diversas secciones a modo de desplegable, mientras que en el resto se hace uso de `navs`.

![Ajustes](/src/assets/images/capturas/ajustes.png)

| Sección                  | Descripción                                                                                                                                                                                           | Imagen                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Cambiar imagen de perfil | En la zona superior del apartado, se muestra el icono de perfil del usuario. Al pulsarlo se muestra un `modal` donde podrá elegir una de las imágenes disponibles, que se establecerá como su perfil. | ![Cambiar perfil](/src/assets/images/capturas/ajustesCambiarPerfil.png)    |
| Barra de progreso        | Se ubica bajo la imagen de perfil e indica las películas restantes para que el usuario pase al siguiente rango.                                                                                       | ![Barra de progreso](/src/assets/images/capturas/ajustesBarraProgreso.png) |
| Editar perfil            | Formulario que permite editar el `correo`, el `apodo`, la `ubicación` y la `bio` del usuario.                                                                                                         | ![Editar perfil](/src/assets/images/capturas/ajustesEditarPerfil.png)      |
| Personalizar avatar      | Muestra los colores disponibles para los marcos de perfil. El usuario solo podrá hacer uso de los que sean apropiados a su rango.                                                                     | ![Personalizar](/src/assets/images/capturas/ajustesPersonalizar.png)       |
| Cambiar contraseña       | Breve formulario que permite cambiar de contraseña.                                                                                                                                                   | ![Cambiar contraseña](/src/assets/images/capturas/ajustesCambiarPword.png) |
| Borrar cuenta            | Un breve formulario que pide introducir la contraseña dos veces. Si el usuario acepta en el `confirm`, se borrará automáticamente la cuenta.                                                          | ![Borrar cuenta](/src/assets/images/capturas/ajustesBorrarCuenta.png)      |

### Panel de administrador

Esta sección solo está disponible para el usuario con rol de administrador (`ROLE_ADMIN`) y muestra las denuncias efectuadas por los usuarios en las reseñas públicas. El administrador podrá aceptar o rechazar las solicitudes, indicando el tiempo de amonestación en caso de aceptarla.

![Panel de administrador](/src/assets/images/capturas/panelAdmin.png)

Al efectuar un veto, la reseña que ha sido denunciada se oculta de cara al público y el usuario no podrá escribir reseñas durante el periodo que el administrador ha establecido conveniente (sí puede, no obstante, hacer uso del resto del formulario de reseña).

## Ejecución en modo desarrollador

Para ejecutar la aplicación, es necesario tener instalado `Angular 17`, puesto que es el _framework_ utilizado para su desarrollo.

También es necesario tener en funcionamiento el _backend_, cuyo repositorio se encuentra [aquí](https://github.com/Ben-Lajara/ReelMeSpringBoot).

Una vez cumplidos estos requisitos, se puede clonar el repositorio y ejecutar el siguiente comando en la raíz del proyecto:

```
ng serve
```

Esto desplegará el _frontend_ en `http://localhost:4200`, permitiendo su uso.
