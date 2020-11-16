# Php crud usuarios

Aplicacion CRUD asincrono, todos los envios de datos son asincronos y la pagina no recarga.

__Teconologias__
* PHP / POO -> Archivos de backend
* JavaScript / AJAX -> Archivo de eventos asincronos

## Instalacion
Crear una base de datos llamada usuario

``` sql
CREATE DATABASE usuario;
```

Posicionarse en ella e importar los datos

``` sql
\source <ruta\table.sql>
# or 
\. <ruta\table.sql>
# or
mysql -u root -h localhost -p < table.sql
```

## Uso
Ingresar al localhost