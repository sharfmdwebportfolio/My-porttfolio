"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { getExperiences, addExperience, updateExperience, deleteExperience } from "@/lib/firestore";

const EMPTY = { title: "", company: "", location: "", date: "", active: false, bullets: [""], achievements: [""] };

export default function AdminExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const d = await getExperiences(); setItems(d); }
    catch { setItems([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => setModal({ mode: "add", data: { ...EMPTY, bullets: [""], achievements: [""] } });
  const openEdit = (item) => setModal({ mode: "edit", data: { ...item, bullets: item.bullets || [""], achievements: item.achievements || [""] }, id: item.id });

  const handleSave = async () => {
    if (!modal.data.title || !modal.data.company) return alert("Title and Company are required.");
    setSaving(true);
    const cleaned = { ...modal.data, bullets: modal.data.bullets.filter(Boolean), achievements: modal.data.achievements.filter(Boolean) };
    try {
      modal.mode === "add" ? await addExperience(cleaned) : await updateExperience(modal.id, cleaned);
      await load(); setModal(null);
    } catch { alert("Save failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this experience entry?")) return;
    try { await deleteExperience(id); await load(); } catch { alert("Delete failed."); }
  };

  const updateList = (field, idx, val) => {
    setModal((m) => {
      const arr = [...(m.data[field] || [])];
      arr[idx] = val;
      return { ...m, data: { ...m.data, [field]: arr } };
    });
  };
  const addListItem = (field) => setModal((m) => ({ ...m, data: { ...m.data, [field]: [...(m.data[field] || []), ""] } }));
  const removeListItem = (field, idx) => setModal((m) => ({ ...m, data: { ...m.data, [field]: m.data[field].filter((_, i) => i !== idx) } }));

  return (
    <>
      <AdminHeader title="Work Experience" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">Manage your professional work history shown on the Experience page.</p>
          <button onClick={openAdd} className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">add</span>Add Job
          </button>
        </div>

        {loading ? <Spinner /> : items.length === 0 ? <Empty icon="work" text="No experience entries yet." /> : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {item.active && <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded">Current</span>}
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.company} · {item.location}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 cursor-pointer"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 cursor-pointer"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modal && (
        <Modal title={modal.mode === "add" ? "Add Job" : "Edit Job"} onClose={() => setModal(null)} onSave={handleSave} saving={saving}>
          <MField label="Job Title *" value={modal.data.title} onChange={(v) => setModal((m) => ({ ...m, data: { ...m.data, title: v } }))} />
          <MField label="Company *" value={modal.data.company} onChange={(v) => setModal((m) => ({ ...m, data: { ...m.data, company: v } }))} />
          <div className="grid grid-cols-2 gap-4">
            <MField label="Location" value={modal.data.location} onChange={(v) => setModal((m) => ({ ...m, data: { ...m.data, location: v } }))} placeholder="e.g. Remote, NY" />
            <MField label="Date Range" value={modal.data.date} onChange={(v) => setModal((m) => ({ ...m, data: { ...m.data, date: v } }))} placeholder="e.g. 08/2025 – Present" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={modal.data.active} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, active: e.target.checked } }))} className="w-4 h-4 accent-blue-500" />
            <span className="text-sm text-gray-600 font-medium">This is my current job</span>
          </label>
          <ListEditor label="Job Responsibilities (bullet points)" field="bullets" items={modal.data.bullets} onUpdate={updateList} onAdd={addListItem} onRemove={removeListItem} placeholder="Describe a responsibility..." />
          <ListEditor label="Key Achievements" field="achievements" items={modal.data.achievements} onUpdate={updateList} onAdd={addListItem} onRemove={removeListItem} placeholder="Describe an achievement..." />
        </Modal>
      )}
    </>
  );
}

function ListEditor({ label, field, items, onUpdate, onAdd, onRemove, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input value={item} onChange={(e) => onUpdate(field, idx, e.target.value)} placeholder={placeholder} className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            <button onClick={() => onRemove(field, idx)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg cursor-pointer"><span className="material-symbols-outlined text-[18px]">remove</span></button>
          </div>
        ))}
        <button onClick={() => onAdd(field)} className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 font-semibold cursor-pointer">
          <span className="material-symbols-outlined text-[16px]">add</span> Add item
        </button>
      </div>
    </div>
  );
}

function MField({ label, value, onChange, placeholder = "" }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
    </div>
  );
}
function Spinner() { return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>; }
function Empty({ icon, text }) { return <div className="text-center py-20 text-gray-400"><span className="material-symbols-outlined text-5xl mb-2 block">{icon}</span><p className="text-sm">{text}</p></div>; }
function Modal({ title, onClose, onSave, saving, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
          <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="p-6 space-y-4">{children}</div>
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={onSave} disabled={saving} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 cursor-pointer disabled:opacity-70">
            {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
