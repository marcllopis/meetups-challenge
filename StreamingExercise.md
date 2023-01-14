# Software para gestionar el streaming de películas online

## Consideraciones

Tomando como referencia la información del pdf proporcionado dónde se decía que:

- Los usuarios tienen una operación que devuelve el importe total pagado por todos los servicios que han solicitado.

- Para todos los usuarios que quieren ver un contenido multimedia por streaming, se aplica el precio de streaming de este contenido multimedia.

- Para todos los usuarios que quieren descargar un contenido multimedia de la plataforma, aplica el precio de descarga de este contenido multimedia.

- Si el contenido es premium, en cualquiera de los casos anteriores se añade el cargo adicional especificado en el atributo additionalFee.

Y la siguiente implementación en pseudocódigo:

```javascript
class RegisteredUser {
  constructor(services = []) {
    this.services = services;
  }
  getTotal() {
    let total = 0;

    this.services.forEach(service, (index) => {
      let multimediaContent = service.getMultimediaContent();

      if (typeof service == StreamingService) {
        total += multimediaContent.streamingPrice;
      } else if (typeof service == DownloadService) {
        total += multimediaContent.downloadPrice;
      }

      if (typeof multimediaContent == PremiumContent) {
        total += multimediaContent.additionalFee;
      }
    });

    return total;
  }
}
```

### Explicación del pseudocódigo

Antes de analizar ningún problema, conviene detallar que se está haciendo en este pseudocódigo:

Este código define una clase llamada `RegisteredUser`. Tiene un constructor que acepta un parámetro llamado `services` como array. Este constructor asigna el parámetro `services` a la propiedad también llamada `services` de esta clase.

La clase tiene un método llamado `getTotal` que se encargará de devolver un total para saber el precio de los servicios que el usuario solicitó.

Este método inicializa una variable interna llamada `total` a 0 y utiliza un `forEach` para iterar entre los servicios disponibles.

Para cada servicio, se guarda el método `getMultimediaContent` asociado a este servicio. Luego, utilizando `typeof` va a mirar si el tipo de servicio es `StreamingService` o `DownloadService` y le va a aplicar el coste requerido añadiendolo al `total`.

Para terminar, va a comprobar con `typeof` otra vez si el tipo de `multimediaContent` es `PremiumContent`, si es el caso, le añade al `total` un `additionalFee`.

Este método termina devolviendo el valor `total`.

## Posibles problemas

Se detectan los siguientes problemas o inconsistencias:

- El método `getTotal` está estrechamente ligado a `StreamingService`, `DownloadService` y `PremiumContent` lo que lo hace díficil de poder escalar en un futuro a otros servicios. Incluso si uno de estos servicios cambia o desaparece, se tiene que modificar la clase `RegisteredUser`.

- No es un código modular, es decir, toda la lógica esta dentro de una misma clase en vez de separarla en pequeñas clases encargadas de algo en particular

- Se utiliza un if/else harcodeado que se encarga de determinar el precio de los servicios. Esto no es muy flexible ya que limita bastante el tipo de servicios que se podrían añadir en un futuro.

- Se utiliza `typeof` como forma de determinar el tipo de servicio. Esta no es la mejor forma ya que solo te va a devolver el tipo de variable como un string (que podría ser fácilmente sobreescrita) y no la verdadera clase.

- No hay ningún tipo de control de errores ni de "edge cases" como usuarios sin servicios, servicios sin contenido multimedia, que el array de `services` esté vacío o contenga o contenga un objeto inválido. _Todo esto son casos puntuales pero que es conveniente tener en cuenta desde un principio_

## Solución alternativa

### Implementación en pseudo código

```javascript
class Service {
  constructor(multimediaContent) {
    this.multimediaContent = multimediaContent;
  }
  getMultimediaContent() {
    return this.multimediaContent;
  }
}

class StreamingService extends Service {
  getPrice() {
    return this.multimediaContent.streamingPrice;
  }
}

class DownloadService extends Service {
  getPrice() {
    return this.multimediaContent.downloadPrice;
  }
}

class PremiumContent {
  constructor(price, additionalFee) {
    this.price = price;
    this.additionalFee = additionalFee;
  }
}

class RegisteredUser {
  constructor(services = []) {
    this.services = services;
    this.total = 0;
  }

  getTotal() {
    if (!this.services.length) {
      throw new Error("No services provided");
    }

    this.services.forEach((service) => {
      if (!(service instanceof Service)) {
        throw new Error("Invalid service provided");
      }

      let multimediaContent = service.getMultimediaContent();
      this.addCost(service.getPrice());

      if (multimediaContent instanceof PremiumContent) {
        this.addCost(multimediaContent.additionalFee);
      }
    });

    return this.total;
  }

  addCost(cost) {
    if (typeof cost !== "number") {
      throw new Error("Invalid cost provided");
    }

    this.total += cost;
  }
}
```

### Explicación

Esta solución propone abstraer una clase nueva llamada `Service` y 2 "subclases" llamadas `StreamingService` y `DownloadService` que extienden la clase `Service`.
Estas clases son las que van a tener un método propio llamado `getPrice`. De esta forma se facilita la abstracción de este método por cada servicio y permite, en un futuro, crear distintos valores / condiciones independientes los unos con los otros. También como ahora está separado del método `getTotal`, este podría trabajar con otro tipo de servicios sin tener que modificarlo.

Se usa también el método de `instanceof` en vez de `typeof` para comprobar de forma más segura el tipo del objeto.

En la clase `RegisteredUser` se crea el atributo de `total` y el método de `addCost` para aislar aún más `getTotal`. Esto también permite controlar errores como recibir un valor no númerico por ejemplo. Es escalable a añadir más errores o conversiones de moneda.

Se añaden también control de errores básico para comprobar que el `services` que recibe `RegisteredUser` no está vacío o no contiene un elemento inválido.

Como conclusión, esta nueva implementación facilitaría la base para ampliar servicios nuevos, ya que no están ligados directamente a la clase `RegisteredUser`, editar los existentes o incluso eliminar uno de los que se usa actualmente sin tener que hacer modificaciones en `RegisteredUser`
