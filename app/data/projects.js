export const projects = [
  {
    title: `KomoDice`,
    description: `A personal project. KomoDice is a Roll20-style Virtual Tabletop for playing Dungeons & Dragons multiplayer in real time. It provides a server-authoritative shared table for 1 DM and 2-8 players — grid-based battle maps with pan/zoom, draggable tokens, fog of war, dice roller, initiative tracker, and chat — plus a creature-centric character system with SRD 5e-driven autofill for species, classes, spells, feats, and equipment.`,
    folder: '/projects/vtt/',
    image: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp', '9.webp', '10.webp', '11.webp', '12.webp', '13.webp', '14.webp'],
    language: "Nuxt, Vue, TypeScript, PixiJS, Three.js, Pinia, NestJS, Socket.IO, PostgreSQL, Drizzle ORM, Redis",
    tags: ["Personal"],
    link: "https://komodice.com/"
  },
  {
    title: `Pi Ai Pi`,
    description: `Built for Melodeenes & oKibby. Pi Ai Pi is an Indonesian e-commerce storefront for a gift & snack brand, covering the full order lifecycle from browsing to delivery. It features a product catalog with variants, persistent cart & checkout, coupons, a digital message card (giftcard) add-on with shareable QR link, admin-curated reviews, and a full back-office admin panel — integrated with Firebase Google Authentication, Midtrans Snap for payments, and Biteship for live shipping rates, booking, tracking and PDF label generation.`,
    folder: '/projects/piaipi/',
    image: ['1.gif', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp', '9.webp', '10.webp'],
    language: "Nuxt, Vue, TypeScript, Pinia, NestJS, Drizzle ORM, MySQL, Firebase, Midtrans, Biteship",
    tags: ["E-commerce"],
    link: ""
  },
  {
    title: `Medeva`,
    description: `Medeva is a flagship EMR product by PT. Medeva Multi Talenta, used by hundreds of clinics in Indonesia. I worked on it as part of the Medeva team. It integrates with SATUSEHAT and PCare (BPJS Kesehatan), and includes features such as outpatient records, doctor scheduling, integrated queue management, pharmacy modules, data import, and analytics dashboards—fully compliant with BPJS standards including MJKN.`,
    image: '/projects/medeva.webp',
    language: "React, Bootstrap, WebSocket, Express, Redis, PostgreSql, PCare, SATUSEHAT",
    tags: ["Healthcare"],
    link: "https://klinik.medeva.tech/"
  },
  {
    title: `E-Procurement`,
    description: `Built for BPJS Ketenagakerjaan (BPJSTK). The E-Procurement platform is a digital system used by BPJSTK to manage the procurement of goods and services online. It connects Vendors with BPJSTK in tender activities, ensuring the process is more transparent, efficient, and well-documented.`,
    image: '/projects/eprocurement.webp',
    language: "Vue, Node, Express, Redis, MariaDB, Oracle",
    tags: ["Government"],
    link: "https://eproc.bpjsketenagakerjaan.go.id/login"
  },
  {
    title: `Smile`,
    description: `Built for BPJS Ketenagakerjaan (BPJSTK). Smile is an integrated application owned by BPJSTK, consisting of various internal modules to support organizational operations. Among these modules, I focus primarily on the E-Procurement and Vendor Management System (VMS).`,
    image: '/projects/smile.webp',
    language: "PHP, jQuery, CSS, Express, Redis, MariaDB, Oracle",
    tags: ["Government"],
    link: "https://smile.bpjsketenagakerjaan.go.id/smile/login.bpjs"
  },
  {
    title: `INOAC`,
    description: `Built for PT. Inoac Polytechno Indonesia. INOAC is a manufacturing application that focuses on managing production processes for foam (busa) products. The system is designed to support the end-to-end manufacturing workflow, including order management, production tracking, inventory handling, and quality control.`,
    image: '/projects/inoac.webp',
    language: "React, Vite, TailwindCSS",
    tags: ["Manufacture"],
    link: ""
  },
  {
    title: `DevConnector`,
    description: `A personal learning project with no client, built as part of a comprehensive Udemy course. DevConnector is a social media–like platform that allows developers to create profiles, share posts, connect with other developers, and engage in discussions, mimicking the core functionality of a professional networking site.`,
    image: '/projects/devconnector.webp',
    language: "React, SCSS, Node, Express, MongoDb",
    tags: ["Personal"],
    link: ""
  },
  {
    title: `HRIS`,
    description: `Built for PT. Tritunggal Putra. HRIS (Human Resource Information System) is a web-based application designed to manage and streamline various HR functions within an organization.`,
    image: '/projects/hris.webp',
    language: "Vue, Vite, SCSS, Node, Express, MySQL",
    tags: ["Enterprise"],
    link: "https://t2pindonesia.com/"
  },
  {
    title: `Schoolease`,
    description: `Built for SMKN 1 Beji. Schoolease is an academic management website designed to support schools and educational institutions. Beyond its core focus on information management, the platform also provides essential features such as attendance tracking and online examinations.`,
    image: '/projects/schoolease.webp',
    language: "Vue, Vite, SCSS, Node, Express, MySQL",
    tags: ["Academic"],
    link: ""
  },
  {
    title: `Datastore`,
    description: `Built for SMAN 8 Malang. School Datastore is a platform focused on centralized document storage for schools. It allows educational institutions to securely manage, organize, and access important documents in one place, ensuring efficiency, and easy retrieval.`,
    image: '/projects/datastore.webp',
    language: "Vue, Typescript, SCSS, Node, Express, MySQL",
    tags: ["Academic"],
    link: ""
  },
  {
    title: `Medeva (Prototype)`,
    description: `Built for Medeva as the early prototype of its EMR product. Medeva (Prototype) is an Electronic Medical Record (EMR) system designed for Ar-Razy Clinic. The system integrates queue management and real-time queue calling using WebSocket technology, along with outpatient service management and doctor scheduling.`,
    image: '/projects/medeva-prototype.webp',
    language: "CodeIgniter, jQuery, WebSocket, Bootstrap, MySQL",
    tags: ["Healthcare"],
    link: ""
  },
  {
    title: `SPC`,
    description: `Built for Inafood (Pasuruan) and ASW Food (Medan). SPC or Statistical Process Control is a manufacturing application module developed to monitor and control production quality using statistical methods. The system tracks process data in real time, analyzes variations, and generates insights to ensure products consistently meet quality standards.`,
    image: '/projects/spc.webp',
    language: "CodeIgniter, jQuery, Bootstrap, MySQL",
    tags: ["Manufacture"],
    link: ""
  },
  {
    title: `Manufacture Quality`,
    description: `Built for Inafood (Pasuruan) and ASW Food (Medan). Manufacture Quality is an application module designed to ensure that production outputs consistently meet defined standards. It focuses on quality control, inspection, and reporting across different stages of the manufacturing process.`,
    image: '/projects/man-qlt.webp',
    language: "CodeIgniter, jQuery, CSS, MySQL",
    tags: ["Manufacture"],
    link: ""
  },
  {
    title: `Manufacture Production`,
    description: `Built for Inafood (Pasuruan) and ASW Food (Medan). Manufacture Production is an application module that manages and monitors the end-to-end production process in a manufacturing environment. It covers areas such as production planning, scheduling, BOM, tracking, and reporting, ensuring that resources are utilized efficiently and output targets are achieved.`,
    image: '/projects/man-prd.webp',
    language: "CodeIgniter, jQuery, CSS, MySQL",
    tags: ["Manufacture"],
    link: ""
  },
  {
    title: `Parasol`,
    description: `Built for UPT Pelabuhan Pondokdadap. Parasol - The Fishing Vessel Recording System is an application designed to digitally record and manage fishing vessel activities. It supports features such as vessel registration, trip logging, catch reporting, and compliance tracking with maritime regulations.`,
    image: '/projects/pondokdadap.webp',
    language: "CodeIgniter, jQuery, CSS, MySQL",
    tags: ["Government"],
    link: ""
  },
  {
    title: `Edsen`,
    description: `Built for PU Medan (Public Works). Edsen is a Vendor Evaluation System designed to assess vendor performance based on multiple criteria such as project delivery, quality of work, compliance, and service reliability.`,
    image: '/projects/edsen.webp',
    language: "Vue, Bootstrap, PHP, MySQL",
    tags: ["Government"],
    link: ""
  },
  {
    title: `SIDukcapil`,
    description: `Built for Dukcapil Kabupaten Mojokerto (Department of Population and Civil Registration). SIDukcapil is an application to manage population and civil registry data. The system covers key services such as resident data management, civil documents (birth, marriage, death certificates), and identity records.`,
    image: '/projects/sidukcapil.webp',
    language: "CodeIgniter, CSS, jQuery, MySQL",
    tags: ["Government"],
    link: ""
  },
  {
    title: `MasterWeb`,
    description: `Built for senior high schools (SMA & SMK) across East Java. The Academic Information System is a web-based platform designed to manage and streamline various academic activities within educational institutions. Its features include student information management, course and curriculum administration, attendance tracking, examinations, and academic reporting.`,
    image: '/projects/siakad.webp',
    language: "CodeIgniter, CSS, jQuery, MySQL",
    tags: ["Academic"],
    link: ""
  },
  {
    title: `MasterITN`,
    description: `Built for Institut Teknologi Nasional (ITN). MasterITN is a campus management system designed to support rectorate-level operations. Unlike a standard Academic Information System that focuses primarily on student and academic activities, MasterITN extends its scope to include budget planning (RKAT), employee management, human resources, and other administrative processes.`,
    image: '/projects/masteritn.webp',
    language: "CodeIgniter, CSS, jQuery, MySQL",
    tags: ["Academic"],
    link: ""
  },
  {
    title: `ChatBot Whatsapp`,
    description: `Built for the RPL Laboratory at Institut Teknologi Nasional, alongside SILab. The WhatsApp Chatbot is an automation system built on top of Web WhatsApp and enhanced with Natural Language Processing (NLP) concepts. It enables automated interactions with users, such as answering queries, processing requests, and providing real-time information through conversational flows.`,
    image: '/projects/chatbot.webp',
    language: "Python, Selenium, AIML, NLP",
    tags: ["Academic"],
    link: ""
  },
  {
    title: `SILab`,
    description: `Built for the RPL Laboratory at Institut Teknologi Nasional. SI Lab (Laboratory Information System) is a platform designed to manage and store practicum assessment data. The system allows lecturers and laboratory staff to record, organize, and track students performance in laboratory sessions efficiently.`,
    image: '/projects/silab.webp',
    language: "PHP, Javascript, Bootstrap, MySQL",
    tags: ["Academic"],
    link: ""
  },
  {
    title: `Konco Kost`,
    description: `A freelance project. Konco Kost is a web-based platform that helps users find boarding houses (kost) nearby, integrated with the Google Maps API. The system provides detailed information about available boarding houses and includes a distance calculation feature to help users determine proximity to campuses, offices, or other key locations.`,
    image: '/projects/konco-kost.webp',
    language: "PHP, Javascript, Bootstrap, MySQL, Google Maps API",
    tags: ["Freelance"],
    link: ""
  },
  {
    title: `Al Manahij`,
    description: `Built for MTQMR 2018 (Musabaqah Tilawatil Qur'an Mahasiswa Regional). Al-Manahij is a web-based platform designed to assist users in selecting appropriate methods for learning the Qur'an. The system provides guidance on different Qur'anic learning methodologies, helping students and teachers choose the approach that best suits their needs and learning styles.`,
    image: '/projects/al-manahij.webp',
    language: "PHP, Javascript, Bootstrap, MySQL",
    tags: ["Academic"],
    link: ""
  },
  {
    title: `Masail Fiqhiyyah`,
    description: `Built for MTQMN 2017 (Musabaqah Tilawatil Qur'an Mahasiswa Nasional). Masail Fiqhiyyah is an information platform that provides access to a wide range of Islamic jurisprudence (fiqh) discussions. The platform organizes various fiqh topics into structured content, making it easier for users to learn, reference, and explore different perspectives on religious rulings.`,
    image: '/projects/masail.webp',
    language: "PHP, Javascript, Bootstrap, MySQL",
    tags: ["Academic"],
    link: ""
  },
];
