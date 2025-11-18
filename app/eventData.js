// src/data/eventsData.js

const events = [
  // --- CATEGORY 1: CONCERTS & NIGHTLIFE (The 'Party People' Vibe) ---
  {
    eventId: "p_001",
    title: "Neon Dance Floor Takeover",
    category: "Concerts & Nightlife",
    date: "2025-12-05T22:00:00.000Z",
    location: { name: "The Warehouse Club", city: "Meru" },
    description:
      "High-energy EDM and pop event featuring three international DJs. Dress in neon and prepare to dance all night!",
    imageUrl:
      "https://images.stockcake.com/public/6/8/5/685a0fff-1fcd-4ee6-893f-642dfccb1f39_large/neon-dance-paradise-stockcake.jpg",
    organizer: { name: "Global Beats Events" },
    feeStructure: [
      { name: "Early Bird Ticket", price: 1000, type: "Ticket" },
      { name: "At The Door", price: 1500, type: "Ticket" },
    ],
    isFree: false,
    durationMinutes: 300,
    contact: "tickets@globalbeats.com",
  },
  {
    eventId: "p_002",
    title: "Acoustic Sunset Session",
    category: "Concerts & Nightlife",
    date: "2025-11-29T17:30:00.000Z",
    location: { name: "Skyline Rooftop Bar", city: "Meru" }, // Added city
    feeStructure: [{ name: "Free Entry", type: "Free" }],
    isFree: true,
    description:
      "Relaxing evening with live acoustic performances featuring local Kenyan artists. Perfect for unwinding after a long week.", // Added description
    imageUrl:
      "https://www.bmi.com/cache/photos_og_image/FSTOPbmi101024-060_-_abcdef_-_1acdd247e2953b3f71df1a85f6588d88387f1348.jpg",
    organizer: { name: "Skyline Management" },
    durationMinutes: 150,
    contact: "info@skylinemeru.co.ke", // Added contact
  },
  {
    eventId: "p_003",
    title: "Local Hip-Hop Showcase: The Rise",
    category: "Concerts & Nightlife",
    date: "2025-12-14T20:00:00.000Z",
    location: { name: "The Underground Venue", city: "Meru" }, // Added city
    feeStructure: [{ name: "Standard Ticket", price: 800, type: "Ticket" }],
    isFree: false,
    description:
      "Featuring emerging Kenyan hip-hop artists from Meru and surrounding counties. Support local talent!", // Added description
    imageUrl:
      "https://spitfirehiphop.com/wp-content/uploads/2025/10/The-Rise-of-Regional-Sound-How-Local-Scenes-Are-Reclaiming-Hip-Hops-Identity.jpg",
    organizer: { name: "Meru Rap Scene" },
    durationMinutes: 240,
    contact: "merurapscene@gmail.com", // Added contact
  },
  {
    eventId: "p_004",
    title: "Karaoke Battle: Championship Round",
    category: "Concerts & Nightlife",
    date: "2025-12-01T21:00:00.000Z",
    location: { name: "The Glee Bar", city: "Meru" }, // Added city
    feeStructure: [{ name: "Free Entry", type: "Free" }],
    isFree: true,
    description:
      "Show off your singing skills in our weekly karaoke championship. Prizes for the best performers!", // Added description
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xxYLUtlx24X6musjolfdKc_m8wzBOh3PKQ&s",
    organizer: { name: "The Glee Bar" },
    durationMinutes: 180,
    contact: "gleebar.meru@gmail.com", // Added contact
  },
  {
    eventId: "p_005",
    title: "Reggae & Chill Fridays",
    category: "Concerts & Nightlife",
    date: "2025-11-27T19:00:00.000Z",
    location: { name: "Kongo Gardens", city: "Meru" }, // Added city
    feeStructure: [{ name: "Entrance Fee", price: 500, type: "Ticket" }],
    isFree: false,
    description:
      "Weekly reggae night featuring the best of Kenyan and international reggae music. Chill vibes guaranteed!", // Added description
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjNZQoPUnigoGQQ3uDQ92aBCSP4h2vtUMSRw&s",
    organizer: { name: "Kongo Events" },
    durationMinutes: 180,
    contact: "kongo.events@yahoo.com", // Added contact
  },
  {
    eventId: "p_006",
    title: "90s Throwback Party",
    category: "Concerts & Nightlife",
    date: "2025-12-07T22:30:00.000Z",
    location: { name: "The Retro Lounge", city: "Meru" }, // Added city
    feeStructure: [{ name: "Standard Ticket", price: 1200, type: "Ticket" }],
    isFree: false,
    description:
      "Travel back to the 90s with classic hits from Kenyan and international artists. Dress in your best 90s attire!", // Added description
    imageUrl:
      "https://i.etsystatic.com/49101308/r/il/735523/6785755597/il_570xN.6785755597_c9ph.jpg",
    organizer: { name: "Throwback Inc." },
    durationMinutes: 240,
    contact: "throwback.inc@outlook.com", // Added contact
  },

  // --- CATEGORY 2: CHARITY & COMMUNITY (Social Contribution) ---
  {
    eventId: "c_001",
    title: "Annual Homeless Shelter Fundraiser Gala",
    category: "Charity & Community",
    date: "2025-12-12T19:00:00.000Z",
    location: { name: "Meru Grand Ballroom", city: "Meru" },
    description:
      "An elegant evening of auctions and dining to support the city's largest homeless initiative.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpjDK7R1Tkw4WikfwJFMyCos-dEiu_Pxq_9w&s",
    organizer: { name: "Hope Foundation" },
    feeStructure: [
      { name: "Single Seat", price: 7500, type: "Ticket" },
      { name: "Donation Only", type: "Optional" },
    ],
    isFree: false,
    durationMinutes: 240,
    contact: "gala@hopefoundation.org",
  },
  {
    eventId: "c_002",
    title: "Weekend Park Clean-Up Drive",
    category: "Charity & Community",
    date: "2025-11-23T09:00:00.000Z",
    location: { name: "Riverside Park", city: "Meru" }, // Added city
    feeStructure: [{ name: "Free Registration", type: "Free" }],
    isFree: true,
    description:
      "Volunteer to help keep our local parks clean and beautiful. Gloves and bags will be provided.",
    imageUrl:
      "https://educationnews.co.ke/wp-content/uploads/2025/10/GZgTh3MXkBEaWXn.jpeg",
    organizer: { name: "Green Meru" },
    durationMinutes: 180,
    contact: "greenmeru.volunteer@gmail.com", // Added contact
  },
  {
    eventId: "c_003",
    title: "Local Food Bank Volunteer Day",
    category: "Charity & Community",
    date: "2025-12-08T10:00:00.000Z",
    location: { name: "Meru Food Distribution Centre", city: "Meru" }, // Added city
    feeStructure: [{ name: "Free Registration", type: "Free" }],
    isFree: true,
    description:
      "Spend a day sorting and packing food donations to help families in need across Meru County.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYzCRwZtluGr5Hj45QwU8hD3_RRhhod3HnWQ&s",
    organizer: { name: "Meru Aid" },
    durationMinutes: 300,
    contact: "meruaid.volunteer@outlook.com", // Added contact
  },
  {
    eventId: "c_004",
    title: "Toy Drive Launch Event",
    category: "Charity & Community",
    date: "2025-12-15T18:00:00.000Z",
    location: { name: "City Hall Annex", city: null },
    feeStructure: [{ name: "Entry with Toy Donation", type: "Donation" }],
    isFree: false,
    description:
      "Bring a new, unwrapped toy to donate to children for the holidays.",
    imageUrl:
      "https://www.harrellandharrell.com/wp-content/uploads/2020/11/2020_ToyDriver_header.jpg",
    organizer: { name: "City Council" },
    durationMinutes: 120,
    contact: null,
  },
  {
    eventId: "c_005",
    title: "Disaster Relief Awareness Talk",
    category: "Charity & Community",
    date: "2025-12-06T17:00:00.000Z",
    location: { name: "The Gallery Loft", city: null },
    feeStructure: [{ name: "Free Entry", type: "Free" }],
    isFree: true,
    description:
      "Learn essential preparedness and response techniques for local disasters.",
    imageUrl: "https://preparecenter.org/wp-content/uploads/2020/05/pape-1.png",
    organizer: { name: "Red Cross Meru" },
    durationMinutes: 90,
    contact: null,
  },
  {
    eventId: "c_006",
    title: "Senior Citizens Tea Party",
    category: "Charity & Community",
    date: "2025-12-24T15:00:00.000Z",
    location: { name: "Sunset Retirement Home", city: null },
    feeStructure: [{ name: "Volunteer Registration", type: "Free" }],
    isFree: true,
    description:
      "Help serve tea and spend an afternoon chatting with elderly residents.",
    imageUrl:
      "https://www.burgesshill.gov.uk/wp-content/uploads/2022/04/Senior-Citizens-Tea-Prty-4th-scaled.jpg",
    organizer: { name: "Community Care" },
    durationMinutes: 180,
    contact: null,
  },

  // --- CATEGORY 3: WELLNESS & FITNESS (Physical & Mental Health) ---
  {
    eventId: "wf_001",
    title: "Sunrise 5K Fun Run and Marathon Prep",
    category: "Wellness & Fitness",
    date: "2025-12-05T06:00:00.000Z",
    location: { name: "Central Park Loop", city: "Meru" },
    description:
      "A community 5K run open to all fitness levels. Followed by a Q&A with a certified running coach on marathon preparation.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQahaWCEr0-khqpV5emfZZzS4WeD7kjAjqg0Q&s",
    organizer: { name: "Meru Run Club" },
    feeStructure: [
      { name: "Free Registration", type: "Free" },
      { name: "Official T-Shirt Fee", price: 1000, type: "Optional" },
    ],
    isFree: true,
    durationMinutes: 120,
    contact: "runclub@meru.com",
  },
  {
    eventId: "wf_002",
    title: "Beginner Kickboxing Class",
    category: "Wellness & Fitness",
    date: "2025-11-20T17:00:00.000Z",
    location: { name: "Impact Gym", city: "Meru" }, // Added city
    feeStructure: [{ name: "Trial Class Fee", price: 500, type: "Ticket" }],
    isFree: false,
    description:
      "A high-intensity introductory class focused on fitness and self-defense basics.",
    imageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/kickboxing-classes-flyer-5bb218b156b0322fffea7f6a46990730_screen.jpg?ts=1636979394",
    organizer: { name: "Impact Gym" },
    durationMinutes: 60,
    contact: "impactgym.meru@gmail.com", // Added contact
  },
  {
    eventId: "wf_003",
    title: "Mental Health First Aid Training",
    category: "Wellness & Fitness",
    date: "2025-12-14T09:00:00.000Z",
    location: { name: "City Community Hall", city: null },
    feeStructure: [
      { name: "Registration Fee (Certificate)", price: 2500, type: "Ticket" },
    ],
    isFree: false,
    description:
      "A certified course to equip you with the skills to help someone developing a mental health problem or experiencing a mental health crisis.",
    imageUrl:
      "https://blog-nistinstitute.com/wp-content/uploads/2020/01/first-aid-training.jpg",
    organizer: { name: "Mental Wellness Now" },
    durationMinutes: 480,
    contact: null,
  },
  {
    eventId: "wf_004",
    title: "Free Outdoor Zumba Session",
    category: "Wellness & Fitness",
    date: "2025-11-27T18:00:00.000Z",
    location: { name: "Town Square", city: null },
    feeStructure: [{ name: "Free Entry", type: "Free" }],
    isFree: true,
    description:
      "Dance your stress away with a fun, free Zumba session open to all.",
    imageUrl:
      "https://www.city.waltham.ma.us/sites/g/files/vyhlif12301/f/styles/news_image/public/events/free_outdoor_yoga.jpg?itok=x9lbttAz",
    organizer: { name: "Zumba Meru" },
    durationMinutes: 60,
    contact: null,
  },
  {
    eventId: "wf_005",
    title: "Nutrition for Energy Workshop",
    category: "Wellness & Fitness",
    date: "2025-12-01T19:00:00.000Z",
    location: { name: "Virtual Event (Zoom)", city: null },
    feeStructure: [{ name: "Registration", price: 750, type: "Ticket" }],
    isFree: false,
    description:
      "Learn how to optimize your diet for sustained energy throughout the day.",
    imageUrl:
      "https://hanscomfss.com/wp-content/uploads/2025/09/FITNESS-NUTRITION-CLASSES-FB.png",
    organizer: { name: "Health First" },
    durationMinutes: 90,
    contact: null,
  },
  {
    eventId: "wf_006",
    title: "Yoga and Meditation for Anxiety Relief",
    category: "Wellness & Fitness",
    date: "2025-11-29T16:00:00.000Z",
    location: { name: "The Tranquil Studio", city: null },
    feeStructure: [{ name: "Drop-in Rate", price: 1200, type: "Ticket" }],
    isFree: false,
    description:
      "A calming session focused on breathing techniques and gentle movement to ease anxiety.",
    imageUrl:
      "https://content.jdmagicbox.com/v2/comp/mumbai/j2/022pxx22.xx22.230726150022.f5j2/catalogue/yoga-by-suravi-yoga-at-home-in-mumbai-marine-lines-mumbai-9y8kcczxi4.jpg",
    organizer: { name: "The Tranquil Studio" },
    durationMinutes: 90,
    contact: null,
  },

  // --- CATEGORY 4: EDUCATION & SKILLS (Personal Improvement) ---
  {
    eventId: "e_001",
    title: "Financial Planning for Young Adults",
    category: "Education & Skills",
    date: "2025-12-10T14:00:00.000Z",
    location: { name: "City Library Auditorium", city: "Meru" },
    description:
      "Learn the basics of budgeting, saving, and investing to secure your financial future. Free materials provided.",
    imageUrl:
      "https://pdiam.com/wp-content/uploads/2025/07/financial-planning-tips-for-young-adults-thumbnail.jpg",
    organizer: { name: "Smart Money Experts" },
    feeStructure: [{ name: "Free Registration", type: "Free" }],
    isFree: true,
    durationMinutes: 180,
    contact: "smartmoney@experts.com",
  },
  {
    eventId: "e_002",
    title: "Advanced Excel Workshop",
    category: "Education & Skills",
    date: "2025-11-18T18:30:00.000Z",
    location: { name: "Chamber of Commerce Hall", city: "Meru" }, // Added city
    feeStructure: [{ name: "Standard Fee", price: 1000, type: "Ticket" }],
    isFree: false,
    description:
      "Master pivot tables, VLOOKUP, and advanced data analysis in this hands-on workshop.",
    imageUrl:
      "https://prokhata.com/wp-content/uploads/2022/11/Basic-to-advanced-Excel-Course3.png",
    organizer: { name: "Meru Business School" },
    durationMinutes: 120,
    contact: "merubusiness.school@outlook.com", // Added contact
  },
  {
    eventId: "e_003",
    title: "Public Speaking Masterclass",
    category: "Education & Skills",
    date: "2025-12-03T17:00:00.000Z",
    location: { name: "Tech Hub Classroom", city: null },
    feeStructure: [{ name: "Full Workshop", price: 3000, type: "Ticket" }],
    isFree: false,
    description:
      "Boost your confidence and delivery skills for presentations and large audiences.",
    imageUrl:
      "https://i.pinimg.com/736x/38/be/86/38be86d49f27ecbaad22dd388e8c794b.jpg",
    organizer: { name: "Communication Pros" },
    durationMinutes: 180,
    contact: null,
  },
  {
    eventId: "e_004",
    title: "Intro to Python for Data Science",
    category: "Education & Skills",
    date: "2026-01-20T19:00:00.000Z",
    location: { name: "Online Webinar", city: null },
    feeStructure: [{ name: "Free Webinar Access", type: "Free" }],
    isFree: true,
    description:
      "A free introduction to coding with Python, focusing on data manipulation and basic analysis.",
    imageUrl:
      "https://m.media-amazon.com/images/I/51tRKRWf1WL._AC_UF1000,1000_QL80_.jpg",
    organizer: { name: "Code Academy" },
    durationMinutes: 90,
    contact: null,
  },
  {
    eventId: "e_005",
    title: "Photography Basics Seminar",
    category: "Education & Skills",
    date: "2025-12-09T09:00:00.000Z",
    location: { name: "Art School Studio", city: null },
    feeStructure: [{ name: "Registration", price: 800, type: "Ticket" }],
    isFree: false,
    description:
      "Learn the fundamentals of composition, lighting, and camera settings.",
    imageUrl: "https://nikonschool-ug.com/uploads/training/686f8ddd17eef.jpg",
    organizer: { name: "Meru Art School" },
    durationMinutes: 120,
    contact: null,
  },
  {
    eventId: "e_006",
    title: "Foreign Language Exchange Meetup",
    category: "Education & Skills",
    date: "2025-11-30T15:00:00.000Z",
    location: { name: "Central Coffee House", city: null },
    feeStructure: [{ name: "Free Entry", type: "Free" }],
    isFree: true,
    description:
      "Practice your language skills (Spanish, French, Swahili) with native speakers in a casual setting.",
    imageUrl:
      "https://aicexpat.nl/cdn/shop/files/languageexchange.jpg?v=1732722237",
    organizer: { name: "Language Connect" },
    durationMinutes: 150,
    contact: null,
  },

  // --- CATEGORY 5: STUDENT & CAMPUS (Youth/University Focus) ---
  {
    eventId: "s_001",
    title: "Campus Start-Up Idea Pitch Day",
    category: "Student & Campus",
    date: "2025-12-08T10:00:00.000Z",
    location: { name: "Meru University Innovation Hall", city: "Meru" },
    description:
      "Students present their business ideas to a panel of investors and mentors. Networking lunch provided.",
    imageUrl:
      "https://students.wlu.ca/work-leadership-and-volunteering/entrepreneurship/startup-lab/assets/images/2025_pitchcompetition_webtile.jpg",
    organizer: { name: "University Business Club" },
    feeStructure: [
      { name: "Student Free Pass", type: "Free" },
      { name: "Mentor/Guest Ticket", price: 1000, type: "Ticket" },
    ],
    isFree: true,
    durationMinutes: 300,
    contact: "pitchday@meruuni.edu",
  },
  {
    eventId: "s_002",
    title: "Inter-Faculty Gaming Tournament (FIFA)",
    category: "Student & Campus",
    date: "2025-11-23T14:00:00.000Z",
    location: { name: "Campus IT Lab", city: "Meru" }, // Added city
    feeStructure: [{ name: "Player Entry Fee", price: 300, type: "Ticket" }],
    isFree: false,
    description:
      "Compete against your fellow students in the annual FIFA gaming tournament. Prizes for the winners!",
    imageUrl:
      "https://naseeha.live/wp-content/uploads/2024/10/WhatsApp-Image-2024-12-14-at-11.08.17_1cf74c44.jpg",
    organizer: { name: "Gaming Society" },
    durationMinutes: 360,
    contact: "meru.gaming.society@gmail.com", // Added contact
  },
  {
    eventId: "s_003",
    title: "Study Skills Bootcamp",
    category: "Student & Campus",
    date: "2025-12-01T09:00:00.000Z",
    location: { name: "Lecture Theatre 5", city: null },
    feeStructure: [{ name: "Free Registration", type: "Free" }],
    isFree: true,
    description:
      "Intensive session on effective note-taking, time management, and exam preparation strategies.",
    imageUrl:
      "https://images.unsplash.com/photo-1540058404349-2e5fabf32d75?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U3R1ZHklMjBTa2lsbHMlMjBCb290Y2FtcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    organizer: { name: "Academic Affairs" },
    durationMinutes: 180,
    contact: null,
  },
  {
    eventId: "s_004",
    title: "Campus Talent Show Auditions",
    category: "Student & Campus",
    date: "2025-12-15T16:00:00.000Z",
    location: { name: "Student Union Hall", city: null },
    feeStructure: [{ name: "Free Entry", type: "Free" }],
    isFree: true,
    description:
      "Audition for the biggest event of the semester! Open to all student acts.",
    imageUrl:
      "https://media.istockphoto.com/id/2232896193/photo/woman-holding-microphone-on-stage-in-front-of-audience.webp?a=1&b=1&s=612x612&w=0&k=20&c=XJCdCdZC1Zo2vNc5L_OHSPwWUEFHsKs0X7P-BN8YZkE=",
    organizer: { name: "Student Entertainment" },
    durationMinutes: 240,
    contact: null,
  },
  {
    eventId: "s_005",
    title: "CV and Job Interview Prep",
    category: "Student & Campus",
    date: "2025-12-06T11:00:00.000Z",
    location: { name: "Careers Office", city: null },
    feeStructure: [{ name: "Free Workshop", type: "Free" }],
    isFree: true,
    description:
      "Hands-on advice on crafting winning CVs and acing tough job interviews.",
    imageUrl:
      "https://media.istockphoto.com/id/1503239950/photo/business-people-waiting-in-line-and-preparing-for-a-job-interview-meeting.webp?a=1&b=1&s=612x612&w=0&k=20&c=3lTw13aE_OAHnR4luLWExSk9nLI9kwDgpL-CS3pFWwE=",
    organizer: { name: "Careers Office" },
    durationMinutes: 90,
    contact: null,
  },
  {
    eventId: "s_006",
    title: "End-of-Semester Bash",
    category: "Student & Campus",
    date: "2025-12-20T21:00:00.000Z",
    location: { name: "Meru Sports Arena", city: null },
    feeStructure: [
      { name: "Ticket (Student ID req.)", price: 200, type: "Ticket" },
    ],
    isFree: false,
    description:
      "The official semester closing party—expect music, dancing, and fun.",
    imageUrl:
      "https://media.istockphoto.com/id/2218498755/photo/young-friends-women-dancing-during-party-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=ThhtAg0bELe3WiwkB2p3Q_SYth0yNwkZKRBS9x4mszw=",
    organizer: { name: "Student Union" },
    durationMinutes: 300,
    contact: null,
  },

  // --- CATEGORY 6: ADVENTURE & TRAVEL (Exploration & Excitement) ---
  {
    eventId: "a_001",
    title: "Hiking Expedition: Lake Eilisha Trail",
    category: "Adventure & Travel",
    date: "2025-12-14T07:00:00.000Z",
    location: { name: "Lukuma Cliffs (Day Trip)", city: "Outside Meru" },
    description:
      "Guided instruction for beginners. Transportation and safety gear included. Great way to meet people and challenge yourself!",
    imageUrl:
      "https://images.unsplash.com/photo-1627735410002-68bc4c043600?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEhpa2luZyUyMEV4cGVkaXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    organizer: { name: "Wilderness Explorers" },
    feeStructure: [
      { name: "Full Package (Transport + Gear)", price: 6000, type: "Ticket" },
      { name: "Own Transport & Gear", price: 2500, type: "Ticket" },
    ],
    isFree: false,
    durationMinutes: 600,
    contact: "climb@wilderness.com",
  },
  {
    eventId: "a_002",
    title: "Photo Walk: Downtown Architecture",
    category: "Adventure & Travel",
    date: "2025-11-30T10:00:00.000Z",
    location: { name: "City Hall Entrance", city: "Meru" }, // Added city
    feeStructure: [{ name: "Free Entry", type: "Free" }],
    isFree: true,
    description:
      "Explore and photograph the historic and modern architecture of downtown Meru.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1666426138194-b2679ce9602d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RG93bnRvd24lMjBBcmNoaXRlY3R1cmUlMjBBZnJpY2F8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    organizer: { name: "Meru Photography Club" },
    durationMinutes: 120,
    contact: "meruphotoclub@gmail.com", // Added contact
  },
  {
    eventId: "a_003",
    title: "Overnight Camping & Stargazing Trip",
    category: "Adventure & Travel",
    date: "2025-12-21T16:00:00.000Z",
    location: { name: "Mount Kenya Foothills", city: null },
    feeStructure: [{ name: "Campsite Fee", price: 1500, type: "Ticket" }],
    isFree: false,
    description:
      "Spend a night under the stars far from city lights. Bring your own tent and supplies.",
    imageUrl:
      "https://images.unsplash.com/photo-1761582380956-52271de05c71?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8T3Zlcm5pZ2h0JTIwQ2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    organizer: { name: "Adventure Meru" },
    durationMinutes: 720, // Overnight
    contact: null,
  },
  {
    eventId: "a_004",
    title: "Local Brewery Tour & Tasting",
    category: "Adventure & Travel",
    date: "2025-12-28T14:00:00.000Z",
    location: { name: "Meru Craft Brewery", city: null },
    feeStructure: [
      { name: "Tour & Tasting Ticket", price: 1800, type: "Ticket" },
    ],
    isFree: false,
    description:
      "A guided tour of the brewing process followed by a tasting session.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1682146551259-1c2c14ae4619?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fExvY2FsJTIwQnJld2VyeSUyMFRvdXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    organizer: { name: "Meru Craft Brewery" },
    durationMinutes: 120,
    contact: null,
  },
  {
    eventId: "a_005",
    title: "Volunteer Trip: Wildlife Conservation",
    category: "Adventure & Travel",
    date: "2026-01-05T08:00:00.000Z",
    location: { name: "Local Game Reserve", city: null },
    feeStructure: [{ name: "Volunteer Registration", type: "Free" }],
    isFree: true,
    description:
      "Assist park staff with habitat restoration and monitoring local wildlife.",
    imageUrl:
      "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2VueWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    organizer: { name: "Wildlife Guardians" },
    durationMinutes: 480,
    contact: null,
  },
  {
    eventId: "a_006",
    title: "Historical Walking Tour: Meru City",
    category: "Adventure & Travel",
    date: "2025-12-07T11:00:00.000Z",
    location: { name: "Old Town Square", city: null },
    feeStructure: [{ name: "Guide Fee (Optional)", type: "Optional" }],
    isFree: false,
    description:
      "Discover the rich history and hidden stories of Meru's oldest neighborhoods.",
    imageUrl:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2VueWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    organizer: { name: "Meru Historical Society" },
    durationMinutes: 180,
    contact: null,
  },
  // --- CATEGORY 7: SPORTS (Local & International Highlights) ---
  {
    eventId: "sp_001",
    title: "Meru Derby: Black Panther FC vs Meru Police FC",
    category: "Sports",
    date: "2025-11-22T15:30:00.000Z",
    location: { name: "Kinoru Sports Stadium", city: "Meru" },
    description:
      "The most anticipated local football clash of the season — live commentary, fan zones, and halftime performances.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJa5hWHRRwvhVrjgtqjv0NrIBnHe2NHKGTJA&s",
    organizer: { name: "Meru Football League" },
    feeStructure: [
      { name: "Regular Ticket", price: 300, type: "Ticket" },
      { name: "VIP Seat", price: 800, type: "Ticket" },
    ],
    isFree: false,
    durationMinutes: 120,
    contact: "info@meruleague.com",
  },
  {
    eventId: "sp_002",
    title: "Champions League: Chelsea vs Barcelona Live Screening",
    category: "Sports",
    date: "2025-06-07T22:00:00.000Z",
    location: { name: "City View Lounge", city: null },
    description:
      "Watch Europe’s top clubs battle for glory on a giant screen with food, drinks, and fan giveaways.",
    imageUrl:
      "https://www.fcbarcelona.com/fcbarcelona/photo/2025/03/27/ca81e74f-628e-467c-9e32-dfbb41809893/3200x2000_WCL2025-semis-01.jpg",
    organizer: { name: "UEFA Fans Kenya" },
    feeStructure: [{ name: "Entry + Drink", price: 500, type: "Ticket" }],
    isFree: false,
    durationMinutes: 180,
    contact: "uefafans@kenya.com",
  },
  {
    eventId: "sp_003",
    title: "Basketball Invitational: Meru Eagles vs Nairobi Storm",
    category: "Sports",
    date: "2025-12-03T16:00:00.000Z",
    location: { name: "Meru Indoor Arena", city: "Meru" }, // Added city
    feeStructure: [
      { name: "General Entry", price: 400, type: "Ticket" },
      { name: "Courtside Pass", price: 1000, type: "Ticket" },
    ],
    isFree: false,
    description:
      "A high-energy basketball showdown featuring top regional teams and halftime entertainment.",
    imageUrl:
      "https://img.redbull.com/images/c_crop,x_1000,y_0,h_2560,w_1920/c_fill,w_450,h_600/q_auto,f_auto/redbullcom/2023/5/20/luqcjsimntbshnf8qz2y/red-bull-half-court-world-final",
    organizer: { name: "Kenya Hoops Association" },
    durationMinutes: 150,
    contact: "kenya.hoops@outlook.com", // Added contact
  },
  {
    eventId: "sp_004",
    title: "Community Cycling Challenge",
    category: "Sports",
    date: "2025-12-10T08:00:00.000Z",
    location: { name: "Meru Town Circuit", city: "Meru" },
    description:
      "Join cyclists from across the county in this 20km road challenge promoting fitness and road safety.",
    imageUrl:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/12/12/18/Kenya.jpg",
    organizer: { name: "Cycle Meru" },
    feeStructure: [
      { name: "Participant Registration", price: 1000, type: "Ticket" },
      { name: "Spectator Entry", type: "Free" },
    ],
    isFree: false,
    durationMinutes: 240,
    contact: "register@cyclemeru.org",
  },
  {
    eventId: "sp_005",
    title: "World Cup Qualifier Screening: Kenya vs Nigeria",
    category: "Sports",
    date: "2025-11-17T19:00:00.000Z",
    location: { name: "Town Arena Viewing Zone", city: null },
    description:
      "Catch the national team in action on a massive screen, complete with DJ mixes and match analysis.",
    imageUrl:
      "https://www.cafonline.com/media/etnbsigc/daniel-kolocho-bameyi-of-nigeria-challenges-lawrence-ouma-okoth-of-kenya-during-the-2025-africa-cup-of-nations-u20-match-between-nigeria-and-kenya.jpg",
    organizer: { name: "Fans United Kenya" },
    feeStructure: [{ name: "Entry Pass", price: 300, type: "Ticket" }],
    isFree: false,
    durationMinutes: 180,
    contact: null,
  },
  {
    eventId: "sp_006",
    title: "Local Athletics Meet: Meru County Finals",
    category: "Sports",
    date: "2025-12-18T09:00:00.000Z",
    location: { name: "Meru Sports Grounds", city: null },
    description:
      "Track and field competition featuring Meru’s fastest sprinters, long-distance runners, and jumpers.",
    imageUrl:
      "https://assets.aws.worldathletics.org/large/dc16a920-4f36-4470-8e1e-f20a2145d0d9.jpg",
    organizer: { name: "Meru Athletics Federation" },
    feeStructure: [{ name: "Free Entry", type: "Free" }],
    isFree: true,
    durationMinutes: 360,
    contact: "info@meruathletics.com",
  },
  // --- CATEGORY 8: OFFERS AROUND (Local Deals & Promotions) ---
  {
    eventId: "of_001",
    title: "Weekend Brunch Deal at Checkmate Hotel",
    category: "Offers & Discounts",
    date: "2025-11-08T09:00:00.000Z",
    location: { name: "Shadenet Hotel, Meru", city: "Meru" },
    description:
      "Enjoy 20% off our signature weekend brunch buffet. Perfect for families, couples, or business meet-ups.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwVk34Dt725Ld8pDYBBzlZZgnEbFBcjvwcnQ&s",
    organizer: { name: "Shadenet Hotel" },
    feeStructure: [
      { name: "Brunch Buffet", price: 1200, type: "Offer" },
      { name: "Kids Menu", price: 600, type: "Offer" },
    ],
    isFree: false,
    durationMinutes: 180,
    contact: "hotelshadenet@gmail.com",
  },
  {
    eventId: "of_002",
    title: "Local Market Pop-Up — Handmade Crafts & Discounts",
    category: "Offers & Discounts",
    date: "2025-11-15T08:00:00.000Z",
    location: { name: "Meru Open Market", city: "Meru" },
    description:
      "Discover amazing local crafts, organic produce, and fashion deals with up to 50% off.",
    imageUrl:
      "https://cdn.sanity.io/images/rizm0do5/production/5469daa81f78c3c11d49493aeda88ea4d317e958-1440x803.jpg",
    organizer: { name: "Meru Market Committee" },
    feeStructure: [{ name: "Free Entry", type: "Free" }],
    isFree: true,
    durationMinutes: 360,
    contact: "info@merumarket.org",
  },
  {
    eventId: "of_003",
    title: "Spa & Wellness Offer — 2 for 1 Package",
    category: "Offers & Discounts",
    date: "2025-11-12T10:00:00.000Z",
    location: { name: "City Glow Spa", city: "Meru" }, // Added city
    feeStructure: [{ name: "2-for-1 Spa Package", price: 3000, type: "Offer" }],
    isFree: false,
    description:
      "Pamper yourself and a loved one with our exclusive two-for-one massage and sauna package this week only.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQgA3_VoA6HwKbtOkLG6lzFH911yax9Acp7A&s",
    organizer: { name: "City Glow Spa" },
    durationMinutes: 120,
    contact: "contact@cityglowspa.com",
  },
  {
    eventId: "of_004",
    title: "Holiday Travel Discounts — Explore Kenya",
    category: "Offers & Discounts",
    date: "2025-12-01T00:00:00.000Z",
    location: { name: "Online Booking", city: null },
    description:
      "Save up to 30% on group travel and weekend getaways across Kenya. Limited-time holiday deals!",
    imageUrl:
      "https://perfectjourney.co.ke/wp-content/uploads/Amboseli-Package.jpeg",
    organizer: { name: "VibeLink Travel Deals" },
    feeStructure: [{ name: "Discounted Trip Packages", type: "Offer" }],
    isFree: true,
    durationMinutes: 1440,
    contact: "travel@vibelink.com",
  },
  {
    eventId: "of_005",
    title: "Student Wednesday at Coffee House",
    category: "Offers & Discounts",
    date: "2025-11-19T12:00:00.000Z",
    location: { name: "Campus Coffee House", city: "Meru" }, // Added city
    feeStructure: [{ name: "Student Discount", type: "Offer" }],
    isFree: true,
    description:
      "All university students get 25% off drinks every Wednesday — just show your student ID.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQky2SEf0lojqT_rQLQyFlLEXhIe9ltnGfRYg&s",
    organizer: { name: "Campus Coffee House" },
    durationMinutes: 360,
    contact: "campuscoffee.meru@gmail.com", // Added contact
  },
];

export default events;
