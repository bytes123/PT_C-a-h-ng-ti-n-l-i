import React from "react";

export default function MainRateForm({ form, handleChange }) {
  return (
    <div>
      <input
        name="author"
        value={form.author}
        type="text"
        className="p-5 text-2xl w-[300px] mb-5 border border-slate-300 rounded-xl focus:outline-none"
        placeholder="Để lại tên người đánh giá"
        onChange={handleChange}
      />
      <input
        name="content"
        value={form.content}
        type="text"
        className="p-5 pb-20 text-2xl w-full border border-slate-300 rounded-xl focus:outline-none"
        placeholder="Để lại lời đánh giá"
        onChange={handleChange}
      />
    </div>
  );
}
