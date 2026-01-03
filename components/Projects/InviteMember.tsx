"use client";

import { sendMemberInvitation } from "@/actions/emails";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { InvitationProps } from "../Email-Templates/ClientInvitation";
import { ProjectData } from "@/types/types";
import { th } from "zod/v4/locales";
import toast from "react-hot-toast";

type Member = {
  id: string;
  name: string;
  email: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  projectData: ProjectData;
};

export default function InviteMembersModal({ isOpen, onClose, members, projectData }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Member[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelected([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered =
    query.trim().length === 0
      ? []
      : members.filter(
          (m) =>
            m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.email.toLowerCase().includes(query.toLowerCase()),
        );

  const toggleMember = (member: Member) => {
    setSelected((prev) =>
      prev.find((m) => m.id === member.id)
        ? prev.filter((m) => m.id !== member.id)
        : [...prev, member],
    );
  };

  const removeSelected = (id: string) => {
    setSelected((prev) => prev.filter((m) => m.id !== id));
  };
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is missing");
  }
  const handleSubmit = async () => {
    try {
      console.log("Inviting members:", selected);

      const res = await sendMemberInvitation({
        members: selected,
        projectName: projectData.name ?? "",
        memberName: projectData.client.name,
        loginLink: `${baseUrl}/login?callbackUrl=/project/${projectData.slug}`,
        projectOwner: projectData.user.name,
        projectOwnerId: projectData.userId,
      });
      console.log(res);
      toast.success("Email sent successfully");
      onClose();
      setSelected([]);
      setQuery("");
    } catch (error) {
      console.error("Error inviting members:", error);
      toast.error("Failed to invite members");
      throw error;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Invite members</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* ✅ Selected preview */}
        {selected.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.map((member) => (
              <span
                key={member.id}
                className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs"
              >
                {member.name}
                <button
                  onClick={() => removeSelected(member.id)}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        <input
          autoFocus
          type="text"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-4 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring"
        />

        <ul className="mt-3 max-h-60 overflow-y-auto">
          {query.trim().length === 0 && (
            <li className="py-6 text-center text-sm text-gray-500">
              Start typing to search members
            </li>
          )}

          {query.trim().length > 0 && filtered.length === 0 && (
            <li className="py-6 text-center text-sm text-gray-500">No members found</li>
          )}

          {filtered.map((member) => {
            const isSelected = selected.some((m) => m.id === member.id);

            return (
              <li
                key={member.id}
                onClick={() => toggleMember(member)}
                className={`flex cursor-pointer items-center justify-between rounded px-2 py-2 text-sm hover:bg-gray-100 ${
                  isSelected ? "bg-gray-100 font-medium" : ""
                }`}
              >
                <div>
                  <p>{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
                {isSelected && <span>✓</span>}
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={selected.length === 0}
            onClick={() => handleSubmit()}
            className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-40"
          >
            Invite ({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
}
