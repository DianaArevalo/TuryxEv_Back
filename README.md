<div align="center">
   <div style="gap: 10px; padding: 10px 20px;">  
      
 <img width="70" height="70" alt="logo" src="https://github.com/user-attachments/assets/49d3f374-97b2-44c9-a484-a70db38b5620" alt="TuryxHotel_logo" width="250" />
 <h1>TuryxHotel</h1>



---
<details>
 <summary><h2>🌃Arquitectura</h2></summary>

<img width="973" height="617" alt="image" src="https://github.com/user-attachments/assets/07c28638-4bdd-42f3-b56a-af677a0387db"  width="600"/>


</details>
---

<details>
   <summary><h2>🏨 MODULOS PRINCIPALES</h2></summary>
<p align="center">

**TuryxHotel** es una plataforma integral para gestión hotelera con enfoque en **automatización**, **seguridad** y **experiencia del usuario**.

<br>

Este proyecto es **colaborativo**, que esta siendo desarrollado por un equipo, aplicando buenas prácticas y arquitectura escalable para garantizar calidad y mantenibilidad.  

✔ 🔐 Servicio de Reserva con Ciberseguridad Integrada  
✔ 💬 Integración con WhatsApp + Automatización (n8n)
✔ 📲 Servicio de Mensajería Interna
✔ 👥 Grupos Estilo Red Social
✔ 💳 Pasarela de Pago
✔ 🧑‍💼 Sistema de Roles y Perfiles
✔🖼️ Galería de Fotos
✔ 🔐 Autenticación Segura
✔ 🔐 Panel Administrativo


</p>

<div>
   <h2>🔥 MODULOS</h2>
   <table>
      <tr>
         <td>
            <div>
               <h2 align="center">RES Servicio de Reserva con Ciberseguridad Integrada </h2>              
            </div>
         </td>
         <td align="center">
            <ul>
               <li>Gestión de reservas: crear, editar, cancelar</li>
               <li>Ciberseguridad: cifrado AES-256, OAuth2</li>
               <li>validación contra ataques y auditoría.</li>
            </ul>
         </td>
      </tr>
     <tr>
         <td>
            <div>
               <h2 align="center">ROL Sistema de Roles y Perfiles </h2>              
            </div>
         </td>
         <td align="center">
            <p>Perfiles diferenciados: Cliente, Hotel/Empresario (mini landing), y Administrador, cada uno con panel propio.</p>
         </td>
      </tr>
      <tr>
         <td>
            <div>
               <h2 align="center">AUTH Autenticación Segura  </h2>              
            </div>
         </td>
         <td align="center">
            <p>OAuth2 con soporte para Google, Facebook y email. Recuperación de contraseña con tokens seguros y protección contra fuerza bruta.</p>
         </td>
      </tr>
 <tr>
         <td>
            <div>
               <h2 align="center">ADMIN Panel de Administración  </h2>              
            </div>
         </td>
         <td align="center">
            <ul>
               <li>Gestión de roles y perfiles (ROL).</li>
               <li>Gestión de reservas (RES) para monitoreo y auditoría.</li>
               <li>Mensajería (MENS) para moderación.</li>
               <li>Pagos (PAY) para ver reportes y auditoría.</li>
               <li>Integraciones (N8N) para revisar logs de automatización.</li>
            </ul>
         </td>
      </tr>
      <tr>
         <td>
            <div>
               <h2 align="center">MENS Servicio de Mensajería Interna </h2>              
            </div>
         </td>
         <td align="center">
            <p>Chat privado entre usuarios (viajeros y empresarios) con historial, notificaciones y moderación opcional.</p>
         </td>
      </tr>
      <tr>
         <td>
            <div>
               <h2 align="center">SOCIAL Grupos Estilo Red Social  </h2>              
            </div>
         </td>
         <td align="center">
            <p>Creación y gestión de grupos temáticos, roles, y chat grupal para compartir contenido.</p>
         </td>
      </tr>
      <tr>
         <td>
            <div>
               <h2 align="center">PAY Pasarela de Pago  </h2>              
            </div>
         </td>
         <td align="center">
            <p>Integración con Stripe, PayU, MercadoPago o Wompi. Pagos tokenizados, soporte multimoneda y confirmaciones mediante webhooks.</p>
         </td>
      </tr>
      <tr>
         <td>
            <div>
               <h2 align="center">N8N Integración con WhatsApp + Automatización (n8n) </h2>              
            </div>
         </td>
         <td align="center">
            <p>Atogestion y generación de enlaces directos vía WALink, flujos automatizados en n8n para confirmaciones, recordatorios y seguimiento de conversaciones.</p>
         </td>
      </tr>
      <tr>
         <td>
            <div>
               <h2 align="center">PIC Galería de Fotos  </h2>              
            </div>
         </td>
         <td align="center">
            <p>Hoteles pueden subir imágenes comprimidas, categorizadas y optimizadas para dispositivos móviles</p>
         </td>
      </tr>
   </table>
