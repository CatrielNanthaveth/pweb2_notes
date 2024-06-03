"use client";
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import styles from '@/styles/form.module.css';

export const LoginForm = () => {
    const { login } = useAuth();

    const router = useRouter();
    return (
        <div className={styles.container}>

            <Formik className={styles.form_container}
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = '* Required';
                    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(values.email)) {
                        errors.email = '* Invalid email';
                    }

                    if (!values.password) {
                        errors.password = '* Required'
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {

                    const formData = new URLSearchParams();
                    formData.append('email', values.email);
                    formData.append('password', values.password);

                    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, formData)
                        .then((res) => {
                            Swal.fire({
                                title: `Welcome!`,
                                text: 'Log in succesfully',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Thanks!',
                                timer: 2000,
                                timerProgressBar: true
                            });
                            login(res.data.token);
                            router.replace('/');
                        })
                        .catch((err) => {
                            Swal.fire({
                                title: 'Error',
                                text: err.response.data.message,
                                icon: 'error',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: ':(!',
                                timer: 2000,
                                timerProgressBar: true
                            });
                        })
                        .finally(() => {
                            setSubmitting(false);
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

                        <p><i>not <Link href="/register">registered</Link> yet?</i></p>
                        <label>
                            <button className={styles.form_button} type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                                Log in
                            </button>
                        </label>
                    </form>
                )}
            </Formik>
        </div>
    )
}
