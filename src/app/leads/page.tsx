"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useLeadsStore } from "@/lib/store/leadsStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function LeadsPage() {
  const { selectedLeadId, setSelectedLeadId } = useLeadsStore();

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
    <div className="p-6">
      <Card>
        <CardContent className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="py-2">Name</th>
                <th className="py-2">Campaign</th>
                <th className="py-2">Activity</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedLeadId(lead.id)}
                >
                  <td className="py-2">{lead.name}</td>
                  <td className="py-2">{lead.campaign}</td>
                  <td className="py-2">{lead.activity}</td>
                  <td className="py-2">{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Side Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLeadId(null)}>
        <SheetContent side="right" className="w-[400px]">
          {selectedLead && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedLead.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                <p>{selectedLead.position}</p>
                <p>Company: {selectedLead.company}</p>
                <p>Campaign: {selectedLead.campaign}</p>
                <p>Status: {selectedLead.status}</p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
