import type {
  Amenity,
  AppState,
  Attraction,
  City,
  Neighborhood,
  PriceProfile,
  ScoreProfile,
  Testimonial,
  TravelerLabel
} from '@/types/domain';

const scoreDefaults: Record<keyof ScoreProfile, number> = {
  safety: 1.35,
  transport: 1.2,
  walkability: 1.1,
  foodAccess: 1.0,
  tourismProximity: 1.05,
  budgetFit: 1.15,
  familyFriendliness: 1.05,
  quietness: 0.9,
  workInternet: 0.95,
  nightlife: 0.85,
  emergencyAccess: 1.2,
  greenAreas: 0.75,
  airportAccess: 0.7,
  halalFood: 0.8,
  coworkingAccess: 0.85,
  shopping: 0.7,
  culturalAccess: 1.0
};

const cities: City[] = [
  {
    slug: 'tashkent',
    name: 'Tashkent',
    country: 'Uzbekistan',
    region: 'Capital Region',
    overview:
      'Uzbekistan’s capital combines broad boulevards, strong transport access, modern hotels, and a reliable service network. It is the most practical base for first-time visitors who want comfort and structure.',
    heroTagline: 'Urban comfort, dependable transport, and the widest service network in the country.',
    bestTimeToVisit: 'March to May, and late September to early November',
    averageDailyBudget: { budget: 42, balanced: 82, premium: 170 },
    transportOverview:
      'Metro lines, ride-hailing, and wide arterial roads make Tashkent the most transport-comfortable city in the seed set.',
    comfortSummary:
      'Best overall for travelers who want balanced convenience, predictable transit, and good airport access.',
    travelerCategories: ['Business travelers', 'Families', 'First-time visitors', 'Remote workers'],
    zones: ['City Center', 'Mirabad', 'Yunusabad', 'Chilonzor', 'Tashkent South'],
    highlights: ['Strong metro coverage', 'Best airport access', 'Great for meetings and mixed-purpose trips'],
    emergencyAccess: 'Hospitals, pharmacies, and ATMs are dense across the central belt.',
    latitude: 41.2995,
    longitude: 69.2401
  },
  {
    slug: 'samarkand',
    name: 'Samarkand',
    country: 'Uzbekistan',
    region: 'Sogdiana Corridor',
    overview:
      'Samarkand is ideal for culture-led trips, with an elegant historic core, practical guesthouse clusters, and a compact layout that suits leisurely sightseeing.',
    heroTagline: 'Historic depth with an easy sightseeing rhythm.',
    bestTimeToVisit: 'April to June, and September to October',
    averageDailyBudget: { budget: 34, balanced: 68, premium: 145 },
    transportOverview:
      'Taxis and short rides are the norm; the center is compact and walkable around the key heritage districts.',
    comfortSummary:
      'Best for travelers prioritizing cultural proximity, easy walking, and a slower pace.',
    travelerCategories: ['Cultural tourists', 'Couples', 'Small groups', 'Family city-breaks'],
    zones: ['Registan Quarter', 'Siab Bazaar', 'University District', 'Amir Temur Avenue'],
    highlights: ['World-class monuments', 'Compact center', 'Strong food and guesthouse options'],
    emergencyAccess: 'Core health and pharmacy services are concentrated near the central avenues.',
    latitude: 39.6542,
    longitude: 66.9597
  },
  {
    slug: 'bukhara',
    name: 'Bukhara',
    country: 'Uzbekistan',
    region: 'Historic Oasis Belt',
    overview:
      'Bukhara offers one of the most atmospheric old towns in Central Asia, with calm streets, heritage hotels, and a highly legible visitor experience.',
    heroTagline: 'Quiet heritage stays and a refined old-city atmosphere.',
    bestTimeToVisit: 'March to May, and September to November',
    averageDailyBudget: { budget: 30, balanced: 61, premium: 132 },
    transportOverview:
      'The old town is best explored on foot, while taxis connect the station, newer districts, and outer attractions.',
    comfortSummary:
      'Excellent for travelers who value peace, historical immersion, and compact planning.',
    travelerCategories: ['Heritage travelers', 'Quiet travelers', 'Luxury leisure', 'Photo-focused travelers'],
    zones: ['Lyabi-Hauz', 'Po-i-Kalyan', 'Old City South', 'Kogon Gateway'],
    highlights: ['Quiet evenings', 'Excellent old-city atmosphere', 'Good halal food availability'],
    emergencyAccess: 'Best services sit near the modern roads outside the oldest lanes.',
    latitude: 39.7747,
    longitude: 64.4286
  },
  {
    slug: 'khiva',
    name: 'Khiva',
    country: 'Uzbekistan',
    region: 'Khorezm Heritage Ring',
    overview:
      'Khiva is a tightly preserved heritage city where the main concern is balancing immersive history with practical access, especially after dark.',
    heroTagline: 'Immersive, intimate, and carefully planned.',
    bestTimeToVisit: 'April to June, and September to early November',
    averageDailyBudget: { budget: 28, balanced: 56, premium: 118 },
    transportOverview:
      'The walkable old city is the core experience; transport matters mainly for arrival, departure, and outer-day trips.',
    comfortSummary:
      'Best for heritage-focused travelers who accept a slower, more intimate city structure.',
    travelerCategories: ['History enthusiasts', 'Slow travelers', 'Couples', 'Photographers'],
    zones: ['Ichan Kala Edge', 'Dishan Kala', 'Pakhlavan Makhmud District', 'Riverside Quarter'],
    highlights: ['Deep heritage immersion', 'Very walkable old town', 'Strong cultural character'],
    emergencyAccess: 'Modern services are slightly more spread out than in larger cities.',
    latitude: 41.3785,
    longitude: 60.3598
  }
];

