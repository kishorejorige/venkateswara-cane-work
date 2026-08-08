export type Language = 'en' | 'te';

export interface TranslationSchema {
  brandName: string;
  brandTelugu: string;
  ownerName: string;
  locationName: string;
  nav: {
    home: string;
    about: string;
    services: string;
    gallery: string;
    howToOrder: string;
    whyUs: string;
    contact: string;
    callNow: string;
  };
  hero: {
    eyebrow: string;
    titleMain: string;
    titleAccent: string;
    description: string;
    callBtn: string;
    whatsappBtn: string;
    trustItems: [string, string, string];
    tagLabel: string;
    tagSub: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    highlight1Title: string;
    highlight1Desc: string;
    highlight2Title: string;
    highlight2Desc: string;
    quote: string;
    statNumber: string;
    statLabel: string;
    authorTitle: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    inquireFor: string;
    chairsTitle: string;
    chairsDesc: string;
    chairsTag: string;
    sofasTitle: string;
    sofasDesc: string;
    sofasTag: string;
    swingsTitle: string;
    swingsDesc: string;
    swingsTag: string;
    repairsTitle: string;
    repairsDesc: string;
    repairsTag: string;
  };
  howToOrder: {
    eyebrow: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    desc: string;
    filterAll: string;
    filterChairs: string;
    filterSwings: string;
    filterSofas: string;
    viewDetails: string;
    handcraftedTag: string;
    inquireArrow: string;
    items: {
      item1Title: string;
      item1Cat: string;
      item1Desc: string;
      item2Title: string;
      item2Cat: string;
      item2Desc: string;
      item3Title: string;
      item3Cat: string;
      item3Desc: string;
    };
  };
  lightbox: {
    close: string;
    prev: string;
    next: string;
    handcrafted: string;
    customSizes: string;
    askWhatsapp: string;
    call: string;
  };
  customCta: {
    eyebrow: string;
    title: string;
    text: string;
    whatsappBtn: string;
    callBtn: string;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    reason1Title: string;
    reason1Desc: string;
    reason2Title: string;
    reason2Desc: string;
    reason3Title: string;
    reason3Desc: string;
    reason4Title: string;
    reason4Desc: string;
    reason5Title: string;
    reason5Desc: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    addressTitle: string;
    proprietorLabel: string;
    phoneTitle: string;
    phoneHours: string;
    waTitle: string;
    waSubtext: string;
    callBtn: string;
    waBtn: string;
    workshopTitle: string;
    locationNote: string;
    locationReqBtn: string;
    getDirectionsBtn: string;
  };
  mobileBar: {
    call: string;
    whatsapp: string;
  };
  whatsappMessages: {
    general: string;
    customCta: string;
    productQuery: (title: string) => string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    directContact: string;
    rights: string;
    birthdayNote: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    brandName: "Venkateswara Cane Work",
    brandTelugu: "వెంకటేశ్వర కేన్ వర్క్",
    ownerName: "Konda Pavan Kumar",
    locationName: "Nellore, Andhra Pradesh",
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      gallery: "Our Work",
      howToOrder: "How to Order",
      whyUs: "Why Us",
      contact: "Contact",
      callNow: "Call Now",
    },
    hero: {
      eyebrow: "HANDCRAFTED IN NELLORE",
      titleMain: "Beautiful Cane Furniture,",
      titleAccent: "Made With Care.",
      description: "Traditional handcrafted cane furniture, custom designs, repairs and restoration in Nellore.",
      callBtn: "Call 9966232996",
      whatsappBtn: "WhatsApp Us",
      trustItems: ["Handmade", "Custom Designs", "Repair & Restoration"],
      tagLabel: "Handcrafted Quality",
      tagSub: "Nellore, Andhra Pradesh",
    },
    about: {
      eyebrow: "OUR CRAFT & HERITAGE",
      title: "Traditional Craftsmanship for Modern Homes.",
      lead: "At Venkateswara Cane Work, led by Konda Pavan Kumar in Nellore, we bring decades of traditional rattan and cane weaving artistry directly into your living spaces.",
      body: "Every chair, sofa set, swing, and custom piece is meticulously crafted by hand using selected natural cane. Whether you need custom-designed furniture tailored to your veranda or expert restoration of cherished family heirlooms, we craft every detail with pride, durability, and elegance.",
      highlight1Title: "Authentic Hand Weaving",
      highlight1Desc: "100% natural rattan woven with traditional precision.",
      highlight2Title: "Nellore Workshop",
      highlight2Desc: "Direct service from Konda Pavan Kumar without middlemen.",
      quote: "“Cane furniture isn’t just seating—it’s a timeless Indian art form that brings warmth and natural comfort to any home.”",
      statNumber: "100%",
      statLabel: "Handmade in Nellore",
      authorTitle: "Master Craftsman & Proprietor",
    },
    services: {
      eyebrow: "WHAT WE DO",
      title: "Handcrafted Services Built to Last",
      subtitle: "From single veranda chairs to complete living room sets and antique furniture repairs, we craft each piece with precision.",
      inquireFor: "Inquire for",
      chairsTitle: "Cane Chairs",
      chairsDesc: "Handcrafted cane chairs for homes, balconies and verandas. Designed for comfort and durability.",
      chairsTag: "Popular Choice",
      sofasTitle: "Sofa Sets",
      sofasDesc: "Custom-made cane sofa sets with traditional craftsmanship, built to fit your living room aesthetic.",
      sofasTag: "Custom Sizes",
      swingsTitle: "Swings & Custom Work",
      swingsDesc: "Handmade swings (jhula) and furniture designed according to customer requirements and spatial dimensions.",
      swingsTag: "Made to Order",
      repairsTitle: "Repair & Restoration",
      repairsDesc: "Expert repair, re-weaving and restoration of old or damaged cane furniture to bring them back to life.",
      repairsTag: "Restoration Expert",
    },
    howToOrder: {
      eyebrow: "SIMPLE & DIRECT",
      title: "How to Order Your Cane Furniture",
      subtitle: "Ordering your handcrafted cane furniture in Nellore is straightforward in three simple steps.",
      step1Title: "1. Choose a Design",
      step1Desc: "Browse our furniture collection or share your own custom design photo with us.",
      step2Title: "2. Contact Us",
      step2Desc: "Call us directly or send your requirements over WhatsApp to discuss details.",
      step3Title: "3. Get It Made",
      step3Desc: "Discuss size, design, price, and delivery directly with Konda Pavan Kumar to finalize your order.",
    },
    gallery: {
      eyebrow: "OUR WORK GALLERY",
      title: "Furniture Made By Hand in Nellore",
      desc: "Explore authentic photographs of cane furniture handcrafted by Konda Pavan Kumar. Click any item to enlarge and inquire.",
      filterAll: "All Work",
      filterChairs: "Cane Chairs",
      filterSwings: "Cane Swings",
      filterSofas: "Sofa Sets",
      viewDetails: "View Details",
      handcraftedTag: "Handcrafted Rattan",
      inquireArrow: "View & Inquire →",
      items: {
        item1Title: "Classic Handcrafted Cane Chair",
        item1Cat: "Cane Chair",
        item1Desc: "Ergonomically designed traditional cane arm chair with intricate hand-woven rattan backing and sturdy structure.",
        item2Title: "Handmade Cane Swing (Jhula)",
        item2Cat: "Cane Swing",
        item2Desc: "Luxurious drop-shaped hanging cane swing designed for balcony, patio, or living room relaxation.",
        item3Title: "Masterpiece Workshop Showcase",
        item3Cat: "Cane Sofa Set",
        item3Desc: "A glimpse of custom cane sofa sets, center tables, and handcrafted chairs made in our Nellore workshop.",
      },
    },
    lightbox: {
      close: "Close",
      prev: "Previous",
      next: "Next",
      handcrafted: "Handcrafted in Nellore",
      customSizes: "Custom Sizes Available",
      askWhatsapp: "Ask About This Design on WhatsApp",
      call: "Call 9966232996",
    },
    customCta: {
      eyebrow: "CUSTOM ORDERS & RESTORATION",
      title: "Have a Design in Mind?",
      text: "We create custom cane furniture designed specifically for your space, balcony, or veranda—and expertly restore your old cane pieces.",
      whatsappBtn: "Discuss Your Design on WhatsApp",
      callBtn: "Call Now",
    },
    whyUs: {
      eyebrow: "OUR PROMISE",
      title: "Why Choose Venkateswara Cane Work",
      subtitle: "Dedicated to traditional Indian cane craftsmanship with unmatched personal attention to detail.",
      reason1Title: "Handcrafted Furniture",
      reason1Desc: "Artisanal hand weaving using 100% natural rattan for superior comfort and long-lasting quality.",
      reason2Title: "Custom Designs",
      reason2Desc: "Tailored dimensions, patterns, and seating arrangements created precisely according to your preferences.",
      reason3Title: "Repair & Restoration",
      reason3Desc: "Expert re-weaving and refurbishment to revive your classic and sentimental cane furniture.",
      reason4Title: "Direct Craftsman Contact",
      reason4Desc: "Speak directly with owner Konda Pavan Kumar for transparent pricing, custom quotes, and guidance.",
      reason5Title: "Local Service in Nellore",
      reason5Desc: "Prompt local service, personal consultation, and reliable delivery across Nellore.",
    },
    contact: {
      eyebrow: "VISIT OR CALL US",
      title: "Get in Touch with Konda Pavan Kumar",
      intro: "Whether you want to buy new cane furniture, order custom designs, or restore existing pieces in Nellore, we are just a call or WhatsApp message away.",
      addressTitle: "Business Name & Location",
      proprietorLabel: "Proprietor:",
      phoneTitle: "Phone / Call Directly",
      phoneHours: "Available Mon - Sat (9:30 AM - 9:30 PM)",
      waTitle: "WhatsApp Direct Inquiry",
      waSubtext: "Send photos of your old furniture for repair quotes!",
      callBtn: "Call 9966232996",
      waBtn: "WhatsApp Us",
      workshopTitle: "Nellore Workshop Location",
      locationNote: "Visiting our workshop? Call +91 9966232996 for direct directions and doorstep service across Nellore.",
      locationReqBtn: "Request Shop Location on WhatsApp →",
      getDirectionsBtn: "Get Directions (Call for Location)",
    },
    mobileBar: {
      call: "Call Now",
      whatsapp: "WhatsApp",
    },
    whatsappMessages: {
      general: "Hello Venkateswara Cane Work, I found your website and would like to know more about your cane furniture.",
      customCta: "Hi Konda Pavan Kumar, I have a custom cane furniture design in mind.",
      productQuery: (title: string) =>
        `Hello Venkateswara Cane Work, I am interested in this ${title} design. Please share price and details.`,
    },
    footer: {
      tagline: "Handcrafted Cane Furniture & Expert Restoration • Nellore, Andhra Pradesh",
      quickLinks: "Quick Links",
      directContact: "Direct Contact",
      rights: "All rights reserved.",
      birthdayNote: "Website launched with love on Konda Pavan Kumar's Birthday — 7 August 2026 🎂",
    },
  },
  te: {
    brandName: "Venkateswara Cane Work",
    brandTelugu: "వెంకటేశ్వర కేన్ వర్క్",
    ownerName: "Konda Pavan Kumar",
    locationName: "నెల్లూరు, ఆంధ్రప్రదేశ్",
    nav: {
      home: "హోమ్",
      about: "మా గురించి",
      services: "సేవలు",
      gallery: "మా పనితనం",
      howToOrder: "ఆర్డర్ చేయండి",
      whyUs: "ఎందుకు ఎంచుకోవాలి",
      contact: "సంప్రదించండి",
      callNow: "ఫోన్ చేయండి",
    },
    hero: {
      eyebrow: "నెల్లూరులో చేతితో తయారుచేసినవి",
      titleMain: "అందమైన కేన్ ఫర్నిచర్,",
      titleAccent: "అత్యంత శ్రద్ధతో.",
      description: "నెల్లూరులో సంప్రదాయ చేతిపని కేన్ ఫర్నిచర్, కస్టమ్ డిజైన్లు మరియు పాత ఫర్నిచర్ రిపేర్ సేవలు.",
      callBtn: "ఫోన్ చేయండి: 9966232996",
      whatsappBtn: "వాట్సాప్ చేయండి",
      trustItems: ["చేతిపని", "కస్టమ్ డిజైన్లు", "రిపేర్ & రీస్టోరేషన్"],
      tagLabel: "చేతిపని నాణ్యత",
      tagSub: "నెల్లూరు, ఆంధ్రప్రదేశ్",
    },
    about: {
      eyebrow: "మా ప్రావీణ్యం",
      title: "ఆధునిక ఇళ్లకు సంప్రదాయ కేన్ వర్క్.",
      lead: "నెల్లూరులో కొండ పవన్ కుమార్ ఆధ్వర్యంలో నడుస్తున్న వెంకటేశ్వర కేన్ వర్క్ వద్ద, మేము అత్యంత నాణ్యమైన కేన్ తో ఫర్నిచర్ తయారు చేసి అందిస్తున్నాము.",
      body: "ప్రతి కుర్చీ, సోఫా సెట్, ఉయ్యాల మరియు కస్టమ్ ఫర్నిచర్ నిపుణులైన చేతులతో నేయబడుతుంది. పాత ఫర్నిచర్ ని సరికొత్తగా బాగుచేసే రిపేర్ సేవలు కూడా లభిస్తాయి.",
      highlight1Title: "సంప్రదాయ చేతి నేత",
      highlight1Desc: "100% సహజమైన కేన్ తో చేసిన ప్రామాణిక నేత.",
      highlight2Title: "నెల్లూరు వర్క్‌షాప్",
      highlight2Desc: "మధ్యవర్తులు లేకుండా కొండ పవన్ కుమార్ నుండి ప్రత్యక్ష సేవ.",
      quote: "“కేన్ ఫర్నిచర్ అంటే కేవలం సీటింగ్ మాత్రమే కాదు—ఇది మీ ఇంటికి వెచ్చదనం మరియు సహజమైన అందాన్ని ఇచ్చే కళ.”",
      statNumber: "100%",
      statLabel: "నెల్లూరు చేతిపని",
      authorTitle: "నిర్వాహకులు",
    },
    services: {
      eyebrow: "మా సేవలు",
      title: "నాణ్యమైన కేన్ ఫర్నిచర్ సేవలు",
      subtitle: "వరాండా కుర్చీల నుండి సోఫా సెట్లు మరియు పాత ఫర్నిచర్ రిపేర్ల వరకు ప్రతిదీ సున్నితంగా తయారు చేస్తాము.",
      inquireFor: "వివరాలు తెలుసుకోండి:",
      chairsTitle: "కేన్ కుర్చీలు",
      chairsDesc: "ఇళ్లు, బాల్కనీలు మరియు వరాండాల కోసం అందమైన కేన్ కుర్చీలు.",
      chairsTag: "అత్యధిక ఆదరణ",
      sofasTitle: "సోఫా సెట్లు",
      sofasDesc: "మీ ఇంటికి తగినట్టుగా ప్రత్యేకంగా తయారు చేసే కేన్ సోఫా సెట్లు.",
      sofasTag: "కస్టమ్ సైజులు",
      swingsTitle: "ఉయ్యాలలు & కస్టమ్ వర్క్",
      swingsDesc: "మీ కోరిక మేరకు ప్రత్యేకంగా తయారుచేసే ఉయ్యాలలు (ఊయల) మరియు ఇతర ఫర్నిచర్.",
      swingsTag: "మీ ఆర్డర్ ప్రకారం",
      repairsTitle: "రిపేర్ & రీస్టోరేషన్",
      repairsDesc: "పాత లేదా పాడైన కేన్ ఫర్నిచర్ మళ్లీ కొత్తదానిలా అల్లి బాగుచేయడం.",
      repairsTag: "రిపేర్ నిపుణులు",
    },
    howToOrder: {
      eyebrow: "సులువైన పద్ధతి",
      title: "ఆర్డర్ ఎలా చేయాలి?",
      subtitle: "నెల్లూరులో మీ కేన్ ఫర్నిచర్ ఆర్డర్ చేయడం చాలా సులభం—మూడు సరళమైన అడుగులు.",
      step1Title: "1. డిజైన్ ఎంచుకోండి",
      step1Desc: "మా ఫర్నిచర్ చూడండి లేదా మీ వద్ద ఉన్న డిజైన్ ఫోటోను వాట్సాప్‌లో షేర్ చేయండి.",
      step2Title: "2. మమ్మల్ని సంప్రదించండి",
      step2Desc: "ఫోన్ చేయండి లేదా వాట్సాప్ ద్వారా మీ అవసరాలను పంపండి.",
      step3Title: "3. ఆర్డర్ పొందండి",
      step3Desc: "సైజు, ధర మరియు డెలివరీ వివరాలను కొండ పవన్ కుమార్ తో మాట్లాడి ఆర్డర్ ఖరారు చేసుకోండి.",
    },
    gallery: {
      eyebrow: "మా పనితనం",
      title: "నెల్లూరులో చేతితో చేసిన కేన్ ఫర్నిచర్",
      desc: "కొండ పవన్ కుమార్ తయారుచేసిన ఫర్నిచర్ ఫోటోలు చూడండి. క్లిక్ చేసి వివరాలు తెలుసుకోండి.",
      filterAll: "అన్నీ",
      filterChairs: "కేన్ కుర్చీలు",
      filterSwings: "కేన్ ఉయ్యాలలు",
      filterSofas: "సోఫా సెట్లు",
      viewDetails: "వివరాలు చూడండి",
      handcraftedTag: "చేతిపని కేన్",
      inquireArrow: "వివరాలు & విచారణ →",
      items: {
        item1Title: "క్లాసిక్ చేతిపని కేన్ కుర్చీ",
        item1Cat: "కేన్ కుర్చీ",
        item1Desc: "వరాండా మరియు ఇంట్లో కూర్చోవడానికి సౌకర్యవంతమైన సాంప్రదాయ కేన్ కుర్చీ.",
        item2Title: "చేతితో చేసిన కేన్ ఉయ్యాల (ఊయల)",
        item2Cat: "కేన్ ఉయ్యాల",
        item2Desc: "బాల్కనీ మరియు లివింగ్ రూమ్ కోసం డిజైన్ చేసిన అందమైన కేన్ ఉయ్యాల.",
        item3Title: "వర్క్‌షాప్ ఫర్నిచర్ సెట్లు",
        item3Cat: "కేన్ సోఫా సెట్",
        item3Desc: "మా నెల్లూరు వర్క్‌షాప్‌లో తయారుచేసిన సోఫా సెట్లు మరియు టేబుళ్లు.",
      },
    },
    lightbox: {
      close: "మూసివేయి",
      prev: "క్రితం",
      next: "తరువాత",
      handcrafted: "నెల్లూరు చేతిపని",
      customSizes: "కస్టమ్ సైజులు అందుబాటులో ఉన్నాయి",
      askWhatsapp: "ఈ డిజైన్ గురించి వాట్సాప్‌లో అడగండి",
      call: "ఫోన్ చేయండి: 9966232996",
    },
    customCta: {
      eyebrow: "కస్టమ్ ఆర్డర్లు & రిపేర్లు",
      title: "మీ మనస్సులో ఏదైనా డిజైన్ ఉందా?",
      text: "మీ స్థలానికి తగినట్లుగా కేన్ ఫర్నిచర్ తయారు చేస్తాము మరియు మీ పాత కేన్ ఫర్నిచర్‌ను బాగుచేస్తాము.",
      whatsappBtn: "వాట్సాప్‌లో డిజైన్ గురించి మాట్లాడండి",
      callBtn: "ఫోన్ చేయండి",
    },
    whyUs: {
      eyebrow: "మా నమ్మకం",
      title: "వెంకటేశ్వర కేన్ వర్క్ ఎందుకు ఎంచుకోవాలి?",
      subtitle: "నాణ్యమైన చేతిపని మరియు విశ్వసనీయమైన సేవ.",
      reason1Title: "చేతితో చేసిన ఫర్నిచర్",
      reason1Desc: "సహజమైన కేన్ తో మన్నికైన చేతి నేత మరియు సౌకర్యం.",
      reason2Title: "కస్టమ్ డిజైన్లు",
      reason2Desc: "మీ అవసరాలకు మరియు రూమ్‌ సైజులకు తగిన డిజైన్లు.",
      reason3Title: "రిపేర్ & రీస్టోరేషన్",
      reason3Desc: "పాత కేన్ ఫర్నిచర్‌ను మళ్లీ కొత్తదానిలా బాగుచేసే నైపుణ్యం.",
      reason4Title: "నేరుగా మాట్లాడవచ్చు",
      reason4Desc: "యజమాని కొండ పవన్ కుమార్ తో నేరుగా మాట్లాడి ధరల వివరాలు తెలుసుకోవచ్చు.",
      reason5Title: "నెల్లూరులో స్థానిక సేవ",
      reason5Desc: "నెల్లూరు నగరంలో వేగవంతమైన స్థానిక సేవలు మరియు డెలివరీ.",
    },
    contact: {
      eyebrow: "మమ్మల్ని సంప్రదించండి",
      title: "కొండ పవన్ కుమార్ ని సంప్రదించండి",
      intro: "కొత్త కేన్ ఫర్నిచర్ ఆర్డర్ చేయడానికి లేదా పాతవి రిపేర్ చేయడానికి ఫోన్ లేదా వాట్సాప్ ద్వారా మమ్మల్ని సంప్రదించవచ్చు.",
      addressTitle: "విలాసం & చిరునామా",
      proprietorLabel: "నిర్వాహకులు:",
      phoneTitle: "ఫోన్ ద్వారా సంప్రదించండి",
      phoneHours: "సోమ - శని (ఉదయం 9:30 నుండి రాత్రి 9:30 వరకు)",
      waTitle: "వాట్సాప్ విచారణ",
      waSubtext: "రిపేర్ చేయాల్సిన పాత ఫర్నిచర్ ఫోటోలు వాట్సాప్‌లో పంపండి!",
      callBtn: "ఫోన్ చేయండి: 9966232996",
      waBtn: "వాట్సాప్ చేయండి",
      workshopTitle: "నెల్లూరు వర్క్‌షాప్ స్థానం",
      locationNote: "మా వర్క్‌షాప్ కి రావలసి వస్తే డైరెక్షన్ల కోసం +91 9966232996 నంబర్‌కు ఫోన్ చేయండి.",
      locationReqBtn: "వాట్సాప్‌లో షాప్ లొకేషన్ అడగండి →",
      getDirectionsBtn: "వర్క్‌షాప్ లొకేషన్ విచారించండి",
    },
    mobileBar: {
      call: "ఫోన్ చేయండి",
      whatsapp: "వాట్సాప్",
    },
    whatsappMessages: {
      general: "నమస్కారం వెంకటేశ్వర కేన్ వర్క్, మీ వెబ్సైట్ చూశాను. మీ కేన్ ఫర్నిచర్ గురించి మరిన్ని వివరాలు తెలుసుకోవాలనుకుంటున్నాను.",
      customCta: "నమస్కారం కొండ పవన్ కుమార్ గారు, నా వద్ద ఒక కస్టమ్ కేన్ ఫర్నిచర్ డిజైన్ ఉంది. వివరాలు మాట్లాడాలి.",
      productQuery: (title: string) =>
        `నమస్కారం వెంకటేశ్వర కేన్ వర్క్, ఈ ${title} డిజైన్ గురించి ధర మరియు వివరాలు తెలియజేయండి.`,
    },
    footer: {
      tagline: "చేతిపని కేన్ ఫర్నిచర్ & రిపేర్ సేవలు • నెల్లూరు, ఆంధ్రప్రదేశ్",
      quickLinks: "త్వరిత లింకులు",
      directContact: "నేరుగా సంప్రదించండి",
      rights: "సర్వ హక్కులు ప్రత్యేకించబడినవి.",
      birthdayNote: "కొండ పవన్ కుమార్ జన్మదినం సందర్భంగా రూపొందించిన వెబ్సైట్ — 7 ఆగస్టు 2026 🎂",
    },
  },
};
