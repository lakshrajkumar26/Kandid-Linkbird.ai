"use client";


import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, } from "react";
import { useQuery } from "@tanstack/react-query";
// import { Card, CardContent } from "@/components/ui/card";
import { useLeadsStore } from "@/lib/store/leadsStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import {
  Ban,
  Clock,
  Send,
  UserRoundPlus,
  ChevronDown,
  Megaphone,
} from "lucide-react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Timeline from "@/components/ui/Timeline";

// type Lead = {
//   id: number;
//   name: string;
//   email: string;
//   company: string;
//   status: string;
//   last_contacted: string;
//   campaignId: number;
//   campaignName: string;
//   campaignStatus: string;
//   activity: number;
// };

// type LeadsResponse = {
//   leads: Lead[];
//   hasMore: boolean;
// };

// "use client";


// export default function LeadsPage() {
//   const { selectedLeadId, setSelectedLeadId } = useLeadsStore();
//   const [isShow, setIsShow] = useState(false);

//   const observerRef = useRef<HTMLDivElement>(null);

//  const {
//   data,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
// } = useInfiniteQuery<LeadsResponse, Error>({
//   queryKey: ["leads"],
//   queryFn: async ({ pageParam = 1 }) => {
//     const res = await fetch(`/api/leads?page=${pageParam}&limit=10`);
//     if (!res.ok) throw new Error("Failed to fetch leads");
//     return res.json();
//   },
//   getNextPageParam: (lastPage) => {
//     return lastPage.hasMore ? lastPage.leads.length / 10 + 1 : undefined;
//   },
// });


//   const leads = data?.pages.flatMap((page) => page.lead) || [];
//   const selectedLead = leads.find((l: any) => l.id === selectedLeadId);

//   // Infinite scroll observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasNextPage) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1 }
//     );
//     if (observerRef.current) observer.observe(observerRef.current);
//     return () => {
//       if (observerRef.current) observer.unobserve(observerRef.current);
//     };
//   }, [fetchNextPage, hasNextPage]);

//   return (
//     <div>
//       <Card>
//         <CardContent className="p-4">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-lg text-gray-500">
//                 <th className="py-8 px-4 text-lg">Name</th>
//                 <th className="py-8 px-4 text-lg">Campaign Name</th>
//                 <th className="py-8 px-4 text-lg">Activity</th>
//                 <th className="py-8 px-4 text-lg text-center">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads.map((lead: any) => (
//                 <tr
//                   key={lead.id}
//                   className="hover:bg-gray-50 cursor-pointer border-b border-gray-200"
//                   onClick={() => setSelectedLeadId(lead.id)}
//                 >
//                   <td className="py-4 px-4">
//                     <div className="flex items-center space-x-3">
//                       <Avatar className="h-12 w-12">
//                         <AvatarImage
//                           src={lead.photo || "https://github.com/shadcn.png"}
//                           alt="@username"
//                         />
//                         <AvatarFallback>LR</AvatarFallback>
//                       </Avatar>
//                       <span className="font-bold">{lead.name}</span>
//                     </div>
//                   </td>
//                   <td className="py-8 px-4">{lead.campaignName}</td>
//                   <td className="py-8 px-4">
//                     <div className="space-x-1 flex items-center">
//                       {[1, 2, 3, 4].map((bar) => (
//                         <div
//                           key={bar}
//                           className={`w-1 h-6 rounded-sm ${
//                             bar <= lead.activity
//                               ? ["bg-orange-400", "bg-red-600", "bg-blue-600", "bg-purple-600"][lead.activity - 1]
//                               : "bg-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </td>
//                   <td className="py-8 px-4 text-center">{lead.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {/* Observer div for infinite scroll */}
//           <div ref={observerRef} className="h-10" />
//           {isFetchingNextPage && <p className="text-center py-2">Loading more...</p>}
//         </CardContent>
//       </Card>

//       {/* Side Sheet */}
//       <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLeadId(null)}>
//         <SheetContent side="right" className="min-w-3/10 h-full overflow-y-auto">
//           {selectedLead && (
//             <>
//               <SheetHeader className="pb-0 text-xl">
//                 <SheetTitle>Lead Profile</SheetTitle>
//               </SheetHeader>
//               <div className="space-y-2 flex border-2 rounded-lg m-4 p-6 shadow-xl">
//                 {/* Profile info etc. */}
//               </div>
//             </>
//           )}
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }


