const neighborhoods: Neighborhood[] = [
  {
    slug: 'tashkent-city-center',
    citySlug: 'tashkent',
    name: 'City Center',
    tagline: 'Best overall balance',
    summary:
      'Formal hotels, the most predictable transit grid, and broad access to business services, restaurants, and emergency support make this the most balanced base in the capital.',
    bestFor: ['First-time visitors', 'Business travelers', 'Short stays'],
    tradeoffs: ['Slightly higher prices than outer districts', 'Less intimate atmosphere'],
    vibe: 'Polished, active, and practical',
    priceTier: 'balanced' as const,
    nearbyLandmarks: ['Amir Temur Square', 'Broadway Promenade', 'State Museum Cluster'],
    latitude: 41.3112,
    longitude: 69.2797,
    transitNotes: 'Strong metro access, frequent taxis, and easy airport connections.',
    dailyBudget: { budget: 46, balanced: 88, premium: 182 },
    scores: {
      safety: 82,
      transport: 94,
      walkability: 78,
      foodAccess: 91,
      tourismProximity: 84,
      budgetFit: 72,
      familyFriendliness: 78,
      quietness: 58,
      workInternet: 93,
      nightlife: 74,
      emergencyAccess: 96,
      greenAreas: 63,
      airportAccess: 90,
      halalFood: 76,
      coworkingAccess: 92,
      shopping: 88,
      culturalAccess: 80
    },
    amenities: ['tashkent-city-center-hotel', 'tashkent-city-center-pharmacy', 'tashkent-city-center-atm'],
    attractions: ['tashkent-amir-temur-square', 'tashkent-broadway', 'tashkent-museum-cluster'],
    foodNotes: 'Large spread of cafes, international restaurants, and reliable breakfast options.',
    safetyNotes: 'High visibility, good lighting, and strong weekday foot traffic.',
    internetNotes: 'Best connectivity profile in the network with many coworking-friendly hotels.'
  },
  {
    slug: 'tashkent-mirabad',
    citySlug: 'tashkent',
    name: 'Mirabad',
    tagline: 'Airport-friendly and calm',
    summary:
      'Mirabad gives a calmer residential feel while keeping the airport, major roads, and daily services within easy reach. It suits travelers who prefer balance over bustle.',
    bestFor: ['Families', 'Transit-conscious travelers', 'Longer city stays'],
    tradeoffs: ['Less nightlife than the city center', 'Fewer landmark streets on foot'],
    vibe: 'Residential, calm, dependable',
    priceTier: 'balanced' as const,
    nearbyLandmarks: ['Tashkent Railway Station', 'Mirobod Market', 'Airport corridor'],
    latitude: 41.2915,
    longitude: 69.2845,
    transitNotes: 'Short rides to most districts and easy station/airport access.',
    dailyBudget: { budget: 41, balanced: 79, premium: 158 },
    scores: {
      safety: 86,
      transport: 89,
      walkability: 72,
      foodAccess: 80,
      tourismProximity: 71,
      budgetFit: 75,
      familyFriendliness: 88,
      quietness: 76,
      workInternet: 84,
      nightlife: 52,
      emergencyAccess: 92,
      greenAreas: 66,
      airportAccess: 95,
      halalFood: 81,
      coworkingAccess: 80,
      shopping: 73,
      culturalAccess: 68
    },
    amenities: ['mirabad-hotel', 'mirabad-pharmacy', 'mirabad-supermarket'],
    attractions: ['tashkent-railway-museum', 'tashkent-mirobod-market'],
    foodNotes: 'Comfortable neighborhood eateries, bakeries, and practical family dining.',
    safetyNotes: 'Residential and orderly, with good service coverage after dark.',
    internetNotes: 'Reliable hotel Wi-Fi and business-grade connectivity in newer properties.'
  },
  {
    slug: 'tashkent-yunusabad',
    citySlug: 'tashkent',
    name: 'Yunusabad',
    tagline: 'Shopping and modern convenience',
    summary:
      'Yunusabad is a good fit for travelers who want malls, cafes, parks, and newer apartment-style accommodation with a calm but modern feel.',
    bestFor: ['Families', 'Shopping trips', 'Medium-length stays'],
    tradeoffs: ['A little less central for heritage sightseeing', 'Trips to old-city sites require taxis'],
    vibe: 'Modern, spacious, family-friendly',
    priceTier: 'balanced' as const,
    nearbyLandmarks: ['Minor Mosque', 'Yunusabad Park', 'Mega Mall district'],
    latitude: 41.3626,
    longitude: 69.2895,
    transitNotes: 'Metro and taxi connections are good, especially for north and central routes.',
    dailyBudget: { budget: 38, balanced: 76, premium: 160 },
    scores: {
      safety: 84,
      transport: 86,
      walkability: 70,
      foodAccess: 82,
      tourismProximity: 68,
      budgetFit: 78,
      familyFriendliness: 91,
      quietness: 74,
      workInternet: 87,
      nightlife: 48,
      emergencyAccess: 90,
      greenAreas: 79,
      airportAccess: 79,
      halalFood: 83,
      coworkingAccess: 81,
      shopping: 92,
      culturalAccess: 62
    },
    amenities: ['yunusabad-supermarket', 'yunusabad-coworking', 'yunusabad-park'],
    attractions: ['yunusabad-minor-mosque', 'yunusabad-park'],
    foodNotes: 'Strong cafe chain presence and convenient family-friendly dining.',
    safetyNotes: 'Well-serviced residential streets and modern public-facing buildings.',
    internetNotes: 'Good for remote work and hybrid-business travelers.'
  },
  {
    slug: 'tashkent-chilonzor',
    citySlug: 'tashkent',
    name: 'Chilonzor',
    tagline: 'Value with local character',
    summary:
      'Chilonzor is one of the best value options in Tashkent, with access to metro lines, local markets, and a more everyday neighborhood texture.',
    bestFor: ['Budget travelers', 'Long stays', 'Travelers who prefer local texture'],
    tradeoffs: ['Less polished than central zones', 'Accommodation quality varies more'],
    vibe: 'Local, practical, energetic',
    priceTier: 'budget' as const,
    nearbyLandmarks: ['Chilonzor Bazaar', 'Local metro ring', 'Neighborhood parks'],
    latitude: 41.2763,
    longitude: 69.2031,
    transitNotes: 'Good metro access and simple links to central districts.',
    dailyBudget: { budget: 29, balanced: 61, premium: 128 },
    scores: {
      safety: 74,
      transport: 81,
      walkability: 66,
      foodAccess: 76,
      tourismProximity: 60,
      budgetFit: 92,
      familyFriendliness: 72,
      quietness: 63,
      workInternet: 72,
      nightlife: 44,
      emergencyAccess: 82,
      greenAreas: 59,
      airportAccess: 67,
      halalFood: 79,
      coworkingAccess: 63,
      shopping: 74,
      culturalAccess: 58
    },
    amenities: ['chilonzor-bazaar', 'chilonzor-supermarket', 'chilonzor-metro'],
    attractions: ['chilonzor-local-market'],
    foodNotes: 'More affordable local restaurants with straightforward halal options.',
    safetyNotes: 'Good in main corridors, more variable in side streets at night.',
    internetNotes: 'Solid enough for most travelers, though less premium than central hotels.'
  },
  {
    slug: 'samarkand-registan-quarter',
    citySlug: 'samarkand',
    name: 'Registan Quarter',
    tagline: 'Prime heritage access',
    summary:
      'This is the most iconic stay area for visitors who want the monuments, calm evening walks, and premium historic atmosphere within easy reach.',
    bestFor: ['Cultural tourists', 'Short-stay visitors', 'Premium leisure travelers'],
    tradeoffs: ['Higher rates near the monuments', 'Tourist density at peak hours'],
    vibe: 'Monumental, refined, immersive',
    priceTier: 'premium' as const,
    nearbyLandmarks: ['Registan Square', 'Tilya-Kori', 'Ulugh Beg Madrasa'],
    latitude: 39.6547,
    longitude: 66.9751,
    transitNotes: 'Best experienced on foot or with short taxi hops.',
    dailyBudget: { budget: 39, balanced: 74, premium: 162 },
    scores: {
      safety: 84,
      transport: 70,
      walkability: 92,
      foodAccess: 88,
      tourismProximity: 98,
      budgetFit: 58,
      familyFriendliness: 74,
      quietness: 66,
      workInternet: 78,
      nightlife: 42,
      emergencyAccess: 81,
      greenAreas: 52,
      airportAccess: 63,
      halalFood: 90,
      coworkingAccess: 62,
      shopping: 66,
      culturalAccess: 99
    },
    amenities: ['registan-hotel', 'registan-pharmacy', 'registan-atm'],
    attractions: ['registan-square', 'ulugh-beg-madrasa', 'tilya-kori-madrasa'],
    foodNotes: 'Excellent access to classic Uzbek restaurants and refined tea houses.',
    safetyNotes: 'Heavy visitor presence keeps the area visible and generally predictable.',
    internetNotes: 'Good in upgraded hotels, though not as strong as Tashkent business districts.'
  },
  {
    slug: 'samarkand-siab-bazaar',
    citySlug: 'samarkand',
    name: 'Siab Bazaar',
    tagline: 'Food-led and authentic',
    summary:
      'A lively choice for travelers who want markets, food culture, and easy access to local daily life while still staying close to the historic center.',
    bestFor: ['Food travelers', 'Budget-conscious couples', 'Cultural explorers'],
    tradeoffs: ['Early market activity can be busy', 'Less quiet than heritage hotel lanes'],
    vibe: 'Authentic, fragrant, lively',
    priceTier: 'balanced' as const,
    nearbyLandmarks: ['Siab Bazaar', 'Bibi-Khanym Mosque', 'Shah-i-Zinda approach'],
    latitude: 39.6557,
    longitude: 67.0101,
    transitNotes: 'Taxis are easy to find and the old town is within reasonable reach.',
    dailyBudget: { budget: 32, balanced: 66, premium: 136 },
    scores: {
      safety: 77,
      transport: 71,
      walkability: 81,
      foodAccess: 95,
      tourismProximity: 86,
      budgetFit: 81,
      familyFriendliness: 70,
      quietness: 60,
      workInternet: 69,
      nightlife: 39,
      emergencyAccess: 74,
      greenAreas: 56,
      airportAccess: 64,
      halalFood: 94,
      coworkingAccess: 58,
      shopping: 77,
      culturalAccess: 90
    },
    amenities: ['siab-market', 'siab-pharmacy', 'siab-supermarket'],
    attractions: ['siab-bazaar', 'bibikhanym-mosque'],
    foodNotes: 'One of the best areas for breakfast, bread, fruit, and street-side snacks.',
    safetyNotes: 'Busy and visible during the day, with a calmer evening rhythm.',
    internetNotes: 'Adequate for travel use, though less ideal for heavy remote work.'
  },
  {
    slug: 'samarkand-university-district',
    citySlug: 'samarkand',
    name: 'University District',
    tagline: 'Calm, modern, and practical',
    summary:
      'A sensible option for visitors who want quieter streets, modern lodging, and dependable everyday services while still remaining close to the center.',
    bestFor: ['Families', 'Longer stays', 'Remote workers'],
    tradeoffs: ['Less immediate heritage atmosphere', 'Requires short rides for top monuments'],
    vibe: 'Orderly, quiet, livable',
    priceTier: 'balanced' as const,
    nearbyLandmarks: ['University corridor', 'Green boulevards', 'Local cafes'],
    latitude: 39.6767,
    longitude: 66.9496,
    transitNotes: 'Taxis and city buses connect easily to the old core.',
    dailyBudget: { budget: 29, balanced: 60, premium: 125 },
    scores: {
      safety: 83,
      transport: 78,
      walkability: 73,
      foodAccess: 74,
      tourismProximity: 62,
      budgetFit: 86,
      familyFriendliness: 88,
      quietness: 84,
      workInternet: 86,
      nightlife: 34,
      emergencyAccess: 82,
      greenAreas: 75,
      airportAccess: 60,
      halalFood: 84,
      coworkingAccess: 77,
      shopping: 63,
      culturalAccess: 66
    },
    amenities: ['samarkand-university-hotel', 'samarkand-university-coworking', 'samarkand-university-pharmacy'],
    attractions: ['samarkand-university-park'],
    foodNotes: 'Solid neighborhood restaurants and practical cafes around the campus axis.',
    safetyNotes: 'Measured and calm, with residential rhythms that suit longer stays.',
    internetNotes: 'Good for work-focused stays and hotel-based remote work.'
  },
  {
    slug: 'samarkand-amir-temur-avenue',
    citySlug: 'samarkand',
    name: 'Amir Temur Avenue',
    tagline: 'Convenient central access',
    summary:
      'The avenue links business hotels, transit, and city services with quick access to the main heritage belt. It is the safest bet for mixed-purpose trips.',
    bestFor: ['Families', 'Business + leisure', 'Travelers wanting ease'],
    tradeoffs: ['Slightly more traffic exposure', 'Less atmospheric than the old lanes'],
    vibe: 'Central, efficient, composed',
    priceTier: 'balanced' as const,
    nearbyLandmarks: ['Amir Temur monument area', 'Central park access', 'Museum corridor'],
    latitude: 39.6509,
    longitude: 66.9612,
    transitNotes: 'Simple transfers by taxi and decent access to the city grid.',
    dailyBudget: { budget: 35, balanced: 72, premium: 145 },
    scores: {
      safety: 81,
      transport: 86,
      walkability: 77,
      foodAccess: 83,
      tourismProximity: 80,
      budgetFit: 74,
      familyFriendliness: 82,
      quietness: 69,
      workInternet: 84,
      nightlife: 46,
      emergencyAccess: 88,
      greenAreas: 67,
      airportAccess: 70,
      halalFood: 86,
      coworkingAccess: 82,
      shopping: 79,
      culturalAccess: 77
    },
    amenities: ['samarkand-avenue-hotel', 'samarkand-avenue-supermarket', 'samarkand-avenue-atm'],
    attractions: ['samarkand-museum-corridor'],
    foodNotes: 'Varied dining with easier access to international and halal-friendly options.',
    safetyNotes: 'Busy, formal, and easy to navigate for new arrivals.',
    internetNotes: 'Balanced choice for work and leisure with dependable infrastructure.'
  },
  {
    slug: 'bukhara-lyabi-hauz',
    citySlug: 'bukhara',
    name: 'Lyabi-Hauz',
    tagline: 'Atmospheric heritage core',
    summary:
      'The emotional center of a Bukhara trip, with a calm waterfront feel, memorable stays, and the strongest pedestrian experience in the city.',
    bestFor: ['Heritage travelers', 'Couples', 'Slow travel'],
    tradeoffs: ['Higher premium on the most desirable streets', 'Limited vehicle access'],
    vibe: 'Elegant, quiet, historic',
    priceTier: 'premium' as const,
    nearbyLandmarks: ['Lyabi-Hauz', 'Historic teahouses', 'Old madrasas'],
    latitude: 39.7764,
    longitude: 64.4185,
    transitNotes: 'Walkable core with taxi access from the perimeter roads.',
    dailyBudget: { budget: 31, balanced: 65, premium: 138 },
    scores: {
      safety: 86,
      transport: 67,
      walkability: 96,
      foodAccess: 87,
      tourismProximity: 98,
      budgetFit: 62,
      familyFriendliness: 76,
      quietness: 88,
      workInternet: 73,
      nightlife: 31,
      emergencyAccess: 75,
      greenAreas: 49,
      airportAccess: 58,
      halalFood: 91,
      coworkingAccess: 52,
      shopping: 61,
      culturalAccess: 99
    },
    amenities: ['lyabi-hauz-hotel', 'lyabi-hauz-mosque', 'lyabi-hauz-pharmacy'],
    attractions: ['lyabi-hauz', 'nadir-divan-begi', 'chor-minor'],
    foodNotes: 'Strong tea house and traditional dining culture with reliable halal options.',
    safetyNotes: 'Visitor-friendly and well known, with a calm evening setting.',
    internetNotes: 'Comfortable in higher-end guesthouses, though not a work-first district.'
  },
  {
    slug: 'bukhara-old-city-south',
    citySlug: 'bukhara',
    name: 'Old City South',
    tagline: 'Quiet and immersive',
    summary:
      'A slightly quieter old-town segment for visitors who want direct heritage access while reducing the bustle around the busiest central squares.',
    bestFor: ['Quiet travelers', 'Longer stays', 'Cultural learners'],
    tradeoffs: ['Narrow lanes and fewer service options', 'Less nightlife and shopping'],
    vibe: 'Tranquil, intimate, local',
    priceTier: 'balanced' as const,
    nearbyLandmarks: ['Residential old-city lanes', 'Historic courtyards', 'Small museums'],
    latitude: 39.7707,
    longitude: 64.4134,
    transitNotes: 'Best navigated by walking and short taxi trips from the edge roads.',
    dailyBudget: { budget: 28, balanced: 58, premium: 122 },
    scores: {
      safety: 82,
      transport: 62,
      walkability: 91,
      foodAccess: 76,
      tourismProximity: 90,
      budgetFit: 80,
      familyFriendliness: 74,
      quietness: 91,
      workInternet: 69,
      nightlife: 20,
      emergencyAccess: 70,
      greenAreas: 44,
      airportAccess: 54,
      halalFood: 88,
      coworkingAccess: 45,
      shopping: 54,
      culturalAccess: 97
    },
    amenities: ['bukhara-old-city-hotel', 'bukhara-old-city-supermarket', 'bukhara-old-city-pharmacy'],
    attractions: ['bukhara-old-courtyard', 'bukharan-archive-house'],
    foodNotes: 'Traditional set menus and quiet family-run dining rooms.',
    safetyNotes: 'Very calm after sunset, but services are less dense than on the main ring.',
    internetNotes: 'Usable for travel planning, not a primary work hub.'
  },
  {
    slug: 'bukhara-kogon-gateway',
    citySlug: 'bukhara',
    name: 'Kogon Gateway',
    tagline: 'Practical arrival base',
    summary:
      'This outer area is useful for train arrivals, value accommodation, and travelers who want easy entry logistics before heading into the historic core.',
    bestFor: ['Budget travelers', 'Transit arrivals', 'Long-distance rail travelers'],
    tradeoffs: ['Less atmospheric than the old town', 'Requires transport to heritage sites'],
    vibe: 'Practical, quiet, functional',
    priceTier: 'budget' as const,
    nearbyLandmarks: ['Kogon station corridor', 'Modern markets', 'Residential roads'],
    latitude: 39.7362,
    longitude: 64.4461,
    transitNotes: 'Convenient for arrivals and intercity departures; use taxis for old-town visits.',
    dailyBudget: { budget: 24, balanced: 50, premium: 104 },
    scores: {
      safety: 76,
      transport: 84,
      walkability: 69,
      foodAccess: 65,
      tourismProximity: 54,
      budgetFit: 94,
      familyFriendliness: 68,
      quietness: 79,
      workInternet: 66,
      nightlife: 16,
      emergencyAccess: 79,
      greenAreas: 41,
      airportAccess: 55,
      halalFood: 83,
      coworkingAccess: 42,
      shopping: 58,
      culturalAccess: 49
    },
    amenities: ['kogon-station-hotel', 'kogon-supermarket', 'kogon-pharmacy'],
    attractions: ['kogon-station'],
    foodNotes: 'Straightforward value meals and practical halal choices.',
    safetyNotes: 'Quiet and orderly, though less vibrant than the heritage center.',
    internetNotes: 'Serviceable hotel connectivity with fewer premium options.'
  },
  {
    slug: 'khiva-ichan-kala-edge',
    citySlug: 'khiva',
    name: 'Ichan Kala Edge',
    tagline: 'Immersive heritage stay',
    summary:
      'The best stay zone for travelers who want to step directly into the old city atmosphere while keeping restaurants and the main gates at hand.',
    bestFor: ['History lovers', 'Couples', 'Signature first visits'],
    tradeoffs: ['Smaller room inventory', 'Very tourist-oriented pricing near peak dates'],
    vibe: 'Compact, romantic, timeless',
    priceTier: 'premium' as const,
    nearbyLandmarks: ['Ichan Kala gates', 'Old ramparts', 'Central monuments'],
    latitude: 41.3784,
    longitude: 60.3604,
    transitNotes: 'The area is highly walkable; transport mainly matters for arrivals and outer excursions.',
    dailyBudget: { budget: 26, balanced: 54, premium: 112 },
    scores: {
      safety: 83,
      transport: 58,
      walkability: 97,
      foodAccess: 79,
      tourismProximity: 99,
      budgetFit: 69,
      familyFriendliness: 70,
      quietness: 87,
      workInternet: 61,
      nightlife: 18,
      emergencyAccess: 68,
      greenAreas: 37,
      airportAccess: 50,
      halalFood: 89,
      coworkingAccess: 35,
      shopping: 46,
      culturalAccess: 100
    },
    amenities: ['khiva-ichan-kala-hotel', 'khiva-ichan-kala-pharmacy', 'khiva-ichan-kala-atm'],
    attractions: ['ichan-kala-gates', 'kalta-minor', 'pakhlavan-mahmud-complex'],
    foodNotes: 'Tea houses and traditional kitchens are very close to the main sights.',
    safetyNotes: 'Tourist-visible and straightforward to navigate during active hours.',
    internetNotes: 'Comfortable for standard use, but not the strongest for heavy work.'
  },
  {
    slug: 'khiva-dishan-kala',
    citySlug: 'khiva',
    name: 'Dishan Kala',
    tagline: 'Local-value balance',
    summary:
      'A useful outer-ring choice for travelers who want lower prices, more everyday local character, and a short walk or ride into the old town.',
    bestFor: ['Budget travelers', 'Long stays', 'Independent travelers'],
    tradeoffs: ['Less cinematic than the inner ring', 'Services are more spread out'],
    vibe: 'Local, measured, practical',
    priceTier: 'budget' as const,
    nearbyLandmarks: ['Outer bazaars', 'Residential lanes', 'Local schools and clinics'],
    latitude: 41.3822,
    longitude: 60.3519,
    transitNotes: 'Simple taxi hop to the old city and good access to arrival roads.',
    dailyBudget: { budget: 21, balanced: 45, premium: 96 },
    scores: {
      safety: 75,
      transport: 69,
      walkability: 77,
      foodAccess: 68,
      tourismProximity: 72,
      budgetFit: 96,
      familyFriendliness: 66,
      quietness: 82,
      workInternet: 58,
      nightlife: 12,
      emergencyAccess: 71,
      greenAreas: 33,
      airportAccess: 51,
      halalFood: 81,
      coworkingAccess: 28,
      shopping: 53,
      culturalAccess: 68
    },
    amenities: ['khiva-dishan-kala-supermarket', 'khiva-dishan-kala-pharmacy', 'khiva-dishan-kala-atm'],
    attractions: ['khiva-dishan-kala-market'],
    foodNotes: 'Small family restaurants and value-oriented meals.',
    safetyNotes: 'Quiet and manageable, with fewer late-night services.',
    internetNotes: 'Fine for light travel use, less suited to work-intensive stays.'
  },
  {
    slug: 'khiva-riverside-quarter',
    citySlug: 'khiva',
    name: 'Riverside Quarter',
    tagline: 'Relaxed and scenic',
    summary:
      'A looser, quieter option that works well for visitors who want scenic downtime and a softer pace between heritage visits.',
    bestFor: ['Slow travelers', 'Photographers', 'Families'],
    tradeoffs: ['Fewer dining choices', 'Not as immediate to the most famous gates'],
    vibe: 'Soft, reflective, low-key',
    priceTier: 'balanced' as const,
    nearbyLandmarks: ['River approach', 'Open viewpoints', 'Neighbourhood mosques'],
    latitude: 41.3719,
    longitude: 60.3668,
    transitNotes: 'Best for casual walking and short taxi transfers to Ichan Kala.',
    dailyBudget: { budget: 22, balanced: 47, premium: 102 },
    scores: {
      safety: 79,
      transport: 64,
      walkability: 73,
      foodAccess: 61,
      tourismProximity: 66,
      budgetFit: 88,
      familyFriendliness: 84,
      quietness: 92,
      workInternet: 57,
      nightlife: 10,
      emergencyAccess: 69,
      greenAreas: 58,
      airportAccess: 52,
      halalFood: 85,
      coworkingAccess: 24,
      shopping: 44,
      culturalAccess: 61
    },
    amenities: ['khiva-riverside-guesthouse', 'khiva-riverside-mosque', 'khiva-riverside-supermarket'],
    attractions: ['khiva-riverside-viewpoint'],
    foodNotes: 'Simple, dependable meals with occasional scenic seating.',
    safetyNotes: 'Quiet and comfortable, especially for travelers wanting a slower city rhythm.',
    internetNotes: 'Mostly adequate for messaging, research, and itinerary coordination.'
  }
];

