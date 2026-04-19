/* ===================================================
   METRO RELOCATORS — script
   i18n, chat quote, reveals, nav, form, toast
   =================================================== */

(() => {
  'use strict';

  /* ---------- Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  /* ===================================================
     I18N
     =================================================== */

  const I18N = {
    en: {
      meta_title: 'Metro Relocators — Reliable Interstate Moving from New York',
      meta_desc: 'Licensed and insured interstate moving company based in New York. Careful handling, on-time delivery, free quotes in minutes.',
      logo_sub: 'New York · Interstate Moving',
      nav_services: 'Services',
      nav_how: 'How It Works',
      nav_why: 'Why Us',
      nav_reviews: 'Reviews',
      nav_contact: 'Contact',
      phone_aria: 'Call us at 1 800 555 0199',
      cta_free_quote: 'Get a Free Quote',
      cta_see_how: 'See How It Works',
      hero_img_alt: 'Professional movers loading furniture into a moving truck outside a New York brownstone',
      hero_eyebrow: 'Licensed · Insured · USDOT #3857210',
      hero_h1: 'Reliable Interstate Moving <span class="accent">from New York</span>',
      hero_lead: "Careful hands, honest pricing, on-time delivery across all 50 states. Get a real quote in under 2 minutes — no phone tag, no pressure.",
      stat_moves: 'Moves completed',
      stat_rating: 'Customer rating',
      stat_states: 'States covered',
      trust_1: 'Fully licensed & insured',
      trust_2: 'AMSA ProMover certified',
      trust_3: 'On-time guarantee',
      trust_4: '24/7 support',
      trust_5: 'Transparent flat pricing',
      services_kicker: 'What we move',
      services_h2: 'Services built for long-distance moves',
      services_sub: "Whether it's a studio in Brooklyn heading to Chicago or a five-bedroom home going to Miami, we handle it end-to-end.",
      svc_inter_t: 'Interstate Moving',
      svc_inter_d: 'New York to Chicago, Florida, Texas, California — we run dedicated routes across the continental US with GPS-tracked trucks.',
      svc_res_t: 'Residential & Apartment Moves',
      svc_res_d: 'Studios, walk-ups, high-rises, and family homes. Floor protection, door padding, and an insured crew that respects your building rules.',
      svc_pack_t: 'Packing & Unpacking',
      svc_pack_d: 'Full-service packing with double-wall cartons, bubble wrap, and custom crates. We label every box and unpack at your destination.',
      svc_spec_t: 'Specialty Item Moving',
      svc_spec_d: 'Pianos, antiques, fine art, statues, oversized TVs, gun safes, and large furniture — crated, strapped, and handled by specialists.',
      how_kicker: 'Simple process',
      how_h2: 'Four steps from box to new home',
      how_sub: 'No 30-minute phone calls. No hidden fees. Our quote flow was built around how people actually move.',
      how_s1_t: 'Request a quote',
      how_s1_d: "Tap the chat below and tell us where you're moving from and to.",
      how_s2_t: 'Answer a few questions',
      how_s2_d: 'Home size, move date, inventory, specialty items — it takes about 90 seconds.',
      how_s3_t: 'Receive your estimate',
      how_s3_d: 'A transparent, itemized price range based on real mileage and volume.',
      how_s4_t: 'Schedule your move',
      how_s4_d: 'Lock in the date, meet your crew lead, and we take it from there.',
      how_cta: 'Start Your Quote',
      how_badge: 'Average quote time: <strong>1 min 48 s</strong>',
      quote_kicker: 'Instant quote',
      quote_h2: 'Chat with our quote assistant',
      quote_sub: "Answer five quick questions — we'll calculate an honest estimate and a real moving consultant will follow up.",
      chat_title: 'Moving Assistant',
      chat_status: 'Online · replies instantly',
      chat_bot_from: "Hey there! I'm your moving assistant. Let's get you a quick estimate. First — what city are you moving from?",
      chat_bot_to: 'Got it. And where are you headed?',
      chat_bot_date: 'When are you planning to move?',
      chat_bot_home: 'What kind of home are you moving from?',
      chat_bot_items: 'Any specialty items we should know about? Pick all that apply.',
      chat_ph_from: 'Street, City, State (e.g. 145 W 32nd St, New York, NY)',
      chat_ph_to: 'Street, City, State',
      chat_ph_date: 'Select a date',
      chat_today: 'Today',
      chat_searching: 'Searching addresses…',
      chat_home_studio: 'Studio',
      chat_home_1br: '1 bedroom',
      chat_home_2br: '2 bedrooms',
      chat_home_3br: '3 bedrooms',
      chat_home_house: 'House (4+ BR)',
      chat_item_piano: 'Piano',
      chat_item_antiques: 'Antiques',
      chat_item_art: 'Fine art',
      chat_item_gym: 'Gym equipment',
      chat_item_safe: 'Safe / heavy',
      chat_item_fragile: 'Lots of fragile',
      chat_item_none: 'None of these',
      chat_send: 'Send',
      chat_confirm: 'Confirm',
      chat_crunching: 'Crunching the numbers based on mileage, volume, and specialty handling…',
      chat_estimate_h: 'Estimated move cost',
      chat_estimate_disc: 'Binding estimate · includes labor, truck, and standard packing supplies',
      chat_estimate_route: 'Route',
      chat_estimate_date: 'Move date',
      chat_estimate_home: 'Home size',
      chat_estimate_specialty: 'Specialty',
      chat_estimate_none: 'None',
      chat_lead_intro: "Looks good? Drop your details and I'll lock in this price and connect you with a real coordinator.",
      chat_lead_name: 'Full name',
      chat_lead_phone: 'Phone number',
      chat_lead_email: 'Email address',
      chat_lead_submit: 'Get My Quote',
      chat_lead_saving: 'Saving…',
      chat_lead_locked: '✓ Your quote is locked in. A coordinator will reach out within 1 business hour.',
      chat_lead_thanks: 'Thanks, {name}! Your quote is locked in. A move coordinator will reach out to {phone} within the next business hour to schedule your walkthrough. Check your email ({email}) for a copy of this estimate.',
      chat_toast_submitted: "Quote submitted — we'll be in touch!",
      chat_err_origin: 'Please enter your origin city.',
      chat_err_dest: 'Please enter your destination city.',
      chat_err_date: 'Please pick a move date.',
      chat_err_pick: 'Pick at least one option (or "None of these").',
      chat_err_form: 'Please fill out all fields.',
      chat_err_email: 'Please enter a valid email.',
      why_kicker: 'Why choose us',
      why_h2: 'Built on trust, finished on time',
      why_1_t: 'Licensed & insured',
      why_1_d: 'USDOT #3857210 · MC #1425678. Full cargo and liability coverage on every move.',
      why_2_t: 'Experienced crews',
      why_2_d: 'Every lead has 5+ years on the road. Background-checked, uniformed, and trained in-house.',
      why_3_t: 'Safe, secure packing',
      why_3_d: 'Double-wall cartons, custom crates for fragile items, furniture pads on every piece.',
      why_4_t: 'On-time delivery',
      why_4_d: "97% of interstate moves arrive within the scheduled window. If we're late, you get a credit.",
      why_5_t: 'Customer-first',
      why_5_d: 'Dedicated move coordinator from quote to unpack. Real humans, no call center runaround.',
      why_6_t: 'Transparent pricing',
      why_6_d: "Binding estimates only. What you're quoted is what you pay — no surprises at delivery.",
      tm_kicker: 'From our customers',
      tm_h2: 'Real moves, real reviews',
      tm_sub: 'Verified reviews from customers across the country.',
      tm_1_q: '"Moved from Brooklyn to Austin in June. Crew showed up early, wrapped everything, and delivered two days ahead of schedule. Price matched the quote exactly."',
      tm_2_q: '"Had a 1920s upright piano and a lot of anxiety. These guys custom-crated it in my apartment and it arrived in Chicago without a scratch. Pros."',
      tm_3_q: "\"Chat quote was shockingly fast. I'd called three other companies — Metro was the only one that gave me a real number without pressure. Booked them the same day.\"",
      tm_4_q: '"Four-bedroom house, 1,800 miles, two dogs and a lot of stairs. The crew was patient, professional, and the coordinator texted me updates the whole way."',
      tm_5_q: "\"We moved my mother out of her Bronx co-op after 40 years. The team was kind, gentle, and genuinely cared. Can't recommend them enough.\"",
      about_kicker: 'About Metro Relocators',
      about_h2: 'New York based. Built for the long haul.',
      about_p1: "Metro Relocators was founded in 2011 by three former long-haul drivers who were tired of watching broker outfits mishandle customers' belongings. We operate our own fleet out of Long Island City, employ our crews directly, and specialize in one thing: getting New Yorkers to their next chapter with nothing broken and nothing hidden in the bill.",
      about_p2: "Today we're one of the top-rated interstate movers on the East Coast, trusted by families, remote workers, and corporate relocations in all 50 states.",
      about_s1: 'Founded',
      about_s2: 'Team members',
      about_s3: 'Trucks in fleet',
      cta_h2: 'Get Your Free Moving Quote Today',
      cta_p: 'Transparent pricing. No obligation. A real estimate in under two minutes.',
      cta_btn: 'Start My Free Quote',
      contact_kicker: 'Contact',
      contact_h2: 'Talk to a real mover',
      contact_p: 'Call us, email, or send a message. A move coordinator will reach back within one business hour.',
      contact_phone_lbl: 'Phone',
      contact_email_lbl: 'Email',
      contact_area_lbl: 'Service area',
      contact_area_val: 'Based in New York · Interstate moves to all 50 states',
      contact_hours_lbl: 'Hours',
      contact_hours_val: 'Mon–Sat 7:00 AM – 9:00 PM ET · Sun 9:00 AM – 5:00 PM',
      form_title: 'Send us a message',
      form_name_lbl: 'Full name',
      form_name_ph: 'Jane Doe',
      form_phone_lbl: 'Phone',
      form_phone_ph: '(555) 010-1234',
      form_email_lbl: 'Email',
      form_email_ph: 'you@example.com',
      form_msg_lbl: 'How can we help?',
      form_msg_ph: 'Tell us about your move…',
      form_submit: 'Send Message',
      form_sending: 'Sending…',
      form_err_fields: 'Please fill in your name, phone, and email.',
      form_err_email: 'Please enter a valid email address.',
      form_thanks: 'Thanks! A coordinator will reach out within one business hour.',
      form_toast_ok: 'Message sent. Talk soon!',
      footer_about: 'Licensed interstate moving company headquartered in Long Island City, New York. USDOT #3857210 · MC #1425678.',
      footer_services_h: 'Services',
      footer_svc_1: 'Interstate moving',
      footer_svc_2: 'Apartment moves',
      footer_svc_3: 'Packing & unpacking',
      footer_svc_4: 'Specialty items',
      footer_company_h: 'Company',
      footer_why: 'Why choose us',
      footer_touch_h: 'Get in touch',
      footer_addr: 'Long Island City, NY 11101',
      footer_rights: '© {year} Metro Relocators LLC. All rights reserved.',
      footer_legal: 'Privacy · Terms · Licensing',
      locale: 'en-US',
      currency_prefix: '$',
      currency_suffix: ''
    },

    es: {
      meta_title: 'Metro Relocators — Mudanzas interestatales confiables desde Nueva York',
      meta_desc: 'Empresa de mudanzas interestatales con licencia y seguro, con sede en Nueva York. Manejo cuidadoso, entrega puntual, cotizaciones gratis en minutos.',
      logo_sub: 'Nueva York · Mudanzas interestatales',
      nav_services: 'Servicios',
      nav_how: 'Cómo funciona',
      nav_why: 'Por qué nosotros',
      nav_reviews: 'Opiniones',
      nav_contact: 'Contacto',
      phone_aria: 'Llámanos al 1 800 555 0199',
      cta_free_quote: 'Cotización gratis',
      cta_see_how: 'Ver cómo funciona',
      hero_img_alt: 'Mudadores profesionales cargando muebles en un camión frente a una casa de Nueva York',
      hero_eyebrow: 'Con licencia · Asegurado · USDOT #3857210',
      hero_h1: 'Mudanzas interestatales confiables <span class="accent">desde Nueva York</span>',
      hero_lead: 'Manos cuidadosas, precios honestos y entrega puntual en los 50 estados. Obtén una cotización real en menos de 2 minutos — sin llamadas interminables ni presión.',
      stat_moves: 'Mudanzas realizadas',
      stat_rating: 'Calificación de clientes',
      stat_states: 'Estados cubiertos',
      trust_1: 'Con licencia y seguro',
      trust_2: 'Certificado AMSA ProMover',
      trust_3: 'Garantía de puntualidad',
      trust_4: 'Soporte 24/7',
      trust_5: 'Precios fijos transparentes',
      services_kicker: 'Qué movemos',
      services_h2: 'Servicios creados para mudanzas de larga distancia',
      services_sub: 'Ya sea un estudio en Brooklyn rumbo a Chicago o una casa de cinco habitaciones a Miami, lo gestionamos de principio a fin.',
      svc_inter_t: 'Mudanzas interestatales',
      svc_inter_d: 'De Nueva York a Chicago, Florida, Texas, California — operamos rutas dedicadas por todo Estados Unidos con camiones rastreados por GPS.',
      svc_res_t: 'Mudanzas residenciales y de apartamentos',
      svc_res_d: 'Estudios, walk-ups, edificios altos y casas familiares. Protección de pisos, acolchado de puertas y un equipo asegurado que respeta las reglas del edificio.',
      svc_pack_t: 'Empaque y desempaque',
      svc_pack_d: 'Servicio completo de empaque con cajas de doble pared, plástico burbuja y cajones personalizados. Etiquetamos cada caja y desempacamos en tu destino.',
      svc_spec_t: 'Artículos especiales',
      svc_spec_d: 'Pianos, antigüedades, obras de arte, estatuas, televisores grandes, cajas fuertes y muebles voluminosos — embalados, asegurados y manejados por especialistas.',
      how_kicker: 'Proceso simple',
      how_h2: 'Cuatro pasos, de la caja al nuevo hogar',
      how_sub: 'Sin llamadas de 30 minutos. Sin cargos ocultos. Nuestro flujo de cotización se diseñó en torno a cómo la gente realmente se muda.',
      how_s1_t: 'Solicita tu cotización',
      how_s1_d: 'Abre el chat de abajo y dinos de dónde y hacia dónde te mudas.',
      how_s2_t: 'Responde algunas preguntas',
      how_s2_d: 'Tamaño de la casa, fecha, inventario, artículos especiales — toma unos 90 segundos.',
      how_s3_t: 'Recibe tu estimado',
      how_s3_d: 'Un rango de precios transparente y detallado, basado en millaje y volumen reales.',
      how_s4_t: 'Agenda tu mudanza',
      how_s4_d: 'Fija la fecha, conoce al jefe de equipo y nos encargamos del resto.',
      how_cta: 'Iniciar cotización',
      how_badge: 'Tiempo promedio de cotización: <strong>1 min 48 s</strong>',
      quote_kicker: 'Cotización instantánea',
      quote_h2: 'Chatea con nuestro asistente de cotización',
      quote_sub: 'Responde cinco preguntas rápidas — calcularemos un estimado honesto y un asesor real te contactará.',
      chat_title: 'Asistente de mudanzas',
      chat_status: 'En línea · responde al instante',
      chat_bot_from: '¡Hola! Soy tu asistente de mudanzas. Vamos a calcular un estimado rápido. Primero — ¿desde qué ciudad te mudas?',
      chat_bot_to: 'Entendido. ¿Y hacia dónde vas?',
      chat_bot_date: '¿Cuándo planeas mudarte?',
      chat_bot_home: '¿Qué tipo de vivienda estás dejando?',
      chat_bot_items: '¿Algún artículo especial que debamos saber? Elige todos los que apliquen.',
      chat_ph_from: 'Calle, Ciudad, Estado (ej. 145 W 32nd St, New York, NY)',
      chat_ph_to: 'Calle, Ciudad, Estado',
      chat_ph_date: 'Elige una fecha',
      chat_today: 'Hoy',
      chat_searching: 'Buscando direcciones…',
      chat_home_studio: 'Estudio',
      chat_home_1br: '1 habitación',
      chat_home_2br: '2 habitaciones',
      chat_home_3br: '3 habitaciones',
      chat_home_house: 'Casa (4+ hab.)',
      chat_item_piano: 'Piano',
      chat_item_antiques: 'Antigüedades',
      chat_item_art: 'Obras de arte',
      chat_item_gym: 'Equipo de gimnasio',
      chat_item_safe: 'Caja fuerte / pesada',
      chat_item_fragile: 'Muchos frágiles',
      chat_item_none: 'Ninguno',
      chat_send: 'Enviar',
      chat_confirm: 'Confirmar',
      chat_crunching: 'Calculando según millaje, volumen y artículos especiales…',
      chat_estimate_h: 'Costo estimado de mudanza',
      chat_estimate_disc: 'Estimado vinculante · incluye mano de obra, camión y suministros estándar',
      chat_estimate_route: 'Ruta',
      chat_estimate_date: 'Fecha de mudanza',
      chat_estimate_home: 'Tamaño de vivienda',
      chat_estimate_specialty: 'Especiales',
      chat_estimate_none: 'Ninguno',
      chat_lead_intro: '¿Se ve bien? Déjanos tus datos y aseguraremos este precio y te conectaremos con un coordinador real.',
      chat_lead_name: 'Nombre completo',
      chat_lead_phone: 'Número de teléfono',
      chat_lead_email: 'Correo electrónico',
      chat_lead_submit: 'Obtener mi cotización',
      chat_lead_saving: 'Guardando…',
      chat_lead_locked: '✓ Tu cotización está fijada. Un coordinador te contactará en 1 hora hábil.',
      chat_lead_thanks: '¡Gracias, {name}! Tu cotización está fijada. Un coordinador te llamará al {phone} dentro de la próxima hora hábil para programar el recorrido. Revisa tu correo ({email}) para una copia del estimado.',
      chat_toast_submitted: 'Cotización enviada — ¡estaremos en contacto!',
      chat_err_origin: 'Por favor ingresa tu ciudad de origen.',
      chat_err_dest: 'Por favor ingresa tu ciudad de destino.',
      chat_err_date: 'Por favor elige una fecha de mudanza.',
      chat_err_pick: 'Elige al menos una opción (o "Ninguno").',
      chat_err_form: 'Por favor completa todos los campos.',
      chat_err_email: 'Por favor ingresa un correo válido.',
      why_kicker: 'Por qué elegirnos',
      why_h2: 'Construido sobre confianza, entregado a tiempo',
      why_1_t: 'Con licencia y seguro',
      why_1_d: 'USDOT #3857210 · MC #1425678. Cobertura total de carga y responsabilidad en cada mudanza.',
      why_2_t: 'Equipos experimentados',
      why_2_d: 'Cada líder tiene 5+ años en el camino. Verificados, uniformados y capacitados en casa.',
      why_3_t: 'Empaque seguro',
      why_3_d: 'Cajas de doble pared, cajones personalizados para objetos frágiles, acolchado en cada mueble.',
      why_4_t: 'Entrega puntual',
      why_4_d: 'El 97% de las mudanzas llegan dentro del horario programado. Si llegamos tarde, recibes un crédito.',
      why_5_t: 'Cliente primero',
      why_5_d: 'Un coordinador dedicado desde la cotización hasta el desempaque. Personas reales, sin call centers.',
      why_6_t: 'Precios transparentes',
      why_6_d: 'Solo estimados vinculantes. Lo que te cotizamos es lo que pagas — sin sorpresas al entregar.',
      tm_kicker: 'De nuestros clientes',
      tm_h2: 'Mudanzas reales, reseñas reales',
      tm_sub: 'Reseñas verificadas de clientes por todo el país.',
      tm_1_q: '"Nos mudamos de Brooklyn a Austin en junio. El equipo llegó temprano, empacó todo y entregó dos días antes. El precio coincidió exactamente con la cotización."',
      tm_2_q: '"Tenía un piano vertical de los años 20 y mucha ansiedad. Estos chicos lo embalaron a medida en mi apartamento y llegó a Chicago sin un rasguño. Profesionales."',
      tm_3_q: '"La cotización por chat fue sorprendentemente rápida. Había llamado a otras tres empresas — Metro fue la única que me dio un número real sin presión. Los contraté el mismo día."',
      tm_4_q: '"Casa de cuatro habitaciones, 1,800 millas, dos perros y muchas escaleras. El equipo fue paciente, profesional y el coordinador me envió actualizaciones todo el camino."',
      tm_5_q: '"Mudamos a mi madre de su cooperativa en el Bronx después de 40 años. El equipo fue amable, cuidadoso y realmente se preocupó. No puedo recomendarlos lo suficiente."',
      about_kicker: 'Sobre Metro Relocators',
      about_h2: 'Con base en Nueva York. Creada para el largo recorrido.',
      about_p1: 'Metro Relocators fue fundada en 2011 por tres ex conductores de larga distancia cansados de ver cómo intermediarios maltrataban las pertenencias de los clientes. Operamos nuestra propia flota desde Long Island City, contratamos a nuestros equipos directamente y nos especializamos en una sola cosa: llevar a los neoyorquinos a su próximo capítulo sin nada roto y sin nada oculto en la factura.',
      about_p2: 'Hoy somos una de las empresas de mudanzas interestatales mejor calificadas de la Costa Este, con la confianza de familias, trabajadores remotos y reubicaciones corporativas en los 50 estados.',
      about_s1: 'Fundada',
      about_s2: 'Miembros del equipo',
      about_s3: 'Camiones en flota',
      cta_h2: 'Obtén tu cotización gratuita hoy',
      cta_p: 'Precios transparentes. Sin compromiso. Un estimado real en menos de dos minutos.',
      cta_btn: 'Comenzar mi cotización',
      contact_kicker: 'Contacto',
      contact_h2: 'Habla con un mudador real',
      contact_p: 'Llámanos, escríbenos o envía un mensaje. Un coordinador te contactará dentro de una hora hábil.',
      contact_phone_lbl: 'Teléfono',
      contact_email_lbl: 'Correo',
      contact_area_lbl: 'Área de servicio',
      contact_area_val: 'Con sede en Nueva York · Mudanzas interestatales a los 50 estados',
      contact_hours_lbl: 'Horario',
      contact_hours_val: 'Lun–Sáb 7:00 – 21:00 ET · Dom 9:00 – 17:00',
      form_title: 'Envíanos un mensaje',
      form_name_lbl: 'Nombre completo',
      form_name_ph: 'Juana Pérez',
      form_phone_lbl: 'Teléfono',
      form_phone_ph: '(555) 010-1234',
      form_email_lbl: 'Correo',
      form_email_ph: 'tu@ejemplo.com',
      form_msg_lbl: '¿Cómo podemos ayudarte?',
      form_msg_ph: 'Cuéntanos sobre tu mudanza…',
      form_submit: 'Enviar mensaje',
      form_sending: 'Enviando…',
      form_err_fields: 'Por favor completa nombre, teléfono y correo.',
      form_err_email: 'Por favor ingresa un correo válido.',
      form_thanks: '¡Gracias! Un coordinador te contactará dentro de una hora hábil.',
      form_toast_ok: '¡Mensaje enviado. Hablamos pronto!',
      footer_about: 'Empresa de mudanzas interestatales con licencia y sede en Long Island City, Nueva York. USDOT #3857210 · MC #1425678.',
      footer_services_h: 'Servicios',
      footer_svc_1: 'Mudanzas interestatales',
      footer_svc_2: 'Mudanzas de apartamentos',
      footer_svc_3: 'Empaque y desempaque',
      footer_svc_4: 'Artículos especiales',
      footer_company_h: 'Empresa',
      footer_why: 'Por qué elegirnos',
      footer_touch_h: 'Mantente en contacto',
      footer_addr: 'Long Island City, NY 11101',
      footer_rights: '© {year} Metro Relocators LLC. Todos los derechos reservados.',
      footer_legal: 'Privacidad · Términos · Licencias',
      locale: 'es-ES',
      currency_prefix: '$',
      currency_suffix: ''
    },

    ru: {
      meta_title: 'Metro Relocators — Надёжные междуштатные переезды из Нью-Йорка',
      meta_desc: 'Лицензированная и застрахованная компания междуштатных переездов из Нью-Йорка. Бережное обращение, доставка в срок, бесплатный расчёт за минуты.',
      logo_sub: 'Нью-Йорк · Междуштатные переезды',
      nav_services: 'Услуги',
      nav_how: 'Как это работает',
      nav_why: 'Почему мы',
      nav_reviews: 'Отзывы',
      nav_contact: 'Контакты',
      phone_aria: 'Позвоните нам 1 800 555 0199',
      cta_free_quote: 'Бесплатный расчёт',
      cta_see_how: 'Как это работает',
      hero_img_alt: 'Профессиональные грузчики загружают мебель в переездной грузовик у нью-йоркского браунстоуна',
      hero_eyebrow: 'Лицензия · Страховка · USDOT #3857210',
      hero_h1: 'Надёжные междуштатные переезды <span class="accent">из Нью-Йорка</span>',
      hero_lead: 'Аккуратные руки, честные цены, доставка в срок во все 50 штатов. Реальный расчёт за 2 минуты — без бесконечных звонков и давления.',
      stat_moves: 'Завершённых переездов',
      stat_rating: 'Оценка клиентов',
      stat_states: 'Штатов в зоне работы',
      trust_1: 'Лицензия и страховка',
      trust_2: 'Сертификация AMSA ProMover',
      trust_3: 'Гарантия срока',
      trust_4: 'Поддержка 24/7',
      trust_5: 'Прозрачные фиксированные цены',
      services_kicker: 'Что мы перевозим',
      services_h2: 'Услуги для переездов на дальние расстояния',
      services_sub: 'От студии в Бруклине до пятикомнатного дома в Майами — мы ведём процесс от начала до конца.',
      svc_inter_t: 'Междуштатные переезды',
      svc_inter_d: 'Из Нью-Йорка в Чикаго, Флориду, Техас, Калифорнию — выделенные маршруты по всей материковой части США с GPS-трекингом грузовиков.',
      svc_res_t: 'Переезды квартир и домов',
      svc_res_d: 'Студии, уолк-апы, высотки и семейные дома. Защита полов, обивка дверей, застрахованная бригада, соблюдающая правила здания.',
      svc_pack_t: 'Упаковка и распаковка',
      svc_pack_d: 'Полный сервис упаковки: двухслойный картон, пузырчатая плёнка, индивидуальные ящики. Подписываем каждую коробку и распаковываем на месте.',
      svc_spec_t: 'Перевозка особых предметов',
      svc_spec_d: 'Пианино, антиквариат, предметы искусства, статуи, большие телевизоры, сейфы и крупногабаритная мебель — в ящиках, закреплены, с руками специалистов.',
      how_kicker: 'Простой процесс',
      how_h2: 'Четыре шага от коробок до нового дома',
      how_sub: 'Никаких 30-минутных звонков. Никаких скрытых платежей. Наш расчёт построен вокруг того, как люди реально переезжают.',
      how_s1_t: 'Запросите расчёт',
      how_s1_d: 'Откройте чат ниже и скажите, откуда и куда вы переезжаете.',
      how_s2_t: 'Ответьте на пару вопросов',
      how_s2_d: 'Размер дома, дата, инвентарь, особые предметы — занимает около 90 секунд.',
      how_s3_t: 'Получите оценку',
      how_s3_d: 'Прозрачный детализированный диапазон цен по реальному километражу и объёму.',
      how_s4_t: 'Запланируйте переезд',
      how_s4_d: 'Фиксируете дату, знакомитесь с бригадиром — дальше наша работа.',
      how_cta: 'Начать расчёт',
      how_badge: 'Среднее время расчёта: <strong>1 мин 48 с</strong>',
      quote_kicker: 'Моментальный расчёт',
      quote_h2: 'Чат с нашим ассистентом',
      quote_sub: 'Ответьте на пять быстрых вопросов — мы рассчитаем честную оценку, и с вами свяжется живой координатор.',
      chat_title: 'Ассистент переезда',
      chat_status: 'Онлайн · отвечает мгновенно',
      chat_bot_from: 'Привет! Я ваш ассистент по переезду. Давайте быстро рассчитаем стоимость. Сначала — из какого города переезжаете?',
      chat_bot_to: 'Понял. А куда направляетесь?',
      chat_bot_date: 'Когда планируете переезд?',
      chat_bot_home: 'Из какого типа жилья переезжаете?',
      chat_bot_items: 'Есть особые предметы, о которых стоит знать? Выберите всё, что подходит.',
      chat_ph_from: 'Улица, город, штат (напр. 145 W 32nd St, New York, NY)',
      chat_ph_to: 'Улица, город, штат',
      chat_ph_date: 'Выберите дату',
      chat_today: 'Сегодня',
      chat_searching: 'Ищу адреса…',
      chat_home_studio: 'Студия',
      chat_home_1br: '1 спальня',
      chat_home_2br: '2 спальни',
      chat_home_3br: '3 спальни',
      chat_home_house: 'Дом (4+ спален)',
      chat_item_piano: 'Пианино',
      chat_item_antiques: 'Антиквариат',
      chat_item_art: 'Предметы искусства',
      chat_item_gym: 'Тренажёры',
      chat_item_safe: 'Сейф / тяжёлое',
      chat_item_fragile: 'Много хрупкого',
      chat_item_none: 'Ничего из этого',
      chat_send: 'Отправить',
      chat_confirm: 'Подтвердить',
      chat_crunching: 'Считаю по километражу, объёму и особым предметам…',
      chat_estimate_h: 'Оценка стоимости переезда',
      chat_estimate_disc: 'Обязывающая оценка · включает работу, грузовик и стандартные упаковочные материалы',
      chat_estimate_route: 'Маршрут',
      chat_estimate_date: 'Дата переезда',
      chat_estimate_home: 'Размер жилья',
      chat_estimate_specialty: 'Особые предметы',
      chat_estimate_none: 'Нет',
      chat_lead_intro: 'Выглядит хорошо? Оставьте контакты — зафиксирую цену и свяжу вас с живым координатором.',
      chat_lead_name: 'Полное имя',
      chat_lead_phone: 'Номер телефона',
      chat_lead_email: 'Электронная почта',
      chat_lead_submit: 'Получить расчёт',
      chat_lead_saving: 'Сохраняю…',
      chat_lead_locked: '✓ Ваш расчёт зафиксирован. Координатор свяжется в течение 1 рабочего часа.',
      chat_lead_thanks: 'Спасибо, {name}! Ваш расчёт зафиксирован. Координатор позвонит на {phone} в течение ближайшего рабочего часа, чтобы согласовать осмотр. Копия оценки отправлена на {email}.',
      chat_toast_submitted: 'Расчёт отправлен — скоро свяжемся!',
      chat_err_origin: 'Укажите город отправления.',
      chat_err_dest: 'Укажите город назначения.',
      chat_err_date: 'Выберите дату переезда.',
      chat_err_pick: 'Выберите хотя бы один вариант (или «Ничего из этого»).',
      chat_err_form: 'Заполните все поля.',
      chat_err_email: 'Укажите корректный email.',
      why_kicker: 'Почему выбирают нас',
      why_h2: 'Построено на доверии, завершено в срок',
      why_1_t: 'Лицензия и страховка',
      why_1_d: 'USDOT #3857210 · MC #1425678. Полное покрытие груза и ответственности на каждом переезде.',
      why_2_t: 'Опытные бригады',
      why_2_d: 'У каждого бригадира 5+ лет стажа. Проверенные, в форме, обученные внутри компании.',
      why_3_t: 'Безопасная упаковка',
      why_3_d: 'Двухслойные коробки, индивидуальные ящики для хрупкого, мебельные покрывала на каждом предмете.',
      why_4_t: 'Доставка в срок',
      why_4_d: '97% междуштатных переездов прибывают в запланированное окно. Если мы опоздали — вы получаете компенсацию.',
      why_5_t: 'Клиент на первом месте',
      why_5_d: 'Персональный координатор от расчёта до распаковки. Живые люди, а не колл-центр.',
      why_6_t: 'Прозрачные цены',
      why_6_d: 'Только обязывающие оценки. Сколько назвали — столько и заплатите. Без сюрпризов.',
      tm_kicker: 'От наших клиентов',
      tm_h2: 'Настоящие переезды, настоящие отзывы',
      tm_sub: 'Проверенные отзывы клиентов по всей стране.',
      tm_1_q: '«Переехали из Бруклина в Остин в июне. Бригада приехала раньше, всё упаковали и доставили на два дня раньше срока. Цена совпала с расчётом один в один.»',
      tm_2_q: '«У меня было пианино 1920-х и много тревог. Ребята сделали индивидуальный ящик прямо в квартире, оно приехало в Чикаго без единой царапины. Профи.»',
      tm_3_q: '«Расчёт в чате оказался шокирующе быстрым. Я звонила в три других компании — Metro единственные дали реальную цифру без давления. Забронировала в тот же день.»',
      tm_4_q: '«Четырёхкомнатный дом, 1800 миль, две собаки и много ступенек. Бригада была терпеливой, профессиональной, координатор держал в курсе всю дорогу.»',
      tm_5_q: '«Переезжали мою маму из её квартиры в Бронксе после 40 лет. Команда была доброй, аккуратной и искренне заботливой. Рекомендую от всей души.»',
      about_kicker: 'О Metro Relocators',
      about_h2: 'Из Нью-Йорка. Созданы для дальних расстояний.',
      about_p1: 'Metro Relocators основана в 2011 году тремя бывшими водителями-дальнобойщиками, уставшими смотреть, как посредники повреждают вещи клиентов. Мы управляем собственным автопарком в Лонг-Айленд-Сити, сами нанимаем бригады и специализируемся на одном: доставить ньюйоркцев к следующей главе жизни без поломок и без скрытых платежей.',
      about_p2: 'Сегодня мы один из самых высокооценённых перевозчиков Восточного побережья — нам доверяют семьи, удалёнщики и корпоративные переезды во всех 50 штатах.',
      about_s1: 'Основано',
      about_s2: 'Человек в команде',
      about_s3: 'Грузовиков в парке',
      cta_h2: 'Получите бесплатный расчёт сегодня',
      cta_p: 'Прозрачные цены. Без обязательств. Реальная оценка менее чем за две минуты.',
      cta_btn: 'Начать бесплатный расчёт',
      contact_kicker: 'Контакты',
      contact_h2: 'Поговорите с живым перевозчиком',
      contact_p: 'Позвоните, напишите или отправьте сообщение. Координатор ответит в течение одного рабочего часа.',
      contact_phone_lbl: 'Телефон',
      contact_email_lbl: 'Эл. почта',
      contact_area_lbl: 'География',
      contact_area_val: 'База в Нью-Йорке · Междуштатные переезды во все 50 штатов',
      contact_hours_lbl: 'Часы работы',
      contact_hours_val: 'Пн–Сб 7:00 – 21:00 ET · Вс 9:00 – 17:00',
      form_title: 'Напишите нам',
      form_name_lbl: 'Полное имя',
      form_name_ph: 'Иван Петров',
      form_phone_lbl: 'Телефон',
      form_phone_ph: '(555) 010-1234',
      form_email_lbl: 'Эл. почта',
      form_email_ph: 'you@example.com',
      form_msg_lbl: 'Чем можем помочь?',
      form_msg_ph: 'Расскажите о переезде…',
      form_submit: 'Отправить сообщение',
      form_sending: 'Отправка…',
      form_err_fields: 'Заполните имя, телефон и эл. почту.',
      form_err_email: 'Укажите корректный email.',
      form_thanks: 'Спасибо! Координатор свяжется в течение одного рабочего часа.',
      form_toast_ok: 'Сообщение отправлено. До связи!',
      footer_about: 'Лицензированная компания междуштатных переездов со штаб-квартирой в Лонг-Айленд-Сити, Нью-Йорк. USDOT #3857210 · MC #1425678.',
      footer_services_h: 'Услуги',
      footer_svc_1: 'Междуштатные переезды',
      footer_svc_2: 'Переезды квартир',
      footer_svc_3: 'Упаковка и распаковка',
      footer_svc_4: 'Особые предметы',
      footer_company_h: 'Компания',
      footer_why: 'Почему выбирают нас',
      footer_touch_h: 'Связаться',
      footer_addr: 'Лонг-Айленд-Сити, NY 11101',
      footer_rights: '© {year} Metro Relocators LLC. Все права защищены.',
      footer_legal: 'Конфиденциальность · Условия · Лицензии',
      locale: 'ru-RU',
      currency_prefix: '$',
      currency_suffix: ''
    }
  };

  /* ---------- City autocomplete dataset ---------- */
  const CITIES = [
    // NY metro (priority for NY-based mover)
    'Brooklyn, NY','Manhattan, NY','Queens, NY','Bronx, NY','Staten Island, NY',
    'Long Island City, NY','Astoria, NY','Williamsburg, NY','Harlem, NY','Flushing, NY',
    'Yonkers, NY','New Rochelle, NY','White Plains, NY','Mount Vernon, NY',
    'Buffalo, NY','Rochester, NY','Syracuse, NY','Albany, NY','Schenectady, NY',
    'Jersey City, NJ','Hoboken, NJ','Newark, NJ','Paterson, NJ','Elizabeth, NJ','Edison, NJ',
    'Stamford, CT','New Haven, CT','Hartford, CT','Bridgeport, CT',
    // Top US cities
    'New York, NY','Los Angeles, CA','Chicago, IL','Houston, TX','Phoenix, AZ',
    'Philadelphia, PA','San Antonio, TX','San Diego, CA','Dallas, TX','Austin, TX',
    'Jacksonville, FL','Fort Worth, TX','Columbus, OH','Indianapolis, IN','Charlotte, NC',
    'San Francisco, CA','Seattle, WA','Denver, CO','Washington, DC','Nashville, TN',
    'Oklahoma City, OK','El Paso, TX','Boston, MA','Portland, OR','Las Vegas, NV',
    'Detroit, MI','Memphis, TN','Louisville, KY','Baltimore, MD','Milwaukee, WI',
    'Albuquerque, NM','Tucson, AZ','Fresno, CA','Sacramento, CA','Kansas City, MO',
    'Mesa, AZ','Atlanta, GA','Omaha, NE','Colorado Springs, CO','Raleigh, NC',
    'Miami, FL','Virginia Beach, VA','Oakland, CA','Minneapolis, MN','Tulsa, OK',
    'Arlington, TX','Tampa, FL','New Orleans, LA','Wichita, KS','Cleveland, OH',
    'Bakersfield, CA','Aurora, CO','Anaheim, CA','Honolulu, HI','Santa Ana, CA',
    'Riverside, CA','Corpus Christi, TX','Lexington, KY','Henderson, NV','Stockton, CA',
    'Saint Paul, MN','Cincinnati, OH','St. Louis, MO','Pittsburgh, PA','Greensboro, NC',
    'Lincoln, NE','Anchorage, AK','Plano, TX','Orlando, FL','Irvine, CA',
    'Toledo, OH','Durham, NC','Chula Vista, CA','Fort Wayne, IN','St. Petersburg, FL',
    'Laredo, TX','Madison, WI','Chandler, AZ','Lubbock, TX','Scottsdale, AZ',
    'Reno, NV','Glendale, AZ','Gilbert, AZ','Winston-Salem, NC','North Las Vegas, NV',
    'Norfolk, VA','Chesapeake, VA','Garland, TX','Irving, TX','Hialeah, FL',
    'Fremont, CA','Boise, ID','Richmond, VA','Baton Rouge, LA','Spokane, WA',
    'Des Moines, IA','Tacoma, WA','San Bernardino, CA','Modesto, CA','Fontana, CA',
    'Santa Clarita, CA','Birmingham, AL','Oxnard, CA','Fayetteville, NC','Moreno Valley, CA',
    'Glendale, CA','Huntington Beach, CA','Salt Lake City, UT','Grand Rapids, MI','Amarillo, TX',
    'Aurora, IL','Montgomery, AL','Akron, OH','Little Rock, AR','Huntsville, AL',
    'Augusta, GA','Port St. Lucie, FL','Grand Prairie, TX','Columbus, GA','Tallahassee, FL',
    'Overland Park, KS','Tempe, AZ','McKinney, TX','Mobile, AL','Cape Coral, FL',
    'Shreveport, LA','Frisco, TX','Knoxville, TN','Worcester, MA','Brownsville, TX',
    'Vancouver, WA','Fort Lauderdale, FL','Sioux Falls, SD','Ontario, CA','Chattanooga, TN',
    'Providence, RI','Newport News, VA','Rancho Cucamonga, CA','Santa Rosa, CA','Peoria, AZ',
    'Oceanside, CA','Elk Grove, CA','Salem, OR','Pembroke Pines, FL','Eugene, OR',
    'Garden Grove, CA','Cary, NC','Fort Collins, CO','Corona, CA','Springfield, MO',
    'Jackson, MS','Alexandria, VA','Hayward, CA','Clarksville, TN','Lakewood, CO',
    'Lancaster, CA','Salinas, CA','Palmdale, CA','Hollywood, FL','Springfield, MA',
    'Macon, GA','Kansas City, KS','Sunnyvale, CA','Pomona, CA','Killeen, TX',
    'Escondido, CA','Pasadena, TX','Naperville, IL','Bellevue, WA','Joliet, IL',
    'Murfreesboro, TN','Midland, TX','Rockford, IL','Savannah, GA','Torrance, CA',
    'McAllen, TX','Surprise, AZ','Denton, TX','Roseville, CA','Thornton, CO',
    'Miramar, FL','Pasadena, CA','Mesquite, TX','Olathe, KS','Dayton, OH',
    'Carrollton, TX','Waco, TX','Orange, CA','Fullerton, CA','Charleston, SC',
    'West Valley City, UT','Visalia, CA','Hampton, VA','Gainesville, FL','Warren, MI',
    'Coral Springs, FL','Cedar Rapids, IA','Round Rock, TX','Sterling Heights, MI','Kent, WA',
    'Columbia, SC','Santa Clara, CA','Concord, CA','Athens, GA','Thousand Oaks, CA',
    'Lafayette, LA','Simi Valley, CA','Topeka, KS','Norman, OK','Fargo, ND',
    'Wilmington, NC','Abilene, TX','Odessa, TX','Columbia, MO','Pearland, TX',
    'Victorville, CA','Hartford, CT','Berkeley, CA','Arlington, VA','Palo Alto, CA'
  ];

  const searchCities = (query) => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const starts = [], contains = [];
    for (const c of CITIES) {
      const cL = c.toLowerCase();
      if (cL.startsWith(q)) starts.push(c);
      else if (cL.includes(q)) contains.push(c);
      if (starts.length >= 8) break;
    }
    return [...starts, ...contains].slice(0, 6);
  };

  const STATE_ABBR = {
    'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA',
    'Colorado':'CO','Connecticut':'CT','Delaware':'DE','District of Columbia':'DC',
    'Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID','Illinois':'IL',
    'Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA',
    'Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN',
    'Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV',
    'New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY',
    'North Carolina':'NC','North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR',
    'Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD',
    'Tennessee':'TN','Texas':'TX','Utah':'UT','Vermont':'VT','Virginia':'VA',
    'Washington':'WA','West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY'
  };

  const formatAddress = (a) => {
    if (!a) return '';
    const street = [a.house_number, a.road || a.pedestrian || a.footway].filter(Boolean).join(' ');
    const city = a.city || a.town || a.village || a.suburb || a.borough || a.neighbourhood || a.municipality || '';
    const state = STATE_ABBR[a.state] || a.state || '';
    const zip = a.postcode || '';
    const tail = [state, zip].filter(Boolean).join(' ');
    return [street, city, tail].filter(Boolean).join(', ');
  };

  const searchAddresses = async (query, signal) => {
    const q = query.trim();
    if (q.length < 3) return [];
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=us&limit=6&q=${encodeURIComponent(q)}`;
    try {
      const res = await fetch(url, { signal, headers: { 'Accept-Language': 'en' } });
      if (!res.ok) throw new Error('net');
      const data = await res.json();
      const results = data
        .map(r => ({ display: formatAddress(r.address), raw: r }))
        .filter(x => x.display && x.display.length > 2);
      // de-dupe by display
      const seen = new Set();
      return results.filter(r => {
        if (seen.has(r.display)) return false;
        seen.add(r.display);
        return true;
      });
    } catch (e) {
      if (e.name === 'AbortError') return null;
      return null;
    }
  };

  const SUPPORTED = ['en', 'es', 'ru'];
  let currentLang = 'en';

  const detectLang = () => {
    try {
      const saved = localStorage.getItem('mr_lang');
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) {}
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : 'en';
  };

  const t = (key, vars) => {
    const dict = I18N[currentLang] || I18N.en;
    let str = dict[key] != null ? dict[key] : (I18N.en[key] != null ? I18N.en[key] : key);
    if (vars) {
      Object.keys(vars).forEach(k => {
        str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
      });
    }
    return str;
  };

  const applyLang = (lang) => {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    currentLang = lang;
    try { localStorage.setItem('mr_lang', lang); } catch (_) {}
    document.documentElement.lang = lang;

    const year = new Date().getFullYear();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      let value = t(key);
      if (key === 'footer_rights') value = value.replace('{year}', year);
      if (attr) el.setAttribute(attr, value);
      else el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      let value = t(key);
      if (key === 'footer_rights') value = value.replace('{year}', year);
      el.innerHTML = value;
    });

    const langCode = $('#langCode');
    if (langCode) langCode.textContent = lang.toUpperCase();

    $$('#langMenu [data-lang]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  };

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = $('.site-header');
  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const menuToggle = $('#menuToggle');
  const mobileNav = $('#mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Language switcher ---------- */
  const langSwitcher = $('#langSwitcher');
  const langBtn = $('#langBtn');
  const langMenu = $('#langMenu');
  if (langSwitcher && langBtn && langMenu) {
    const closeMenu = () => {
      langSwitcher.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    };
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = langSwitcher.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', String(open));
    });
    langMenu.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      const lang = btn.getAttribute('data-lang');
      applyLang(lang);
      closeMenu();
    });
    document.addEventListener('click', (e) => {
      if (!langSwitcher.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = (msg, type = '') => {
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
  };

  /* ---------- Contact form ---------- */
  const contactForm = $('#contactForm');
  const contactNote = $('#contactNote');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm).entries());
      if (!data.name || !data.phone || !data.email) {
        contactNote.textContent = t('form_err_fields');
        contactNote.className = 'form-note err';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        contactNote.textContent = t('form_err_email');
        contactNote.className = 'form-note err';
        return;
      }
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = t('form_sending');
      await sleep(800);
      btn.disabled = false;
      btn.textContent = t('form_submit');
      contactForm.reset();
      contactNote.textContent = t('form_thanks');
      contactNote.className = 'form-note ok';
      showToast(t('form_toast_ok'), 'ok');
    });
  }

  /* ===================================================
     QUOTE CHAT
     =================================================== */

  const chatBody = $('#chatBody');
  const chatInputWrap = $('#chatInputWrap');
  const chatProgress = $('#chatProgress');

  /* Step config — text keys resolved at render time via t() */
  const steps = [
    { key: 'from', botKey: 'chat_bot_from', type: 'text', placeholderKey: 'chat_ph_from', autocomplete: 'address',
      validate: v => v.trim().length >= 2 || t('chat_err_origin') },
    { key: 'to', botKey: 'chat_bot_to', type: 'text', placeholderKey: 'chat_ph_to', autocomplete: 'address',
      validate: v => v.trim().length >= 2 || t('chat_err_dest') },
    { key: 'date', botKey: 'chat_bot_date', type: 'date',
      validate: v => !!v || t('chat_err_date') },
    { key: 'home', botKey: 'chat_bot_home', type: 'options',
      options: [
        { labelKey: 'chat_home_studio', value: 'studio', base: 2200 },
        { labelKey: 'chat_home_1br',    value: '1br',    base: 2800 },
        { labelKey: 'chat_home_2br',    value: '2br',    base: 3800 },
        { labelKey: 'chat_home_3br',    value: '3br',    base: 4800 },
        { labelKey: 'chat_home_house',  value: 'house',  base: 6800 }
      ]
    },
    { key: 'items', botKey: 'chat_bot_items', type: 'multi',
      options: [
        { labelKey: 'chat_item_piano',    value: 'piano',    add: 650 },
        { labelKey: 'chat_item_antiques', value: 'antiques', add: 350 },
        { labelKey: 'chat_item_art',      value: 'art',      add: 300 },
        { labelKey: 'chat_item_gym',      value: 'gym',      add: 400 },
        { labelKey: 'chat_item_safe',     value: 'safe',     add: 450 },
        { labelKey: 'chat_item_fragile',  value: 'fragile',  add: 250 },
        { labelKey: 'chat_item_none',     value: 'none',     add: 0 }
      ]
    }
  ];

  const answers = {};
  let stepIdx = 0;

  /* Rendering ---------------------- */
  const addBotMsg = async (text, delay = 600) => {
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
    await sleep(delay);
    typing.remove();
    const msg = document.createElement('div');
    msg.className = 'msg bot';
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const addUserMsg = (text) => {
    const msg = document.createElement('div');
    msg.className = 'msg user';
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const setProgress = (pct) => {
    if (chatProgress) chatProgress.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  };

  const clearInput = () => { chatInputWrap.innerHTML = ''; chatInputWrap.classList.remove('empty'); };

  const fmtDate = (v) => {
    if (!v) return '—';
    const loc = (I18N[currentLang] && I18N[currentLang].locale) || 'en-US';
    return new Date(v).toLocaleDateString(loc, { month: 'long', day: 'numeric', year: 'numeric' });
  };

  /* Input renderers ---------------------- */
  const attachAddressAutocomplete = (input, wrap) => {
    const sugg = document.createElement('ul');
    sugg.className = 'chat-suggestions';
    sugg.setAttribute('role', 'listbox');
    wrap.appendChild(sugg);

    let current = [];
    let activeIdx = -1;
    let debounceT = null;
    let controller = null;
    let loading = false;

    const hl = (s, q) => {
      if (!q) return s;
      const i = s.toLowerCase().indexOf(q.toLowerCase());
      if (i < 0) return s;
      return s.slice(0, i) + '<mark>' + s.slice(i, i + q.length) + '</mark>' + s.slice(i + q.length);
    };

    const splitDisplay = (d) => {
      const parts = d.split(', ');
      if (parts.length <= 1) return { primary: d, secondary: '' };
      return { primary: parts[0], secondary: parts.slice(1).join(', ') };
    };

    const render = () => {
      sugg.innerHTML = '';
      const q = input.value.trim();

      if (loading) {
        const li = document.createElement('li');
        li.className = 'chat-suggestion sugg-loading';
        li.innerHTML = `<span class="sugg-spinner" aria-hidden="true"></span><span class="sugg-text"><span class="sugg-name">${t('chat_searching')}</span></span>`;
        sugg.appendChild(li);
        sugg.classList.add('open');
        return;
      }

      if (!current.length) {
        sugg.classList.remove('open');
        return;
      }

      current.forEach((item, i) => {
        const { primary, secondary } = splitDisplay(item.display);
        const li = document.createElement('li');
        li.className = 'chat-suggestion' + (i === activeIdx ? ' active' : '');
        li.setAttribute('role', 'option');
        li.innerHTML = `
          <svg class="sugg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span class="sugg-text">
            <span class="sugg-name">${hl(primary, q)}</span>
            ${secondary ? `<span class="sugg-sub">${secondary}</span>` : ''}
          </span>
        `;
        li.addEventListener('mousedown', (e) => { e.preventDefault(); pick(item.display); });
        sugg.appendChild(li);
      });
      sugg.classList.add('open');
    };

    const pick = (value) => {
      input.value = value;
      current = [];
      activeIdx = -1;
      loading = false;
      if (controller) { controller.abort(); controller = null; }
      sugg.classList.remove('open');
      input.focus();
    };

    const runSearch = async (q) => {
      if (controller) controller.abort();
      controller = new AbortController();
      const signal = controller.signal;
      loading = true;
      render();
      let results = await searchAddresses(q, signal);
      if (signal.aborted) return;
      if (results === null) {
        results = searchCities(q).map(c => ({ display: c, raw: null }));
      }
      current = results;
      activeIdx = -1;
      loading = false;
      render();
    };

    input.addEventListener('input', () => {
      const q = input.value.trim();
      if (debounceT) { clearTimeout(debounceT); debounceT = null; }
      if (q.length < 3) {
        if (controller) { controller.abort(); controller = null; }
        loading = false;
        current = searchCities(q).map(c => ({ display: c, raw: null }));
        activeIdx = -1;
        render();
        return;
      }
      debounceT = setTimeout(() => runSearch(q), 350);
    });

    input.addEventListener('keydown', (e) => {
      if (loading || !current.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = (activeIdx + 1) % current.length;
        render();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = (activeIdx - 1 + current.length) % current.length;
        render();
      } else if (e.key === 'Enter' && activeIdx >= 0) {
        e.preventDefault();
        pick(current[activeIdx].display);
      } else if (e.key === 'Escape') {
        current = [];
        activeIdx = -1;
        render();
      }
    });

    input.addEventListener('blur', () => {
      setTimeout(() => { sugg.classList.remove('open'); }, 140);
    });
    input.addEventListener('focus', () => {
      if (current.length || loading) sugg.classList.add('open');
    });
  };

  const attachDatePicker = (input, wrap) => {
    input.setAttribute('readonly', '');
    wrap.classList.add('has-datepicker');

    const cal = document.createElement('div');
    cal.className = 'chat-datepicker';
    wrap.appendChild(cal);

    const today = new Date(); today.setHours(0, 0, 0, 0);
    let viewMonth = today.getMonth();
    let viewYear = today.getFullYear();

    const pad = (n) => String(n).padStart(2, '0');
    const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    const monthTitle = (y, m) => {
      const loc = (I18N[currentLang] && I18N[currentLang].locale) || 'en-US';
      const s = new Date(y, m, 1).toLocaleDateString(loc, { month: 'long', year: 'numeric' });
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const weekdays = () => {
      const loc = (I18N[currentLang] && I18N[currentLang].locale) || 'en-US';
      // Jan 1 2024 = Monday; produce Mon..Sun
      const arr = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(2024, 0, 1 + i);
        arr.push(d.toLocaleDateString(loc, { weekday: 'short' }));
      }
      return arr;
    };

    const render = () => {
      const first = new Date(viewYear, viewMonth, 1);
      const firstDow = (first.getDay() + 6) % 7; // Monday-first
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      const prevDays = new Date(viewYear, viewMonth, 0).getDate();
      const selected = input.dataset.iso || '';

      let cells = '';
      for (let i = firstDow - 1; i >= 0; i--) {
        cells += `<button type="button" class="cal-day out" disabled>${prevDays - i}</button>`;
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const dt = new Date(viewYear, viewMonth, d); dt.setHours(0, 0, 0, 0);
        const iso = toISO(dt);
        const isPast = dt < today;
        const isToday = dt.getTime() === today.getTime();
        const isSel = iso === selected;
        const cls = ['cal-day'];
        if (isPast) cls.push('past');
        if (isToday) cls.push('today');
        if (isSel) cls.push('sel');
        cells += `<button type="button" class="${cls.join(' ')}" data-iso="${iso}" ${isPast ? 'disabled' : ''}>${d}</button>`;
      }
      const total = firstDow + daysInMonth;
      const trailing = (7 - (total % 7)) % 7;
      for (let i = 1; i <= trailing; i++) {
        cells += `<button type="button" class="cal-day out" disabled>${i}</button>`;
      }

      const wd = weekdays().map(w => `<span class="cal-wd">${w}</span>`).join('');

      cal.innerHTML = `
        <div class="cal-head">
          <button type="button" class="cal-nav" data-nav="-1" aria-label="Prev">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span class="cal-title">${monthTitle(viewYear, viewMonth)}</span>
          <button type="button" class="cal-nav" data-nav="1" aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
        <div class="cal-wds">${wd}</div>
        <div class="cal-grid">${cells}</div>
        <div class="cal-foot">
          <button type="button" class="cal-today-btn">${t('chat_today')}</button>
        </div>
      `;

      cal.querySelectorAll('[data-nav]').forEach(b => {
        b.addEventListener('mousedown', (e) => {
          e.preventDefault();
          const d = parseInt(b.dataset.nav, 10);
          viewMonth += d;
          if (viewMonth < 0) { viewMonth = 11; viewYear--; }
          if (viewMonth > 11) { viewMonth = 0; viewYear++; }
          render();
        });
      });
      cal.querySelectorAll('.cal-day[data-iso]').forEach(b => {
        b.addEventListener('mousedown', (e) => {
          e.preventDefault();
          const iso = b.dataset.iso;
          input.dataset.iso = iso;
          input.value = fmtDate(iso);
          close();
        });
      });
      cal.querySelector('.cal-today-btn')?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const iso = toISO(today);
        viewMonth = today.getMonth();
        viewYear = today.getFullYear();
        input.dataset.iso = iso;
        input.value = fmtDate(iso);
        close();
      });
    };

    const open = () => { cal.classList.add('open'); render(); };
    const close = () => { cal.classList.remove('open'); };

    input.addEventListener('focus', open);
    input.addEventListener('click', open);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter') { e.preventDefault(); open(); }
    });

    const outside = (e) => { if (!wrap.contains(e.target)) close(); };
    document.addEventListener('mousedown', outside, true);
  };

  const renderTextInput = (step) => {
    clearInput();
    const wrap = document.createElement('form');
    wrap.className = 'chat-field';
    if (step.autocomplete) wrap.classList.add('has-autocomplete');
    const placeholder = step.placeholderKey
      ? t(step.placeholderKey)
      : (step.type === 'date' ? t('chat_ph_date') : '');
    wrap.innerHTML = `
      <input type="text"
             placeholder="${placeholder}"
             autocomplete="off"
             aria-label="${t(step.botKey)}" />
      <button class="send-btn" type="submit">
        <span>${t('chat_send')}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    `;
    chatInputWrap.appendChild(wrap);
    const input = wrap.querySelector('input');
    if (step.autocomplete === 'address' || step.autocomplete === 'city') attachAddressAutocomplete(input, wrap);
    if (step.type === 'date') attachDatePicker(input, wrap);
    setTimeout(() => input.focus(), 50);
    wrap.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = step.type === 'date' ? (input.dataset.iso || '') : input.value.trim();
      const result = step.validate ? step.validate(val) : true;
      if (result !== true) { showToast(result, 'err'); return; }
      const display = step.type === 'date' ? fmtDate(val) : val;
      addUserMsg(display);
      answers[step.key] = val;
      advance();
    });
  };

  const renderOptions = (step) => {
    clearInput();
    step.options.forEach(opt => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt-btn';
      b.textContent = t(opt.labelKey);
      b.addEventListener('click', () => {
        addUserMsg(t(opt.labelKey));
        answers[step.key] = { label: t(opt.labelKey), value: opt.value, base: opt.base };
        advance();
      });
      chatInputWrap.appendChild(b);
    });
  };

  const renderMulti = (step) => {
    clearInput();
    const wrap = document.createElement('div');
    wrap.className = 'multi-wrap';
    const opts = document.createElement('div');
    opts.className = 'multi-options';
    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = 'confirm';
    confirm.textContent = t('chat_confirm');
    const chosen = new Set();
    const noneLabel = t('chat_item_none');

    step.options.forEach(opt => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt-btn';
      b.textContent = t(opt.labelKey);
      b.dataset.value = opt.value;
      b.addEventListener('click', () => {
        if (opt.value === 'none') {
          chosen.clear();
          opts.querySelectorAll('.opt-btn').forEach(x => x.classList.remove('checked'));
          b.classList.add('checked');
          chosen.add(opt.value);
          return;
        }
        const noneBtn = Array.from(opts.querySelectorAll('.opt-btn')).find(x => x.dataset.value === 'none');
        if (noneBtn) noneBtn.classList.remove('checked');
        chosen.delete('none');

        if (chosen.has(opt.value)) {
          chosen.delete(opt.value);
          b.classList.remove('checked');
        } else {
          chosen.add(opt.value);
          b.classList.add('checked');
        }
      });
      opts.appendChild(b);
    });

    confirm.addEventListener('click', () => {
      if (chosen.size === 0) { showToast(t('chat_err_pick'), 'err'); return; }
      const picked = step.options
        .filter(o => chosen.has(o.value))
        .map(o => ({ label: t(o.labelKey), value: o.value, add: o.add }));
      const labels = picked.map(o => o.label).join(', ');
      addUserMsg(labels);
      answers[step.key] = picked;
      advance();
    });

    wrap.appendChild(opts);
    wrap.appendChild(confirm);
    chatInputWrap.appendChild(wrap);
  };

  /* Advance / estimate / lead ---------------------- */
  const advance = async () => {
    stepIdx++;
    setProgress((stepIdx / (steps.length + 1)) * 100);
    if (stepIdx < steps.length) {
      await runStep();
    } else {
      await showEstimate();
    }
  };

  const runStep = async () => {
    const step = steps[stepIdx];
    chatInputWrap.classList.add('empty');
    chatInputWrap.innerHTML = '';
    await addBotMsg(t(step.botKey));
    if (step.type === 'options') renderOptions(step);
    else if (step.type === 'multi') renderMulti(step);
    else renderTextInput(step);
  };

  const calcEstimate = () => {
    const base = (answers.home && answers.home.base) || 3000;
    const itemsAdd = (answers.items || []).reduce((s, o) => s + (o.add || 0), 0);
    const subtotal = base + itemsAdd;
    const low  = Math.round((subtotal * 0.92) / 50) * 50;
    const high = Math.round((subtotal * 1.12) / 50) * 50;
    return { low, high };
  };

  const showEstimate = async () => {
    const { low, high } = calcEstimate();
    const loc = (I18N[currentLang] && I18N[currentLang].locale) || 'en-US';
    const pre = (I18N[currentLang] && I18N[currentLang].currency_prefix) || '$';
    const suf = (I18N[currentLang] && I18N[currentLang].currency_suffix) || '';
    const fmt = n => pre + n.toLocaleString(loc) + suf;
    const route = `${answers.from || '—'} → ${answers.to || '—'}`;
    const dateStr = answers.date ? fmtDate(answers.date) : '—';
    const homeLabel = (answers.home && answers.home.label) || '—';
    const itemsLabel = (answers.items || []).map(o => o.label).join(', ') || t('chat_estimate_none');

    await addBotMsg(t('chat_crunching'), 900);
    await sleep(400);

    const card = document.createElement('div');
    card.className = 'msg quote-card';
    card.innerHTML = `
      <h4>${t('chat_estimate_h')}</h4>
      <div class="price">${fmt(low)} – ${fmt(high)}</div>
      <p style="color: var(--text-3); font-size: 0.9rem;">${t('chat_estimate_disc')}</p>
      <ul>
        <li>📍 ${t('chat_estimate_route')}: <strong></strong></li>
        <li>🗓 ${t('chat_estimate_date')}: <strong></strong></li>
        <li>🏠 ${t('chat_estimate_home')}: <strong></strong></li>
        <li>📦 ${t('chat_estimate_specialty')}: <strong></strong></li>
      </ul>
    `;
    const strongs = card.querySelectorAll('li strong');
    strongs[0].textContent = route;
    strongs[1].textContent = dateStr;
    strongs[2].textContent = homeLabel;
    strongs[3].textContent = itemsLabel;
    chatBody.appendChild(card);
    chatBody.scrollTop = chatBody.scrollHeight;

    await sleep(500);
    await addBotMsg(t('chat_lead_intro'), 700);
    renderLeadForm();
    setProgress(92);
  };

  const renderLeadForm = () => {
    clearInput();
    const form = document.createElement('form');
    form.className = 'lead-form';
    form.innerHTML = `
      <div class="row">
        <input type="text" name="name" placeholder="${t('chat_lead_name')}" autocomplete="name" required />
        <input type="tel" name="phone" placeholder="${t('chat_lead_phone')}" autocomplete="tel" required />
      </div>
      <input type="email" name="email" placeholder="${t('chat_lead_email')}" autocomplete="email" required />
      <button type="submit">${t('chat_lead_submit')}</button>
    `;
    chatInputWrap.appendChild(form);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !data.phone || !data.email) { showToast(t('chat_err_form'), 'err'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showToast(t('chat_err_email'), 'err'); return; }

      const btn = form.querySelector('button');
      btn.disabled = true;
      btn.textContent = t('chat_lead_saving');
      await sleep(900);

      addUserMsg(`${data.name} · ${data.phone} · ${data.email}`);
      chatInputWrap.classList.add('empty');
      chatInputWrap.innerHTML = `<span>${t('chat_lead_locked')}</span>`;
      const firstName = data.name.split(' ')[0];
      await addBotMsg(t('chat_lead_thanks', { name: firstName, phone: data.phone, email: data.email }), 800);
      setProgress(100);
      showToast(t('chat_toast_submitted'), 'ok');
    });
  };

  /* Kickoff ---------------------- */
  const startChat = async () => {
    setProgress(6);
    await addBotMsg(t(steps[0].botKey), 500);
    renderTextInput(steps[0]);
  };

  if (chatBody && chatInputWrap) {
    if ('IntersectionObserver' in window) {
      const chatIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            chatIo.disconnect();
            startChat();
          }
        });
      }, { threshold: 0.2 });
      chatIo.observe(chatBody);
    } else {
      startChat();
    }
  }

  /* ---------- Init lang ---------- */
  applyLang(detectLang());
})();
