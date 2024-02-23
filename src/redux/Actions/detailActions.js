import { PLANET_DETAILS } from "./actionTypes";

export const planetDetails =(product)=>{
    return {
        type: PLANET_DETAILS,
        payload: product,
    }
}

// export const buyCourse =(product)=>{
//     return {
//         type: BUY_COURSE,
//         payload: product,
//     }
// }


// export const toggleCourseCompletion = (courseId) => ({
//   type: TOGGLE_COURSE_COMPLETION,
//   payload: courseId,
// });