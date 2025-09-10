"use client";

// import { useState, useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Activity } from "lucide-react";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { useRouter } from "next/navigation";
// import CampaignDetailsPage from "./[id]/page";


// // Define campaign type
// type Campaign = {
//   id: number;
//   name: string;
//   status: "Active" | "Inactive";
//   activity: number;
//   created_at: string; // or Date if backend returns ISO string
// };

// export default function CampaignsPage() {
//   const router = useRouter();
//   const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
//   const [search, setSearch] = useState("");
//   const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);

//   // Fetch campaigns from backend
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

//   const selectedCampaign = filteredData.find(c => c.id === selectedCampaignId);

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
//                     // onClick={() => setSelectedCampaignId(campaign.id)}
//                      onClick={() => router.push(`/campaigns/${campaign.id}`)}
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
//       {selectedCampaignId && <CampaignDetailsPage/>}  
//       {/* remove this for direct show */}
//     </div>
//   );
// }



//IGNORE 


{/* Sheet if needed  */}
      {/* Sheet for Campaign Details */}
      {/* <Sheet open={!!selectedCampaign} onOpenChange={() => setSelectedCampaignId(null)}>
        <SheetContent side="right" className="min-w-3/10 h-full overflow-y-auto">
          {selectedCampaign && (
            <>
              <SheetHeader className="pb-0 text-xl">
                <SheetTitle>Campaign Details</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 m-4 p-6 border rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold">{selectedCampaign.name}</h2>
                <p>
                  <strong>Status:</strong> {selectedCampaign.status}
                </p>
                <p>
                  <strong>Activity:</strong> {selectedCampaign.activity}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedCampaign.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet> */}
// -------------------------------NEW 





// import { useState, useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Activity, ChevronLeft } from "lucide-react";
// import CampaignDetailsPage from "./[id]/page";

// // Define campaign type
// type Campaign = {
//   id: number;
//   name: string;
//   status: "Active" | "Inactive";
//   activity: number;
//   created_at: string;
// };

// export default function CampaignsPage() {
//   const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
//   const [search, setSearch] = useState("");
//   const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);

//   // Fetch campaigns from backend
//   const { data = [], isLoading, error } = useQuery<Campaign[]>({
//     queryKey: ["campaigns"],
//     queryFn: async () => {
//       const res = await axios.get("http://localhost:3000/api/campaigns");
//       return res.data;
//     },
//   });

//   const filteredData = useMemo(() => {
//     return data
//       .filter(c => {
//         if (filter === "active") return c.status === "Active";
//         if (filter === "inactive") return c.status !== "Active";
//         return true;
//       })
//       .filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
//   }, [data, filter, search]);

//   const selectedCampaign = filteredData.find(c => c.id === selectedCampaignId);

//   if (isLoading) return <p className="p-6">Loading campaigns...</p>;
//   if (error) return <p className="p-6 text-red-500">Failed to load campaigns</p>;





//   // If a campaign is selected, show details
//   if (selectedCampaign) {
//     return (
//       <div className="bg-white dark:bg-gray-900 min-h-screen mt-0 p-0">
//          {/* FOR GOING BACK */}
//         <Button
//           variant="ghost"
//           className="mb-4"
//           onClick={() => setSelectedCampaignId(null)}
//         >
          
//           <ChevronLeft className="inline mr-2" /> Back to Campaigns

//         </Button>


//         <Card className="bg-white dark:bg-gray-800 shadow-sm">
//           {/* <CardContent className="p-6">
//             <h1 className="text-2xl font-bold mb-4">{selectedCampaign.name}</h1>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={`px-2 py-1 rounded-lg font-semibold ${
//                   selectedCampaign.status === "Active"
//                     ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200"
//                     : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200"
//                 }`}
//               >
//                 {selectedCampaign.status}
//               </span>
//             </p>
//             <p className="mt-2">
//               <strong>Activity:</strong> {selectedCampaign.activity}
//             </p>
//             <p className="mt-2">
//               <strong>Created At:</strong>{" "}
//               {new Date(selectedCampaign.created_at).toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               })}
//             </p>
//           </CardContent> */}
//         <CampaignDetailsPage/>
//         </Card>
//       </div>
//     );
//   }

//   // Otherwise show the list
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
//                 filteredData.map(campaign => (
//                   <tr
//                     key={campaign.id}
//                     className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
//                     onClick={() => setSelectedCampaignId(campaign.id)}
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


import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity } from "lucide-react";
import { useRouter } from "next/navigation";

// Define campaign type
type Campaign = {
  id: number;
  name: string;
  status: "Active" | "Inactive";
  activity: number;
  created_at: string;
};

export default function CampaignsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [search, setSearch] = useState("");

  // Fetch campaigns from backend
  const { data = [], isLoading, error } = useQuery<Campaign[]>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/campaigns");
      return res.data;
    },
  });

  const filteredData = useMemo(() => {
    return data
      .filter(c => {
        if (filter === "active") return c.status === "Active";
        if (filter === "inactive") return c.status !== "Active";
        return true;
      })
      .filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [data, filter, search]);

  if (isLoading) return <p className="p-6">Loading campaigns...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load campaigns</p>;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Campaigns</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage your campaigns and track their performance.
          </p>
        </div>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">Create Campaign</Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <Button
          variant={filter === "all" ? "outline" : "ghost"}
          onClick={() => setFilter("all")}
        >
          All Campaigns
        </Button>
        <Button
          variant={filter === "active" ? "outline" : "ghost"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "inactive" ? "outline" : "ghost"}
          onClick={() => setFilter("inactive")}
        >
          Inactive
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search campaigns..."
          className="w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardContent className="p-0">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <th className="py-4 px-6">Campaign Name</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Activity</th>
                <th className="py-4 px-6">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(campaign => (
                  <tr
                    key={campaign.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => router.push(`/campaigns/${campaign.id}`)} // ✅ Route-based navigation
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">
                      {campaign.name}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          campaign.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span>{campaign.activity}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                      {new Date(campaign.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No campaigns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
