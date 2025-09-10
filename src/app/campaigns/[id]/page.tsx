"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, BarChart2, TrendingUp } from "lucide-react";
import { useParams } from "next/navigation";
import LeadsTabContent from "@/components/ui/table";
import { MessageEditor } from "@/components/ui/messageEditor";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; 

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState({
  connection: { text: "", delay: "" },
  followup1: { text: "", delay: "" },
  followup2: { text: "", delay: "" },
});

const [settings, setSettings] = useState({
  campaignName: "Just Herbs",
  campaignStatus: true,
  noPersonalization: false,
  autoPilot: false,
  selectedAccount: "account1",
});

  console.log("data for id", id);

  const campaignId = id;
  const { data, isLoading } = useQuery({
    queryKey: ["campaignDetails", campaignId],
    queryFn: async () => {
      const res = await axios.get(`/api/campaigns/${campaignId}`);
      console.log(res.data);

      return res.data;
    },
  });
  useEffect(() => {
    console.log(data);
  });
const stats = data?.stats;

const conversionRate =
  stats && stats.totalLeads > 0
    ? ((stats.requestsReplied / stats.totalLeads) * 100).toFixed(2)
    : "0.00";
  const [tab, setTab] = useState("overview");

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4 flex items-center space-x-2">
        <span>Campaign</span>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-200 font-medium">
          Just Herbs
        </span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Campaign Details
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage and track your campaign performance
          </p>
        </div>
        <Badge className="bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200 px-3 py-1 rounded-lg">
          Active
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="sequence">Sequence</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Total Leads</p>
                <h2 className="text-2xl font-bold">
                  {data?.stats?.totalLeads}
                </h2>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Request Sent</p>
                <h2 className="text-2xl font-bold">
                  {data?.stats?.requestsSent}
                </h2>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                {/* check later for Accepted */}
                <p className="text-sm text-gray-500">Request Accepted</p>
                <h2 className="text-2xl font-bold">
                  {data?.stats?.requestsSent}
                </h2>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Request Replied</p>
                <h2 className="text-2xl font-bold">
                  {data?.stats?.requestsReplied}
                </h2>
              </CardContent>
            </Card>
          </div>

          {/* Progress + Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Campaign Progress
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm mb-1 flex">
                      Leads Contacted{" "}
                      <span className="ml-auto">
                        {data?.stats?.leadsContacted}%
                      </span>
                    </p>
                    <Progress value={data?.stats?.leadsContacted} />
                  </div>
                  <div>
                    <p className="text-sm mb-1 flex">
                      Acceptance Rate{" "}
                      <span className="ml-auto">
                        {data?.stats?.acceptanceRate}%
                      </span>
                    </p>
                    <Progress value={data?.stats?.acceptanceRate} />
                  </div>
                  <div>
                    <p className="text-sm mb-1 flex ">
                      Reply Rate
                      <span className="ml-auto">{data?.stats?.replyRate}%</span>{" "}
                    </p>
                    <Progress value={data?.stats?.replyRate} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Start Date:{" "}
                      <span>
                        {data?.campaign?.created_at
                          ? new Date(data.campaign.created_at)
                              .toISOString()
                              .split("T")[0]
                          : ""}
                      </span>
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <BarChart2 className="w-4 h-4" />
                    <span>Status: {data?.campaign?.status}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Conversion Rate: {conversionRate}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other Tabs Placeholder */}
        <TabsContent value="leads">
              <LeadsTabContent campaignData={data?.leads} />
        </TabsContent>
        <TabsContent value="sequence">
        



       <div className="space-y-6">
        <h1 className="text-bold text-2xl">Message Sequence</h1>
    <MessageEditor
      id="connection"
      title="Request Message"
      text={messages.connection.text}
      delay={messages.connection.delay}
      placeholder="Edit your Request message here."
      onChange={(field, value) =>
        setMessages((prev) => ({
          ...prev,
          connection: { ...prev.connection, [field]: value },
        }))
      }
      onSave={() => console.log("Saving connection", messages.connection)}
      onPreview={() => console.log("Preview connection", messages.connection)}
    />

    <MessageEditor
      id="followup1"
      title="First Follow-up Message"
      text={messages.followup1.text}
      delay={messages.followup1.delay}
      placeholder="Edit your first follow-up message here..."
      onChange={(field, value) =>
        setMessages((prev) => ({
          ...prev,
          followup1: { ...prev.followup1, [field]: value },
        }))
      }
      onSave={() => console.log("Saving followup1", messages.followup1)}
      onPreview={() => console.log("Preview followup1", messages.followup1)}
    />

    <MessageEditor
      id="followup2"
      title="Second Follow-up Message"
      text={messages.followup2.text}
      delay={messages.followup2.delay}
      placeholder="Edit your second follow-up message here..."
      onChange={(field, value) =>
        setMessages((prev) => ({
          ...prev,
          followup2: { ...prev.followup2, [field]: value },
        }))
      }
      onSave={() => console.log("Saving followup2", messages.followup2)}
      onPreview={() => console.log("Preview followup2", messages.followup2)}
    />
  </div>

        </TabsContent>
        <TabsContent value="settings" className="bg-gray-200">
      

  <div className="space-y-6 bg-white">
    {/* Campaign Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 bg-white pt-5">
        Campaign Name
      </label>
      <Input
        type="text"
        value={settings.campaignName}
        onChange={(e) =>
          setSettings((prev) => ({ ...prev, campaignName: e.target.value }))
        }
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white"
      />
    </div>

    {/* Toggles */}
    <div className="flex items-center justify-between ">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Campaign Status
      </span>
      <Switch
        checked={settings.campaignStatus}
        onCheckedChange={(val :any) =>
          setSettings((prev) => ({ ...prev, campaignStatus: val }))
        }
      />
    </div>

    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Request without personalization
      </span>
      <Switch
        checked={settings.noPersonalization}
        onCheckedChange={(val) =>
          setSettings((prev) => ({ ...prev, noPersonalization: val }))
        }
      />
    </div>

    {/* AutoPilot Mode */}
    <div className="rounded-lg border p-4 dark:border-gray-700 ">
      <div className="flex items-center justify-between mb-4 bg-gray-200">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100 p-2">
            AutoPilot Mode
          </h3>
          <p className="text-xs text-gray-500  dark:text-gray-100 p-2">
            Let the system automatically manage LinkedIn account assignments
          </p>
        </div>
        <Switch
          checked={settings.autoPilot}
          onCheckedChange={(val) =>
            setSettings((prev) => ({ ...prev, autoPilot: val }))
          }
        />
      </div>

      {/* Account Dropdown */}
      <Select 
        value={settings.selectedAccount}
        onValueChange={(val) =>
          setSettings((prev) => ({ ...prev, selectedAccount: val }))
        }
      >
        <SelectTrigger className="w-full dark:text-gray-100 p-2">
          <SelectValue placeholder="Select account" className="dark:text-gray-100 p-2" />
        </SelectTrigger>
        <SelectContent className="dark:text-gray-100 p-2">
          <SelectItem value="account1" className="dark:text-gray-100 p-2">Jivesh Lakhani</SelectItem>
          <SelectItem value="account2">Another Account</SelectItem>
        </SelectContent>
      </Select>

      {/* Selected Accounts */}
      <div className="mt-4 ">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ">
          Selected Accounts:
        </p>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 rounded-full border px-3 py-1 dark:text-gray-100 p-2 dark:border-gray-600">
            <img
              src="/avatars/jivesh.png"
              alt="Jivesh Lakhani"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm">Jivesh Lakhani</span>
          </div>
        </div>
      </div>
    </div>
  </div>

