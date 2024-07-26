'use client'
import { Suspense, useEffect, useState } from "react";
import TrainingForm from "@/components/TrainingForm/trainingForm";
import { CircularProgress } from "@mui/material";

export default function fit() {
    const [dataTrain, setDataTrain] = useState<string[]>([]);
    const [promt, setPromt] = useState('');
    const [loader, setLoader] = useState(false);
    const [dataForm, setDataForm] = useState({
        preference : ''
    });
    // const prompt = 'entrenamiento en el gymnasio para un hombre de 33 años';
    //const response = await fetch('http://localhost:3000/testfit'); 

    useEffect(() => {
        console.log(promt)
        const promptSend = 'entrenamiento en el gymnasio para un hombre de 33 años';
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/fit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: promt }),
            });
            const data = await response.text();
            // const dataArray = data.split('**');
            
            // const dataArray = data.replace(/\**/g, '\n')
            const dataString = data.replace(/\*\*/g, '\n\n');
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
        setPromt(`Create a general guidance workout routine for ${data.days} days a week without adding the rest days to start today with a list of exersises for each day and the muscles targeted for a person with the following characteristics: gender:${data.gender}, date of birth:${data.dob}, height:${data.height}m, weight:${data.weight}kg, favorite place to workout:${data.preference}, objetive:${data.objective}, part of the body objective: ${data.pob}, workout experience:${data.workout}, limitation: ${data.illness ?? 'none'}`);
        console.log('onSubmitForm', data);
    }

    const renderVideo = async (item: string, index: number) => {
        try {
            const videoData : any = await (await fetch(`http://localhost:3000/youtube/search?q=${item} correctly in ${dataForm.preference}`)).json();
            const videoId = videoData.items[0].id.videoId
            // console.log('videoId', videoId)
            if(videoId){
                return ( 
                    <div className="grid-container" key={`itemb-${index}`}  style={{width: '90%'}}>
                        <h3 style={{fontWeight: 'bold'}}>{item}</h3>
                        <div style={{marginBottom: '20px', width: '60%'}}>
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
            console.log('error en el resquest del video', error)
        }
    }

    function containsAllWords(str: string, words: string[]) {
        return words.some(word => str.includes(word));
    }

    // function createGrid (index: number){
    //     if(index % 2 === 0) {
    //        return (<div className="grid-container">) 
    //     }
    // }
    let videosTrainer: any = []

    return (
        
        <div style={{padding:'40px'}}>
        { promt ?  
        (loader ? <div className="circularLoader"><CircularProgress/></div> : <Suspense fallback={<CircularProgress />}>
            {dataTrain.map((item : any, index: number) => {
                // if(item.includes(':') && !item.includes('DayWorkout ScheduleWarm-up Cool-down')){
                //      console.log('exercise ', item);
                //      return renderVideo(item, index)
                // }

                let wordsToCheck = ['Day', 'Workout', 'Warm-up', 'Cool-down', 'Monday', 'Workout', 'Tuesday', 'Wednesday', 'Active Rest', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Important', 'Remember', 'Listen', 'Progress', 'Nutrition', 'minutes', 'Note', 'Optional', 'Consistency', 'Exercises', 'Recovery', 'Objective', 'Consult with a Trainer', 'Adjustments', 'Hydration', 'Target', 'Frequency', 'Duration', 'Equipment', 'Rest', 'form', 'Focus on recovery', 'sleep','Hydrate', 'eat', 'Considerations', 'Management', 'Strength', 'Disease', 'Cooldown', 'Recommendations', 'trainer', 'therapist', 'doctor', 'target', 'exercises', 'set', 'reps', 'weight']

                let exercisesTocheck = ['Bench Press', 'dumbbells', 'Push-ups', 'Raises', 'Pushdowns', 'Grip', 'Crushers', 'Press', 'Extensions', 'Squats', 'Deadlifts', 'Thrusts', 'Bridges', 'Pull-ups', 'Bent', 'Curl', 'Pulls', 'Cable', 'Dumbbell', 'Lunges', 'Bulgarian', 'Incline', 'Bird Dog', 'Plank', "Squats","Lunges","Romanian Deadlifts","Calf Raises","Bench Press","Shoulder Press","Push-ups","Tricep Extensions","Pull-ups","Barbell Rows","Seated Cable Rows","Bicep Curls","Plank","Russian Twists","Crunches", 'Extension', 'Pull-Ups', 'Step-Ups']

                if(item.includes('Day')){
                    return <p style={{fontWeight:'bold', marginTop: '20px'}} key={`item-${index}`}>{item}</p>
                }else if (item.includes(':') && containsAllWords(item, exercisesTocheck)) {
                    console.log('exercise ', item);
                    return renderVideo(item, index)     
                } else {
                    return <p style={{lineHeight: '30px'}} key={`item-${index}`}>{item}</p>
                }
                
            })}
            {/* <p>{dataTrain}</p> */}
        </Suspense>): 
        ( <TrainingForm onSubmitForm={onSubmitForm}></TrainingForm>)} 
        </div>
    );
};