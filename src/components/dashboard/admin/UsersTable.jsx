"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/TableSkeleton";
import { Trash2, RotateCcw } from "lucide-react";

export default function UsersTable() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

const loadUsers = async () => {
try {
   const {data:tokenData} = await authClient.token()
    console.log(tokenData)
const res = await fetch(
`${process.env.NEXT_PUBLIC_URL}/api/admin/users`,{
            headers:{
              authorization: `Bearer ${tokenData?.token}`
            }
          }
);


  if (!res.ok) {
    throw new Error("Failed to load users");
  }

  const data = await res.json();
  setUsers(data || []);
} catch (err) {
  console.log(err);
} finally {
  setLoading(false);
}


};

useEffect(() => {
loadUsers();
}, []);

const handleRoleChange = async (id, role) => {
try {
  const {data:tokenData} = await authClient.token()
  console.log(tokenData)
const res = await fetch(
`${process.env.NEXT_PUBLIC_URL}/api/admin/users/${id}/role`,      
{
method: "PATCH",
headers: {
"Content-Type": "application/json",
  authorization: `Bearer ${tokenData?.token}`
},
body: JSON.stringify({ role }),
}
);


  if (!res.ok) {
    toast.error("Role update failed");
    return;
  }

  setUsers((prev) =>
    prev.map((user) =>
      user._id === id ? { ...user, role } : user
    )
  );
  toast.success("Role updated successfully");
} catch (err) {
  console.log(err);
  toast.error("Something went wrong");
}


};

const handleDelete = async (id) => {
const confirmDelete = window.confirm(
"Delete this user?"
);


if (!confirmDelete) return;

try {
  const {data:tokenData} = await authClient.token()
    console.log(tokenData)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/users/${id}`,
    {
      method: "DELETE",
      headers:{
        authorization: `Bearer ${tokenData?.token}`
      }
    }
  );

  if (!res.ok) {
    toast.error("Delete failed");
    return;
  }

  setUsers((prev) =>
    prev.filter((user) => user._id !== id)
  );
    toast.success("User deleted successfully");
} catch (err) {
  console.log(err);
  toast.error("Something went wrong");
}


};

const roleBadge = (role) => {
  const map = {
    admin: "bg-rose-500/10 text-rose-400 ring-rose-500/30",
    writer: "bg-indigo-500/10 text-indigo-300 ring-indigo-500/30",
    user: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  };

  return `rounded-full px-3 py-1 text-xs font-semibold ring-1 ${map[role] || map.user}`;
};



if (loading) {
  return <TableSkeleton rows={6} />;
}

return (
  <>
    {/* Desktop Table */}
    <div className="card hidden lg:block overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-soft">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-muted">
                Name
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                Email
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                Role
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-line hover:bg-soft/60 transition"
              >
                <td className="px-6 py-4 text-ink">
                  {user.name || "N/A"}
                </td>

                <td className="px-6 py-4 text-body">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span className={roleBadge(user.role)}>
                    {user.role || "user"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <select
                      value={user.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(
                          user._id,
                          e.target.value
                        )
                      }
                      className="input w-auto py-2"
                    >
                      <option value="user">User</option>
                      <option value="writer">Writer</option>
                      <option value="admin">Admin</option>
                    </select>

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Mobile Cards */}
    <div className="grid gap-4 lg:hidden">
      {users.map((user) => (
        <div
          key={user._id}
          className="card p-5"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted">
                Name
              </p>
              <h3 className="font-semibold text-ink">
                {user.name || "N/A"}
              </h3>
            </div>

            <div>
              <p className="text-xs text-muted">
                Email
              </p>
              <p className="text-sm text-body break-all">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted">
                Role
              </p>

              <span
                className={`inline-block mt-1 ${roleBadge(user.role)}`}
              >
                {user.role || "user"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={user.role || "user"}
                onChange={(e) =>
                  handleRoleChange(
                    user._id,
                    e.target.value
                  )
                }
                className="input w-full"
              >
                <option value="user">User</option>
                <option value="writer">Writer</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() =>
                  handleDelete(user._id)
                }
                className="btn btn-danger w-full"
              >
                <RotateCcw className="h-4 w-4" />
                Delete User
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {users.length === 0 && !loading && (
      <div className="card p-10 text-center text-muted">
        No users found
      </div>
    )}
  </>
);
}