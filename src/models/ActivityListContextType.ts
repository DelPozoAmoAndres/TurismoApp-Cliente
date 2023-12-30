import { Activity } from "./Activity";

// Define the type for the context state
export interface ActivityListContextType {
    activities: Activity[];
    sort: number;
    addActivities: (activities: Activity[]) => void;
    removeActivity: (id: string) => void;
    updateActivities: (activities: Activity[]) => void;
    setSort: (sort: number) => void;
}