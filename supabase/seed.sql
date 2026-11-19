-- ==============================================================================
-- SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
-- SEED DATA: supabase/seed.sql
-- Description: Authoritative seed data for centenary categories, events,
--              historical timeline (1926-2026), volunteer roles, and campaigns.
-- ==============================================================================

-- 1. EVENT CATEGORIES
INSERT INTO public.event_categories (id, slug, name_en, name_ml, description_en, description_ml, display_order)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'conferences', 'Conferences & Summits', 'സമ്മേളനങ്ങൾ', 'Centenary intellectual discourses, academic seminars, and leadership assemblies.', 'ശതാബ്ദി പണ്ഡിത സദസ്സുകളും അക്കാദമിക് സെമിനാറുകളും നേതൃത്വ സംഗമങ്ങളും.', 1),
    ('c2222222-2222-2222-2222-222222222222', 'exhibitions', 'Heritage Exhibitions', 'ചരിത്ര പ്രദർശനങ്ങൾ', 'Centenary archives, rare manuscripts, and historical artifact exhibitions.', 'ശതാബ്ദി രേഖകളും അപൂർവ കൈയെഴുത്തുപ്രതികളും ചരിത്ര പ്രദർശനങ്ങളും.', 2),
    ('c3333333-3333-3333-3333-333333333333', 'youth-summits', 'Youth & Student Meets', 'യുവജന സംഗമങ്ങൾ', 'Empowering youth leadership, moral education, and community volunteering.', 'യുവ നേതൃത്വം, ധാർമിക വിദ്യാഭ്യാസം, സന്നദ്ധ സേവനം എന്നിവ ലക്ഷ്യമിട്ടുള്ള പരിപാടികൾ.', 3),
    ('c4444444-4444-4444-4444-444444444444', 'grand-conclave', 'Centenary Grand Conclave', 'മഹാ സമ്മേളനം', 'The historic centenary grand finale culminating 100 years of service (1926-2026).', '1926 മുതൽ 2026 വരെയുള്ള 100 വർഷത്തെ സേവനത്തിന്റെ ചരിത്രപ്രസിദ്ധമായ ശതാബ്ദി മഹാസമ്മേളനം.', 4)
ON CONFLICT (slug) DO NOTHING;

-- 2. PUBLISHED EVENTS
INSERT INTO public.events (
    id, slug, title_en, title_ml, description_en, description_ml,
    start_time, end_time, location_name_en, location_name_ml, location_address,
    category_id, registration_enabled, registration_capacity, registration_deadline,
    publication_status, lifecycle_status, is_featured
) VALUES
(
    'e1111111-1111-1111-1111-111111111111',
    'centenary-inaugural-symposium',
    'Samastha Centenary Inaugural Symposium',
    'സമസ്ത ശതാബ്ദി പ്രാരംഭ സിമ്പോസിയം',
    'National symposium commemorating 100 years of educational and spiritual leadership (1926-2026).',
    'വിദ്യാഭ്യാസ, ആത്മീയ രംഗത്തെ 100 വർഷത്തെ നേതൃത്വത്തിന് ആദരമർപ്പിക്കുന്ന ദേശീയ സിമ്പോസിയം.',
    NOW() + INTERVAL '5 days',
    NOW() + INTERVAL '5 days 8 hours',
    'Centenary Grand Hall, Kozhikode',
    'ശതാബ്ദി ഗ്രാൻഡ് ഹാൾ, കോഴിക്കോട്',
    'Kozhikode, Kerala, India',
    'c1111111-1111-1111-1111-111111111111',
    TRUE,
    2500,
    NOW() + INTERVAL '4 days',
    'published',
    'upcoming',
    TRUE
),
(
    'e2222222-2222-2222-2222-222222222222',
    'historical-manuscript-expo',
    'Century of Heritage: Rare Manuscript & Archival Exhibition',
    'പൈതൃക നൂറ്റാണ്ട്: ചരിത്ര രേഖാ പ്രദർശനം',
    'Exclusive exhibition of century-old records, publications, and resolutions of Samastha since 1926.',
    '1926 മുതലുള്ള സമസ്തയുടെ ശതാബ്ദി രേഖകളും ചരിത്ര പ്രസിദ്ധീകരണങ്ങളും ഉൾക്കൊള്ളുന്ന അപൂർവ പ്രദർശനം.',
    NOW() + INTERVAL '12 days',
    NOW() + INTERVAL '15 days',
    'Darul Huda Campus Pavilion, Chemmad',
    'ദാറുൽ ഹുദാ കാമ്പസ് പവലിയൻ, ചെമ്മാട്',
    'Malappuram, Kerala, India',
    'c2222222-2222-2222-2222-222222222222',
    TRUE,
    10000,
    NOW() + INTERVAL '11 days',
    'published',
    'upcoming',
    FALSE
),
(
    'e3333333-3333-3333-3333-333333333333',
    'national-youth-leadership-conclave',
    'Centenary Youth Leadership & Volunteer Conclave',
    'ശതാബ്ദി യുവജന നേതൃത്വ സന്നദ്ധ സംഗമം',
    'A nationwide convention of delegates dedicated to social welfare, education, and moral guidance.',
    'സാമൂഹിക ക്ഷേമം, വിദ്യാഭ്യാസം, ധാർമിക മുന്നേറ്റം എന്നിവക്കായി സംഘടിപ്പിക്കുന്ന അഖിലേന്ത്യാ യുവജന സംഗമം.',
    NOW() + INTERVAL '20 days',
    NOW() + INTERVAL '21 days',
    'Nehru Stadium Grounds, Kottayam',
    'നെഹ്റു സ്റ്റേഡിയം ഗ്രൗണ്ട്സ്, കോട്ടയം',
    'Kottayam, Kerala, India',
    'c3333333-3333-3333-3333-333333333333',
    TRUE,
    5000,
    NOW() + INTERVAL '19 days',
    'published',
    'upcoming',
    TRUE
)
ON CONFLICT (slug) DO NOTHING;

