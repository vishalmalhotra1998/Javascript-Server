# Twelve-Factor App

* The **Twelve-Factor** App Methodology is suggested by developers for smoothly working and delivering Software as a Service (SaaS) Applications or Web Apps with a focus on Microservices.The twelve-factor methodology can be applied to apps written in any programming language, and which use any combination of backing services like database, queue, memory cache, etc.



 ### The twelve-factor app is a methodology for building software-as-a-service apps that:

1. Use declarative formats for setup automation, to minimize time and cost for new developers joining the project.

2. Have a clean contract with the underlying operating system, offering maximum portability between execution environments.

3. Are suitable for deployment on modern cloud platforms, obviating the need for servers and systems administration.

4. Minimize divergence between development and production, enabling continuous deployment for maximum agility.

5. And can scale up without significant changes to tooling, architecture, or development practices.


# The Twelve Factor

* **Codebase**: One codebase tracked in revision control, many deploys.An application codebase should always be tracked by a Version Control System (VCS). Widely popular in the development world is Git, and in today’s world you really can’t find a development team who are not using VCS. It provides substantial benefits such as code tracking and code versioning while also easing the collaboration of a development team working on the same application.Code should not be shared between applications — you can’t add dependencies of deployable services (think Spring Boot or Play applications) on each other. So, if there is common code you want to use across applications, create a repo for that code as a library, publish it to Maven, and integrate using Maven, sbt, Gradle or any other tool you prefer.

* **Dependencies**: Explicitly declare and isolate dependencies.For any application you should not copy any dependencies to the project codebase, rather use dependency management tools to get the required project dependencies, declared in manifest, from the server.

* **Backing Services**: Treat backing services as attached resources. Backing services refer to the infrastructure and other services by which the application communicates over the network. Database, Message Brokers, other API-accessible consumer services such as Authorization Service, Twitter, GitHub etc., are loosely coupled with the application and treat them as resource.

* **Config**: Store config in the environment. Configurations are a central part of any application, specifically when there is a need to support multiple environments or clients.

* **Build, Release, Run**: Strictly separate build and run stages. A twelve-factor application requires a strict separation between Build, Release and Run stages.


* **Processes**: Execute the app as one or more stateless processes. This factor is focused on executing the app as one or more stateless processes. A Process is an application running on server. An Application can be deployed with multiple instances/processes depending upon the network traffic. Generally, a load balancer is used to manage traffic and route to an app instance, which enables quick request handling.


* **Port Binding**: Export services via port binding. Unlike some web apps that are executed inside a webserver container, a Twelve-Factor acts as a standalone service and is self contained meaning it doesn’t rely on any existing/running application server to get executed. This implies that the Port on which the application is connected to is also stored in Config.

* **Concurrency**: Scale out via the process model. As mentioned earlier, Process as a first-class citizen of a twelve-factor app. Concurrency is a bit redundant with the Process factor, but the key point is that because of Processes, Concurrency is simple and reliable.

* **Disposability**: Maximize robustness with fast startup and graceful shutdown. Processes in twelve-factor apps should be started or stopped in minimal time. Run and Stop should be minimal to avoid catastrophic failures between different applications working as backing services.

* **Dev/Prod Parity**: Keep development, staging, and production as similar as possible. Development environment should be as similar to Production environment as possible. Twelve-factor applications are designed for continuous deployments by keeping less gaps between production and development environments. This is done to avoid unforeseen issues once an application goes live when the app was working fine on the development environment .This doesn’t necessarily mean having same the OS on both environments.This also implicitly encourages a DevOps culture where Software Development and Operations are unified. Containerization is a huge help here for the developer enabling an ability to simulate the production environment and bridge any gaps.


* **Logs**: Treat logs as event streams. Twelve-factor apps should not be concerned about routing and storage of it’s output stream or writing/managing logfiles — the app will write it’s event stream to stdout.


* **Admin Processes**: Run admin/management tasks as one-off processes. Twelve-factor apps aim to run admin/management tasks as one-off processes — tasks like database migration or executing one-off scripts in the environment.