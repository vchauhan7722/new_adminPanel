// import * as Yup from 'yup'

// // export interface ICreateAccount {
// //   accountType: string
// //   accountTeamSize: string
// //   accountName: string
// //   accountPlan: string
// //   businessName: string
// //   businessDescriptor: string
// //   businessType: string
// //   businessDescription: string
// //   businessEmail: string
// //   nameOnCard: string
// //   cardNumber: string
// //   cardExpiryMonth: string
// //   cardExpiryYear: string
// //   cardCvv: string
// //   saveCard: string
// // }

// export interface Step1Details {
//   fullName:string
//   userName:string
//   genderId:string
//   birthDate:string
//   country:string
//   state:string
//   city:string
//   bio:string

// }

// const createAccountSchemas = [
//   Yup.object({
//     fullName: Yup.string().required('Full Name is Required') ,
//     userName: Yup.string().required(),
//     genderId: Yup.string().required(),
//     birthDate: Yup.string().required(),
//     country: Yup.string().required(),
//     state: Yup.string().required(),
//     city: Yup.string().required(),
//     bio:Yup.string().required(),
//   }),
// ]

// /*Yup.object({
//     accountType: Yup.string().required().label('Account Type'),
//   }),
//   Yup.object({
//     accountName: Yup.string().required().label('Account Name'),
//   }),
//   Yup.object({
//     businessName: Yup.string().required().label('Business Name'),
//     businessDescriptor: Yup.string().required().label('Shortened Descriptor'),
//     businessType: Yup.string().required().label('Corporation Type'),
//     businessEmail: Yup.string().required().label('Contact Email'),
//   }),
//   Yup.object({
//     nameOnCard: Yup.string().required().label('Name On Card'),
//     cardNumber: Yup.string().required().label('Card Number'),
//     cardExpiryMonth: Yup.string().required().label('Expiration Month'),
//     cardExpiryYear: Yup.string().required().label('Expiration Year'),
//     cardCvv: Yup.string().required().label('CVV'),
//   }), */

// // const inits: ICreateAccount = {
// //   accountType: 'personal',
// //   accountTeamSize: '50+',
// //   accountName: '',
// //   accountPlan: '1',
// //   businessName: 'Keenthemes Inc.',
// //   businessDescriptor: 'KEENTHEMES',
// //   businessType: '1',
// //   businessDescription: '',
// //   businessEmail: 'corp@support.com',
// //   nameOnCard: 'Max Doe',
// //   cardNumber: '4111 1111 1111 1111',
// //   cardExpiryMonth: '1',
// //   cardExpiryYear: '2025',
// //   cardCvv: '123',
// //   saveCard: '1',
// // }

// const step1inits: Step1Details = {
//   fullName:'',
//   userName:'',
//   genderId:'1',
//   birthDate:new Date().toLocaleDateString('en-CA'),
//   country:'',
//   state:'',
//   city:'',
//   bio:'',
// }

// export {createAccountSchemas,step1inits}
// //export {createAccountSchemas, inits,step1inits}



import * as Yup from 'yup'

export interface ICreateAccount {
  accountType: string
  accountTeamSize: string
  accountName: string
  accountPlan: string
  businessName: string
  businessDescriptor: string
  businessType: string
  businessDescription: string
  businessEmail: string
  nameOnCard: string
  cardNumber: string
  cardExpiryMonth: string
  cardExpiryYear: string
  cardCvv: string
  saveCard: string
}

const createAccountSchemas = [
  Yup.object({
    accountType: Yup.string().required().label('Account Type'),
  }),
  Yup.object({
    accountName: Yup.string().required().label('Account Name'),
  }),
  Yup.object({
    businessName: Yup.string().required().label('Business Name'),
    businessDescriptor: Yup.string().required().label('Shortened Descriptor'),
    businessType: Yup.string().required().label('Corporation Type'),
    businessEmail: Yup.string().required().label('Contact Email'),
  }),
  Yup.object({
    nameOnCard: Yup.string().required().label('Name On Card'),
    cardNumber: Yup.string().required().label('Card Number'),
    cardExpiryMonth: Yup.string().required().label('Expiration Month'),
    cardExpiryYear: Yup.string().required().label('Expiration Year'),
    cardCvv: Yup.string().required().label('CVV'),
  }),
]

const inits: ICreateAccount = {
  accountType: 'personal',
  accountTeamSize: '50+',
  accountName: '',
  accountPlan: '1',
  businessName: 'Keenthemes Inc.',
  businessDescriptor: 'KEENTHEMES',
  businessType: '1',
  businessDescription: '',
  businessEmail: 'corp@support.com',
  nameOnCard: 'Max Doe',
  cardNumber: '4111 1111 1111 1111',
  cardExpiryMonth: '1',
  cardExpiryYear: '2025',
  cardCvv: '123',
  saveCard: '1',
}

export {createAccountSchemas, inits}