-- 3. EVENT UPDATES
INSERT INTO public.event_updates (event_id, title_en, title_ml, content_en, content_ml, published_at)
VALUES
(
    'e1111111-1111-1111-1111-111111111111',
    'Delegate Registration Desk Operational',
    'പ്രതിനിധി രജിസ്ട്രേഷൻ ഡെസ്ക് പ്രവർത്തനം ആരംഭിച്ചു',
    'Digital passes and QR confirmation codes are now being issued to verified registrants.',
    'സ്ഥിരീകരിച്ച പ്രതിനിധികൾക്കുള്ള ഡിജിറ്റൽ പാസുകളും ക്യുആർ കോഡുകളും വിതരണം ചെയ്യാൻ തുടങ്ങി.',
    NOW() - INTERVAL '1 hour'
);

-- 4. HISTORICAL TIMELINE MILESTONES (1926 - 2026)
INSERT INTO public.historical_milestones (
    milestone_year, milestone_date, title_en, title_ml,
    description_en, description_ml, source_references,
    verification_status, publication_status, display_order
) VALUES
(
    '1926',
    '1926-06-26',
    'Establishment of Samastha Kerala Jamiyyathul Ulama',
    'സമസ്ത കേരള ജംഇയ്യത്തുൽ ഉലമ രൂപീകരണം',
    'Historic gathering at Kozhikode Town Hall formally instituting Samastha under the leadership of Varakkal Mullakoya Thangal.',
    'വരക്കൽ മുല്ലക്കോയ തങ്ങളുടെ നേതൃത്വത്തിൽ കോഴിക്കോട് ടൗൺഹാളിൽ വെച്ച് സമസ്ത ഔദ്യോഗികമായി രൂപീകൃതമായി.',
    'Samastha Golden Jubilee Souvenir, Official Archives 1926',
    'verified',
    'published',
    1
),
(
    '1945',
    '1945-12-15',
    'Formation of Islamic Education Board',
    'വിദ്യാഭ്യാസ ബോർഡിന്റെ രൂപീകരണം',
    'Formal constitution of the unified Madrasa education board revolutionizing curriculum and moral training.',
    'മദ്റസാ പാഠ്യപദ്ധതി ഏകീകരിക്കാനും ധാർമിക വിദ്യാഭ്യാസം ശാക്തീകരിക്കാനുമായി വിദ്യാഭ്യാസ ബോർഡ് നിലവിൽ വന്നു.',
    'Centenary Education Board Chronicle',
    'verified',
    'published',
    2
),
(
    '1989',
    '1989-02-28',
    'Samastha Diamond Jubilee Conference',
    'സമസ്ത വജ്ര ജൂബിലി മഹാ സമ്മേളനം',
    'Massive mobilization in Kozhikode reaffirming institutional solidarity and educational expansion.',
    'കോഴിക്കോട് കടപ്പുറത്ത് ലക്ഷങ്ങൾ പങ്കെടുത്ത വജ്ര ജൂബിലി സമ്മേളനം.',
    'Samastha 60th Year Proceedings',
    'verified',
    'published',
    3
),
(
    '2026',
    '2026-06-26',
    'Centenary Celebration (1926-2026)',
    'ശതാബ്ദി നിറവിൽ സമസ്ത (1926-2026)',
    'Celebrating a glorious century of educational renaissance, communal harmony, and societal empowerment.',
    'വിദ്യാഭ്യാസ വിപ്ലവത്തിന്റെയും സാമൂഹിക ശാക്തീകരണത്തിന്റെയും സൗഹാർദത്തിന്റെയും മഹത്തായ 100 വർഷങ്ങൾ.',
    'Samastha Centenary Official Resolution 2026',
    'verified',
    'published',
    4
)
ON CONFLICT DO NOTHING;

