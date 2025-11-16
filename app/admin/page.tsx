"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { User, Entry } from "@/lib/db";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Users,
  DollarSign,
  Activity,
  Download,
  AlertCircle,
  Shield,
} from "lucide-react";
import { formatDate, formatCurrency, exportToCSV } from "@/lib/utils";
import { getMembershipStatus, getDaysUntilExpiry } from "@/lib/db";
import toast from "react-hot-toast";

export default function AdminPage() {
  const router = useRouter();
  const { user: authUser, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    expiringMembers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "active" | "expiring" | "expired"
  >("all");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  // Check admin role
  useEffect(() => {
    const checkAdminRole = async () => {
      if (authLoading) return;

      if (!authUser) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch(`/api/user?uid=${authUser.uid}`);
        const data = await response.json();

        if (data.user?.role !== "admin") {
          toast.error("Access denied. Admin credentials required.");
          router.push("/admin/login");
          return;
        }

        setIsAdmin(true);
        setCheckingRole(false);
      } catch (error) {
        console.error("Error checking admin role:", error);
        toast.error("Failed to verify admin access");
        router.push("/admin/login");
      }
    };

    checkAdminRole();
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (isAdmin && authUser) {
      fetchAdminData();
    }
  }, [isAdmin, authUser]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // Fetch all users
      const usersResponse = await fetch("/api/admin/users");
      const usersData = await usersResponse.json();

      // Fetch recent entries
      const entriesResponse = await fetch("/api/admin/entries");
      const entriesData = await entriesResponse.json();

      if (usersData.users) {
        setUsers(usersData.users);
        calculateStats(usersData.users);
      }

      if (entriesData.entries) {
        setEntries(entriesData.entries);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (userList: User[]) => {
    const active = userList.filter(
      (u) => getMembershipStatus(u) === "active"
    ).length;
    const expiring = userList.filter(
      (u) => getMembershipStatus(u) === "expiring"
    ).length;

    // Calculate total revenue (simplified - would need actual payment data)
    const revenue = userList.length * 30; // Assuming average $30/month

    setStats({
      totalMembers: userList.length,
      activeMembers: active,
      expiringMembers: expiring,
      totalRevenue: revenue,
    });
  };

  const getFilteredUsers = () => {
    switch (filter) {
      case "active":
        return users.filter((u) => getMembershipStatus(u) === "active");
      case "expiring":
        return users.filter((u) => getMembershipStatus(u) === "expiring");
      case "expired":
        return users.filter((u) => getMembershipStatus(u) === "expired");
      default:
        return users;
    }
  };

  const handleExportUsers = () => {
    const exportData = getFilteredUsers().map((user) => ({
      Name: user.name,
      Phone: user.phone,
      Email: user.email || "N/A",
      Status: getMembershipStatus(user),
      "Days Left": getDaysUntilExpiry(user.expiryDate),
      "Join Date": formatDate(user.joinDate),
      "Expiry Date": formatDate(user.expiryDate),
      Plan: user.membershipPlan,
    }));

    exportToCSV(
      exportData,
      `elit-members-${new Date().toISOString().split("T")[0]}.csv`
    );
    toast.success("Members exported to CSV");
  };

  const handleExportEntries = () => {
    const exportData = entries.map((entry) => ({
      Member: entry.userName,
      Location: entry.location,
      Timestamp: formatDate(entry.timestamp),
    }));

    exportToCSV(
      exportData,
      `elit-entries-${new Date().toISOString().split("T")[0]}.csv`
    );
    toast.success("Entries exported to CSV");
  };

  const handleSendReminders = async () => {
    try {
      const response = await fetch("/api/admin/send-reminders", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Reminders sent to ${data.count} members`);
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error("Send reminders error:", error);
      toast.error(error.message || "Failed to send reminders");
    }
  };

  if (authLoading || checkingRole || loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <LoadingSpinner message="Loading admin dashboard..." />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="card max-w-md text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">
            You do not have permission to access the admin dashboard.
          </p>
          <button onClick={() => router.push("/")} className="btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const filteredUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair gold-text mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Manage members, view analytics, and send reminders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Members</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalMembers}
                </p>
              </div>
            </div>
          </div>

          <div className="card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Active Members</p>
                <p className="text-2xl font-bold text-white">
                  {stats.activeMembers}
                </p>
              </div>
            </div>
          </div>

          <div className="card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Expiring Soon</p>
                <p className="text-2xl font-bold text-white">
                  {stats.expiringMembers}
                </p>
              </div>
            </div>
          </div>

          <div className="card-hover">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Est. Revenue</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleExportUsers}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Members</span>
          </button>
          <button
            onClick={handleExportEntries}
            className="btn-outline flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Entries</span>
          </button>
          <button
            onClick={handleSendReminders}
            className="btn-outline flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Send Reminders</span>
          </button>
        </div>

        {/* Members Table */}
        <div className="card">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-bold font-playfair text-white">
              Members
            </h2>
            <div className="flex space-x-2">
              {["all", "active", "expiring", "expired"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    filter === f
                      ? "bg-gold text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Days Left
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Expiry
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Plan
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const status = getMembershipStatus(user);
                  const daysLeft = getDaysUntilExpiry(user.expiryDate);

                  return (
                    <tr
                      key={user.uid}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-white font-semibold">
                        {user.name}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{user.phone}</td>
                      <td className="py-3 px-4">
                        <span className={`badge-${status}`}>{status}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{daysLeft}</td>
                      <td className="py-3 px-4 text-gray-300">
                        {formatDate(user.expiryDate)}
                      </td>
                      <td className="py-3 px-4 text-gray-300 capitalize">
                        {user.membershipPlan.replace("-", " ")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 py-8">No members found</p>
          )}
        </div>

        {/* Recent Entries */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold font-playfair text-white mb-6">
            Recent Check-Ins
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Member
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.slice(0, 10).map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-800">
                    <td className="py-3 px-4 text-white font-semibold">
                      {entry.userName}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {entry.location}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {formatDate(entry.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {entries.length === 0 && (
            <p className="text-center text-gray-400 py-8">No check-ins yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