export default function LeadsPage() {
  const { selectedLeadId, setSelectedLeadId } = useLeadsStore();
  const [isShow, setIsShow] = useState(false);

  const timelineData = [
    {
      title: "Invitation Request",
      description: "Hi Surdeep, I'm building consultancy...",
    },
    { title: "Connection Status", description: "Check connection status" },
    {
      title: "Connection Acceptance Message",
      description: "Awesome to connect, Surdeep! Allow me...",
    },
    {
      title: "Follow-up 1",
      description: "Hey, did you get a chance to go through...",
    },
    {
      title: "Follow-up 2",
      description: "Hi Surdeep, just following up on my...",
    },
  ];
  // Fetch leads
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error("Failed to fetch leads");
      return res.json();
    },
  });

  const selectedLead = leads.find((l: any) => l.id === selectedLeadId);

  if (isLoading) return <p className="p-6">Loading leads...</p>;

  return (
    <div className="">
      <Card>
        <CardContent className="p-4 ">
          <table className="w-full">
            <thead>
              <tr className="text-left text-lg text-gray-500">
                <th className="py-8 px-4 text-lg">Name</th>
                <th className="py-8 px-4 text-lg">Campaign Name</th>
                <th className="py-8 px-4 text-lg">Activity</th>
                <th className="py-8 px-4 text-lg text-center ">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer border-b  border-gray-200"
                  onClick={() => setSelectedLeadId(lead.id)}
                >
                  {/* Avatar + Name in same td */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={lead.photo ? "" : "https://github.com/shadcn.png" }
                          alt="@username"
                          //check for photo and  change here <----
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      <span className="font-bold">{lead.name}</span>
                      
                    </div>
                    
                  </td>

                  <td className="py-8 px-4 ">{lead.campaignName}</td>
                  <td className="py-8 px-4">
                    <div className=" space-x-1 flex items-center">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`w-1 h-6 rounded-sm  ${
                            bar <= lead.activity
                              ? lead.activity === 1
                                ? "bg-orange-400"
                                : lead.activity === 2
                                ? "bg-red-600"
                                : lead.activity === 3
                                ? "bg-blue-600"
                                : "bg-purple-600"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </td>

                  <td className="py-8 px-4 text-center">
                    {lead.status === "Pending Approval" ? (
                      <div className="bg-purple-200 inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                        <Clock className="text-purple-600" />
                        <span className="text-purple-600 font-bold">
                          Pending Approval
                        </span>
                      </div>
                    ) : lead.status === "Do Not Contact" ? (
                      <div className="bg-gray-200 inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                        <Ban className="text-gray-950" />
                        <span className="text-gray-600 font-bold">
                          Do Not Contact
                        </span>
                      </div>
                    ) : lead.status === "Sent 7 mins ago" ? (
                      <div className="bg-orange-300 inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                        <UserRoundPlus className="text-orange-700 " />
                        <span className="text-orange-700 font-bold">
                          {lead.status}
                        </span>
                      </div>
                    ) : lead.status === "Followup 10 mins ago" ? (
                      <div className="bg-blue-200 inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                        <Send className="text-blue-600" />
                        <span className="text-blue-700 font-bold">
                          {lead.status}
                        </span>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Side Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLeadId(null)}>
        <SheetContent
          side="right"
          className="min-w-3/10 h-full overflow-y-auto"
        >
          {selectedLead && (
            <>
              <SheetHeader className=" pb-0 text-xl">
                <SheetTitle>Lead Profile</SheetTitle>
              </SheetHeader>
              <div className="space-y-2 flex border-2  rounded-lg  m-4 p-6 shadow-xl ">
                <div className=" flex flex-col items-center pt-5 w-full">
                  <Avatar className="h-20 w-20">
                    {/* Profile picture */}
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@username"
                    />

                    {/* Fallback (when no image) */}
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                </div>

                {/* 2 button container */}
                <div className="pl-5 m-2">
                  <h2 className="text-2xl font-semibold">
                    {selectedLead.name}
                  </h2>
                  <p className="font-medium">
                    {selectedLead.position || "Employee"}
                  </p>

                  <div className="flex items-center space-x-4 my-2">
                    <Button className="bg-white text-gray-700 border hover:text-white hover:bg-black">
                      <Megaphone /> {selectedLead.company}
                    </Button>

                    <span>
                      {selectedLead.status === "Pending Approval" ? (
                        <div className="bg-purple-200 inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                          <Clock className="text-purple-600" />
                          <span className="text-purple-600 font-bold">
                            Pending Approval
                          </span>
                        </div>
                      ) : selectedLead.status === "Do Not Contact" ? (
                        <div className="bg-gray-200 inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                          <Ban className="text-gray-950" />
                          <span className="text-gray-600 font-bold">
                            Do Not Contact
                          </span>
                        </div>
                      ) : selectedLead.status === "Sent 7 mins ago" ? (
                        <div className="bg-orange-300 inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                          <UserRoundPlus className="text-orange-700" />
                          <span className="text-orange-700 font-bold">
                            {selectedLead.status}
                          </span>
                        </div>
                      ) : selectedLead.status === "Followup 10 mins ago" ? (
                        <div className="bg-blue-200 inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                          <Send className="text-blue-600" />
                          <span className="text-blue-700 font-bold">
                            {selectedLead.status}
                          </span>
                        </div>
                      ) : null}
                    </span>
                  </div>

                  <div className=" ml-auto mt-2 inline-block ">
                    <Button
                      onClick={() => setIsShow(!isShow)}
                      className=" bg-white text-black hover:bg-black hover:text-white"
                    >
                      Additional Profile Info <ChevronDown className=" ml-45" />{" "}
                    </Button>
                    {isShow && (
                      <div className="flex pt-5">
                        <div className=" flex justify-center items-center">
                          <Avatar className="h-12 w-12">
                            {/* Profile picture */}
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@username"
                            />

                            {/* Fallback (when no image) */}
                            <AvatarFallback>LR</AvatarFallback>
                          </Avatar>
                          {/* right */}
                          <div>
                            <h2 className="text-md mx-2 font-semibold">
                              {selectedLead.name}
                            </h2>
                            <h2 className="text-md mx-2 ">
                              {selectedLead.email}
                            </h2>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {selectedLead && (
                <>
                  {/* Timeline */}
                  <Timeline data={timelineData} />
                </>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}






