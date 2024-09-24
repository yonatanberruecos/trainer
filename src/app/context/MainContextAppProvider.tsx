import { createContext, useState } from "react";

export const MainContext = createContext({});

export const MainContextAppProvider = ({ children }: { children: any }) => {
    const [workoutData, setWorkoutData] = useState({
    user: {
        name: '',
        email: '',
    },
    workout_routine: {
        workout: '',
        preference: '',
        objective: '',
        gender: '',
        days: 0,
        pob: '',
        height: 0,
        weight: 0,
        haveillnes: '',
        dob: '',
    }
});

    return (
        <MainContext.Provider value={{ workoutData, setWorkoutData }}>
          {children}
        </MainContext.Provider>
    );
};
