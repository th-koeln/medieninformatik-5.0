---
title: Developing Interactive and Distributed Systems
kuerzel: dev
layout: page.11ty.js
level: 1
cssClass: is-dev
meta:
  status: ok
  authors: Entwicklungsteam, Christian
  reviewers: Matthias, Viet, Volker
  comments:

competencies:
  - title: Technologie
    sub:
      - title: Computer
        competence: "Wissen was ein Computer ist und wie Software darauf ausgeführt als auch optimiert wird."
        excelString: "Wissen was ein Computer ist und wie Software darauf ausgeführt wird."
      - title: Kommunikation
        competence: "Wissen wie Kommunikation zwischen Computern grundlegend und für verschiedene Anwendungen realisiert wird (bspw. TCP/IP, REST, req/res, pub/sub und Protokolle wie HTTP, Websockets, GraphQL, gRPC, WebRTC, HLS, MPEG-DASH, RTMP, MQTT)."
        excelString: "Wissen wie Kommunikation zwischen Computern realisiert wird (bspw. req/res, pub/sub und Protokolle wie HTTP, MQTT)."
      - title: TechStacks
        competence: "Kennen State-of-the-art Technologie zur Umsetzung von software-basierten Anwendungen (insb. in den Bereichen Web, Mobile, IoT, AR/VR, AI), können konkurrierende alternative Technologien auswählen und evaluieren, sich neue technologische Möglichkeiten erschließen, diese bewerten, nutzen, und integrieren sowie zukunftsorientiert neue Möglichkeiten screenen."
      - title: Interaktive Technologien
        competence: "Können hardware-basierte Technologien zur Interaktion mit Computern in verschiedenen Modalitäten einsetzen (bspw. sprachbasierte Interaktion, Tangible Computing, Physical Computing, Sensoren und Aktoren)."
  - title: Entwurf
    sub:
      - title: Formale Strukturen
        competence: "Verstehen formale Strukturen."
      - title: Abstraktion
        competence: "Können abstrahieren, logisch denken und komplexe Zusammenhänge verstehen."
      - title: Modellierung
        competence: "Können Aspekte realweltlicher Probleme zu identifizieren, die für eine informatische Modellierung geeignet sind, algorithmische Lösungen für diese (Teil-)Probleme bewerten und selbst so zu entwickeln, dass diese Lösungen mit einem Computer operationalisiert werden können."
      - title: Verteilung
        competence: "Konzepte (bspw. Prinzipien, Paradigmen, Architekturen, Pattern) für die web-basierte Verteilung von Komponenten (bspw. Frontend/Clients/Apps, Backend/Server/Middlebox/Cloud) für verteilte interaktive Anwendungen kennen und umsetzen können."
        excelString: "Konzepte (bspw. Paradigmen, Architekturen, Pattern) für die web-basierte Verteilung von Komponenten (bspw. Frontend/Clients/Apps, Backend/Server/Cloud) für verteilte interaktive Anwendungen kennen und umsetzen können."
  - title: Implementierung
    sub:
      - title: Tooling
        competence: "Kennen Entwicklungsumgebungen, Tools und entwicklungsnahe Prozesse und diese praktisch nutzen (insb. IDE, Compiler, Linker, Libraries, Debugging, Unit-Testing, Repositories für eigenen Code / git, Build Tools, Paketmanager, SAST, DAST, Fuzzing)."
        excelString: "Kennen Entwicklungsumgebungen, Tools und entwicklungsnahe Prozesse und diese praktisch nutzen (insb. IDE, Compiler, Linker, Libraries, Debugging, Unit-Testing, Repositories für eigenen Code / git, Build Tools, Paketmanager)."
      - title: Software Teams
        competence: "Können (komplexe) Softwaresysteme im Team nach dem DevOps- bzw. DevSecOps-Ansatz entwickeln."
        excelString: "Können (komplexe) Softwaresysteme im Team entwickeln."
      - title: Agile
        competence: "Kennen Grundkonzepte agiler Entwicklung und agilen Arbeitens wie iterative und inkrementelle Entwicklung, selbstorganisierte Teams, Transparente Kommunikation, Scrum, Kanban etc. und können diese in Projekten anwenden."
        excelString: "Kennen Grundkonzepte agiler Entwicklung und agilen Arbeitens wie iterative und inkrementelle Entwicklung, selbstorganisierte Teams, Transparente Kommunikation, etc. und können diese in Projekten anwenden."
      - title: Deployment
        competence: "Können digitale Produkte und verschiedene Software-Artefakte zur Evaluation und zur Nutzung auf typischen Distributionswegen (bspw. Clickdummy, Web-Deployment, App Store) für verschiedene Zielgruppen bereit stellen (lauffähig, sicher und gebrauchstauglich)."
