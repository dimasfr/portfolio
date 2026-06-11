export const projects = [
  {
    title: `Melodeenes`, 
    description: `Melodeenes is a full-featured e-commerce web application integrated with multiple third-party services. It includes a product catalog, cart & checkout flow, real-time shipping rate calculation, and order management — powered by Biteship for logistics, Midtrans for payments, Google Maps API for address handling, and Firebase google authentication.`, 
    folder: '/projects/melodeenes/',
    image: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp'],
    language: "Nuxt, Nest, MySQL, Firebase, Google Maps API, Biteship, Midtrans",
    tags: ["E-commerce"],
    link: ""
  },
  { 
    title: `Medeva`, 
    description: `Medeva is a flagship EMR product by PT. Medeva Multi Talenta, used by hundreds of clinics in Indonesia. It integrates with SATUSEHAT and PCare (BPJS Kesehatan), and includes features such as outpatient records, doctor scheduling, integrated queue management, pharmacy modules, data import, and analytics dashboards—fully compliant with BPJS standards including MJKN.`, 
    image: '/projects/medeva.webp',
    language: "React, Bootstrap, WebSocket, Express, Redis, PostgreSql, PCare, SATUSEHAT",
    tags: ["Healthcare"],
    link: "https://klinik.medeva.tech/"
  },
  { 
    title: `E-Procurement`, 
    description: `The E-Procurement platform is a digital system used by BPJSTK to manage the procurement of goods and services online. It connects Vendors with BPJSTK in tender activities, ensuring the process is more transparent, efficient, and well-documented.`, 
    image: '/projects/eprocurement.webp',
    language: "Vue, Node, Express, Redis, MariaDB, Oracle",
    tags: ["Government"],
    link: "https://eproc.bpjsketenagakerjaan.go.id/login"
  },
  { 
    title: `Smile`, 
    description: `Smile is an integrated application owned by BPJSTK, consisting of various internal modules to support organizational operations. Among these modules, I focus primarily on the E-Procurement and Vendor Management System (VMS).`, 
    image: '/projects/smile.webp',
    language: "PHP, jQuery, CSS, Express, Redis, MariaDB, Oracle",
    tags: ["Government"],
    link: "https://smile.bpjsketenagakerjaan.go.id/smile/login.bpjs"
  },
  { 
    title: `INOAC`, 
    description: `INOAC is a manufacturing application that focuses on managing production processes for foam (busa) products. The system is designed to support the end-to-end manufacturing workflow, including order management, production tracking, inventory handling, and quality control.`, 
    image: '/projects/inoac.webp',
    language: "React, Vite, TailwindCSS",
    tags: ["Manufacture"],
    link: ""
  },
  { 
    title: `DevConnector`, 
    description: `DevConnector is a social media–like platform built as part of a comprehensive Udemy course project. The application allows developers to create profiles, share posts, connect with other developers, and engage in discussions, mimicking the core functionality of a professional networking site.`, 
    image: '/projects/devconnector.webp',
    language: "React, SCSS, Node, Express, MongoDb",
    tags: ["Personal"],
    link: ""
  },
  { 
    title: `HRIS`, 
    description: `HRIS (Human Resource Information System) is a web-based application designed to manage and streamline various HR functions within an organization.`, 
    image: '/projects/hris.webp',
    language: "Vue, Vite, SCSS, Node, Express, MySQL",
    tags: ["Enterprise"],
    link: "https://t2pindonesia.com/"
  },
  { 
    title: `Schoolease`, 
    description: `Schoolease is an academic management website designed to support schools and educational institutions. Beyond its core focus on information management, the platform also provides essential features such as attendance tracking and online examinations.`, 
    image: '/projects/schoolease.webp',
    language: "Vue, Vite, SCSS, Node, Express, MySQL",
    tags: ["Academic"],
    link: "https://schoolease.bramarastudio.cloud/#/auth/login"
  },
  { 
    title: `Datastore`, 
    description: `School Datastore is a platform focused on centralized document storage for schools. It allows educational institutions to securely manage, organize, and access important documents in one place, ensuring efficiency, and easy retrieval.`, 
    image: '/projects/datastore.webp',
    language: "Vue, Typescript, SCSS, Node, Express, MySQL",
    tags: ["Academic"],
    link: ""
  },
  { 
    title: `Medeva (Prototype)`, 
    description: `Medeva (Prototype) is an Electronic Medical Record (EMR) system designed for Ar-Razy Clinic. The system integrates queue management and real-time queue calling using WebSocket technology, along with outpatient service management and doctor scheduling.`, 
    image: '/projects/medeva-prototype.webp',
    language: "CodeIgniter, jQuery, WebSocket, Bootstrap, MySQL",
    tags: ["Healthcare"],
    link: ""
  },
  { 
    title: `SPC`, 
    description: `SPC or Statistical Process Control is a manufacturing application module developed to monitor and control production quality using statistical methods. The system tracks process data in real time, analyzes variations, and generates insights to ensure products consistently meet quality standards.`, 
    image: '/projects/spc.webp',
    language: "CodeIgniter, jQuery, Bootstrap, MySQL",
    tags: ["Manufacture"],
    link: ""
  },
  { 
    title: `Manufacture Quality`, 
    description: `Manufacture Quality is an application module designed to ensure that production outputs consistently meet defined standards. It focuses on quality control, inspection, and reporting across different stages of the manufacturing process.`, 
    image: '/projects/man-qlt.webp',
    language: "CodeIgniter, jQuery, CSS, MySQL",
    tags: ["Manufacture"],
    link: ""
  },
  { 
    title: `Manufacture Production`, 
    description: `Manufacture Production is an application module that manages and monitors the end-to-end production process in a manufacturing environment. It covers areas such as production planning, scheduling, BOM, tracking, and reporting, ensuring that resources are utilized efficiently and output targets are achieved.`, 
    image: '/projects/man-prd.webp',
    language: "CodeIgniter, jQuery, CSS, MySQL",
    tags: ["Manufacture"],
    link: ""
  },
  { 
    title: `Fishing Vessel Recording System`, 
    description: `The Fishing Vessel Recording System is an application designed to digitally record and manage fishing vessel activities. It supports features such as vessel registration, trip logging, catch reporting, and compliance tracking with maritime regulations.`, 
    image: '/projects/pondokdadap.webp',
    language: "CodeIgniter, jQuery, CSS, MySQL",
    tags: ["Government"],
    link: ""
  },
  { 
    title: `Edsen`, 
    description: `This project focuses on developing a Vendor Evaluation System for the Ministry of Public Works and Housing (PUPR). The application is designed to assess vendor performance based on multiple criteria such as project delivery, quality of work, compliance, and service reliability.`, 
    image: '/projects/edsen.webp',
    language: "Vue, Bootstrap, PHP, MySQL",
    tags: ["Government"],
    link: ""
  },
  { 
    title: `SIDukcapil`, 
    description: `SIDukcapil is an application developed for the Department of Population and Civil Registration (Dispenduk) to manage population and civil registry data. The system covers key services such as resident data management, civil documents (birth, marriage, death certificates), and identity records.`, 
    image: '/projects/sidukcapil.webp',
    language: "CodeIgniter, CSS, jQuery, MySQL",
    tags: ["Government"],
    link: ""
  },
  { 
    title: `MasterWeb`, 
    description: `The Academic Information System is a web-based platform designed to manage and streamline various academic activities within educational institutions. Its features include student information management, course and curriculum administration, attendance tracking, examinations, and academic reporting.`, 
    image: '/projects/siakad.webp',
    language: "CodeIgniter, CSS, jQuery, MySQL",
    tags: ["Academic"],
    link: ""
  },
  { 
    title: `MasterITN`, 
    description: `MasterITN is a campus management system designed to support rectorate-level operations. Unlike a standard Academic Information System that focuses primarily on student and academic activities, MasterITN extends its scope to include budget planning (RKAT), employee management, human resources, and other administrative processes.`, 
    image: '/projects/masteritn.webp',
    language: "CodeIgniter, CSS, jQuery, MySQL",
    tags: ["Academic"],
    link: ""
  },
  { 
    title: `ChatBot Whatsapp`, 
    description: `The WhatsApp Chatbot is an automation system built on top of Web WhatsApp and enhanced with Natural Language Processing (NLP) concepts. It enables automated interactions with users, such as answering queries, processing requests, and providing real-time information through conversational flows.`, 
    image: '/projects/chatbot.webp',
    language: "Python, Selenium, AIML, NLP",
    tags: ["Academic"],
    link: ""
  },
  { 
    title: `SILab`, 
    description: `SI Lab (Laboratory Information System) is a platform designed to manage and store practicum assessment data. The system allows lecturers and laboratory staff to record, organize, and track students performance in laboratory sessions efficiently.`, 
    image: '/projects/silab.webp',
    language: "PHP, Javascript, Bootstrap, MySQL",
    tags: ["Academic"],
    link: ""
  },
  { 
    title: `Konco Kost`, 
    description: `Konco Kost is a web-based platform that helps users find boarding houses (kost) nearby, integrated with the Google Maps API. The system provides detailed information about available boarding houses and includes a distance calculation feature to help users determine proximity to campuses, offices, or other key locations.`, 
    image: '/projects/konco-kost.webp',
    language: "PHP, Javascript, Bootstrap, MySQL, Google Maps API",
    tags: ["Personal"],
    link: ""
  },
  { 
    title: `Al Manahij`, 
    description: `Al-Manahij is a web-based platform designed to assist users in selecting appropriate methods for learning the Qur'an. The system provides guidance on different Qur'anic learning methodologies, helping students and teachers choose the approach that best suits their needs and learning styles.`, 
    image: '/projects/al-manahij.webp',
    language: "PHP, Javascript, Bootstrap, MySQL",
    tags: ["Academic"],
    link: ""
  },
  { 
    title: `Masail Fiqhiyyah`, 
    description: `Masail Fiqhiyyah is an information platform that provides access to a wide range of Islamic jurisprudence (fiqh) discussions. The platform organizes various fiqh topics into structured content, making it easier for users to learn, reference, and explore different perspectives on religious rulings.`, 
    image: '/projects/masail.webp',
    language: "PHP, Javascript, Bootstrap, MySQL",
    tags: ["Academic"],
    link: ""
  },
];