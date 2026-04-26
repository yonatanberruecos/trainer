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
import { useI18n } from "@/app/context/I18nProvider";
import { IuserData } from "@/components/MainFit/MainFit";

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
    initialRecomendations: string
    routine: routine[]
    lastRecommendations: string;
};

export default function MainComponent({ workoutInfo, userData }: { workoutInfo?: workoutRoutine, userData?: IuserData }) {
    const router = useRouter();
    const contentRefs: any = useRef([]);
    const buttonRefs: any = useRef([]);
    const { locale, t } = useI18n();
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

    const handleOnSave = async () => {
        setLoader(true);
        try {
            if (workoutData?.user?.email) {
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
            } else {
                router.push('/signup?routine_state=save');
            }
        } catch (error) {
            setLoader(false);
            console.log('Error guardando rutina', error);
        }
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
        const fetchData = async () => {
            const response = await fetch(`${apiUrl}/fit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: promt }),
            });

            const responseData: workoutRoutine[] | workoutRoutine = await response.json();
            const data = Array.isArray(responseData) ? responseData[0] : responseData;
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
        setPromt(
            `You are a sports training specialist who works helping people to achieve their goals in the shortest possible time, create a workout routine with a list of exercises organized in a JSON object writed in ${locale === 'en' ? 'English' : 'Spanish'}, The object should have the following keys:
            - "initialRecomendations": initial recomendations and comments about the workout routine
            - "routine": An array where each item is an object that represents the exercises for each day and has the folloing keys:
                - "day": number of the day, example:  day: "Day 1"
                - "targetMuscle" the muscles target for the day routine.
                - "exercises": an array of objects for each exercise where each objet has the following keys:
                    - "name": name of the exercise
                    - "description" description of the exercise, target muscles and repetitions
            - "lastRecommendations": last recommedations about the routine and stretch
            create the perfect training routine for the week to achieve the main goal in the shortest possible time, suitable, focused and personalized as an specialist for a person with the following characteristics: the person can workout ${data.days} days at week and the others days of seven day's week to rest, training Minutes per Day: ${data.hours} Minutes, gender: ${data.gender}, date of birth: ${data.dob}, height: ${data.height}m, weight: ${data.weight}kg, favorite place to practice: ${data.preference === 'IN' ? 'gym' : 'house'}, main goal: ${data.objective === 'LOSS' ? 'weight loss' : data.objective === 'BUILD' ? 'build muscle' : 'gain flexibility'}, target body part: ${data.pob || 'all body'}, workout experience: ${data.workout}. limitation: ${data.illness || 'none'}`
        );
    }

    const tittleDescription = (item: Exercise) => {
        return (
            <>
                {/* Brand accent bar */}
                <Box sx={{
                    height: 3,
                    background: 'linear-gradient(90deg, #00ff87 0%, #00d4ff 100%)'
                }} />
                {/* Exercise Title */}
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 'bold',
                        color: '#f0f0f5',
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
                    variant="body1"
                    component="p"
                    sx={{
                        color: '#c0c0d0',
                        mb: 2,
                        lineHeight: 1.7,
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
            background: '#1a1a26',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(0, 255, 135, 0.12)',
                borderColor: 'rgba(0, 255, 135, 0.2)',
            }
        }

        try {

            const preferenceEnglish = userData?.preference_place === 'OUT' ? 'at home' : 'at the gym';
            // const genderEnglish = userData?.gender === 'FEMALE' ? 'a woman' : 'a man';
            const preferenceSpanish = userData?.preference_place === 'OUT' ? 'en la casa' : 'en el gimnasio';
            // const genderSpanish = userData?.gender === 'FEMALE' ? 'una mujer' : 'un hombre';
            // const spanishPromt = `video de como hacer correctamente con buena técnica el ejercicio llamado ${item.name} ${preferenceSpanish} para ${genderSpanish}`;
            // const englishPromt = `video about how to do correctly with good technique the exercise called ${item.name} ${preferenceEnglish} for a ${genderEnglish}`;
            const spanishPromt = `como hacer el ejercicio ${item.name} ${preferenceSpanish}`;
            const englishPromt = `how to do the exercise ${item.name} ${preferenceEnglish}`;
            const promt = locale === 'es' ? spanishPromt : englishPromt;
            const videoData: any = await (await fetch(`${apiUrl}/youtube/search?q=${promt}`)).json();
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
                                <Suspense fallback={<CircularLoader text={t('routine.loaderVideo')} />}>
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
            background: '#09090f',
            pt: 2,
            paddingBottom: '145px'
        }}>
            <Container maxWidth="lg">
                {/* Header with My Routines Button */}
                {workoutData?.user?.email && (<Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mb: 3,
                    pt: 2
                }}>
                    <Button
                        onClick={handleMyRoutines}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
                            border: 0,
                            borderRadius: 3,
                            boxShadow: '0 4px 20px rgba(0, 255, 135, 0.3)',
                            color: '#09090f',
                            height: 48,
                            padding: '0 24px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #00d4ff 0%, #00ff87 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 30px rgba(0, 255, 135, 0.45)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            }
                        }}
                    >
                        📋 {t('mylist.myRoutines')}
                    </Button>
                </Box>)}
                {promt || workoutInfo ?
                    (loader ? <CircularLoader text={t('routine.loaderGenerating')} /> : <Suspense fallback={<CircularLoader text={t('routine.loaderLoading')} />}>
                        <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
                            {/* Personalized Routine Title */}
                            <Box sx={{ textAlign: 'center', mb: 4, mt: 2 }}>
                                <Typography
                                    variant="h3"
                                    component="h1"
                                    sx={{
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        letterSpacing: '-0.5px',
                                        mb: 1,
                                    }}
                                >
                                    {t('routine.personalizedRoutine')}
                                </Typography>
                                <Box sx={{
                                    width: 60,
                                    height: 3,
                                    background: 'linear-gradient(90deg, #00ff87 0%, #00d4ff 100%)',
                                    borderRadius: 2,
                                    mx: 'auto',
                                    boxShadow: '0 0 12px rgba(0, 255, 135, 0.5)',
                                }} />
                            </Box>

                            {/* Action buttons */}
                            {!workoutInfo && (
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 2,
                                    mb: 4,
                                    flexWrap: 'wrap',
                                }}>
                                    <Button
                                        onClick={handleOnSave}
                                        variant="contained"
                                        sx={{
                                            background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
                                            border: 0,
                                            borderRadius: 3,
                                            boxShadow: '0 4px 20px rgba(0, 255, 135, 0.3)',
                                            color: '#09090f',
                                            height: 48,
                                            padding: '0 24px',
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #00d4ff 0%, #00ff87 100%)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 30px rgba(0, 255, 135, 0.45)',
                                            },
                                            '&:active': { transform: 'translateY(0)' },
                                        }}
                                    >
                                        💾 {t('mylist.saveRoutine')}
                                    </Button>
                                    <Button
                                        onClick={() => window.location.href = '/fit'}
                                        variant="outlined"
                                        sx={{
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.12)',
                                            borderRadius: 3,
                                            color: '#8888a0',
                                            height: 48,
                                            padding: '0 24px',
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'rgba(255,255,255,0.1)',
                                                borderColor: 'rgba(255,255,255,0.2)',
                                                color: '#f0f0f5',
                                                transform: 'translateY(-2px)',
                                            },
                                            '&:active': { transform: 'translateY(0)' },
                                        }}
                                    >
                                        ↺ {t('trainingForm.generateNewRoutine')}
                                    </Button>
                                </Box>
                            )}

                            {/* Initial Recommendations */}
                            <Paper
                                elevation={0}
                                sx={{
                                    mb: 4,
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0, 255, 135, 0.2)',
                                    background: '#111118',
                                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
                                }}
                            >
                                <Box sx={{
                                    px: 3,
                                    py: 1.5,
                                    background: 'linear-gradient(90deg, #00ff87 0%, #00d4ff 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Typography sx={{ fontSize: '1.2rem' }}>📋</Typography>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#09090f',
                                            letterSpacing: '0.5px',
                                            textTransform: 'uppercase',
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        {t('routine.initialRecommendations')}
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#c0c0d0',
                                            lineHeight: 1.85,
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {dataTrain?.initialRecomendations}
                                    </Typography>
                                </Box>
                            </Paper>
                            {dataTrain?.routine?.map((item: routine, index: number) => {
                                return (
                                    <>
                                        <Box key={`space-${index}`} sx={{ height: 16 }} />
                                        <Paper
                                            key={`day-${index}`}
                                            elevation={0}
                                            sx={{
                                                mb: 4,
                                                mt: index > 0 ? 4 : 2,
                                                background: '#111118',
                                                border: '1px solid rgba(0, 255, 135, 0.25)',
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 32px rgba(0, 255, 135, 0.2)',
                                                    borderColor: 'rgba(0, 255, 135, 0.45)',
                                                }
                                            }}
                                        >
                                            {/* Green/cyan top accent bar */}
                                            <Box sx={{ height: 3, background: 'linear-gradient(90deg, #00ff87 0%, #00d4ff 100%)' }} />
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
                                                        background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        backgroundClip: 'text',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 2,
                                                        mb: 1,
                                                    }}
                                                >
                                                    📅 {item.day}
                                                </Typography>

                                                <Typography
                                                    variant="h6"
                                                    component="h3"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: '#c0c0d0',
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
                                                        color: '#00ff87',
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
                                        <div ref={(el: any) => (contentRefs.current[index] = el)} className="w-full" style={{ display: `${index === 0 ? 'block' : 'none'}` }}>
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
                            {/* Last Recommendations */}
                            <Paper
                                elevation={0}
                                sx={{
                                    mt: 2,
                                    mb: 3,
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0, 212, 255, 0.2)',
                                    background: '#111118',
                                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
                                }}
                            >
                                <Box sx={{
                                    px: 3,
                                    py: 1.5,
                                    background: 'linear-gradient(90deg, #00d4ff 0%, #00ff87 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Typography sx={{ fontSize: '1.2rem' }}>💪</Typography>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#09090f',
                                            letterSpacing: '0.5px',
                                            textTransform: 'uppercase',
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        {t('routine.lastRecommendations')}
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#c0c0d0',
                                            lineHeight: 1.85,
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {dataTrain?.lastRecommendations}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                        {!workoutInfo && (<div className="bottomContainerButtons">
                            <button
                                type="button"
                                className="w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                    background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
                                    color: '#09090f',
                                    boxShadow: '0 0 24px rgba(0, 255, 135, 0.35)',
                                }}
                                onClick={handleOnSave}
                            >
                                {t('mylist.saveRoutine')}
                            </button>
                        </div>)}
                    </Suspense>) :
                    (loader ? <CircularLoader text={t('routine.loaderLoading')} /> : <TrainingForm onSubmitForm={onSubmitForm}></TrainingForm>)}
            </Container>
        </Box>
    );
};
