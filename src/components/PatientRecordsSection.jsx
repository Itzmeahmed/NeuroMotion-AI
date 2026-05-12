import React, { useEffect, useMemo, useState } from 'react';
import { Download, Edit3, FilePlus2, Search, Trash2, UserPlus } from 'lucide-react';
import './PatientRecordsSection.css';

const STORAGE_KEY = 'neuromotion_patient_records';

const initialForm = {
  name: '',
  age: '',
  patientId: '',
  phone: '',
  lastVisit: '',
  risk: 'Low',
  notes: '',
};

const seedRecords = [
  {
    id: 'rec-1001',
    name: 'Anika Rao',
    age: '62',
    patientId: 'NM-1001',
    phone: '+91 98765 43210',
    lastVisit: '2026-05-10',
    risk: 'Low',
    notes: 'Routine voice screening completed. No critical symptoms reported.',
  },
  {
    id: 'rec-1002',
    name: 'Rahul Menon',
    age: '58',
    patientId: 'NM-1002',
    phone: '+91 99887 76655',
    lastVisit: '2026-05-11',
    risk: 'Watch',
    notes: 'Follow-up recommended after mild vocal tremor markers.',
  },
];

const PatientRecordsSection = () => {
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem(STORAGE_KEY);
    return savedRecords ? JSON.parse(savedRecords) : seedRecords;
  });
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const filteredRecords = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return records;

    return records.filter((record) => (
      record.name.toLowerCase().includes(term) ||
      record.patientId.toLowerCase().includes(term) ||
      record.phone.toLowerCase().includes(term) ||
      record.risk.toLowerCase().includes(term)
    ));
  }, [records, query]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedForm = {
      ...form,
      name: form.name.trim(),
      patientId: form.patientId.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim(),
    };

    if (editingId) {
      setRecords((currentRecords) => currentRecords.map((record) => (
        record.id === editingId ? { ...record, ...normalizedForm } : record
      )));
    } else {
      setRecords((currentRecords) => [
        {
          ...normalizedForm,
          id: `rec-${Date.now()}`,
        },
        ...currentRecords,
      ]);
    }

    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (record) => {
    setForm({
      name: record.name,
      age: record.age,
      patientId: record.patientId,
      phone: record.phone,
      lastVisit: record.lastVisit,
      risk: record.risk,
      notes: record.notes,
    });
    setEditingId(record.id);
  };

  const handleDelete = (recordId) => {
    setRecords((currentRecords) => currentRecords.filter((record) => record.id !== recordId));
    if (editingId === recordId) {
      setForm(initialForm);
      setEditingId(null);
    }
  };

  const handleDownloadRecords = () => {
    const headers = ['Patient ID', 'Name', 'Age', 'Phone', 'Last Visit', 'Risk', 'Notes'];
    const csvRows = filteredRecords.map((record) => [
      record.patientId,
      record.name,
      record.age,
      record.phone,
      record.lastVisit,
      record.risk,
      record.notes,
    ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','));

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `patient-records-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="records" className="section patient-records-section">
      <div className="container">
        <div className="section-title">
          <h2>Patient <span className="text-gradient">Records</span></h2>
        </div>

        <div className="records-layout">
          <form className="record-form glass-panel" onSubmit={handleSubmit}>
            <div className="record-form-header">
              <FilePlus2 color="var(--accent-neon)" size={28} />
              <div>
                <h3>{editingId ? 'Update Record' : 'New Patient Record'}</h3>
                <p>Maintain screening details and follow-up status.</p>
              </div>
            </div>

            <div className="record-form-grid">
              <label>
                Patient Name
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                Age
                <input name="age" type="number" min="1" max="120" value={form.age} onChange={handleChange} required />
              </label>
              <label>
                Patient ID
                <input name="patientId" value={form.patientId} onChange={handleChange} required />
              </label>
              <label>
                Phone
                <input name="phone" value={form.phone} onChange={handleChange} required />
              </label>
              <label>
                Last Visit
                <input name="lastVisit" type="date" value={form.lastVisit} onChange={handleChange} required />
              </label>
              <label>
                Risk Status
                <select name="risk" value={form.risk} onChange={handleChange}>
                  <option>Low</option>
                  <option>Watch</option>
                  <option>High</option>
                </select>
              </label>
            </div>

            <label className="notes-field">
              Clinical Notes
              <textarea name="notes" rows="4" value={form.notes} onChange={handleChange} required />
            </label>

            <div className="record-form-actions">
              <button className="btn-primary compact-btn" type="submit">
                <UserPlus size={18} />
                {editingId ? 'Save Changes' : 'Add Record'}
              </button>
              {editingId && (
                <button
                  className="btn-secondary compact-btn"
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="records-panel glass-panel">
            <div className="records-toolbar">
              <div className="records-search">
                <Search size={18} />
                <input
                  aria-label="Search patient records"
                  placeholder="Search records"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <button className="btn-secondary compact-btn" type="button" onClick={handleDownloadRecords}>
                <Download size={18} />
                CSV
              </button>
            </div>

            <div className="records-list">
              {filteredRecords.map((record) => (
                <article className="record-card" key={record.id}>
                  <div className="record-card-header">
                    <div>
                      <h3>{record.name}</h3>
                      <p>{record.patientId} | Age {record.age}</p>
                    </div>
                    <span className={`risk-pill risk-${record.risk.toLowerCase()}`}>{record.risk}</span>
                  </div>
                  <dl className="record-meta">
                    <div>
                      <dt>Phone</dt>
                      <dd>{record.phone}</dd>
                    </div>
                    <div>
                      <dt>Last Visit</dt>
                      <dd>{record.lastVisit}</dd>
                    </div>
                  </dl>
                  <p className="record-notes">{record.notes}</p>
                  <div className="record-actions">
                    <button type="button" onClick={() => handleEdit(record)} title="Edit record">
                      <Edit3 size={17} />
                    </button>
                    <button type="button" onClick={() => handleDelete(record.id)} title="Delete record">
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientRecordsSection;
