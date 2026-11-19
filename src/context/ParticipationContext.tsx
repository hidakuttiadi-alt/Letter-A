'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface EventPass {
  id: string;
  reference: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  fullName: string;
  email: string;
  phone: string;
  institution?: string;
  category: string;
  accessibility?: string;
  createdAt: string;
}

export interface StreamReminder {
  id: string;
  title: string;
  speaker: string;
  venue: string;
  time: string;
  createdAt: string;
}

export interface VolunteerApplicationRecord {
  id: string;
  reference: string;
  teamId: string;
  teamTitle: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  skills: string;
  availability: string;
  status: 'Pending Review' | 'Confirmed';
  createdAt: string;
}

export interface ContributionRecord {
  id: string;
  reference: string;
  causeId: string;
  causeTitle: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  status: 'Completed';
  createdAt: string;
}

export interface CampaignPledgeRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  pledgeText: string;
  pledgerName: string;
  createdAt: string;
}

export interface StorySubmissionRecord {
  id: string;
  author: string;
  location: string;
  quote: string;
  year: string;
  createdAt: string;
}

interface ParticipationContextType {
  eventPasses: EventPass[];
  reminders: StreamReminder[];
  volunteerApps: VolunteerApplicationRecord[];
  contributions: ContributionRecord[];
  campaignPledges: CampaignPledgeRecord[];
  stories: StorySubmissionRecord[];
  totalActionsCount: number;
  addEventPass: (pass: Omit<EventPass, 'id' | 'reference' | 'createdAt'>) => EventPass;
  addReminder: (reminder: Omit<StreamReminder, 'id' | 'createdAt'>) => boolean;
  addVolunteerApp: (app: Omit<VolunteerApplicationRecord, 'id' | 'reference' | 'status' | 'createdAt'>) => VolunteerApplicationRecord;
  addContribution: (contribution: Omit<ContributionRecord, 'id' | 'reference' | 'status' | 'createdAt'>) => ContributionRecord;
  addCampaignPledge: (pledge: Omit<CampaignPledgeRecord, 'id' | 'createdAt'>) => CampaignPledgeRecord;
  addStory: (story: Omit<StorySubmissionRecord, 'id' | 'createdAt'>) => StorySubmissionRecord;
  removeReminder: (id: string) => void;
  toastMessage: string | null;
  clearToast: () => void;
  showToast: (msg: string) => void;
}

const ParticipationContext = createContext<ParticipationContextType | undefined>(undefined);