</div>

</details>

---

<hr style="border: none; height: 3px; background: linear-gradient(90deg, #009688, #4CAF50, #8BC34A); margin: 20px 0;">


---

<details>
   <summary><h2>🔐 RES Servicio de Reserva con Ciberseguridad Integrada </h2></summary>

   <ul>
      <h1>GESTION DE RESERVAS</h1>
         <li>☑ RES-001 Creación de reservas</li>
         <li>☑ RES-002 Consulta de reservas existentes</li>
         <li>☑ RES-003 Modificación de Reservas Existentes</li>
         <li>☑ RES-004 Cancelación de Reservas</li>
         <li>☑ RES-005 Cálculo Automático de Precios</li>
         <li>☑ RES-006 Generación de Códigos de Confirmación</li>         

   </ul>

</details>

---

<details>
   <summary><h2>🧑‍💼 ROL Sistema de Roles y Perfiles </h2></summary>

   <ul>
      <h1>CREACION DE ROLES</h1>
         <li>☑ ROL-001 Creación de entidad user para roles</li>
         <li>☑ ROL-002 Creacion de nuevo usuario segun rol</li>
         <li>☑ ROL-003 Encontrar usuarios por rol</li>
         <li>☑ ROL-004 Editar usuarios por rol</li>
         <li>☑ ROL-005 Eliminar usuarios</li>
         <li>☑ ROL-006 Conexion a base de datos</li>
         <li>☑ ROL-007 Encriptar contraseñas bcrypt</li> 
         <li>☑ ROL-008 Estandarizar respuestas JSON</li> 
         <li>☑ ROL-009 Identificador principal en la respuesta debe ser el email</li> 
         <li>☑ ROL-010 Crear Modulo unico para imports de librerias externas</li> 
         <li>☑ ROL-011 Relacionar el rol como coleccion separada</li> 
      

   </ul>

</details>

---

<details>
   <summary><h2> TERMINOS Y CONDICIONES </h2></summary>

<p>
   Condiciones de Colaboración
Este proyecto se desarrolla bajo las siguientes condiciones:
✅ Objetivo actual: aprendizaje, práctica y aplicación de buenas prácticas en desarrollo de software.
✅ Sin remuneración por el momento: Actualmente no hay pagos ni compensaciones, ya que el proyecto está en etapa inicial.
✅ Fines comerciales futuros: Si el proyecto se consolida y comienza a generar ingresos, los colaboradores que aportaron en esta fase inicial serán tenidos en cuenta en la estructura del equipo o en beneficios acordados.
✅ Código compartido y colaborativo: Todo el trabajo será gestionado en repositorios colaborativos y versionado correctamente.
✅ Reconocimiento de autoría: Cada contribución será registrada en la sección de colaboradores y en el historial del repositorio.
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



