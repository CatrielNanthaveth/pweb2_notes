"use client"
import axios from 'axios';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';
import styles from '@/styles/form.module.css';

export const EditNoteForm = () => {
    const { id } = useParams();
    const router = useRouter();

    return (
        <div className={styles.container}>

            <Formik className={styles.form_container}
                initialValues={{ title: '', description: '', status: '', category: '', date: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.title) {
                        errors.title = '* Requerido';
                    }

                    if (!values.status) {
                        errors.status = '* Requerido';
                    }

                    if (!values.category) {
                        errors.category = '* Requerido';
                    }

                    if (!values.description) {
                        errors.description = '* Requerido';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const date = new Date();

                    let currentDay = String(date.getDate()).padStart(2, '0');
                    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
                    let currentYear = date.getFullYear();

                    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

                    const formData = new URLSearchParams();
                    formData.append('title', values.title);
                    formData.append('description', values.description);
                    formData.append('status', values.status);
                    formData.append('category', values.category);
                    formData.append('date', currentDate);

                    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, formData)
                        .then((res) => {
                            Swal.fire({
                                title: `¡Actualizada!`,
                                text: 'Tarea actualizada.',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: '¡Gracias!',
                                timer: 2000,
                                timerProgressBar: true
                            });
                            router.push('/');
                        })
                        .catch((err) => {
                            Swal.fire({
                                title: 'Error',
                                text: 'Tarea no actualizada.',
                                icon: 'error',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: '¡:(!',
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
                        <h1>Update your note!</h1>
                        <label>
                            <p>Title</p>
                            <input
                                className={styles.form_input}
                                type='text'
                                name='title'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                            />
                            <p className={styles.error}>{errors.title && touched.title && errors.title}</p>

                        </label>
                        <label>
                            <p>Description</p>
                            <input
                                className={styles.form_input}
                                type='text'
                                name='description'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            <p className={styles.error}>{errors.description && touched.description && errors.description}</p>

                        </label>
                        <label>
                            <p>Status</p>
                            <select
                                className={styles.form_input}
                                name='status'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.status}
                            >
                                <option value=''>Select status</option>
                                <option value='archived'>archived</option>
                                <option value='active'>active</option>
                            </select>
                            <p className={styles.error}>{errors.status && touched.status && errors.status}</p>
                        </label>
                        <label>
                            <p>category</p>
                            <input
                                className={styles.form_input}
                                type='text'
                                name='category'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category}
                            />
                            <p className={styles.error}>{errors.category && touched.category && errors.category}</p>

                        </label>
                        <label>
                            <button className={styles.form_button} type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                                Update
                            </button>
                        </label>
                    </form>
                )}
            </Formik>
        </div>
    )
}
