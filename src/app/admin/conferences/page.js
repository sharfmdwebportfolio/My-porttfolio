"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { getConferences, addConference, updateConference, deleteConference } from "@/lib/firestore";

const EMPTY = { code: "", name: "", role: "Paper Presenter", location: "", paperTitle: "", certLink: "", pubLink: "", fullPaperLink: "" };
const ROLES = ["Paper Presenter", "Keynote Speaker", "Guest Lecturer", "Panel Member", "Attendee"];

export default function AdminConferences() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const d = await getConferences(); setItems(d); }
    catch { setItems([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!modal.data.name) return alert("Conference name is required.");
    setSaving(true);
    try {
      modal.mode === "add" ? await addConference(modal.data) : await updateConference(modal.id, modal.data);
      await load(); setModal(null);
    } catch { alert("Save failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this conference entry?")) return;
    try { await deleteConference(id); await load(); } catch { alert("Delete failed."); }
  };

  const set = (key, val) => setModal((m) => ({ ...m, data: { ...m.data, [key]: val } }));

  return (
    <>
      <AdminHeader title="Conferences" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">Manage your international conference participations shown on the Publications page.</p>
          <button onClick={() => setModal({ mode: "add", data: { ...EMPTY } })} className="flex items-center gap-2 bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">add</span>Add Conference
          </button>
        </div>

        {loading ? <Spinner /> : items.length === 0 ? <Empty /> : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded">{item.role}</span>
                    <span className="text-xs text-gray-400">{item.location}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                  {item.paperTitle && <p className="text-xs text-gray-500 italic mt-0.5 line-clamp-1">&quot;{item.paperTitle}&quot;</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setModal({ mode: "edit", data: { ...item }, id: item.id })} className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 cursor-pointer"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 cursor-pointer"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800 text-lg">{modal.mode === "add" ? "Add Conference" : "Edit Conference"}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-6 space-y-4">
              <MField label="Conference Short Code (e.g. ICMIS 2025)" value={modal.data.code} onChange={(v) => set("code", v)} />
              <MField label="Full Conference Name *" value={modal.data.name} onChange={(v) => set("name", v)} placeholder="e.g. International Conference on MIS" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Your Role</label>
                  <select value={modal.data.role} onChange={(e) => set("role", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <MField label="Location / Date" value={modal.data.location} onChange={(v) => set("location", v)} placeholder="e.g. New York, USA · 2025" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Paper Title Presented</label>
                <textarea value={modal.data.paperTitle} onChange={(e) => set("paperTitle", e.target.value)} rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none" placeholder="Title of your presented paper..." />
              </div>
              <MField label="Certificate / Acceptance Letter Link" value={modal.data.certLink} onChange={(v) => set("certLink", v)} placeholder="https://..." />
              <MField label="Publication / Proceedings Link" value={modal.data.pubLink} onChange={(v) => set("pubLink", v)} placeholder="https://..." />
              <MField label="Full Paper Link" value={modal.data.fullPaperLink} onChange={(v) => set("fullPaperLink", v)} placeholder="https://..." />
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 cursor-pointer disabled:opacity-70">
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {saving ? "Saving..." : "Save Conference"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
function Empty() { return <div className="text-center py-20 text-gray-400"><span className="material-symbols-outlined text-5xl mb-2 block">public</span><p className="text-sm">No conferences yet. Click &quot;Add Conference&quot; to get started.</p></div>; }