const priceProfiles: PriceProfile[] = [
  {
    citySlug: 'tashkent',
    nightlyStay: { budget: 24, balanced: 58, premium: 132 },
    foodPerDay: { budget: 10, balanced: 22, premium: 48 },
    transportPerDay: { budget: 4, balanced: 9, premium: 18 },
    activityPerDay: { budget: 8, balanced: 18, premium: 38 },
    emergencyBufferPercent: 12
  },
  {
    citySlug: 'samarkand',
    nightlyStay: { budget: 20, balanced: 49, premium: 118 },
    foodPerDay: { budget: 9, balanced: 19, premium: 40 },
    transportPerDay: { budget: 3, balanced: 8, premium: 14 },
    activityPerDay: { budget: 7, balanced: 16, premium: 34 },
    emergencyBufferPercent: 11
  },
  {
    citySlug: 'bukhara',
    nightlyStay: { budget: 18, balanced: 44, premium: 104 },
    foodPerDay: { budget: 8, balanced: 17, premium: 36 },
    transportPerDay: { budget: 3, balanced: 7, premium: 13 },
    activityPerDay: { budget: 6, balanced: 15, premium: 32 },
    emergencyBufferPercent: 10
  },
  {
    citySlug: 'khiva',
    nightlyStay: { budget: 17, balanced: 41, premium: 96 },
    foodPerDay: { budget: 7, balanced: 15, premium: 31 },
    transportPerDay: { budget: 3, balanced: 6, premium: 12 },
    activityPerDay: { budget: 6, balanced: 13, premium: 28 },
    emergencyBufferPercent: 10
  }
];

