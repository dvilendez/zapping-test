# Zapping test!

## Introducción

Este proyecto es una aplicación web que permite a los usuarios registrarse, iniciar sesión y ver un streaming simulado.

## Requerimientos

- Docker

## Instalación

1. Clona el repositorio:

``` git clone git@github.com:dvilendez/zapping-test.git``` 


2. Navega al directorio del repositorio:

``` cd zapping-test ```

3. Crea la carpeta para almacenar los videos:

``` mkdir api/videos ```

4. Descarga los segmentos desde esta url https://drive.google.com/file/d/1exGq6BJ6r1lXezOanp88sWwxqcMbDntJ/view?usp=sharing y dejalos en la carpeta anteriormente creada.


3. Levanta los contenedores de Docker:

``` docker-compose up ```


4. Abre http://localhost:3000/ en tu navegador.

5. Regístrate y luego inicia sesión para acceder al streaming simulado.
