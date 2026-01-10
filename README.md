<div align="center">
   <div style="gap: 10px; padding: 10px 20px;">  
      
 <img width="70" height="70" alt="logo" src="https://github.com/user-attachments/assets/49d3f374-97b2-44c9-a484-a70db38b5620" alt="TuryxHotel_logo" width="250" />
 <h1>TuryxHotel</h1>

---

<details>
 <summary><h2>🌃Arquitectura</h2></summary>

<img width="973" height="617" alt="image" src="https://github.com/user-attachments/assets/07c28638-4bdd-42f3-b56a-af677a0387db"  width="600"/>

## </details>

<details>
   <summary><h2>🏨 MODULOS PRINCIPALES</h2></summary>
<p align="center">

**TuryxHotel** es una plataforma integral para gestión hotelera con enfoque en **automatización**, **seguridad** y **experiencia del usuario**. Su proposito es poder lograr el crecimiento del turismo domestico y levantar la visibilidad de sus clientes.

<br>

Este proyecto es **colaborativo**, que esta siendo desarrollado por un equipo, aplicando buenas prácticas y arquitectura escalable para garantizar calidad y mantenibilidad.

<h2>💹 SERVICIOS A INTEGRAR</h2>

✔ 🔐 Servicio de Reserva con Ciberseguridad Integrada  
✔ 💬 Integración con WhatsApp + Automatización (n8n)
✔ 💳 Pasarela de Pago
✔ 🧑‍💼 Sistema de Roles y Perfiles
✔🖼️ Galería de Fotos
✔ 🔐 Autenticación Segura
✔ 🔐 Panel Administrativo

</p>

</details>

---

<hr style="border: none; height: 3px; background: linear-gradient(90deg, #009688, #4CAF50, #8BC34A); margin: 20px 0;">

---

<div>
   <h2>🔥 MODULOS ACTUALES Y DOCUMENTACIÓN RESUMIDA</h2>   
</div>

<details>
   <summary><h2>🔐 RES Servicio de Reserva con Ciberseguridad Integrada </h2></summary>

   <ul>
      <h1>reservation</h1>
         <li></li>

   </ul>

</details>

---

<details>
   <summary><h2>🧑 Rol Business</h2></summary>

   <ul>
      <h1>hotel</h1>

   </ul>

</details>

---

<details>
   <summary><h2>🧑 Rol User</h2></summary>

   <ul>
      <h1>user</h1>

   </ul>

</details>

---

<details>
   <summary><h2>🧑‍💼 Rol Hotel</h2></summary>

   <ul>
      <h1>hotel</h1>

   </ul>

</details>

---

<details>
   <summary><h2>🔐 Modulo JWT</h2></summary>
    <p>Este módulo implementa un sistema de autenticación seguro basado en <strong>JWT (JSON Web Tokens)</strong>, siguiendo principios de <strong>arquitectura hexagonal</strong> y <strong>Domain-Driven Design (DDD)</strong>. Incluye un esquema robusto de seguridad con <strong>Refresh Tokens</strong> almacenados en cookies <code>httpOnly</code>.</p>

   <p>El diseño basado en <em>puertos y adaptadores</em> asegura independencia del framework y de la infraestructura, lo que permite escalar, testear y reemplazar componentes sin afectar las reglas del dominio.</p>

   <h3>🔥 Características principales</h3>

   <ul>
      <li>✔ Firma de tokens mediante <code>SignTokenHandler</code></li>
      <li>✔ Rotación segura de Refresh Tokens con <code>RefreshTokenHandler</code></li>
      <li>✔ Revocación individual por <em>token ID</em> usando <code>RevokeTokenHandler</code></li>
      <li>✔ Cookies <code>httpOnly</code> con <code>SameSite=Strict</code></li>
      <li>✔ Hashing con <strong>Argon2</strong> para Refresh Tokens almacenados en la base de datos</li>
      <li>✔ Generación de <em>token IDs</em> únicos con <strong>nanoid</strong> para evitar colisiones</li>
      <li>✔ Payload estándar, limpio y seguro</li>
   </ul>   
    <img width="864" height="829" alt="Captura de pantalla 2025-11-25 214239" src="https://github.com/user-attachments/assets/0251e488-9c61-43fb-a098-e818bfd5ed2c" />
    <br>
      <table>
         <tr>
         <td><h3>🔥Dependencias</h3></td>
         <td><strong>npm install argon2 cors dotenv express mongoose jsonwebtoken cookie-parser
            </strong></td>
         </tr>
          <tr>
         <td><h3>🅿️Pruebas Manuales</h3></td>
         <td> 
            <img width="1112" height="685" alt="image" src="https://github.com/user-attachments/assets/824f697e-9ec4-40e3-8de0-120c8e6ef2ae" />
            <img width="1301" height="733" alt="image" src="https://github.com/user-attachments/assets/fe3a5bfb-d7b0-4cde-a45b-57730faa0b4b" />
            <img width="962" height="714" alt="image" src="https://github.com/user-attachments/assets/8f32b930-11e9-4c76-9370-49a4db153108" />            
         </td>
         </tr>
      </table>
   <br>
   <h3>🔥 Sección EndPoints</h3>

