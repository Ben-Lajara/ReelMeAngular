# ReelMe

Este repositorio contiene el código del _frontend_ de la aplicación ReelMe, presentada como **proyecto fin de ciclo** en el **Grado Superior de Desarrollo de Aplicaciones Multiplataforma** en el **IES Ingeniero de la Cierva**.

ReelMe es una aplicación web de reseñas de películas, donde los usuarios pueden registrarse, buscar películas, escribir reseñas y seguir a otros usuarios.

## Descripción

Este _frontend_ está desarrollado en `Angular` y provee la interfaz de usuario del proyecto. Para ello, hace uso de llamadas a la `API` del _backend_ y a las `APIs` de `OMDB` y `TMDB`.

## Funcionamiento

### Landing Page

Es la página inicial, mostrada antes del inicio de sesión o del registro. Muestra una serie de información para animar a que los usuarios se registren.

### Inicio

En esta página se muestran las películas más populares y la última película vista por las cuentas que sigue el usuario (si no sigue ninguna cuenta, se muestra un aviso indicándolo).

### Búsqueda

Si el usuario ha iniciado sesión, permite buscar películas y usuarios mediante una `nav` para elegir la opción. En caso contrario, permite buscar únicamente las películas.

Muestra los resultados a través de tarjetas, que al pulsarlas redirigen a los detalles de la película o al perfil del usuario.

### Detalles

Muestra información de una película en específico, así como sus estadísticas en la aplicación. Si el usuario ha iniciado sesión, muestra dos secciones más: una tarjeta que muestra si ha reseñado o no la película (y la calificación que le ha dado en caso de haberlo hecho), además del botón de escribir/editar reseña y un apartado mostrando las cuentas que sigue el usuario que han reseñado la película.

### Perfil

Muestra los datos públicos del usuario, con una tarjeta en la parte superior indicando su nombre, una _badge_ indicativa (en caso de tener suficiente rango), el número de películas reseñadas, las películas vistas este año, los seguidores y los seguidos.

Debajo de esta tarjeta, se muestran 3 apartados:

- _Actividad reciente_, que muestra las cuatro últimas películas reseñadas e indica si se trata de un visionado.
- _Reseñas_, que muestra todas las reseñas que ha realizado el usuario.
- _Diario_, que permite visualizar el diario del usuario. Si se trata del usuario con sesión iniciada en el dispositivo, muestra el botón de editar.

### Diario

En este apartado se visualizan a modo de historial las películas reseñadas por el usuario. Estas se muestran en tarjetas agrupadas por los meses, ya sea de forma descendente (el modo por defecto) o ascendente. Las tarjetas indican la fecha (con un icono específico para indicar si es revisionado), la película, la calificación y si al usuario le ha gustado o no.

El componente comprueba si se trata del mismo usuario con sesión iniciada, de manera que muestra el botón de editar en caso afirmativo, redirigiendo al formulario de reseña.

### Reseña

Se trata de un formulario donde el usuario podrá puntuar la película mediante un sistema de estrellas, indicar si le ha gustado y escribir una reseña (pudiendo indicar si contiene _spoilers_). La fecha es obligatoria y por defecto es la actual, no permitiendo una fecha posterior a la misma.

Además puede anotar sus revisionados, los cuales no pueden tener una fecha superior a la actual ni anterior al visionado original.

Si el usuario ya ha efectuado una reseña de la película, se mostrarán los datos guardados, permitiendo modificar tanto la reseña como los revisionados.

### Panel de administrador

Esta sección solo está disponible para el usuario con rol de administrador (`ROLE_ADMIN`) y muestra las denuncias efectuadas por los usuarios en las reseñas públicas. El administrador podrá aceptar o rechazar las solicitudes, indicando el tiempo de amonestación en caso de aceptarla.

Al efectuar un veto, la reseña que ha sido denunciada se oculta de cara al público y el usuario no podrá escribir reseñas durante el periodo que el administrador ha establecido conveniente (sí puede, no obstante, hacer uso del resto del formulario de reseña).

## Ejecución en modo desarrollador

Para ejecutar la aplicación, es necesario tener instalado `Angular 17`, puesto que es el _framework_ utilizado para su desarrollo.

También es necesario tener en funcionamiento el _backend_, cuyo repositorio se encuentra [aquí](https://github.com/Ben-Lajara/ReelMeSpringBoot).

Una vez cumplidos estos requisitos, se puede clonar el repositorio y ejecutar el siguiente comando en la raíz del proyecto:

```
ng serve
```

Esto desplegará el _frontend_ en `http://localhost:4200`, permitiendo su uso.
