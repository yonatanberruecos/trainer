'use client'
import { useEffect, useState } from "react";
import TrainingForm from "@/components/TrainingForm/trainingForm";

export default function fit() {
    const [dataTrain, setDataTrain] = useState<string[]>([]);
    const [promt, setPromt] = useState('');
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
            const dataArray = data.split('**');
            setDataTrain(dataArray);
        }

        if(promt)
          fetchData();
    }, [promt]);

    const onSubmitForm = (data: any) => {
        setPromt(`provide a complete and effective workout plan with a list of exersises, share a reproducible and updated video link related on how to perform each exercise for a person with the following characteristics, objective, favorite place to perform the workout etc: gender:${data.gender}, date of birth:${data.dob}, height:${data.height}m, weight:${data.weight}kg, favorite place to workout:${data.preference}, objetive:${data.objective}, workout experience:${data.workout}`);
        console.log('onSubmitForm', data);
    }
    

    return (
    <div style={{padding:'40px'}}>
    { dataTrain.length ? dataTrain.map((item : any) => <p>{item}</p>): 
    <TrainingForm onSubmitForm={onSubmitForm}></TrainingForm>} 
    </div>
    );
};