const travelerLabels: TravelerLabel[] = [
  {
    id: 'first-time',
    name: 'First-time visitor',
    description: 'Wants reliability, easy navigation, and strong service coverage.',
    priorities: {
      safety: 1,
      transport: 1,
      tourismProximity: 0.9,
      emergencyAccess: 1.2,
      foodAccess: 0.8
    }
  },
  {
    id: 'family',
    name: 'Family trip',
    description: 'Looks for quiet streets, walkability, and practical services.',
    priorities: {
      safety: 1.2,
      familyFriendliness: 1.4,
      quietness: 1,
      transport: 0.8,
      emergencyAccess: 1.1
    }
  },
  {
    id: 'business',
    name: 'Business traveler',
    description: 'Needs transport, internet, coworking access, and efficient routes.',
    priorities: {
      transport: 1.2,
      workInternet: 1.4,
      coworkingAccess: 1.3,
      airportAccess: 1.1,
      safety: 1
    }
  },
  {
    id: 'culture',
    name: 'Culture seeker',
    description: 'Prioritizes heritage proximity, food, and neighborhood identity.',
    priorities: {
      tourismProximity: 1.4,
      culturalAccess: 1.4,
      foodAccess: 1,
      walkability: 1.1,
      quietness: 0.7
    }
  },
  {
    id: 'budget',
    name: 'Budget traveler',
    description: 'Balances affordability with basic comfort and useful transit.',
    priorities: {
      budgetFit: 1.5,
      transport: 1,
      foodAccess: 0.8,
      safety: 0.9
    }
  },
  {
    id: 'slow',
    name: 'Slow traveler',
    description: 'Wants a calm, stable, and comfortable base for longer stays.',
    priorities: {
      quietness: 1.4,
      familyFriendliness: 0.8,
      safety: 1.1,
      greenAreas: 1,
      workInternet: 0.8
    }
  }
];

