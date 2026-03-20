import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bot,
  Brain,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plug,
  Plus,
  Settings,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  ServiceType,
  useAddOrUpdateTeamMember,
  useCreateOrUpdateCompanyProfile,
  useDeleteTeamMember,
  useGetCompanyProfile,
  useGetTeamMembers,
} from "../hooks/useQueries";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Bot, label: "AI Agents" },
  { icon: Users, label: "Team" },
  { icon: BarChart3, label: "Reports" },
  { icon: Plug, label: "Integration" },
  { icon: Settings, label: "Settings" },
];

const serviceOptions: { value: ServiceType; label: string }[] = [
  { value: ServiceType.aiSupportAgents, label: "AI Support Agents" },
  { value: ServiceType.automationBots, label: "Automation Bots" },
  { value: ServiceType.processOptimization, label: "Process Optimization" },
  { value: ServiceType.customSolutions, label: "Custom Solutions" },
];

const profileSkeletonKeys = ["ps1", "ps2", "ps3", "ps4", "ps5", "ps6"];
const teamSkeletonKeys = ["ts1", "ts2", "ts3"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function DashboardPage() {
  const { identity, clear } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetCompanyProfile();
  const { data: members = [], isLoading: membersLoading } = useGetTeamMembers();
  const saveProfile = useCreateOrUpdateCompanyProfile();
  const addMember = useAddOrUpdateTeamMember();
  const deleteMember = useDeleteTeamMember();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    companyWebsite: "",
    companyAddress: "",
    servicesNeeded: [] as ServiceType[],
  });

  const [formInit, setFormInit] = useState(false);
  if (profile && !formInit) {
    const dob = profile.dateOfBirth
      ? new Date(Number(profile.dateOfBirth)).toISOString().split("T")[0]
      : "";
    setForm({
      email: profile.email || "",
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      dateOfBirth: dob,
      companyWebsite: profile.companyWebsite || "",
      companyAddress: profile.companyAddress || "",
      servicesNeeded: profile.servicesNeeded || [],
    });
    setFormInit(true);
  }

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberDesig, setMemberDesig] = useState("");

  function handleServiceToggle(service: ServiceType) {
    setForm((prev) => ({
      ...prev,
      servicesNeeded: prev.servicesNeeded.includes(service)
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service],
    }));
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    try {
      const dobMs = form.dateOfBirth
        ? BigInt(new Date(form.dateOfBirth).getTime())
        : BigInt(0);
      await saveProfile.mutateAsync({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        dateOfBirth: dobMs,
        companyWebsite: form.companyWebsite,
        companyAddress: form.companyAddress,
        servicesNeeded: form.servicesNeeded,
      });
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile.");
    }
  }

  async function handleAddMember(e: React.FormEvent) {
    e.preventDefault();
    if (!memberName.trim() || !memberDesig.trim()) return;
    try {
      await addMember.mutateAsync({
        name: memberName.trim(),
        designation: memberDesig.trim(),
      });
      toast.success("Team member added!");
      setMemberName("");
      setMemberDesig("");
      setMemberModalOpen(false);
    } catch {
      toast.error("Failed to add member.");
    }
  }

  async function handleDeleteMember(name: string) {
    try {
      await deleteMember.mutateAsync(name);
      toast.success("Member removed.");
    } catch {
      toast.error("Failed to remove member.");
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      {/* Top nav */}
      <header
        className="sticky top-0 z-40 w-full"
        style={{ backgroundColor: "oklch(var(--navy))" }}
      >
        <div className="max-w-full px-4 sm:px-8 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ backgroundColor: "oklch(var(--teal))" }}
            >
              <Brain
                className="w-4 h-4"
                style={{ color: "oklch(var(--navy))" }}
              />
            </div>
            <span className="text-white font-bold tracking-wider text-sm">
              S TECH
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {identity && (
              <span className="text-white/50 text-xs hidden sm:block truncate max-w-[180px]">
                {identity.getPrincipal().toString()}
              </span>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={clear}
              data-ocid="dashboard.secondary_button"
            >
              <LogOut className="w-4 h-4 mr-1" /> Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <div
        className="py-10 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 230) 0%, oklch(0.28 0.08 218) 100%)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-white"
        >
          Company Dashboard
        </motion.h1>
        <p className="text-white/60 text-sm mt-1">
          Manage your profile, team, and AI agent configuration
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-2xl shadow-card-lg border border-border overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[600px]">
            {/* Sidebar */}
            <aside
              className="w-full md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-border"
              style={{ backgroundColor: "oklch(0.99 0.002 240)" }}
            >
              <div className="p-4 border-b border-border flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: "oklch(var(--teal))" }}
                >
                  <Brain
                    className="w-4 h-4"
                    style={{ color: "oklch(var(--navy))" }}
                  />
                </div>
                <span
                  className="font-bold text-sm tracking-wider"
                  style={{ color: "oklch(var(--navy))" }}
                >
                  S TECH
                </span>
              </div>
              <nav className="p-2 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      item.active
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    style={
                      item.active
                        ? { backgroundColor: "oklch(var(--navy))" }
                        : {}
                    }
                    data-ocid={`sidebar.${item.label.toLowerCase().replace(" ", "_")}.button`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                    {item.active && (
                      <Badge
                        className="ml-auto text-xs py-0 px-1.5"
                        style={{
                          backgroundColor: "oklch(var(--teal))",
                          color: "oklch(var(--navy))",
                        }}
                      >
                        Active
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 p-5 md:p-7">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Company Registration Form */}
                <Card className="border border-border shadow-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">
                      Company Registration Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {profileLoading ? (
                      <div
                        className="space-y-3"
                        data-ocid="profile.loading_state"
                      >
                        {profileSkeletonKeys.map((k) => (
                          <Skeleton key={k} className="h-10 w-full" />
                        ))}
                      </div>
                    ) : (
                      <form onSubmit={handleSaveProfile} className="space-y-4">
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-xs font-medium text-muted-foreground mb-1.5 block"
                          >
                            Gmail / Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@gmail.com"
                            value={form.email}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, email: e.target.value }))
                            }
                            required
                            data-ocid="profile.input"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label
                              htmlFor="firstName"
                              className="text-xs font-medium text-muted-foreground mb-1.5 block"
                            >
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              placeholder="John"
                              value={form.firstName}
                              onChange={(e) =>
                                setForm((p) => ({
                                  ...p,
                                  firstName: e.target.value,
                                }))
                              }
                              required
                              data-ocid="profile.input"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="lastName"
                              className="text-xs font-medium text-muted-foreground mb-1.5 block"
                            >
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              placeholder="Smith"
                              value={form.lastName}
                              onChange={(e) =>
                                setForm((p) => ({
                                  ...p,
                                  lastName: e.target.value,
                                }))
                              }
                              required
                              data-ocid="profile.input"
                            />
                          </div>
                        </div>
                        <div>
                          <Label
                            htmlFor="dob"
                            className="text-xs font-medium text-muted-foreground mb-1.5 block"
                          >
                            Date of Birth
                          </Label>
                          <Input
                            id="dob"
                            type="date"
                            value={form.dateOfBirth}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                dateOfBirth: e.target.value,
                              }))
                            }
                            data-ocid="profile.input"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="website"
                            className="text-xs font-medium text-muted-foreground mb-1.5 block"
                          >
                            Your Company Link
                          </Label>
                          <Input
                            id="website"
                            type="url"
                            placeholder="https://yourcompany.com"
                            value={form.companyWebsite}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                companyWebsite: e.target.value,
                              }))
                            }
                            data-ocid="profile.input"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="address"
                            className="text-xs font-medium text-muted-foreground mb-1.5 block"
                          >
                            Company Address
                          </Label>
                          <Input
                            id="address"
                            placeholder="123 Business Ave, City, Country"
                            value={form.companyAddress}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                companyAddress: e.target.value,
                              }))
                            }
                            data-ocid="profile.input"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground mb-2.5 block">
                            Services Needed
                          </Label>
                          <div className="space-y-2.5">
                            {serviceOptions.map((opt) => (
                              <div
                                key={opt.value}
                                className="flex items-center gap-2.5"
                              >
                                <Checkbox
                                  id={opt.value}
                                  checked={form.servicesNeeded.includes(
                                    opt.value,
                                  )}
                                  onCheckedChange={() =>
                                    handleServiceToggle(opt.value)
                                  }
                                  data-ocid="profile.checkbox"
                                />
                                <Label
                                  htmlFor={opt.value}
                                  className="text-sm cursor-pointer"
                                >
                                  {opt.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full rounded-lg font-semibold"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.25 0.07 225), oklch(0.20 0.06 215))",
                            color: "white",
                          }}
                          disabled={saveProfile.isPending}
                          data-ocid="profile.submit_button"
                        >
                          {saveProfile.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Profile"
                          )}
                        </Button>
                        {saveProfile.isError && (
                          <p
                            className="text-xs text-destructive"
                            data-ocid="profile.error_state"
                          >
                            Failed to save. Please try again.
                          </p>
                        )}
                      </form>
                    )}
                  </CardContent>
                </Card>

                {/* Team Management */}
                <Card className="border border-border shadow-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">
                        Team Management
                      </CardTitle>
                      <Button
                        size="sm"
                        className="rounded-lg text-xs font-semibold gap-1.5"
                        style={{
                          backgroundColor: "oklch(var(--teal))",
                          color: "oklch(var(--navy))",
                        }}
                        onClick={() => setMemberModalOpen(true)}
                        data-ocid="team.open_modal_button"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Team Member
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {membersLoading ? (
                      <div className="space-y-3" data-ocid="team.loading_state">
                        {teamSkeletonKeys.map((k) => (
                          <Skeleton
                            key={k}
                            className="h-14 w-full rounded-lg"
                          />
                        ))}
                      </div>
                    ) : members.length === 0 ? (
                      <div
                        className="text-center py-12 text-muted-foreground"
                        data-ocid="team.empty_state"
                      >
                        <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-medium">
                          No team members yet
                        </p>
                        <p className="text-xs mt-1">
                          Add your first team member to get started
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {members.map((member, i) => (
                          <motion.div
                            key={member.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                            data-ocid={`team.item.${i + 1}`}
                          >
                            <Avatar className="h-9 w-9 shrink-0">
                              <AvatarFallback
                                className="text-xs font-semibold"
                                style={{
                                  backgroundColor: "oklch(var(--teal) / 0.15)",
                                  color: "oklch(var(--navy))",
                                }}
                              >
                                {getInitials(member.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-foreground truncate">
                                {member.name}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {member.designation}
                              </div>
                            </div>
                            <Badge
                              className="text-xs shrink-0"
                              style={{
                                backgroundColor: "oklch(0.92 0.06 155)",
                                color: "oklch(0.40 0.12 155)",
                                border: "none",
                              }}
                            >
                              Active
                            </Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteMember(member.name)}
                              disabled={deleteMember.isPending}
                              data-ocid={`team.delete_button.${i + 1}`}
                            >
                              {deleteMember.isPending ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      <Dialog open={memberModalOpen} onOpenChange={setMemberModalOpen}>
        <DialogContent className="sm:max-w-md" data-ocid="team.dialog">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddMember}>
            <div className="space-y-4 py-2">
              <div>
                <Label
                  htmlFor="mName"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Full Name
                </Label>
                <Input
                  id="mName"
                  placeholder="Jane Doe"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  required
                  data-ocid="team.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="mDesig"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Designation / Role
                </Label>
                <Input
                  id="mDesig"
                  placeholder="Senior Engineer"
                  value={memberDesig}
                  onChange={(e) => setMemberDesig(e.target.value)}
                  required
                  data-ocid="team.input"
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setMemberModalOpen(false)}
                data-ocid="team.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addMember.isPending}
                style={{
                  backgroundColor: "oklch(var(--teal))",
                  color: "oklch(var(--navy))",
                }}
                data-ocid="team.confirm_button"
              >
                {addMember.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Member"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