<div>
<h1 className="bg-white">Danger Zone</h1>
<p className="text-xs text-black bg-white  dark:text-gray-100 p-2">Irreversible and destructive actions</p>


   <div className="rounded-lg border p-4 dark:border-gray-700 ">
      <div className="flex items-center justify-between mb-4 bg-gray-200 ">
        <div className="border-2 ">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100 ">
            Delete Campaign 
          </h3>
          <p className="text-xs text-gray-500  dark:text-gray-100 p-2 flex">
            Let the system automatically manage LinkedIn account assignments
           <button className="rounded-2xl px-5 bg-red-500 text-sm text-white p-2  ml-70">Delete Campaign</button></p>
        </div>
        
      </div>
</div>
     
     

     
      
    </div>

        </TabsContent>
      </Tabs>
    </div>
  );
}

// "use client";

// import { useState, useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Activity } from "lucide-react";
// import { useRouter } from "next/navigation"; // Next.js 13+ app router
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// type Campaign = {
//   id: number;
//   name: string;
//   status: "Active" | "Inactive";
//   activity: number;
//   created_at: string;
// };

// export default function CampaignsPage() {
//   const router = useRouter(); // Initialize router
//   const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
//   const [search, setSearch] = useState("");

//   const { data = [], isLoading, error } = useQuery<Campaign[]>({
//     queryKey: ["campaigns"],
//     queryFn: async () => {
//       const res = await axios.get("http://localhost:3000/api/campaigns");
//       return res.data;
//     },
//   });

