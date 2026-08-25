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
    Collapse,
    Chip
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularLoader from "@/components/CircularLoader/CircularLoader";
import { MainContext } from "../../app/context/MainContextAppProvider";
import { useRouter } from 'next/navigation';
import { useI18n } from "@/app/context/I18nProvider";
import { IuserData } from "@/components/MainFit/MainFit";
import { getObjectiveTranslationKey } from "../../../lib/objective";

interface Exercise {
    name: string;
    description: string;
    searchQuery: string;
    targetMuscles?: string[];
    sets?: number;
    reps?: string;
    restSeconds?: number;
}

interface routine {
    day: string;
    /** Legacy shape (saved routines): a single muscle string */
    targetMuscle?: string;
    /** Current shape: a list of target muscles */
    targetMuscles?: string[];
    exercises: Exercise[]
}

interface workoutRoutine {
    initialRecommendations: string
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
    const [videoIds, setVideoIds] = useState<Record<string, string | null>>({});
    const [loadingDays, setLoadingDays] = useState<Set<number>>(new Set());
    const loadedDays = useRef<Set<number>>(new Set());
    const fetchingDays = useRef<Set<number>>(new Set());
    const { workoutData, setWorkoutData } = useContext<any>(MainContext);
    const mainContainer = useRef();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL


