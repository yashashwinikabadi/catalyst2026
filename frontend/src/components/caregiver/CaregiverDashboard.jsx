import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import VitalsOverview from './VitalsOverview';
import ActivityTimeline from './ActivityTimeline';
import { useMode } from '../../context/ModeContext';

export default function CaregiverDashboard() {
  const { backendHealth } = useMode();
  const [toastMessage, setToastMessage] = useState(null);
  const [showSampleBrief, setShowSampleBrief] = useState(false);
  const [handovers, setHandovers] = useState([]);
  const [handoverLoading, setHandoverLoading] = useState(false);
  const [handoverError, setHandoverError] = useState('');
  const [fromCaregiver, setFromCaregiver] = useState('');
  const [toCaregiver, setToCaregiver] = useState('');
  const [handoverSummary, setHandoverSummary] = useState('');
  const [pendingTasks, setPendingTasks] = useState('');
  const [helpRequests, setHelpRequests] = useState([]);
  const [helpRequestsLoading, setHelpRequestsLoading] = useState(false);
  const [helpRequestsError, setHelpRequestsError] = useState('');
  const isGeminiConfigured = Boolean(backendHealth.data?.services?.gemini?.configured);
  const loadHandovers = async () => {
  setHandoverLoading(true);
  setHandoverError('');

  try {
    const response = await fetch('/api/care-handovers');

    if (!response.ok) {
      throw new Error('Unable to load care handovers.');
    }

    const result = await response.json();
    setHandovers(result.data || []);
  } catch (error) {
    setHandoverError(error.message);
  } finally {
    setHandoverLoading(false);
  }
};
const loadHelpRequests = async () => {
  setHelpRequestsLoading(true);
  setHelpRequestsError('');

  try {
    const response = await fetch('/api/help-requests');

    if (!response.ok) {
      throw new Error('Unable to load help requests.');
    }

    const result = await response.json();
    setHelpRequests(result.data || []);
  } catch (error) {
    setHelpRequestsError(error.message);
  } finally {
    setHelpRequestsLoading(false);
  }
};
useEffect(() => {
  loadHandovers();
  loadHelpRequests();
}, []);
const createHandover = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/api/care-handovers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromCaregiver,
        toCaregiver,
        summary: handoverSummary,
        pendingTasks
      })
    });
  
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Unable to create handover.');
    }

    setFromCaregiver('');
    setToCaregiver('');
    setHandoverSummary('');
    setPendingTasks('');

    await loadHandovers();
    showNotification('Care handover saved successfully.');
  } catch (error) {
    setHandoverError(error.message);
  }
};
  const acknowledgeHandover = async (id) => {
    const acknowledgedBy = window.prompt(
      'Enter the name of the incoming caregiver:'
    );

    if (!acknowledgedBy?.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `/api/care-handovers/${id}/acknowledge`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ acknowledgedBy })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to acknowledge handover.');
      }

      await loadHandovers();
      showNotification('Care handover acknowledged successfully.');
    } catch (error) {
      setHandoverError(error.message);
    }
  };
  const resolveHelpRequest = async (id) => {
  try {
    const response = await fetch(`/api/help-requests/${id}/resolve`, {
      method: 'POST'
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Unable to resolve help request.');
    }

    await loadHelpRequests();
    showNotification('Help request marked as resolved.');
  } catch (error) {
    setHelpRequestsError(error.message);
  }
};
  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Explicitly labeled DEMO DATA — Fictional Care Circle
  const sampleCareCircle = [
    { name: 'Priya Sharma (Sample)', role: 'Daughter (Designated Primary Caregiver)', status: 'Sample Role', phone: '+91 98765 00000 (Demo)' },
    { name: 'Amit Sharma (Sample)', role: 'Son (Emergency Liaison)', status: 'Sample Role', phone: '+91 98765 00001 (Demo)' },
    { name: 'Dr. Rajesh Sharma (Sample)', role: 'Family Geriatrician (Columbia Clinic)', status: 'Sample Doctor', phone: '+91 80 0000 0000 (Demo)' },
    { name: 'Sunita Rao (Sample)', role: 'Visiting Nurse (Weekdays)', status: 'Sample Staff', phone: '+91 98765 00002 (Demo)' }
  ];

  // Explicitly labeled DEMO DATA — Fictional Medication Schedule
  const sampleMedicationList = [
    { name: 'Telmisartan 40mg (Sample)', time: '8:00 AM', status: 'Taken (Sample Record)', instructions: 'Demo schedule — take with warm water', badge: 'sage' },
    { name: 'Calcium + Vit D3 (Sample)', time: '1:30 PM', status: 'Pending (Sample Record)', instructions: 'Demo schedule — after lunch', badge: 'warning' },
    { name: 'Heart Care Tablet (Sample)', time: '8:00 PM', status: 'Scheduled (Sample Record)', instructions: 'Demo schedule — post-dinner', badge: 'forest' }
  ];

  // Explicitly labeled DEMO DATA — Fictional Appointments
  const sampleAppointments = [
    { date: 'Tuesday, Nov 18', time: '10:30 AM', title: 'Geriatric Consultation (Sample)', provider: 'Dr. Rajesh Sharma', clinic: 'Columbia Clinic (Illustrative)', escort: 'Accompanied by Family (Demo)' },
    { date: 'Friday, Nov 21', time: '9:00 AM', title: 'Routine Fasting Panel (Sample)', provider: 'HealthCare Diagnostics', clinic: 'Home Collection (Illustrative)', escort: 'Coordinated by Nurse (Demo)' }
  ];

  // Explicitly labeled DEMO DATA — Fictional Handover Notes
 

  // Explicitly labeled DEMO DATA — Fictional Alerts
  const sampleCareAlerts = [
    { time: '10:15 AM', type: 'Check-in Recorded (Sample)', text: 'Illustrative demo: Device check-in signal recorded on local prototype.', level: 'info' },
    { time: '08:00 AM', type: 'Medication Checked (Sample)', text: 'Illustrative demo: Morning dose marked checked on prototype interface.', level: 'sage' },
    { time: '07:30 AM', type: 'Schedule Notice (Sample)', text: 'Illustrative demo: Nurse visit notification template.', level: 'info' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Global Prototype & Demo Notice Banner */}
      <div
        style={{
          backgroundColor: '#fef3c7',
          border: '1.5px solid #d97706',
          borderRadius: '14px',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#92400e', letterSpacing: '0.04em' }}>
            DEMO DATA & PROTOTYPE ENVIRONMENT
          </span>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#78350f' }}>
          All patient profiles, biometric values, medication logs, and caregiver details displayed below are fictional demonstration samples. No actual patient is being monitored.
        </span>
      </div>

      {/* Non-blocking feedback banner */}
      {toastMessage && (
        <div
          style={{
            backgroundColor: 'var(--color-forest)',
            color: '#E9E4D8',
            padding: '1rem 1.5rem',
            borderRadius: '14px',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.95rem'
          }}
          role="status"
        >
          <span>ℹ️ {toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{ color: '#E9E4D8', fontWeight: 800, fontSize: '1.2rem', marginLeft: '1rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Senior Profile Header (Explicitly Labeled Demo Patient) */}
      <div
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#E9E4D8',
          padding: '2.25rem',
          borderRadius: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid rgba(233, 228, 216, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src="/saanidhya-logo.svg"
            alt="SAANIDHYA Emblem"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#E9E4D8',
              padding: '3px',
              flexShrink: 0
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  backgroundColor: 'rgba(199, 163, 108, 0.25)',
                  color: '#C7A36C',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                DEMO PATIENT PROFILE
              </span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-family-serif)', margin: '0.2rem 0' }}>
              Shanti Devi (Age 78) — Sample Persona
            </h2>
            <p style={{ color: '#A9BDA9', fontSize: '0.95rem' }}>
              Illustrative Profile • Managed under Sample Care Circle (Priya & Amit)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button
            variant="champagne"
            size="md"
            onClick={() => showNotification('Prototype demonstration: Gentle nudge action triggered locally. Telephony/push integration pending.')}
          >
            💬 Send Gentle Nudge (Demo)
          </Button>
          <Button
            variant="outline"
            size="md"
            style={{ color: '#E9E4D8', borderColor: 'rgba(233,228,216,0.4)' }}
            onClick={() => showNotification('Prototype demonstration: Voice check-in action triggered locally. WebRTC/telephony integration pending.')}
          >
            📞 Voice Check-in (Demo)
          </Button>
        </div>
      </div>

      {/* 1. Daily Care Overview Banner (Explicitly Sample Data) */}
      <Card
        title="Daily Care Overview (Sample Layout)"
        subtitle="Illustrative care milestones layout — Real data requires connected patient telemetry"
        headerAction={<StatusBadge label="DEMO DATA" variant="warning" />}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-ivory-light)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Morning Check-in</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-forest)' }}>10:15 AM (Sample)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Demo check-in indicator</span>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--color-ivory-light)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Medication Schedule</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-forest)' }}>1 of 3 (Sample)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Demo schedule count</span>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--color-ivory-light)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Mobility Stream</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-forest)' }}>1,420 (Sample)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Sensor unpaired placeholder</span>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--color-ivory-light)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Assigned Escort</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-forest)' }}>Priya (Sample)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Sample roster entry</span>
          </div>
        </div>
      </Card>

      {/* 2. Vitals Overview Component (Preserved with DEMO DATA banner) */}
      <VitalsOverview />

      {/* 3. My Care Circle & Care Handover Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
        {/* My Care Circle */}
        <Card
          title="My Care Circle"
          subtitle="Illustrative contact directory (Production directory requires Firebase Auth)"
          headerAction={<StatusBadge label="DEMO DATA" variant="warning" />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {sampleCareCircle.map((member, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--color-ivory-light)',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                    {member.name}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    {member.role} • {member.phone}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <StatusBadge label={member.status} variant="sage" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Care Handover */}
                <Card
          title="Care Handover"
          subtitle="Record a shift update and confirm responsibility transfer"
          headerAction={<StatusBadge label="LIVE PROTOTYPE" variant="sage" />}
        >
          <form
            onSubmit={createHandover}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              marginTop: '1rem'
            }}
          >
            <input
              type="text"
              placeholder="Outgoing caregiver name"
              value={fromCaregiver}
              onChange={(e) => setFromCaregiver(e.target.value)}
              required
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
            />

            <input
              type="text"
              placeholder="Incoming caregiver name"
              value={toCaregiver}
              onChange={(e) => setToCaregiver(e.target.value)}
              required
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
            />

            <textarea
              placeholder="Care summary"
              value={handoverSummary}
              onChange={(e) => setHandoverSummary(e.target.value)}
              required
              rows={3}
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
            />

            <textarea
              placeholder="Pending tasks for the next caregiver"
              value={pendingTasks}
              onChange={(e) => setPendingTasks(e.target.value)}
              rows={2}
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
            />

            <Button type="submit" variant="primary" size="md">
              Save Care Handover
            </Button>
          </form>

          {handoverError && (
            <p role="alert" style={{ color: '#b91c1c', marginTop: '1rem' }}>
              {handoverError}
            </p>
          )}

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: 'var(--color-forest)' }}>Handover History</h4>

            {handoverLoading && <p>Loading handovers...</p>}

            {!handoverLoading && handovers.length === 0 && (
              <p style={{ color: 'var(--color-text-muted)' }}>
                No handovers recorded yet.
              </p>
            )}

            {handovers.map((handover) => (
              <div
                key={handover.id}
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-ivory-light)',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <strong style={{ color: 'var(--color-forest)' }}>
                  {handover.fromCaregiver} → {handover.toCaregiver}
                </strong>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  {handover.summary}
                </p>

                {handover.pendingTasks && (
                  <p style={{ fontSize: '0.85rem' }}>
                    <strong>Pending tasks:</strong> {handover.pendingTasks}
                  </p>
                )}

                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Created: {new Date(handover.createdAt).toLocaleString()}
                </p>

                <StatusBadge
                  label={handover.status}
                  variant={handover.status === 'Acknowledged' ? 'success' : 'warning'}
                />

                {handover.status !== 'Acknowledged' && (
                  <Button
                    type="button"
                    variant="champagne"
                    size="md"
                    onClick={() => acknowledgeHandover(handover.id)}
                  >
                    Acknowledge Handover
                  </Button>
                )}

                {handover.acknowledgedBy && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-forest)' }}>
                    Acknowledged by: {handover.acknowledgedBy}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 4. Medication Status & My Appointments Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
        {/* Medication Status */}
        <Card
          title="Medication Status"
          subtitle="Sample prescription format (No pharmacy integration or confirmed administration)"
          headerAction={<StatusBadge label="DEMO DATA" variant="warning" />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {sampleMedicationList.map((med, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--color-ivory-light)',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest)' }}>{med.time}</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest)' }}>{med.name}</strong>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    {med.instructions}
                  </span>
                </div>
                <StatusBadge label={med.status} variant={med.badge} />
              </div>
            ))}
          </div>
        </Card>

        {/* My Appointments */}
        <Card
          title="My Appointments"
          subtitle="Sample clinical consultation layout (Hospital calendar integration pending)"
          headerAction={<StatusBadge label="DEMO DATA" variant="warning" />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {sampleAppointments.map((apt, i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-ivory-light)',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--color-forest)' }}>{apt.title}</strong>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-champagne-dark)' }}>{apt.date} • {apt.time}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  {apt.provider} — {apt.clinic}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {apt.escort}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 5. Care History & Care Alerts / Help Requests */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
        {/* Care History */}
        <Card
          title="Care History (Sample Template)"
          subtitle="Illustrative adherence layout — No real historical logs are fabricated"
          headerAction={<StatusBadge label="DEMO DATA" variant="warning" />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: 'var(--color-ivory-light)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sample Check-in Layout</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-forest)' }}>Illustrative Format (Demo)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: 'var(--color-ivory-light)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sample Medication Compliance Format</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-forest)' }}>Illustrative Format (Demo)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: 'var(--color-ivory-light)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sample Activity Goal Format</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-forest)' }}>Illustrative Format (Demo)</strong>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '0.25rem' }}>
              Actual historical analytics will generate once real patient events are committed to Cloud Firestore.
            </span>
          </div>
        </Card>

        {/* Care Alerts & Help Requests */}
        <Card
  title="Care Alerts & Help Requests"
  subtitle="Requests recorded by the elderly user"
  headerAction={<StatusBadge label="LIVE PROTOTYPE" variant="sage" />}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
    <div
      style={{
        backgroundColor: 'rgba(169, 189, 169, 0.2)',
        borderRadius: '10px',
        padding: '0.75rem 1rem',
        border: '1px solid rgba(169, 189, 169, 0.4)',
        fontSize: '0.85rem',
        color: 'var(--color-forest)'
      }}
    >
      Requests are stored in this prototype. No emergency dispatch, SMS or push notification is sent.
    </div>

    {helpRequestsError && (
      <p role="alert" style={{ color: '#b91c1c' }}>
        {helpRequestsError}
      </p>
    )}

    {helpRequestsLoading && <p>Loading help requests...</p>}

    {!helpRequestsLoading && helpRequests.length === 0 && (
      <p style={{ color: 'var(--color-text-muted)' }}>
        No help requests recorded yet.
      </p>
    )}

    {helpRequests.map((request) => (
      <div
        key={request.id}
        style={{
          padding: '1rem',
          backgroundColor: 'var(--color-ivory-light)',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <strong style={{ color: 'var(--color-forest)' }}>
            {request.requestedBy}
          </strong>
          <StatusBadge
            label={request.urgency}
            variant={request.urgency === 'High' ? 'warning' : 'sage'}
          />
        </div>

        <p style={{ fontSize: '0.9rem' }}>{request.message}</p>

        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Requested: {new Date(request.createdAt).toLocaleString()}
        </p>

        <StatusBadge
          label={request.status}
          variant={request.status === 'Resolved' ? 'success' : 'warning'}
        />

        {request.status !== 'Resolved' && (
          <Button
            type="button"
            variant="champagne"
            size="md"
            onClick={() => resolveHelpRequest(request.id)}
          >
            Mark as Resolved
          </Button>
        )}
      </div>
    ))}
  </div>
</Card>
      </div>

      {/* 6. Activity Timeline & Gemini AI Section (Preserved) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
        {/* Activity Stream */}
        <ActivityTimeline />

        {/* Gemini AI Care Intelligence Card */}
        <Card
          title="Gemini AI Care Insights"
          subtitle="Daily activity synthesis & routine pattern analysis"
          headerAction={
            <StatusBadge
              label={isGeminiConfigured ? 'Gemini Connected' : 'Gemini integration pending'}
              variant={isGeminiConfigured ? 'success' : 'champagne'}
            />
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Architecture is structured to pass daily routine telemetry to the Google Gemini API once configured via <code>GEMINI_API_KEY</code>.
            </p>

            {isGeminiConfigured ? (
              <div
                style={{
                  backgroundColor: 'var(--color-ivory-light)',
                  border: '1.5px solid var(--color-sage)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  color: 'var(--color-forest)'
                }}
              >
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Live Gemini Service:
                </strong>
                Ready for query processing via backend <code>/api/insights</code> endpoint.
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: 'var(--color-ivory-light)',
                  border: '1.5px dashed var(--color-champagne-dark)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400e', textTransform: 'uppercase' }}>
                    Gemini integration pending
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(23, 60, 56, 0.1)',
                      color: 'var(--color-forest)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px'
                    }}
                  >
                    Static example — not AI-generated
                  </span>
                </div>

                {showSampleBrief ? (
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-forest-dark)', lineHeight: 1.5 }}>
                    <strong>Routine Summary Format:</strong> Morning scheduled medication logged at 8:00 AM. Gentle outdoor mobility activity registered in the garden. Afternoon hydration reminder queued for 2:00 PM.
                  </p>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    No live Gemini API key provided in <code>.env</code>. You can preview the expected output layout below.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setShowSampleBrief(prev => !prev)}
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--color-forest)',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  {showSampleBrief ? 'Hide Static Example' : 'View Static Example Layout'}
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