export function ParticipationProvider({ children }: { children: React.ReactNode }) {
  const [eventPasses, setEventPasses] = useState<EventPass[]>([]);
  const [reminders, setReminders] = useState<StreamReminder[]>([]);
  const [volunteerApps, setVolunteerApps] = useState<VolunteerApplicationRecord[]>([]);
  const [contributions, setContributions] = useState<ContributionRecord[]>([]);
  const [campaignPledges, setCampaignPledges] = useState<CampaignPledgeRecord[]>([]);
  const [stories, setStories] = useState<StorySubmissionRecord[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedPasses = localStorage.getItem('samastha_passes');
      const storedReminders = localStorage.getItem('samastha_reminders');
      const storedVolunteers = localStorage.getItem('samastha_volunteers');
      const storedContributions = localStorage.getItem('samastha_contributions');
      const storedPledges = localStorage.getItem('samastha_pledges');
      const storedStories = localStorage.getItem('samastha_stories');

      if (storedPasses) setEventPasses(JSON.parse(storedPasses));
      if (storedReminders) setReminders(JSON.parse(storedReminders));
      if (storedVolunteers) setVolunteerApps(JSON.parse(storedVolunteers));
      if (storedContributions) setContributions(JSON.parse(storedContributions));
      if (storedPledges) setCampaignPledges(JSON.parse(storedPledges));
      if (storedStories) setStories(JSON.parse(storedStories));
    } catch (e) {
      console.error('Failed to load participation state from localStorage', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const clearToast = () => setToastMessage(null);

  const addEventPass = (pass: Omit<EventPass, 'id' | 'reference' | 'createdAt'>): EventPass => {
    const id = `pass-${Date.now()}`;
    const reference = `SAM100-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPass: EventPass = {
      ...pass,
      id,
      reference,
      createdAt: new Date().toISOString(),
    };
    const updated = [newPass, ...eventPasses];
    setEventPasses(updated);
    localStorage.setItem('samastha_passes', JSON.stringify(updated));
    showToast(`Pass Generated: ${reference} (${pass.eventTitle})`);
    return newPass;
  };

  const addReminder = (reminder: Omit<StreamReminder, 'id' | 'createdAt'>): boolean => {
    const exists = reminders.some((r) => r.title === reminder.title);
    if (exists) {
      showToast('Reminder is already set for this session!');
      return false;
    }
    const newReminder: StreamReminder = {
      ...reminder,
      id: `rem-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newReminder, ...reminders];
    setReminders(updated);
    localStorage.setItem('samastha_reminders', JSON.stringify(updated));
    showToast(`Reminder set for: ${reminder.title}`);
    return true;
  };

  const removeReminder = (id: string) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    localStorage.setItem('samastha_reminders', JSON.stringify(updated));
    showToast('Reminder removed.');
  };

  const addVolunteerApp = (app: Omit<VolunteerApplicationRecord, 'id' | 'reference' | 'status' | 'createdAt'>): VolunteerApplicationRecord => {
    const id = `vol-${Date.now()}`;
    const reference = `VOL-${Math.floor(10000 + Math.random() * 90000)}`;
    const newApp: VolunteerApplicationRecord = {
      ...app,
      id,
      reference,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    const updated = [newApp, ...volunteerApps];
    setVolunteerApps(updated);
    localStorage.setItem('samastha_volunteers', JSON.stringify(updated));
    showToast(`Volunteer Registration Confirmed: ${reference}`);
    return newApp;
  };

  const addContribution = (contribution: Omit<ContributionRecord, 'id' | 'reference' | 'status' | 'createdAt'>): ContributionRecord => {
    const id = `don-${Date.now()}`;
    const reference = `RCPT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRecord: ContributionRecord = {
      ...contribution,
      id,
      reference,
      status: 'Completed',
      createdAt: new Date().toISOString(),
    };
    const updated = [newRecord, ...contributions];
    setContributions(updated);
    localStorage.setItem('samastha_contributions', JSON.stringify(updated));
    showToast(`Contribution of ₹${contribution.amount} received! Receipt: ${reference}`);
    return newRecord;
  };

  const addCampaignPledge = (pledge: Omit<CampaignPledgeRecord, 'id' | 'createdAt'>): CampaignPledgeRecord => {
    const id = `cpl-${Date.now()}`;
    const newPledge: CampaignPledgeRecord = {
      ...pledge,
      id,
      createdAt: new Date().toISOString(),
    };
    const updated = [newPledge, ...campaignPledges];
    setCampaignPledges(updated);
    localStorage.setItem('samastha_pledges', JSON.stringify(updated));
    showToast(`Campaign Pledge Recorded: ${pledge.pledgeText}`);
    return newPledge;
  };

  const addStory = (story: Omit<StorySubmissionRecord, 'id' | 'createdAt'>): StorySubmissionRecord => {
    const id = `sty-${Date.now()}`;
    const newStory: StorySubmissionRecord = {
      ...story,
      id,
      createdAt: new Date().toISOString(),
    };
    const updated = [newStory, ...stories];
    setStories(updated);
    localStorage.setItem('samastha_stories', JSON.stringify(updated));
    showToast('Your Centenary Story has been added to the Story Wall!');
    return newStory;
  };

  const totalActionsCount =
    eventPasses.length +
    reminders.length +
    volunteerApps.length +
    contributions.length +
    campaignPledges.length +
    stories.length;

  return (
    <ParticipationContext.Provider
      value={{
        eventPasses,
        reminders,
        volunteerApps,
        contributions,
        campaignPledges,
        stories,
        totalActionsCount,
        addEventPass,
        addReminder,
        addVolunteerApp,
        addContribution,
        addCampaignPledge,
        addStory,
        removeReminder,
        toastMessage,
        clearToast,
        showToast,
      }}
    >
      {children}
    </ParticipationContext.Provider>
  );
}

export function useParticipation() {
  const context = useContext(ParticipationContext);
  if (!context) {
    throw new Error('useParticipation must be used within a ParticipationProvider');
  }
  return context;
}