---

**Leitfrage: Wie werden Softwaresysteme und -produkte gebaut?**

Durch die Planung von Systemarchitekturen, die Umsetzung von Frontend- und Backend-Funktionalitäten, den Entwurf von Software-Systemen und Datenbankstrukturen sowie die Implementierung von Sicherheitsmaßnahmen schaffen Medieninformatiker\*innen qualitativ hochwertige Softwarelösungen. Durch enge Zusammenarbeit im Team tragen Medieninformatiker\*innen dazu bei, innovative und zuverlässige Systeme zu schaffen, die den Anforderungen der Stakeholder gerecht werden.

Im Arbeitsbereich «Developing Interactive and Distributed Systems« gibt es im Berufsalltag von Medieninformatiker\*innen verschiedene typische Vorgänge. Hier sind einige davon:

- Entwurf der Architektur von interaktiven und verteilten Systemen. Dies beinhaltet die Festlegung von Strukturen, Schnittstellen und Kommunikationsprotokollen.
- Modellierung und Entwicklung von Software und Softwarekomponenten unter Verwendung verschiedener Entwurfsmuster, Entwurfsprinzipien, Architekturstilen, Programmiersprachen und Frameworks.
- Entwicklung von Web-Streaming-Diensten insbesondere für Live-Events, On-Demand Videos und Audio/Video-Konferenzsysteme.
- Konzeptionierung und Implementierung von (web-basierten) Benutzungsoberflächen unter Berückschitigung von Gestaltungsprinzipien und Gestaltungstechniken wie Farben, Konstrasten, Proportion, Typographie oder Räumlichkeit
- Implementieren Benutzungsschnittstellen für verschiedene Clients (bspw. Mobile, Web, IoT) und für verschiedene Nutzungskontexte, um funktionale Anforderungen umzusetzen.
- Optimierung von graphischen und greifbaren Benutzungschnittstellen, um eine hohe Gebrauchstauglichkeit und eine positive Nutzungserfahrung zu gewährleisten.
- Implementierung der Logik und Datenverarbeitung auf der Client- und Serverseite, um die Funktionalität der Anwendung sicherzustellen.
- Entwicklung von Datenbankstrukturen und Integration von Datenbanken in das System, um Daten effizient zu speichern, abzurufen und zu verwalten.
- Integration von Sicherheitsmaßnahmen, um die Integrität, Vertraulichkeit, Verfügbarkeit, Authentiztät als auch die Nichtabstreitbarkeit von Daten in verteilten Systemen zu gewährleisten.
- Durchführung von Tests, um sicherzustellen, dass das System die definierten Anforderungen erfüllt.
- Skalierbarkeit und Performance-Optimierung, um den Anforderungen einer wachsenden Benutzer\*innenbasis gerecht zu werden.
- Erstellung von Dokumentationen sowie die Einhaltung von Clean Code Prinzipien, die den Quelltext, die Systemarchitektur und andere relevante Informationen und Entscheidungen umfassen, um eine einfache Wartung und Weiterentwicklung zu ermöglichen.
- Koordinierung der Zusammenarbeit mit anderen Entwickler\*innen, Designer\*innen Productownern und weiteren Stakeholdern, um sicherzustellen, dass die entwickelten Systeme den Anforderungen und Erwartungen entsprechen.
- Implementierung von Technologien, die Interaktionen an verschiedene Umgebungen und Kontexte anpassen können, um eine nahtlose Nutzung zu ermöglichen.
- Implementierung von Funktionen des maschinellen Lernens, um personalisierte Interaktionen auf Grundlage von Benutzer\*innenpräferenzen und -verhalten zu ermöglichen. 