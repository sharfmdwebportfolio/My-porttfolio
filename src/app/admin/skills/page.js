"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { getSkills, saveSkills, getMemberships, addMembership, deleteMembership } from "@/lib/firestore";

const DEFAULT_SKILLS = {
  groups: [
    { category: "Programming & Analysis", items: ["SQL", "Python", "R Language", "Hypothesis Testing"] },
    { category: "Data Tools & BI", items: ["Google BigQuery", "Power BI", "Tableau", "KPI Measurement"] },
  ],
  descriptions: {
    SQL: "Developed complex queries, subqueries, and table joins to extract insights from transactional databases.",
    Python: "Used for data analysis, cleaning with Pandas/NumPy, and building predictive ML models.",
    "R Language": "Applied for research statistics, hypothesis testing, regression models, and academic publication graphs.",
    "Hypothesis Testing": "Utilized in research papers to validate variables such as AI-driven consumer behavior.",
    "Google BigQuery": "Handled massive data analysis queries and set up serverless warehouses.",
    "Power BI": "Created dynamic dashboards linking metrics charts for business administration.",
    Tableau: "Built premium interactive reports for MIS stakeholders.",
    "KPI Measurement": "Formulated performance indicators for construction employee metrics and logistics.",
  },
};

export default function AdminSkills() {
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newMember, setNewMember] = useState({ title: "", org: "" });
  const [addingMember, setAddingMember] = useState(false);
  const [newSkill, setNewSkill] = useState({ groupIdx: 0, name: "" });
  const [newGroup, setNewGroup] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [s, m] = await Promise.all([getSkills(), getMemberships()]);
      if (s) {
        // Map database formats to match the component state structure
        const mappedSkills = {
          groups: s.groups || s.skillGroups || [],
          descriptions: s.descriptions || s.skillsData || {}
        };
        setSkills(mappedSkills);
      }
      setMemberships(m);
    } catch { }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleSaveSkills = async () => {
    setSaving(true);
    try {
      // Save in both schemas to ensure frontend and admin compatibility
      const dataToSave = {
        groups: skills.groups || [],
        descriptions: skills.descriptions || {},
        skillGroups: skills.groups || [],
        skillsData: skills.descriptions || {}
      };
      await saveSkills(dataToSave);
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch { alert("Save failed."); }
    finally { setSaving(false); }
  };

  const updateDesc = (skillName, val) => setSkills((s) => ({ ...s, descriptions: { ...s.descriptions, [skillName]: val } }));
  const removeSkill = (gIdx, sIdx) => {
    setSkills((s) => {
      const groups = s.groups.map((g, i) => i === gIdx ? { ...g, items: g.items.filter((_, j) => j !== sIdx) } : g);
      return { ...s, groups };
    });
  };
  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    setSkills((s) => {
      const groups = s.groups.map((g, i) => i === newSkill.groupIdx ? { ...g, items: [...g.items, newSkill.name.trim()] } : g);
      return { ...s, groups, descriptions: { ...s.descriptions, [newSkill.name.trim()]: "" } };
    });
    setNewSkill((n) => ({ ...n, name: "" }));
  };
  const addGroup = () => {
    if (!newGroup.trim()) return;
    setSkills((s) => ({ ...s, groups: [...s.groups, { category: newGroup.trim(), items: [] }] }));
    setNewGroup("");
  };

  const handleAddMember = async () => {
    if (!newMember.title || !newMember.org) return alert("Title and Organization are required.");
    setAddingMember(true);
    try {
      await addMembership({ ...newMember, icon: "verified" });
      await load();
      setNewMember({ title: "", org: "" });
    } catch { alert("Failed to add."); }
    finally { setAddingMember(false); }
  };
  const handleDeleteMember = async (id) => {
    if (!confirm("Remove this membership?")) return;
    try { await deleteMembership(id); await load(); } catch { alert("Failed to delete."); }
  };

  if (loading) return <><AdminHeader title="Skills & Memberships" /><div className="flex-1 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div></>;

  return (
    <>
      <AdminHeader title="Skills & Memberships" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Skill Groups */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">terminal</span>
              Skill Groups
            </h2>
            {skills.groups.map((group, gIdx) => (
              <div key={gIdx} className="mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{group.category}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {group.items.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg px-3 py-1.5 text-xs font-semibold">
                      {skill}
                      <button onClick={() => removeSkill(gIdx, sIdx)} className="text-blue-400 hover:text-red-500 ml-1 cursor-pointer">×</button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={newSkill.groupIdx === gIdx ? newSkill.name : ""}
                    onFocus={() => setNewSkill((n) => ({ ...n, groupIdx: gIdx }))}
                    onChange={(e) => setNewSkill({ groupIdx: gIdx, name: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add skill..."
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button onClick={addSkill} className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-600 cursor-pointer">Add</button>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-4 flex gap-2">
              <input value={newGroup} onChange={(e) => setNewGroup(e.target.value)} placeholder="New group name..." className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              <button onClick={addGroup} className="bg-gray-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 cursor-pointer">Add Group</button>
            </div>
          </div>

          {/* Skill Descriptions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">description</span>
              Skill Descriptions
            </h2>
            <div className="space-y-4">
              {skills.groups.flatMap((g) => g.items).map((skill) => (
                <div key={skill}>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{skill}</label>
                  <textarea
                    value={skills.descriptions[skill] || ""}
                    onChange={(e) => updateDesc(skill, e.target.value)}
                    rows={2}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
                    placeholder={`Describe how you use ${skill}...`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSaveSkills} disabled={saving} className="flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md cursor-pointer disabled:opacity-70">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span className="material-symbols-outlined text-[18px]">save</span>}
              {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Skills"}
            </button>
          </div>

          {/* Memberships */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">groups</span>
              Professional Memberships
            </h2>
            <div className="space-y-3 mb-4">
              {memberships.map((m) => (
                <div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{m.title}</p>
                    <p className="text-xs text-gray-400">{m.org}</p>
                  </div>
                  <button onClick={() => handleDeleteMember(m.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg cursor-pointer"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Add New Membership</p>
              <input value={newMember.title} onChange={(e) => setNewMember((n) => ({ ...n, title: e.target.value }))} placeholder="e.g. IEEE Member" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              <input value={newMember.org} onChange={(e) => setNewMember((n) => ({ ...n, org: e.target.value }))} placeholder="e.g. Institute of Electrical and Electronics Engineers" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              <button onClick={handleAddMember} disabled={addingMember} className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 cursor-pointer disabled:opacity-70">
                <span className="material-symbols-outlined text-[18px]">add</span> Add Membership
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