-- 5. VOLUNTEER OPPORTUNITIES
INSERT INTO public.volunteer_opportunities (
    id, slug, title_en, title_ml, description_en, description_ml,
    category, location, skills_needed, capacity, status
) VALUES
(
    'v1111111-1111-1111-1111-111111111111',
    'crowd-management-logistics',
    'Crowd Management & Logistics Team',
    'ക്രൗഡ് മാനേജ്‌മെന്റ് & ലോജിസ്റ്റിക്സ് ടീം',
    'Assisting delegates, managing traffic flow, and ensuring smooth hall seating at major centenary venues.',
    'പ്രതിനിധികളെ സഹായിക്കൽ, ഗതാഗത നിയന്ത്രണം, വേദിയിലെ ഇരിപ്പിട ക്രമീകരണങ്ങൾ ഉറപ്പുവരുത്തൽ.',
    'Logistics',
    'Kozhikode & Malappuram',
    ARRAY['Discipline', 'Communication', 'First-Aid Orientation'],
    500,
    'open'
),
(
    'v2222222-2222-2222-2222-222222222222',
    'multilingual-media-press',
    'Multilingual Press & Digital Media Volunteers',
    'മീഡിയ & ഡിജിറ്റൽ കണ്ടന്റ് വോളണ്ടിയർമാർ',
    'Drafting live updates in English and Malayalam, photography, and social communication support.',
    'തത്സമയ വാർത്തകൾ തയ്യാറാക്കൽ, ഫോട്ടോഗ്രാഫി, ഡിജിറ്റൽ സന്ദേശ വിതരണം എന്നിവ.',
    'Media',
    'Hybrid / Remote & On-Site',
    ARRAY['Malayalam Typing', 'English Writing', 'Content Curation', 'Social Media'],
    150,
    'open'
),
(
    'v3333333-3333-3333-3333-333333333333',
    'medical-first-aid-wing',
    'Centenary Health & First Aid Wing',
    'മെഡിക്കൽ & ഫസ്റ്റ് എയ്ഡ് വിഭാഗം',
    'Providing immediate basic healthcare, hydration, and emergency medical assistance for delegates.',
    'പ്രതിനിധികൾക്കായി പ്രാഥമിക ചികിത്സാ സൗകര്യങ്ങളും അടിയന്തര വൈദ്യസഹായവും നൽകൽ.',
    'Healthcare',
    'All Venues',
    ARRAY['Medical Training', 'Nursing / Paramedic', 'Empathy'],
    200,
    'open'
)
ON CONFLICT (slug) DO NOTHING;