const testimonials: Testimonial[] = [
  {
    id: 't1',
    citySlug: 'tashkent',
    travelerLabelId: 'business',
    name: 'Amina R.',
    title: 'Regional program manager',
    quote:
      'The city center recommendation matched my work trip exactly. The transport and emergency access details were reassuring and practical.',
    rating: 5
  },
  {
    id: 't2',
    citySlug: 'samarkand',
    travelerLabelId: 'culture',
    name: 'David M.',
    title: 'Cultural heritage visitor',
    quote:
      'The comparison between Registan and Siab Bazaar made it easy to choose a stay that felt immersive without being overwhelming.',
    rating: 5
  },
  {
    id: 't3',
    citySlug: 'bukhara',
    travelerLabelId: 'slow',
    name: 'Leyla S.',
    title: 'Slow-travel consultant',
    quote:
      'The platform explains tradeoffs honestly. It helped me choose a quieter district with enough services for a longer stay.',
    rating: 5
  },
  {
    id: 't4',
    citySlug: 'khiva',
    travelerLabelId: 'first-time',
    name: 'Thomas K.',
    title: 'First-time visitor',
    quote:
      'The itinerary and budget tools felt structured and official, which is exactly what I wanted before booking.',
    rating: 4
  }
];

const amenityTuples: Array<Omit<Amenity, 'id'>> = [
  {
    citySlug: 'tashkent',
    neighborhoodSlug: 'tashkent-city-center',
    name: 'Grand Meridian Hotel',
    category: 'accommodation',
    description: 'Premium business-friendly hotel with strong reception support.',
    latitude: 41.313,
    longitude: 69.281,
    radiusMeters: 500,
    address: 'City Center boulevard, Tashkent',
    openHours: '24/7'
  },
  {
    citySlug: 'tashkent',
    neighborhoodSlug: 'tashkent-city-center',
    name: 'Central Health Pharmacy',
    category: 'pharmacy',
    description: 'Reliable pharmacy with late opening hours.',
    latitude: 41.312,
    longitude: 69.284,
    radiusMeters: 360,
    address: 'Main avenue, Tashkent',
    openHours: '08:00-23:00'
  },
  {
    citySlug: 'tashkent',
    neighborhoodSlug: 'tashkent-city-center',
    name: 'City Core ATM Lounge',
    category: 'atm',
    description: 'Multiple ATMs inside a secure retail atrium.',
    latitude: 41.311,
    longitude: 69.279,
    radiusMeters: 280,
    address: 'Broadway promenade, Tashkent',
    openHours: '24/7'
  },
  {
    citySlug: 'tashkent',
    neighborhoodSlug: 'tashkent-mirabad',
    name: 'Mirabad Family Suites',
    category: 'accommodation',
    description: 'Quiet apartment-hotel option with family rooms.',
    latitude: 41.292,
    longitude: 69.287,
    radiusMeters: 420,
    address: 'Mirabad district, Tashkent',
    openHours: '24/7'
  },
  {
    citySlug: 'tashkent',
    neighborhoodSlug: 'tashkent-mirabad',
    name: 'Mirabad Clinic Pharmacy',
    category: 'pharmacy',
    description: 'Healthcare-oriented pharmacy near the residential core.',
    latitude: 41.291,
    longitude: 69.283,
    radiusMeters: 310,
    address: 'Mirabad road, Tashkent',
    openHours: '08:00-22:00'
  },
  {
    citySlug: 'tashkent',
    neighborhoodSlug: 'tashkent-mirabad',
    name: 'Airport Corridor Market',
    category: 'supermarket',
    description: 'Convenient daily supplies and travel essentials.',
    latitude: 41.289,
    longitude: 69.289,
    radiusMeters: 450,
    address: 'Airport approach road, Tashkent',
    openHours: '08:00-23:00'
  },
  {
    citySlug: 'samarkand',
    neighborhoodSlug: 'samarkand-registan-quarter',
    name: 'Heritage House Hotel',
    category: 'accommodation',
    description: 'Boutique stay facing the monument belt.',
    latitude: 39.655,
    longitude: 66.975,
    radiusMeters: 380,
    address: 'Registan Square, Samarkand',
    openHours: '24/7'
  },
  {
    citySlug: 'samarkand',
    neighborhoodSlug: 'samarkand-registan-quarter',
    name: 'Monument Pharmacy',
    category: 'pharmacy',
    description: 'Convenient pharmacy near the main heritage axis.',
    latitude: 39.655,
    longitude: 66.973,
    radiusMeters: 260,
    address: 'Registan passage, Samarkand',
    openHours: '08:00-22:00'
  },
  {
    citySlug: 'samarkand',
    neighborhoodSlug: 'samarkand-siab-bazaar',
    name: 'Siab Market Cafeteria',
    category: 'restaurant',
    description: 'Traditional lunch counter beside the bazaar.',
    latitude: 39.656,
    longitude: 67.01,
    radiusMeters: 280,
    address: 'Siab Bazaar, Samarkand',
    openHours: '07:00-19:00'
  },
  {
    citySlug: 'samarkand',
    neighborhoodSlug: 'samarkand-university-district',
    name: 'University Coworking Hall',
    category: 'coworking',
    description: 'Reliable work space with quiet desks and meeting rooms.',
    latitude: 39.677,
    longitude: 66.95,
    radiusMeters: 360,
    address: 'University Avenue, Samarkand',
    openHours: '09:00-21:00'
  },
  {
    citySlug: 'bukhara',
    neighborhoodSlug: 'bukhara-lyabi-hauz',
    name: 'Lyabi-Hauz Boutique Inn',
    category: 'accommodation',
    description: 'Refined guesthouse with heritage courtyards.',
    latitude: 39.776,
    longitude: 64.419,
    radiusMeters: 340,
    address: 'Lyabi-Hauz, Bukhara',
    openHours: '24/7'
  },
  {
    citySlug: 'bukhara',
    neighborhoodSlug: 'bukhara-lyabi-hauz',
    name: 'Historic Teahouse',
    category: 'cafe',
    description: 'Traditional tea room with late afternoon service.',
    latitude: 39.777,
    longitude: 64.418,
    radiusMeters: 220,
    address: 'Old city square, Bukhara',
    openHours: '09:00-22:00'
  },
  {
    citySlug: 'bukhara',
    neighborhoodSlug: 'bukhara-old-city-south',
    name: 'Old City South Pharmacy',
    category: 'pharmacy',
    description: 'Practical pharmacy on the outer lane.',
    latitude: 39.771,
    longitude: 64.413,
    radiusMeters: 290,
    address: 'South old town road, Bukhara',
    openHours: '08:00-21:00'
  },
  {
    citySlug: 'bukhara',
    neighborhoodSlug: 'bukhara-kogon-gateway',
    name: 'Kogon Arrival Hotel',
    category: 'accommodation',
    description: 'Value hotel near the rail approach.',
    latitude: 39.736,
    longitude: 64.446,
    radiusMeters: 400,
    address: 'Kogon gateway, Bukhara',
    openHours: '24/7'
  },
  {
    citySlug: 'khiva',
    neighborhoodSlug: 'khiva-ichan-kala-edge',
    name: 'Ichan Kala Gate Hotel',
    category: 'accommodation',
    description: 'Classic stay inside the heritage perimeter.',
    latitude: 41.378,
    longitude: 60.36,
    radiusMeters: 300,
    address: 'Ichan Kala entrance, Khiva',
    openHours: '24/7'
  },
  {
    citySlug: 'khiva',
    neighborhoodSlug: 'khiva-ichan-kala-edge',
    name: 'Gate Pharmacy',
    category: 'pharmacy',
    description: 'Accessible pharmacy near the gate route.',
    latitude: 41.379,
    longitude: 60.361,
    radiusMeters: 240,
    address: 'Old gate road, Khiva',
    openHours: '08:00-22:00'
  },
  {
    citySlug: 'khiva',
    neighborhoodSlug: 'khiva-dishan-kala',
    name: 'Dishan Kala Market',
    category: 'supermarket',
    description: 'Value market for staples and travel basics.',
    latitude: 41.382,
    longitude: 60.352,
    radiusMeters: 360,
    address: 'Outer ring road, Khiva',
    openHours: '08:00-22:00'
  },
  {
    citySlug: 'khiva',
    neighborhoodSlug: 'khiva-riverside-quarter',
    name: 'Riverside Mosque',
    category: 'mosque',
    description: 'Quiet cultural site used by visitors and locals alike.',
    latitude: 41.372,
    longitude: 60.367,
    radiusMeters: 260,
    address: 'Riverside lane, Khiva',
    openHours: '05:00-21:00'
  }
];

