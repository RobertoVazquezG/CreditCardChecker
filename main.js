// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [5,4,2,3,1,7,6,8,1,3,7,7,6,5,6,2]//[3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

/*Create a function, validateCred() that has a parameter of an array. The purpose of validateCred() is to return true when an array contains 
digits of a valid credit card number and false when it is invalid. This function should NOT mutate the values of the original array.

To find out if a credit card number is valid or not, use the Luhn algorithm. Generally speaking, an algorithm is a series of steps that solve 
a problem — the Luhn algorithm is a series of mathematical calculations used to validate certain identification numbers, e.g. credit card 
numbers. The calculations in the Luhn algorithm can be broken down as the following steps:

    1. Starting from the farthest digit to the right, AKA the check digit, iterate to the left.

    2. As you iterate to the left, every other digit is doubled (the check digit is not doubled). If the number is greater than 9 after 
    doubling, subtract 9 from its value.

    3. Sum up all the digits in the credit card number.

    4. If the sum modulo 10 is 0 (if the sum divided by 10 has a remainder of 0) then the number is valid, otherwise, it’s invalid.*/

    function validateCred(array) {
        // Primero invertimos el orden del array (reversa)
        let arrayTest = array.reverse();
        let sumaDigitos = arrayTest[0];
        let digitoDoble = 0;
        let moduloSuma = 0;
        for(var i=1; i<array.length; i++){
            //Verificar si la posicion del array es impar
            if(i%2 != 0){
                digitoDoble = array[i] * 2;
                //Verificar si al momento de duplicar el número es mayor a 9
                if(digitoDoble > 9){
                    digitoDoble -= 9;
                }
                //Se suma el resulta a la suma de digitos globales
                sumaDigitos += digitoDoble;
              //  console.log(sumaDigitos);
            }
            else {
                sumaDigitos += array[i];
              //  console.log(sumaDigitos);
            }
            
        }
        arrayTest = array.reverse();
        //Se obtiene el módulo de la suma total sobre 10
        moduloSuma = sumaDigitos%10;
        //console.log(arrayTest);
        //console.log(`Módulo : ${moduloSuma}`);
        if(moduloSuma == 0 ){
            return true;
        }
        else{
            return false;
        }
    }


/*Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers. The role of findInvalidCards()
is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.*/

function findInvalidCards(arrayNested){
    var invalidCards = [];
    //console.log(arrayNested);
    /*for(array in arrayNested){
        console.log(arrayNested[array]);
        if(!validateCred(arrayNested[array])){
            console.log(arrayNested[array]);
            invalidCards.push(arrayNested[array]);
        }*/
    arrayNested.forEach(array => {
        if(!validateCred(array)){
            invalidCards.push(array);
           // console.log(array);
            //invalidCards.push(";lalal");
        }
    });
   // }
    console.log(`Las tarjetas invalidas son: ${invalidCards}`);
    idInvalidCardCompanies(invalidCards);
    //console.log(invalidCards[1]);
}


/* After finding all the invalid credit card numbers, it’s also necessary to identify the credit card companies that have possibly issued 
these faulty numbers. Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid numbers and returns 
an array of companies.

Currently, there are 4 accepted companies which each have unique first digits. The following table shows which digit is unique to which 
company:

3 - Amex (American Express)
4 - Visa
5 - MasterCard
6 - Discover

If the number doesn’t start with any of the numbers listed, print out a message like: “Company not found”.

idInvalidCardCompanies() should return an array of companies that have mailed out cards with invalid numbers. This array should NOT contain 
duplicates, i.e. even if there are two invalid Visa cards, "Visa" should only appear once in the array.*/

function idInvalidCardCompanies(arrayInvalid) {
    var firstDigit = 0;
    var cardCompanies = [];
    for(array in arrayInvalid){
        firstDigit = arrayInvalid[array][0];
        console.log(firstDigit);
        switch (firstDigit) {
            case 3:
                if(!cardCompanies.includes("American Express")){
                    cardCompanies.push("American Express");
                }
                break;
            case 4:
                if(!cardCompanies.includes("Visa")){
                    cardCompanies.push("Visa");
                }
                break;
            case 5:
                if(!cardCompanies.includes("Discover")){
                    cardCompanies.push("Discover");
                }
                break;
            case 6:
                if(!cardCompanies.includes("MasterCard")){
                    cardCompanies.push("MasterCard");
                }
                break;
            default:
                if(!cardCompanies.includes("Company Not Found!")){
                    cardCompanies.push("Company Not Found!");
                }
        }
    }

    console.log(`Las siguientes companias tienen tarjetas invalidas: ${cardCompanies}.`);

}


//validateCred([4, 5, 3, 9, 6, 8, 9, 8, 8, 7, 7, 0, 5, 7, 9, 8]);

//findInvalidCards([invalid1, invalid2]);
//validateCred(valid1);
   //validateCred(invalid1);
findInvalidCards(batch);









