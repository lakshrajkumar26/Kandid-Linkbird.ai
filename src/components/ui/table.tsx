import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useLeadsStore } from "@/lib/store/leadsStore";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function LeadsTabContent({ campaignData }: { campaignData: any }) {
  const { selectedLeadId, setSelectedLeadId } = useLeadsStore();

  const leads = campaignData || []; // campaignData is already leads
  const selectedLead = leads.find((l: any) => l.id === selectedLeadId);

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-lg text-gray-500">
                <th className="py-4 px-4 text-lg">Name</th>
                <th className="py-4 px-4 text-lg">Email</th>
                <th className="py-4 px-4 text-lg">Company</th>
                <th className="py-4 px-4 text-lg text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer border-b border-gray-200"
                  onClick={() => setSelectedLeadId(lead.id)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={"https://github.com/shadcn.png"}
                          alt={lead.name}
                        />
                        <AvatarFallback>
                          {lead.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold">{lead.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{lead.email}</td>
                  <td className="py-4 px-4">{lead.company}</td>
                  <td className="py-4 px-4 text-center">{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Side Sheet for selected lead */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLeadId(null)}>
        <SheetContent side="right" className="min-w-3/10 h-full overflow-y-auto">
          {selectedLead && (
            <>
              <SheetHeader className="pb-0 text-xl">
                <SheetTitle>Lead Profile</SheetTitle>
              </SheetHeader>
              <div className="space-y-2 flex border-2 rounded-lg m-4 p-6 shadow-xl">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={selectedLead.name}
                  />
                  <AvatarFallback>
                    {selectedLead.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h2 className="text-2xl font-semibold">{selectedLead.name}</h2>
                  <p className="font-medium">{selectedLead.email}</p>
                  <p className="font-medium">{selectedLead.company}</p>
                  <p className="text-sm text-gray-500">
                    Last Contacted:{" "}
                    {new Date(selectedLead.lastContacted).toLocaleString()}
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
