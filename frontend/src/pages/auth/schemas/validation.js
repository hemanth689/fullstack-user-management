import * as yup from 'yup';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const basicSchema = yup.object().shape({
    username:yup.string().min(3, "username should contain atleast 3 characters").required('Required'),
    email:yup.string().email("Please enter valid email").required("Required"),
    phone: yup.string().required("Phone number is required"),
    password:yup.string().min(6).matches(passwordRules, {message:"Please create strong password"}).required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), "Password must match"]).required('Required')
})