// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY BILINGUAL CONTENT DICTIONARY
// Fully typed Malayalam (ml) & English (en) content matching Centenary identity
// ==============================================================================

export type Locale = 'en' | 'ml';

export interface ContentDictionary {
  brand: {
    name: string;
    tagline: string;
    years: string;
    emblemText: string;
  };
  nav: {
    home: string;
    about: string;
    liveHub: string;
    news: string;
    events: string;
    campaigns: string;
    media: string;
    journey: string;
    myParticipation: string;
    volunteerCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    watchLive: string;
    registerEvents: string;
    supportMission: string;
    becomeVolunteer: string;
    activeParticipantsBadge: string;
  };
  marqueeValues: string[];
  about: {
    sectionTag: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    exploreJourney: string;
    discoverInitiatives: string;
    wireframeCaption: string;
  };
  scholarship: {
    sectionTag: string;
    title: string;
    statement: string;
    closingInvitation: string;
    ctaHistory: string;
    ctaEducation: string;
    ctaVolunteer: string;
    cards: Array<{
      id: string;
      title: string;
      desc: string;
      tag: string;
    }>;
  };
  kpi: {
    title: string;
    subtitle: string;
    footnote: string;
    stats: Array<{
      id: string;
      count: string;
      label: string;
      org: string;
    }>;
  };
  leadership: {
    sectionTag: string;
    title: string;
    subtitle: string;
    leaders: Array<{
      id: string;
      name: string;
      role: string;
      bio: string;
      quote: string;
    }>;
  };
  impact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    stats: Array<{
      id: string;
      count: string;
      label: string;
      desc: string;
    }>;
    footnote: string;
    ctaSupport: string;
    ctaVolunteer: string;
    ctaCampaigns: string;
  };
  liveHub: {
    sectionTag: string;
    title: string;
    subtitle: string;
    statusLive: string;
    statusSoon: string;
    statusOffline: string;
    statusRecorded: string;
    currentBroadcastTitle: string;
    currentBroadcastSpeaker: string;
    currentBroadcastVenue: string;
    currentBroadcastLang: string;
    countdownLabel: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    announcementsTitle: string;
    announcements: Array<{
      id: string;
      time: string;
      text: string;
      tag: string;
    }>;
    venueGuidanceTitle: string;
    venueGuidanceText: string;
    recordingsTitle: string;
    btnWatch: string;
    btnReminder: string;
    btnRecordings: string;
  };
  news: {
    sectionTag: string;
    title: string;
    filterAll: string;
    filterCentenary: string;
    filterKeralaYathra: string;
    filterEducation: string;
    filterCommunity: string;
    featuredBadge: string;
    featuredTitle: string;
    featuredDate: string;
    featuredOrganiser: string;
    featuredLeader: string;
    featuredQuote: string;
    featuredDesc: string;
    sourceAttribution: string;
    readStory: string;
    wikiBackground: string;
    shareStory: string;
    items: Array<{
      id: string;
      category: string;
      date: string;
      title: string;
      desc: string;
      readTime: string;
    }>;
  };
  events: {
    sectionTag: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterOnline: string;
    filterInPerson: string;
    registerNow: string;
    capacityLeft: string;
    items: Array<{
      id: string;
      title: string;
      date: string;
      time: string;
      venue: string;
      type: 'in-person' | 'online';
      district: string;
      language: string;
      capacity: string;
    }>;
    modalTitle: string;
    formName: string;
    formPhone: string;
    formEmail: string;
    formInstitution: string;
    formCategory: string;
    formAccessibility: string;
    formSubmit: string;
    passTitle: string;
    passSubtitle: string;
    passDownload: string;
    passCalendar: string;
    passVenue: string;
  };
  donations: {
    sectionTag: string;
    title: string;
    subtitle: string;
    causes: Array<{
      id: string;
      title: string;
      desc: string;
      beneficiaries: string;
      target: string;
      raised: string;
      progress: number;
    }>;
    stepCause: string;
    stepAmount: string;
    stepReview: string;
    stepComplete: string;
    btnDonate: string;
    donorName: string;
    donorEmail: string;
    anonymous: string;
    customAmount: string;
    receiptTitle: string;
    receiptNotice: string;
  };
  volunteering: {
    sectionTag: string;
    title: string;
    subtitle: string;
    teams: Array<{
      id: string;
      title: string;
      desc: string;
      roles: string[];
      slotsLeft: number;
    }>;
    formTitle: string;
    formDistrict: string;
    formRole: string;
    formSkills: string;
    formAvailability: string;
    formSubmit: string;
    confirmationTitle: string;
  };
  campaigns: {
    sectionTag: string;
    title: string;
    subtitle: string;
    list: Array<{
      id: string;
      title: string;
      tagline: string;
      progress: number;
      countLabel: string;
      cta: string;
    }>;
    storyWallTitle: string;
    storyWallSubtitle: string;
    stories: Array<{
      id: string;
      author: string;
      location: string;
      quote: string;
      year: string;
    }>;
    modalBookTitle: string;
    modalTimeTitle: string;
    modalStoryTitle: string;
    consentText: string;
  };
  media: {
    sectionTag: string;
    title: string;
    subtitle: string;
    channelHandle: string;
    featuredVideoTitle: string;
    featuredVideoDesc: string;
    btnChannel: string;
    btnMore: string;
    btnSubscribe: string;
    videos: Array<{
      id: string;
      title: string;
      duration: string;
      badge: string;
      date: string;
    }>;
  };
  journey: {
    sectionTag: string;
    title: string;
    subtitle: string;
    eras: Array<{
      year: string;
      title: string;
      desc: string;
      milestone: string;
      source: string;
    }>;
    ctaEvent: string;
    ctaVolunteer: string;
    ctaDonate: string;
  };
  myParticipation: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    tabEvents: string;
    tabReminders: string;
    tabVolunteering: string;
    tabContributions: string;
    tabCampaigns: string;
    tabStories: string;
    exploreEvents: string;
    findRole: string;
    joinCampaign: string;
  };
  footer: {
    heritageQuote: string;
    quickLinksTitle: string;
    contactTitle: string;
    contactAddress: string;
    contactPhone: string;
    contactEmail: string;
    rights: string;
    accessibilityStatement: string;
    designedFor: string;
  };
}

