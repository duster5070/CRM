import { Row } from "@tanstack/react-table"
import { Project } from "@prisma/client"
import { useEffect, useState } from "react"
import { CalendarDays } from "lucide-react"

type ProjectDeadlineProps = {
  row: Row<Project>
}

export const ProjectDeadline = ({ row }: ProjectDeadlineProps) => {
    const projectData = row.original;
      function calculateDaysDifference(endDate: Date | string): number {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  function formatDaysDifference(days: number): string {
    if (days === 0) {
      return "Deadline is today";
    }

    if (days > 0) {
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;

      if (years > 0 && remainingDays > 0) {
        return `${years} year${years !== 1 ? "s" : ""
          } and ${remainingDays} day${remainingDays !== 1 ? "s" : ""} `;
      } else if (years > 0) {
        return `${years} year${years !== 1 ? "s" : ""} `;
      } else {
        return `${days} day${days !== 1 ? "s" : ""} `;
      }
    }

    if (days < 0) {
      const absDays = Math.abs(days);
      const years = Math.floor(absDays / 365);
      const remainingDays = absDays % 365;

      if (years > 0 && remainingDays > 0) {
        return `${years} year${years !== 1 ? "s" : ""
          } and ${remainingDays} day${remainingDays !== 1 ? "s" : ""
          } `;
      } else if (years > 0) {
        return `${years} year${years !== 1 ? "s" : ""} `;
      } else {
        return `${absDays} day${absDays !== 1 ? "s" : ""} `;
      }
    }

    return "Ongoing";
  }
  const [daysDifference, setDaysDifference] = useState<number | null>(null);
  useEffect(() => {
    if (projectData.endDate) {
      setDaysDifference(calculateDaysDifference(projectData.endDate));
    }
    const intervalId = setInterval(() => {
      if (projectData.endDate) {
        setDaysDifference(calculateDaysDifference(projectData.endDate));
      }
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId); //////////////////////////////////////////////////////////////////////////////////////
  }, [projectData.endDate]);



  const deadline = row.getValue<number>("deadline")

  return (   
              
                  <div
                    className={`text-sm font-medium ${daysDifference !== null && daysDifference < 0
                      ? "text-red-600" // Past deadline - RED
                      : daysDifference === 0
                        ? "text-orange-600" // Today - ORANGE
                        : "text-green-600" // Future - GREEN
                      }`}
                  >
                   
                    {projectData.endDate && daysDifference !== null
                      ? formatDaysDifference(daysDifference)
                      : "Ongoing"}
                  </div>
                
                
             )
}
