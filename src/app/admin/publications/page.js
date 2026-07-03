"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { getPublications, addPublication, updatePublication, deletePublication } from "@/lib/firestore";

const EMPTY = {
  title: "", year: "", category: "MIS Focus", journal: "",
  authors: "", abstract: "", link: "",
};

const CATEGORIES = ["MIS Focus", "Supply Chain", "Sustainability", "Patent"];
const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021"];

export default function AdminPublications() {
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit', data, id? }
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getPublications();
      data.sort((a, b) => (b.year || "").localeCompare(a.year || ""));
      setPubs(data);
    } catch { setPubs([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => setModal({ mode: "add", data: { ...EMPTY } });
  const openEdit = (pub) => setModal({ mode: "edit", data: { ...pub }, id: pub.id });
  const closeModal = () => setModal(null);

  const handleSave = async () => {
    if (!modal.data.title || !modal.data.year) return alert("Title and Year are required.");
    setSaving(true);
    try {
      if (modal.mode === "add") {
        await addPublication(modal.data);
      } else {
        await updatePublication(modal.id, modal.data);
      }
      await load();
      closeModal();
    } catch { alert("Save failed. Check Firebase connection."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;
    setDeleting(id);
    try {
      await deletePublication(id);
      await load();
    } catch { alert("Delete failed."); }
    finally { setDeleting(null); }
  };

  const filtered = pubs.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.journal?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AdminHeader title="Publications" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[20px]">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search publications..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Publication
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <span className="material-symbols-outlined text-5xl mb-2 block">menu_book</span>
            <p className="text-sm">No publications found. Click &quot;Add Publication&quot; to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((pub) => (
              <div key={pub.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-100 text-blue-600 rounded">{pub.year}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-gray-100 text-gray-500 rounded">{pub.category}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-1 line-clamp-2">{pub.title}</h3>
                    <p className="text-xs text-gray-400">{pub.journal}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(pub)}
                      className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 cursor-pointer transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(pub.id)}
                      disabled={deleting === pub.id}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 cursor-pointer transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
              <h2 className="font-bold text-gray-800 text-lg">
                {modal.mode === "add" ? "Add New Publication" : "Edit Publication"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <MField label="Title *" value={modal.data.title} onChange={(v) => setModal((m) => ({ ...m, data: { ...m.data, title: v } }))} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Year *</label>
                  <select
                    value={modal.data.year}
                    onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, year: e.target.value } }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select year</option>
                    {YEARS.map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={modal.data.category}
                    onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, category: e.target.value } }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <MField 
                label={modal.data.category === "Patent" ? "Design Registration No. / Patent Authority *" : "Journal / Publisher"} 
                value={modal.data.journal} 
                onChange={(v) => setModal((m) => ({ ...m, data: { ...m.data, journal: v } }))} 
                placeholder={modal.data.category === "Patent" ? "e.g. UK Patent Registration (6509489)" : "e.g. Journal of AI ML DL"}
              />
              <MField 
                label={modal.data.category === "Patent" ? "Inventor(s) *" : "Authors"} 
                value={modal.data.authors} 
                onChange={(v) => setModal((m) => ({ ...m, data: { ...m.data, authors: v } }))} 
                placeholder={modal.data.category === "Patent" ? "e.g. M Sharfuddin, MA Rahman" : "e.g. M Sharfuddin, P Choudhury"} 
              />
              <MField 
                label={modal.data.category === "Patent" ? "Verify Link (Patent Search URL)" : "Direct Link (DOI / Journal URL)"} 
                value={modal.data.link} 
                onChange={(v) => setModal((m) => ({ ...m, data: { ...m.data, link: v } }))} 
                placeholder={modal.data.category === "Patent" ? "e.g. https://www.gov.uk/search-for-patent" : "https://..."} 
              />
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  {modal.data.category === "Patent" ? "Description / Specification *" : "Abstract"}
                </label>
                <textarea
                  value={modal.data.abstract}
                  onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, abstract: e.target.value } }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder={modal.data.category === "Patent" ? "e.g. Ergonomic desktop display stand engineered to securely house..." : "Short summary of the paper..."}
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={closeModal} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 cursor-pointer disabled:opacity-70"
              >
                {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                {saving ? "Saving..." : "Save Publication"}
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
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
      />
    </div>
  );
}
