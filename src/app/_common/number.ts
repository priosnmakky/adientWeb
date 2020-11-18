// export const change_number_null = {
//     change_number_null = (number: any) => 
//     {
//         if(number == '' || isNaN(number))
//         {
//             return null
//         }
//         else 
//         {
//             return number
//         }
//     }
//   };

export function change_number_null(number: any){

    if(number == '' || isNaN(number))
        {
            return null
        }
        else 
        {
            console.log('dsfsdfsdf')
            return number
        }
    // Do something
}
  