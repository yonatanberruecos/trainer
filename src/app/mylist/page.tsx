'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Container, 
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Chip,
  Tooltip,
  Fade,
  Skeleton
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../context/I18nProvider';


interface Item {
  userworkout_id: number;
  userworkout_routine_summary: string;
  userworkout_workout_routine: string;
  userworkout_workout_id: number,
}

const ItemsPage = () => {
  const user = useAuth();
  const { t } = useI18n();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout`); // Replace with actual API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout?email=${encodeURIComponent(user)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
//         const data = [
//     {
//         "userworkout_id": 102,
//         "userworkout_workout_routine": "{\"inititalRecomendations\":\"Welcome to your personalized full-body workout routine! Considering your intermediate experience, age, and specific limitations (lumbar back pain), this program is designed to help you build muscle efficiently while minimizing strain.  We'll focus on proper form and controlled movements.  Listen to your body and don't hesitate to modify exercises if you experience any pain.  Warm-up before each workout with 5-10 minutes of light cardio and dynamic stretching, focusing on hip mobility and gentle back extensions. Cool-down with static stretches, holding each for 30 seconds.  Remember to stay hydrated throughout the day and prioritize proper nutrition to support muscle growth. Consult with a physician if you have concerns about your health.\",\"routine\":[{\"day\":\"Day 1\",\"targetMuscle\":\"Chest and Triceps\",\"exercises\":[{\"name\":\"Dumbbell Bench Press\",\"description\":\"Lie on a bench with dumbbells in each hand. Lower the dumbbells to your chest, keeping your elbows slightly bent, then press them back up. Target muscles: Pectoralis major (chest), Triceps. 3 sets of 8-12 repetitions.  Focus on controlled descent and ascent.\"},{\"name\":\"Incline Dumbbell Press\",\"description\":\"Lie on an incline bench with dumbbells in each hand. Lower the dumbbells to your chest, then press them back up. Target muscles: Upper chest, Triceps. 3 sets of 8-12 repetitions. This hits the upper chest more effectively.\"},{\"name\":\"Dumbbell Flyes\",\"description\":\"Lie on a bench with dumbbells in each hand. Lower the dumbbells to the sides, keeping a slight bend in your elbows, then bring them back together above your chest. Target muscles: Chest. 3 sets of 10-15 repetitions. Focus on squeezing the chest muscles at the top.\"},{\"name\":\"Close-Grip Dumbbell Press\",\"description\":\"Lie on a bench with dumbbells in each hand, hands close together. Lower the dumbbells to your chest, then press them back up. Target muscles: Triceps, Chest. 3 sets of 10-15 repetitions. Engage the core for stability.\"},{\"name\":\"Dumbbell Overhead Triceps Extension\",\"description\":\"Hold a dumbbell overhead with both hands. Lower the dumbbell behind your head, bending at the elbows, then extend back up. Target muscles: Triceps. 3 sets of 12-15 repetitions. Keep elbows pointed straight up.\"}]},{\"day\":\"Day 2\",\"targetMuscle\":\"Back and Biceps\",\"exercises\":[{\"name\":\"Dumbbell Rows\",\"description\":\"Place one knee and hand on a bench for support. Hold a dumbbell in the other hand and pull it up towards your chest, keeping your back straight. Target muscles: Latissimus dorsi (back), Biceps. 3 sets of 8-12 repetitions per side.  Maintain a neutral spine.\"},{\"name\":\"Pull-ups (Assisted if needed)\",\"description\":\"Grip a pull-up bar with an overhand grip, slightly wider than shoulder-width. Pull yourself up until your chin is over the bar. Target muscles: Back, Biceps. 3 sets to failure (as many as possible with good form) or assisted pull-ups. Focus on controlled movements.\"},{\"name\":\"Lat Pulldowns (Wide Grip)\",\"description\":\"Using a lat pulldown machine, pull the bar down to your upper chest, squeezing your back muscles. Target muscles: Latissimus dorsi (back). 3 sets of 10-15 repetitions. Keep your core engaged and back straight.\"},{\"name\":\"Dumbbell Bicep Curls\",\"description\":\"Stand with dumbbells in each hand. Curl the dumbbells up towards your shoulders, keeping your elbows close to your sides. Target muscles: Biceps. 3 sets of 10-15 repetitions. Use a slow, controlled motion.\"},{\"name\":\"Hammer Curls\",\"description\":\"Stand with dumbbells in each hand. Curl the dumbbells up towards your shoulders, keeping your palms facing each other. Target muscles: Biceps, Forearms. 3 sets of 10-15 repetitions. This hits the brachialis muscle.\"}]},{\"day\":\"Day 3\",\"targetMuscle\":\"Legs and Shoulders\",\"exercises\":[{\"name\":\"Goblet Squats\",\"description\":\"Hold a dumbbell or kettlebell close to your chest. Squat down, keeping your back straight and chest up, then stand back up. Target muscles: Quadriceps, Glutes, Hamstrings. 3 sets of 10-15 repetitions. Great for beginners to learn proper squat form.\"},{\"name\":\"Dumbbell Lunges\",\"description\":\"Step forward with one leg and lower your body until both knees are bent at 90 degrees. Then, push back up to the starting position. Target muscles: Quadriceps, Glutes, Hamstrings. 3 sets of 10-12 repetitions per leg. Focus on controlled movements.\"},{\"name\":\"Romanian Deadlifts (RDLs) (Dumbbell)\",\"description\":\"Holding dumbbells, hinge at your hips, keeping your back straight and legs slightly bent. Lower the dumbbells towards the ground, then stand back up. Target muscles: Hamstrings, Glutes, Lower back. 3 sets of 10-12 repetitions.  Focus on hamstring engagement and maintaining a straight back. **Important: Keep the weight light and focus on form. If you feel any lower back pain, stop immediately and reduce the range of motion.**\"},{\"name\":\"Calf Raises\",\"description\":\"Stand on a slightly elevated surface (like a book) and raise up onto your toes. Target muscles: Calves. 3 sets of 15-20 repetitions. Squeeze the calves at the top.\"},{\"name\":\"Dumbbell Shoulder Press\",\"description\":\"Sit or stand with dumbbells in each hand. Press the dumbbells up overhead, keeping your elbows slightly bent. Target muscles: Deltoids (shoulders). 3 sets of 8-12 repetitions. Control the weight throughout the movement.\"},{\"name\":\"Lateral Raises\",\"description\":\"Stand with dumbbells in each hand. Raise your arms out to the sides, keeping your elbows slightly bent, until they are parallel to the ground. Target muscles: Deltoids (shoulders). 3 sets of 10-15 repetitions. Focus on controlled movements.\"},{\"name\":\"Front Raises\",\"description\":\"Stand with dumbbells in each hand. Raise your arms straight in front of you, keeping your elbows slightly bent, until they are parallel to the ground. Target muscles: Deltoids (shoulders). 3 sets of 10-15 repetitions. Focus on controlled movements.\"}]},{\"day\":\"Day 4\",\"targetMuscle\":\"Rest\",\"exercises\":[]},{\"day\":\"Day 5\",\"targetMuscle\":\"Core and Full Body\",\"exercises\":[{\"name\":\"Plank\",\"description\":\"Hold a plank position, keeping your body in a straight line from head to heels. Engage your core and glutes. Target muscles: Core (abs, obliques, lower back). 3 sets, holding for 30-60 seconds each. Maintain a neutral spine and avoid arching your back.\"},{\"name\":\"Side Plank\",\"description\":\"Lie on your side, supporting yourself on your forearm. Keep your body in a straight line from head to feet. Engage your obliques. Target muscles: Obliques (side abs). 3 sets per side, holding for 30-60 seconds each.\"},{\"name\":\"Bird Dog\",\"description\":\"Start on your hands and knees. Extend one arm forward and the opposite leg backward, keeping your back straight. Alternate sides. Target muscles: Core, Lower back. 3 sets of 10-12 repetitions per side. This exercise helps improve core stability and balance.\"},{\"name\":\"Dumbbell Deadlift (Light Weight)\",\"description\":\"Perform a deadlift with a light weight, focusing on perfect form and engaging the entire body. Target muscles: Full body. 2 sets of 8-12 repetitions. **Prioritize form over weight. If you feel any back pain, stop immediately.**\"},{\"name\":\"Kettlebell Swings (Light Weight)\",\"description\":\"Swing a light kettlebell between your legs and up to chest height, using your hips for power. Target muscles: Full body. 2 sets of 15-20 repetitions. Focus on using hip power and maintaining a straight back.\"}]},{\"day\":\"Day 6\",\"targetMuscle\":\"Rest\",\"exercises\":[]},{\"day\":\"Day 7\",\"targetMuscle\":\"Shoulders and Abs\",\"exercises\":[{\"name\":\"Arnold Press\",\"description\":\"Sit or stand with dumbbells in each hand, palms facing you. Rotate your hands as you press the dumbbells up and overhead, ending with palms facing forward. Target muscles: Deltoids (shoulders). 3 sets of 8-12 repetitions.\"},{\"name\":\"Reverse Dumbbell Flyes\",\"description\":\"Bend over at the waist, keeping your back straight. With dumbbells in each hand, raise your arms out to the sides, squeezing your shoulder blades together. Target muscles: Rear deltoids (shoulders). 3 sets of 10-15 repetitions. Focus on controlled movements.\"},{\"name\":\"Crunches\",\"description\":\"Lie on your back with your knees bent and feet flat on the floor. Place your hands behind your head and curl your upper body towards your knees. Target muscles: Abs. 3 sets of 15-20 repetitions. Focus on engaging your abs and avoiding pulling on your neck.\"},{\"name\":\"Leg Raises\",\"description\":\"Lie on your back with your legs straight. Raise your legs up towards the ceiling, keeping your lower back pressed against the floor. Target muscles: Lower abs. 3 sets of 15-20 repetitions. Keep the movement slow and controlled.\"},{\"name\":\"Russian Twists\",\"description\":\"Sit on the floor with your knees bent and feet slightly elevated. Lean back slightly and twist your torso from side to side, touching the floor with your hands. Target muscles: Obliques. 3 sets of 15-20 repetitions per side. Use a light weight (dumbbell or medicine ball) for added intensity.\"}]}],\"lastRecommendations\":\"Consistency is key! Stick to this routine, adjusting weights and repetitions as you progress. Remember to prioritize form to prevent injuries. Incorporate light cardio on your rest days, such as walking or cycling. Pay close attention to your nutrition and sleep for optimal recovery and muscle growth. Most importantly, listen to your body. If you experience any pain, stop the exercise and consult with a professional. **Focus on stretches that improve hip mobility and flexibility in your lower back.** Consider exercises like cat-cow stretches, child's pose, and gentle spinal twists. Good luck, and enjoy your fitness journey!\"}",
//         "userworkout_workout_id": 201,
//         "userworkout_routine_summary": "Welcome to your personalized full-body workout routine! Considering your intermediate experience, age, and specific limitations (lumbar back pain), this program is designed to help you build muscle efficiently while minimizing strain.  We'll focus on proper form and controlled movements.  Listen to your body and don't hesitate to modify exercises if you experience any pain.  Warm-up before each workout with 5-10 minutes of light cardio and dynamic stretching, focusing on hip mobility and gentle back extensions. Cool-down with static stretches, holding each for 30 seconds.  Remember to stay hydrated throughout the day and prioritize proper nutrition to support muscle growth. Consult with a physician if you have concerns about your health."
//     },
//     {
//         "userworkout_id": 67,
//         "userworkout_workout_routine": "This workout routine is designed for a male, intermediate-level trainee aiming for full-body muscle building.  Remember to consult your doctor before starting any new workout routine.  Proper form is crucial to prevent injury; consider working with a trainer initially to learn correct technique.  This routine focuses on compound movements for optimal muscle growth and calorie expenditure.  Adjust weight to maintain good form throughout each set.\n\n**Day 1: Upper Body Push**\n\n* **Bench Press:** *Lie on a bench with feet flat on the floor. Grip the barbell slightly wider than shoulder-width apart. Lower the bar to your chest, then press it back up.*  Targets: Chest, Triceps, Shoulders.\n\n* **Overhead Press:** *Stand with feet shoulder-width apart, holding a barbell at shoulder height. Press the barbell straight overhead, then lower it back down in a controlled manner.* Targets: Shoulders, Triceps.\n\n* **Incline Dumbbell Press:** *Lie on an incline bench (30-45 degrees). Hold a dumbbell in each hand, lowering them towards your chest. Press the dumbbells back up.* Targets: Upper Chest, Triceps, Shoulders.\n\n* **Triceps Pushdowns:** *Attach a rope or V-bar to a cable machine's high pulley. Grab the attachment and extend your arms downwards, squeezing your triceps.* Targets: Triceps.\n\n* **Lateral Raises:** *Stand with dumbbells at your sides. Raise your arms out to the sides until they're parallel to the floor, then slowly lower them back down.* Targets: Shoulders (lateral deltoids).\n\n\n**Day 2: Lower Body & Core**\n\n* **Barbell Squats:** *Stand with feet shoulder-width apart, holding a barbell across your upper back. Squat down until your thighs are parallel to the floor, keeping your back straight.  Return to the starting position.* Targets: Quads, Glutes, Hamstrings.\n\n* **Romanian Deadlifts (RDLs):** *Stand with feet hip-width apart, holding a barbell in front of your thighs. Hinge at your hips, keeping your back straight, lowering the bar towards the ground. Extend your hips to return to the starting position.* Targets: Hamstrings, Glutes.\n\n* **Leg Press:** *Sit in the leg press machine and adjust the seat so your knees are bent at a 90-degree angle when your feet are on the platform. Push the platform away from you, then slowly lower it back down.* Targets: Quads, Glutes, Hamstrings.\n\n* **Calf Raises:** *Stand on a slightly elevated surface (like a weight plate) with your heels hanging off the edge. Raise up onto your toes, then slowly lower your heels back down.* Targets: Calves.\n\n* **Plank:** *Hold a plank position (forearms on the ground, body in a straight line from head to heels) for 30-60 seconds.* Targets: Core muscles (rectus abdominis, obliques, transverse abdominis).\n\n\n**Day 3: Rest**\n\n**Day 4: Upper Body Pull**\n\n* **Pull-ups:** *Grip a pull-up bar with an overhand grip, slightly wider than shoulder-width apart. Hang with your arms fully extended. Pull yourself up until your chin is over the bar, then slowly lower yourself back down.* Targets: Back (lats, traps), Biceps, Forearms.\n\n* **Barbell Rows:** *Bend at your hips with a slight bend in your knees, keeping your back straight. Hold a barbell and pull it towards your chest, keeping your elbows close to your body.  Lower the bar back to the starting position.* Targets: Back (lats, traps, rhomboids), Biceps.\n\n* **Seated Cable Rows:** *Sit facing a cable machine's low pulley. Grab the handle and pull it towards your chest, keeping your back straight.  Slowly release back to the starting position.* Targets: Back.\n\n* **Bicep Curls:** *Stand holding dumbbells. Curl the dumbbells up towards your shoulders, keeping your elbows close to your sides. Slowly lower the dumbbells back down.* Targets: Biceps.\n\n\n**Day 5: Legs & Shoulders**\n\n* **Lunges:** *Step forward with one leg and lower your body until both knees are bent at a 90-degree angle. Push back up to the starting position and repeat with the other leg.* Targets: Quads, Glutes, Hamstrings.\n\n* **Leg Extensions:** *Sit in a leg extension machine and extend your legs fully, then lower them back down in a controlled manner.* Targets: Quads.\n\n* **Hamstring Curls:** *Lie face down on a hamstring curl machine and curl your legs towards your glutes, then slowly lower them back down.* Targets: Hamstrings.\n\n* **Dumbbell Shoulder Press:** *Sit on a bench holding a dumbbell in each hand. Press the dumbbells straight overhead, then lower them back down in a controlled manner.* Targets: Shoulders.\n\n\n**Day 6 & 7: Rest**\n\n\n**Important Considerations:**\n\n* **Warm-up:** Before each workout, perform 5-10 minutes of light cardio and dynamic stretching.\n* **Cool-down:** After each workout, perform 5-10 minutes of static stretching.\n* **Progressive Overload:** Gradually increase the weight, reps, or sets over time to continue challenging your muscles and promoting growth.\n* **Nutrition:**  Consume a diet rich in protein to support muscle growth.\n* **Rest:** Adequate sleep is essential for muscle recovery and growth.\n\nThis is a sample routine; you may need to adjust it based on your individual progress and recovery.  Listen to your body and don't hesitate to modify the program as needed. Remember to prioritize proper form over lifting heavy weight.\n",
//         "userworkout_workout_id": 166,
//         "userworkout_routine_summary": "This workout routine is designed for a male, intermediate-level trainee aiming for full-body muscle building.  Remember to consult your doctor before starting any new workout routine.  Proper form is crucial to prevent injury; consider working with a trainer initially to learn correct technique.  This routine focuses on compound movements for optimal muscle growth and calorie expenditure.  Adjust weight to maintain good form throughout each set.\n\n"
//     },
//     {
//         "userworkout_id": 100,
//         "userworkout_workout_routine": "{\"inititalRecomendations\":\"Welcome to your personalized full-body workout routine! Based on your experience level (Junior), this routine is designed to help you build muscle efficiently over 5 days, allowing for ample recovery.  Remember to prioritize proper form over lifting heavy. Focus on feeling the targeted muscles working. Listen to your body and don't hesitate to adjust the weight or reps as needed. Warm-up before each workout with 5-10 minutes of light cardio and dynamic stretching (arm circles, leg swings, torso twists). Cool-down after each workout with static stretching, holding each stretch for 30 seconds.\",\"routine\":[{\"day\":1,\"targetMuscle\":\"Chest, Triceps, Abs\",\"exercises\":[{\"name\":\"Dumbbell Bench Press\",\"description\":\"Lie on a bench, feet flat on the floor. Hold dumbbells at chest level with palms facing each other. Lower the dumbbells towards your chest, keeping your elbows slightly bent. Push the dumbbells back up to the starting position. Target: Pectorals, Triceps. 3 sets of 8-12 repetitions.\",\"sets\":3,\"repetitions\":\"8-12\"},{\"name\":\"Incline Dumbbell Press\",\"description\":\"Lie on an incline bench, feet flat on the floor. Hold dumbbells at chest level with palms facing each other. Lower the dumbbells towards your chest, keeping your elbows slightly bent. Push the dumbbells back up to the starting position. Target: Upper Pectorals, Triceps. 3 sets of 8-12 repetitions.\",\"sets\":3,\"repetitions\":\"8-12\"},{\"name\":\"Dumbbell Flyes\",\"description\":\"Lie on a flat bench, holding dumbbells directly above your chest with a slight bend in your elbows. Slowly lower the dumbbells out to the sides, keeping the bend in your elbows. Squeeze your chest to bring the dumbbells back to the starting position. Target: Pectorals. 3 sets of 10-15 repetitions.\",\"sets\":3,\"repetitions\":\"10-15\"},{\"name\":\"Triceps Dips (Bench)\",\"description\":\"Place your hands shoulder-width apart on a bench behind you, with your legs extended in front. Lower your body by bending your elbows until your upper arms are parallel to the floor. Push yourself back up to the starting position. Target: Triceps. 3 sets of as many repetitions as possible (AMRAP).\",\"sets\":3,\"repetitions\":\"AMRAP\"},{\"name\":\"Overhead Dumbbell Extension\",\"description\":\"Stand or sit holding a dumbbell with both hands behind your head. Lower the dumbbell towards your back by bending your elbows. Extend your arms back to the starting position. Target: Triceps. 3 sets of 10-15 repetitions.\",\"sets\":3,\"repetitions\":\"10-15\"},{\"name\":\"Plank\",\"description\":\"Hold a plank position on your forearms and toes, keeping your body in a straight line. Engage your core and hold for as long as possible. Target: Core. 3 sets, hold for 30-60 seconds each.\",\"sets\":3,\"repetitions\":\"30-60 seconds\"},{\"name\":\"Crunches\",\"description\":\"Lie on your back with your knees bent and feet flat on the floor. Place your hands behind your head. Curl your upper body towards your knees, engaging your abdominal muscles. Target: Core. 3 sets of 15-20 repetitions.\",\"sets\":3,\"repetitions\":\"15-20\"}]},{\"day\":2,\"targetMuscle\":\"Back, Biceps\",\"exercises\":[{\"name\":\"Pull-ups (Assisted if needed)\",\"description\":\"Grip a pull-up bar with an overhand grip, slightly wider than shoulder-width. Hang from the bar with your arms fully extended. Pull yourself up until your chin is above the bar. Slowly lower yourself back to the starting position. Target: Back, Biceps. 3 sets of as many repetitions as possible (AMRAP). Use an assisted pull-up machine or resistance bands if needed.\",\"sets\":3,\"repetitions\":\"AMRAP\"},{\"name\":\"Dumbbell Rows\",\"description\":\"Stand with your feet shoulder-width apart, holding a dumbbell in each hand. Bend forward at the hips, keeping your back straight. Pull the dumbbells towards your chest, squeezing your shoulder blades together. Lower the dumbbells back to the starting position. Target: Back. 3 sets of 8-12 repetitions per arm.\",\"sets\":3,\"repetitions\":\"8-12 per arm\"},{\"name\":\"Lat Pulldowns\",\"description\":\"Sit at a lat pulldown machine and grab the bar with a wide overhand grip. Pull the bar down to your chest, squeezing your shoulder blades together. Slowly release the bar back to the starting position. Target: Back. 3 sets of 8-12 repetitions.\",\"sets\":3,\"repetitions\":\"8-12\"},{\"name\":\"Dumbbell Bicep Curls\",\"description\":\"Stand with your feet shoulder-width apart, holding a dumbbell in each hand. Curl the dumbbells up towards your shoulders, keeping your elbows close to your body. Slowly lower the dumbbells back to the starting position. Target: Biceps. 3 sets of 10-15 repetitions.\",\"sets\":3,\"repetitions\":\"10-15\"},{\"name\":\"Hammer Curls\",\"description\":\"Stand with your feet shoulder-width apart, holding a dumbbell in each hand with a neutral grip (palms facing each other). Curl the dumbbells up towards your shoulders, keeping your elbows close to your body. Slowly lower the dumbbells back to the starting position. Target: Biceps, Forearms. 3 sets of 10-15 repetitions.\",\"sets\":3,\"repetitions\":\"10-15\"},{\"name\":\"Concentration Curls\",\"description\":\"Sit on a bench with your legs spread and a dumbbell in one hand. Place your elbow against your inner thigh. Curl the dumbbell up towards your shoulder, focusing on squeezing your bicep. Slowly lower the dumbbell back to the starting position. Target: Biceps. 3 sets of 10-15 repetitions per arm.\",\"sets\":3,\"repetitions\":\"10-15 per arm\"}]},{\"day\":3,\"targetMuscle\":\"Legs, Shoulders\",\"exercises\":[{\"name\":\"Squats\",\"description\":\"Stand with your feet shoulder-width apart, toes slightly pointed out. Lower your body as if sitting in a chair, keeping your back straight and core engaged. Ensure your knees don't go past your toes. Return to the starting position. Target: Quads, Glutes, Hamstrings. 3 sets of 8-12 repetitions.\",\"sets\":3,\"repetitions\":\"8-12\"},{\"name\":\"Lunges\",\"description\":\"Step forward with one leg and lower your body until both knees are bent at 90 degrees. Keep your front knee over your ankle and your back knee close to the ground. Push back up to the starting position. Target: Quads, Glutes, Hamstrings. 3 sets of 10-15 repetitions per leg.\",\"sets\":3,\"repetitions\":\"10-15 per leg\"},{\"name\":\"Romanian Deadlifts\",\"description\":\"Stand with your feet hip-width apart, holding a dumbbell in each hand. Hinge at your hips, keeping your back straight and your legs slightly bent. Lower the dumbbells towards the ground, feeling a stretch in your hamstrings. Return to the starting position. Target: Hamstrings, Glutes. 3 sets of 10-15 repetitions.\",\"sets\":3,\"repetitions\":\"10-15\"},{\"name\":\"Overhead Press (Dumbbell or Barbell)\",\"description\":\"Stand with your feet shoulder-width apart, holding dumbbells or a barbell at shoulder height. Press the weight overhead until your arms are fully extended. Slowly lower the weight back to the starting position. Target: Shoulders. 3 sets of 8-12 repetitions.\",\"sets\":3,\"repetitions\":\"8-12\"},{\"name\":\"Lateral Raises\",\"description\":\"Stand with your feet shoulder-width apart, holding a dumbbell in each hand. Raise your arms out to the sides, keeping your elbows slightly bent, until your arms are parallel to the floor. Slowly lower your arms back to the starting position. Target: Shoulders. 3 sets of 10-15 repetitions.\",\"sets\":3,\"repetitions\":\"10-15\"},{\"name\":\"Front Raises\",\"description\":\"Stand with your feet shoulder-width apart, holding a dumbbell in each hand. Raise your arms straight in front of you, keeping your elbows slightly bent, until your arms are parallel to the floor. Slowly lower your arms back to the starting position. Target: Shoulders. 3 sets of 10-15 repetitions.\",\"sets\":3,\"repetitions\":\"10-15\"},{\"name\":\"Calf Raises\",\"description\":\"Stand with your feet shoulder-width apart, holding a dumbbell in each hand. Rise up onto your toes, squeezing your calf muscles. Slowly lower your heels back to the ground. Target: Calves. 3 sets of 15-20 repetitions.\",\"sets\":3,\"repetitions\":\"15-20\"}]},{\"day\":4,\"targetMuscle\":\"Full Body (Light Weight, High Reps)\",\"exercises\":[{\"name\":\"Goblet Squats\",\"description\":\"Hold a dumbbell or kettlebell close to your chest. Squat down as low as possible, maintaining good form. Target: Quads, Glutes, Core. 3 sets of 15-20 repetitions.\",\"sets\":3,\"repetitions\":\"15-20\"},{\"name\":\"Push-ups\",\"description\":\"Perform push-ups on your toes or knees. Focus on controlled movements and proper form. Target: Chest, Triceps, Shoulders, Core. 3 sets of as many repetitions as possible (AMRAP).\",\"sets\":3,\"repetitions\":\"AMRAP\"},{\"name\":\"Walking Lunges\",\"description\":\"Perform walking lunges across a room. Focus on maintaining balance and proper form. Target: Quads, Glutes, Hamstrings. 3 sets of 10-12 repetitions per leg.\",\"sets\":3,\"repetitions\":\"10-12 per leg\"},{\"name\":\"Dumbbell Shoulder Press\",\"description\":\"Press dumbbells overhead, focusing on controlled movements and proper form. Target: Shoulders. 3 sets of 12-15 repetitions.\",\"sets\":3,\"repetitions\":\"12-15\"},{\"name\":\"Dumbbell Rows\",\"description\":\"Perform dumbbell rows, focusing on squeezing your shoulder blades together. Target: Back. 3 sets of 12-15 repetitions per arm.\",\"sets\":3,\"repetitions\":\"12-15 per arm\"},{\"name\":\"Bicycle Crunches\",\"description\":\"Lie on your back and bring your knee to meet your opposite elbow. 3 sets of 20-30 repetitions.\",\"sets\":3,\"repetitions\":\"20-30\"}]},{\"day\":5,\"targetMuscle\":\"Core, Cardio & Recovery\",\"exercises\":[{\"name\":\"Russian Twists\",\"description\":\"Sit with your knees bent and feet slightly elevated. Twist your torso from side to side, touching the ground or a light weight to each side. Target: Obliques, Core. 3 sets of 15-20 repetitions per side.\",\"sets\":3,\"repetitions\":\"15-20 per side\"},{\"name\":\"Leg Raises\",\"description\":\"Lie on your back with your legs extended. Raise your legs towards the ceiling, keeping them straight or slightly bent. Lower your legs back down slowly. Target: Lower Abs. 3 sets of 15-20 repetitions.\",\"sets\":3,\"repetitions\":\"15-20\"},{\"name\":\"Side Plank\",\"description\":\"Lie on your side, supporting yourself on your forearm and the side of your foot. Keep your body in a straight line. Target: Obliques, Core. 3 sets, hold for 30-60 seconds per side.\",\"sets\":3,\"repetitions\":\"30-60 seconds per side\"},{\"name\":\"Light Cardio (Running, Cycling, Swimming)\",\"description\":\"Perform 30-45 minutes of light cardio at a moderate pace. Focus on maintaining a steady heart rate. Target: Cardiovascular health, Recovery.\",\"sets\":1,\"repetitions\":\"30-45 minutes\"},{\"name\":\"Foam Rolling\",\"description\":\"Use a foam roller to massage your muscles, focusing on tight areas like your legs, back, and shoulders. Target: Muscle recovery, Flexibility. 10-15 minutes.\",\"sets\":1,\"repetitions\":\"10-15 minutes\"}]}],\"lastRecommendations\":\"Remember to maintain a healthy diet rich in protein to support muscle growth. Get adequate sleep (7-8 hours) for optimal recovery. Stay hydrated by drinking plenty of water throughout the day. Increase the weight gradually as you get stronger.  Rest and recovery are as important as the workouts themselves. Take your rest days seriously. Listen to your body, and don't hesitate to take extra rest days if needed. For stretching at the end of each workout, focus on the muscles you worked that day.  Hold each stretch for 30 seconds. Examples: Chest stretch (doorway stretch), Back stretch (cat-cow), Leg stretches (hamstring stretch, quad stretch). Good luck on your fitness journey!\"}",
//         "userworkout_workout_id": 199,
//         "userworkout_routine_summary": "Welcome to your personalized full-body workout routine! Based on your experience level (Junior), this routine is designed to help you build muscle efficiently over 5 days, allowing for ample recovery.  Remember to prioritize proper form over lifting heavy. Focus on feeling the targeted muscles working. Listen to your body and don't hesitate to adjust the weight or reps as needed. Warm-up before each workout with 5-10 minutes of light cardio and dynamic stretching (arm circles, leg swings, torso twists). Cool-down after each workout with static stretching, holding each stretch for 30 seconds."
//     }
// ]
        // const data = [{id: "1", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}, {id: "2", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}]
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    if(user) {
      fetchItems();
    }
  }, [user]);

  const handleClickCard = (routine_id: number) => {
    router.push(`/fit?routine_id=${routine_id.toString()}`);
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, itemId: number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleDeleteClick = () => {
    setItemToDelete(selectedItemId);
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout/${itemToDelete.toString()}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          // Remove the item from the local state
          setItems(prevItems => prevItems.filter(item => item.userworkout_id !== itemToDelete));
        } else {
          console.error('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
    
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleNew = () => {
    router.push('/fit');
  }

  // Loading state with skeleton cards
  if (loading && !user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Skeleton variant="text" width={300} height={60} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="rectangular" width={200} height={40} sx={{ mx: 'auto' }} />
        </Box>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`skeleton-${item}`}>
              <Card sx={{ height: 280 }}>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="90%" height={20} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" width="100%" height={60} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  // Helper function to get workout type icon
  const getWorkoutIcon = (summary: string) => {
    const lowerSummary = summary.toLowerCase();
    if (lowerSummary.includes('weight loss') || lowerSummary.includes('fat loss')) return '🔥';
    if (lowerSummary.includes('muscle') || lowerSummary.includes('strength')) return '💪';
    if (lowerSummary.includes('flexibility') || lowerSummary.includes('yoga')) return '🧘';
    if (lowerSummary.includes('cardio') || lowerSummary.includes('running')) return '🏃';
    return '🏋️';
  };

  // Helper function to get workout difficulty
  const getDifficulty = (summary: string) => {
    const lowerSummary = summary.toLowerCase();
    if (lowerSummary.includes('beginner') || lowerSummary.includes('junior')) return t('mylist.beginner');
    if (lowerSummary.includes('advanced')) return t('mylist.advanced');
    return t('mylist.intermediate');
  };

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Advanced': return 'error';
      default: return 'warning';
    }
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          p: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }} />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              🏋️ {t('mylist.title')}
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              {t('mylist.subtitle')}
            </Typography>
            <Button 
              onClick={handleNew} 
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                height: 48,
                padding: '0 30px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 10px 2px rgba(255, 105, 135, .3)',
                }
              }}
            >
              ✨ {t('mylist.generateNew')}
            </Button>
          </Box>
        </Box>

        {/* Empty State */}
        {items.length === 0 && !loading && (
          <Fade in={true}>
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              background: 'white',
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h4" sx={{ mb: 2, color: '#666' }}>
                🎯 {t('mylist.readyToStart')}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: '#888', maxWidth: 400, mx: 'auto' }}>
                {t('mylist.noRoutines')}
              </Typography>
              <Button 
                onClick={handleNew} 
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none'
                }}
              >
                🚀 {t('mylist.createFirst')}
              </Button>
            </Box>
          </Fade>
        )}

        {/* Workout Cards Grid */}
        <Grid container spacing={3}>
          {items.map((item, index) => {
            const workoutIcon = getWorkoutIcon(item.userworkout_routine_summary);
            const difficulty = getDifficulty(item.userworkout_routine_summary);
            const difficultyColor = getDifficultyColor(difficulty);
            
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={'routine' + item.userworkout_id.toString()}>
                <Fade in={true} timeout={300 + index * 100}>
                  <Card sx={{ 
                    height: '100%',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { 
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
                      borderColor: 'rgba(102, 126, 234, 0.3)'
                    }
                  }}>
                    {/* Gradient Border Effect */}
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                    }} />
                    
                    {/* Menu Button */}
                    <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
                      <IconButton
                        onClick={(e) => handleMenuClick(e, item.userworkout_id)}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(102, 126, 234, 0.1)',
                          width: 32,
                          height: 32,
                          '&:hover': { 
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#667eea' }}>⋮</Typography>
                      </IconButton>
                    </Box>

                    <CardActionArea onClick={() => handleClickCard(item.userworkout_id)} sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {/* Header with Icon and Title */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ 
                            fontSize: '2rem', 
                            mr: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50%',
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {workoutIcon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 'bold',
                                color: '#2d3748',
                                mb: 0.5
                              }}
                            >
                              {t('mylist.routine')} #{index + 1}
                            </Typography>
                            <Chip 
                              label={difficulty}
                              color={difficultyColor as any}
                              size="small"
                              sx={{ 
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Description */}
                        <Box sx={{ flex: 1, mb: 2 }}>
                          <Tooltip 
                            title={item.userworkout_routine_summary.length > 120 ? item.userworkout_routine_summary : ''}
                            placement="top"
                            arrow
                          >
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#4a5568',
                                lineHeight: 1.6,
                                display: '-webkit-box',
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {truncateText(item.userworkout_routine_summary)}
                            </Typography>
                          </Tooltip>
                        </Box>

                        {/* Footer */}
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          pt: 2,
                          borderTop: '1px solid rgba(102, 126, 234, 0.1)'
                        }}>
                          <Typography variant="caption" sx={{ color: '#718096', fontWeight: 'medium' }}>
                            {t('mylist.clickToView')}
                          </Typography>
                          <Box sx={{ 
                            color: '#667eea',
                            fontSize: '1.2rem',
                            transform: 'translateX(0)',
                            transition: 'transform 0.2s ease'
                          }}>
                            →
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Fade>
              </Grid>
            );
          })}
        </Grid>

        {/* Kebab Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              border: '1px solid rgba(102, 126, 234, 0.1)'
            }
          }}
        >
          <MenuItem 
            onClick={handleDeleteClick}
            sx={{
              color: '#e53e3e',
              '&:hover': {
                backgroundColor: 'rgba(229, 62, 62, 0.1)'
              }
            }}
          >
            🗑️ {t('common.delete')}
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Modal */}
        <Dialog
          open={deleteModalOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
            }
          }}
        >
          <DialogTitle 
            id="delete-dialog-title"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            🗑️ {t('mylist.deleteTitle')}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography>
              {t('mylist.deleteMessage')}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button 
              onClick={handleDeleteCancel} 
              variant="outlined"
              sx={{
                borderColor: '#e2e8f0',
                color: '#4a5568',
                '&:hover': {
                  borderColor: '#cbd5e0',
                  backgroundColor: '#f7fafc'
                }
              }}
            >
              {t('mylist.cancelButton')}
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #e53e3e 30%, #c53030 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #c53030 30%, #9c2626 90%)'
                }
              }}
            >
              {t('mylist.deleteButton')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ItemsPage;