-- 6. CENTENARY CAMPAIGNS
INSERT INTO public.campaigns (
    id, slug, title_en, title_ml, description_en, description_ml,
    start_time, end_time, participation_target, publication_status, campaign_status
) VALUES
(
    'cp111111-1111-1111-1111-111111111111',
    '100k-tree-plantation-drive',
    'Centenary Green Earth: 100,000 Tree Planting Initiative',
    'ശതാബ്ദി ഹരിതം: ഒരു ലക്ഷം വൃക്ഷത്തൈ നടീൽ യജ്ഞം',
    'Community environmental campaign planting 100,000 shade and fruit saplings across institutions.',
    'വിദ്യാഭ്യാസ സ്ഥാപനങ്ങളിലും വീടുകളിലും ഒരു ലക്ഷം ഫലവൃക്ഷത്തൈകൾ നട്ടുപിടിപ്പിക്കുന്ന പരിസ്ഥിതി ക്യാമ്പയിൻ.',
    NOW() - INTERVAL '10 days',
    NOW() + INTERVAL '80 days',
    100000,
    'published',
    'active'
),
(
    'cp222222-2222-2222-2222-222222222222',
    'centenary-reading-pledge',
    '100-Hour Heritage Reading & Knowledge Pledge',
    'ശതാബ്ദി വായന പ്രതിജ്ഞ: 100 മണിക്കൂർ ജ്ഞാനസപര്യ',
    'Encouraging students and youth to devote 100 hours to foundational books, values, and community history.',
    'വിദ്യാർത്ഥികളും യുവാക്കളും 100 മണിക്കൂർ ധാർമിക ചരിത്ര പുസ്തകങ്ങൾക്കായി സമർപ്പിക്കുന്ന വായനാ യജ്ഞം.',
    NOW() - INTERVAL '5 days',
    NOW() + INTERVAL '90 days',
    50000,
    'published',
    'active'
)
ON CONFLICT (slug) DO NOTHING;

-- 7. ANNOUNCEMENTS
INSERT INTO public.announcements (
    title_en, title_ml, content_en, content_ml,
    priority, publication_status, published_at
) VALUES
(
    'Samastha Centenary Global Registration Portal Officially Live',
    'സമസ്ത ശതാബ്ദി ആഗോള രജിസ്ട്രേഷൻ പോർട്ടൽ പ്രവർത്തനക്ഷമമായി',
    'Delegates, volunteers, and participants worldwide can now register online for centenary sessions and campaigns.',
    'ലോകമെമ്പാടുമുള്ള പ്രതിനിധികൾക്കും സന്നദ്ധപ്രവർത്തകർക്കും ഇപ്പോൾ ശതാബ്ദി പരിപാടികൾക്കായി ഓൺലൈനായി രജിസ്റ്റർ ചെയ്യാം.',
    'urgent',
    'published',
    NOW() - INTERVAL '2 hours'
),
(
    'Volunteer Registration Call for Calicut & Malappuram Conclaves',
    'കോഴിക്കോട്, മലപ്പുറം സമ്മേളനങ്ങൾക്കുള്ള വോളണ്ടിയർ രജിസ്ട്രേഷൻ ആരംഭിച്ചു',
    'Dedicated youth volunteers may apply online through the official volunteer module.',
    'താൽപ്പര്യമുള്ള യുവാക്കൾക്ക് ഔദ്യോഗിക വോളണ്ടിയർ മൊഡ്യൂൾ വഴി ഓൺലൈനായി അപേക്ഷിക്കാം.',
    'high',
    'published',
    NOW() - INTERVAL '1 day'
);

-- 8. SYSTEM SETTINGS
INSERT INTO public.site_settings (key, value, description)
VALUES
    ('general', '{"site_name": "SAMASTHA LIVE 1926-2026", "support_email": "contact@samasthalive.com", "centenary_year": 2026}'::jsonb, 'General Centenary site configuration'),
    ('features', '{"registrations_open": true, "volunteering_open": true, "campaigns_open": true, "donations_demo_mode": true}'::jsonb, 'Feature flags controlling live modules')
ON CONFLICT (key) DO NOTHING;

-- 9. INITIALIZE ACTIVITY METRICS
SELECT public.recalculate_activity_metrics();
