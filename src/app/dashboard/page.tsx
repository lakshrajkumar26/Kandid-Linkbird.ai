
"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { Logout } from "@/components/ui/logout";
import { useAppStore } from "@/lib/store/useAppStore";
import LeadsPage from "../leads/page";

const TABS = ["Dashboard", "Leads", "Campaign", "Messages", "LinkedIn Accounts"];

export default function DashboardPage() {
  // read/write from global store
  // const collapsed = useAppStore((s) => s.sidebarCollapsed);
  // const setCollapsed = useAppStore((s) => s.setSidebarCollapsed);

  // const activeTab = useAppStore((s) => s.activeTab);
  // const setActiveTab = useAppStore((s) => s.setActiveTab);

  const {  sidebarCollapsed: collapsed,  setSidebarCollapsed: setCollapsed,  activeTab,  setActiveTab,} = useAppStore();

  // optional: keep document title in sync with active tab
  useEffect(() => {
    document.title = `${activeTab} • LinkBird`;
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white border-r flex flex-col justify-between transition-all duration-300`}
      >
        <div>
          <div className="p-4 flex items-center gap-2 font-bold text-lg">
            <div className="w-6 h-6 bg-blue-500 rounded" />
            {!collapsed && "LinkBird"}
          </div>

          <nav className="px-4 py-2 space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-100 ${
                  activeTab === tab ? "bg-gray-100 font-medium" : ""
                }`}
              >
                <span className="w-5 h-5 bg-gray-300 rounded-full" />
                {!collapsed && tab}
              </button>
            ))}
          </nav>

          {!collapsed && (
            <>
              <div className="px-4 mt-4">
                <p className="text-sm text-gray-500 uppercase mb-2">Settings</p>
                <button className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-100">
                  <Settings className="w-4 h-4" /> Setting & Billing
                </button>
              </div>
              <div className="px-4 mt-4">
                <p className="text-sm text-gray-500 uppercase mb-2">Admin Panel</p>
                <button className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-100">
                  <Activity className="w-4 h-4" /> Activity Logs
                </button>
                <button className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-100">
                  User Logs
                </button>
              </div>
            </>
          )}
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>BK</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">Bhavya From Kandid</p>
                <p className="text-gray-500 text-xs">bhavya@kandid.ai</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded hover:bg-gray-100"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
            {!collapsed && <Logout />}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-auto ">
        <h1 className="text-2xl font-semibold ">{activeTab}</h1>

        {activeTab === "Dashboard" && <DashboardTab />}
        {activeTab === "Leads" && <LeadsTab />}
        {activeTab === "Campaign" && <CampaignTab />}
        {activeTab === "Messages" && <MessagesTab />}
        {activeTab === "LinkedIn Accounts" && <LinkedInTab />}
      </main>
    </div>
  );
}

function DashboardTab() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card className="col-span-2">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Campaigns</h2>
          <ul className="space-y-2">
            {["Just Herbs", "Juicy Chemistry", "HempStreet", "HealthyHey 2"].map((c) => (
              <li key={c} className="flex justify-between p-2 rounded hover:bg-gray-50">
                {c}
                <span className="text-green-600 text-sm font-medium">Active</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Recent Activity</h2>
          <ul className="space-y-2">
            {["Om Satyarthy", "Surdeep Singh", "Sunil Pal"].map((p) => (
              <li key={p} className="flex justify-between p-2 rounded hover:bg-gray-50">
                {p}
                <span className="text-purple-600 text-sm">Pending</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">LinkedIn Accounts</h2>
          <ul className="space-y-2">
            {["Pulkit Garg", "Indrajit Sahani", "Bhavya Arora"].map((a) => (
              <li key={a} className="flex justify-between p-2 rounded hover:bg-gray-50">
                {a}
                <span className="text-blue-600 text-sm font-medium">Connected</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function LeadsTab() {
  return <Card><CardContent className="p-4">
    <LeadsPage/>
    </CardContent></Card>;
}

function CampaignTab() {
  return <Card><CardContent className="p-4">Campaign Management Section</CardContent></Card>;
}

function MessagesTab() {
  return <Card><CardContent className="p-4">Messages Section</CardContent></Card>;
}

function LinkedInTab() {
  return <Card><CardContent className="p-4">LinkedIn Accounts Section</CardContent></Card>;
}