    const promptBuild = (data: any) => `You are an expert strength and conditioning coach specializing in safe, evidence-informed, individualized exercise programming.

Your task is to generate an effective, progressive, realistic, and personalized weekly workout program based exclusively on the information provided by the user.

The program should prioritize:

1. The user's primary goal.
2. The user's experience level.
3. The number of available training days.
4. Available training time.
5. Training location.
6. Target body areas.
7. Adequate recovery between sessions.
8. Safe exercise selection.
9. Sustainable progression.

## LANGUAGE

Return all user-facing content in:

${locale === 'en' ? 'English' : 'Spanish'}

## USER INFORMATION

* Training days per week: ${data.days}
* Training minutes per session: ${data.hours}
* Gender: ${data.gender}
* Age: ${data.age}
* Height: ${data.height} m
* Weight: ${data.weight} kg
* Training location: ${data.preference === 'IN' ? 'Gym' : 'Home'}
* Main goal: ${data.objective === 'LOSS'
            ? 'Fat loss / weight management'
            : data.objective === 'BUILD'
                ? 'Muscle hypertrophy / muscle gain'
                : 'Improve mobility and flexibility'
        }
* Target body area: ${data.pob || 'arms, legs, back, chest'}
* Training experience: ${data.workout}
* Physical limitations or relevant conditions reported by the user: ${data.illness || 'None reported'}

## PROGRAMMING RULES

Create exactly ${data.days} training sessions.

The remaining days of the seven-day week are rest or active recovery days, add those to the routine with the target muscles "Rest day" or "Recovery day".

Choose the training split that best fits the number of available days, experience level, goal, and target muscles.

### Session duration

Design each session so that it can realistically be completed within approximately ${data.hours} minutes.

Do not create an unrealistic number of exercises for the available time.

### Exercise selection

For home training, prefer exercises using bodyweight or commonly available home equipment unless equipment information has explicitly been provided.

For gym training, standard commercial gym equipment may be used.

Avoid unnecessary exercise complexity.

Beginners should receive exercises that are relatively simple to learn and control.

More experienced users may receive moderately more complex movements when appropriate.

### Training volume

Select a reasonable number of exercises, sets, and repetitions according to the user's goal and experience.

Provide adequate recovery before heavily training the same muscle groups again.

### Goal-specific programming

If the ${data.objective} is MUSCLE GAIN:

* prioritize progressive resistance training
* emphasize major movement patterns
* use an appropriate hypertrophy repetition range
* include sufficient weekly volume without excessive fatigue
* prioritize the requested body area when appropriate while maintaining overall muscular balance

If the ${data.objective}  is FAT LOSS / WEIGHT MANAGEMENT:

* maintain resistance training as the foundation
* use compound and accessory movements
* optionally include reasonable cardiovascular or conditioning work
* do not prescribe extreme exercise volume
* explain that nutrition and total energy balance are important contributors to fat loss

If the ${data.objective}  is FLEXIBILITY / MOBILITY:

* prioritize controlled mobility and flexibility exercises
* include appropriate active and static mobility work
* avoid turning the program into a hypertrophy routine unless resistance training supports the user's goal

### Progression

Provide a simple progression strategy.

### Intensity

For resistance exercises provide either RIR or RPE guidance.

Prefer RIR.

### Limitations and safety

If the user reports an injury, medical condition, pain, or physical limitation:

* avoid exercises that clearly conflict with the reported limitation
* do not diagnose the condition
* do not claim that exercise will treat or cure it
* provide conservative recommendations
* recommend professional medical or physiotherapy evaluation when the limitation may materially affect safe training

If the available information is insufficient to safely personalize around a serious limitation, reflect that uncertainty in the recommendations.

## YOUTUBE VIDEO SEARCH

Every exercise must include a 'searchQuery'.

The 'searchQuery' is NOT user-facing.

It must be a short, conventional exercise name optimized for finding a technically correct demonstration using the YouTube API.

Examples:

Display name:
"Press de banca con barra"

searchQuery:
"barbell bench press"

Display name:
"Sentadilla goblet"

searchQuery:
"goblet squat"

Do not include:

* sets
* repetitions
* motivational text
* the user's goal
* unnecessary adjectives

in 'searchQuery'.

Prefer internationally recognized English exercise terminology for 'searchQuery' even when the interface language is Spanish, because it generally provides more reliable search results.

## RESPONSE FORMAT

Return ONLY valid JSON.

Do not return Markdown.

Do not use code fences.

Do not add text before or after the JSON.

The JSON must follow this structure:

{
"initialRecommendations": [
"string"
],
"weeklyPlan": {
"trainingDays": number,
"split": "string",
"estimatedSessionMinutes": number
},
"routine": [
{
"day": "Day 1",
"targetMuscles": [
"string"
],
"estimatedDurationMinutes": number,
"warmup": [
{
"name": "string",
"duration": "string"
}
],
"exercises": [
{
"name": "string",
"searchQuery": "string",
"targetMuscles": [
"string"
],
"sets": number,
"reps": "string",
"restSeconds": number,
"rir": "string",
"description": "string",
"techniqueTips": [
"string"
]
}
],
"optionalCardio": {
"enabled": boolean,
"type": "string",
"durationMinutes": number,
"intensity": "string"
}
}
],
"progression": {
"strategy": "string",
"whenToIncreaseLoad": "string"
},
"lastRecommendations": [
"string"
],
"safetyNote": "string"
}

## FINAL VALIDATION

Before returning the JSON, internally verify that:

* The number of training days equals ${data.days}.
* Each workout fits approximately within ${data.hours} minutes.
* Exercises match the training location.
* The program matches the user's experience level.
* The routine prioritizes the main goal.
* The requested body area receives appropriate emphasis.
* There is adequate recovery between similar muscle groups.
* Sets and repetitions are realistic.
* Every exercise contains a valid 'searchQuery'.
* No exercise clearly conflicts with a reported limitation.
* The result contains valid JSON only.
`;

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
            setWorkoutData((prev: any) => {
                return {
                    ...prev,
                    workout_routine: {
                        ...prev.workout_routine,
                        preference: userData?.preference_place,
                    }
                }
            });
        }
    }, [workoutInfo]);

    useEffect(() => {
        if (mainContainer.current) {
            startDayaccordion();
            setTimeout(() => setLoader(false), 2000)
        }
    }, []);

    const fetchDayVideos = async (dayIndex: number) => {
        if (loadedDays.current.has(dayIndex) || fetchingDays.current.has(dayIndex)) return;
        if (!dataTrain?.routine?.[dayIndex]) return;

        fetchingDays.current.add(dayIndex);
        setLoadingDays(prev => new Set(prev).add(dayIndex));
        const day = dataTrain.routine[dayIndex];

        for (let i = 0; i < day.exercises.length; i++) {
            const exercise = day.exercises[i];
            if (i > 0) await new Promise(resolve => setTimeout(resolve, 1000));
            const key = `${dayIndex}-${i}`;
            try {
                const preferenceEnglish = workoutData?.workout_routine?.preference === 'OUT' ? 'at home' : 'at the gym';
                const preferenceSpanish = workoutData?.workout_routine?.preference === 'OUT' ? 'en la casa' : 'en el gimnasio';
                const searchQuery = locale === 'es'
                    ? `como hacer el ejercicio ${exercise.searchQuery} ${preferenceSpanish}`
                    : `how to do the exercise ${exercise.searchQuery} ${preferenceEnglish}`;
                const videoData: any = await (await fetch(`${apiUrl}/youtube/search?q=${searchQuery}`)).json();
                const videoId: string | null = videoData?.items?.[0]?.id?.videoId ?? null;
                setVideoIds(prev => ({ ...prev, [key]: videoId }));
            } catch {
                setVideoIds(prev => ({ ...prev, [key]: null }));
            }
        }

        loadedDays.current.add(dayIndex);
        fetchingDays.current.delete(dayIndex);
        setLoadingDays(prev => { const s = new Set(prev); s.delete(dayIndex); return s; });
    };

    useEffect(() => {
        if (!dataTrain?.routine) return;
        loadedDays.current = new Set();
        fetchingDays.current = new Set();
        setVideoIds({});
        setLoadingDays(new Set());
        fetchDayVideos(0);
    }, [dataTrain]);

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
        // setPromt(
        //     `as an sports training expert who works helping people to achieve their goals in the shortest possible time, create a workout routine with a list of exercises organized in a JSON object writed in ${locale === 'en' ? 'English' : 'Spanish'}. Simplify the name of the exercises to be able to search the videos on youtube, The object should have the following keys:
        //     - "initialRecomendations": initial recomendations and comments about the workout routine
        //     - "routine": An array where each item is an object that represents the exercises for each day and has the folloing keys:
        //         - "day": number of the day, example:  day: "Day 1"
        //         - "targetMuscle" the muscles target for the day routine.
        //         - "exercises": an array of objects for each exercise where each objet has the following keys:
        //             - "name": name of the exercise
        //             - "description" description of the exercise, target muscles and repetitions
        //     - "lastRecommendations": last recommedations about the routine and stretch
        //     create the perfect training routine for the week to achieve the main goal in the shortest possible time, suitable, focused and personalized as an specialist for a person with the following characteristics: the person can workout ${data.days} days at week and the others days of seven day's week to rest, training Minutes per Day: ${data.hours} Minutes, gender: ${data.gender}, date of birth: ${data.dob}, height: ${data.height}m, weight: ${data.weight}kg, favorite place to practice: ${data.preference === 'IN' ? 'gym' : 'house'}, main goal: ${data.objective === 'LOSS' ? 'weight loss' : data.objective === 'BUILD' ? 'build muscle' : 'gain flexibility'}, target body part: ${data.pob || 'all body'}, workout experience: ${data.workout}. limitation: ${data.illness || 'none'}`
        // );
        setPromt(promptBuild(data));
    }

    // Main objective of the routine (saved routine, or the one just generated from the form)
    const objective = userData?.objective || workoutData?.workout_routine?.objective;

    const getObjectiveLabel = (value: string) => {
        const key = getObjectiveTranslationKey(value);
        return key ? t(key) : value;
    };

    // Normalizes to a list: supports the current `targetMuscles` array and the legacy `targetMuscle` string
    const getTargetMuscles = (item: routine): string[] => {
        if (Array.isArray(item.targetMuscles)) {
            return item.targetMuscles.filter(Boolean);
        }
        return item.targetMuscle ? [item.targetMuscle] : [];
    };

    const metricChipStyles = {
        fontSize: '0.72rem',
        fontWeight: 'bold',
        color: '#00ff87',
        backgroundColor: 'rgba(0, 255, 135, 0.12)',
        border: '1px solid rgba(0, 255, 135, 0.3)',
    };

    // Cyan variant so muscles read as a different kind of data than sets/reps/rest
    const muscleChipStyles = {
        fontSize: '0.72rem',
        fontWeight: 'bold',
        color: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.12)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
    };

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

                {/* Target muscles */}
                {item.targetMuscles && item.targetMuscles.length > 0 && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1,
                        padding: '0px 20px 0 20px',
                        mb: 2,
                    }}>
                        <Typography component="span" sx={{ fontSize: '1rem', lineHeight: 1 }}>🏋️</Typography>
                        {item.targetMuscles.filter(Boolean).map((muscle: string, muscleIndex: number) => (
                            <Chip
                                key={`ex-muscle-${muscleIndex}`}
                                size="small"
                                label={muscle}
                                sx={muscleChipStyles}
                            />
                        ))}
                    </Box>
                )}

                {/* Sets / reps / rest */}
                {(item.sets || item.reps || item.restSeconds) && (
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        padding: '0px 20px 0 20px',
                        mb: 2,
                    }}>
                        {item.sets && (
                            <Chip
                                size="small"
                                label={`${t('routine.sets')}: ${item.sets}`}
                                sx={metricChipStyles}
                            />
                        )}
                        {item.reps && (
                            <Chip
                                size="small"
                                label={`${t('routine.reps')}: ${item.reps}`}
                                sx={metricChipStyles}
                            />
                        )}
                        {item.restSeconds && (
                            <Chip
                                size="small"
                                label={`${t('routine.restSeconds')}: ${item.restSeconds}`}
                                sx={metricChipStyles}
                            />
                        )}
                    </Box>
                )}
            </>
        )
    }

    const renderVideo = (item: Exercise, dayIndex: number, exerciseIndex: number) => {
        const key = `${dayIndex}-${exerciseIndex}`;
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
        };

        const videoId = videoIds[key];

        if (videoId) {
            return (
                <Card key={`itemb-${key}`} sx={cardStyles}>
                    {tittleDescription(item)}
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            paddingBottom: '56.25%',
                            height: 0,
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?hl=${locale}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 0,
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card key={`itemb-${key}`} sx={cardStyles}>
                {tittleDescription(item)}
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        🎥 Video not available for this exercise
                    </Typography>
                </CardContent>
            </Card>
        );
    };

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

        if (content.style.display === "block") {
            button.style.transform = "rotate(180deg)";
            content.style.display = "none";
        } else {
            button.style.transform = "rotate(0deg)";
            content.style.display = "block";
            fetchDayVideos(index);
        }
    };


    return (
        <Box ref={mainContainer} sx={{
            minHeight: '100vh',
            background: '#09090f',
            pt: 2,
            // paddingBottom: '145px'
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
                    ((loader && !dataTrain) ? <CircularLoader text={t('routine.loaderGenerating')} /> : <Suspense fallback={<CircularLoader text={t('routine.loaderLoading')} />}>
                        <Box sx={{ maxWidth: '100%', mx: 'auto', paddingBottom: '145px' }}>
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

                                {/* Main objective badge */}
                                {objective && (
                                    <Chip
                                        label={getObjectiveLabel(objective)}
                                        size="small"
                                        sx={{
                                            mt: 2,
                                            fontSize: '0.72rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            color: '#00ff87',
                                            backgroundColor: 'rgba(0, 255, 135, 0.12)',
                                            border: '1px solid rgba(0, 255, 135, 0.3)',
                                        }}
                                    />
                                )}
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
                                        {dataTrain?.initialRecommendations}
                                    </Typography>
                                </Box>
                            </Paper>
                            {dataTrain?.routine?.map((item: routine, index: number) => {
                                const targetMuscles = getTargetMuscles(item);
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

                                                {targetMuscles.length > 0 && (
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexWrap: 'wrap',
                                                        gap: 1,
                                                        mb: 1,
                                                    }}>
                                                        <Typography
                                                            component="span"
                                                            sx={{ fontSize: '1.15rem', lineHeight: 1 }}
                                                        >
                                                            🏋️
                                                        </Typography>
                                                        {targetMuscles.map((muscle: string, muscleIndex: number) => (
                                                            <Chip
                                                                key={`muscle-${index}-${muscleIndex}`}
                                                                size="small"
                                                                label={muscle}
                                                                sx={muscleChipStyles}
                                                            />
                                                        ))}
                                                    </Box>
                                                )}

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
                                        {dataTrain?.routine.length > 0 && <div ref={(el: any) => (contentRefs.current[index] = el)} className="w-full" style={{ display: `${index === 0 ? 'block' : 'none'}` }}>
                                            {loadingDays.has(index) ? (
                                                <Box sx={{
                                                    py: 6,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                }}>
                                                    <CircularProgress
                                                        sx={{
                                                            color: '#00ff87',
                                                            filter: 'drop-shadow(0 0 8px rgba(0, 255, 135, 0.6))',
                                                        }}
                                                        size={44}
                                                        thickness={3}
                                                    />
                                                    <Typography variant="body2" sx={{ color: '#c0c0d0', letterSpacing: '0.5px' }}>
                                                        {t('routine.loaderVideo')}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Box sx={{ mb: 2 }}>
                                                    {item.exercises.map((exercise: Exercise, exerciseIndex: number) => (
                                                        renderVideo(exercise, index, exerciseIndex)
                                                    ))}
                                                </Box>
                                            )}
                                        </div>}
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
