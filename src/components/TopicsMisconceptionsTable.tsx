// src/components/TopicsMisconceptionsTable.tsx
import { cn } from "@/lib/utils";

interface Misconception {
  id: string;
  description: string;
  example?: string;
  remediation?: string;
}

interface TopicData {
  level: "beginner" | "intermediate" | "advanced";
  misconceptions: Misconception[];
}

interface TopicsData {
  [topicName: string]: TopicData;
}

interface TopicsMisconceptionsTableProps {
  topics: TopicsData;
  className?: string;
}

export function TopicsMisconceptionsTable({
  topics,
  className,
}: TopicsMisconceptionsTableProps) {
  return (
    <div className={cn("w-full overflow-auto topics-table", className)}>
      <div className="text-xl font-semibold mb-4">Topic Analysis</div>

      <table className="w-full border-collapse">
        <thead className="bg-blue-50">
          <tr>
            <th className="border px-4 py-2 text-left">Topic</th>
            <th className="border px-4 py-2 text-left">
              Common Misconceptions
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(topics).map(([topicName, topicData]) => {
            const misconceptions = topicData.misconceptions;
            return (
              <tr key={topicName} className="border-b hover:bg-gray-50">
                <td className="border px-4 py-3 align-top font-medium">
                  {formatTopicName(topicName)}
                </td>
                <td className="border px-4 py-3">
                  {misconceptions.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-3">
                      {misconceptions.map((misconception) => (
                        <li key={misconception.id} className="pb-2">
                          <div className="font-medium">
                            {misconception.description}
                          </div>
                          {misconception.example && (
                            <div className="text-gray-600 text-sm mt-2 italic">
                              <span className="font-medium">Example: </span>
                              {misconception.example}
                            </div>
                          )}
                          {misconception.remediation && (
                            <div className="text-green-700 text-sm mt-2 bg-green-50 p-2 rounded-md">
                              <span className="font-medium">
                                Support strategy:{" "}
                              </span>
                              {misconception.remediation}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500 italic">
                      No common misconceptions identified
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function formatTopicName(topicName: string): string {
  return topicName
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