//   const filteredData = useMemo(() => {
//     return data
//       .filter((c: Campaign) => {
//         if (filter === "active") return c.status === "Active";
//         if (filter === "inactive") return c.status !== "Active";
//         return true;
//       })
//       .filter((c: Campaign) => c.name.toLowerCase().includes(search.toLowerCase()));
//   }, [data, filter, search]);

//   if (isLoading) return <p className="p-6">Loading campaigns...</p>;
//   if (error) return <p className="p-6 text-red-500">Failed to load campaigns</p>;

//   return (
//     <div className="bg-white dark:bg-gray-900 min-h-screen p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Campaigns</h1>
//           <p className="text-gray-500 dark:text-gray-400 text-sm">
//             Manage your campaigns and track their performance.
//           </p>
//         </div>
//         <Button className="bg-blue-600 text-white hover:bg-blue-700">Create Campaign</Button>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-4">
//         <Button variant={filter === "all" ? "outline" : "ghost"} onClick={() => setFilter("all")}>
//           All Campaigns
//         </Button>
//         <Button variant={filter === "active" ? "outline" : "ghost"} onClick={() => setFilter("active")}>
//           Active
//         </Button>
//         <Button variant={filter === "inactive" ? "outline" : "ghost"} onClick={() => setFilter("inactive")}>
//           Inactive
//         </Button>
//       </div>

//       {/* Search */}
//       <div className="mb-4">
//         <Input
//           placeholder="Search campaigns..."
//           className="w-64"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <Card className="bg-white dark:bg-gray-800 shadow-sm">
//         <CardContent className="p-0">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="text-left border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
//                 <th className="py-4 px-6">Campaign Name</th>
//                 <th className="py-4 px-6">Status</th>
//                 <th className="py-4 px-6">Activity</th>
//                 <th className="py-4 px-6">Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((campaign: Campaign) => (
//                   <tr
//                     key={campaign.id}
//                     className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
//                     onClick={() => router.push(`/campaigns/${campaign.id}`)} // navigate to [id] page
//                   >
//                     <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">{campaign.name}</td>
//                     <td className="py-4 px-6">
//                       <span
//                         className={`px-3 py-1 rounded-lg text-sm font-semibold ${
//                           campaign.status === "Active"
//                             ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200"
//                             : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200"
//                         }`}
//                       >
//                         {campaign.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6 flex items-center space-x-2 text-gray-800 dark:text-gray-200">
//                       <Activity className="h-4 w-4 text-blue-500" />
//                       <span>{campaign.activity}</span>
//                     </td>
//                     <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
//                       {new Date(campaign.created_at).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} className="py-6 text-center text-gray-500">
//                     No campaigns found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
