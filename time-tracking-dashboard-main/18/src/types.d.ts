export interface TimeFrame {
    current: number, 
    previous: number
}

export interface Activity {
    title: string,
    timeframes: {
        daily: TimeFrame,
        weekly: TimeFrame,
        monthly: TimeFrame
    }
}

export type Period = "daily" | "weekly" | "monthly";

export interface ActivityConfig {
    icon: string,
    color: string
}

export interface ActivityCardsProps {
    activityData: Activity,
}

export interface TimeTrackingProps {
    activities: Activity[]
}