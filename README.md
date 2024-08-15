<div align="center">
  <a href="https://dtoro-dev-portfolio.netlify.app/">
    <img src="https://raw.githubusercontent.com/dtoro-dev/minimalist-portfolio/master/src/assets/logo-2.2.webp" height="90px" width="auto" style="background-color: #f2f1eb; border-radius: 10px; border: 3px solid #e8c538" />
  </a> 


  # Task Manager API & Frontend

  [![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-%2300A3E0.svg?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![SQLite](https://img.shields.io/badge/SQLite-%23003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
  [![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

  ![GitHub stars](https://img.shields.io/github/stars/dtoro-dev/tasks-manager)
  ![GitHub issues](https://img.shields.io/github/issues/dtoro-dev/tasks-manager)
  ![GitHub forks](https://img.shields.io/github/forks/dtoro-dev/tasks-manager)
  ![GitHub PRs](https://img.shields.io/github/issues-pr/dtoro-dev/tasks-manager)
</div>



## Descripción

Este proyecto es un sistema de gestión de tareas completo que incluye tanto una API backend como una aplicación frontend. Permite la creación, actualización, eliminación y consulta de tareas, prioridades y estados.

![Dashboard](/src/assets/images/dashboard.png)

- **Backend:** Construido con **Node.js**, **Express**, y **Prisma** para gestionar la lógica del negocio y el almacenamiento de datos en una base de datos **SQLite**.
- **Frontend:** Desarrollado en **Angular 14** con **Tailwind CSS** para la creación de interfaces de usuario modernas y responsivas.

## Características

- **Dashboard:** Muestra un resumen de todas las tareas.
- **Gestión de Tareas:** Puedes agregar, editar y eliminar tareas fácilmente.

![Tasks](/src/assets/images/tasks.png)

### Backend

- **CRUD de Tareas**: Crear, leer, actualizar y eliminar tareas.
- **Manejo de Prioridades y Estados**: Gestionar prioridades y estados asociados a las tareas.
- **Base de datos SQLite**: Ligera y eficiente para proyectos pequeños a medianos.
- **TypeScript**: Mejora la calidad del código con tipos estáticos.

### Frontend

- **Interfaz de Usuario Moderno**: Construido con **Angular 14** y estilizado con **Tailwind CSS**.
- **Gestión de Tareas**: Interfaces intuitivas para gestionar tareas, incluyendo la creación, edición y visualización.
- **Componentes Reutilizables**: Componentes modulares para facilitar la expansión y mantenimiento.
- **Routing Dinámico**: Navegación fluida entre diferentes vistas como el dashboard, lista de tareas, etc.

## Tecnologías Utilizadas

### Backend

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://sqlite.org/)

### Frontend

- [Angular 14](https://angular.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## Instalación

### Backend

1. Clona este repositorio:

```bash
git clone https://github.com/tuusuario/task-manager-api.git
cd task-manager/api
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo .env en la raíz del proyecto con las variables de entorno necesarias:

```env
PORT=3000
DATABASE_URL="file:./dev.db"
```

4. Ejecuta las migraciones para configurar la base de datos:

```bash
npx prisma migrate dev --name init
```

5. Inicia el servidor de desarrollo:

```bash
npm run dev
```

### Frontend

1. Navega a la carpeta raíz para posicionarte en front

```bash
cd task-manager
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia la aplicación frontend:

```bash
ng serve
```

4. Accede a la aplicación en http://localhost:4200.

### Uso

Aplicación diseñada para ayudar a los usuarios a gestionar sus tareas diarias de manera eficiente. La aplicación ofrece un Dashboard central donde se resumen todas las tareas según su estado: pendientes, en proceso, finalizadas y vencidas. Además, permite acceder a una vista detallada de las tareas individuales, donde los usuarios pueden ver, editar y actualizar el estado de cada tarea.

#### Funcionalidades Principales
1. **Dashboard**: Al acceder a la aplicación, los usuarios son recibidos con un dashboard que proporciona una visión general del estado de todas sus tareas a lo largo del año actual. El dashboard se divide en cuatro categorías principales:

 - **Pendientes**: Tareas que aún no se han iniciado.
 - **En Proceso**: Tareas que están actualmente en progreso.
 - **Finalizadas**: Tareas que han sido completadas.
 - **Vencidas**: Tareas que no se completaron a tiempo.

Esta visualización ayuda a los usuarios a identificar rápidamente el estado de sus proyectos y a priorizar sus actividades en consecuencia.

![DashboardDetail](/src/assets/images/dashboard-details.png)

**Gestión de Tareas**: Los usuarios pueden acceder a una vista más detallada de las tareas, donde pueden ver información específica sobre cada tarea, como su prioridad, fecha de vencimiento, y estado actual. Desde esta vista, es posible actualizar el estado de las tareas, lo que facilita la gestión y el seguimiento de las mismas.

![TaskView](/src/assets/images/tasks-view.png)
![TaskEdit](/src/assets/images/tasks-edit.png)
![TaskEdit](/src/assets/images/tasks-edit2.png)
![TaskDelete](/src/assets/images/tasks-delete.png)
![TaskNextStep](/src/assets/images/tasks-next-step.png)

### Endpoints

#### **TASKS**
- **GET /tasks**: Obtener todas las tareas.
- **POST /tasks**: Crear una nueva tarea.
- **PUT /tasks/:id**: Actualizar una tarea existente.
- **DELETE /tasks/:id**: Eliminar una tarea.

#### **PRIORITIES**
- **GET /priority**: Obtener todas las prioridades.
- **POST /priority**: Crear una nueva prioridad.
- **PUT /priority/:id**: Actualizar una prioridad existente.
- **DELETE /priority/:id**: Eliminar una prioridad.

#### **STATES**
- **GET /state**: Obtener todos los estados.
- **POST /state**: Crear un nuevo estado.
- **PUT /state/:id**: Actualizar un estado existente.
- **DELETE /state/:id**: Eliminar un estado.

### Vistas de la Aplicación

- **Home**: Vista de bienvenida y resumen del sistema (building).
- **Dashboard**: Vista general de las tareas con estadísticas.
- **Tasks**: Lista detallada de tareas con opciones de gestión.
