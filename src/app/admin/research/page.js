"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { getResearchInterests, saveResearchInterest, deleteResearchInterest } from "@/lib/firestore";

const EMPTY = {
  key: "", title: "", icon: "science", tagline: "",
  overview: "", questions: [""], methodology: [""], color: "from-blue-600 to-indigo-700"
};

const COLORS = [
  { label: "Blue", value: "from-blue-600 to-indigo-700" },
  { label: "Green", value: "from-emerald-600 to-teal-700" },
  { label: "Amber", value: "from-amber-600 to-orange-700" },
  { label: "Rose", value: "from-rose-600 to-pink-700" },
];

export default function AdminResearch() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const d = await getResearchInterests(); setItems(d); }
    catch { setItems([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => setModal({ mode: "add", data: { ...EMPTY, questions: [""], methodology: [""] } });
  const openEdit = (item) => setModal({
    mode: "edit", data: {
      ...item,
      questions: item.questions?.length ? item.questions : [""],
      methodology: item.methodology?.length ? item.methodology : [""],
    }, id: item.id
  });

  const handleSave = async () => {
    if (!modal.data.title || !modal.data.key) return alert("Title and unique Key are required.");
    setSaving(true);
    const cleaned = {
      ...modal.data,
      questions: modal.data.questions.filter(Boolean),
      methodology: modal.data.methodology.filter(Boolean),
    };
    try {
      await saveResearchInterest(modal.id || modal.data.key, cleaned);
      await load(); setModal(null);
    } catch { alert("Save failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this research domain?")) return;
    try { await deleteResearchInterest(id); await load(); } catch { alert("Delete failed."); }
  };

  const updateList = (field, idx, val) => {
    setModal((m) => { const a = [...m.data[field]]; a[idx] = val; return { ...m, data: { ...m.data, [field]: a } }; });
  };
  const addItem = (field) => setModal((m) => ({ ...m, data: { ...m.data, [field]: [...m.data[field], ""] } }));
  const removeItem = (field, idx) => setModal((m) => ({ ...m, data: { ...m.data, [field]: m.data[field].filter((_, i) => i !== idx) } }));
  const set = (key, val) => setModal((m) => ({ ...m, data: { ...m.data, [key]: val } }));

  return (
    <>
      <AdminHeader title="Research Interests" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">Manage the 4 research domain cards shown on the Research page.</p>
          <button onClick={openAdd} className="flex items-center gap-2 bg-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-cyan-600 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">add</span>Add Domain
          </button>
        </div>

        {loading ? <Spinner /> : items.length === 0 ? <Empty /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-cyan-500 text-xl">{item.icon}</span>
                    <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 cursor-pointer"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 cursor-pointer"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 italic line-clamp-2">{item.tagline}</p>
                <p className="text-[10px] font-bold text-cyan-600 mt-2">{(item.methodology || []).slice(0, 3).join(" · ")}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800 text-lg">{modal.mode === "add" ? "Add Domain" : "Edit Domain"}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <MField label="Unique Key * (no spaces)" value={modal.data.key} onChange={(v) => set("key", v.toLowerCase().replace(/\s/g, "_"))} placeholder="e.g. mis_ai" disabled={modal.mode === "edit"} />
                <MField label="Material Icon Name" value={modal.data.icon} onChange={(v) => set("icon", v)} placeholder="e.g. science" />
              </div>
              <MField label="Domain Title *" value={modal.data.title} onChange={(v) => set("title", v)} placeholder="e.g. AI-Driven MIS" />
              <MField label="Tagline (short description)" value={modal.data.tagline} onChange={(v) => set("tagline", v)} />
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Color Theme</label>
                <select value={modal.data.color} onChange={(e) => set("color", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                  {COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Domain Overview</label>
                <textarea value={modal.data.overview} onChange={(e) => set("overview", e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none" placeholder="Detailed description of this research domain..." />
              </div>
              <ListEditor label="Research Questions" field="questions" items={modal.data.questions} onUpdate={updateList} onAdd={addItem} onRemove={removeItem} placeholder="e.g. How can AI reduce MIS data errors?" />
              <ListEditor label="Methodology Tags" field="methodology" items={modal.data.methodology} onUpdate={updateList} onAdd={addItem} onRemove={removeItem} placeholder="e.g. Machine Learning Models" />
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 cursor-pointer disabled:opacity-70">
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {saving ? "Saving..." : "Save Domain"}
              </button>
            </div>
          </div>
        </div>
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
function MField({ label, value, onChange, placeholder = "", disabled = false }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-400" />
    </div>
  );
}
function Spinner() { return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>; }
function Empty() { return <div className="text-center py-20 text-gray-400"><span className="material-symbols-outlined text-5xl mb-2 block">science</span><p className="text-sm">No research domains yet. Click &quot;Add Domain&quot; to get started.</p></div>; }
