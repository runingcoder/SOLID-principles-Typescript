# SOLID Principles Implementation

This repository serves as an implementation of the SOLID principles, which provide a set of guidelines (and implementation) for writing clean, efficient, and maintainable code. By following these principles, codebases become more organized, easier to understand, and less prone to bugs. Top-level organizations widely adopt these principles to ensure the production of high-quality code.

* **S** - Single Responsibility Principle ([SRP](./src/SRP.ts))
* **O** - Open Closed Principle ([OCP](./src/OCP.ts))
* **L** - Liskov Substitution Principle ([LSP](./src/LSP.ts))
* **I** - Interface Segregation Principle ([ISP](./src/ISP.ts))
* **D** - Dependency Inversion Principle ([DIP](./src/DIP.ts))

The SOLID acronym represents the following principles:

-**Single Responsibility Principle (SRP)**

- Each class or module should have a single responsibility, focusing on one specific functionality or aspect of the system. This principle promotes code that is easier to comprehend, test, and maintain.

-**Open-Closed Principle (OCP)**

- Software entities (classes, functions, etc.) should be open for extension but closed for modification. This principle enables adding new functionality without altering existing code, ensuring better maintainability and scalability.

-**Liskov Substitution Principle (LSP)**

- Objects of a superclass should be able to be replaced with objects of its subclasses without altering the correctness of the program. Subtypes must be substitutable for their base types, promoting code that is more flexible and robust.

-**Interface Segregation Principle (ISP)**

- Clients should not be forced to depend on interfaces they do not use. Instead of using large and broad interfaces, it is better to create smaller and more focused interfaces. This principle enhances code readability, reusability, and modularity.

-**Dependency Inversion Principle (DIP)**

- High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions. This principle promotes loose coupling and facilitates easier maintenance, testing, and future changes.

In the `src` folder, you can find the implementation code for each of these SOLID principles. The code is written in TypeScript, a statically typed superset of JavaScript, known for its type safety and scalability. To get started, you can install TypeScript in your system and use the `tsc -w` command. And, you can do npm install to install the dependencies (in this case, SASS). So, you run 'npm run scss' to get started.

By following the SOLID principles, you can create code that is clean, efficient, and highly maintainable. These principles foster better software design and architecture, enabling more robust and adaptable systems. Embrace the SOLID principles to elevate your coding practices and deliver exceptional software solutions.
