import { createContext, useState } from "react";

export const MainContext = createContext({});

export const MainContextAppProvider = ({ children }: { children: any }) => {
    const [workoutData, setWorkoutData] = useState({
        workout_experience: '',
        preference_place: '',
        objective: '',
        gender: '',
        number_days: 0,
        body_objective: '',
        height: 0,
        weight: 0,
        limitation: '',
        dob: '',
    });

    return (
        <MainContext.Provider value={{ workoutData, setWorkoutData }}>
          {children}
        </MainContext.Provider>
    );
};
