export const loginValidation = (username, password, flag) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (username === '') {
        return {
            valid: false,
            errors: username === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(username) === false) {
        return {
            valid: false,
            errors: reg.test(username) === false ? "Email format is invalid" : null
        }
    }

    else if (password === '' && flag == true) {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}

export const Signup_validation = (firstname,username, lastname, Email, city, password) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    // const HasNumber = /[0-9]/g
    // const HasUpperCase = /[A-Z]/g
    // const HasLowerCase = /[a-z]/g
    // const HasSymbol = /[!@#$%^&*()_+=\[{\]};:<>|./?,-]/g

    if (firstname === "") {
        return {
            valid: false,
            errors: firstname === "" ? "Please enter First Name" : null
        }
    }
    else if (lastname === "") {
        return {
            valid: false,
            errors: lastname === "" ? "Please enter your last name" : null
        }
    }
    else if (username === "") {
        return {
            valid: false,
            errors: username === "" ? "Please enter Username" : null
        }
    }
   
    else if (Email === '') {
        return {
            valid: false,
            errors: Email === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(Email) === false) {
        return {
            valid: false,
            errors: reg.test(Email) === false ? "Email format is invalid" : null
        }
    }
    else if (city === "") {
        return {
            valid: false,
            errors: city === "" ? "Please enter your City" : null
        }
      }
    else if (password === '') {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    // else if (password.length < 9) {
    //     return {
    //         valid: false,
    //         errors: password.length < 9 ? "Password must should contain 9 digits" : null
    //     }
    // }
    // else if (HasNumber.test(password) == false) {
    //     return {
    //         valid: false,
    //         errors: HasNumber.test(password) == false ? "Password Does not have Number" : null
    //     }
    // }
    // else if (HasUpperCase.test(password) == false) {
    //     console.log(HasUpperCase.test(password), 'password');
    //     return {
    //         valid: false,
    //         errors: HasUpperCase.test(password) == false ? "Password Does not have UpperCase" : null
    //     }
    // }
    // else if (HasSymbol.test(password) === false) {
    //     return {
    //         errors: HasSymbol.test(password) === false ? "Password Does not have Special Character" : null,
    //         valid: false
    //     }
    // }
    // else if (HasLowerCase.test(password) === false) {
    //     return {
    //         valid: false,
    //         errors: HasLowerCase.test(password) === false ? "Password Does not have LowerCase" : null
    //     }
    // }
    // else if (userConfirmPassword === "") {
    //     return {
    //         valid: false,
    //         errors: userConfirmPassword === "" ? "Please enter your confirm password" : null
    //     }
    // }
    // else if (password !== userConfirmPassword) {
    //     return {
    //         valid: false,
    //         errors: password !== userConfirmPassword ? "Password doesn't match" : null
    //     }

    // }
    else {
        return { valid: true, errors: null }
    }

}


// export const Edit_validation = (title, fname, lastname, email, Country, City, PhoneNumber, oldPassword, checkPassword, newpassword, userConfirmPassword, emailFlag, socialFlag, day, months, year) => {
//     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//     let age = Number(new Date().getFullYear() - year);
//     const HasNumber = /[0-9]/g
//     const HasUpperCase = /[A-Z]/g
//     const HasLowerCase = /[a-z]/g
//     const HasSymbol = /[!@#$%^&*()_+=\[{\]};:<>|./?,-]/g

//     if (title === "") {
//         return {
//             valid: false,
//             errors: title === "" ? "Please enter Your Title" : null
//         }
//     }
//     else if (fname === "") {
//         return {
//             valid: false,
//             errors: fname === "" ? "Please enter your first name" : null
//         }
//     }
//     else if (lastname === "") {
//         return {
//             valid: false,
//             errors: lastname === "" ? "Please enter your last name" : null
//         }
//     }
//     else if (email === '' && emailFlag == true) {
//         return {
//             valid: false,
//             errors: email === '' ? "Please Enter Your Email" : null
//         }
//     }
//     else if (reg.test(email) === false && emailFlag == true) {
//         return {
//             valid: false,
//             errors: reg.test(email) === false ? "Email format is invalid" : null
//         }
//     }
//     else if (Country === "") {
//         return {
//             valid: false,
//             errors: Country === "" ? "Please select your Country" : null
//         }
//     }
//     else if (City === "") {
//         return {
//             valid: false,
//             errors: City === "" ? "Please enter your City" : null
//         }
//     }

//     else if (PhoneNumber === "") {
//         return {
//             valid: false,
//             errors: PhoneNumber === "" ? "Please enter your Phone Number" : null
//         }
//     }

//     else if (PhoneNumber.length < 8) {
//         return {
//             valid: false,
//             errors: PhoneNumber.length < 8 ? "Your Phone number must should be greater than 8" : null
//         }
//     }
//     else if (HasSymbol === true) {
//         return {
//             valid: false,
//             errors: HasSymbol === true ? "Your Phone number should not contain any kind of symbols" : null
//         }
//     }
//     else if (day === "") {
//         return {
//             valid: false,
//             errors: day === "" ? "Please enter Day" : null
//         }
//     }
//     else if (day <= 0 || day > 31) {
//         return {
//             valid: false,
//             errors: day <= 0 || day > 31 ? "Please enter valid Date" : null
//         }
//     }
//     else if (day.length < 2) {
//         return {
//             valid: false,
//             errors: day.length < 2 ? "Your day should contain 2 digits" : null
//         }
//     }
//     else if (months === "") {
//         return {
//             valid: false,
//             errors: months === "" ? "Please enter Month" : null
//         }
//     }
//     else if (months.length < 2) {
//         return {
//             valid: false,
//             errors: months.length < 2 ? "Your month should contain 2 digits" : null
//         }
//     }
//     else if (months <= 0 || months > 12) {
//         return {
//             valid: false,
//             errors: months <= 0 || months > 12 ? "Please enter the valid month" : null
//         }
//     }
//     else if (year === "") {
//         return {
//             valid: false,
//             errors: year === "" ? "Please enter Year" : null
//         }
//     }
//     else if (year.length !== 4) {
//         return {
//             valid: false,
//             errors: year.length !== 4 ? "Your year should contain 4 digits" : null
//         }
//     }
//     else if (age < 18) {
//         if (age <= 0) {
//             return {
//                 valid: false,
//                 errors: age <= 0 ? "Invalid Year Selected" : null
//             }
//         } else {
//             alert('You have to be 18 years old or more to join our service')
//             return {
//                 valid: false,
//                 errors: age < 18 ? "Age Should be 18+" : null
//             }
//         }

//     }
//     else if (oldPassword !== checkPassword && checkPassword !== '') {
//         return {
//             valid: false,
//             errors: oldPassword !== checkPassword ? "Your Password is incorrect" : null
//         }
//     }
//     else if (newpassword === '' && checkPassword !== '' || socialFlag == true && newpassword === '') {
//         return {
//             valid: false,
//             errors: newpassword === '' ? "Please Enter Your new Password" : null
//         }
//     }
//     else if (newpassword.length < 9 && checkPassword !== '' || socialFlag == true && newpassword.length < 9) {
//         return {
//             valid: false,
//             errors: newpassword.length < 9 ? "Password must should contain 9 digits" : null
//         }
//     }
//     else if (newpassword.length > 9 && HasNumber.test(newpassword) == false) {
//         return {
//             valid: false,
//             errors: HasNumber.test(newpassword) == false ? "Password Does not have Number" : null
//         }
//     }
//     else if (newpassword.length > 9 && HasUpperCase.test(newpassword) == false) {
//         return {
//             valid: false,
//             errors: HasUpperCase.test(newpassword) == false ? "Password Does not have UpperCase" : null
//         }
//     }
//     else if (newpassword.length > 9 && HasSymbol.test(newpassword) === false) {
//         return {
//             errors: HasSymbol.test(newpassword) === false ? "Password Does not have Special Character" : null,
//             valid: false
//         }
//     }
//     else if (newpassword.length > 9 && HasLowerCase.test(newpassword) === false) {
//         return {
//             valid: false,
//             errors: HasLowerCase.test(newpassword) === false ? "Password Does not have LowerCase" : null
//         }
//     }
//     else if (userConfirmPassword === "" && checkPassword !== '' || socialFlag == true && userConfirmPassword === "") {
//         return {
//             valid: false,
//             errors: userConfirmPassword === "" ? "Please enter your confirm password" : null
//         }
//     }
//     else if (newpassword !== userConfirmPassword && checkPassword !== '' || newpassword !== userConfirmPassword && socialFlag == true) {
//         return {
//             valid: false,
//             errors: newpassword !== userConfirmPassword ? "Password doesn't match" : null
//         }
//     }


//     else {
//         return { valid: true, errors: null }
//     }
// }


// export const ContactUs_Validation = (Email, FullName, number, message) => {
//     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//     if (FullName === "") {
//         return {
//             valid: false,
//             errors: FullName === "" ? "Please enter your name" : null
//         }
//     }
//     else if (FullName.length < 3) {
//         return {
//             valid: false,
//             errors: FullName.length < 3 ? "Name must should contain 3 letters" : null
//         }
//     }
//     else if (number === "") {
//         return {
//             valid: false,
//             errors: number === "" ? "Please enter your Phone Number" : null
//         }
//     }
//     else if (number.length < 8) {
//         return {
//             valid: false,
//             errors: number.length < 8 ? "Your phone must contain 8 digits" : null
//         }
//     }
//     else if (Email === '') {
//         return {
//             valid: false,
//             errors: Email === '' ? "Please Enter Your Email" : null
//         }
//     }
//     else if (reg.test(Email) === false) {
//         return {
//             valid: false,
//             errors: reg.test(Email) === false ? "Email format is invalid" : null
//         }
//     }
//     else if (message === "") {
//         return {
//             valid: false,
//             errors: message === "" ? "Please enter your message" : null
//         }
//     }
//     else {
//         return { valid: true, errors: null }
//     }
// }

// export const Card_Detail_Validations = (PaymentOption, cardHoldername, cardtype, cardnumber, cvc, months, year) => {
//     let currentMonth = new Date().getMonth() + 1
//     let currentYear = new Date().getFullYear().toString().substr(-2)
//     let minNumer = cardtype == 'Amex' ? 18 : 19
//     let minCvc = cardtype == 'Amex' ? 4 : 3
//     if (PaymentOption === "") {
//         return {
//             valid: false,
//             errors: PaymentOption === "" ? "Please enter Payment Option" : null
//         }
//     }
//     else if (cardHoldername === "") {
//         return {
//             valid: false,
//             errors: cardHoldername === "" ? "Please enter Card Holder name" : null
//         }
//     }
//     else if (cardHoldername.length < 3) {
//         return {
//             valid: false,
//             errors: cardHoldername.length < 3 ? "Name must should contain 3 letters" : null
//         }
//     }
//     else if (cardtype === "") {
//         return {
//             valid: false,
//             errors: cardtype === "" ? "Please Select Card Type" : null
//         }
//     }
//     else if (cardnumber === "") {
//         return {
//             valid: false,
//             errors: cardnumber === "" ? "Please enter your Card Number" : null
//         }
//     }
//     else if (cardnumber.length < minNumer) {
//         return {
//             valid: false,
//             errors: cardnumber.length < minNumer ? "Your card number must should be " + minNumer : null
//         }
//     }
//     else if (cvc.length < minCvc) {
//         return {
//             valid: false,
//             errors: cvc.length < minCvc ? "Your cvv must be " + minCvc : null
//         }
//     }
//     else if (cvc === '') {
//         return {
//             valid: false,
//             errors: cvc === '' ? "Please Enter CVV" : null
//         }
//     }
//     else if (months === "") {
//         return {
//             valid: false,
//             errors: months === "" ? "Please enter Month" : null
//         }
//     }
//     else if (months.length < 2) {
//         return {
//             valid: false,
//             errors: months.length < 2 ? "Your month should contain 2 digits" : null
//         }
//     }
//     else if (months > 12) {
//         return {
//             valid: false,
//             errors: months > 12 ? "Please enter the valid month" : null
//         }
//     }
//     else if (year <= currentYear && months < currentMonth) {
//         return {
//             valid: false,
//             errors: year <= currentYear && months < currentMonth ? "Please enter the valid month" : null
//         }
//     }
//     else if (year === "") {
//         return {
//             valid: false,
//             errors: year === "" ? "Please enter Year" : null
//         }
//     }
//     else if (year < currentYear) {
//         return {
//             valid: false,
//             errors: year < currentYear ? "Please enter the valid Year" : null
//         }
//     }
//     else {
//         return { valid: true, errors: null }
//     }
// }
