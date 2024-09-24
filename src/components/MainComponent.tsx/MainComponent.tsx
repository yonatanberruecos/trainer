'use client'
import { Suspense, useContext, useEffect, useState } from "react";
import TrainingForm from "@/components/TrainingForm/trainingForm";
import { CircularProgress } from "@mui/material";
import CircularLoader from "@/components/CircularLoader/CircularLoader";
import { MainContext } from "../../app/context/MainContextAppProvider"

export default function MainComponent() {
    const [dataTrain, setDataTrain] = useState<string[]>([]);
    const [promt, setPromt] = useState('');
    const [loader, setLoader] = useState(false);
    const [dataForm, setDataForm] = useState({
        preference : '',
        gender: ''
    });
    const { workoutData, setWorkoutData } = useContext<any>(MainContext); 

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const exercisesTocheck = ['bridge','bug','superman','Bench Press', 'dumbbells', 'Push-ups', 'Raises', 'Pushdowns', 'Grip', 'Crushers', 'Press', 'Extensions', 'Squat', 'Deadlift', 'Thrusts', 'Bridges', 'Pull-ups', 'Bent', 'Curl', 'Pulls', 'Cable', 'Dumbbell', 'Lunges', 'Bulgarian', 'Incline', 'Bird Dog', 'Plank', "Squats","Lunges","Romanian Deadlifts","Calf","Raises","Bench Press","Shoulder Press","Push-ups","Tricep Extensions","Pull-ups","Barbell Rows","Seated Cable Rows","Bicep Curls","Plank","Russian Twists","Crunches", 'Extension', 'Pull-Ups', 'Step-Ups', 'Pulldown', 'T-bar', "Barbell"]

    const outdoorExercises = [
        "Bodyweight",
        "squats",
        "Lunges",
        "Burpees",
        "Push-ups",
        "Crunches",
        "Plank",
        "Mountain",
        "climbers",
        "High",
        "Butt",
        "Jumping",
        "Squat",
        "Lunge",
        "Push-up",
        "jumps",
        "Bicycle",
        "crunches",
        "raises",
        "kicks",
        "Flutter",
        "Russian",
        "twists",
        "plank",
        "Bridge",
        "Superman",
        "Bird",
        "Crab",
        "crawl",
        "Inchworm",
        "sprints",
        "climbs",
        "Pull-ups",
        "Dips",
        "dips",
        "Step-ups",
        "jumps",
        "Pull-ups",
        "Chin-ups",
        "Glute bridges",
        "Pull-ups",
        "Dips",
        "Bulgarian",
        "Deadlifts",
        "Hip",
        "Clamshell",
        "Fire hydrant",
        "Bent-over",
        "Overhead",
        "Curls"
      ];

      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

    useEffect(() => {
        console.log(promt)
        const fetchData = async () => {
            const response = await fetch(`${apiUrl}/fit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: promt }),
            });

            const data = await response.text();
            const dataArray = data.split('**');
            setDataTrain(dataArray);
            setLoader(false);
        }

        if(promt){
            try {
                setLoader(true);
                fetchData();
            } catch (error) {
                setLoader(false);
            }
        }
    }, [promt]);

    const onSubmitForm = (data: any) => {
        setDataForm(data);
        const { name, email, ...workoutRoutineData } = data;

        setWorkoutData({
            user: {
                name : name,
                email : email
            },
            workout_routine : {
                ...workoutRoutineData
            }
        });
        setPromt(`Generate a general guidance workout routine for ${data.days} days of training and ${7 - data.days} days to rest and recovery a week with a list day by day of specific exercises and their definition and the muscles targeted, all exercise's names listed with colon below the day. create the routine suitable specificaly to a person with the following characteristics:gender:${data.gender}, date of birth:${data.dob}, height:${data.height}m, weight:${data.weight}kg, favorite place to workout:${data.preference}, objetive:${data.objective}, part of the body objective: ${data.pob}, workout experience:${data.workout}. take in account the limitation: ${data.illness ?? 'none'}`);
        console.log('onSubmitForm', data);
    }

    const renderVideo = async (item: string, index: number) => {
        try {
            const videoData : any = await (await fetch(`${apiUrl}/youtube/search?q=how to do correctly ${item} in ${dataForm.preference} for a ${dataForm.gender}`)).json();
            const videoId = videoData.items[0].id.videoId
            if(videoId){
                return ( 
                    <div className="grid-container" key={`itemb-${index}`}>
                        <h3 style={{fontWeight: 'bold', width: '200px'}}>{item}</h3>
                        <div className="video-container">
                            <iframe 
                            width="100%" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${videoId}`}
                            // src="https://www.youtube.com/embed/QGTq58winhQ?si=GgnJdMXc86U0TQBO" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            style={{margin: '0 auto', borderRadius:'3%'}}
                            ></iframe>
                        </div>
                    </div>)
            }else {
                 return <p key={`itemb-${index}`}>video</p>
            }
        } catch (error) {
            console.log('error resquesting the video', error)
        }
    }

    function containsAllWords(str: string, words: string[]) {
        let strL = str.toLowerCase(); 
        return words.some(word => strL.includes(word.toLowerCase()));
    }

    return (
        <div style={{padding:'40px'}}>
        { promt ?  
        (loader ? <CircularLoader text="Gemini AI is loading..."/> : <Suspense fallback={<CircularLoader text="Gemini AI is loading..."/>}>
            {dataTrain.map((item : any, index: number) => {
                // console.log('dataContext', workoutData);
                // let wordsToCheck = ['Day', 'Workout', 'Warm-up', 'Cool-down', 'Monday', 'Workout', 'Tuesday', 'Wednesday', 'Active Rest', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Important', 'Remember', 'Listen', 'Progress', 'Nutrition', 'minutes', 'Note', 'Optional', 'Consistency', 'Exercises', 'Recovery', 'Objective', 'Consult with a Trainer', 'Adjustments', 'Hydration', 'Target', 'Frequency', 'Duration', 'Equipment', 'Rest', 'form', 'Focus on recovery', 'sleep','Hydrate', 'eat', 'Considerations', 'Management', 'Strength', 'Disease', 'Cooldown', 'Recommendations', 'trainer', 'therapist', 'doctor', 'target', 'exercises', 'set', 'reps', 'weight']
                if(item.trim() === '*'){
                    return '\n\n'
                }else if(item.includes('Day') || containsAllWords(item, daysOfWeek)){
                    return <p style={{fontWeight:'bold', marginTop: '20px'}} key={`item-${index}`}>{item}</p>
                }else if (item.includes(':') && containsAllWords(item, dataForm.preference === 'Gym' ? exercisesTocheck : outdoorExercises)) {
                    return renderVideo(item, index);   
                }else {
                    return <p style={{lineHeight: '30px'}} key={`item-${index}`}>{item}</p>
                }
                
            })}
        </Suspense>): 
        ( <TrainingForm onSubmitForm={onSubmitForm}></TrainingForm>)} 
        </div>
    );
};