const attractionTuples: Array<Omit<Attraction, 'id'>> = [
  {
    citySlug: 'tashkent',
    neighborhoodSlug: 'tashkent-city-center',
    name: 'Amir Temur Square',
    category: 'historic',
    description: 'Major city landmark and public meeting point.',
    latitude: 41.3111,
    longitude: 69.2797,
    address: 'City Center, Tashkent',
    ticketHint: 'Free public square'
  },
  {
    citySlug: 'tashkent',
    neighborhoodSlug: 'tashkent-city-center',
    name: 'Broadway Promenade',
    category: 'market',
    description: 'Busy pedestrian zone with cafes, art, and casual evening walks.',
    latitude: 41.3099,
    longitude: 69.2784,
    address: 'Central boulevard, Tashkent',
    ticketHint: 'Free'
  },
  {
    citySlug: 'tashkent',
    neighborhoodSlug: 'tashkent-yunusabad',
    name: 'Minor Mosque',
    category: 'religious',
    description: 'Modern white mosque and calm sightseeing stop.',
    latitude: 41.3635,
    longitude: 69.2894,
    address: 'Yunusabad, Tashkent',
    ticketHint: 'Free'
  },
  {
    citySlug: 'samarkand',
    neighborhoodSlug: 'samarkand-registan-quarter',
    name: 'Registan Square',
    category: 'historic',
    description: 'The city’s most iconic monument ensemble.',
    latitude: 39.6541,
    longitude: 66.9752,
    address: 'Registan, Samarkand',
    ticketHint: 'Paid entry'
  },
  {
    citySlug: 'samarkand',
    neighborhoodSlug: 'samarkand-siab-bazaar',
    name: 'Siab Bazaar',
    category: 'market',
    description: 'Traditional market for fruit, bread, sweets, and everyday goods.',
    latitude: 39.6563,
    longitude: 67.0104,
    address: 'Near Bibi-Khanym, Samarkand',
    ticketHint: 'Free entry'
  },
  {
    citySlug: 'samarkand',
    neighborhoodSlug: 'samarkand-university-district',
    name: 'Central Park Belt',
    category: 'park',
    description: 'A calm green area used for relaxation between visits.',
    latitude: 39.6774,
    longitude: 66.9486,
    address: 'University district, Samarkand',
    ticketHint: 'Free'
  },
  {
    citySlug: 'bukhara',
    neighborhoodSlug: 'bukhara-lyabi-hauz',
    name: 'Lyabi-Hauz Basin',
    category: 'historic',
    description: 'The iconic water basin and social heart of the old town.',
    latitude: 39.7767,
    longitude: 64.4184,
    address: 'Lyabi-Hauz, Bukhara',
    ticketHint: 'Free'
  },
  {
    citySlug: 'bukhara',
    neighborhoodSlug: 'bukhara-lyabi-hauz',
    name: 'Nadir Divan-Begi Madrasah',
    category: 'historic',
    description: 'Decorative monument close to the central square.',
    latitude: 39.7769,
    longitude: 64.4189,
    address: 'Lyabi-Hauz area, Bukhara',
    ticketHint: 'Paid entry'
  },
  {
    citySlug: 'bukhara',
    neighborhoodSlug: 'bukhara-old-city-south',
    name: 'Chor Minor',
    category: 'historic',
    description: 'Distinctive four-tower monument in a quieter district lane.',
    latitude: 39.7712,
    longitude: 64.4122,
    address: 'Old City South, Bukhara',
    ticketHint: 'Paid or small fee'
  },
  {
    citySlug: 'khiva',
    neighborhoodSlug: 'khiva-ichan-kala-edge',
    name: 'Kalta Minor',
    category: 'historic',
    description: 'Distinctive turquoise minaret at the center of the old city.',
    latitude: 41.3788,
    longitude: 60.3607,
    address: 'Ichan Kala, Khiva',
    ticketHint: 'Included with heritage pass'
  },
  {
    citySlug: 'khiva',
    neighborhoodSlug: 'khiva-ichan-kala-edge',
    name: 'Pakhlavan Mahmoud Complex',
    category: 'religious',
    description: 'High-value heritage site and local pilgrimage destination.',
    latitude: 41.3782,
    longitude: 60.3596,
    address: 'Old city core, Khiva',
    ticketHint: 'Heritage pass applies'
  },
  {
    citySlug: 'khiva',
    neighborhoodSlug: 'khiva-riverside-quarter',
    name: 'Riverside Viewpoint',
    category: 'viewpoint',
    description: 'Scenic overlook for sunset and landscape photography.',
    latitude: 41.3718,
    longitude: 60.3676,
    address: 'Riverside quarter, Khiva',
    ticketHint: 'Free'
  }
];

const amenities = amenityTuples.map((item, index) => ({
  ...item,
  id: `amenity-${index + 1}`
}));

const attractions = attractionTuples.map((item, index) => ({
  ...item,
  id: `attraction-${index + 1}`
}));

export const seedState: AppState = {
  users: [
    {
      email: process.env.ADMIN_EMAIL ?? 'admin@touristcomfortfinder.gov',
      name: 'Platform Administrator',
      role: 'admin',
      password: process.env.ADMIN_PASSWORD ?? 'ChangeMe123!'
    },
    {
      email: process.env.TRAVELER_EMAIL ?? 'traveler@touristcomfortfinder.gov',
      name: 'Demo Traveler',
      role: 'traveler',
      password: process.env.TRAVELER_PASSWORD ?? 'Explore123!'
    }
  ],
  cities,
  neighborhoods,
  amenities,
  attractions,
  priceProfiles,
  scoreSettings: scoreDefaults,
  travelerLabels,
  testimonials,
  savedNeighborhoods: [],
  savedPlans: [],
  searchHistory: [],
  itineraries: [],
  adminActivityLog: []
};

export const seedMeta = {
  cities: cities.length,
  neighborhoods: neighborhoods.length,
  amenities: amenities.length,
  attractions: attractions.length
};