<table>  

  <tr>
    <td><code>POST /jwt/sign</code></td>
    <td>Genera AccessToken + RefreshToken</td>
  </tr>

  <tr>
    <td><code>POST /jwt/refresh</code></td>
    <td>Genera nuevos tokens a partir del RefreshToken</td>
  </tr>

  <tr>
    <td><code>POST /jwt/revoke</code></td>
    <td>Revoca el RefreshToken del usuario (requiere middleware)</td>
  </tr>

</table>         
   <h3>📄Justificacion tecnica</h3>
      <ul>
         <li>✔ Mantener sesiones seguras y escalables</li>
         <li>✔ Separar token de acceso y token de refresco evita problemas de seguridad.</li>
         <li>✔ Facilita logout forzado y expiración de sesión.</li>
         <li>✔ Refresh token en cookies httpOnly, evita ataques XSS, ya que JavaScript no puede leer los tokens.</li>
         <li>✔ Argon2 es el algoritmo recomendado por OWASP para contraseñas y tokens persistentes.</li> 
         <li>✔ Cada refresh token necesita un ID único para su revocación individual, nanoid lo garantiza, ademas de colisiones practicamente imposibles</li>                   
      </ul>
       <h3>👌Fuentes</h3>
       <strong>https://github.com/alperkilickaya/httpOnlyRefreshToken/blob/main/backend/server.js</strong>
       <strong>https://medium.com/%40alperkilickaya/creating-a-jwt-authentication-system-with-http-only-refresh-token-using-react-and-node-js-6865f04087ce</strong>


</details>

---

<details>
   <summary><h2>🔓 auth</h2></summary>

   <ul>
      <h1>JWT</h1>

   </ul>

</details>

---

<details>
 <summary><h2>🔥Paso a paso para desarrollar con nosotros</h2></summary>

  <div>   
   <p>
   <strong>🎶0. Requisitos Previos: </strong>   
   </p>
     <ul>
         <li>✔ Node.js v18+ y npm</li>
         <li>✔ Git</li>
         <li>✔ Docker (opcional, recomendado para MongoDB local)</li>
         <li>✔ Cookies <code>httpOnly</code> con <code>SameSite=Strict</code></li>
         <li>✔ Editor (VSCode recomendado)</li>         
     </ul>
      <table>
         <tr>
            <td>♣️1. Clonar Repositorio</td>
            <td><strong>git clone https://github.com/DianaArevalo/TuryxEv_Back.git</strong> cd TuryxEv_Back</td>
         </tr>
         <tr>
            <td>✨2. Inicializar con Git Flow</td>
            <td>
               <strong>git flow init</strong> 
               <strong>git flow feature start feat/nombre-asignado</strong> 
            </td>
         </tr>
          <tr>
            <td>💻3. Instalar dependencias necesarias para desarrollar</td>
            <td>
               <strong>npm install argon2 cors dotenv express mongoose jsonwebtoken cookie-parser nanoid
               </strong> 
               <strong>npm install -D typescript ts-node nodemon jest ts-jest @types/jest @types/express @types/jsonwebtoken @types/cookie-parser
               </strong> 
            </td>
         </tr>
         <tr>
            <td>🖥️4. Desarrollo</td>
            <td>
               <ul>
         <li>✔ Seguir desarrollo segun historias de usuario que le seran asignadas</li>
         <li>✔ Sigue la arquitectura: domain → application (handlers) → infrastructure (controllers, routes, middlewares).</li>
         <li>✔ Añade tests unitarios en tests/ o junto a los archivos .spec.ts.</li>                 
               </ul>
            </td>
         </tr>
           <tr>
            <td>⌨️5. Pruebas Manuales con Postman/Thunder Client/etc</td>
            <td>
                <ul>
                     <li>1. Habilitar postman</li>
                     <li>2. Las respuestas deben de llevar el formato ApiResponse que se encuentra en la carpeta de Shared: <strong>success</strong>,
                     <strong>title</strong>, <strong>message</strong> y <strong>body</strong> </li>
                     <li>3. Las respuestas y peticiones deben ir documentados en el README y Pull Request</li>                 
                           </ul>
                        </td>
         </tr>
           <tr>
            <td>🖱️6. Ejecutar test y coverage</td>
            <td>
               <strong>npx jest --coverage</strong>             
            </td>
         </tr>
           <tr>
    <td>✨7. Habilitar Pull Request para revisión</td>
    <td>

