import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Settings, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <div className="p-4 flex items-center gap-2 font-bold text-lg">
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            LinkBird
          </div>
          <nav className="px-4 py-2 space-y-2">
            <button className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-100">
              Dashboard
            </button>
            <button className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-100">
              Leads
            </button>
            <button className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-100">
              Campaign
            </button>
            <button className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-100">
              Messages
              <span className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                10+
              </span>
            </button>
            <button className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-100">
              LinkedIn Accounts
            </button>
          </nav>
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
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>BK</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">Bhavya From Kandid</p>
              <p className="text-gray-500 text-xs">bhavya@kandid.ai</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardContent className="h-48 flex items-center justify-center text-gray-400">
              Main Content Area
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-48 flex items-center justify-center text-gray-400">
              Side Widgets
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardContent className="h-48 flex items-center justify-center text-gray-400">
              Bottom Content
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
