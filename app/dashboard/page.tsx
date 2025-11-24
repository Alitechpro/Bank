// app/dashboard/page.tsx
"use client";

import {
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  User,
  Hash,
  X,
  Check,
  Menu,
  Users,
  TrendingUp,
  CalendarDays,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

interface Client {
  id: string;
  name: string;
  accountNumber: string;
  openingDate: Date;
}

const STORAGE_KEY = "apnaBankClients";

// Clerk UserButton Dark Theme Fix (matches your dashboard perfectly)
<style jsx global>{`
  :where(.cl-userButtonPopoverFooter, .cl-userButtonPopoverActionButton) {
    background-color: #111827 !important;
    border-top: 1px solid #374151 !important;
  }
  :where(.cl-userButtonPopoverActionButtonText) {
    color: #f3f4f6 !important;
  }
  :where(.cl-userButtonPopoverActionButton):hover {
    background-color: #1f2937 !important;
  }
  :where(.cl-userButtonBox) {
    background-color: #1f2937 !important;
    border: 1px solid #374151 !important;
  }
`}</style>;

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    openingDate: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setClients(
        JSON.parse(saved).map((c: any) => ({
          ...c,
          openingDate: new Date(c.openingDate),
        }))
      );
    } else {
      setClients([
        {
          id: "1",
          name: "Ahmed Khan",
          accountNumber: "APN00123456",
          openingDate: new Date("2024-02-15"),
        },
        {
          id: "2",
          name: "Sana Ali",
          accountNumber: "APN00789123",
          openingDate: new Date("2024-06-20"),
        },
        {
          id: "3",
          name: "Muhammad Asif",
          accountNumber: "APN00987654",
          openingDate: new Date("2025-01-10"),
        },
        {
          id: "4",
          name: "Fatima Rehman",
          accountNumber: "APN00456789",
          openingDate: new Date("2023-11-05"),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    }
  }, [clients]);

  const filteredClients = useMemo(
    () =>
      clients.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.accountNumber.includes(search)
      ),
    [clients, search]
  );

  const stats = useMemo(() => {
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const newThisMonth = clients.filter(
      (c) => c.openingDate >= thisMonth
    ).length;
    const oldest =
      clients.length > 0
        ? format(
            new Date(Math.min(...clients.map((c) => c.openingDate.getTime()))),
            "MMM yyyy"
          )
        : "-";
    return { total: clients.length, newThisMonth, oldest };
  }, [clients]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
    setFormData({ name: "", accountNumber: "", openingDate: "" });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.accountNumber || !formData.openingDate) {
      toast.error("Please fill all fields");
      return;
    }
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 500));

    if (editingClient) {
      setClients(
        clients.map((c) =>
          c.id === editingClient.id
            ? { ...c, ...formData, openingDate: new Date(formData.openingDate) }
            : c
        )
      );
      toast.success("Client updated!");
    } else {
      setClients([
        ...clients,
        {
          id: Date.now().toString(),
          ...formData,
          openingDate: new Date(formData.openingDate),
        },
      ]);
      toast.success("Client added!");
    }
    setIsSaving(false);
    closeModal();
  };

  const openAddModal = () => {
    setEditingClient(null);
    setFormData({ name: "", accountNumber: "", openingDate: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      accountNumber: client.accountNumber,
      openingDate: format(client.openingDate, "yyyy-MM-dd"),
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-950 text-white">
          <Toaster
            position="top-right"
            toastOptions={{ style: { background: "#1f2937", color: "#fff" } }}
          />

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <aside
            className={`fixed left-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 z-50 transition-transform lg:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-black text-4xl">A</span>
                </div>
                <div>
                  <h1 className="text-3xl font-black">Apna Bank</h1>
                  <p className="text-sm text-gray-400">Employee Portal</p>
                </div>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </aside>

          <div className="lg:ml-80">
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800">
              <div className="flex justify-between items-center p-4">
                <button onClick={() => setIsSidebarOpen(true)}>
                  <Menu className="w-7 h-7" />
                </button>
                <h2 className="font-bold text-lg">Clients</h2>
                <UserButton />
              </div>
            </div>

            <main className="pt-20 lg:pt-10 px-6 pb-20">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-black mb-3">Client Management</h1>
                <p className="text-xl text-gray-400 mb-10">
                  Search, add, edit, and manage all bank clients
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-3xl shadow-2xl">
                    <Users className="w-12 h-12 mb-4" />
                    <p className="text-4xl font-black">{stats.total}</p>
                    <p>Total Clients</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-3xl shadow-2xl">
                    <TrendingUp className="w-12 h-12 mb-4" />
                    <p className="text-4xl font-black">+{stats.newThisMonth}</p>
                    <p>New This Month</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-600 to-red-700 p-8 rounded-3xl shadow-2xl">
                    <CalendarDays className="w-12 h-12 mb-4" />
                    <p className="text-3xl font-black">{stats.oldest}</p>
                    <p>First Client Since</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search by name or account..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-800 border border-gray-700 focus:border-emerald-500 outline-none text-lg"
                    />
                  </div>
                  <button
                    onClick={openAddModal}
                    className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-emerald-600 font-bold rounded-2xl shadow-xl hover:scale-105 transition"
                  >
                    <Plus className="w-6 h-6" /> Add Client
                  </button>
                </div>

                <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-indigo-600 to-emerald-600">
                        <tr>
                          <th className="px-8 py-6 text-left font-bold text-lg">
                            <User className="inline w-6 h-6 mr-3" /> Name
                          </th>
                          <th className="px-8 py-6 text-left font-bold text-lg">
                            <Hash className="inline w-6 h-6 mr-3" /> Account
                          </th>
                          <th className="px-8 py-6 text-left font-bold text-lg">
                            <Calendar className="inline w-6 h-6 mr-3" /> Opened
                          </th>
                          <th className="px-8 py-6 text-center font-bold text-lg">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClients.map((client) => (
                          <tr
                            key={client.id}
                            className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                          >
                            <td className="px-8 py-6 font-semibold">
                              {client.name}
                            </td>
                            <td className="px-8 py-6 font-mono text-indigo-400">
                              {client.accountNumber}
                            </td>
                            <td className="px-8 py-6 text-gray-400">
                              {format(client.openingDate, "dd MMM yyyy")}
                            </td>
                            <td className="px-8 py-6 text-center">
                              <button
                                onClick={() => handleEdit(client)}
                                className="text-emerald-400 hover:text-emerald-300 mr-6"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() =>
                                  confirm("Delete permanently?") &&
                                  setClients(
                                    clients.filter((c) => c.id !== client.id)
                                  ) &&
                                  toast.success("Deleted")
                                }
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {filteredClients.length === 0 && (
                      <div className="text-center py-32">
                        <AlertCircle className="w-20 h-20 mx-auto text-gray-600 mb-4" />
                        <p className="text-2xl font-semibold text-gray-400">
                          {search ? "No clients found" : "No clients yet"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
              <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full p-10 relative border border-gray-800">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white"
                >
                  <X className="w-7 h-7" />
                </button>
                <h2 className="text-3xl font-black mb-8">
                  {editingClient ? "Edit Client" : "Add New Client"}
                </h2>
                <div className="space-y-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-6 py-5 rounded-2xl bg-gray-800 border border-gray-700 focus:border-emerald-500 outline-none text-lg"
                  />
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        accountNumber: e.target.value,
                      })
                    }
                    className="w-full px-6 py-5 rounded-2xl bg-gray-800 border border-gray-700 focus:border-emerald-500 outline-none font-mono text-lg"
                  />
                  <input
                    type="date"
                    value={formData.openingDate}
                    onChange={(e) =>
                      setFormData({ ...formData, openingDate: e.target.value })
                    }
                    className="w-full px-6 py-5 rounded-2xl bg-gray-800 border border-gray-700 focus:border-emerald-500 outline-none text-lg"
                  />
                </div>
                <div className="flex gap-4 mt-10">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 py-5 bg-gradient-to-r from-indigo-600 to-emerald-600 font-bold rounded-2xl flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSaving ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Check className="w-6 h-6" />
                    )}
                    {isSaving ? "Saving..." : editingClient ? "Update" : "Add"}{" "}
                    Client
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 py-5 border-2 border-gray-700 text-gray-300 font-bold rounded-2xl hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