### ✅ Checklist antes de enviar el PR

- [ ] Código formateado (Prettier/ESLint)
- [ ] Tests añadidos y todos pasan correctamente
- [ ] Documentación actualizada (README del módulo si aplica)
- [ ] Capturas de Postman incluidas
- [ ] Coverage mínimo del 90% (incluir imagen en el PR)
- [ ] Asignar reviewers
- [ ] Etiquetar la historia de usuario correspondiente

    </td>
  </tr>
      </table>   
   </div>

   </details>

---

<details>
   <summary><h2> 📜 Términos y Condiciones de Colaboración </h2></summary>

<p>
   ## 

Este proyecto se desarrolla bajo las siguientes condiciones:

### 🎯 Objetivo del proyecto
El objetivo actual es el aprendizaje, la práctica y la aplicación de buenas
prácticas en el desarrollo de software.

### 💰 Remuneración
Actualmente no existe ningún tipo de remuneración económica ni compensación,
ya que el proyecto se encuentra en una etapa inicial.

### 🚀 Fines comerciales futuros
En caso de que el proyecto se consolide y genere ingresos en el futuro,
los colaboradores que hayan participado en esta etapa inicial podrán ser
tenidos en cuenta para integrar el equipo o recibir beneficios, los cuales
serán definidos mediante acuerdos específicos y separados.

La participación en esta etapa **no garantiza automáticamente derechos
económicos ni de propiedad** sobre el proyecto.

### 🔐 Propiedad intelectual
Todo el código, documentación y material generado dentro de este repositorio
es propiedad intelectual de **Diana Arevalo**, salvo que se indique lo contrario
de forma explícita y por escrito.

El acceso al repositorio **no concede derechos de uso, copia, modificación,
redistribución ni explotación comercial** del proyecto o de cualquiera de sus
partes fuera del ámbito de colaboración autorizado.

### 🤝 Uso del código
El código compartido es exclusivamente para fines de colaboración dentro
del proyecto. Queda prohibido reutilizar total o parcialmente el código en
proyectos externos, personales o comerciales sin autorización expresa de la
autora.

### 🏷️ Reconocimiento de autoría
Cada contribución quedará registrada en el historial del repositorio y en la
sección de colaboradores, respetando la autoría individual de cada aporte.

---

Al contribuir a este proyecto, el colaborador declara haber leído, entendido
y aceptado estos términos.
</p>

</details>

---

<div align="center">
   <h2>📞 Contacto</h2>
   <a href="https://www.linkedin.com/in/diana-arevalo-168b0925b/">
      <img src="https://github.com/user-attachments/assets/a8263dbd-7b6c-448f-9c08-f2921c73170c" alt="LinkedIn" width="50"></a>
   <a href="https://wa.link/x3dok9">
      <img src="https://github.com/user-attachments/assets/4a5b3f00-7420-4785-b3e8-ec42be6d31f7" alt="WhatsApp" width="50"></a>
   <a href="mailto:nutriadevelop@gmail.com">
      <img src="https://github.com/user-attachments/assets/b0cd5e5c-bfd8-4f2c-ae3a-e0d5defadc76" alt="Gmail" width="50"></a>
   
</div>
