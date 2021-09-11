# PROTOTYPE DEVELOPMENT FOR THE SENSING OF CARDIAC ARRHYTHMIAS THROUGH IOT
---
## _Abstract_
_The respository describes the development of a monitoring prototype based on web technologies and monitoring devices. Hardware so that your cardiac status can be tracked, considerations to be taken into account by the user in their current and future status, monitoring and alerting of possible cardiac arrhythmias, as well as blood oxygen saturation and its data more important. The methodology was as follows.
Different variables that can lead to heart problems were characterized as well as their possible detection and follow-up in order to obtain the most important items to take into account during the measurement, later a device prototype was designed which would allow real-time monitoring of cardiac activity in one person and from this, the cardiac measurement prototype and web application were implemented, finally the data obtained was validated by performing tests on different people to demonstrate the precision of the data, by comparing data against the same person, and others, in different situations, with the aim of providing feedback on the development of the prototype. As a result and as a conclusion of the research, a functional prototype is obtained which meets all the objectives set and which proves to be a useful device to keep a correct control of the heart rhythm and thanks to the feedback of the state of health that is received delivery to the user it is possible to give a differentiating component with respect to other works carried out._
---
## _Materials and methods_

- ### Heart rate
    - Heart rate is defined as the number of times the heart performs the complete cycle of filling and emptying its chambers in a given time.
- ### Blood oxygen saturation (SPO2)
    - Oxygen saturation measures the percentage of oxyhemoglobin `oxygen-hopping hemoglobin` in the blood, and is represented as arterial oxygen saturation `sao2` and venous oxygen saturation `SvO2`
   
- ### SPO2 calculation
    - **MAX3010x** `SpO2` measurements use two different wavelength LEDs to identify the ratio of oxygenated hemoglobin to deoxygenated hemoglobin.
      
- ### Pulse Sensor MAX30102
    - El pulsioxímetro y sensor cardiaco **MAX30100**, mostrado en la Figura 1, combina LEDs, un fotodetector, óptica optimizada y procesamiento de bajo ruido para detectar pulsioximetría y ritmo cardiaco   
- ### Arduino Uno R3
    - The Arduino Uno is a board based on the **_ATmega328_** microcontroller. It has 14 pins for digital input / output (6 of these can be used as PWM), 6 analog inputs, **_16 MHz_** crystal oscillator, USB interface, power jack, ICSP connector, and reset button. Its operating voltage is 5V, 32 KB flash memory (**_ATmega328_**), 0.5 KB used by bootloader and its clock speed is 16MHz.
---
## _Project data model design_

As a starting point, it is established that the model will work with a `client-server` software architecture where bidirectional communication will be handled, in addition there is a database that allows storing the records of both heart rate and `SPO2` calculated by the sensor

-- image

The flow that a user would go through when navigating the application in normal use, going from obtaining the data to displaying the complementary information

--impage

## _Database structure_

--  image

---
## _Backend implementation_

This component constitutes the server layer and is developed in `.NET Core`, which is a free, open source, managed computing framework, in which `ASP.NET` Core `SignalR` was used, which is an open source library that simplifies the addition of real-time web functionality to applications

## Techs
| Tech | Documentation |
| ------ | ------ |
| .NET Core | [ASP.NET documentation](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0) |
| SignalR | [Real-time ASP.NET with SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr) |
---
## _Frontend Implementation_
This component constitutes the presentation bed and is made in `Angular` version 9, Angular is an application design framework and a development platform to create efficient and sophisticated single page applications `SPA`.

## Techs
| Tech | Documentation |
| ------ | ------ |
| Components | [Introduction to components and templates](https://angular.io/guide/architecture-components) |
| Interfaces | [Interfaces Para Servicios Angular](https://medium.com/@ingenieromaciasgil/interfaces-para-servicios-angular-a6cdfa180a9a) |
| Services | [Angular services](https://angular.io/tutorial/toh-pt4) |
| Assets | [Angular workspace configuration](https://angular.io/guide/workspace-config) |
| Environments | [Configuring application environments](https://angular.io/guide/build) |
| Store | [@ngrx/store](https://ngrx.io/guide/store) |

---

## License

MIT

