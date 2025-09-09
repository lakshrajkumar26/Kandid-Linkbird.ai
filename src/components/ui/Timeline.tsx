"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TimelineItem {
  title: string;
  description: string;
}

interface TimelineProps {
  data: TimelineItem[];
}

export default function Timeline({ data }: TimelineProps) {
  return (
    <div className="mt-4 px-4">
      <h2 className="text-lg font-semibold mb-4">Timeline</h2>
      <div className="relative border-l-2 border-gray-200 ml-4">
        {data.map((item, index) => (
          <div key={index} className="mb-6 ml-6 relative">
            {/* Circle */}
            <div className="absolute -left-4 top-0 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>

            {/* Timeline Card */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
