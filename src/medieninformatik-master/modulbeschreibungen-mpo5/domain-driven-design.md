---
title: Domain-Driven Design of Large Software Systems
kuerzel: DDD
modulverantwortlich: sbe
dozierende: sbe
modulniveau: master

infourl: 

kreditpunkte: 6
layout: modulbeschreibung.11ty.js
date: Last Modified
published: true

angebotImWs: true
angebotImSs: 

voraussetzungenNachPruefungsordnung: keine
empfohleneVoraussetzungen: Familiarity with the software development process

parent: WAMO
schwerpunkt:
kategorie: wahl

weitereStudiengaenge: 
  - ds

veranstaltungsform: 

lehrmethoden:

sprache: Englisch

lehrform:

praesenzZeit: 
selbstStudium: 

studienleistungen:
  Einzelleistung:
    art: Semesterbegleitendes Projekt, dokumentiert als wissenschaftliches Papier / Präsentation
    artkey: project-paper-presentation
    erstpruefer: 
    zweitpruefer: 
    datum:


participants: 
    min: 5
    max: 20

studiengangkriterien:
  globalcitizenship: 0
  internationalisierung: 1
  interdisziplinaritaet: 0
  transfer: 1

effort:
    lecture: 12
    seminar: 24
    practical: 0
    exercise: 0
    project_supervision: 12
    project_work: 90
sws_lecturer: 4  
---


## Learning Outcome

After completing this course, the following statement should be true for the particapating students. 

* **As an** experienced programmer, architect, or business analyst I can design a reasonably complex 
  greenfield application for a multi-team development setup, using the domain-driven design paradigm,

* **by** 
  * conducting an event storming workshop, in order to capture the business domain,
  * evaluating the domain flows and defining appropriate bounded contexts for the teams,
  * creating a domain model, using the appropriate design elements,
  * defining a high-level component model, using the C4 modelling approach,
  * documenting the results of the design process in a paper and a presentation,
  * reflecting the pros and cons of that particular design method,
* **so that** I can make sure that I have a sound, sustainable high-level architecture for my business domain.
  
  
## Modulinhalt

This module introduces the students to the design process for a relatively complex software system,
by creating a domain-specific design for the problem. Modern software architecture means that you are
close to coding. Therefore, we will attempt to have a real software development case study in this module.
You will not have to write code in this module, but you need to know how software development teams
work, and what their needs and their deliverables are.

We will cover following methods that are useful in the DDD design process:
* Event Storming
* Bounded Context Specification
  * Domain Message Flow Modelling
  * Bounded Context Canvas 
  * Context Map
* Component Model 
  * Aggregate Canvas for each major aggregate
  * C4 Level 1 system diagram
  * C4 Level 2 container diagram

These methods reflect what many agile consultancies recommend and use today, when doing a greenfield software project.


### Event Storming

We will first apply `Event Storming` on the given case study, in a 1-day-workshop, and reflect on the results. 
This workshop will be prepared by a dedicated "event storming" subteam. This subteam will also facilitate 
the trial workshop as moderators, with the other course members as participants. The course supervisor will 
coach and support the moderators.

### Bounded Context Specification

We evaluate the Event Storming results and derive bounded contexts (the blueprints for service boundaries) from them.
As for the event storming, this workshop is prepared and facilitated by a dedicated "bounded context" subteam,
with the other course members as participants. The course supervisor will coach and support the moderators. As result of this workshop, 
we will have used `Domain Message Flow Modelling`, set up `Bounded Context Canvases`, and drawn a `Context Map`.

### Component Model

Based on the bounded contexts, we will now create a high-level component model. Also this process is prepared and 
facilitated by a dedicated "component model" subteam, coached and supported by the course supervisor.
As a result, there will be an `Aggregate Canvas` for each major aggregate, and have created the the `C4 Model`
on level 1 (system diagram) and level 2 (container diagram).


## Lehr- und Lernformen

