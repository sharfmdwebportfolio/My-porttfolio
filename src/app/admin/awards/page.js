"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  getAwards, addAward, updateAward, deleteAward,
  getNewsCoverage, addNews, updateNews, deleteNews,
} from "@/lib/firestore";

export default function AdminAwards() {
  const [awards, setAwards] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { type: 'award'|'news', mode, data, id? }
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("awards");

  const load = async () => {
    setLoading(true);
    try {
      const [a, n] = await Promise.all([getAwards(), getNewsCoverage()]);
      setAwards(a); setNews(n);
    } catch { setAwards([]); setNews([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openAdd = (type) => setModal({
    type, mode: "add",
    data: type === "award"
      ? { title: "", subtitle: "", org: "", year: "", link: "" }
      : { title: "", outlet: "", link: "" }
  });
  const openEdit = (type, item) => setModal({ type, mode: "edit", data: { ...item }, id: item.id });

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal.type === "award") {
        modal.mode === "add" ? await addAward(modal.data) : await updateAward(modal.id, modal.data);
      } else {
        modal.mode === "add" ? await addNews(modal.data) : await updateNews(modal.id, modal.data);
      }
      await load(); setModal(null);
    } catch { alert("Save failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (type, id) => {
    if (!confirm("Delete this entry?")) return;
    try {
      type === "award" ? await deleteAward(id) : await deleteNews(id);
      await load();
    } catch { alert("Delete failed."); }
  };

  const set = (key, val) => setModal((m) => ({ ...m, data: { ...m.data, [key]: val } }));

  return (
    <>
      <AdminHeader title="Awards & News Coverage" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {["awards", "news"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors cursor-pointer ${tab === t ? "border-amber-500 text-amber-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
              {t === "awards" ? "🏆 Awards & Recognitions" : "📰 News Coverage"}
            </button>
          ))}
          <div className="ml-auto">
            <button onClick={() => openAdd(tab === "awards" ? "award" : "news")}
              className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-amber-600 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add {tab === "awards" ? "Award" : "News"}
            </button>
          </div>
        </div>

        {loading ? <Spinner /> : (
          tab === "awards" ? (
            awards.length === 0 ? <Empty icon="emoji_events" text="No awards yet." /> : (
              <div className="space-y-3">
                {awards.map((a) => (
                  <div key={a.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">{a.title}</h3>
                      {a.subtitle && <p className="text-xs text-amber-600 font-semibold">{a.subtitle}</p>}
                      <p className="text-xs text-gray-400 mt-0.5">{a.org} · {a.year}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => openEdit("award", a)} className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 cursor-pointer"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button onClick={() => handleDelete("award", a.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 cursor-pointer"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            news.length === 0 ? <Empty icon="newspaper" text="No news coverage yet." /> : (
              <div className="space-y-3">
                {news.map((n) => (
                  <div key={n.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-start gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">{n.outlet}</p>
                      <h3 className="font-bold text-gray-800 text-sm">{n.title}</h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => openEdit("news", n)} className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 cursor-pointer"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button onClick={() => handleDelete("news", n.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 cursor-pointer"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800 text-lg">
                {modal.mode === "add" ? "Add" : "Edit"} {modal.type === "award" ? "Award" : "News"}
              </h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-6 space-y-4">
              {modal.type === "award" ? (
                <>
                  <MField label="Award Title *" value={modal.data.title} onChange={(v) => set("title", v)} />
                  <MField label="Subtitle (optional)" value={modal.data.subtitle} onChange={(v) => set("subtitle", v)} placeholder="e.g. Gold Category" />
                  <MField label="Awarding Organization" value={modal.data.org} onChange={(v) => set("org", v)} />
                  <MField label="Year" value={modal.data.year} onChange={(v) => set("year", v)} placeholder="e.g. 2025" />
                  <MField label="Certificate Link (optional)" value={modal.data.link} onChange={(v) => set("link", v)} placeholder="https://..." />
                </>
              ) : (
                <>
                  <MField label="Article Title *" value={modal.data.title} onChange={(v) => set("title", v)} />
                  <MField label="News Outlet / Publication" value={modal.data.outlet} onChange={(v) => set("outlet", v)} placeholder="e.g. Research World Magazine" />
                  <MField label="Article Link" value={modal.data.link} onChange={(v) => set("link", v)} placeholder="https://..." />
                </>
              )}
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 cursor-pointer disabled:opacity-70">
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {saving ? "Saving..." : "Save"}
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
function Empty({ icon, text }) { return <div className="text-center py-20 text-gray-400"><span className="material-symbols-outlined text-5xl mb-2 block">{icon}</span><p className="text-sm">{text}</p></div>; }
