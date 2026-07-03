"use client";

import { useState, useEffect, useRef } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { getProfile, saveProfile } from "@/lib/firestore";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DEFAULT = {
  name: "Md Sharfuddin",
  title: "MBA in MIS | AI & Data Analytics Researcher | Business Analyst",
  subtitle: "Published Researcher | Patent Holder | Guest Lecturer",
  bio: "Bridging business strategy, intelligent information systems, and data-driven decision science. Specializing in machine learning and predictive analytics to optimize enterprise MIS frameworks.",
  location: "Los Angeles, CA",
  email: "sharfuddin.md50@yahoo.com",
  phone: "+1 (213) 636-2680",
  cvLink: "",
  photoUrl: "/image 1.jpeg",
};

export default function AdminProfile() {
  const [form, setForm] = useState(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef(null);

  useEffect(() => {
    getProfile()
      .then((data) => { if (data) setForm((p) => ({ ...p, ...data })); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Save failed. Check your Firebase connection.");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `profile/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm((p) => ({ ...p, photoUrl: url }));
      setSaved(false);
    } catch {
      alert("Photo upload failed. Check Firebase Storage rules.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <>
      <AdminHeader title="Profile & CV" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Photo Upload */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">photo_camera</span>
              Profile Photo
            </h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 shrink-0">
                {form.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-gray-300">person</span>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-70"
                >
                  {uploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span className="material-symbols-outlined text-[18px]">upload</span>}
                  {uploading ? "Uploading..." : "Upload New Photo"}
                </button>
                <p className="text-xs text-gray-400 mt-2">JPG or PNG, max 5MB</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
            <h2 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">badge</span>
              Basic Information
            </h2>
            <Field label="Full Name" name="name" value={form.name} onChange={handleChange} />
            <Field label="Title Line (shown below your name)" name="title" value={form.title} onChange={handleChange} />
            <Field label="Subtitle (e.g. Published Researcher | Patent Holder)" name="subtitle" value={form.subtitle} onChange={handleChange} />
            <Field label="Location" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Los Angeles, CA" />
            <Field label="Email Address" name="email" value={form.email} onChange={handleChange} type="email" />
            <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          </div>

          {/* Bio */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">notes</span>
              Short Bio / Tagline
            </h2>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
              placeholder="Short description shown on homepage..."
            />
          </div>

          {/* CV Link */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 text-base mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">description</span>
              CV / Resume Link
            </h2>
            <p className="text-xs text-gray-400 mb-4">Paste your Google Drive share link here. Make sure the link is set to &quot;Anyone with link can view&quot;.</p>
            <Field label="Google Drive CV Link" name="cvLink" value={form.cvLink} onChange={handleChange} placeholder="https://drive.google.com/file/d/..." />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer disabled:opacity-70"
            >
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span className="material-symbols-outlined text-[18px]">save</span>}
              {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
      />
    </div>
  );
}