export const content: Record<Locale, ContentDictionary> = {
  en: {
    brand: {
      name: 'SamasthaLive',
      tagline: 'A Century of Faith. A Future Together.',
      years: '1926–2026',
      emblemText: 'SAMASTHA 100 CENTENARY',
    },
    nav: {
      home: 'Home',
      about: 'About',
      liveHub: 'Live Hub',
      news: 'News',
      events: 'Events',
      campaigns: 'Campaigns',
      media: 'Media',
      journey: 'Our Journey',
      myParticipation: 'My Participation',
      volunteerCta: 'Become a Volunteer',
    },
    hero: {
      eyebrow: 'Honouring a Legacy. Inspiring Tomorrow.',
      title: 'A Century of Faith. A Future Together.',
      subtitle: 'From 1926 to 2026, Samastha Kerala Jamiyyathul Ulama has anchored community harmony, authentic Islamic scholarship, and humanitarian uplift across generations. Join the centenary journey in real-time.',
      watchLive: 'Watch Live',
      registerEvents: 'Register for Events',
      supportMission: 'Support the Mission',
      becomeVolunteer: 'Become a Volunteer',
      activeParticipantsBadge: '1.2M+ Centenary Participants Engaged',
    },
    marqueeValues: [
      'Knowledge',
      'Heritage',
      'Unity',
      'Peaceful Coexistence',
      'Universal Education',
      'Community Welfare',
      'Moral Leadership',
      'Civic Harmony',
    ],
    about: {
      sectionTag: '1926 – 2026 CENTENARY FOUNDATION',
      title: 'A Century of Knowledge, Unity, and Service',
      subtitle: 'Rooted in scholarly integrity, dedicated to societal peace and spiritual guidance.',
      p1: 'Founded on June 26, 1926, Samastha Kerala Jamiyyathul Ulama emerged as the primary scholarly consensus protecting traditional spiritual values while building an unparalleled network of educational institutions, moral universities, and community aid infrastructure.',
      p2: 'As we commemorate 100 years, Samastha stands as a testament to the power of structured community service, peaceful civic integration, and compassionate educational outreach across Kerala, India, and the global diaspora.',
      exploreJourney: 'Explore Our Journey',
      discoverInitiatives: 'Discover Our Initiatives',
      wireframeCaption: '1926–2026 Centenary Geometric Plexus — Symbolizing 100 years of unbroken unity and scholastic transmission.',
    },
    scholarship: {
      sectionTag: '100 YEARS OF SCHOLARSHIP',
      title: 'Preserving Wisdom. Lighting Tomorrow.',
      statement: 'Centenary scholarship is not merely history; it is a living compass guiding moral integrity, academic brilliance, and mutual respect in modern society.',
      closingInvitation: 'Join our academic forums, open seminars, and commemorative publication dialogues throughout 2026.',
      ctaHistory: 'Explore Our History',
      ctaEducation: 'Support Education',
      ctaVolunteer: 'Volunteer',
      cards: [
        {
          id: 'sc-1',
          title: 'Preserving Scholarship',
          desc: 'Safeguarding centuries of classical Sunni Islamic literature, jurisprudence, and ethical philosophy through verified teacher-student chains.',
          tag: 'Heritage',
        },
        {
          id: 'sc-2',
          title: 'Advancing Education',
          desc: 'Pioneering synchronous moral and modern scientific learning, establishing over 10,000 primary madrasas and collegiate centers.',
          tag: 'Academics',
        },
        {
          id: 'sc-3',
          title: 'Strengthening Communities',
          desc: 'Building grassroots social safety nets, crisis response volunteer cadres, and orphan welfare foundations with dignity.',
          tag: 'Welfare',
        },
        {
          id: 'sc-4',
          title: 'Guiding Through Change',
          desc: 'Providing balanced, empathetic counsel to youth facing rapid modern ideological, cultural, and technological transitions.',
          tag: 'Guidance',
        },
        {
          id: 'sc-5',
          title: 'Promoting Harmony',
          desc: 'Upholding Kerala’s cherished tradition of inter-community camaraderie, peaceful brotherhood, and shared civic progress.',
          tag: 'Peace',
        },
        {
          id: 'sc-6',
          title: 'Inspiring Generations',
          desc: 'Equipping millions of young leaders, writers, thinkers, and social organizers with unwavering ethical clarity.',
          tag: 'Empowerment',
        },
      ],
    },
    kpi: {
      title: 'One Community. A Shared Strength.',
      subtitle: 'Verified organizational footprint empowering millions across sub-organizations and grassroots councils.',
      footnote: 'Official statistical consensus audited across registered organizational census filings (2025–2026 reporting cycle).',
      stats: [
        { id: 'kpi-1', count: '200,000+', label: 'Active Cadres', org: 'SSF (Sunni Students Federation)' },
        { id: 'kpi-2', count: '250,000+', label: 'Community Leaders', org: 'SYS (Sunni Yuvajana Sangham)' },
        { id: 'kpi-3', count: '300,000+', label: 'Registered Members', org: 'KMJ (Kerala Muslim Jamaath)' },
        { id: 'kpi-4', count: '75,000+', label: 'Expatriate Members', org: 'ICF (Islamic Cultural Forum - GCC)' },
        { id: 'kpi-5', count: '35,000+', label: 'Youth Scholars & Students', org: 'RSC (Risala Study Circle - Global)' },
        { id: 'kpi-6', count: '50,000+', label: 'Accredited Ulama & Teachers', org: 'Samastha General Ulama Council' },
      ],
    },
    leadership: {
      sectionTag: 'HONORARY LEADERSHIP',
      title: 'Guided by Scholarship and Wisdom',
      subtitle: 'Steadfast guidance rooted in classical knowledge, deep humility, and selfless service to humanity.',
      leaders: [
        {
          id: 'leader-1',
          name: 'E. Sulaiman Musliyar',
          role: 'President, Samastha Kerala Jamiyyathul Ulama',
          bio: 'Renowned jurist and spiritual mentor whose lifelong teaching career has shaped generations of Islamic scholars with gentleness and profound legal scholarship.',
          quote: '“Knowledge that does not soften the heart and uplift the needy is incomplete. Our centenary is a renewal of divine responsibility.”',
        },
        {
          id: 'leader-2',
          name: 'Sheikh Abubakr Ahmad (Kanthapuram A. P.)',
          role: 'General Secretary, Samastha & Grand Mufti of India',
          bio: 'Visionary educational architect, Chancellor of Jamia Markaz, and international humanitarian whose 6 decades of institution building revolutionized social learning in India.',
          quote: '“Stand with people. Where there is distress, bring relief; where there is darkness, bring educational enlightenment.”',
        },
        {
          id: 'leader-3',
          name: 'P. T. Kunjammu Musliyar Kottoor',
          role: 'Treasurer, Samastha Kerala Jamiyyathul Ulama',
          bio: 'Esteemed scholar and financial steward whose rigorous ethical administration has anchored institutional trusts, madrasa boards, and welfare foundations.',
          quote: '“Trust in public service is sacred. Every rupee and every hour given to the centenary must blossom into lasting benefit.”',
        },
      ],
    },
    impact: {
      sectionTag: 'MEASURABLE OUTCOMES',
      title: 'A Legacy That Changes Lives',
      subtitle: 'Transforming potential into achievement across communities regardless of background.',
      stats: [
        { id: 'imp-1', count: '500+', label: 'Madrasas Supported', desc: 'Direct syllabus modernization, teacher stipends, and infrastructural renovations.' },
        { id: 'imp-2', count: '10,000+', label: 'Students Educated', desc: 'Full scholarships covering residential secondary, collegiate, and professional degrees.' },
        { id: 'imp-3', count: '100+', label: 'Endowed Research Grants', desc: 'Higher academic stipends honoring historic manuscripts, Arabic translation, and sociology.' },
      ],
      footnote: 'Aggregated via Samastha Education Board & Relief Committee Centenary Audit 2026.',
      ctaSupport: 'Support Education',
      ctaVolunteer: 'Volunteer With Us',
      ctaCampaigns: 'Explore Campaigns',
    },
    liveHub: {
      sectionTag: 'REAL-TIME COMMAND STAGE',
      title: 'Live Hub — Experience the Celebrations',
      subtitle: 'Watch live broadcasts, explore scheduled sessions, and receive verified centenary notifications.',
      statusLive: 'Live Now',
      statusSoon: 'Starting Soon',
      statusOffline: 'Broadcast Offline',
      statusRecorded: 'Recorded Session',
      currentBroadcastTitle: 'Samastha 100 Centenary Opening Grand Conclave',
      currentBroadcastSpeaker: 'Sheikh Abubakr Ahmad & National Dignitaries',
      currentBroadcastVenue: 'Centenary Nagar, Kozhikode Main Pavilion',
      currentBroadcastLang: 'Malayalam with English Subtitles',
      countdownLabel: 'Next Flagship Conclave Begins In',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Mins',
      seconds: 'Secs',
      announcementsTitle: 'Live Centenary Dispatch Feed',
      announcements: [
        { id: 'a-1', time: '10 mins ago', text: 'Kozhikode Pavilion gate 3 open for student pass holders. Special parking on South Beach road.', tag: 'Venue Alert' },
        { id: 'a-2', time: '42 mins ago', text: 'The Centenary Historical Book Exhibition has added 12 rare 19th-century Arabi-Malayalam manuscripts.', tag: 'Exhibition' },
        { id: 'a-3', time: '2 hours ago', text: 'Over 15,000 volunteer hours pledged today across Kerala Yathra civic cleanup sectors.', tag: 'Milestone' },
      ],
      venueGuidanceTitle: 'Centenary City & Transit Guide',
      venueGuidanceText: 'Free feeder electric shuttles operate every 10 minutes from Calicut Railway Station and Moffusil Bus Terminal directly to the Main Centenary Gate.',
      recordingsTitle: 'Archived Stream Highlights',
      btnWatch: 'Watch Main Stream',
      btnReminder: 'Set Reminder',
      btnRecordings: 'Browse Recordings',
    },
    news: {
      sectionTag: 'BULLETIN & PRESS',
      title: 'News & Official Dispatches',
      filterAll: 'All News',
      filterCentenary: 'Centenary',
      filterKeralaYathra: 'Kerala Yathra',
      filterEducation: 'Education',
      filterCommunity: 'Community Service',
      featuredBadge: 'HISTORIC ARCHIVE STORY',
      featuredTitle: 'Kerala Yathra 2026: A Journey Standing with People',
      featuredDate: '1–16 January 2026',
      featuredOrganiser: 'Kerala Muslim Jamaath (KMJ)',
      featuredLeader: 'Led by Kanthapuram A. P. Aboobacker Musliyar',
      featuredQuote: '“മനുഷ്യർക്കൊപ്പം” — “With People: Embracing Harmony, Justice, and Shared Human Dignity”',
      featuredDesc: 'Spanning from Hosangadi in Kasaragod to Thiruvananthapuram, Kerala Yathra 2026 engaged over 2.4 million citizens across 14 districts, delivering essential healthcare kits, student scholarships, and dialogue sessions on secular peace.',
      sourceAttribution: 'Published archive report — Source: Malayala Manorama (www.manoramaonline.com). Archive verified.',
      readStory: 'Read Full Story',
      wikiBackground: 'Historical Background',
      shareStory: 'Share Story',
      items: [
        {
          id: 'n-1',
          category: 'Centenary',
          date: 'Jan 28, 2026',
          title: 'Centenary Commemorative Stamp & Monograph Unveiled',
          desc: 'Special edition postal release commemorating Samastha’s role in Kerala’s 20th-century social renaissance.',
          readTime: '3 min read',
        },
        {
          id: 'n-2',
          category: 'Education',
          date: 'Feb 04, 2026',
          title: '1,000 Smart Digital Classrooms Commissioned for Madrasas',
          desc: 'Phase 1 of the Centenary Technology Grant deploys interactive STEM and language laboratories.',
          readTime: '4 min read',
        },
        {
          id: 'n-3',
          category: 'Community Service',
          date: 'Feb 12, 2026',
          title: 'Snehapoorvam Dialysis Centers Expand to 5 Districts',
          desc: 'Centenary medical endowment provides free renal care sessions for marginalized families across Malabar.',
          readTime: '5 min read',
        },
      ],
    },
    events: {
      sectionTag: 'INTERACTIVE SESSIONS',
      title: 'Centenary Events & Registration',
      subtitle: 'Reserve your seat or tune in virtually. Instant holographic 3D participation pass generated upon confirmation.',
      filterAll: 'All Events',
      filterOnline: 'Virtual Streams',
      filterInPerson: 'On-Ground Venues',
      registerNow: 'Register Now',
      capacityLeft: 'Seats Left',
      items: [
        {
          id: 'ev-1',
          title: 'Centenary Academic Colloquium: Islamic Scholasticism in Kerala',
          date: 'March 14, 2026',
          time: '09:30 AM – 04:30 PM IST',
          venue: 'Markaz Knowledge City Auditorium, Wayanad Road',
          type: 'in-person',
          district: 'Kozhikode',
          language: 'Bilingual (EN / ML)',
          capacity: '85 seats remaining',
        },
        {
          id: 'ev-2',
          title: 'Global Youth Civic Leadership & Volunteer Summit',
          date: 'March 21, 2026',
          time: '06:00 PM – 09:30 PM IST',
          venue: 'Centenary Interactive Virtual Stage',
          type: 'online',
          district: 'Global Stream',
          language: 'English & Malayalam',
          capacity: 'Live Interactive Webcast',
        },
        {
          id: 'ev-3',
          title: 'Grand Centenary Interfaith Peace Assembly',
          date: 'April 02, 2026',
          time: '04:00 PM – 08:30 PM IST',
          venue: 'Marine Drive Pavilion, Kochi',
          type: 'in-person',
          district: 'Ernakulam',
          language: 'Malayalam & English',
          capacity: '320 seats remaining',
        },
      ],
      modalTitle: 'Event Registration — Samastha 100',
      formName: 'Full Name',
      formPhone: 'Mobile / WhatsApp Number',
      formEmail: 'Email Address',
      formInstitution: 'Institution / Campus / Mahalla',
      formCategory: 'Participant Category',
      formAccessibility: 'Accessibility or Special Assistance Needed',
      formSubmit: 'Confirm & Generate 3D Pass',
      passTitle: 'CENTENARY PARTICIPATION PASS',
      passSubtitle: 'SAMASTHA 100 (1926–2026) VERIFIED ATTENDEE',
      passDownload: 'Download Pass (PNG)',
      passCalendar: 'Add to Calendar',
      passVenue: 'View Map Directions',
    },
    donations: {
      sectionTag: 'TRANSPARENT GIVING',
      title: 'Donations — Turn Goodwill into Opportunity',
      subtitle: '100% transparent endowment funds audited for education, student books, community healthcare, and emergency aid.',
      causes: [
        {
          id: 'dn-1',
          title: 'Higher Education Scholarship Fund',
          desc: 'Covers full tuition, hostel fees, and research books for financially challenged undergraduate and doctoral scholars.',
          beneficiaries: '1,200 Underprivileged Students',
          target: '₹50,00,000',
          raised: '₹38,45,000',
          progress: 77,
        },
        {
          id: 'dn-2',
          title: 'Books & Rural Library Resource Kits',
          desc: 'Equips 500 village madrasas and study clubs with modern reference books, science kits, and digital encyclopedias.',
          beneficiaries: '500 Rural Madrasa Libraries',
          target: '₹25,00,000',
          raised: '₹21,80,000',
          progress: 87,
        },
        {
          id: 'dn-3',
          title: 'Snehapoorvam Healthcare & Dialysis Care',
          desc: 'Funds free life-saving dialysis sessions and specialized medicines for chronic kidney patients.',
          beneficiaries: '350 Critical Dialysis Patients',
          target: '₹40,00,000',
          raised: '₹31,20,000',
          progress: 78,
        },
        {
          id: 'dn-4',
          title: 'Centenary Campus Accessibility Fund',
          desc: 'Builds wheelchair ramps, tactile braille signage, and assistive audio devices across community centers.',
          beneficiaries: 'All Differently-Abled Attendees',
          target: '₹15,00,000',
          raised: '₹14,10,000',
          progress: 94,
        },
      ],
      stepCause: '1. Select Cause',
      stepAmount: '2. Select Amount',
      stepReview: '3. Donor Details',
      stepComplete: '4. Instant Receipt',
      btnDonate: 'Support This Cause',
      donorName: 'Your Full Name',
      donorEmail: 'Receipt Email Address',
      anonymous: 'Make this an anonymous contribution',
      customAmount: 'Enter custom amount (₹)',
      receiptTitle: 'Centenary Contribution Receipt',
      receiptNotice: 'Simulated Demo Gateway Verified — Saved immediately to your My Participation dashboard.',
    },
    volunteering: {
      sectionTag: 'CENTENARY SERVICE CORPS',
      title: 'Volunteering — Give Your Time a Purpose',
      subtitle: 'Join over 25,000 registered volunteers ensuring seamless hospitality, logistics, digital reach, and safety.',
      teams: [
        {
          id: 'vt-1',
          title: 'Welcome & Hospitality Team',
          desc: 'Welcoming delegates, guiding attendees, assisting senior citizens, and maintaining entry flow.',
          roles: ['Reception Usher', 'VIP Liaison', 'Information Desk'],
          slotsLeft: 42,
        },
        {
          id: 'vt-2',
          title: 'Event Operations & Logistics',
          desc: 'Stage coordination, audio-visual assistance, session timekeeping, and backstage management.',
          roles: ['Stage Coordinator', 'Hall Proctor', 'Logistics Aide'],
          slotsLeft: 28,
        },
        {
          id: 'vt-3',
          title: 'Digital Media & Live Stream Corps',
          desc: 'Live photography, social clips, transcriptions, broadcast monitoring, and social media moderation.',
          roles: ['Live Tweeter', 'Photographer', 'Stream Operator'],
          slotsLeft: 19,
        },
        {
          id: 'vt-4',
          title: 'Language & Translation Support',
          desc: 'Translating Arabic, Urdu, and English speeches into Malayalam for guests, press, and attendees.',
          roles: ['English Interpreter', 'Arabic Liaison', 'Live Scribe'],
          slotsLeft: 15,
        },
        {
          id: 'vt-5',
          title: 'Community Care & First Aid Support',
          desc: 'Emergency first-response coordination, hydration stations, crowd safety, and green cleanups.',
          roles: ['First Aid Volunteer', 'Hydration Crew', 'Eco-Clean Corps'],
          slotsLeft: 34,
        },
      ],
      formTitle: 'Volunteer Application — Centenary Corps',
      formDistrict: 'Your Home District',
      formRole: 'Preferred Volunteer Team',
      formSkills: 'Relevant Skills or Background',
      formAvailability: 'Availability (Full Time / Weekends / Specific Days)',
      formSubmit: 'Submit Volunteer Application',
      confirmationTitle: 'Volunteer Application Received!',
    },
    campaigns: {
      sectionTag: 'COMMUNITY CAMPAIGNS',
      title: 'Campaigns — Celebrate Through Action',
      subtitle: 'Centenary milestones are lived through meaningful acts of giving, reading, and shared remembrance.',
      list: [
        {
          id: 'cmp-1',
          title: 'A Book. A New Beginning.',
          tagline: 'Pledge to gift educational books to children and rural madrasa libraries across Kerala.',
          progress: 82,
          countLabel: '41,200 / 50,000 Books Pledged',
          cta: 'Join Book Campaign',
        },
        {
          id: 'cmp-2',
          title: 'An Hour for Others',
          tagline: 'Pledge 60 minutes of compassionate volunteer service for public cleanliness, care home visits, or tutoring.',
          progress: 68,
          countLabel: '68,400 / 100,000 Hours Pledged',
          cta: 'Pledge My Time',
        },
        {
          id: 'cmp-3',
          title: 'My Centenary Story',
          tagline: 'Record your family’s historic memory, elder’s reflection, or photo from past Samastha gatherings.',
          progress: 91,
          countLabel: '4,550 Stories Curated',
          cta: 'Share My Story',
        },
      ],
      storyWallTitle: 'Centenary Community Story Wall',
      storyWallSubtitle: 'Living voices from four generations recalling unity, education, and moral uplift.',
      stories: [
        {
          id: 'st-1',
          author: 'K. Kunhali Haji',
          location: 'Tirur, Malappuram',
          quote: '“In 1976 during the Golden Jubilee, my father brought me on a steam train to Kozhikode. Today, watching my grandson register as a digital volunteer fills my eyes with tears of gratitude.”',
          year: '1976 & 2026',
        },
        {
          id: 'st-2',
          author: 'Fathima Zuhra',
          location: 'Sulthan Bathery, Wayanad',
          quote: '“The scholarship granted by Samastha in 2012 funded my Bachelor of Science. Today I teach chemistry, giving back the same light that illuminated my path.”',
          year: 'Alumna 2012',
        },
        {
          id: 'st-3',
          author: 'Adv. Musthafa Rahman',
          location: 'Kochi, Ernakulam',
          quote: '“Samastha taught us that faith is demonstrated through selfless civic character and unwavering respect for every neighbour. That is the Kerala model.”',
          year: 'Youth Delegate',
        },
        {
          id: 'st-4',
          author: 'Dr. Abdul Rasheed',
          location: 'Dubai / Kannur',
          quote: '“Even miles away in the Gulf, ICF networks built upon Samastha’s ethos kept us rooted in compassion, charity, and ethical business dealings.”',
          year: 'Diaspora Volunteer',
        },
      ],
      modalBookTitle: 'Pledge Books for Rural Learning',
      modalTimeTitle: 'Pledge Hours for Civic Uplift',
      modalStoryTitle: 'Submit Your Centenary Story',
      consentText: 'I consent to displaying this story and memory publicly on the Samastha Centenary Story Wall.',
    },
    media: {
      sectionTag: 'DIGITAL ARCHIVE & BROADCASTS',
      title: 'Media & YouTube — @SamasthaGraph',
      subtitle: 'Official high-definition documentary series, live discourse recordings, and centenary hymns.',
      channelHandle: '@SamasthaGraph',
      featuredVideoTitle: 'SAMASTHA 100: A Century of Unbroken Brotherhood (Documentary)',
      featuredVideoDesc: 'A sweeping 45-minute cinematic journey traversing the 1926 Kozhikode assembly, the education revolution, and modern humanitarian milestones.',
      btnChannel: 'Visit YouTube Channel',
      btnMore: 'Watch More Videos',
      btnSubscribe: 'Subscribe on YouTube',
      videos: [
        { id: 'v-1', title: 'Centenary Anthem: നൂറാണ്ടിന്റെ ഒരുമ (Official Audio)', duration: '04:18', badge: 'Theme Song', date: 'Jan 2026' },
        { id: 'v-2', title: 'Grand Conclave Opening Address: Sheikh Abubakr Ahmad', duration: '54:10', badge: 'Recorded', date: 'Jan 2026' },
        { id: 'v-3', title: 'Kerala Yathra 2026: Highlights & Public Receptions', duration: '28:45', badge: 'Documentary', date: 'Jan 2026' },
        { id: 'v-4', title: '100 Years of Classical Islamic Manuscripts in Kerala', duration: '19:22', badge: 'Heritage', date: 'Feb 2026' },
      ],
    },
    journey: {
      sectionTag: '1926 – 2026 HISTORICAL ARCHIVE',
      title: 'Our Journey — 100 Years of Living History',
      subtitle: 'Scroll through the defining milestones that built Kerala’s largest grassroots educational movement.',
      eras: [
        {
          year: '1926',
          title: 'The Founding Conclave at Kozhikode',
          desc: 'On June 26, 1926, visionary scholars convened at the Kozhikode Town Hall to establish Samastha Kerala Jamiyyathul Ulama to systematically protect authentic scholastic tradition.',
          milestone: 'Formal registration and unanimous declaration of moral unity.',
          source: 'Samastha Archival Gazette Vol. 1',
        },
        {
          year: '1951',
          title: 'The Madrasa Education Board Revolution',
          desc: 'Creation of a centralized syllabus, standardized teacher training, and morning moral classes ensuring no child grew up without literacy and character education.',
          milestone: 'Launch of synchronous modern & moral pedagogical curriculum.',
          source: 'Kerala Education Board Historical Records',
        },
        {
          year: '1989',
          title: 'Decentralized Universities & Higher Academies',
          desc: 'Establishment of Jamia Markaz and allied academies integrating university degree programs, Arabic linguistics, and engineering under ethical guidance.',
          milestone: 'Over 10,000 residential campuses affiliated statewide.',
          source: 'Centenary Higher Education Commission Report',
        },
        {
          year: '2026',
          title: 'The Centenary & The Next Century',
          desc: 'SAMASTHA 100: Launching smart digital classrooms, global interfaith chairs, green humanitarian initiatives, and AI-enabled educational access.',
          milestone: 'A global movement celebrating a century of harmony and looking toward 2126.',
          source: 'Centenary Declaration 2026',
        },
      ],
      ctaEvent: 'Join an Event',
      ctaVolunteer: 'Volunteer',
      ctaDonate: 'Support a Cause',
    },
    myParticipation: {
      title: 'My Participation Hub',
      subtitle: 'Your personal centenary passport tracking passes, live stream reminders, volunteer applications, and donation receipts.',
      emptyTitle: 'No Centenary Activities Recorded Yet',
      emptyDesc: 'Register for an event, set a live stream reminder, pledge hours, or support a student to populate your personal dashboard.',
      tabEvents: 'My Events (Passes)',
      tabReminders: 'Stream Reminders',
      tabVolunteering: 'Volunteering',
      tabContributions: 'Contributions',
      tabCampaigns: 'Pledged Campaigns',
      tabStories: 'My Stories',
      exploreEvents: 'Explore Events',
      findRole: 'Find a Volunteer Role',
      joinCampaign: 'Join a Campaign',
    },
    footer: {
      heritageQuote: '“Wisdom lives when it serves humanity. 100 years of knowledge, unity, and universal benevolence.”',
      quickLinksTitle: 'Quick Links',
      contactTitle: 'Centenary Secretariat',
      contactAddress: 'Samastha Centenary Directorate, Kozhikode, Kerala 673004',
      contactPhone: '+91 495 272 1926',
      contactEmail: 'centenary@samasthalive.org',
      rights: '© 1926–2026 Samastha Kerala Jamiyyathul Ulama. All Rights Reserved.',
      accessibilityStatement: 'Built with WCAG 2.1 AA compliant contrast, keyboard navigation, and bilingual typography.',
      designedFor: 'General Inter-Campus Fest Build-a-Thon 2026 Showcase',
    },
  },
  ml: {
    brand: {
      name: 'സമസ്ത ലൈവ്',
      tagline: 'വിശ്വാസത്തിന്റെ നൂറാണ്ട്. ഒരുമയുടെ പുതുഭാവി.',
      years: '1926–2026',
      emblemText: 'സമസ്ത 100 ശതാബ്ദി',
    },
    nav: {
      home: 'മുഖ്യപേജ്',
      about: 'സമസ്തയെക്കുറിച്ച്',
      liveHub: 'തത്സമയം',
      news: 'വാർത്തകൾ',
      events: 'പരിപാടികൾ',
      campaigns: 'ക്യാമ്പയിനുകൾ',
      media: 'മാധ്യമം',
      journey: 'നമ്മുടെ യാത്ര',
      myParticipation: 'എന്റെ പങ്കാളിത്തം',
      volunteerCta: 'സന്നദ്ധസേവനത്തിന് ചേരാം',
    },
    hero: {
      eyebrow: 'പൈതൃകത്തിന്റെ കരുത്തിൽ പുതിയ നാളുകളിലേക്ക്.',
      title: 'വിശ്വാസത്തിന്റെ നൂറാണ്ട്. ഒരുമയുടെ പുതുഭാവി.',
      subtitle: '1926 മുതൽ 2026 വരെ, സമസ്ത കേരള ജംഇയ്യത്തുൽ ഉലമ പകർന്നുനൽകിയ സൗഹാർദ്ദവും വിജ്ഞാനവും കാരുണ്യവും തലമുറകളിലൂടെ തുടരുന്നു. ശതാബ്ദി ആഘോഷങ്ങളുടെ തത്സമയ വേദികളിലേക്ക് സ്വാഗതം.',
      watchLive: 'തത്സമയം കാണാം',
      registerEvents: 'പരിപാടികളിൽ രജിസ്റ്റർ ചെയ്യാം',
      supportMission: 'ദൗത്യത്തിന് പിന്തുണ നൽകാം',
      becomeVolunteer: 'സന്നദ്ധസേവനത്തിന് ചേരാം',
      activeParticipantsBadge: '12 ലക്ഷത്തിലധികം ആളുകൾ ശതാബ്ദിയിൽ പങ്കാളികളായി',
    },
    marqueeValues: [
      'വിജ്ഞാനം',
      'പൈതൃകം',
      'ഐക്യം',
      'സൗഹാർദ്ദം',
      'വിദ്യാഭ്യാസം',
      'സാമൂഹ്യക്ഷേമം',
      'ധാർമ്മികത',
      'മാനവികത',
    ],
    about: {
      sectionTag: '1926 – 2026 ശതാബ്ദി അടിത്തറ',
      title: 'അറിവിന്റെയും ഐക്യത്തിന്റെയും സേവനത്തിന്റെയും നൂറാണ്ട്',
      subtitle: 'വിജ്ഞാനത്തിലും സമാധാനത്തിലും അധിഷ്ഠിതമായ സമഗ്ര സാമൂഹിക മുന്നേറ്റം.',
      p1: '1926 ജൂൺ 26-ന് കോഴിക്കോട് ടൗൺഹാളിൽ വെച്ച് രൂപീകരിക്കപ്പെട്ട സമസ്ത കേരള ജംഇയ്യത്തുൽ ഉലമ, പാരമ്പര്യ ഇസ്ലാമിക മൂല്യങ്ങളുടെ സംരക്ഷണത്തിനൊപ്പം കേരളത്തിൽ വിപുലമായ വിദ്യാഭ്യാസ-സേവന വിപ്ലവത്തിന് അടിത്തറയിട്ടു.',
      p2: '100 വർഷങ്ങൾ പിന്നിടുമ്പോൾ, പതിനായിരക്കണക്കിന് മദ്റസകളും ഉന്നതവിദ്യാഭ്യാസ സ്ഥാപനങ്ങളും അനാഥശാലകളും കാരുണ്യ പദ്ധതികളും വഴി കേരളത്തിനകത്തും വിദേശത്തും സമാനതകളില്ലാത്ത മുന്നേറ്റമാണ് സമസ്ത സൃഷ്ടിച്ചത്.',
      exploreJourney: 'നമ്മുടെ ചരിത്രയാത്ര',
      discoverInitiatives: 'പ്രവർത്തനങ്ങൾ അറിയാം',
      wireframeCaption: '1926–2026 ശതാബ്ദി ജ്യോമെട്രിക് പ്ലെക്സസ് — ഒരു നൂറ്റാണ്ടിന്റെ അചഞ്ചലമായ ഐക്യത്തിന്റെയും വൈജ്ഞാനിക കൈമാറ്റത്തിന്റെയും പ്രതീകം.',
    },
    scholarship: {
      sectionTag: 'പാണ്ഡിത്യത്തിന്റെ നൂറാണ്ട്',
      title: 'ജ്ഞാനം സംരക്ഷിക്കുന്നു. ഭാവിയെ പ്രകാശിപ്പിക്കുന്നു.',
      statement: 'ശതാബ്ദി പാണ്ഡിത്യം കേവലം ചരിത്രമല്ല; അത് സമൂഹത്തിൽ നന്മയും സ്നേഹവും വിജ്ഞാനവും പകരുന്ന ജീവസ്സുറ്റ വഴികാട്ടിയാണ്.',
      closingInvitation: '2026-ലെ സെമിനാറുകളിലും ചരിത്ര സംവാദങ്ങളിലും വിദ്യാർത്ഥി സംഗമങ്ങളിലും നിങ്ങൾക്കും പങ്കാളിയാകാം.',
      ctaHistory: 'ചരിത്രം കാണാം',
      ctaEducation: 'വിദ്യാഭ്യാസത്തിന് പിന്തുണ',
      ctaVolunteer: 'സന്നദ്ധസേവനം',
      cards: [
        {
          id: 'sc-1',
          title: 'പാണ്ഡിത്യ സംരക്ഷണം',
          desc: 'നൂറ്റാണ്ടുകളുടെ പ്രമാണബദ്ധമായ വിജ്ഞാനവും കർമ്മശാസ്ത്രവും പാരമ്പര്യ ഗുരുശിഷ്യ ബന്ധങ്ങളിലൂടെ കാത്തുസൂക്ഷിക്കുന്നു.',
          tag: 'പൈതൃകം',
        },
        {
          id: 'sc-2',
          title: 'വിദ്യാഭ്യാസ മുന്നേറ്റം',
          desc: 'ധാർമ്മിക പാഠശാലകളോടൊപ്പം ഭൗതിക വിദ്യാഭ്യാസവും സമന്വയിപ്പിച്ച് പതിനായിരത്തിലേറെ സ്ഥാപനങ്ങൾ വഴി വിപ്ലവം സൃഷ്ടിച്ചു.',
          tag: 'വിദ്യാഭ്യാസം',
        },
        {
          id: 'sc-3',
          title: 'സമൂഹ ശാക്തീകരണം',
          desc: 'അനാഥ സംരക്ഷണം, ദുരിതാശ്വാസം, പാർപ്പിട പദ്ധതികൾ എന്നിവയിലൂടെ സാധാരണക്കാരുടെ ജീവിതങ്ങൾക്ക് താങ്ങായി നിലകൊള്ളുന്നു.',
          tag: 'ക്ഷേമം',
        },
        {
          id: 'sc-4',
          title: 'മാറ്റങ്ങളിൽ വഴികാട്ടൽ',
          desc: 'ആധുനിക വെല്ലുവിളികളെയും ചിന്താധാരകളെയും ധാർമ്മിക വിവേകത്തോടെ നേരിടാൻ പുതുതലമുറയ്ക്ക് കരുത്ത് പകരുന്നു.',
          tag: 'മാർഗ്ഗദർശനം',
        },
        {
          id: 'sc-5',
          title: 'സൗഹാർദ്ദ പ്രചാരണം',
          desc: 'കേരളത്തിന്റെ അതുല്യമായ ബഹുസ്വരതയും പരസ്പര സ്നേഹവും ഊട്ടിയുറപ്പിച്ച് സമാധാനപൂർണ്ണമായ സഹവർത്തിത്വം ഉറപ്പാക്കുന്നു.',
          tag: 'സൗഹാർദ്ദം',
        },
        {
          id: 'sc-6',
          title: 'തലമുറകൾക്ക് പ്രചോദനം',
          desc: 'ലക്ഷക്കണക്കിന് യുവാക്കളെയും സംഘാടകരെയും മൂല്യാധിഷ്ഠിത സേവന പ്രവർത്തനങ്ങൾക്ക് സജ്ജരാക്കുന്നു.',
          tag: 'പ്രചോദനം',
        },
      ],
    },
    kpi: {
      title: 'ഒരൊറ്റ സമൂഹം. കൂട്ടായ കരുത്ത്.',
      subtitle: 'വിവിധ പോഷക സംഘടനകളിലൂടെയും കൗൺസിലുകളിലൂടെയും നാടിന്റെ നാനാതുറകളിൽ പ്രവർത്തിക്കുന്ന അംഗബലം.',
      footnote: '2025–2026 ഔദ്യോഗിക രജിസ്ട്രേഷൻ സെൻസസ് പ്രകാരമുള്ള സ്ഥിരീകരിച്ച കണക്കുകൾ.',
      stats: [
        { id: 'kpi-1', count: '2,00,000+', label: 'സജീവ പ്രവർത്തകർ', org: 'SSF (സുന്നി സ്റ്റുഡന്റ്സ് ഫെഡറേഷൻ)' },
        { id: 'kpi-2', count: '2,50,000+', label: 'യുവജന നേതൃത്വം', org: 'SYS (സുന്നി യുവജന സംഘം)' },
        { id: 'kpi-3', count: '3,00,000+', label: 'രജിസ്റ്റേർഡ് അംഗങ്ങൾ', org: 'KMJ (കേരള മുസ്ലിം ജമാഅത്ത്)' },
        { id: 'kpi-4', count: '75,000+', label: 'പ്രവാസി അംഗങ്ങൾ', org: 'ICF (ഇസ്ലാമിക് കൾച്ചറൽ ഫോറം - GCC)' },
        { id: 'kpi-5', count: '35,000+', label: 'പഠന വൃത്തങ്ങൾ', org: 'RSC (രിസാല സ്റ്റഡി സർക്കിൾ - ഗ്ലോബൽ)' },
        { id: 'kpi-6', count: '50,000+', label: 'അംഗീകൃത ഉലമാക്കൾ & അധ്യാപകർ', org: 'സമസ്ത ഉലമാ കൗൺസിൽ' },
      ],
    },
    leadership: {
      sectionTag: 'ആദരണീയ നേതൃത്വം',
      title: 'പാണ്ഡിത്യത്തിന്റെ വഴികാട്ടലിൽ',
      subtitle: 'അറിവിലും വിവേകത്തിലും സേവനത്തിലും വേരൂന്നിയ നേതൃത്വം ജനങ്ങൾക്കൊപ്പം നിലകൊള്ളുന്നു.',
      leaders: [
        {
          id: 'leader-1',
          name: 'ഇ. സുലൈമാൻ മുസ്ലിയാർ',
          role: 'പ്രസിഡന്റ്, സമസ്ത കേരള ജംഇയ്യത്തുൽ ഉലമ',
          bio: 'പാണ്ഡിത്യത്തിന്റെ ഉന്നതിയിലും വിനയത്തിന്റെ പൂർണ്ണതയിലും ജീവിക്കുന്ന ശ്രേഷ്ഠ പണ്ഡിതൻ. പതിറ്റാണ്ടുകളായി ശിഷ്യസമ്പത്തിന് ആത്മീയ വെളിച്ചമേകുന്നു.',
          quote: '“ഹൃദയങ്ങളെ നന്മയിലേക്ക് വഴിനടത്താത്ത അറിവ് അപൂർണ്ണമാണ്. ശതാബ്ദി എന്നത് കൂടുതൽ സേവനത്തിനുള്ള പ്രതിജ്ഞയാണ്.”',
        },
        {
          id: 'leader-2',
          name: 'ശൈഖ് അബൂബക്കർ അഹ്‌മദ് (കാന്തപുരം എ. പി.)',
          role: 'ജനറൽ സെക്രട്ടറി, സമസ്ത & ഗ്രാൻഡ് മുഫ്തി ഓഫ് ഇന്ത്യ',
          bio: 'വിദ്യാഭ്യാസ വിപ്ലവത്തിന്റെ ശില്പി, ജാമിഅ മർകസിന്റെ ചാൻസലർ. ആറ് പതിറ്റാണ്ടിലേറെയായി മാനവ സൗഹാർദ്ദത്തിനും പാവപ്പെട്ടവരുടെ ഉന്നമനത്തിനുമായി സമർപ്പിത ജീവിതം.',
          quote: '“മനുഷ്യർക്കൊപ്പം നിൽക്കുക. സങ്കടങ്ങളിൽ സാന്ത്വനമേകുക; അറിവില്ലായ്മയുടെ അന്ധകാരത്തിൽ അറിവിന്റെ ദീപം തെളിക്കുക.”',
        },
        {
          id: 'leader-3',
          name: 'പി. ടി. കുഞ്ഞമ്മു മുസ്ലിയാർ കോട്ടൂർ',
          role: 'ട്രഷറർ, സമസ്ത കേരള ജംഇയ്യത്തുൽ ഉലമ',
          bio: 'സ്ഥാപനങ്ങളുടെ സുതാര്യമായ നടത്തിപ്പിനും കാരുണ്യ പ്രവർത്തനങ്ങളുടെ ചിട്ടയായ വിതരണത്തിനും നേതൃത്വം നൽകുന്ന ആദരണീയ പണ്ഡിതൻ.',
          quote: '“പൊതുജനങ്ങളുടെ വിശ്വാസം പവിത്രമാണ്. ശതാബ്ദിക്ക് നൽകുന്ന ഓരോ പിന്തുണയും നാടിന്റെ നന്മയ്ക്കായി വിനിയോഗിക്കപ്പെടണം.”',
        },
      ],
    },
    impact: {
      sectionTag: 'മാറ്റത്തിന്റെ കണക്കുകൾ',
      title: 'ജീവിതങ്ങളിൽ മാറ്റമുണ്ടാക്കുന്ന പൈതൃകം',
      subtitle: 'ജാതി-മത ഭേദമന്യേ മനുഷ്യർക്ക് അറിവും ആശ്രയവും നൽകിയ നാൾവഴികൾ.',
      stats: [
        { id: 'imp-1', count: '500+', label: 'പിന്തുണ നൽകിയ മദ്റസകൾ', desc: 'സിലബസ് നവീകരണം, അധ്യാപക വേതന സഹായം, കെട്ടിട പുനരുദ്ധാരണം.' },
        { id: 'imp-2', count: '10,000+', label: 'വിദ്യാഭ്യാസം ലഭിച്ച വിദ്യാർത്ഥികൾ', desc: 'സ്കൂൾ-കോളേജ് തലം മുതൽ ഗവേഷണം വരെയുള്ള പൂർണ്ണ സ്കോളർഷിപ്പ്.' },
        { id: 'imp-3', count: '100+', label: 'നൽകിയ ഗവേഷണ ഫെലോഷിപ്പുകൾ', desc: 'പൗരാണിക കൈയെഴുത്തുപ്രതികൾ, അറബി-മലയാള സാഹിത്യം എന്നിവയിലെ ഗവേഷണം.' },
      ],
      footnote: 'സമസ്ത വിദ്യാഭ്യാസ ബോർഡ് & റിലീഫ് കമ്മിറ്റി 2026 ഓഡിറ്റ് പ്രകാരമുള്ളത്.',
      ctaSupport: 'വിദ്യാഭ്യാസ സഹായം നൽകാം',
      ctaVolunteer: 'സന്നദ്ധസേവനത്തിന് ചേരാം',
      ctaCampaigns: 'ക്യാമ്പയിനുകൾ അറിയാം',
    },
    liveHub: {
      sectionTag: 'തത്സമയ വേദി',
      title: 'തത്സമയം — ശതാബ്ദി ആഘോഷങ്ങൾ ഒപ്പത്തിനൊപ്പം',
      subtitle: 'ലൈവ് സംപ്രേഷണം കാണാം, പ്രധാന പ്രഖ്യാപനങ്ങൾ അറിയാം, വരാനിരിക്കുന്ന പരിപാടികൾ ഷെഡ്യൂൾ ചെയ്യാം.',
      statusLive: 'തത്സമയം (Live Now)',
      statusSoon: 'ഉടൻ ആരംഭിക്കും',
      statusOffline: 'സംപ്രേഷണം ലഭ്യമല്ല',
      statusRecorded: 'റെക്കോർഡ് ചെയ്ത വീഡിയോ',
      currentBroadcastTitle: 'സമസ്ത 100 ശതാബ്ദി മഹാ സമ്മേളന ഉദ്ഘാടന സെഷൻ',
      currentBroadcastSpeaker: 'ശൈഖ് അബൂബക്കർ അഹ്‌മദ് & പ്രമുഖ നേതാക്കൾ',
      currentBroadcastVenue: 'ശതാബ്ദി നഗരി, കോഴിക്കോട് ബീച്ച് പ്രധാന പവലിയൻ',
      currentBroadcastLang: 'മലയാളം (ഇംഗ്ലീഷ് സബ്ടൈറ്റിലുകളോടെ)',
      countdownLabel: 'അടുത്ത പ്രധാന സെഷൻ ആരംഭിക്കാൻ ഇനി',
      days: 'ദിവസങ്ങൾ',
      hours: 'മണിക്കൂറുകൾ',
      minutes: 'മിനിറ്റുകൾ',
      seconds: 'സെക്കന്റുകൾ',
      announcementsTitle: 'തത്സമയ അറിയിപ്പുകൾ',
      announcements: [
        { id: 'a-1', time: '10 മിനിറ്റ് മുമ്പ്', text: 'കോഴിക്കോട് പവലിയൻ ഗേറ്റ് 3 വിദ്യാർത്ഥി പാസുള്ളവർക്കായി തുറന്നു. പാർക്കിംഗ് സൗത്ത് ബീച്ച് ഭാഗത്ത്.', tag: 'വേദി അറിയിപ്പ്' },
        { id: 'a-2', time: '42 മിനിറ്റ് മുമ്പ്', text: 'ശതാബ്ദി ചരിത്ര പ്രദർശനത്തിൽ 19-ാം നൂറ്റാണ്ടിലെ അപൂർവ്വ അറബി-മലയാളം കൈയെഴുത്തുപ്രതികൾ ഉൾപ്പെടുത്തി.', tag: 'പ്രദർശനം' },
        { id: 'a-3', time: '2 മണിക്കൂർ മുമ്പ്', text: 'കേരള യാത്ര സന്നദ്ധസേവന വിഭാഗത്തിൽ ഇന്ന് 15,000 മണിക്കൂർ കർമ്മസേവനം രേഖപ്പെടുത്തി.', tag: 'വിജയഗാഥ' },
      ],
      venueGuidanceTitle: 'യാത്രാ സൗകര്യങ്ങളും വഴികാട്ടലും',
      venueGuidanceText: 'കോഴിക്കോട് റെയിൽവേ സ്റ്റേഷൻ, കെ.എസ്.ആർ.ടി.സി ബസ് സ്റ്റാൻഡ് എന്നിവിടങ്ങളിൽ നിന്ന് സമ്മേളന നഗരിയിലേക്ക് സൗജന്യ ഇലക്ട്രിക് ഫീഡർ സർവീസുകൾ ലഭ്യമാണ്.',
      recordingsTitle: 'കഴിഞ്ഞ സെഷനുകളുടെ വീഡിയോകൾ',
      btnWatch: 'ലൈവ് കാണാം',
      btnReminder: 'റിമൈൻഡർ സെറ്റ് ചെയ്യാം',
      btnRecordings: 'പഴയ വീഡിയോകൾ കാണാം',
    },
    news: {
      sectionTag: 'വാർത്തകളും വിശേഷങ്ങളും',
      title: 'ഔദ്യോഗിക വാർത്തകൾ',
      filterAll: 'എല്ലാ വാർത്തകളും',
      filterCentenary: 'ശതാബ്ദി',
      filterKeralaYathra: 'കേരള യാത്ര',
      filterEducation: 'വിദ്യാഭ്യാസം',
      filterCommunity: 'സാമൂഹ്യസേവനം',
      featuredBadge: 'ചരിത്ര വിശേഷം',
      featuredTitle: 'കേരള യാത്ര 2026: മനുഷ്യർക്കൊപ്പം ഒരു യാത്ര',
      featuredDate: '1–16 ജനുവരി 2026',
      featuredOrganiser: 'കേരള മുസ്ലിം ജമാഅത്ത് (KMJ)',
      featuredLeader: 'നേതൃത്വം: കാന്തപുരം എ. പി. അബൂബക്കർ മുസ്ലിയാർ',
      featuredQuote: '“മനുഷ്യർക്കൊപ്പം” — നീതിക്കും ഐക്യത്തിനും മാനവ സൗഹാർദ്ദത്തിനുമായൊരു ജനകീയ പ്രയാണം.',
      featuredDesc: 'കാസർകോട് ഹൊസങ്കടിയിൽ നിന്ന് ആരംഭിച്ച് തിരുവനന്തപുരത്ത് സമാപിച്ച കേരള യാത്ര 14 ജില്ലകളിലായി 24 ലക്ഷത്തിലധികം ജനങ്ങളുമായി സംവദിച്ചു. സ്നേഹ സന്ദേശങ്ങൾക്കൊപ്പം ജീവകാരുണ്യ സഹായങ്ങളും സൗജന്യ മെഡിക്കൽ കിറ്റുകളും വിതരണം ചെയ്തു.',
      sourceAttribution: 'പ്രസിദ്ധീകരിച്ച ആർക്കൈവ് റിപ്പോർട്ട് — ഉറവിടം: മലയാള മനോരമ (www.manoramaonline.com). ഔദ്യോഗികമായി രേഖപ്പെടുത്തിയത്.',
      readStory: 'വിശദമായി വായിക്കാം',
      wikiBackground: 'ചരിത്ര പശ്ചാത്തലം',
      shareStory: 'വാർത്ത പങ്കിടാം',
      items: [
        {
          id: 'n-1',
          category: 'ശതാബ്ദി',
          date: 'ജനുവരി 28, 2026',
          title: 'സമസ്ത ശതാബ്ദി സ്മാരക തപാൽ സ്റ്റാമ്പും ചരിത്ര ഗ്രന്ഥവും പ്രകാശനം ചെയ്തു',
          desc: 'കേരളത്തിന്റെ സാമൂഹിക നവോത്ഥാനത്തിൽ സമസ്ത വഹിച്ച പങ്കിനെ ആദരിച്ചുള്ള പ്രത്യേക പതിപ്പ്.',
          readTime: '3 മിനിറ്റ് വായന',
        },
        {
          id: 'n-2',
          category: 'വിദ്യാഭ്യാസം',
          date: 'ഫെബ്രുവരി 04, 2026',
          title: 'മദ്റസകൾക്കായി 1,000 സ്മാർട്ട് ഡിജിറ്റൽ ക്ലാസ് മുറികൾ സമർപ്പിച്ചു',
          desc: 'ശതാബ്ദി സാങ്കേതിക പദ്ധതിയുടെ ഭാഗമായി സയൻസ്, ഭാഷാ ലാബുകൾ സജ്ജീകരിച്ചു.',
          readTime: '4 മിനിറ്റ് വായന',
        },
        {
          id: 'n-3',
          category: 'സാമൂഹ്യസേവനം',
          date: 'ഫെബ്രുവരി 12, 2026',
          title: 'സ്നേഹപൂർവ്വം ഡയാലിസിസ് സെന്ററുകൾ 5 ജില്ലകളിലേക്ക് കൂടി വ്യാപിപ്പിച്ചു',
          desc: 'നിർധനരായ വൃക്കരോഗികൾക്ക് സൗജന്യ ഡയാലിസിസ് ചികിത്സ ഉറപ്പാക്കുന്ന സമസ്ത പദ്ധതി.',
          readTime: '5 മിനിറ്റ് വായന',
        },
      ],
    },
    events: {
      sectionTag: 'പരിപാടികളും സംഗമങ്ങളും',
      title: 'പരിപാടികളും രജിസ്ട്രേഷനും',
      subtitle: 'പരിപാടികളിൽ നിങ്ങളുടെ സീറ്റ് ഉറപ്പാക്കൂ. രജിസ്റ്റർ ചെയ്യുമ്പോൾ തന്നെ 3D ഹോളോഗ്രാഫിക് പാസ് ലഭിക്കുന്നു.',
      filterAll: 'എല്ലാ പരിപാടികളും',
      filterOnline: 'ഓൺലൈൻ',
      filterInPerson: 'നേരിട്ടുള്ള വേദികൾ',
      registerNow: 'രജിസ്റ്റർ ചെയ്യാം',
      capacityLeft: 'ബാക്കിയുള്ള സീറ്റുകൾ',
      items: [
        {
          id: 'ev-1',
          title: 'ശതാബ്ദി അക്കാദമിക് കൊളോക്കിയം: കേരളത്തിലെ ഇസ്ലാമിക പാണ്ഡിത്യം',
          date: 'മാർച്ച് 14, 2026',
          time: 'രാവിലെ 09:30 – വൈകുന്നേരം 04:30',
          venue: 'മർകസ് നോളജ് സിറ്റി ഓഡിറ്റോറിയം, കോഴിക്കോട്',
          type: 'in-person',
          district: 'കോഴിക്കോട്',
          language: 'ഇംഗ്ലീഷ് & മലയാളം',
          capacity: '85 സീറ്റുകൾ ബാക്കി',
        },
        {
          id: 'ev-2',
          title: 'ഗ്ലോബൽ യൂത്ത് ലീഡർഷിപ്പ് & വളണ്ടിയർ ഉച്ചകോടി',
          date: 'മാർച്ച് 21, 2026',
          time: 'വൈകുന്നേരം 06:00 – രാത്രി 09:30',
          venue: 'ശതാബ്ദി വെർച്വൽ പ്ലാറ്റ്‌ഫോം',
          type: 'online',
          district: 'ആഗോള സ്ട്രീം',
          language: 'മലയാളം / ഇംഗ്ലീഷ്',
          capacity: 'ഓൺലൈൻ സ്ട്രീമിംഗ്',
        },
        {
          id: 'ev-3',
          title: 'മഹാ ശതാബ്ദി സൗഹാർദ്ദ ജനകീയ സമ്മേളനം',
          date: 'ഏപ്രിൽ 02, 2026',
          time: 'വൈകുന്നേരം 04:00 – രാത്രി 08:30',
          venue: 'മറൈൻ ഡ്രൈവ് പവലിയൻ, കൊച്ചി',
          type: 'in-person',
          district: 'എറണാകുളം',
          language: 'മലയാളം & ഇംഗ്ലീഷ്',
          capacity: '320 സീറ്റുകൾ ബാക്കി',
        },
      ],
      modalTitle: 'പരിപാടി രജിസ്ട്രേഷൻ — സമസ്ത 100',
      formName: 'പൂർണ്ണ നാമം',
      formPhone: 'മൊബൈൽ / വാട്സാപ്പ് നമ്പർ',
      formEmail: 'ഇമെയിൽ വിലാസം',
      formInstitution: 'സ്ഥാപനം / ക്യാമ്പസ് / മഹല്ല്',
      formCategory: 'പങ്കാളി വിഭാഗം',
      formAccessibility: 'പ്രത്യേക സഹായമോ വീൽചെയർ സൗകര്യമോ ആവശ്യമെങ്കിൽ രേഖപ്പെടുത്തുക',
      formSubmit: 'സ്ഥിരീകരിച്ച് 3D പാസ് നേടാം',
      passTitle: 'ശതാബ്ദി പങ്കാളിത്ത പാസ്',
      passSubtitle: 'സമസ്ത 100 (1926–2026) സ്ഥിരീകരിച്ച പാസ്',
      passDownload: 'പാസ് ഡൗൺലോഡ് ചെയ്യാം',
      passCalendar: 'കലണ്ടറിലേക്ക് മാറ്റാം',
      passVenue: 'വേദിയുടെ മാപ്പ് കാണാം',
    },
    donations: {
      sectionTag: 'സുതാര്യമായ കാരുണ്യനിധി',
      title: 'ദൗത്യത്തിന് പിന്തുണ നൽകാം — ഓരോ രൂപയും പ്രകാശമാകുന്നു',
      subtitle: 'വിദ്യാഭ്യാസം, പുസ്തക ശേഖരം, ഡയാലിസിസ് സഹായം എന്നിവയ്ക്കായി 100% സുതാര്യമായ പദ്ധതികൾ.',
      causes: [
        {
          id: 'dn-1',
          title: 'ഉന്നതവിദ്യാഭ്യാസ സ്കോളർഷിപ്പ് ഫണ്ട്',
          desc: 'സാമ്പത്തികമായി പിന്നാക്കം നിൽക്കുന്ന സമർത്ഥരായ 1,200 വിദ്യാർത്ഥികൾക്ക് ബിരുദ-ഗവേഷണ പഠന സഹായം.',
          beneficiaries: '1,200 വിദ്യാർത്ഥികൾ',
          target: '₹50,00,000',
          raised: '₹38,45,000',
          progress: 77,
        },
        {
          id: 'dn-2',
          title: 'ഗ്രാമീണ ഗ്രന്ഥാലയ പുസ്തക ശേഖരം',
          desc: '500 ഗ്രാമീണ മദ്റസകളിലും ലൈബ്രറികളിലും മികച്ച റഫറൻസ് പുസ്തകങ്ങളും സയൻസ് കിറ്റുകളും ലഭ്യമാക്കുന്നു.',
          beneficiaries: '500 ഗ്രാമീണ ലൈബ്രറികൾ',
          target: '₹25,00,000',
          raised: '₹21,80,000',
          progress: 87,
        },
        {
          id: 'dn-3',
          title: 'സ്നേഹപൂർവ്വം സൗജന്യ ഡയാലിസിസ് സഹായം',
          desc: 'നിർധനരായ വൃക്കരോഗികൾക്ക് സൗജന്യ ജീവൻരക്ഷാ ഡയാലിസിസ് സെഷനുകളും മരുന്നുകളും നൽകുന്നു.',
          beneficiaries: '350 സ്ഥിരം രോഗികൾ',
          target: '₹40,00,000',
          raised: '₹31,20,000',
          progress: 78,
        },
        {
          id: 'dn-4',
          title: 'ഭിന്നശേഷി സൗഹൃദ ക്യാമ്പസ് ഫണ്ട്',
          desc: 'പ്രധാന വേദികളിലും സെന്ററുകളിലും വീൽചെയർ റാമ്പുകളും പ്രത്യേക സൗകര്യങ്ങളും ഒരുക്കുന്നു.',
          beneficiaries: 'എല്ലാ ഭിന്നശേഷി സുഹൃത്തുക്കളും',
          target: '₹15,00,000',
          raised: '₹14,10,000',
          progress: 94,
        },
      ],
      stepCause: '1. വിഭാഗം തിരഞ്ഞെടുക്കുക',
      stepAmount: '2. തുക തിരഞ്ഞെടുക്കുക',
      stepReview: '3. വിവരങ്ങൾ നൽകുക',
      stepComplete: '4. രസീത് നേടുക',
      btnDonate: 'ഈ നന്മയിൽ പങ്കുചേരാം',
      donorName: 'പൂർണ്ണ നാമം',
      donorEmail: 'രസീത് അയക്കേണ്ട ഇമെയിൽ',
      anonymous: 'പേര് രഹസ്യമായി സൂക്ഷിക്കുക',
      customAmount: 'മറ്റ് തുക നൽകുക (₹)',
      receiptTitle: 'ശതാബ്ദി സംഭാവന രസീത്',
      receiptNotice: 'ഡെമോ പേയ്‌മെന്റ് ഗേറ്റ്‌വേ വഴി വിജയകരമായി രേഖപ്പെടുത്തി — "എന്റെ പങ്കാളിത്തം" പേജിൽ സൂക്ഷിച്ചിരിക്കുന്നു.',
    },
    volunteering: {
      sectionTag: 'ശതാബ്ദി വളണ്ടിയർ സേന',
      title: 'സന്നദ്ധസേവനത്തിന് ചേരാം — നിങ്ങളുടെ സമയം നാടിനായി',
      subtitle: '25,000-ലധികം വളണ്ടിയർമാർക്കൊപ്പം ക്രമീകരണങ്ങളിലും സേവന രംഗങ്ങളിലും അണിചേരൂ.',
      teams: [
        {
          id: 'vt-1',
          title: 'സ്വീകരണ & അതിഥി സൽക്കാര വിഭാഗം',
          desc: 'വേദികളിലെത്തുന്ന അതിഥികളെ സ്വീകരിക്കൽ, മുതിർന്ന പൗരന്മാർക്ക് മാർഗ്ഗനിർദ്ദേശം നൽകൽ.',
          roles: ['റിസപ്ഷൻ കോർഡിനേറ്റർ', 'അതിഥി സൽക്കാരം', 'ഹെൽപ് ഡെസ്ക്'],
          slotsLeft: 42,
        },
        {
          id: 'vt-2',
          title: 'വേദി & ലോജിസ്റ്റിക്സ് ടീം',
          desc: 'സമ്മേളന നഗരിയിലെ സ്റ്റേജ് ക്രമീകരണങ്ങൾ, സൗണ്ട് & ലൈറ്റിംഗ് സഹായം, സമയക്രമം പാലിക്കൽ.',
          roles: ['സ്റ്റേജ് കോർഡിനേറ്റർ', 'ഹാൾ മാനേജർ', 'ലോജിസ്റ്റിക്സ്'],
          slotsLeft: 28,
        },
        {
          id: 'vt-3',
          title: 'ഡിജിറ്റൽ മീഡിയ & ലൈവ് ടീം',
          desc: 'തത്സമയ ഫോട്ടോകൾ, സോഷ്യൽ മീഡിയ അപ്‌ഡേറ്റുകൾ, ലൈവ് സ്ട്രീം നിരീക്ഷണം, വാർത്താ വിതരണം.',
          roles: ['ലൈവ് കവറേജ്', 'ഫോട്ടോഗ്രാഫർ', 'സ്ട്രീം ഓപ്പറേറ്റർ'],
          slotsLeft: 19,
        },
        {
          id: 'vt-4',
          title: 'ഭാഷാ & പരിഭാഷാ വിഭാഗം',
          desc: 'അറബിക്, ഉറുദു, ഇംഗ്ലീഷ് ഭാഷകളിലെ പ്രസംഗങ്ങൾ അതിഥികൾക്കായി തത്സമയം പരിഭാഷപ്പെടുത്തൽ.',
          roles: ['ഇംഗ്ലീഷ് പരിഭാഷകൻ', 'അറബിക് ലെയ്സൺ', 'ലൈവ് സ്ക്രൈബ്'],
          slotsLeft: 15,
        },
        {
          id: 'vt-5',
          title: 'സാന്ത്വന പരിചരണവും ശുചിത്വ സേനയും',
          desc: 'പ്രഥമശുശ്രൂഷാ സഹായം, കുടിവെള്ള വിതരണം, സമ്മേളന നഗരിയിലെ ഹരിത ശുചീകരണ പ്രവർത്തനങ്ങൾ.',
          roles: ['ഫസ്റ്റ് എയ്ഡ് ടീം', 'കുടിവെള്ള വിതരണം', 'ഗ്രീൻ വോളന്റിയർ'],
          slotsLeft: 34,
        },
      ],
      formTitle: 'വളണ്ടിയർ അപേക്ഷാ ഫോം',
      formDistrict: 'സ്വന്തം ജില്ല',
      formRole: 'താൽപ്പര്യമുള്ള ടീം',
      formSkills: 'മുൻപരിചയമോ പ്രത്യേക വൈദഗ്ധ്യമോ',
      formAvailability: 'ലഭ്യമായ സമയം (പൂർണ്ണ സമയം / വാരാന്ത്യങ്ങൾ / പ്രത്യേക ദിവസങ്ങൾ)',
      formSubmit: 'അപേക്ഷ സമർപ്പിക്കാം',
      confirmationTitle: 'വളണ്ടിയർ രജിസ്ട്രേഷൻ വിജയകരം!',
    },
    campaigns: {
      sectionTag: 'ജനകീയ ക്യാമ്പയിനുകൾ',
      title: 'ക്യാമ്പയിനുകൾ — കർമ്മങ്ങളിലൂടെ ആഘോഷിക്കാം',
      subtitle: 'പുസ്തകങ്ങൾ സമ്മാനിച്ചും സമയം മാറ്റിവെച്ചും ഓർമ്മകൾ പങ്കുവെച്ചും നൂറാം വാർഷികത്തിൽ പങ്കുചേരാം.',
      list: [
        {
          id: 'cmp-1',
          title: 'ഒരു പുസ്തകം. ഒരു പുതിയ തുടക്കം.',
          tagline: 'ഗ്രാമീണ വിദ്യാർത്ഥികൾക്കായി പുസ്തകങ്ങളും റഫറൻസ് ഗ്രന്ഥങ്ങളും നൽകാനുള്ള ജനകീയ യജ്ഞം.',
          progress: 82,
          countLabel: '41,200 / 50,000 പുസ്തകങ്ങൾ സമാഹരിച്ചു',
          cta: 'പുസ്തക ക്യാമ്പയിനിൽ ചേരാം',
        },
        {
          id: 'cmp-2',
          title: 'മറ്റുള്ളവർക്കായി ഒരു മണിക്കൂർ',
          tagline: 'നാടിന്റെ ശുചിത്വത്തിനായോ രോഗീപരിചരണത്തിനായോ കുട്ടികളെ പഠിപ്പിക്കാനായോ ഒരു മണിക്കൂർ മാറ്റിവെക്കൂ.',
          progress: 68,
          countLabel: '68,400 / 100,000 മണിക്കൂറുകൾ ലഭിച്ചു',
          cta: 'എന്റെ സമയം നൽകാം',
        },
        {
          id: 'cmp-3',
          title: 'എന്റെ ശതാബ്ദി ഓർമ',
          tagline: 'നിങ്ങളുടെ കുടുംബത്തിലോ നാട്ടിലോ സമസ്ത സമ്മേളനങ്ങളുമായി ബന്ധപ്പെട്ട അപൂർവ്വ ഓർമ്മകൾ പങ്കുവെക്കൂ.',
          progress: 91,
          countLabel: '4,550 ഓർമ്മക്കുറിപ്പുകൾ ലഭിച്ചു',
          cta: 'എന്റെ ഓർമ പങ്കിടാം',
        },
      ],
      storyWallTitle: 'ശതാബ്ദി ഓർമ്മ മതിൽ (Story Wall)',
      storyWallSubtitle: 'നാല് തലമുറകളുടെ സ്നേഹവും ഐക്യവും വിജ്ഞാനവും തുടിക്കുന്ന അനുഭവ സാക്ഷ്യങ്ങൾ.',
      stories: [
        {
          id: 'st-1',
          author: 'കെ. കുഞ്ഞാലി ഹാജി',
          location: 'തിരൂർ, മലപ്പുറം',
          quote: '“1976-ലെ സുവർണ്ണ ജൂബിലിക്ക് ഉപ്പയുടെ കൈപിടിച്ച് തീവണ്ടി കയറി കോഴിക്കോട് എത്തിയത് ഇന്നലത്തെപ്പോലെ ഓർക്കുന്നു. ഇന്ന് എന്റെ പേരക്കുട്ടി ഡിജിറ്റൽ വളണ്ടിയറായി നിൽക്കുന്നത് കാണുമ്പോൾ കൃതജ്ഞതയാൽ കണ്ണ് നിറയുന്നു.”',
          year: '1976 & 2026',
        },
        {
          id: 'st-2',
          author: 'ഫാത്തിമ സുഹ്റ',
          location: 'സുൽത്താൻ ബത്തേരി, വയനാട്',
          quote: '“2012-ൽ സമസ്ത നൽകിയ വിദ്യാഭ്യാസ സ്കോളർഷിപ്പാണ് എന്നെ ബിരുദധാരിയാക്കിയത്. ഇന്ന് ഞാൻ സ്കൂളിൽ രസതന്ത്രം പഠിപ്പിക്കുമ്പോൾ എന്നെപ്പോലെയുള്ള കുട്ടികൾക്ക് താങ്ങാവാൻ സാധിക്കുന്നു.”',
          year: 'പൂർവ്വ വിദ്യാർത്ഥിനി 2012',
        },
        {
          id: 'st-3',
          author: 'അഡ്വ. മുസ്തഫ റഹ്‌മാൻ',
          location: 'കൊച്ചി, എറണാകുളം',
          quote: '“സമൂഹത്തിൽ ജീവിക്കുമ്പോൾ അയൽക്കാരെ സ്നേഹിക്കാനും അനീതിക്കെതിരെ നിൽക്കാനും നമ്മെ പഠിപ്പിച്ചത് പണ്ഡിതരുടെ മാർഗ്ഗദർശനമാണ്. അതാണ് കേരളത്തിന്റെ നന്മ.”',
          year: 'യൂത്ത് പ്രതിനിധി',
        },
        {
          id: 'st-4',
          author: 'ഡോ. അബ്ദുൽ റഷീദ്',
          location: 'ദുബായ് / കണ്ണൂർ',
          quote: '“പ്രവാസ ജീവിതത്തിലും കാരുണ്യത്തിന്റെയും സത്യസന്ധതയുടെയും പാതയിൽ ഉറച്ചുനിൽക്കാൻ ഐ.സി.എഫും സമസ്തയുടെ മൂല്യങ്ങളും എന്നും ഞങ്ങൾക്ക് വഴികാട്ടിയായി.”',
          year: 'പ്രവാസി വളണ്ടിയർ',
        },
      ],
      modalBookTitle: 'പുസ്തകങ്ങൾ സംഭാവന ചെയ്യാം',
      modalTimeTitle: 'സേവന മണിക്കൂറുകൾ പ്രതിജ്ഞ ചെയ്യാം',
      modalStoryTitle: 'നിങ്ങളുടെ ശതാബ്ദി ഓർമ്മ രേഖപ്പെടുത്താം',
      consentText: 'ഈ ഓർമ്മക്കുറിപ്പും വിവരങ്ങളും ശതാബ്ദി വെബ്സൈറ്റിൽ പരസ്യമായി പ്രദർശിപ്പിക്കാൻ ഞാൻ സമ്മതിക്കുന്നു.',
    },
    media: {
      sectionTag: 'ഡിജിറ്റൽ ആർക്കൈവ് & പ്രക്ഷേപണം',
      title: 'മാധ്യമം & യൂട്യൂബ് — @SamasthaGraph',
      subtitle: 'ഔദ്യോഗിക ഡോക്യുമെന്ററികൾ, ചരിത്ര പ്രഭാഷണങ്ങൾ, ശതാബ്ദി ഗാനങ്ങൾ എന്നിവ കാണാം.',
      channelHandle: '@SamasthaGraph',
      featuredVideoTitle: 'സമസ്ത 100: നൂറ്റാണ്ടിന്റെ ഒരുമ (ഔദ്യോഗിക ഡോക്യുമെന്ററി)',
      featuredVideoDesc: '1926-ലെ കോഴിക്കോട് സമ്മേളനം മുതൽ വിദ്യാഭ്യാസ വിപ്ലവവും ആധുനിക സേവനങ്ങളും വരെയുള്ള സമഗ്രമായ 45 മിനിറ്റ് ചരിത്രാവിഷ്കാരം.',
      btnChannel: 'യൂട്യൂബ് ചാനൽ കാണാം',
      btnMore: 'കൂടുതൽ വീഡിയോകൾ',
      btnSubscribe: 'യൂട്യൂബിൽ സബ്സ്ക്രൈബ് ചെയ്യാം',
      videos: [
        { id: 'v-1', title: 'ശതാബ്ദി സ്വാഗത ഗാനം: നൂറാണ്ടിന്റെ ഒരുമ (Official Audio)', duration: '04:18', badge: 'തീം സോങ്', date: 'ജനുവരി 2026' },
        { id: 'v-2', title: 'മഹാ സമ്മേളന ഉദ്ഘാടന പ്രഭാഷണം: ശൈഖ് അബൂബക്കർ അഹ്‌മദ്', duration: '54:10', badge: 'റെക്കോർഡഡ്', date: 'ജനുവരി 2026' },
        { id: 'v-3', title: 'കേരള യാത്ര 2026: പ്രധാന നിമിഷങ്ങളും ജനപങ്കാളിത്തവും', duration: '28:45', badge: 'ഡോക്യുമെന്ററി', date: 'ജനുവരി 2026' },
        { id: 'v-4', title: 'കേരളത്തിലെ ഇസ്ലാമിക പൗരാണിക കൈയെഴുത്തുപ്രതികൾ', duration: '19:22', badge: 'പൈതൃകം', date: 'ഫെബ്രുവരി 2026' },
      ],
    },
    journey: {
      sectionTag: '1926 – 2026 ചരിത്ര നാൾവഴികൾ',
      title: 'നമ്മുടെ യാത്ര — ഒരു നൂറ്റാണ്ടിന്റെ ജീവചരിത്രം',
      subtitle: 'കേരളത്തിലെ ഏറ്റവും വലിയ ജനകീയ വിദ്യാഭ്യാസ പ്രസ്ഥാനം വളർന്നു പന്തലിച്ച നിർണ്ണായക നാഴികക്കല്ലുകൾ.',
      eras: [
        {
          year: '1926',
          title: 'കോഴിക്കോട്ടെ ചരിത്ര രൂപീകരണം',
          desc: '1926 ജൂൺ 26-ന് കോഴിക്കോട് ടൗൺഹാളിൽ സമുന്നത പണ്ഡിതന്മാർ ഒത്തുചേർന്ന് പാരമ്പര്യ ഇസ്ലാമിക മൂല്യങ്ങളുടെ സംരക്ഷണത്തിനായി സമസ്തയ്ക്ക് രൂപം നൽകി.',
          milestone: 'ഔദ്യോഗിക രജിസ്ട്രേഷനും സമ്പൂർണ്ണ ഐക്യ പ്രഖ്യാപനവും.',
          source: 'സമസ്ത ആർക്കൈവ് ഗസറ്റ് വാല്യം 1',
        },
        {
          year: '1951',
          title: 'മദ്റസാ വിദ്യാഭ്യാസ ബോർഡ് വിപ്ലവം',
          desc: 'ഏകീകൃത പാഠ്യപദ്ധതിയും ചിട്ടയായ അധ്യാപക പരിശീലനവും ഏർപ്പെടുത്തി, ഒരു കുട്ടിയും ധാർമ്മിക വിദ്യ ലഭിക്കാതെ വളരരുത് എന്ന ലക്ഷ്യം നടപ്പാക്കി.',
          milestone: 'ആധുനിക സിലബസ് മാതൃകയിലുള്ള മദ്റസാ പഠനത്തിന് തുടക്കം.',
          source: 'വിദ്യാഭ്യാസ ബോർഡ് ചരിത്ര രേഖകൾ',
        },
        {
          year: '1989',
          title: 'ഉന്നതവിദ്യാഭ്യാസ സ്ഥാപനങ്ങളുടെ വികേന്ദ്രീകരണം',
          desc: 'ജാമിഅ മർകസ് ഉൾപ്പെടെയുള്ള വിജ്ഞാന നഗരികളുടെയും ആധുനിക കോളേജുകളുടെയും സ്ഥാപനം. പതിനായിരക്കണക്കിന് വിദ്യാർത്ഥികൾക്ക് ബിരുദ പഠനം.',
          milestone: 'സംസ്ഥാനത്തുടനീളം റെസിഡൻഷ്യൽ ക്യാമ്പസുകളുടെ ശൃംഖല.',
          source: 'ഉന്നത വിദ്യാഭ്യാസ കമ്മീഷൻ റിപ്പോർട്ട്',
        },
        {
          year: '2026',
          title: 'ശതാബ്ദിയും അടുത്ത നൂറ്റാണ്ടും',
          desc: 'സമസ്ത 100: സ്മാർട്ട് ഡിജിറ്റൽ മദ്റസകൾ, ആഗോള സൗഹാർദ്ദ ഇരിപ്പിടങ്ങൾ, ഗ്രീൻ ഹ്യൂമാനിറ്റേറിയൻ സംരംഭങ്ങൾ, എ.ഐ അധിഷ്ഠിത ലേണിംഗ് പ്ലാറ്റ്‌ഫോമുകൾ.',
          milestone: 'നൂറ്റാണ്ടിന്റെ നന്മ ആഘോഷിച്ച് 2126-ലേക്കുള്ള മുന്നേറ്റം.',
          source: 'ശതാബ്ദി പ്രഖ്യാപന രേഖ 2026',
        },
      ],
      ctaEvent: 'പരിപാടികളിൽ പങ്കെടുക്കാം',
      ctaVolunteer: 'സന്നദ്ധസേവനത്തിന് ചേരാം',
      ctaDonate: 'ദൗത്യത്തിന് പിന്തുണ നൽകാം',
    },
    myParticipation: {
      title: 'എന്റെ പങ്കാളിത്തം (My Participation)',
      subtitle: 'നിങ്ങളുടെ ശതാബ്ദി പാസുകൾ, ലൈവ് സ്ട്രീം റിമൈൻഡറുകൾ, വളണ്ടിയർ അപേക്ഷകൾ, സംഭാവന രസീതുകൾ എന്നിവയുടെ കേന്ദ്രം.',
      emptyTitle: 'ഇതുവരെ പ്രവർത്തനങ്ങളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല',
      emptyDesc: 'പരിപാടികളിൽ രജിസ്റ്റർ ചെയ്തോ, റിമൈൻഡർ സെറ്റ് ചെയ്തോ, സമയം പ്രതിജ്ഞ ചെയ്തോ ഈ ഡാഷ്‌ബോർഡ് സജീവമാക്കൂ.',
      tabEvents: 'എന്റെ പാസുകൾ',
      tabReminders: 'സ്ട്രീം റിമൈൻഡറുകൾ',
      tabVolunteering: 'വളണ്ടിയറിംഗ്',
      tabContributions: 'സംഭാവനകൾ',
      tabCampaigns: 'ക്യാമ്പയിനുകൾ',
      tabStories: 'എന്റെ ഓർമ്മകൾ',
      exploreEvents: 'പരിപാടികൾ കാണാം',
      findRole: 'വളണ്ടിയർ റോൾ കണ്ടെത്താം',
      joinCampaign: 'ക്യാമ്പയിനിൽ ചേരാം',
    },
    footer: {
      heritageQuote: '“അറിവ് മനുഷ്യനന്മയ്ക്കായി വിനിയോഗിക്കപ്പെടുമ്പോൾ അത് അനശ്വരമാകുന്നു. വിജ്ഞാനത്തിന്റെയും ഐക്യത്തിന്റെയും കാരുണ്യത്തിന്റെയും 100 വർഷങ്ങൾ.”',
      quickLinksTitle: 'വേഗവഴികൾ',
      contactTitle: 'ശതാബ്ദി സെക്രട്ടേറിയറ്റ്',
      contactAddress: 'സമസ്ത ശതാബ്ദി ഡയറക്ടറേറ്റ്, കോഴിക്കോട്, കേരളം 673004',
      contactPhone: '+91 495 272 1926',
      contactEmail: 'centenary@samasthalive.org',
      rights: '© 1926–2026 സമസ്ത കേരള ജംഇയ്യത്തുൽ ഉലമ. സർവ്വ അവകാശങ്ങളും നിക്ഷിപ്തം.',
      accessibilityStatement: 'WCAG 2.1 AA മാനദണ്ഡങ്ങൾക്ക് അനുസൃതമായ കോൺട്രാസ്റ്റും ദ്വിഭാഷാ ഫോണ്ടുകളും ഉൾപ്പെടുത്തി നിർമ്മിച്ചത്.',
      designedFor: 'ജനറൽ ഇന്റർ-ക്യാമ്പസ് ഫെസ്റ്റ് ബിൽഡ്-എ-തോൺ 2026 പ്രദർശനത്തിനായി സമർപ്പിക്കുന്നത്',
    },
  },
};
