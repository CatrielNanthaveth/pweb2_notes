"use client";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import styles from '@/styles/form.module.css';
export const RegisterForm = () => {

    const { login } = useAuth();
    const router = useRouter();

    return (
        <div className={styles.container}>

            <Formik className={styles.form_container}
                initialValues={{ email: '', username: '', password: '' }}
                validate={values => {
                    const errors = {};

                    if (!values.email) {
                        errors.email = 'Requerido';
                    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
                        errors.email = 'Invalid email';
                    }

                    if (!values.username) {
                        errors.username = 'Required';
                    } else if (!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(values.username)) {
                        errors.username = 'Invalid username';
                    }

                    if (!values.password) {
                        errors.password = 'Required'
                    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
                        errors.password = 'At least 8 characters, a letter and a number.'
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = new URLSearchParams();
                    formData.append('email', values.email);
                    formData.append('username', values.username);
                    formData.append('password', values.password);

                    console.log({
                        email: values.email,
                        password: values.password,
                        username: values.username
                    });

                    Swal.fire({
                        title: 'Register',
                        text: 'Are you sure?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, i am'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, formData)
                                .then((res) => {
                                    Swal.fire({
                                        title: `Welcome!`,
                                        text: 'Registered succesfully',
                                        icon: 'success',
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Thanks!',
                                        timer: 2000,
                                        timerProgressBar: true
                                    });

                                    login(res.data.token);
                                    router.replace('/')
                                })
                                .catch((err) => {
                                    Swal.fire({
                                        title: 'Error',
                                        text: 'Can\'t register',
                                        icon: 'error',
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: ':(',
                                        timer: 2000,
                                        timerProgressBar: true
                                    });
                                    console.log(err);
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                })
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            Swal.fire(
                                'Action Cancelled!',
                                'Your action was cancelled',
                                'error'
                            );
                            return false;
                        }
                    });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit} className={styles.form_container}>
                        <h1>Welcome!</h1>
                        <label>
                            <p>Email</p>
                            <input
                                className={styles.form_input}
                                type='email'
                                name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <p>{errors.email && touched.email && errors.email}</p>

                        </label>
                        <label>
                            <p>Username</p>
                            <input
                                className={styles.form_input}
                                type='text'
                                name='username'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            <p>{errors.username && touched.username && errors.username}</p>

                        </label>
                        <label>
                            <p>Password</p>
                            <input
                                className={styles.form_input}
                                type='password'
                                name='password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <p>{errors.password && touched.password && errors.password}</p>

                        </label>

                        <p>If you are already registered, <Link href="/login" id='to-login'>log in.</Link></p>
                        <label>
                            <button className={styles.form_button} type="submit" disabled={isSubmitting}>
                                Register
                            </button>
                        </label>
                    </form>
                )}
            </Formik>
        </div>
    )
}
