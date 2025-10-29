'use client'
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import TrainingForm from "@/components/TrainingForm/trainingForm";
import {
    Button,
    CircularProgress,
    Box,
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Paper,
    IconButton,
    Collapse
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularLoader from "@/components/CircularLoader/CircularLoader";
import { MainContext } from "../../app/context/MainContextAppProvider";
import { useRouter } from 'next/navigation';

interface Exercise {
    name: string;
    description: string;
}

interface routine {
    day: string;
    targetMuscle: string;
    exercises: Exercise[]
}

interface workoutRoutine {
    inititalRecomendations: string
    routine: routine[]
    lastRecommendations: string;
};

export default function MainComponent({ workoutInfo }: { workoutInfo?: workoutRoutine }) {
    const router = useRouter();
    const contentRefs: any = useRef([]);
    const buttonRefs: any = useRef([]);
    const [dataTrain, setDataTrain] = useState<workoutRoutine | undefined>(workoutInfo);
    const [promt, setPromt] = useState('');
    const [loader, setLoader] = useState(true);
    const [dataForm, setDataForm] = useState({
        preference: '',
        gender: ''
    });
    const { workoutData, setWorkoutData } = useContext<any>(MainContext);
    const mainContainer = useRef();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const exercisesTocheck = ['Hip', 'Deadlifts', 'Clamshells', 'bridge', 'bug', 'superman', 'Bench Press', 'dumbbells', 'Push-ups', 'Raises', 'Pushdowns', 'Grip', 'Crushers', 'Press', 'Extensions', 'Squat', 'Deadlift', 'Thrusts', 'Bridges', 'Pull-ups', 'Bent', 'Curl', 'Pulls', 'Cable', 'Dumbbell', 'Lunges', 'Bulgarian', 'Incline', 'Bird Dog', 'Plank', "Squats", "Lunges", "Romanian Deadlifts", "Calf", "Raises", "Bench Press", "Shoulder Press", "Push-ups", "Tricep Extensions", "Pull-ups", "Barbell Rows", "Seated Cable Rows", "Bicep Curls", "Plank", "Russian Twists", "Crunches", 'Extension', 'Pull-Ups', 'Step-Ups', 'Pulldown', 'T-bar', 'Barbell', 'Burpees']

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

    const handleOnSave = async () => {
        console.log('dataContext', workoutData);
        setLoader(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts/routine`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workoutData),
            });
            const responseSaved = await response.json();
            setLoader(false);
            if (responseSaved.success) {
                router.push('/mylist');
            }
            console.log('Saved', responseSaved);
        } catch (error) {
            setLoader(false);
            console.log('Error guardando rutina', error);
        }
    }

    const fetchData = async () => {
        const response = await fetch(`${apiUrl}/fit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: promt }),
        });

        const data: workoutRoutine = await response.json();
        // const dataArray = data.split('**');
        setDataTrain(data);
        setWorkoutData((prev: any) => {
            return {
                ...prev,
                workout_result: data
            }
        })
        setLoader(false);
    }

    const startDayaccordion = () => {
        contentRefs.current.forEach((ref: any, index: number) => {
            if (ref) {
                ref.style.display = index === 0 ? "block" : "none";
            }
        });

        buttonRefs.current.forEach((ref: any, index: number) => {
            if (ref) {
                ref.style.transform = index === 0 ? "rotate(180deg)" : "rotate(0deg)";
            }
        });
    }

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

            const data: workoutRoutine = await response.json();
            // const dataArray = data.split('**');
            setDataTrain(data);
            setWorkoutData((prev: any) => {
                return {
                    ...prev,
                    workout_result: data
                }
            })
            setLoader(false);
        }

        if (promt) {
            startDayaccordion();
            try {
                setLoader(true);
                fetchData();
            } catch (error) {
                setLoader(false);
            }
        }
    }, [promt]);

    useEffect(() => {
        if (workoutInfo) {
            startDayaccordion();
            setLoader(false);
            setDataTrain(workoutInfo);
        }
    }, [workoutInfo]);

    useEffect(() => {
        if (mainContainer.current) {
            startDayaccordion();
            setTimeout(() => setLoader(false), 2000)
        }
    }, []);

    const onSubmitForm = (data: any) => {
        setDataForm(data);
        // const { ...workoutRoutineData } = data;

        setWorkoutData((prev: any) => {
            return {
                ...prev,
                workout_routine: {
                    ...data
                }
            }
        });
        setPromt(`you are a sport training specialist that works helping people to build their body and reach their objetives in a little time, create a workout routine with a list of exercises organized in a JSON object, The object should have the following keys:
            - "inititalRecomendations": initial recomendations an comments about the workout routine
            - "routine": An array where each item is an object that represents the exercises for each day and has the folloing keys:
                - "day": number of the day, example:  day: "Day 1"
                - "targetMuscle" the muscles target for the day routine.
                - "exercises": an array of objects for each exercise where each objet has the following keys:
                    - "name": name of the exercise
                    - "description" description of the exercise, target muscles and repetitions
            - "lastRecommendations": last recommedations about the routine and stretch
            create a perfect workout routine for the week for aiming the objectives, suitable, focused and personalized as an specialist for a person with the following characteristics: the person can workout ${data.days} days at week and the others days of seven day's week to rest, training Minutes per Day: ${data.hours} Minutes, gender: ${data.gender}, date of birth: ${data.dob}, height: ${data.height}m, weight: ${data.weight}kg, favorite place to workout: ${data.preference}, main objetive: ${data.objective}, part of the body objective: ${data.pob}, workout experience: ${data.workout}. take in account the limitation: ${data.illness || 'none'}`);
        console.log('onSubmitForm', data);
        // try {
        //     setLoader(true);
        //     fetchData();
        // } catch (error) {
        //     setLoader(false);
        // }
    }

    const tittleDescription = (item: Exercise) => {
        return (
            <>
                {/* Gradient Border Effect */}
                <Box sx={{
                    height: 4,
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                }} />
                {/* Exercise Title */}
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 'bold',
                        color: '#2d3748',
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '20px 20px 0 20px',
                    }}
                >
                    {item.name}
                </Typography>

                <Typography
                    variant="h6"
                    component="p"
                    sx={{
                        color: '#2d3748',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '0px 20px 0 20px',
                    }}
                >
                    {item.description}
                </Typography>
            </>
        )
    }

    const renderVideo = async (item: Exercise, index: number) => {
        const cardStyles = {
            mb: 3,
            background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(102, 126, 234, 0.15)',
            }
        }

        try {
            const videoData: any = await (await fetch(`${apiUrl}/youtube/search?q=how to do correctly with good technique the exercise ${item.name} in ${dataForm.preference} for a ${dataForm.gender}`)).json();
            const videoId = videoData?.items[0]?.id.videoId
            if (videoId) {
                return (
                    <Card
                        key={`itemb-${index}`}
                        sx={cardStyles}
                    >
                        {tittleDescription(item)}
                        <CardContent sx={{ p: 3 }}>
                            {/* Video Container */}
                            <Box sx={{
                                position: 'relative',
                                width: '100%',
                                paddingBottom: '56.25%', // 16:9 aspect ratio
                                height: 0,
                                borderRadius: 2,
                                overflow: 'hidden',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                            }}>
                                <Suspense fallback={<CircularLoader text="Video is loading..." />}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </Suspense>
                            </Box>
                        </CardContent>
                    </Card>
                )
            } else {
                return (
                    <Card
                        key={`itemb-${index}`}
                        sx={cardStyles}
                    >
                        {tittleDescription(item)}
                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                                🎥 Video not available for this exercise
                            </Typography>
                        </CardContent>
                    </Card>
                )
            }
        } catch (error) {
            console.log('error resquesting the video', error)
            return (
                <Card
                    key={`itemb-${index}`}
                    sx={cardStyles}
                >
                    {tittleDescription(item)}
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">
                            ⚠️ Error loading video for this exercise
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
    }

    function containsAllWords(str: string, words: string[]) {
        let strL = str.toLowerCase();
        return words.some(word => strL.includes(word.toLowerCase()));
    }

    function handleMyRoutines() {
        router.push('/mylist');
    }

    const toggle = (index: number) => {
        const content: any = contentRefs.current[index];
        const button: any = buttonRefs.current[index];

        // if (!content || !button) return;

        // Toggle using display none/block
        if (content.style.display === "block") {
            button.style.transform = "rotate(180deg)";
            content.style.display = "none";
        } else {
            button.style.transform = "rotate(0deg)";
            content.style.display = "block";
        }
    };


    return (
        <Box ref={mainContainer} sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            py: 2
        }}>
            <Container maxWidth="lg">
                {/* Header with My Routines Button */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mb: 3,
                    pt: 2
                }}>
                    <Button
                        onClick={handleMyRoutines}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 0,
                            borderRadius: 3,
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                            color: 'white',
                            height: 48,
                            padding: '0 24px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            }
                        }}
                    >
                        📋 My Routines
                    </Button>
                </Box>
                {promt || workoutInfo ?
                    (loader ? <CircularLoader text="Generating routine..." /> : <Suspense fallback={<CircularLoader text="Loading..." />}>
                        <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
                            <Typography
                                variant="h6"
                                component="p"
                                sx={{
                                    color: '#2d3748',
                                    mb: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                {dataTrain?.inititalRecomendations}
                            </Typography>
                            {dataTrain?.routine?.map((item: routine, index: number) => {
                                return (
                                    <>
                                        <Box key={`space-${index}`} sx={{ height: 16 }} />
                                        <Paper
                                            key={`day-${index}`}
                                            elevation={0}
                                            // onClick={() => toggle(index)}
                                            sx={{
                                                mb: 4,
                                                mt: index > 0 ? 4 : 2,
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                                                }
                                            }}
                                        >
                                            <Box sx={{
                                                p: 3,
                                                textAlign: 'center',
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }}>
                                                <Typography
                                                    variant="h4"
                                                    component="h2"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'white',
                                                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 2,
                                                        mb: 2,
                                                    }}
                                                >
                                                    📅 {item.day}
                                                </Typography>

                                                <Typography
                                                    variant="h6"
                                                    component="h3"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'rgba(255, 255, 255, 0.95)',
                                                        mb: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1
                                                    }}
                                                >
                                                    🏋️ {item.targetMuscle}
                                                </Typography>

                                                {item.exercises.length > 0 && (<IconButton
                                                    onClick={() => toggle(index)}
                                                    ref={(el: any) => (buttonRefs.current[index] = el)}
                                                    sx={{
                                                        color: 'white',
                                                        transition: 'transform 0.3s ease',
                                                        transform: `${index === 0 ? '' : 'rotate(180deg)'}`,
                                                        mt: 1
                                                    }}
                                                >
                                                    <ExpandMoreIcon />
                                                </IconButton>)}
                                            </Box>
                                        </Paper>
                                        {/* <Collapse in={openAccordions[index]} timeout="auto" unmountOnExit> */}
                                        <div ref={(el: any) => (contentRefs.current[index] = el)} className="w-full" style={{display:`${index === 0 ? 'block' : 'none'}`}}>
                                            {<Box sx={{ mb: 2 }}>
                                                {item.exercises.map((exercise: Exercise) => {
                                                    return (
                                                        renderVideo(exercise, index)
                                                    )
                                                })}
                                            </Box>}
                                        </div>
                                        {/* </Collapse> */}
                                    </>
                                )
                                // if(item.trim() === '*'){
                                //     return <Box key={`space-${index}`} sx={{ height: 16 }} />
                                // }else if(item.includes('Day') || containsAllWords(item, daysOfWeek)){
                                //     return (
                                //         <Paper 
                                //             key={`day-${index}`}
                                //             elevation={0}
                                //             sx={{ 
                                //                 mb: 4,
                                //                 mt: index > 0 ? 4 : 2,
                                //                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                //                 borderRadius: 3,
                                //                 overflow: 'hidden'
                                //             }}
                                //         >
                                //             <Box sx={{ 
                                //                 p: 3,
                                //                 textAlign: 'center',
                                //                 position: 'relative'
                                //             }}>
                                //                 <Typography 
                                //                     variant="h4" 
                                //                     component="h2"
                                //                     sx={{ 
                                //                         fontWeight: 'bold',
                                //                         color: 'white',
                                //                         textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                //                         display: 'flex',
                                //                         alignItems: 'center',
                                //                         justifyContent: 'center',
                                //                         gap: 2
                                //                     }}
                                //                 >
                                //                     📅 {item.trim()}
                                //                 </Typography>
                                //             </Box>
                                //         </Paper>
                                //     )
                                // }else if (item.includes(':') && containsAllWords(item, dataForm.preference === 'IN' ? exercisesTocheck : outdoorExercises)) {
                                //     return renderVideo(item, index);   
                                // }else if(item.trim()) {
                                //     return (
                                //         <Card 
                                //             key={`desc-${index}`}
                                //             sx={{ 
                                //                 mb: 2,
                                //                 background: 'rgba(255, 255, 255, 0.8)',
                                //                 backdropFilter: 'blur(10px)',
                                //                 border: '1px solid rgba(102, 126, 234, 0.1)',
                                //                 borderRadius: 2,
                                //                 boxShadow: '0 2px 10px rgba(102, 126, 234, 0.05)'
                                //             }}
                                //         >
                                //             <CardContent sx={{ py: 2 }}>
                                //                 <Typography 
                                //                     variant="body1" 
                                //                     sx={{ 
                                //                         lineHeight: 1.8,
                                //                         color: '#4a5568',
                                //                         fontSize: '1rem'
                                //                     }}
                                //                 >
                                //                     {item.trim()}
                                //                 </Typography>
                                //             </CardContent>
                                //         </Card>
                                //     )
                                // }
                                // return null;
                            })}
                            <Typography
                                variant="h6"
                                component="p"
                                sx={{
                                    color: '#2d3748',
                                    mb: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                {dataTrain?.lastRecommendations}
                            </Typography>
                        </Box>
                        {!workoutInfo && (<div className="bottomContainerButtons">
                            <button
                                type="button"
                                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl`}
                                onClick={handleOnSave}
                            >
                                Save routine
                            </button>
                        </div>)}
                    </Suspense>) :
                    (loader ? <CircularLoader text="Loading..." /> : <TrainingForm onSubmitForm={onSubmitForm}></TrainingForm>)}
            </Container>
        </Box>
    );
};
