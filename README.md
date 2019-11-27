# Proyecto SmartBus
---
Por Angel Marcelino Gonzalez Mayoral y Eric López Solís.

Proyecto creado para la materia de Programación Web.
## Frameworks y librerías utilizadas

Estte proyecto está hecho con Asp.NET Core y Entity framework configurado con MariaDB para el servidor.
Utilizamos Angular 8 para la aplicación cliente.


## Requisitos para ejecutar la aplicación en modo desarrollo
**Visual Studio Community**

Se puede descargar en el enlace [Visual Sudio Community](https://visualstudio.microsoft.com/es/vs/community/)
Al instalar seleccionar la carga de trabajo "Desarrollo de ASP.NET y Web"

**.NET Core  SDK v2.2**

Se puede descargar en el enlace [.NET Core 2.2](https://dotnet.microsoft.com/download/dotnet-core/2.2/)


**MariaDB/MySql**

    Descargar [MariaDB](https://mariadb.org/download/) e instalar
    1. Crear una base de datos llamada smartbus

**NodeJS**

Descargar [NodeJS](https://nodejs.org/en/download/) e instalar

**Ejecutar aplicación**

- Renombrar archivo appsettings.example.json en SmartBus.Website a appsettings.json en
    - ConnectionStrings asegurarse que el parámetro Data Source indique la ruta a la instancia instalada de sql, si la instancia de sql server que se instaló fué la instancia por defecto entonces quedaría "DefaultConnection":  "Server=localhost;Database=smartbus;User=root;Password=;"
    - En el mismo archivo modificar la sección EmailCredentials con credenciales propias para utilizar las funciones de envio de correo.
- Abrir el archivo SmartBus.sln con visual studio comunity y presionar f5
