"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DepartmentsPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", subDepartments: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      fetchDepartments(page);
    }
  }, [token, page, router]);

  const fetchDepartments = async (currentPage: number) => {
    setLoadingDepartments(true);
    try {
      const res = await fetch(
        `/api/departments?skip=${currentPage * PAGE_SIZE}&take=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch departments");
      }
      setDepartments(data.departments || []);
      setHasMore((data.departments || []).length === PAGE_SIZE);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const subDepartments = form.subDepartments
      ? form.subDepartments.split(",").map((name) => ({ name: name.trim() }))
      : [];

    const payload: any = {
      name: form.name,
      subDepartments,
    };

    if (editingId !== null) {
      payload.id = editingId;
    }

    try {
      const res = await fetch("/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("checking:", data, payload, "token:", token);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to save department");
      }

      setForm({ name: "", subDepartments: "" });
      setEditingId(null);
      await fetchDepartments(page);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dept: any) => {
    setForm({
      name: dept.name,
      subDepartments:
        dept.subDepartments?.map((s: any) => s.name).join(", ") || "",
    });
    setEditingId(dept.id);
    setError("");
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/departments", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete department");
      }

      await fetchDepartments(page);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed: " + (err as any).message);
    }
  };

  if (!token) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl bg-gray-100 text-black font-bold mb-4">
        {editingId !== null ? "Edit" : "Create"} Department
      </h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        {editingId !== null && (
          <input
            type="text"
            value={`Editing ID: ${editingId}`}
            disabled
            className="border px-3 py-1 w-full text-black bg-gray-100"
          />
        )}
        <input
          type="text"
          name="name"
          placeholder="Department name"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-1 w-full"
          required
        />
        <input
          type="text"
          name="subDepartments"
          placeholder="Sub-departments (comma separated)"
          value={form.subDepartments}
          onChange={handleChange}
          className="border px-3 py-1 w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : editingId !== null ? "Update" : "Create"}
        </button>
      </form>

      <hr className="my-6" />

      <h2 className="text-lg font-semibold mb-3">All Departments</h2>

      {loadingDepartments ? (
        <p className="text-gray-500">Loading departments...</p>
      ) : departments.length === 0 ? (
        <p className="text-gray-500">No departments found.</p>
      ) : (
        <ul className="space-y-2">
          {departments.map((dept: any) => (
            <li
              key={dept.id}
              className="border p-3 rounded flex justify-between items-start"
            >
              <div>
                <p className="font-medium">{dept.name}</p>
                {dept.subDepartments.length > 0 && (
                  <ul className="ml-4 mt-1 list-disc text-sm text-gray-700">
                    {dept.subDepartments.map((s: any) => (
                      <li key={s.id}>{s.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(dept)}
                  className="text-sm px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="text-sm px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMore}
          className="text-sm px-4 py-2 bg-gray-200 rounded text-black hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