The module is run as a sequence of workshops. The students work on a real-life case study 
(ideally in collaboration with an industry partner). All methods will first be trained in trial workshops,
then applied to the case study. In addition, the workshops will contain occasional brief lectures 
by the professor, or by guest speakers from the software industry. 

The current module's organizational details are described in the 
[ArchiLab (Prof. Bente's lab) DDD module page](https://www.archi-lab.io/ddd). 



## Zur Verfügung gestelltes Lehrmaterial

* Lectures & guest lectures
* Literature
* Case study description



## Weiterführende Literatur

Here is a selection of sources for further reading. The essential literature for this module is set in **bold face**.

* Bente, S., Deterling, J., Reitano, M., & Schmidt, M. (2020, March 27). Sieben Weggabelungen—Wegweiser im DDD-Dschungel. JavaSPEKTRUM, 2020(02), 28–31.
* **Brandolini, Alberto. Introducing EventStorming**. Leanpub, 2021. [https://leanpub.com/introducing_eventstorming](https://leanpub.com/introducing_eventstorming).
* **Brown, Simon. The C4 Model, o.D.** [https://c4model.com/](https://c4model.com/)
* **Brown, Simon. The C4 model for visualising software architecture**. Leanpub, 2023. [https://leanpub.com/visualising-software-architecture](https://leanpub.com/visualising-software-architecture)
* **DDD Crew. Domain-Driven Design Starter Modelling Process**, o.D.[https://github.com/ddd-crew/ddd-starter-modelling-process](https://github.com/ddd-crew/ddd-starter-modelling-process)
* Esposito, D., & Saltarello, A. (2014). Discovering the Domain Architecture. In Microsoft .NET - Architecting Applications for the Enterprise (2nd edition). 
  Microsoft Press. [https://www.microsoftpressstore.com/articles/article.aspx?p=2248811&seqNum=3](https://www.microsoftpressstore.com/articles/article.aspx?p=2248811&seqNum=3)
* Evans, E. (2015). Domain-Driven Design Reference—Definitions and Pattern Summaries. Domain Language, Inc. 
  [http://domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf](http://domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf)
* **Evans, E. (2003)**. Domain-Driven Design: Tackling Complexity in the Heart of Software (1 edition). Addison-Wesley (the "blue book").
* **Fowler, M. (2014)**. Bounded Context. Martinfowler.Com. [https://martinfowler.com/bliki/BoundedContext.html](https://martinfowler.com/bliki/BoundedContext.html)
* Lilienthal, C. (2019). Von Monolithen über modulare Architekturen zu Microservices mit DDD. JAX 2020. 
  [https://jax.de/blog/microservices/von-monolithen-ueber-modulare-architekturen-zu-microservices-mit-ddd/](https://jax.de/blog/microservices/von-monolithen-ueber-modulare-architekturen-zu-microservices-mit-ddd/)
* Gil, M. (2023). Awesome EventStorming - Material Collection on GitHub. 
  [https://github.com/mariuszgil/awesome-eventstorming](https://github.com/mariuszgil/awesome-eventstorming) 
* Samokhin, V. (2018, January 18). DDD Strategic Patterns: How to Define Bounded Contexts - DZone Microservices. Dzone.Com. 
  [https://dzone.com/articles/ddd-strategic-patterns-how-to-define-bounded-conte](https://dzone.com/articles/ddd-strategic-patterns-how-to-define-bounded-conte)
* **Vernon, V. (2013)**. <a name="Vernon13"/>Implementing Domain-Driven Design (01 ed.). Addison Wesley (the "red book").
* **Vernon, V. (2016)**. <a name="Vernon16"/>Domain-Driven Design Distilled (1st ed.). Addison-Wesley (the "green book").
* Wolff, E. (2016b, November 29). Self-contained Systems: A Different Approach to Microservices. InnoQ Blog. 
  [https://www.innoq.com/en/articles/2016/11/self-contained-systems-different-microservices/](https://www.innoq.com/en/articles/2016/11/self-contained-systems-different-microservices/)

